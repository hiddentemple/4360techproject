import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserDTO} from "@crm/crm/shared";
import {UserTypeEntity} from "./user-type.entity";
import {ContactEntity} from "./contact.entity";

@Entity('user')
export class UserEntity implements UserDTO{

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', { length: 50, nullable: true})
  username: string

  @Column('varchar', {length: 50, nullable: true})
  hash: string

  @OneToOne(type => UserTypeEntity, {cascade: true})
  @JoinColumn()
  userType: UserTypeEntity

  @OneToOne(type => ContactEntity,{cascade: true})
  @JoinColumn()
  contact: ContactEntity
}
