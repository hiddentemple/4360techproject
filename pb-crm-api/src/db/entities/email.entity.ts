import {ContactEntity} from "./contact.entity";
import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {EmailModel} from "../../api-interfaces/contact/models/email.model";
import {IsEmail, Length, validate, validateOrReject} from "class-validator";


@Entity('emails')
export class EmailEntity implements EmailModel {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', { nullable: false })
    @IsEmail()
    @Length(5,50)
    address: string

    @Column('varchar', {  nullable: true })
    @Length(0,50)
    type?: string

    @ManyToOne(type => ContactEntity, contact => contact.emails, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
    })
    @JoinColumn()
    contact: ContactEntity
}
