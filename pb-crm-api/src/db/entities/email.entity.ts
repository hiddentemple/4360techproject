import {ContactEntity} from "./contact.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsDefined, IsEmail, IsEnum, validateOrReject } from 'class-validator';
import {EmailCategory, EmailModel} from "@hiddentemple/api-interfaces";
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

    @Column('boolean', {default: false})
    @IsDefined()
    isPrimary: boolean

    @Column('enum', {enum: EmailCategory, nullable: false})
    @IsDefined()
    @IsEnum(EmailCategory)
    category: EmailCategory;

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
