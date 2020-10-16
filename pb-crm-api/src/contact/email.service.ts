import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {EmailEntity} from "../db/entities/email.entity";
import {Repository} from "typeorm";
import {CategoryService} from "./category.service";
import {
    EmailModel,
    Categorized,
    CreateEmailDTO,
    UpdateEmailDTO,
    containsExactlyOnePrimary
} from "@hiddentemple/api-interfaces";



@Injectable()
export class EmailService {
    constructor(
        @InjectRepository(EmailEntity) private repo: Repository<EmailEntity>,
        private categoryService: CategoryService
    ) {}

    async getAllForContact(contactId: string): Promise<EmailEntity[] | undefined> {
        return undefined
    }

    async create(contactId: string, dto: CreateEmailDTO): Promise<EmailEntity> {
        return undefined
    }

    async createMany(id: string, emails: CreateEmailDTO[]): Promise<EmailEntity[]> {
        return undefined
    }

    async update(contactId: string, dto: UpdateEmailDTO): Promise<EmailEntity> {
        return undefined
    }

    async updateMany(id: string, emails: UpdateEmailDTO[]): Promise<EmailEntity[]> {
        return undefined
    }

    async delete(contactId: string, emailId: string): Promise<any> {

    }

    async deleteMany(contactId: string, emailIds: EmailEntity[]): Promise<any> {

    }

    containsPrimary(emails: EmailEntity[]): boolean {
        return containsExactlyOnePrimary(emails.map(email => email.category));
    }

}