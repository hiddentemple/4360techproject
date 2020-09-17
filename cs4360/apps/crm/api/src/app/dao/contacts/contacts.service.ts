import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import {ContactEntity} from "@crm/nest/entities";

@Injectable()
export class ContactsService extends TypeOrmCrudService<ContactEntity>{
  constructor(@InjectRepository(ContactEntity) repo) {
    super(repo);
  }
}
