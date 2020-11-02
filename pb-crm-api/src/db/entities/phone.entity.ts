import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ContactEntity} from "./contact.entity";
import {IsDefined, IsEnum, Matches} from "class-validator"
import {PhoneEmailCategory, PhoneModel} from "@hiddentemple/api-interfaces";


@Entity('phones')
export class PhoneEntity implements PhoneModel {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('character varying', {nullable: false})
    @IsDefined()
    @Matches(/^\+\d{5,15}$/, {message: "phone number needs to be in international format"})
    phoneNumber: string

    @Column('enum', {enum: PhoneEmailCategory, nullable: false})
    @IsDefined()
    @IsEnum(PhoneEmailCategory)
    category: PhoneEmailCategory;

    @ManyToOne(type => ContactEntity, contact => contact.phones, {
        onDelete: "CASCADE",
        onUpdate: 'CASCADE'
    })
    @JoinColumn()
    contact: ContactEntity
}
