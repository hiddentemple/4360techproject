import { Injectable } from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {CompanyEntity} from "./companies.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class CompaniesService extends TypeOrmCrudService<CompanyEntity>{
  constructor(@InjectRepository(CompanyEntity) repo) {
    super(repo);
  }
}
