import {
  BeforeInsert, BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {UserTypeEntity} from "./user-type.entity";
import {ContactEntity} from "./contact.entity";
import { IsEmail, Length, MaxLength, validateOrReject } from 'class-validator';
import * as bcrypt from 'bcrypt';
import {UserModel} from "@hiddentemple/api-interfaces";
import { HttpException } from '@nestjs/common';


@Entity('users')
export class UserEntity implements UserModel {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', { nullable: false, unique: true })
  @IsEmail()
  @MaxLength(50)
  email: string

  @Column('varchar', { nullable: true }) // TODO change to false after authn updates
  @Length(8,50)
  password: string

  @OneToOne(type => UserTypeEntity, { cascade: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'})
  @JoinColumn()
  userType: UserTypeEntity

  @OneToOne(type => ContactEntity,{ cascade : true, onDelete: "CASCADE", onUpdate: 'CASCADE' })
  @JoinColumn()
  contact: ContactEntity

  @CreateDateColumn({name: 'createdAt', nullable: false})
  createdAt: Date;

  @UpdateDateColumn({name: 'updatedAt', nullable: true})
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10)
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password)
  }

  @BeforeInsert()
  @BeforeUpdate()
  async validate(){ await validateOrReject(this).then(
    onFulfilled => {
      return onFulfilled
    },
    onRejected => {
      throw new HttpException( {'statusCode': 400, 'message': onRejected[0].constraints}, 400)
    }
  )
  }
}
