import {Module} from '@nestjs/common';
import {AuthnModule} from './authn/authn.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ContactModule} from "./contact/contact.module";
import {UsersModule} from './authn/users/users.module';
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot(
            // If ENV system environment variable is 'local' connect to local postgres container
            // otherwise, defer to ormconfig.json
            process.env.ENV === 'local' ? {
                "type": "postgres",
                "host": "localhost",
                "port": 5432,
                "username": "postgres",
                "password": "localpassword",
                "entities": ["dist/db/entities/**/*.entity{.js, .ts}"],
                "synchronize": true,
                "logging": true,
            } : {}
        ),
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
