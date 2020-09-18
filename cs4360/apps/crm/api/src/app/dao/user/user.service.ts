import { Injectable } from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {UserEntity} from "@crm/nest/entities";
import {InjectRepository} from "@nestjs/typeorm";
import {UserDTO} from "@crm/shared";
import {Repository} from "typeorm";

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity>{
  constructor(@InjectRepository(UserEntity) public repo: Repository<UserEntity>) {
    super(repo);
  }
}
