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
  IsDefined,
  IsOptional,
  Length,
  ValidateNested,
  validateOrReject,
} from 'class-validator';
import { NameRegex } from '@hiddentemple/api-interfaces';
import { HttpException } from '@nestjs/common';
import { InvoiceEntity } from './invoice.entity';


@Entity('customers')
export class CustomerEntity implements CustomerModel {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  @IsAlphanumeric()
  @Length(2, 50)
  @IsDefined()
  name: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @Length(2, 50)
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

  @OneToOne(type => PhoneEntity, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  @ValidateNested()
  @IsOptional()
  mobilePhone: PhoneEntity;

  @OneToOne(type => PhoneEntity, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  @ValidateNested()
  @IsOptional()
  businessPhone: PhoneEntity;

  @OneToOne(type => PhoneEntity, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  @ValidateNested()
  @IsOptional()
  fax: PhoneEntity;

  @OneToOne(type => EmailEntity, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  @ValidateNested()
  @IsOptional()
  email: EmailEntity;

  @OneToOne(type => WebpageEntity, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  @ValidateNested()
  @IsOptional()
  webpage: WebpageEntity;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsOptional()
  @Length(2, 50)
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
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
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
