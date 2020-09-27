import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ContactEntity} from "./contact.entity";
import {PhoneModel} from "../../api-interfaces/contact/models/phone.model";
import {Length, validate, validateOrReject} from "class-validator"

@Entity('phones')
export class PhoneEntity implements PhoneModel {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('numeric', { nullable: false })
    @Length(10,20)
    number: number

    @Column('varchar', { nullable: false })
    @Length(0,50)
    type?: string

    @ManyToOne(type => ContactEntity, contact => contact.phones, {
        onDelete: "CASCADE"
    })
    @JoinColumn()
    contact: ContactEntity
}
