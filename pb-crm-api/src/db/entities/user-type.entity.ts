import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {MaxLength, IsOptional} from "class-validator";
import {ContactEntity} from "./contact.entity";
import {UserTypeModel} from "@hiddentemple/api-interfaces/dist/user/models/user-type.model";

@Entity('user_types')
export class UserTypeEntity implements UserTypeModel {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', { nullable: false})
  @MaxLength(50)
  type: string

  @Column('varchar', { nullable: true})
  @IsOptional()
  @MaxLength(100)
  description: string;

}
