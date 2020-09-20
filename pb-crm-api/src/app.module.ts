import {Module} from '@nestjs/common';
import {AuthnModule} from './authn/authn.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ContactsController} from "./contact/contacts.controller";
import {ContactEntity} from "./entities/contact.entity";
import {EmailEntity} from "./entities/email.entity";
import {PhoneEntity} from "./entities/phone.entity";
import {UserEntity} from "./entities/user.entity";
import {UserTypeEntity} from "./entities/user-type.entity";
import {ContactModule} from "./contact/contact.module";

@Module({
    imports: [
        TypeOrmModule.forRoot(),
        // Feature Modules
        ContactModule,
        AuthnModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
