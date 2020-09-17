import { Controller } from '@nestjs/common';
import {Crud} from "@nestjsx/crud";
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
  }
})

@Controller('contact')
export class ContactsController {
  constructor(public service: ContactsService) {}
}
