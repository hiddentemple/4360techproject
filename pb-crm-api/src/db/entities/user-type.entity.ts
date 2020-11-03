import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsOptional, MaxLength, validateOrReject } from 'class-validator';
import {UserTypeModel} from "@hiddentemple/api-interfaces";
import { HttpException } from '@nestjs/common';

@Entity('user_types')
export class UserTypeEntity implements UserTypeModel {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', { nullable: false})
  @MaxLength(50)
  type: string

  @Column('varchar', { nullable: true})
  @IsOptional()
  @MaxLength(100)
  description: string;

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
