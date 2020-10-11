import {Entity, OneToMany} from "typeorm";
import {EmailEntity} from "./email.entity";
import {CategoryEntity} from "./category.entity";


@Entity('email-category')
export class EmailCategoryEntity extends CategoryEntity {

    @OneToMany(() => EmailEntity, email => email.category, { eager: false })
    emails: EmailEntity[];
}