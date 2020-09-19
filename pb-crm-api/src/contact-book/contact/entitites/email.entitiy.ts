import {ContactEntity} from "./contact.entity";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {EmailModel} from "../../../../../api-interfaces/contact-book/contact/models/email.model";

@Entity('emails')
export class EmailEntity implements EmailModel {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', { length: 50, nullable: false })
    address: string

    @Column('varchar', { length: 50, nullable: true })
    type?: string

    @ManyToOne(type => ContactEntity, contact => contact.emails, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    contact: ContactEntity
}