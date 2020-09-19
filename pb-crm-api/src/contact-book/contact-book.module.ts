import {Module} from '@nestjs/common';
import {UsersModule} from './users/users.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ContactEntity} from "./contact/entitites/contact.entity";
import {EmailEntity} from "./contact/entitites/email.entitiy";
import {PhoneEntity} from "./contact/entitites/phone.entity";
import {ContactModule} from "./contact/contact.module";
import {ContactsController} from "./contact/contacts.controller";
import {ContactsService} from "./contact/contacts.service";
import {UserEntity} from "./users/entities/user.entity";
import {UserTypeEntity} from "./users/entities/user-type.entity";

@Module({
    imports: [
        ContactModule,
        UsersModule,
    ],
    exports: [ContactModule, UsersModule]
})
export class ContactBookModule {
}
