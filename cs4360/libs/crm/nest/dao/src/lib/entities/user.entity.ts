import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserDTO} from "@crm/shared";
import {UserTypeEntity} from "./user-type.entity";
import {ContactEntity} from "./contact.entity";

@Entity('users')
export class UserEntity implements UserDTO {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', {length: 50, nullable: false, unique: true})
  email: string

  @Column('varchar', {length: 50, nullable: true }) // TODO change to false after authn updates
  passwordHash: string

  @OneToOne(type => UserTypeEntity, {cascade: true})
  @JoinColumn()
  userType: UserTypeEntity

  @OneToOne(type => ContactEntity,{cascade: true})
  @JoinColumn()
  contact: ContactEntity
}
