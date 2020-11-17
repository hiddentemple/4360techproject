import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BillerEntity } from '../../db/entities/biller.entity';
import { EntityManager, Repository } from 'typeorm';
import { AddressService } from '../../contact/services/address.service';
import { PaymentEntity } from '../../db/entities/payment.entity';
import { BillerDTO } from '@hiddentemple/api-interfaces';
import { InvoiceEntity } from '../../db/entities/invoice.entity';


@Injectable()
export class BillerService {
  private readonly logger = new Logger(BillerService.name)
  
  constructor(
    @InjectRepository(BillerEntity) private billerRepo: Repository<BillerEntity>,
    private addressService: AddressService,
  ) {}
  
  
  async getByID(id: string, options?: object): Promise<BillerEntity> {
    const biller: BillerEntity = await this.billerRepo.findOne(id, options);
    if(!biller) throw new NotFoundException();
    return biller;
  }

  
  async create(invoice: InvoiceEntity, dto: BillerDTO, entityManager: EntityManager): Promise<BillerEntity> {
    this.logger.log(`Creating a new biller for invoice with id ${invoice.id} from DTO: ${JSON.stringify(dto)}`)
    const newBiller: BillerEntity = entityManager.create<BillerEntity>(BillerEntity, {...dto, invoice})
    const savedBiller: BillerEntity = await entityManager.save(newBiller);
    this.logger.log(`Saved biller: ${JSON.stringify(savedBiller)}`);
    return savedBiller
  }
  
  
  async update(invoice: InvoiceEntity, dto: BillerDTO, entityManager: EntityManager): Promise<any> {
    await entityManager.delete<BillerEntity>(BillerEntity, invoice.biller)
    const updatedBiller: BillerEntity = await this.create(invoice, dto, entityManager)
    this.logger.log(`New biller with id: ${JSON.stringify(updatedBiller.id)}`)
    return updatedBiller
  }
  

  async delete(id: string, entityManager: EntityManager): Promise<any> {
    this.logger.log(`Attempting delete biller with id ${id}`)
    const biller: BillerEntity = await this.getByID(id);
    await this.addressService.deleteMany([biller.address], entityManager)
    if(biller.paymentInfo != null) {
      await entityManager.delete(PaymentEntity, biller.paymentInfo)
    }
    await entityManager.delete<BillerEntity>(BillerEntity, biller.id);
    this.logger.log(`Delete biller success. ID: ${id}`)
  }
}
