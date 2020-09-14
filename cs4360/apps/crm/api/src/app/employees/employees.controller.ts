import { Controller } from '@nestjs/common';
import {Crud} from "@nestjsx/crud";
import {EmployeeEntity} from "./employees.entity";
import {EmployeesService} from "./employees.service";

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
export class EmployeesController {
  constructor(public service: EmployeesService) {
  }
}
