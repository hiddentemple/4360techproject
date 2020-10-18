import {BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {EmailEntity} from "../../db/entities/email.entity";
import {Repository} from "typeorm";
import {CategoryService} from "./category.service";
import {containsExactlyOnePrimary, EmailDTO} from "@hiddentemple/api-interfaces";
import {CategoryEntity} from "../../db/entities/category.entity";
import {ContactEntity} from "../../db/entities/contact.entity";


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

    private async create(contact: ContactEntity, dto: EmailDTO): Promise<EmailEntity> {
        this.logger.log(`Creating a new email for contact with id ${contact.id} from DTO: ${JSON.stringify(dto)}`)
        const category: CategoryEntity = await this.categoryService.verifyCategory(dto.categoryId);
        const newEmail: EmailEntity = await this.repo.create({...dto, category, contact});
        const savedEmail: EmailEntity = await this.repo.save(newEmail);
        this.logger.log(`Saved email: ${JSON.stringify(savedEmail)}`);
        return savedEmail;
    }

    async createMany(contact: ContactEntity, emailDTOS: EmailDTO[]): Promise<EmailEntity[]> {
        if (!emailDTOS || emailDTOS === []) return [];

        this.logger.log(`Creating ${emailDTOS.length} email(s): ${JSON.stringify(emailDTOS)}`)
        const categoryIds = emailDTOS.map(email => email.categoryId);
        await this.categoryService.requireExactlyOnePrimary('email', categoryIds)

        const newEmails: EmailEntity[] = [];
        for (const emailDTO of emailDTOS) {
            const newEmail: EmailEntity = await this.create(contact, emailDTO);
            newEmails.push(newEmail);
        }
        this.logger.log(`Created ${newEmails.length} email(s): ${JSON.stringify(newEmails)}`)
        return newEmails;
    }

    async updateMany(contact: ContactEntity, emailDTOS: EmailDTO[]): Promise<EmailEntity[]> {
        if (!emailDTOS || emailDTOS.length === 0) return;
        this.logger.log(`Updating ${emailDTOS.length} email(s) from DTO: ${JSON.stringify(emailDTOS)}`)
        await this.deleteMany(contact.emails);
        const updatedEmails: EmailEntity[] = await this.createMany(contact, emailDTOS);
        this.logger.log(`Finished ${emailDTOS.length} email(s)`);
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
        this.logger.log(`Attempting to delete ${emails.length} email(s) with entities: ${JSON.stringify(emails)}`)
        if (!emails || emails.length === 0) return;
        for (const email of emails) { await this.delete(email.id) }
    }

    containsPrimary(emails: EmailEntity[]): boolean {
        return containsExactlyOnePrimary(emails.map(email => email.category));
    }
}