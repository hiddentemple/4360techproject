import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Connection} from "typeorm";
import { ContactsModule } from './contacts/contacts.module';
import { EmployeesModule } from './employees/employees.module';
import { CompaniesModule } from './companies/companies.module';
import { ContactEntity } from "./contacts/contacts.entity";
import { EmployeeEntity } from "./employees/employees.entity";
import { CompanyEntity } from "./companies/companies.entity";

@Module({
  imports: [TypeOrmModule.forRoot({
    "type": "postgres",
    "host": "db-4360-techproject-do-user-7683203-0.b.db.ondigitalocean.com",
    "port": 25060,
    "username": "4360user",
    "password": "ogedeqbnk5m7i4pj",
    "database": "crmDB",
    "entities": [ ContactEntity, CompanyEntity, EmployeeEntity ],
    "ssl": true,
    "extra": {
      "ssl": {
        "rejectUnauthorized": false
      }
    },
    "synchronize": true,
    "logging": true
  }),
    ContactsModule,
    EmployeesModule,
    CompaniesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {
  }
}
