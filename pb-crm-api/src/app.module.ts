import {  Module } from '@nestjs/common';
import {AuthnModule} from './authn/authn.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ContactModule} from "./contact/contact.module";
import { UsersModule } from './authn/users/users.module';
import {ConfigModule} from "@nestjs/config";
import { UploadController } from './upload/upload.controller';
import { UploadService } from './upload/upload.service';
import { UploadModule } from './upload/upload.module';
import { MulterModule } from '@nestjs/platform-express';


@Module({
    imports: [
        ConfigModule.forRoot(),
        MulterModule.registerAsync({
          useFactory: () => ({
            dest: './files'
          }),
        }),
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
        UsersModule,
        UploadModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule{
}
