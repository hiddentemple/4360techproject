import {ContactEntity} from "./contact.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsDefined, IsEmail, IsEnum, validateOrReject } from 'class-validator';
import {EmailModel, PhoneEmailCategory} from "@hiddentemple/api-interfaces";
import { HttpException } from '@nestjs/common';



@Entity('emails')
export class EmailEntity implements EmailModel {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: "character varying",
        nullable: false
    })
    @IsDefined()
    @IsEmail()
    address: string

    @Column('enum', {enum: PhoneEmailCategory, nullable: false})
    @IsDefined()
    @IsEnum(PhoneEmailCategory)
    category: PhoneEmailCategory;

    @ManyToOne(() => ContactEntity, contact => contact.emails, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    @JoinColumn()
    contact: ContactEntity

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
