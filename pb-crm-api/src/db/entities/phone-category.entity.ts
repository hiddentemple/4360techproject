import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {CategoryCode, CategoryModel} from "@hiddentemple/api-interfaces";
import {Length} from "class-validator";
import {EmailEntity} from "./email.entity";
import {PhoneEntity} from "./phone.entity";

@Entity('phone-category')
export class PhoneCategoryEntity implements CategoryModel {

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

    @OneToMany(() => PhoneEntity, phone => phone.category, { eager: false })
    phones: PhoneEntity[];
}