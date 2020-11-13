import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceEntity } from '../../db/entities/invoice.entity';
import { createQueryBuilder, DeleteResult, EntityManager, getConnection, Repository, UpdateResult } from 'typeorm';
import { CreateInvoiceRequest, UpdateInvoiceRequest} from '@hiddentemple/api-interfaces/dist/invoicing/invoice.contract';
import { LineItemService } from './lineItem.service';
import { BillerEntity } from '../../db/entities/biller.entity';
import { CustomerEntity } from '../../db/entities/customer.entity';
import { BillerService } from './biller.service';

@Injectable()
export class InvoiceService {
  private readonly logger = new Logger(InvoiceService.name)
  
  constructor(
    @InjectRepository(InvoiceEntity) private invoiceRepo: Repository<InvoiceEntity>,
    private lineItemService: LineItemService,
    private billerService: BillerService
  ) {}
  
  async getAll(): Promise<InvoiceEntity[]> {
    return this.invoiceRepo.find();
  }
  
  async getById(id: string): Promise<InvoiceEntity> {
    const invoice: InvoiceEntity = await this.invoiceRepo.findOne(id);
    if(!invoice){
      throw new NotFoundException();
    }
    return invoice;
  }
  
  
  async create(req: CreateInvoiceRequest): Promise<InvoiceEntity> {
    this.logger.log(`Creating invoice from request ${JSON.stringify(req)}`)
    const {invoice} = req;
    let savedInvoice: InvoiceEntity =  null;
    await getConnection().transaction(async (entityManger: EntityManager) => {
      const newInvoice = await entityManger.create<InvoiceEntity>(InvoiceEntity, {
        date: invoice.date,
        invoiceNumber: invoice.invoiceNumber,
        technician: invoice.technician,
        biller: invoice.biller,
        customer: invoice.customer,
        notes: invoice.notes,
        subTotal: invoice.subTotal,
        tax: invoice.tax,
        total: invoice.total,
        amountOwed: invoice.amountOwed,
        amountPaid: invoice.amountPaid,
        paidInFull: invoice.paidInFull,
      });
      savedInvoice = await entityManger.save(newInvoice); //Populates ID
      await this.lineItemService.createMany(newInvoice, invoice.lineItems, entityManger);
    });
    const createdInvoice = await this.getById(savedInvoice.id)
    this.logger.log(`Saved new invoice as ${JSON.stringify(createdInvoice)}`)
    return createdInvoice;
  }

  async createMany(requests: CreateInvoiceRequest[]): Promise<InvoiceEntity[]>{
    let invoices: InvoiceEntity[] = []
    for(let req of requests){
      let invoice: InvoiceEntity = await this.create(req)
      invoices.push(invoice)
    }
    return invoices;
  }
  
  
  async update(id: string, dto: UpdateInvoiceRequest): Promise<InvoiceEntity> {
    this.logger.log(`Attempting to update invoice with id ${id} with DTO ${JSON.stringify(dto)}`)
    const invoice: InvoiceEntity = await this.getById(id);

    const acc: Partial<InvoiceEntity> = {};
    const reducer = (acc, [key, value]) => {
      if (value && value !== '' && key !== 'lineItems') {
        return {...acc, [key]: value};
      } else {
        return acc;
      }
    };
    const filtered: Partial<InvoiceEntity> = Object.entries(dto.invoice).reduce(reducer, acc);
    this.logger.log(`Reduced DTO to simple properties: ${JSON.stringify(filtered)}`)

    Object.assign(invoice, filtered);
    this.logger.log(`Updated invoice with simple properties: ${JSON.stringify(invoice)}`)

    await getConnection().transaction(async entityManger => {
      await this.lineItemService.updateMany(invoice, invoice.lineItems, entityManger);
      const { affected }: UpdateResult = await entityManger.update<InvoiceEntity>(InvoiceEntity, id, filtered);
      if (affected === 0) {
        throw new InternalServerErrorException("Failed to update invoice")
      }
    });

    return this.getById(id);
  }

  async delete(id: string): Promise<any> {
    this.logger.log(`Attempting delete of invoice with id ${JSON.stringify(id)}`)
    const invoice: InvoiceEntity = await this.getById(id);
    this.logger.log(`Found invoice to delete: ${JSON.stringify(invoice)}`)

    await getConnection().transaction(async entityManger => {
      
      await this.lineItemService.deleteMany(invoice.lineItems, entityManger);
      
      const { affected }: DeleteResult = await entityManger.delete<InvoiceEntity>(InvoiceEntity, id);
      await this.billerService.deleteMany(invoice.biller, entityManger);
      if (affected === 0) {
        const errMsg = `Could not delete invoice: ${JSON.stringify(invoice)}`;
        this.logger.error(errMsg);
        throw new InternalServerErrorException(errMsg);
      }
      
    });

    this.logger.log(`Deleted invoice with id ${JSON.stringify(id)}`);
  }
  
  
}
