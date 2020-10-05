import {Module} from '@nestjs/common';
import {AuthnModule} from './authn/authn.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ContactModule} from "./contact/contact.module";
import { UsersModule } from './authn/users/users.module';

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
            "entities": ["dist/db/entities/**/*.entity{.js, .ts}"],
            "extra": {
                "ssl": {
                    "rejectUnauthorized": false
                }
            },
            "synchronize": false,
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
