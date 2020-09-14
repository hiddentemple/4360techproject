import { Injectable } from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {EmployeeEntity} from "./employees.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class EmployeesService extends TypeOrmCrudService<EmployeeEntity>{
  constructor(@InjectRepository(EmployeeEntity) repo) {
    super(repo);
  }
}
