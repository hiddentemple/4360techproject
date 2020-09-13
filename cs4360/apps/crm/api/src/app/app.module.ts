import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { ContactModule } from './contact/contact.module';




@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host: "db-4360-techproject-do-user-7683203-0.b.db.ondigitalocean.com",
    port: 25060,
    username: "4360user",
    password: "ogedeqbnk5m7i4pj",
    database: "crmDB",
    entities: [
      "dist/**/*.entity.js",
      "libs/crm/nest/dao/src/lib/entities/*.entity.ts"
    ],
    ssl: true,
    extra: {
      ssl: {
        "rejectUnauthorized": false
      }
    },
    synchronize: true,
    logging: true,
    autoLoadEntities: true
  }), ContactModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
