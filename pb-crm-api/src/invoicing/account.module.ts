import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountEntity } from '../db/entities/account.entity';
import { BillerEntity } from '../db/entities/biller.entity';
import { CustomerEntity } from '../db/entities/customer.entity';
import { InvoiceEntity } from '../db/entities/invoice.entity';
import { LineItemEntity } from '../db/entities/line-item.entity';
import { PaymentEntity } from '../db/entities/payment.entity';
import { AccountController } from './account.controller';
import { InvoiceService } from './services/invoice.service';
import { LineItemService } from './services/lineItem.service';
import { BillerService } from './services/biller.service';
import { AddressService } from '../contact/services/address.service';
import { EmailService } from '../contact/services/email.service';
import { PhoneService } from '../contact/services/phone.service';
import { PhoneEntity } from '../db/entities/phone.entity';
import { EmailEntity } from '../db/entities/email.entity';
import { AddressEntity } from '../db/entities/address.entity';

@Module({
  imports: [TypeOrmModule.forFeature([
    AccountEntity,
    BillerEntity,
    CustomerEntity,
    InvoiceEntity,
    LineItemEntity,
    PaymentEntity,
    PhoneEntity,
    EmailEntity,
    AddressEntity,
  ])],
  controllers: [AccountController],
  providers: [InvoiceService, LineItemService, BillerService, AddressService, EmailService, PhoneService],
})
export class AccountModule {
}
