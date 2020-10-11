import {Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {CategoryCode, CategoryModel} from "@hiddentemple/api-interfaces";
import {Length} from "class-validator";
import {EmailEntity} from "./email.entity";
import {CategoryEntity} from "./category.entity";


@Entity('email-category')
export class EmailCategoryEntity extends CategoryEntity {

    @OneToMany(() => EmailEntity, email => email.category, { eager: false })
    emails: EmailEntity[];
}