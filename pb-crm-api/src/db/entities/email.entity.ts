import {ContactEntity} from "./contact.entity";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

import { IsEmail, IsOptional, MaxLength} from 'class-validator';
import {EmailModel} from "@hiddentemple/api-interfaces";
import {EmailCategoryEntity} from "./email-category.entity";


@Entity('emails')
export class EmailEntity implements EmailModel {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: "character varying",
        length: 50,
        nullable: false
    })
    @IsEmail()
    @MaxLength(50)
    address: string

    @ManyToOne(() => EmailCategoryEntity, category => category.emails)
    @JoinColumn()
    category: EmailCategoryEntity;

    @ManyToOne(() => ContactEntity, contact => contact.emails, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    @JoinColumn()
    contact: ContactEntity
}
