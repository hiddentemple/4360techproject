import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CategoryCode, CategoryModel} from "@hiddentemple/api-interfaces";
import {Length} from "class-validator";
import {EmailEntity} from "./email.entity";
import {PhoneEntity} from "./phone.entity";
import {CategoryEntity} from "./category.entity";

@Entity('phone-category')
export class PhoneCategoryEntity extends CategoryEntity {

    @OneToMany(() => PhoneEntity, phone => phone.category, { eager: false })
    phones: PhoneEntity[];
}