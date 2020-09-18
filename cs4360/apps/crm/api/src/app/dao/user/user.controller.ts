import {Controller, Type} from '@nestjs/common';
import {Crud, CrudController, CrudOptions, CrudRequest, Override, ParsedBody, ParsedRequest} from "@nestjsx/crud";
import {UserEntity} from "@crm/nest/entities";
import {UserService} from "./user.service";
import {CreateUserRequest, CreateUserResponse} from "@crm/shared";


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
        eager: true
      },
      contact: {
        allow: ['id']
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
  async createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: CreateUserRequest): Promise<CreateUserResponse> {
    const user: UserEntity = await this.base.createOneBase(req, dto);
    return { id: user.id };
  }
}
