import {Module} from '@nestjs/common';
import {AuthnModule} from './authn/authn.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ContactModule} from "./contact/contact.module";
import {UsersModule} from './authn/users/users.module';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {UploadModule} from './upload/upload.module';
import {MulterModule} from '@nestjs/platform-express';
import {ErrorService} from "./core/services/error.service";
import {AccountModule} from './invoicing/account.module';



@Module({
    imports: [
        MulterModule.registerAsync({
            useFactory: () => ({
                dest: './files'
            }),
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule.forRoot({
                envFilePath: `./config/.env.${process.env.ENV}`
            })],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get('DB_HOST'),
                port: +configService.get<number>('DB_PORT'),
                username: configService.get('DB_USR'),
                password: configService.get('DB_PWD'),
                database: configService.get('DB_NAME'),
                entities: ["dist/db/entities/**/*.entity{.js, .ts}"],
                synchronize: configService.get('DB_SYNC') === 'true',
                dropSchema: configService.get('DB_DROP') === 'true',
                logging: true,
                migrations: ["../dist/db/migrations/*{.js,.ts}"],
                seeds: ["../dist/db/seeders/**/*.js"],
                factories: ["../dist/db/factories/**/*.js"],
                cli: {
                    migrationsDir: "src/db/migrations"
                },
                // TODO define ssl for production environment
                ssl: process.env.ENV === 'dev' ? {
                    rejectUnauthorized: false
                }: undefined,
            }),
            inject: [ConfigService],
        }),
        // Feature Modules
        ContactModule,
        AccountModule,
        AuthnModule,
        UsersModule,
        UploadModule,
    ],
    controllers: [],
    providers: [ErrorService],

})

export class AppModule {
}
