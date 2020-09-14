import { Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesController } from './employees.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {EmployeeEntity} from "./employees.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ EmployeeEntity ])],
  providers: [EmployeesService],
  controllers: [EmployeesController]
})
export class EmployeesModule {}
