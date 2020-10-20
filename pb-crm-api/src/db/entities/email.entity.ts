import {ContactEntity} from "./contact.entity";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

import {IsDefined, IsEmail, ValidateNested} from 'class-validator';
import {EmailModel} from "@hiddentemple/api-interfaces";
import {Type} from "class-transformer";
import {CategoryEntity} from "./category.entity";


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
        () => CategoryEntity,
        // category => category.emails,
        { nullable: false, cascade: false, eager: true })
    @IsDefined()
    @JoinColumn({name: 'categoryId'})
    @ValidateNested({ each: true })
    @Type(() => CategoryEntity)
    category: CategoryEntity;

    @ManyToOne(() => ContactEntity, contact => contact.emails, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    @JoinColumn()
    contact: ContactEntity
}
