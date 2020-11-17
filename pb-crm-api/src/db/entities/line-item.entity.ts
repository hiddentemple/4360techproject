import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { LineItemModel } from '@hiddentemple/api-interfaces/dist/invoicing/line-item.model';
import { InvoiceEntity } from './invoice.entity';
import { IsAlphanumeric, IsDefined, IsOptional, Length, validateOrReject } from 'class-validator';
import { HttpException } from '@nestjs/common';

@Entity("lineItems")
export class LineItemEntity implements LineItemModel {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ type: "varchar", length: 255 })
  @Length(2, 255)
  @IsDefined()
  name: string;
  
  @Column({type: 'integer'})
  @IsDefined()
  quantity: number;

  @Column({ type: "varchar", length: 255 })
  @Length(2, 255)
  @IsDefined()
  itemCategory: string;

  @Column({type: 'varchar', length: 255, nullable: true})
  @IsOptional()
  @Length(2, 255)
  description: string;

  @Column({type: 'numeric'})
  @IsDefined()
  unitPrice: number;
  
  @Column({type: 'numeric'})
  @IsDefined()
  totalPrice: number;

  @Column({type: 'varchar', length: 255, nullable: true})
  @IsOptional()
  @Length(2, 255)
  warranty: string;
  
  @ManyToOne(type => InvoiceEntity, invoice => invoice.lineItems, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  })
  invoice: InvoiceEntity;

  @BeforeInsert()
  @BeforeUpdate()
  async validate(){ await validateOrReject(this).then(
    onFulfilled => {
      return onFulfilled
    },
    onRejected => {
      throw new HttpException( {'statusCode': 400, 'message': onRejected[0].constraints}, 400)
    }
  )
  }
  
}
