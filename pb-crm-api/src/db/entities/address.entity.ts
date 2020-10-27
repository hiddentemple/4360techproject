import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { addressEnum, AddressModel } from '@hiddentemple/api-interfaces';
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

  @Column('varchar', {})
  @IsOptional()
  country: string;

  @Column({type: 'enum', nullable: false, enum: addressEnum})
  type: addressEnum;



  @ManyToOne(type => ContactEntity, contact => contact.addresses, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  contact: ContactEntity;






}
