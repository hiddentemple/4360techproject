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
        onDelete: "CASCADE"
    })
    @JoinColumn()
    contact: ContactEntity
}

let email = new EmailEntity()

validate(email).then(errors => { // errors is an array of validation errors
    if (errors.length > 0) {
        console.log("validation failed. errors: ", errors);
    } else {
        console.log("validation succeed");
    }
});

validateOrReject(email).catch(errors => {
    console.log("Promise rejected (validation failed). Errors: ", errors);
});