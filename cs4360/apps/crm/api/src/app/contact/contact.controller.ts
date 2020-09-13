import { Controller } from '@nestjs/common';
import { Crud } from "@nestjsx/crud";
import { ContactService } from "./contact.service";
import { ContactEntity } from "./contact.entity";

@Crud({
  model: {
    type: ContactEntity
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true
    }
  }
})
@Controller('contact')
export class ContactController {
  constructor(public service: ContactService) {
  }
}
