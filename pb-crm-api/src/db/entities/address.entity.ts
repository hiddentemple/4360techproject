import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AddressModel, AddressType } from '@hiddentemple/api-interfaces';
import { ContactEntity } from './contact.entity';
import { IsDefined, IsEnum, IsOptional } from 'class-validator';


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
  @IsEnum(AddressType)
  type: AddressType;

  @ManyToOne(type => ContactEntity, contact => contact.addresses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  contact: ContactEntity;

}
