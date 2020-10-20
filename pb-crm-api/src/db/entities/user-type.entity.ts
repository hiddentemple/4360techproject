import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {IsOptional, MaxLength} from "class-validator";
import {UserTypeModel} from "@hiddentemple/api-interfaces";

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
