import {BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {EntityManager, Repository} from "typeorm";
import {PhoneDTO} from "@hiddentemple/api-interfaces";
import {ContactEntity} from "../../db/entities/contact.entity";
import {PhoneEntity} from "../../db/entities/phone.entity";


@Injectable()
export class PhoneService {
    private readonly logger = new Logger(PhoneService.name)

    constructor(
        @InjectRepository(PhoneEntity) private repo: Repository<PhoneEntity>,
  
    ) {}

    async getById(id: string): Promise<PhoneEntity> {
        const phone: PhoneEntity = await this.repo.findOne({id});
        if (!phone) throw new NotFoundException();
        return phone;
    }

    async create(contact: ContactEntity, dto: PhoneDTO, entityManager: EntityManager): Promise<PhoneEntity> {
        this.logger.log(`Creating a new phone for contact with id ${contact.id} from DTO: ${JSON.stringify(dto)}`)
        const newPhone: PhoneEntity = await entityManager.create<PhoneEntity>(PhoneEntity, {...dto, contact});
        const savedPhone: PhoneEntity = await entityManager.save(newPhone);
        this.logger.log(`Saved phone: ${JSON.stringify(savedPhone)}`);
        return savedPhone;
    }

    async createMany(contact: ContactEntity, phoneDTOS: PhoneDTO[], entityManger: EntityManager): Promise<PhoneEntity[]> {
        if (!phoneDTOS || phoneDTOS === []) return [];
        this.logger.log(`Creating ${phoneDTOS.length} phone(s): ${JSON.stringify(phoneDTOS)}`)
        if (!this.containsNoMoreThanOnePrimary(phoneDTOS)) {
            const errMsg: string = "Phones contained more than 1 primary.";
            this.logger.error(`${errMsg}  Phones: ${JSON.stringify(phoneDTOS)}`);
            throw new BadRequestException(errMsg)
        }

        const newPhones: PhoneEntity[] = [];
        for (const phoneDTO of phoneDTOS) {
            const newPhone: PhoneEntity = await this.create(contact, phoneDTO, entityManger);
            newPhones.push(newPhone);
        }
        return newPhones;
    }

    async updateMany(contact: ContactEntity, phoneDTOs: PhoneDTO[], entityManger: EntityManager): Promise<PhoneEntity[]> {
        if (!phoneDTOs || phoneDTOs.length === 0) return;
        this.logger.log(`Updating ${phoneDTOs.length} phone(s) from DTO: ${JSON.stringify(phoneDTOs)}`)
        await this.deleteMany(contact.phones, entityManger);
        const updatedPhones: PhoneEntity[] = await this.createMany(contact, phoneDTOs, entityManger);
        this.logger.log(`Finished ${phoneDTOs.length} phone(s)`);
        return updatedPhones;
    }

    async delete(id: string, entityManager: EntityManager): Promise<any> {
        this.logger.log(`Attempting delete phone with id ${id}`)
        const phone: PhoneEntity = await this.getById(id);
        const {affected} = await entityManager.delete<PhoneEntity>(PhoneEntity, phone);
        if (affected !== 1) {
            const errMsg = `Failed to delete phone with id ${id}`
            this.logger.error(errMsg)
            throw new InternalServerErrorException(errMsg)
        }
        this.logger.log(`Delete phone success. ID: ${id}`)
    }

    async deleteMany(phones: PhoneEntity[], entityManager: EntityManager): Promise<any> {
        if (!phones || phones.length === 0) return
        this.logger.log(`Attempting to delete ${phones.length} phone(s) with DTO: ${JSON.stringify(phones)}`)
        for (const phone of phones) { await this.delete(phone.id, entityManager) }
        this.logger.log(`Successfully deleted ${phones.length} phone(s)`)
    }

    containsNoMoreThanOnePrimary(phones: PhoneDTO[]): boolean {
        const primaries: PhoneDTO[] = phones.filter(phone => phone.isPrimary);
        return primaries.length <= 1;
    }
}
