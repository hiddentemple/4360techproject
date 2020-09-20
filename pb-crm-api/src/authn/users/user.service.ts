import { Injectable } from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UserEntity} from "../../db/entities/user.entity";

@Injectable()
export class UserService extends TypeOrmCrudService<UserEntity>{
  constructor(@InjectRepository(UserEntity) public repo: Repository<UserEntity>) {
    super(repo);
  }
}
