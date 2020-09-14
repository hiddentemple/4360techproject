import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CompanyEntity} from "./companies.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  providers: [CompaniesService],
  controllers: [CompaniesController]
})
export class CompaniesModule {}
