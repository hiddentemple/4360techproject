import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserTypeEntity} from "./user-type.entity";
import {ContactEntity} from "../../contact/entitites/contact.entity";
import {UserModel} from "../../../../../api-interfaces/contact-book/user/model/user.model";

@Entity('users')
export class UserEntity implements UserModel {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', {length: 50, nullable: false, unique: true})
  email: string

  @Column('varchar', {length: 50, nullable: true }) // TODO change to false after authn updates
  password: string

  @OneToOne(type => UserTypeEntity, {cascade: true})
  @JoinColumn()
  userType: UserTypeEntity

  @OneToOne(type => ContactEntity,{cascade: true})
  @JoinColumn()
  contact: ContactEntity
}
