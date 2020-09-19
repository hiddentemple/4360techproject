import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ContactEntity} from "./contact.entity";
import {PhoneModel} from "../../../../../api-interfaces/contact-book/contact/models/phone.model";

@Entity('phones')
export class PhoneEntity implements PhoneModel {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('numeric', { nullable: false })
    number: number

    @Column('varchar', { length: 50, nullable: false })
    type?: string

    @ManyToOne(type => ContactEntity, contact => contact.phones, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    contact: ContactEntity
}
