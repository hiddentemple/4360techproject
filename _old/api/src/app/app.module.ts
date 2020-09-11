import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [ TypeOrmModule.forRoot( {
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "vagrant",
    password: "password",
    database: "vagrant",
    entities: [
      "dist/**/*.entity.js",
      "customers/**/*.entity{.ts,.js}"
    ],
    synchronize: true,
    logging: true,
    autoLoadEntities: true
    }
  ), CustomersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
