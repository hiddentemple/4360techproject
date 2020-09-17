import { Controller } from '@nestjs/common';
import {Crud} from "@nestjsx/crud";
import {UserEntity} from "@crm/nest/entities";
import {UserService} from "./user.service";


@Crud({
  model: {
    type: UserEntity
  },
  params:{
    id:{
      field: 'id',
      type: 'uuid',
      primary: true
    }
  }
})


@Controller('user')
export class UserController {
  constructor(public service: UserService) {}
}
