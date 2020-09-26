import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserTypeEntity} from "./user-type.entity";
import {ContactEntity} from "./contact.entity";
import {UserModel} from "../../api-interfaces/user/model/user.model";
import {Length, IsEmail, validate, validateOrReject} from "class-validator";

@Entity('users')
export class UserEntity implements UserModel {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', { nullable: false, unique: true})
  @IsEmail()
  @Length(0,50)
  email: string

  @Column('varchar', { nullable: true }) // TODO change to false after authn updates
  @Length(8,50)
  password: string

  @OneToOne(type => UserTypeEntity, { cascade: true, onDelete: 'CASCADE',
  })
  @JoinColumn()
  userType: UserTypeEntity

  @OneToOne(type => ContactEntity,{ cascade : true, onDelete: "CASCADE", })
  @JoinColumn()
  contact: ContactEntity
}
/*
let user = new UserEntity()

validate(user).then(errors => { // errors is an array of validation errors
  if (errors.length > 0) {
    console.log("validation failed. errors: ", errors);
  } else {
    console.log("validation succeed");
  }
});

validateOrReject(user).catch(errors => {
  console.log("Promise rejected (validation failed). Errors: ", errors);
});
 */