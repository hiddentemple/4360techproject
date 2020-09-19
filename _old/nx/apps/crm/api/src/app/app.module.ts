import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Connection} from "typeorm";
import {ContactsModule} from './dao/contacts/contacts.module';
import {ContactEntity, EmailEntity, PhoneEntity, UserEntity, UserTypeEntity} from "@crm/nest/entities";
import {UserModule} from "./dao/user/user.module";
import {ninethrityfour1600486456406} from "./migration/1600486456406-ninethrityfour";


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "db-4360-techproject-do-user-7683203-0.b.db.ondigitalocean.com",
      port: 25060,
      username: "4360user",
      password: "ogedeqbnk5m7i4pj",
      database: "crmDB",
      entities: [ContactEntity, EmailEntity, PhoneEntity, UserEntity, UserTypeEntity],
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      },
      logging: true,
      autoLoadEntities: true,
    }),
    ContactsModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],

})
export class AppModule {


  constructor(private connection: Connection) {
    const a: ninethrityfour1600486456406 = new ninethrityfour1600486456406();
  }
}
