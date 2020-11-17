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
import { CustomerModel } from '@hiddentemple/api-interfaces/dist/invoicing/customer.model';
import { AddressEntity } from './address.entity';
import { EmailEntity } from './email.entity';
import { PhoneEntity } from './phone.entity';
import { WebpageEntity } from './webpage.entity';
import {
  IsAlphanumeric,
  IsBoolean,
  IsDefined, IsEmail,
  IsOptional, IsUrl,
  Length, Matches,
  ValidateNested,
  validateOrReject,
} from 'class-validator';
import { NameRegex } from '@hiddentemple/api-interfaces';
import { HttpException } from '@nestjs/common';
import { InvoiceEntity } from './invoice.entity';
import { AccountEntity } from './account.entity';


@Entity('customers')
export class CustomerEntity implements CustomerModel {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  @IsAlphanumeric()
  @Length(2, 255)
  @IsDefined()
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @Length(2, 255)
  @IsOptional()
  attn: string;

  @OneToOne(type => AddressEntity, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  @ValidateNested()
  @IsOptional()
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

  @Column({ type: "varchar", nullable: true })
  @IsOptional()
  @IsUrl()
  webpage: string

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsOptional()
  @Length(2, 255)
  salesTech: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsOptional()
  @Length(2, 255)
  notes: string;

  @Column({ type: 'boolean', nullable: true })
  @IsOptional()
  @IsBoolean()
  active: boolean;

  @CreateDateColumn({ name: 'createdAt', nullable: false })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', nullable: true })
  updatedAt: Date;
  
  @OneToOne(() => InvoiceEntity, invoice => invoice.customer, {
    cascade: ['update', 'insert'],
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
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
