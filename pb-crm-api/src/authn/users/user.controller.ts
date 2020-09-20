import {Controller} from '@nestjs/common';
import {Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest} from "@nestjsx/crud";
import {UserService} from "./user.service";
import {UserEntity} from "../../db/entities/user.entity";
import {
  CreateUserResponse
} from "../../api-interfaces/user/contracts/create.user";



@Crud({
  model: {
    type: UserEntity
  },
  params:{
    id: {
      field: 'id',
      type: 'uuid',
      primary: true
    }
  },
  query: {
    join: {
      userType: {
        eager: true, // deep copy down
      },
      contact: {
        eager: true,
        allow: ['id', 'firstName', 'lastName']
      }
    },
    exclude: ['passwordHash']
  },
})
@Controller('users')
export class UserController implements CrudController<UserEntity> {
  constructor(public service: UserService) {}

  get base(): CrudController<UserEntity> {
    return this;
  }

  @Override()
  async createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: UserEntity): Promise<CreateUserResponse> {
    const user: UserEntity = await this.base.createOneBase(req, dto);
    return { id: user.id };
  }
}
