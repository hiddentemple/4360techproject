import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn,} from 'typeorm';
import {IsDefined, IsOptional, Length, Matches, Validate, ValidateNested} from 'class-validator';
import {Type} from "class-transformer";
import {ContactModel} from "@hiddentemple/api-interfaces";
import {EmailEntity} from "./email.entity";
import {PhoneEntity} from "./phone.entity";
import {HasPrimary} from "../../core/validation/has-primary.constraint";

export const NameRegex = /^[a-zA-z-]+$/

@Entity("contacts")
export class ContactEntity implements ContactModel {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: "character varying", length: 50 })
    @Matches(NameRegex, {message: "firstName must contain only alphabetic characters and '-'"})
    @Length(2, 50)
    @IsDefined()
    firstName: string;

    @Column({ type: "character varying", length: 50 })
    @Matches(NameRegex, {message: "lastName must contain only alphabetic characters and '-'"})
    @Length(2, 50)
    @IsDefined()
    lastName: string;

    @Column({ type: "character varying", length: 50, nullable: true })
    @IsOptional()
    @Length(2, 50)
    company: string

    @Column({ type: "text", nullable: true })
    @IsOptional()
    notes: string

    @OneToMany(type => EmailEntity, email => email.contact, {
        cascade: true,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => EmailEntity)
    @Validate(HasPrimary, { message: 'Must have at least one primary email'})
    emails: EmailEntity[];

    @OneToMany(type => PhoneEntity, phone => phone.contact, {
        cascade: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => PhoneEntity)
    @Validate(HasPrimary, { message: 'Must have at least one primary phone'})
    phones: PhoneEntity[];

    @CreateDateColumn({name: 'createdAt', nullable: false})
    createdAt: Date;

    @UpdateDateColumn({name: 'updatedAt', nullable: true})
    updatedAt: Date;


}
