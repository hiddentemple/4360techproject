import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PaymentModel } from '@hiddentemple/api-interfaces/dist/invoicing/payment.model';
import { IsDefined, Length, validateOrReject } from 'class-validator';
import { HttpException } from '@nestjs/common';


@Entity('payment')
export class PaymentEntity implements PaymentModel {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({type: 'varchar', length: 50})
  @IsDefined()
  @Length(2, 50)
  name: string
  
  @Column({type: 'varchar', length: 50})
  @IsDefined()
  @Length(2, 50)
  method: string

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
