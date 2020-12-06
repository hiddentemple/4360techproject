import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, getConnection, Repository, UpdateResult } from 'typeorm';
import { AddressEntity } from '../../db/entities/address.entity';
import { ContactEntity } from '../../db/entities/contact.entity';
import { AddressDTO } from '@hiddentemple/api-interfaces';



@Injectable()
export class AddressService {
  private readonly logger = new Logger(AddressService.name);

  constructor(
    @InjectRepository(AddressEntity) private repo: Repository<AddressEntity>,
  ) {
  }

  async getById(id: string): Promise<AddressEntity> {
    const address: AddressEntity = await this.repo.findOne({ id });
    if (!address) throw new NotFoundException();
    return address;
  }

  private async create(contact: ContactEntity, dto: AddressDTO, entityManager: EntityManager): Promise<AddressEntity> {
    const newAddress: AddressEntity = entityManager.create<AddressEntity>(AddressEntity, { ...dto, contact });
    const savedAddress = await entityManager.save(newAddress);
    this.logger.log(`Saved address: ${JSON.stringify(savedAddress)}`);
    return savedAddress;
  }
  
  
  async createMany(contact: ContactEntity, addressDTOs: AddressDTO[], entityManager: EntityManager): Promise<AddressEntity[]> {
    if (!addressDTOs || addressDTOs == []) return [];
    this.logger.log(`Creating ${addressDTOs.length} address(es): ${JSON.stringify(addressDTOs)}`);
    const newAddresses: AddressEntity[] = [];
    for (const addressDTO of addressDTOs) {
      const newAddress: AddressEntity = await this.create(contact, addressDTO, entityManager);
      newAddresses.push(newAddress);
    }
    this.logger.log(`Created ${newAddresses.length} address(es): ${JSON.stringify(newAddresses)}`);
    return newAddresses;
  }
  
  async update(id: string, addressDTO: AddressDTO): Promise<any>{
    if(!addressDTO) return;
    this.logger.log(`Updating address from DTO: ${JSON.stringify(addressDTO)}`);
    const { affected } : UpdateResult = await this.repo.update(id, addressDTO);
    if (affected === 0) {
      const errMsg = `Could not delete address with id: ${id}`;
      this.logger.error(errMsg);
      throw new InternalServerErrorException(errMsg);
    }
    this.logger.log(`Updated address with id ${JSON.stringify(id)}`);
  }

  async updateMany(contact: ContactEntity, addressDTOs: AddressDTO[], entityManager: EntityManager): Promise<AddressEntity[]> {
    if (!addressDTOs || addressDTOs.length === 0) return;
    this.logger.log(`Updating ${addressDTOs.length} address(es) from DTO: ${JSON.stringify(addressDTOs)}`);
    await this.deleteMany(contact.addresses, entityManager);
    const updatedAddresses: AddressEntity[] = await this.createMany(contact, addressDTOs, entityManager);
    this.logger.log(`Finished ${addressDTOs.length} address(es)`);
    return updatedAddresses;
  }

  async delete(id: string, entityManager: EntityManager): Promise<any> {
    this.logger.log(`Attempting delete address with id ${id}`);
    const address: AddressEntity = await this.getById(id);
    const { affected } = await entityManager.delete(AddressEntity, address);
    if (affected !== 1) {
      const errMsg = `Failed to delete address with id ${id}`;
      this.logger.error(errMsg);
      throw new InternalServerErrorException(errMsg);
    }
    this.logger.log(`Delete address success. ID: ${id}`);
  }

  async deleteMany(addresses: AddressEntity[], entityManger: EntityManager): Promise<any> {
    this.logger.log(`Attempting to delete ${addresses.length} address(es) with entities: ${JSON.stringify(addresses)}`);
    if (!addresses || addresses.length === 0) return;
    for (const address of addresses) {
      if(address != null) {
        await this.delete(address.id, entityManger);
      }
    }
  }
}
