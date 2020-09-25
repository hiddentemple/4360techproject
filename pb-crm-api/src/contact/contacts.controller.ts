import { Controller, HttpCode } from '@nestjs/common';
import {Crud, CrudAuth, CrudController} from "@nestjsx/crud";
import {ContactsService} from "./contacts.service";
import {ContactEntity} from "../db/entities/contact.entity";


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
export class ContactsController {
  constructor(public service: ContactsService) {
  }
}
