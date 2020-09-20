import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {UserTypeModel} from "../../api-interfaces/user/model/user-type.model";

@Entity('user_types')
export class UserTypeEntity implements UserTypeModel {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', {length: 50, nullable: false})
  type: string

  @Column('varchar', {length: 100, nullable: true})
  description?: string;

}
