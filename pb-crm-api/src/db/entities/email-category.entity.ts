import {Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {CategoryCode, CategoryModel} from "@hiddentemple/api-interfaces";
import {Length} from "class-validator";
import {EmailEntity} from "./email.entity";


@Entity('email-category')
export class EmailCategoryEntity implements CategoryModel {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'enum',
        enum: CategoryCode,
        nullable: false
    })
    @Length(4, 4)
    code: CategoryCode;

    @Column({
        type: "character varying",
        length: 25,
        nullable: false
    })
    @Length(4, 25)
    description: string;

    @OneToMany(() => EmailEntity, email => email.category, { eager: false })
    emails: EmailEntity[];
}