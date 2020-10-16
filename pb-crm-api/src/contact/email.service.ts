import {BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {EmailEntity} from "../db/entities/email.entity";
import {Repository} from "typeorm";
import {CategoryService} from "./category.service";
import {containsExactlyOnePrimary, CreateEmailDTO, UpdateEmailDTO} from "@hiddentemple/api-interfaces";
import {CategoryEntity} from "../db/entities/category.entity";
import {ContactEntity} from "../db/entities/contact.entity";


@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name)

    constructor(
        @InjectRepository(EmailEntity) private repo: Repository<EmailEntity>,
        private categoryService: CategoryService,
    ) {}

    async getById(id: string): Promise<EmailEntity> {
        const email: EmailEntity = await this.repo.findOne({id});
        if (!email) throw new NotFoundException();
        return email;
    }

    async create(contact: ContactEntity, dto: CreateEmailDTO): Promise<EmailEntity> {
        this.logger.log(`Creating a new email for contact with id ${contact.id} from DTO: ${JSON.stringify(dto)}`)
        const category: CategoryEntity = await this.categoryService.verifyCategory(dto.categoryId);
        const newEmail: EmailEntity = await this.repo.create({...dto, category, contact});
        const savedEmail: EmailEntity = await this.repo.save(newEmail);
        this.logger.log(`Saved email: ${JSON.stringify(savedEmail)}`);
        return savedEmail;
    }

    async createMany(contact: ContactEntity, emailDTOS: CreateEmailDTO[]): Promise<EmailEntity[]> {
        if (!emailDTOS || emailDTOS === []) return [];

        this.logger.log(`Creating ${emailDTOS.length} email(s): ${JSON.stringify(emailDTOS)}`)
        const newEmails: EmailEntity[] = [];
        for (const emailDTO of emailDTOS) {
            const newEmail: EmailEntity = await this.create(contact, emailDTO);
            newEmails.push(newEmail);
        }
        return newEmails;
    }

    async update(dto: UpdateEmailDTO): Promise<EmailEntity> {
        this.logger.log(`Updating email from dto ${JSON.stringify(dto)}`)

        const {id, ...simpleProperties} = dto;
        const email: EmailEntity = await this.getById(id);
        const category: CategoryEntity = await this.categoryService.verifyCategory(dto.categoryId);

        Object.assign(email, simpleProperties);

        const {affected, generatedMaps} = await this.repo.update(id, {...email, category});
        if (affected !== 1) {
            const errMsg = `Failed to update email with id ${id}`
            this.logger.error(errMsg)
            throw new InternalServerErrorException(errMsg)
        }

        this.logger.log(`Updated emails: ${JSON.stringify(generatedMaps)}`)
        return email; // does the update call automatically update this reference?
    }

    async updateMany(emailDTOS: UpdateEmailDTO[]): Promise<EmailEntity[]> {
        if (!emailDTOS || emailDTOS.length === 0) return;
        this.logger.log(`Updating many emails from DTO: ${JSON.stringify(emailDTOS)}`)
        const updatedEmails: EmailEntity[] = [];
        for (const emailDTO of emailDTOS) {
            const updatedEmail: EmailEntity = await this.update(emailDTO);
            updatedEmails.push(updatedEmail);
        }
        return updatedEmails;
    }

    async delete(id: string): Promise<any> {
        this.logger.log(`Attempting delete email with id ${id}`)
        const {affected} = await this.repo.delete({id: id});
        if (affected !== 1) {
            const errMsg = `Failed to delete email with id ${id}`
            this.logger.error(errMsg)
            throw new InternalServerErrorException(errMsg)
        }
        this.logger.log(`Delete email success. ID: ${id}`)
    }

    async deleteMany(emails: EmailEntity[]): Promise<any> {
        if (!emails || emails.length == 0) return
        this.logger.log(`Attempting to delete many emails with DTO: ${JSON.stringify(emails)}`)
        if (!emails || emails.length === 0) return;
        for (const email of emails) { await this.delete(email.id) }
    }

    containsPrimary(emails: EmailEntity[]): boolean {
        return containsExactlyOnePrimary(emails.map(email => email.category));
    }
}