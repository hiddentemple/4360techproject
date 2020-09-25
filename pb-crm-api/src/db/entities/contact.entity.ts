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
import { UserEntity } from './user.entity';

@Entity("contacts")
export class ContactEntity implements ContactModel {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column('varchar', {length: 50, nullable: false})
    firstName: string;

    @Column('varchar', {length: 50, nullable: false})
    lastName: string;

    @Column('varchar', {length: 50, nullable: true})
    company?: string

    @Column('varchar', {length: 250, nullable: true})
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

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}
