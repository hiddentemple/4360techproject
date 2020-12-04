import {
  BeforeInsert, BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AccountModel } from '@hiddentemple/api-interfaces/dist/invoicing/account.model';
import {IsDefined, IsOptional, Length, ValidateNested, validateOrReject} from 'class-validator';
import { CustomerEntity } from './customer.entity';
import { InvoiceEntity } from './invoice.entity';
import { PaymentEntity } from './payment.entity';
import { HttpException } from '@nestjs/common';


@Entity("accounts")
export class AccountEntity implements AccountModel{
  
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({type: 'varchar', length: 255})
  @Length(2, 255)
  @IsOptional()
  acctNumber: string;

  @Column({type: 'varchar', length: 255, nullable: false})
  @Length(2, 255)
  @IsDefined()
  name: string;
  
  @OneToMany(() => InvoiceEntity, invoices => invoices.account, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn()
  @IsOptional()
  @ValidateNested({ each: true })
  invoices: InvoiceEntity[];

  @OneToOne(() => PaymentEntity, paymentInfo => paymentInfo.account, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn()
  @IsOptional()
  paymentInfo: PaymentEntity;
  
  @Column({type: 'varchar', length: 255})
  @Length(2, 255)
  @IsOptional()
  notes: string;

  @CreateDateColumn({name: 'createdAt', nullable: false})
  createdAt: Date;

  @UpdateDateColumn({name: 'updatedAt', nullable: true})
  updatedAt: Date;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this).then(
      onFulfilled => {
        return onFulfilled;
      },
      onRejected => {
        throw new HttpException({ 'statusCode': 400, 'message': onRejected[0].constraints }, 400);
      },
    );
  }
  
}
