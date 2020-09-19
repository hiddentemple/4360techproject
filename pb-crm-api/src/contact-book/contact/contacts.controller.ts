import { Controller } from '@nestjs/common';
import {Crud, CrudAuth, CrudController} from "@nestjsx/crud";
import {ContactsService} from "./contacts.service";
import {ContactEntity} from "./entitites/contact.entity";

@Crud({
  model: {
    type: ContactEntity
  },

  params: {
    id:{
      field: 'id',
      type: 'uuid',
      primary: true
    }
  },

  query: {
    join: {
      emails: {
        eager: true
      },
      phones: {
        eager: true
      }
    }
  }
})
@CrudAuth({
  // TODO https://github.com/nestjsx/crud/wiki/Controllers#request-authentication
})
@Controller('contacts')
export class ContactsController implements CrudController<ContactEntity> {
  constructor(public service: ContactsService) {}
}
