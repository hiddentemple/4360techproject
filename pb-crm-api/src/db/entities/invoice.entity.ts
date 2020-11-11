import {
  BeforeInsert, BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn, ManyToOne, OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InvoiceModel } from '@hiddentemple/api-interfaces/dist/invoicing/invoice.model';
import {
  IsAlphanumeric, IsBoolean,
  IsDefined,
  IsNumber,
  IsOptional,
  Length,
  ValidateNested,
  validateOrReject,
} from 'class-validator';
import { BillerEntity } from './biller.entity';
import { CustomerEntity } from './customer.entity';
import { WebpageEntity } from './webpage.entity';
import { LineItemEntity } from './line-item.entity';
import { AccountEntity } from './account.entity';
import { HttpException } from '@nestjs/common';


@Entity('invoices')
export class InvoiceEntity implements InvoiceModel {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  @IsDefined()
  date: string;

  @OneToOne(type => BillerEntity, { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn()
  biller: BillerEntity;

  @Column({ type: 'varchar', length: 50 })
  @IsDefined()
  @Length(2, 50)
  invoiceNumber: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsOptional()
  @Length(2, 50)
  technician: string;

  @OneToOne(type => CustomerEntity, { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn()
  customer: CustomerEntity;

  @OneToMany(type => LineItemEntity, lineItem => lineItem.invoice, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @IsOptional()
  @ValidateNested({ each: true })
  lineItems: LineItemEntity[];

  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsOptional()
  @Length(2, 50)
  notes: string;
  
  @Column({type: 'numeric', nullable: true})
  @IsOptional()
  @IsNumber()
  subTotal: number;

  @Column({type: 'numeric', nullable: true})
  @IsOptional()
  @IsNumber()
  tax: number;

  @Column({type: 'numeric', nullable: true})
  @IsOptional()
  @IsNumber()
  total: number;

  @Column({type: 'numeric', nullable: true})
  @IsOptional()
  @IsNumber()
  amountOwed: number;

  @Column({type: 'numeric', nullable: true})
  @IsOptional()
  @IsNumber()
  amountPaid: number;

  @Column({type: 'boolean', nullable: true})
  @IsOptional()
  @IsBoolean()
  paidInFull: boolean;
  
  @CreateDateColumn({ name: 'createdAt', nullable: false })
  createdAt: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsOptional()
  @Length(2, 50)
  createdBy: string;

  @UpdateDateColumn({ name: 'updatedAt', nullable: true })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @IsOptional()
  @Length(2, 50)
  updatedBy: string;
  
  @ManyToOne(type => AccountEntity, account => account.invoices, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  account: AccountEntity;

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
