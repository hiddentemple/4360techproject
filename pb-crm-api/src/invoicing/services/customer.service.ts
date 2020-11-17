import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerEntity } from '../../db/entities/customer.entity';
import { EntityManager, Repository, UpdateResult } from 'typeorm';
import { AddressService } from '../../contact/services/address.service';
import { InvoiceEntity } from '../../db/entities/invoice.entity';
import { CustomerDTO } from '@hiddentemple/api-interfaces';


@Injectable()
export class CustomerService {
  private readonly logger = new Logger(CustomerService.name)
  constructor(
    @InjectRepository(CustomerEntity) private customerRepo: Repository<CustomerEntity>,
    private addressService: AddressService
    ) {}
  
  async getAll(): Promise<CustomerEntity[]> {
    return this.customerRepo.find();
  }
  
  async getByID(id: string): Promise<CustomerEntity> {
    const customer: CustomerEntity = await this.customerRepo.findOne(id);
    if(!customer){
      throw new NotFoundException();
    }
    return customer;
  }
  
  async create(invoice: InvoiceEntity, dto: CustomerDTO): Promise<CustomerEntity> {
    const newCustomer: CustomerEntity = this.customerRepo.create({...dto});
    const savedCustomer = await this.customerRepo.save(newCustomer)
    this.logger.log(`Saved customer: ${JSON.stringify(savedCustomer)}`);
    return newCustomer
  }

  async update(invoice: InvoiceEntity, customerDTO: CustomerDTO, entityManager: EntityManager): Promise<any> {
    if (!customerDTO) return;
    this.logger.log(`Updating customer from DTO: ${JSON.stringify(customerDTO)}`)
    const { affected }: UpdateResult = await this.customerRepo.update( invoice.customer.id, customerDTO)
    if (affected !== 1) {
      const errMsg = `Failed to update customer with id ${invoice.customer.id}`
      this.logger.error(errMsg)
      throw new InternalServerErrorException(errMsg)
    }
    this.logger.log(`Finished ${customerDTO} customer(s)`);
  }

  async delete(id: string, entityManager: EntityManager): Promise<any> {
    if(id !== null) {
      this.logger.log(`Attempting delete customer with id ${id}`)
      const customer: CustomerEntity = await this.getByID(id);
      await this.addressService.deleteMany([customer.address], entityManager);
      let { affected } = await entityManager.delete<CustomerEntity>(CustomerEntity, customer.id);
      if (affected !== 1) {
        const errMsg = `Failed to delete customer with id ${id}`
        this.logger.error(errMsg)
        throw new InternalServerErrorException(errMsg)
      }
      this.logger.log(`Delete customer success. ID: ${id}`)
    }
  }
}
