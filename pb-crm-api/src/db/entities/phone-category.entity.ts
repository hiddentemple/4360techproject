import {Entity, OneToMany} from "typeorm";
import {PhoneEntity} from "./phone.entity";
import {CategoryEntity} from "./category.entity";

@Entity('phone-category')
export class PhoneCategoryEntity extends CategoryEntity {

    @OneToMany(() => PhoneEntity, phone => phone.category, { eager: false })
    phones: PhoneEntity[];
}