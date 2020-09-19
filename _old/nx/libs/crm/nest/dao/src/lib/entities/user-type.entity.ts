import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {UserTypeDTO} from "@crm/shared";

@Entity('user_types')
export class UserTypeEntity implements UserTypeDTO{

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', {length: 50, nullable: false})
  type: string

  @Column('varchar', {length: 100, nullable: true})
  description?: string;

}
