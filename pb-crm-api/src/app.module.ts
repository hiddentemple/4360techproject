import {Module} from '@nestjs/common';
import {ContactBookModule} from './contact-book/contact-book.module';
import {AuthnModule} from './authn/authn.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ContactsController} from "./contact-book/contact/contacts.controller";
import {ContactEntity} from "./contact-book/contact/entitites/contact.entity";
import {EmailEntity} from "./contact-book/contact/entitites/email.entitiy";
import {PhoneEntity} from "./contact-book/contact/entitites/phone.entity";
import {UserEntity} from "./contact-book/users/entities/user.entity";
import {UserTypeEntity} from "./contact-book/users/entities/user-type.entity";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            "type": "postgres",
            "host": "db-4360-techproject-do-user-7683203-0.b.db.ondigitalocean.com",
            "port": 25060,
            "username": "4360user",
            "password": "ogedeqbnk5m7i4pj",
            "database": "crmDB",
            "ssl": true,
            "extra": {
                "ssl": {
                    "rejectUnauthorized": false
                }
            },
            "synchronize": true,
            "logging": true,
            autoLoadEntities: true,
            entities: [ContactEntity, EmailEntity, PhoneEntity, UserEntity, UserTypeEntity],
        }),
        // Feature Modules
        ContactBookModule,
        AuthnModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
