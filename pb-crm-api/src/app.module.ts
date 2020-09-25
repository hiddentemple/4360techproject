import {Module} from '@nestjs/common';
import {AuthnModule} from './authn/authn.module';
import {TypeOrmModule} from "@nestjs/typeorm";
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
