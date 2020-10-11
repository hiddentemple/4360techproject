import {ContactEntity} from "./contact.entity";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

import {IsDefined, IsEmail} from 'class-validator';
import {EmailModel} from "@hiddentemple/api-interfaces";
import {EmailCategoryEntity} from "./email-category.entity";


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
        { nullable: false })
    @IsDefined()
    @JoinColumn()
    category: EmailCategoryEntity;

    @ManyToOne(() => ContactEntity, contact => contact.emails, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    @JoinColumn()
    contact: ContactEntity
}
