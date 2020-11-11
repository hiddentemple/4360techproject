import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from '../db/entities/account.entity';
import { BillerEntity } from '../db/entities/biller.entity';
import { CustomerEntity } from '../db/entities/customer.entity';
import { InvoiceEntity } from '../db/entities/invoice.entity';
import { LineItemEntity } from '../db/entities/line-item.entity';
import { PaymentEntity } from '../db/entities/payment.entity';
import { InvoiceController } from './invoice.controller';
import { InvoiceService } from './services/invoice.service';
import { BillerService } from './services/biller.service';
import { CustomerService } from './services/customer.service';
import { LineItemService } from './services/lineItem.service';

@Module({
  imports: [TypeOrmModule.forFeature([AccountEntity, BillerEntity, CustomerEntity, InvoiceEntity, LineItemEntity, PaymentEntity])],
  controllers: [InvoiceController],
  providers: [InvoiceService, BillerService, CustomerService, LineItemService]
})
export class InvoiceModule {}
