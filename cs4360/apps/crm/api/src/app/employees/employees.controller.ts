import { Controller } from '@nestjs/common';
import {Crud} from "@nestjsx/crud";
import {EmployeeEntity} from "./employees.entity";

@Crud({
  model: {
    type: EmployeeEntity
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true
    }
  }
})

@Controller('employees')
export class EmployeesController {}
