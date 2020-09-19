import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {EmailEntity} from "./email.entitiy";
import {PhoneEntity} from "./phone.entity";
import {ContactModel} from "../../../../../api-interfaces/contact-book/contact/models/contact.model";

@Entity("contacts")
export class ContactEntity implements ContactModel {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', {length: 50, nullable: false})
    firstName: string;

    @Column('varchar', {length: 50, nullable: false})
    lastName: string;

    @Column('varchar', {length: 50, nullable: true})
    company?: string

    @Column('varchar', {length: 250, nullable: true})
    notes?: string

    @OneToMany(type => EmailEntity, email => email.contact, {
        cascade: true
    })
    emails: EmailEntity[];

    @OneToMany(type => PhoneEntity, phone => phone.contact, {
        cascade: true
    })
    phones?: PhoneEntity[];
}