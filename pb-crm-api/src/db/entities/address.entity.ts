import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {AddressCategory, AddressModel} from '@hiddentemple/api-interfaces';
import { ContactEntity } from './contact.entity';
import { IsDefined, IsEnum, IsOptional, validateOrReject } from 'class-validator';
import { HttpException } from '@nestjs/common';


@Entity('addresses')
export class AddressEntity implements AddressModel {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', {})
  @IsDefined()
  street: string;

  @Column('varchar', {nullable: true})
  @IsOptional()
  street2: string;

  @Column('varchar', {})
  @IsDefined()
  city: string;

  @Column('varchar', {})
  @IsDefined()
  state: string;

  @Column('varchar', {})
  @IsDefined()
  postalCode: string;

  @Column('varchar', {nullable: true})
  @IsOptional()
  country: string;

  @Column( 'varchar', {})
  @IsEnum(AddressCategory)
  category: AddressCategory;

  @ManyToOne(type => ContactEntity, contact => contact.addresses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  contact: ContactEntity;

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
