import {
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import {EmailEntity} from "./email.entity";
import {PhoneEntity} from "./phone.entity";
import {ContactModel} from "../../api-interfaces/contact/models/contact.model";
import { Length, MaxLength, IsOptional } from 'class-validator';


@Entity("contacts")
export class ContactEntity implements ContactModel {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', { nullable: false})
    @Length(2)
    firstName: string;

    @Column('varchar', { nullable: false})
    @Length(2)
    lastName: string;

    @Column('varchar', { nullable: true})
    @IsOptional()
    @MaxLength(50)
    company?: string

    @Column('varchar', { nullable: true})
    @IsOptional()
    @MaxLength(250)
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

    @CreateDateColumn({name: 'createdAt', nullable: false})
    createdAt: Date;

    @UpdateDateColumn({name: 'updatedAt', nullable: true})
    updatedAt: Date;


}
