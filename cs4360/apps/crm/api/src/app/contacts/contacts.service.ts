import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { ContactEntity } from "./contacts.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ContactsService extends TypeOrmCrudService<ContactEntity>{
  constructor(@InjectRepository(ContactEntity) repo) {
    super(repo);
  }
}
