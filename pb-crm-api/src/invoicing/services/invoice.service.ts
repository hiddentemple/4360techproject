import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InvoiceEntity } from '../../db/entities/invoice.entity';
import { EntityManager, getConnection, Repository } from 'typeorm';
import { CreateInvoiceRequest } from '@hiddentemple/api-interfaces/dist/invoicing/invoice.contract';
import { async } from 'rxjs';
import { LineItemService } from './lineItem.service';
import { BillerService } from './biller.service';
import { CustomerService } from './customer.service';

@Injectable()
export class InvoiceService {
  private readonly logger = new Logger(InvoiceService.name)
  
  constructor(
    @InjectRepository(InvoiceEntity) private invoiceRepo: Repository<InvoiceEntity>,
    private lineItemService: LineItemService,
    private customerService: CustomerService,
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
}
