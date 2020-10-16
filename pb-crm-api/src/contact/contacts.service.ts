import {Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {ContactEntity} from "../db/entities/contact.entity";
import {DeleteResult, Repository, UpdateResult} from "typeorm";
import {EmailService} from "./email.service";
import {
  ContactModel,
  CreateContactRequest,
  UpdateContactRequest,
  UpdateContactResponse
} from "@hiddentemple/api-interfaces";
import {EmailEntity} from "../db/entities/email.entity";



@Injectable()
export class ContactsService{
  constructor(
      @InjectRepository(ContactEntity) private repo: Repository<ContactEntity>,
      private emailService: EmailService
  ) {}

  async get(id: string): Promise<ContactEntity> {
    const contact: ContactEntity = await this.repo.findOne(id);
    if (!contact) { throw new NotFoundException(); }
    return contact;
  }

  async create(dto: CreateContactRequest): Promise<ContactEntity> {
    const {emails, phones, ...simpleProperties} = dto.contact;
    const newContact: ContactEntity = this.repo.create(simpleProperties);
    const {id} = newContact;

    if (!id || id === '') throw new Error("Id did not auto-populate")

    await this.emailService.createMany(id, emails);

    // TODO Phones

    return this.repo.save(newContact) // TODO or should this defer to this.get?
  }

  async update(id: string, dto: UpdateContactRequest): Promise<ContactEntity> {
    const contact: ContactEntity = await this.get(id);

    const {emails, phones, ...simpleProperties} = dto.contact;
    const acc: Partial<ContactEntity> = {};
    const reducer = (acc, [key, value]) => {
      if (value && value !== '') { return {...acc, [key]: value}; }
      else { return acc; }
    };
    const filtered: Partial<ContactEntity> = Object.entries(simpleProperties).reduce(reducer, acc);
    Object.assign(contact, filtered);

    await this.emailService.updateMany(id, emails)
    if (phones) { /* TODO */ }

    const {affected}: UpdateResult = await this.repo.update({id}, filtered);
    if (affected === 0) { throw new InternalServerErrorException("Failed to update contact")}
    // TODO what if only the email/phones are updated? wont this be 0?

    return this.get(id);
  }

  async delete(id: string): Promise<any> {
    const contact: ContactEntity = await this.get(id);

    await this.emailService.deleteMany(id, contact.emails);
    // TODO phones

    const {affected}: DeleteResult = await this.repo.delete({id});
    if (affected === 0) { throw new InternalServerErrorException("Could not delete contact"); }

  }

}
