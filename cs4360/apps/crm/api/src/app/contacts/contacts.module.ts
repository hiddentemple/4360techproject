import { Module } from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { ContactsController } from './contacts.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ContactEntity} from "./contacts.entity";

@Module({
  imports: [ TypeOrmModule.forFeature([ ContactEntity ])],
  providers: [ContactsService],
  controllers: [ContactsController]
})
export class ContactsModule {}
