import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany, ManyToOne, JoinTable, ManyToMany,
} from 'typeorm'


import {EmailEntity} from "./email.entity";
import {PhoneEntity} from "./phone.entity";
import {UserEntity} from "./user.entity";

@Entity("contacts")
export class ContactEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', { length: 50, nullable: false })
  firstName: string;

  @Column('varchar', { length: 50, nullable: false })
  lastName: string;

  @Column('varchar', { length: 50, nullable: true})
  company?: string

  @Column('varchar', {length: 250, nullable: true})
  notes?: string

  @ManyToMany(type => EmailEntity, email => email.contact, {
    cascade: true
  })
  @JoinTable()
  emails?: EmailEntity[];

  @ManyToMany(type => PhoneEntity, phone => phone.contact, {
    cascade: true
  })
  @JoinTable()
  phones?: PhoneEntity[];




}
