import {ContactEntity} from "./contact.entity";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

import {IsDefined, IsEmail, ValidateNested} from 'class-validator';
import {EmailModel} from "@hiddentemple/api-interfaces";
import {EmailCategoryEntity} from "./email-category.entity";
import {Type} from "class-transformer";
import {PhoneEntity} from "./phone.entity";


@Entity('emails')
export class EmailEntity implements EmailModel {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: "character varying",
        nullable: false
    })
    @IsDefined()
    @IsEmail()
    address: string

    @ManyToOne(
        () => EmailCategoryEntity,
        category => category.emails,
        { nullable: false, cascade: true })
    @IsDefined()
    @JoinColumn()
    @ValidateNested({ each: true })
    @Type(() => EmailCategoryEntity)
    category: EmailCategoryEntity;

    @ManyToOne(() => ContactEntity, contact => contact.emails, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    @JoinColumn()
    contact: ContactEntity
}
