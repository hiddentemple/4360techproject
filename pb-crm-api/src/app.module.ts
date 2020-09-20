import {Module} from '@nestjs/common';
import {AuthnModule} from './authn/authn.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ContactsController} from "./contact/contacts.controller";
import {ContactEntity} from "./db/entities/contact.entity";
import {EmailEntity} from "./db/entities/email.entity";
import {PhoneEntity} from "./db/entities/phone.entity";
import {UserEntity} from "./db/entities/user.entity";
import {UserTypeEntity} from "./db/entities/user-type.entity";
import {ContactModule} from "./contact/contact.module";
import { UsersModule } from './authn/users/users.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        // Feature Modules
        ContactModule,
        AuthnModule,
        UsersModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
