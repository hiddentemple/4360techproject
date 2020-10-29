import {Injectable, InternalServerErrorException, Logger, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ContactEntity} from "../../db/entities/contact.entity";
import {DeleteResult, EntityManager, getConnection, Repository, UpdateResult} from "typeorm";
import {EmailService} from "./email.service";
import {CreateContactRequest, UpdateContactRequest} from "@hiddentemple/api-interfaces";
import {PhoneService} from "./phone.service";

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name)

  constructor(
      @InjectRepository(ContactEntity) private contactRepo: Repository<ContactEntity>,
      private emailService: EmailService,
      private phoneService: PhoneService
  ) {}

  async getAll(): Promise<ContactEntity[]> {
    return this.contactRepo.find();
  }

  async getById(id: string): Promise<ContactEntity> {
    const contact: ContactEntity = await this.contactRepo.findOne(id);
    if (!contact) {
      throw new NotFoundException();
    }
    return contact;
  }

  async create(req: CreateContactRequest): Promise<ContactEntity> {
    this.logger.log(`Creating contact from request ${JSON.stringify(req)}`)

    const {contact} = req;
    let savedContact: ContactEntity;
    await getConnection().transaction(async (entityManager: EntityManager) => {
       const newContact = await entityManager.create<ContactEntity>( ContactEntity, {
        firstName: contact.firstName,
        lastName: contact.lastName,
        company: contact.company,
        notes: contact.notes,
        jobTitle: contact.jobTitle,
        department: contact.department,
        organization: contact.organization,
        gender: contact.gender
      });

      savedContact = await entityManager.save(newContact); // Populates ID
      await this.emailService.createMany(newContact, contact.emails, entityManager)
      await this.phoneService.createMany(newContact, contact.phones, entityManager)
    })

    const createdContact = await this.getById(savedContact.id)
    this.logger.log(`Saved new contact as ${JSON.stringify(createdContact)}`)
    return createdContact;
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

    await getConnection().transaction(async entityManger => {
      await this.emailService.updateMany(contact, dto.contact.emails, entityManger)
      await this.phoneService.updateMany(contact, dto.contact.phones, entityManger)
      const {affected}: UpdateResult = await entityManger.update<ContactEntity>(ContactEntity, id, filtered);
      if (affected === 0) {
        throw new InternalServerErrorException("Failed to update contact")
      }
    })

    return this.getById(id);
  }

  async delete(id: string): Promise<any> {
    this.logger.log(`Attempting delete of contact with id ${JSON.stringify(id)}`)
    const contact: ContactEntity = await this.getById(id);
    this.logger.log(`Found contact to delete: ${JSON.stringify(contact)}`)

    await getConnection().transaction(async entityManger => {
      await this.emailService.deleteMany(contact.emails, entityManger);
      await this.phoneService.deleteMany(contact.phones, entityManger);

      const {affected}: DeleteResult = await entityManger.delete<ContactEntity>(ContactEntity, id);
      if (affected === 0) {
        const errMsg = `Could not delete contact: ${JSON.stringify(contact)}`;
        this.logger.error(errMsg);
        throw new InternalServerErrorException(errMsg);
      }
    })

    this.logger.log(`Deleted contact with id ${JSON.stringify(id)}`)
  }
}