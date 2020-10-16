
import {BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CategoryService} from "./category.service";
import {
    containsExactlyOnePrimary,
    CreateEmailDTO,
    CreatePhoneDTO,
    UpdateEmailDTO,
    UpdatePhoneDTO
} from "@hiddentemple/api-interfaces";
import {CategoryEntity} from "../db/entities/category.entity";
import {ContactEntity} from "../db/entities/contact.entity";
import {PhoneEntity} from "../db/entities/phone.entity";


@Injectable()
export class PhoneService {
    private readonly logger = new Logger(PhoneService.name)

    constructor(
        @InjectRepository(PhoneEntity) private repo: Repository<PhoneEntity>,
        private categoryService: CategoryService,
    ) {}

    async getById(id: string): Promise<PhoneEntity> {
        const phone: PhoneEntity = await this.repo.findOne({id});
        if (!phone) throw new NotFoundException();
        return phone;
    }

    async create(contact: ContactEntity, dto: CreatePhoneDTO): Promise<PhoneEntity> {
        this.logger.log(`Creating a new phone for contact with id ${contact.id} from DTO: ${JSON.stringify(dto)}`)
        const category: CategoryEntity = await this.categoryService.verifyCategory(dto.categoryId);
        const newPhone: PhoneEntity = await this.repo.create({...dto, category, contact});
        const savedPhone: PhoneEntity = await this.repo.save(newPhone);
        this.logger.log(`Saved phone: ${JSON.stringify(savedPhone)}`);
        return savedPhone;
    }

    async createMany(contact: ContactEntity, phoneDTOS: CreatePhoneDTO[]): Promise<PhoneEntity[]> {
        if (!phoneDTOS || phoneDTOS === []) return [];

        this.logger.log(`Creating ${phoneDTOS.length} phone(s): ${JSON.stringify(phoneDTOS)}`)
        const newPhones: PhoneEntity[] = [];
        for (const phoneDTO of phoneDTOS) {
            const newPhone: PhoneEntity = await this.create(contact, phoneDTO);
            newPhones.push(newPhone);
        }
        return newPhones;
    }

    async update(dto: UpdatePhoneDTO): Promise<PhoneEntity> {
        this.logger.log(`Updating phone from dto ${JSON.stringify(dto)}`)

        const {id, ...simpleProperties} = dto;
        const phone: PhoneEntity = await this.getById(id);
        const category: CategoryEntity = await this.categoryService.verifyCategory(dto.categoryId);

        Object.assign(phone, simpleProperties);

        const {affected, generatedMaps} = await this.repo.update(id, {...phone, category});
        if (affected !== 1) {
            const errMsg = `Failed to update phone with id ${id}`
            this.logger.error(errMsg)
            throw new InternalServerErrorException(errMsg)
        }

        this.logger.log(`Updated phone: ${JSON.stringify(generatedMaps)}`)
        return phone; // does the update call automatically update this reference?
    }

    async updateMany(phoneDTOS: UpdatePhoneDTO[]): Promise<PhoneEntity[]> {
        if (!phoneDTOS || phoneDTOS.length === 0) return;
        this.logger.log(`Updating ${phoneDTOS.length} phone(s) from DTO: ${JSON.stringify(phoneDTOS)}`)
        const updatedPhones: PhoneEntity[] = [];
        for (const phoneDTO of phoneDTOS) {
            const updatedPhone: PhoneEntity = await this.update(phoneDTO);
            updatedPhones.push(updatedPhone);
        }
        return updatedPhones;
    }

    async delete(id: string): Promise<any> {
        this.logger.log(`Attempting delete phone with id ${id}`)
        const phone: PhoneEntity = await this.getById(id);
        const {affected} = await this.repo.delete(phone);
        if (affected !== 1) {
            const errMsg = `Failed to delete phone with id ${id}`
            this.logger.error(errMsg)
            throw new InternalServerErrorException(errMsg)
        }
        this.logger.log(`Delete phone success. ID: ${id}`)
    }

    async deleteMany(phones: PhoneEntity[]): Promise<any> {
        if (!phones || phones.length === 0) return
        this.logger.log(`Attempting to delete ${phones.length} phone(s) with DTO: ${JSON.stringify(phones)}`)
        for (const phone of phones) { await this.delete(phone.id) }
    }

    containsPrimary(phones: PhoneEntity[]): boolean {
        return containsExactlyOnePrimary(phones.map(phone => phone.category));
    }
}