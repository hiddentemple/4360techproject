import {Controller, Type} from '@nestjs/common';
import {Crud, CrudController, CrudOptions, CrudRequest, Override, ParsedBody, ParsedRequest} from "@nestjsx/crud";
import {UserService} from "./user.service";
import {UserEntity} from "./entities/user.entity";
import {
  CreateUserRequest,
  CreateUserResponse
} from "../../../../api-interfaces/contact-book/user/contracts/create.user";
import {UserModel} from "../../../../api-interfaces/contact-book/user/model/user.model";


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
