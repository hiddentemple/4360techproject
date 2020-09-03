import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [ TypeOrmModule.forRoot(), CustomersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
