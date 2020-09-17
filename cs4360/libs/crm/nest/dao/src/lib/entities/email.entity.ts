import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {EmailDTO} from "@crm/crm/shared";
import {ContactEntity} from "./contact.entity";


@Entity('email')
export class EmailEntity implements EmailDTO{

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', { length: 50, nullable: false })
  address: string

  @Column('varchar', { length: 50, nullable: true })
  type?: string

  @ManyToOne(type => ContactEntity, contact => contact.emails, {
    onDelete: "CASCADE"
  })
  contact: ContactEntity
}
