import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserTypeEntity} from "./user-type.entity";
import {ContactEntity} from "./contact.entity";
import {UserModel} from "../../api-interfaces/user/model/user.model";

@Entity('users')
export class UserEntity implements UserModel {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', {length: 50, nullable: false, unique: true})
  email: string

  @Column('varchar', {length: 50, nullable: true }) // TODO change to false after authn updates
  password: string

  @OneToOne(type => UserTypeEntity, { cascade: true, onDelete: 'CASCADE',
  })
  @JoinColumn()
  userType: UserTypeEntity

  @OneToOne(type => ContactEntity,{ cascade : true, onDelete: "CASCADE", })
  @JoinColumn()
  contact: ContactEntity
}
