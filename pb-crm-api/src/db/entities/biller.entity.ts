import {
  BeforeInsert, BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn, ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BillerModel } from '@hiddentemple/api-interfaces/dist/invoicing/biller.model';
import { AddressEntity } from './address.entity';
import { EmailEntity } from './email.entity';
import { PaymentEntity } from './payment.entity';
import { PhoneEntity } from './phone.entity';
import { IsBoolean, IsDefined, IsOptional, ValidateNested, validateOrReject } from 'class-validator';
import { HttpException } from '@nestjs/common';
import { InvoiceEntity } from './invoice.entity';



@Entity('billers')
export class BillerEntity implements BillerModel{
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({type: 'varchar', length: 50})
  @IsDefined()
  name: string;

  @OneToOne(type => AddressEntity, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn()
  @ValidateNested()
  address: AddressEntity;

  @OneToOne(type => PhoneEntity, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }) 
  @JoinColumn()
  @IsOptional()
  @ValidateNested()
  mobilePhone: PhoneEntity;

  @OneToOne(type => PhoneEntity, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn()
  @IsOptional()
  @ValidateNested()
  businessPhone: PhoneEntity;

  @OneToOne(type => PhoneEntity, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn()
  @IsOptional()
  @ValidateNested()
  fax: PhoneEntity;

  @OneToOne(type => EmailEntity, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn()
  @IsOptional()
  @ValidateNested()
  email: EmailEntity;

  @Column({type: 'varchar', length: 255, nullable: true})
  @IsOptional()
  invoiceFooter: string;

  @Column({type: 'varchar', length: 255, nullable: true})
  @IsOptional()
  notes: string;

  @OneToOne(type => PaymentEntity, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  @JoinColumn()
  @IsOptional()
  @ValidateNested()
  paymentInfo: PaymentEntity;
  
  @Column({type: 'boolean', nullable: true})
  @IsOptional()
  @IsBoolean()
  active: boolean;

  @CreateDateColumn({name: 'createdAt', nullable: false})
  createdAt: Date;

  @UpdateDateColumn({name: 'updatedAt', nullable: true})
  updatedAt: Date;
  
  @OneToOne(() => InvoiceEntity, invoice => invoice.biller, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  invoice: InvoiceEntity;
  

  
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
