import {Injectable, InternalServerErrorException, Logger, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ContactEntity} from "../db/entities/contact.entity";
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import {EmailService} from "./email.service";
import {CreateContactRequest, UpdateContactRequest} from "@hiddentemple/api-interfaces";
import {PhoneService} from "./phone.service";

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name)

  constructor(
      @InjectRepository(ContactEntity) private repo: Repository<ContactEntity>,
      private emailService: EmailService,
      private phoneService: PhoneService
  ) {}

  async getAll(): Promise<ContactEntity[]> {
    return this.repo.find();
  }

  async getById(id: string): Promise<ContactEntity> {
    const contact: ContactEntity = await this.repo.findOne(id);
    if (!contact) {
      throw new NotFoundException();
    }
    return contact;
  }

  async create(req: CreateContactRequest): Promise<ContactEntity> {
    this.logger.log(`Creating contact from request ${JSON.stringify(req)}`)

    const {contact} = req;
    const newContact: ContactEntity = this.repo.create({
      firstName: contact.firstName,
      lastName: contact.lastName,
      company: contact.company,
      notes: contact.notes,
    });
    await this.repo.save(newContact);

    await this.emailService.createMany(newContact, contact.emails);
    await this.phoneService.createMany(newContact, contact.phones)

    const savedContact: ContactEntity = await this.repo.save(newContact);
    this.logger.log(`Saved new contact as ${JSON.stringify(savedContact)}`)
    return this.getById(newContact.id);
  }

  async update(id: string, dto: UpdateContactRequest): Promise<ContactEntity> {
    this.logger.log(`Attempting to update contact with id ${id} with DTO ${JSON.stringify(dto)}`)
    const contact: ContactEntity = await this.getById(id);

    const acc: Partial<ContactEntity> = {};
    const reducer = (acc, [key, value]) => {
      if (value && value !== '' && key !== 'emails' && key !== 'phones') {
        return {...acc, [key]: value};
      } else {
        return acc;
      }
    };
    const filtered: Partial<ContactEntity> = Object.entries(dto.contact).reduce(reducer, acc);
    this.logger.log(`Reduced DTO to simple properties: ${JSON.stringify(filtered)}`)

    Object.assign(contact, filtered);
    this.logger.log(`Updated contact with simple properties: ${JSON.stringify(contact)}`)

    await this.emailService.updateMany(dto.contact.emails)
    await this.phoneService.updateMany(dto.contact.phones)

    const {affected}: UpdateResult = await this.repo.update({id}, filtered);
    if (affected === 0) {
      throw new InternalServerErrorException("Failed to update contact")
    }
    // TODO what if only the email/phones are updated? wont this be 0?

    return this.getById(id);
  }

  async delete(id: string): Promise<any> {
    this.logger.log(`Attempting delete of contact with id ${JSON.stringify(id)}`)
    const contact: ContactEntity = await this.getById(id);
    this.logger.log(`Found contact to delete: ${JSON.stringify(contact)}`)

    await this.emailService.deleteMany(contact.emails);
    await this.phoneService.deleteMany(contact.phones);

    const {affected}: DeleteResult = await this.repo.delete(id);
    if (affected === 0) {
      const errMsg = `Could not delete contact: ${JSON.stringify(contact)}`;
      this.logger.error(errMsg);
      throw new InternalServerErrorException(errMsg);
    }

    this.logger.log(`Deleted contact with id ${JSON.stringify(id)}`)
  }
}