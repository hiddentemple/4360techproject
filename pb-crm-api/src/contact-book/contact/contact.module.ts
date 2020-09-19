import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ContactEntity} from "./entitites/contact.entity";
import {EmailEntity} from "./entitites/email.entitiy";
import {PhoneEntity} from "./entitites/phone.entity";
import {ContactsController} from "./contacts.controller";
import {ContactsService} from "./contacts.service";

@Module({
    imports: [
        TypeOrmModule.forFeature([ EmailEntity, ContactEntity, PhoneEntity ] )
    ],
    controllers: [ContactsController],
    providers: [ContactsService],
    exports: [ContactsController]
})
export class ContactModule {}
