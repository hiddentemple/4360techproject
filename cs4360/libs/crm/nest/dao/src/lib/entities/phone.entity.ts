import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {PhoneDTO} from "@crm/crm/shared";
import {ContactEntity} from "./contact.entity";

@Entity('phone')
export class PhoneEntity implements PhoneDTO{

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('numeric', { nullable: false })
  number: number

  @Column('varchar', { length: 50, nullable: false })
  type?: string

  @ManyToOne(type => ContactEntity, contact => contact.phones, {
    onDelete: "CASCADE"
  })
  contact: ContactEntity
}
