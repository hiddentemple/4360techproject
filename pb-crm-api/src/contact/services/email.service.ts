import {BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {EmailEntity} from "../../db/entities/email.entity";
import {EntityManager, Repository} from "typeorm";
import {EmailDTO} from "@hiddentemple/api-interfaces";
import {ContactEntity} from "../../db/entities/contact.entity";


@Injectable()
export class EmailService {
    private readonly logger = new Logger(EmailService.name)

    constructor(
        @InjectRepository(EmailEntity) private repo: Repository<EmailEntity>
    ) {}

    async getById(id: string): Promise<EmailEntity> {
        const email: EmailEntity = await this.repo.findOne({id});
        if (!email) throw new NotFoundException();
        return email;
    }

    private async create(contact: ContactEntity, dto: EmailDTO, entityManager: EntityManager): Promise<EmailEntity> {
        this.logger.log(`Creating a new email for contact with id ${contact.id} from DTO: ${JSON.stringify(dto)}`)
        const newEmail: EmailEntity = entityManager.create<EmailEntity>(EmailEntity, {...dto, contact});
        const savedEmail: EmailEntity = await entityManager.save(newEmail);
        this.logger.log(`Saved email: ${JSON.stringify(savedEmail)}`);
        return newEmail;
    }

    async createMany(contact: ContactEntity, emailDTOS: EmailDTO[], entityManger: EntityManager): Promise<EmailEntity[]> {
        if (!emailDTOS || emailDTOS === []) return [];

        this.logger.log(`Creating ${emailDTOS.length} email(s): ${JSON.stringify(emailDTOS)}`)
        if (!this.containsNoMoreThanOnePrimary(emailDTOS)) {
            const errMsg: string = "Emails contained more than 1 primary.";
            this.logger.error(`${errMsg} Emails: ${JSON.stringify(emailDTOS)}`);
            throw new BadRequestException(errMsg)
        }

        const newEmails: EmailEntity[] = [];
        for (const emailDTO of emailDTOS) {
            const newEmail: EmailEntity = await this.create(contact, emailDTO, entityManger);
            newEmails.push(newEmail);
        }
        this.logger.log(`Created ${newEmails.length} email(s): ${JSON.stringify(newEmails)}`)
        return newEmails;
    }

    async updateMany(contact: ContactEntity, emailDTOS: EmailDTO[], entityManager: EntityManager): Promise<EmailEntity[]> {
        if (!emailDTOS || emailDTOS.length === 0) return;
        this.logger.log(`Updating ${emailDTOS.length} email(s) from DTO: ${JSON.stringify(emailDTOS)}`)
        await this.deleteMany(contact.emails, entityManager);
        const updatedEmails: EmailEntity[] = await this.createMany(contact, emailDTOS, entityManager);
        this.logger.log(`Finished ${emailDTOS.length} email(s)`);
        return updatedEmails;
    }

    async delete(id: string, entityManager: EntityManager): Promise<any> {
        this.logger.log(`Attempting delete email with id ${id}`)
        const email: EmailEntity = await this.getById(id);
        const {affected} = await entityManager.delete(EmailEntity, email);
        if (affected !== 1) {
            const errMsg = `Failed to delete email with id ${id}`
            this.logger.error(errMsg)
            throw new InternalServerErrorException(errMsg)
        }
        this.logger.log(`Delete email success. ID: ${id}`)
    }

    async deleteMany(emails: EmailEntity[], entityManger: EntityManager): Promise<any> {
        if (!emails || emails.length == 0) return
        this.logger.log(`Attempting to delete ${emails.length} email(s) with entities: ${JSON.stringify(emails)}`)
        if (!emails || emails.length === 0) return;
        for (const email of emails) { await this.delete(email.id, entityManger) }
    }

    containsNoMoreThanOnePrimary(emails: EmailDTO[]): boolean {
        const primaries: EmailDTO[] = emails.filter(email => email.isPrimary);
        return primaries.length <= 1;
    }
}