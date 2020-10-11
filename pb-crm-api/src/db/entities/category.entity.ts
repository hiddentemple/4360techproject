import {CategoryCode, CategoryModel} from "@hiddentemple/api-interfaces";
import {Column, PrimaryGeneratedColumn} from "typeorm";
import {IsDefined, Length} from "class-validator";


export abstract class CategoryEntity implements CategoryModel {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type: 'enum',
        enum: CategoryCode,
        nullable: false
    })
    @IsDefined()
    code: CategoryCode;

    @Column({
        type: "character varying",
        length: 25,
        nullable: false
    })
    @IsDefined()
    @Length(4, 25)
    description: string;

}