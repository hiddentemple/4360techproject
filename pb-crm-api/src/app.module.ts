import {Module} from '@nestjs/common';
import {AuthnModule} from './authn/authn.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ContactModule} from "./contact/contact.module";
import { UsersModule } from './authn/users/users.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            "type": "postgres",
            "host": "localhost",
            "port": 5432,
            "username": "postgres",
            "password": "localpassword",
            // "database": "crmDB",
            // "ssl": false,
            "entities": ["dist/db/entities/**/*.entity{.js, .ts}"],
            // "extra": {
            //     "ssl": {
            //         "rejectUnauthorized": false
            //     }
            // },
            "synchronize": true,
            "logging": true,
            "migrations": ["dist/db/migrations/*{.js,.ts}"],
            // "seeds": ["dist/db/seeders/**/*.js"],
            // "factories": ["dist/db/factories/**/*.js"],
            "cli": {
                "migrationsDir": "src/db/migrations"
            }
        }),
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
