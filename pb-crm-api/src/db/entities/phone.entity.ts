import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ContactEntity} from "./contact.entity";
import {PhoneModel} from "../../api-interfaces/contact/models/phone.model";
import {IsOptional, MaxLength, IsPhoneNumber} from "class-validator"

@Entity('phones')
export class PhoneEntity implements PhoneModel {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('numeric', { nullable: false })
    @IsPhoneNumber('US')
    number: number

    @Column('varchar', { nullable: false })
    @IsOptional()
    @MaxLength(50)
    type?: string

    @ManyToOne(type => ContactEntity, contact => contact.phones, {
        onDelete: "CASCADE",
        onUpdate: 'CASCADE'
    })
    @JoinColumn()
    contact: ContactEntity
}
