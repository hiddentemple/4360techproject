import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ContactEntity} from "./contact.entity";
import {IsDefined, IsNumberString, IsPhoneNumber, Length, ValidateNested} from "class-validator"
import {PhoneModel} from "@hiddentemple/api-interfaces";
import {Type} from "class-transformer";
import {CategoryEntity} from "./category.entity";

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

    @ManyToOne(() => CategoryEntity, {nullable: false, cascade: false})
    @IsDefined()
    @JoinColumn()
    @ValidateNested({ each: true })
    @Type(() => CategoryEntity)
    category: CategoryEntity;

    @ManyToOne(type => ContactEntity, contact => contact.phones, {
        onDelete: "CASCADE",
        onUpdate: 'CASCADE'
    })
    @JoinColumn()
    contact: ContactEntity
}
