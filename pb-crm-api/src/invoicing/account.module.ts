import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from '../db/entities/account.entity';
import { BillerEntity } from '../db/entities/biller.entity';
import { CustomerEntity } from '../db/entities/customer.entity';
import { InvoiceEntity } from '../db/entities/invoice.entity';
import { LineItemEntity } from '../db/entities/line-item.entity';
import { PaymentEntity } from '../db/entities/payment.entity';
import { AccountController } from './account.controller';
import { LineItemService } from './services/lineItem.service';
import { BillerService } from './services/biller.service';
import { AddressService } from '../contact/services/address.service';
import { AddressEntity } from '../db/entities/address.entity';
import { CustomerService } from './services/customer.service';
import { AccountService } from './services/account.service';
import { InvoiceService } from './services/invoice.service';


@Module({
  imports: [TypeOrmModule.forFeature([
    AccountEntity,
    BillerEntity,
    CustomerEntity,
    InvoiceEntity,
    LineItemEntity,
    PaymentEntity,
    AddressEntity
  ])],
  controllers: [AccountController],
  providers: [
    AccountService, 
    LineItemService, 
    BillerService, 
    AddressService, 
    CustomerService, 
    InvoiceService
  ],
})
export class AccountModule {
}
