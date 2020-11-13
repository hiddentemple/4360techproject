import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BillerEntity } from '../../db/entities/biller.entity';
import {EntityManager, Repository } from 'typeorm';
import { AddressService } from '../../contact/services/address.service';
import { EmailService } from '../../contact/services/email.service';
import { PhoneService } from '../../contact/services/phone.service';
import { raw } from 'express';
import { PaymentEntity } from '../../db/entities/payment.entity';

@Injectable()
export class BillerService {
  private readonly logger = new Logger(BillerService.name)
  
  constructor(
    @InjectRepository(BillerEntity) private billerRepo: Repository<BillerEntity>,
    private addressService: AddressService,
    private emailService: EmailService,
    private phoneService: PhoneService
  ) {}
  
  async getByID(id: string): Promise<BillerEntity> {
    const biller: BillerEntity = await this.billerRepo.findOne(id);
    if(!biller) throw new NotFoundException();
    return biller;
  }

  // async create(invoice: InvoiceEntity, dto: BillerDTO, entityManager: EntityManager): Promise<BillerEntity> {
  //   this.logger.log(`Creating a new biller for invoice with id ${invoice.id} from DTO: ${JSON.stringify(dto)}`)
  //   const newBiller: BillerEntity = entityManager.create<BillerEntity>(BillerEntity, {...dto, invoice})
  //   const savedBiller: BillerEntity = await entityManager.save(newBiller);
  //   this.logger.log(`Saved biller: ${JSON.stringify(savedBiller)}`);
  //   return newBiller
  // }

  // async createMany(invoice: InvoiceEntity, billerDTOS: BillerDTO[], entityManger: EntityManager): Promise<BillerEntity[]> {
  //   if (!billerDTOS || billerDTOS === []) return [];
  //   this.logger.log(`Creating ${billerDTOS.length} biller(s): ${JSON.stringify(billerDTOS)}`)
  //   const newBillers: BillerEntity[] = [];
  //   for (const billerDTO of billerDTOS) {
  //     const newBiller: BillerEntity = await this.create(invoice, billerDTO, entityManger);
  //     newBillers.push(newBiller);
  //   }
  //   this.logger.log(`Created ${newBillers.length} biller(s): ${JSON.stringify(newBillers)}`)
  //   return newBillers;
  // }

  // async update(invoice: InvoiceEntity, billerDTO: BillerDTO, entityManager: EntityManager): Promise<BillerEntity> {
  //   if (!billerDTO) return;
  //   this.logger.log(`Updating billerfrom DTO: ${JSON.stringify(billerDTO)}`)
  //   await this.delete(invoice.biller.id, entityManager);
  //   const updatedBillers: BillerEntity = await this.create(invoice, billerDTO, entityManager);
  //   this.logger.log(`Finished ${billerDTO} biller(s)`);
  //   return updatedBillers;
  // }

  async delete(id: string, entityManager: EntityManager): Promise<any> {
    this.logger.log(`Attempting delete biller with id ${id}`)
    const biller: BillerEntity = await this.getByID(id);
    
    await this.phoneService.deleteMany([biller.mobilePhone, biller.businessPhone, biller.fax], entityManager)
    await this.emailService.delete(biller.email.id, entityManager);
    await this.addressService.delete(biller.address.id, entityManager)
    await entityManager.delete(PaymentEntity, biller.paymentInfo)
    let {affected} = await entityManager.delete(BillerEntity, biller);
    if (affected === 0) {
      const errMsg = `Could not delete biller: ${JSON.stringify(biller)}`;
      this.logger.error(errMsg);
      throw new InternalServerErrorException(errMsg);
    }
    this.logger.log(`Delete biller success. ID: ${id}`)
  }
  
  async deleteMany(biller: BillerEntity, entityManager: EntityManager): Promise<any> {
    if(!biller) return;
    await this.delete(biller.id, entityManager)
  }
  
  
}
