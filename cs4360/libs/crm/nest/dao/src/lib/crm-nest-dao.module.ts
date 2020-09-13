import { Module } from '@nestjs/common';
import {ContactEntity} from "./entities/contact.entity";
import {EmployeeEntity} from "./entities/employee.entity";
import {CompanyEntity} from "./entities/company.entity";

@Module({
  controllers: [],
  providers: [],
  exports: [ContactEntity, EmployeeEntity, CompanyEntity],
})
export class CrmNestDaoModule {}
