import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {ContactEntity} from "./contact.entity";
import {IsOptional, MaxLength, IsPhoneNumber} from "class-validator"
import {EmailCategoryEntity} from "./email-category.entity";
import {PhoneCategoryEntity} from "./phone-category.entity";
import {PhoneModel} from "@hiddentemple/api-interfaces";

@Entity('phones')
export class PhoneEntity implements PhoneModel {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('numeric', { nullable: false })
    @IsPhoneNumber('US')
    number: number

    @ManyToOne(() => PhoneCategoryEntity, category => category.phones)
    @JoinColumn()
    category: EmailCategoryEntity;

    @ManyToOne(type => ContactEntity, contact => contact.phones, {
        onDelete: "CASCADE",
        onUpdate: 'CASCADE'
    })
    @JoinColumn()
    contact: ContactEntity
}
