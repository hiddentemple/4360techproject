import { BeforeInsert, BeforeUpdate, Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentModel } from '@hiddentemple/api-interfaces/dist/invoicing/payment.model';
import { IsDefined, Length, validateOrReject } from 'class-validator';
import { HttpException } from '@nestjs/common';
import { AccountEntity } from './account.entity';


@Entity('payment')
export class PaymentEntity implements PaymentModel {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({type: 'varchar', length: 255})
  @IsDefined()
  @Length(2, 255)
  name: string
  
  @Column({type: 'varchar', length: 255})
  @IsDefined()
  @Length(2, 255)
  method: string
  
  @OneToOne(() => AccountEntity, account => account.paymentInfo, {
    cascade: ['update', 'insert'],
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  })
  account: AccountEntity;

  @BeforeInsert()
  @BeforeUpdate()
  async validate() {
    await validateOrReject(this).then(
      onFulfilled => {
        return onFulfilled
      },
      onRejected => {
        throw new HttpException({ 'statusCode': 400, 'message': onRejected[0].constraints }, 400)
      }
    )
  }
  
}
