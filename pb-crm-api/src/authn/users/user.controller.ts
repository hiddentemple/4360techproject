import { Controller, HttpCode, HttpException, HttpStatus, UseFilters } from '@nestjs/common';
import {Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest} from "@nestjsx/crud";
import {UserService} from "./user.service";
import {UserEntity} from "../../db/entities/user.entity";
import {
  CreateUserResponse
} from "../../api-interfaces/user/contracts/create.user";
import { ErrorService } from '../../services/error.service';



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
  constructor(public service: UserService, public errorService: ErrorService) {}

  get base(): CrudController<UserEntity> {
    return this;
  }

  @Override()
  @HttpCode(201)
  async createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: UserEntity): Promise<CreateUserResponse> {
    const user: UserEntity = await this.base.createOneBase(req, dto).catch(error =>{
      error = this.errorService.handleError(error)
      throw error
    });
    return {
      message: "User created",
      id: user.id
    };
  }


}
