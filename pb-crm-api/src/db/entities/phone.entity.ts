import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ContactEntity} from "./contact.entity";
import { IsDefined, IsEnum, IsNumberString, IsPhoneNumber, Length} from "class-validator"
import {PhoneEmailCategory, PhoneModel} from "@hiddentemple/api-interfaces";


@Entity('phones')
export class PhoneEntity implements PhoneModel {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('numeric', {nullable: false})
    @IsDefined()
    @IsNumberString( { no_symbols: true })
    @Length(10, 10, {message: 'Phone number must be exactly 10 digits'})
    @IsPhoneNumber('US')
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
