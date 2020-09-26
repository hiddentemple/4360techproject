import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import {EmailEntity} from "./email.entity";
import {PhoneEntity} from "./phone.entity";
import {ContactModel} from "../../api-interfaces/contact/models/contact.model";
import {validate, validateOrReject, Length} from "class-validator";
import { UserEntity } from './user.entity';

@Entity("contacts")
export class ContactEntity implements ContactModel {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', { nullable: false})
    @Length(1)
    firstName: string;

    @Column('varchar', { nullable: false})
    @Length(1)
    lastName: string;

    @Column('varchar', { nullable: true})
    @Length(0,50)
    company?: string

    @Column('varchar', { nullable: true})
    @Length(0,250)
    notes?: string

    @OneToMany(type => EmailEntity, email => email.contact, {
        cascade: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    emails?: EmailEntity[];

    @OneToMany(type => PhoneEntity, phone => phone.contact, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    phones?: PhoneEntity[];


}

let contact = new ContactEntity()

validate(contact).then(errors => { // errors is an array of validation errors
    if (errors.length > 0) {
        console.log("validation failed. errors: ", errors);
    } else {
        console.log("validation succeed");
    }
});

validateOrReject(contact).catch(errors => {
    console.log("Promise rejected (validation failed). Errors: ", errors);
});