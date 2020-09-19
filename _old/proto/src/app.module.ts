import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {ProductsModule} from "./products/products.module";
import {MongooseModule} from "@nestjs/mongoose";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [
        ProductsModule,
        MongooseModule.forRoot(
            "mongodb+srv://dbAdmin:yk5wJWFDcen9VAr@dev.bjcka.mongodb.net/nestjs-intro?retryWrites=true&w=majority"),
        AuthModule,
        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
