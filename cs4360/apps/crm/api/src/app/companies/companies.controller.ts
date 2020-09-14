import { Controller } from '@nestjs/common';
import {Crud} from "@nestjsx/crud";
import {CompanyEntity} from "./companies.entity";
import {CompaniesService} from "./companies.service";

@Crud({
  model: {
    type: CompanyEntity
  },
  params:{
    id: {
      field: 'id',
      type: 'uuid',
      primary: true
    }
  }
})

@Controller('companies')
export class CompaniesController {
  constructor(public service: CompaniesService) {
  }
}
