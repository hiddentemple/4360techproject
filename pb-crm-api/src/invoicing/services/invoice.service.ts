import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceEntity } from '../../db/entities/invoice.entity';
import { EntityManager, getConnection, Repository} from 'typeorm';
import { CreateInvoiceRequest, UpdateInvoiceRequest} from '@hiddentemple/api-interfaces/dist/invoicing/invoice.contract';
import { LineItemService } from './lineItem.service';
import { BillerService } from './biller.service';
import { CustomerService } from './customer.service';
import { ContactEntity } from '../../db/entities/contact.entity';
import { AccountEntity } from '../../db/entities/account.entity';

@Injectable()
export class InvoiceService {
  private readonly logger = new Logger(InvoiceService.name)
  
  constructor(
    @InjectRepository(InvoiceEntity) private invoiceRepo: Repository<InvoiceEntity>,
    private lineItemService: LineItemService,
    private billerService: BillerService,
    private customerService: CustomerService
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

    const acc: Partial<ContactEntity> = {};
    const reducer = (acc, [key, value]) => {
      if (value && value !== '' && key !== 'lineItems') {
        return {...acc, [key]: value};
      } else {
        return acc;
      }
    };
    const filtered: Partial<ContactEntity> = Object.entries(dto.invoice).reduce(reducer, acc);
    this.logger.log(`Reduced DTO to simple properties: ${JSON.stringify(filtered)}`)
    await getConnection().transaction(async entityManger => {
      const updatedInvoice =  this.invoiceRepo.merge(invoice, filtered);
      await entityManger.save<InvoiceEntity>(updatedInvoice);
      await this.lineItemService.updateMany(invoice, dto.invoice.lineItems, entityManger);
      this.logger.log(`Updated contact: ${JSON.stringify({updatedInvoice})}`);
    });
    return this.getById(id);
  }
  
  async updateMany(account: AccountEntity, invoiceDTOs: UpdateInvoiceRequest[]): Promise<InvoiceEntity[]>{
    if(!invoiceDTOs || invoiceDTOs.length === 0 || account.invoices.length == 0){ return; }
    this.logger.log(`Updating ${invoiceDTOs.length} invoice(s) from DTO: ${JSON.stringify(invoiceDTOs)}`)
    let updatedInvoices: InvoiceEntity[] = []
    for (let i = 0; i < invoiceDTOs.length; i++) {
      if(account.invoices[i]){
        const updatedInvoice = await this.update(account.invoices[i].id, invoiceDTOs[i])
        updatedInvoices.push(updatedInvoice)
      }
      else{
        const newInvoice = await this.create(invoiceDTOs[i])
        updatedInvoices.push(newInvoice)
      }
    }
    return updatedInvoices
  }

  
  async delete(id: string): Promise<any> {
    this.logger.log(`Attempting delete of invoice with id ${JSON.stringify(id)}`)
    const invoice: InvoiceEntity = await this.getById(id);
    this.logger.log(`Found invoice to delete: ${JSON.stringify(invoice)}`)
    await getConnection().transaction(async entityManger => {
      await this.lineItemService.deleteMany(invoice.lineItems, entityManger);
      await this.billerService.delete(invoice.biller.id, entityManger);
      await this.customerService.delete(invoice.customer.id, entityManger)
      await entityManger.delete<InvoiceEntity>(InvoiceEntity, id);
    });
    if(await this.invoiceRepo.findOne(id)){
      const errMsg = `Could not delete invoice: ${JSON.stringify(invoice)}`
        this.logger.error(errMsg)
        throw new InternalServerErrorException(errMsg)
    }

    this.logger.log(`Deleted invoice with id ${JSON.stringify(id)}`);
  }
  
  async deleteMany(invoices: InvoiceEntity[], entityManager: EntityManager): Promise<any>{
    if (!invoices || invoices.length === 0) return;
    this.logger.log(`Attempting to delete ${invoices.length} invoice(s) with entities: ${JSON.stringify(invoices)}`)
    for (const invoice of invoices) {
      if (invoice != null) {
        await this.delete(invoice.id)
      }
    }
    this.logger.log(`Successfully deleted ${invoices.length} invoices(s)`)
  }
}
