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
import { InvoiceModel, InvoiceType } from '@hiddentemple/api-interfaces';
import {
  IsBoolean,
  IsDefined, IsEnum,
  IsNumber,
  IsOptional,
  Length,
  ValidateNested,
  validateOrReject,
} from 'class-validator';
import { BillerEntity } from './biller.entity';
import { CustomerEntity } from './customer.entity';
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

  @OneToOne(() => BillerEntity, biller => biller.invoice, {
    cascade: true,
    eager: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })  @JoinColumn()
  biller: BillerEntity;

  @Column({ type: 'varchar', length: 255 })
  @IsDefined()
  @Length(2, 255)
  invoiceNumber: string;
  
  @Column({ type: 'varchar'})
  @IsDefined()
  @IsEnum(InvoiceType)
  type: InvoiceType;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsOptional()
  @Length(2, 255)
  technician: string;

  @OneToOne(() => CustomerEntity, customer => customer.invoice, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    eager: true,
    cascade: true
  })
  @JoinColumn()
  customer: CustomerEntity;

  @OneToMany(() => LineItemEntity, lineItems => lineItems.invoice, {
    cascade: true,
    eager: true,
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @JoinColumn()
  lineItems: LineItemEntity[];

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsOptional()
  @Length(2, 255)
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

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsOptional()
  @Length(2, 255)
  createdBy: string;

  @UpdateDateColumn({ name: 'updatedAt', nullable: true })
  updatedAt: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  @IsOptional()
  @Length(2, 255)
  updatedBy: string;
  
  @ManyToOne(() => AccountEntity, account => account.invoices, {
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
