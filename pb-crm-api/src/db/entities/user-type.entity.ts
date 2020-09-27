import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {UserTypeModel} from "../../api-interfaces/user/model/user-type.model";
import {Length, validate, validateOrReject} from "class-validator";
import {ContactEntity} from "./contact.entity";

@Entity('user_types')
export class UserTypeEntity implements UserTypeModel {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', { nullable: false})
  @Length(0,50)
  type: string

  @Column('varchar', { nullable: true})
  @Length(0,100)
  description?: string;

}
