import { Injectable } from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {UserEntity} from "@crm/nest/entities";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity>{
  constructor(@InjectRepository(UserEntity) repo) {
    super(repo);
  }
}
