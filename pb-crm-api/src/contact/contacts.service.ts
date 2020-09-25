import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";

import {ContactEntity} from "../db/entities/contact.entity";
import { ContactModel } from '../api-interfaces/contact/models/contact.model';

@Injectable()
export class ContactsService extends TypeOrmCrudService<ContactEntity>{
  constructor(@InjectRepository(ContactEntity) repo) {
    super(repo);
  }




}
