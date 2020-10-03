import { Controller, HttpCode } from '@nestjs/common';
import {Crud, CrudController, CrudRequest, Override, ParsedBody, ParsedRequest} from "@nestjsx/crud";
import {UserService} from "./user.service";
import {UserEntity} from "../../db/entities/user.entity";
import { CreateUserResponse } from 'api-interfaces';
import { ErrorService } from '../../services/error.service';


@Crud({
  model: {
    type: UserEntity
  },
  //these are parameters that are used in request --> /api/contacts/{{id}}
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


  //allows customization of POST request for a single user
  @Override()
  @HttpCode(201)
  // tries to create a user in the postgresDB
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
