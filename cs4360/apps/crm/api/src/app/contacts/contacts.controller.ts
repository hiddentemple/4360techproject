import { Controller } from '@nestjs/common';
import {Crud} from "@nestjsx/crud";
import {ContactEntity} from "./contacts.entity";
import {ContactsService} from "./contacts.service";

@Crud({
  model: {
    type: ContactEntity
  },
  params: {
    id:{
      field: "id",
      type: "uuid",
      primary: true
    }
  }
})

@Controller('contacts')
export class ContactsController {
  constructor(public service: ContactsService) {}
}
