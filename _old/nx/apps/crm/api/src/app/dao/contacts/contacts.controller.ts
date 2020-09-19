import { Controller } from '@nestjs/common';
import {Crud, CrudAuth} from "@nestjsx/crud";
import { ContactEntity } from '@crm/nest/entities';
import {ContactsService} from "./contacts.service";

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
  constructor(public service: ContactsService) {}
}
