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
import { IsBoolean, IsDefined, IsEmail, IsOptional, Matches, ValidateNested, validateOrReject } from 'class-validator';
import { HttpException } from '@nestjs/common';
import { InvoiceEntity } from './invoice.entity';



@Entity('biller')
export class BillerEntity implements BillerModel{
  
  
  
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({type: 'varchar', length: 50})
  @IsDefined()
  name: string;

  @OneToOne(() => AddressEntity , {
    cascade: true,
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  @JoinColumn()
  address: AddressEntity;

  @Column({ type: "varchar", nullable: true })
  @IsOptional()
  @Matches(/^\+\d{5,15}$/, {message: "phone number needs to be in international format"})
  mobilePhone: string

  @Column({ type: "varchar", nullable: true })
  @IsOptional()
  @Matches(/^\+\d{5,15}$/, {message: "phone number needs to be in international format"})
  businessPhone: string

  @Column({ type: "varchar", nullable: true })
  @IsOptional()
  @Matches(/^\+\d{5,15}$/, {message: "phone number needs to be in international format"})
  fax: string

  @Column({ type: "varchar", nullable: true })
  @IsOptional()
  @IsEmail()
  email: string

  @Column({type: 'varchar', length: 255, nullable: true})
  @IsOptional()
  invoiceFooter: string;

  @Column({type: 'varchar', length: 255, nullable: true})
  @IsOptional()
  notes: string;

  @OneToOne(() => PaymentEntity, {
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
  
  @OneToOne(() => InvoiceEntity, invoice => invoice.biller,{
    cascade: ['insert', 'update']
  })
  invoice: InvoiceEntity
  
  
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
