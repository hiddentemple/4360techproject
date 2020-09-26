import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ContactEntity} from "../db/entities/contact.entity";
import {EmailEntity} from "../db/entities/email.entity";
import {PhoneEntity} from "../db/entities/phone.entity";
import {ContactsController} from "./contacts.controller";
import {ContactsService} from "./contacts.service";
import { ErrorService } from '../services/error.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([ ContactEntity ] )
    ],
    controllers: [ContactsController],
    providers: [ContactsService, ErrorService],
})
export class ContactModule {}
