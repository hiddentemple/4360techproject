import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn,} from 'typeorm';
import {IsDefined, IsOptional, Length, Matches, ValidateNested} from 'class-validator';
import {ContactModel, NameRegex} from "@hiddentemple/api-interfaces";
import {EmailEntity} from "./email.entity";
import {PhoneEntity} from "./phone.entity";
import { AddressEntity } from './address.entity';
import { WebpageEntity } from './webpage.entity';


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

    @Column({ type: 'varchar', length: 50, nullable: true})
    @IsOptional()
    @Length(2, 50)
    nickName: string;
    
    @Column({ type: "varchar", length: 50, nullable: true})
    @IsOptional()
    @Length(2, 50)
    organization: string;
    
    @OneToMany(type => EmailEntity, email => email.contact, {
        cascade: true,
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @IsOptional()
    @ValidateNested({ each: true })
      // @Type(() => EmailEntity)
    emails: EmailEntity[];

    @OneToMany(type => PhoneEntity, phone => phone.contact, {
        cascade: true,
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @IsOptional()
    @ValidateNested({ each: true })
      // @Type(() => PhoneEntity)
    phones: PhoneEntity[];

    @OneToMany(type => AddressEntity, address => address.contact, {
        cascade: true,
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @IsOptional()
    @ValidateNested({ each: true })
    addresses: AddressEntity[];

    @Column({type: 'varchar', length: 25, nullable: true})
    @IsOptional()
    @Length(2, 25)
    countryCode: string;

    @Column({type: 'varchar', length: 50, nullable: true})
    @IsOptional()
    @Length(2,50)
    relatedName: string;

    @Column({type: 'varchar', length: 50, nullable: true})
    @IsOptional()
    @Length(2, 50)
    jobTitle: string;

    @Column({type: 'varchar', length: 50, nullable: true})
    @IsOptional()
    @Length(2, 50)
    department: string;

    @Column({type: 'varchar', length: 50, nullable: true})
    @IsOptional()
    @Length(2, 50)
    company: string;

    @Column({ type: "text", nullable: true})
    @IsOptional()
    notes: string

    @Column({type: 'varchar', length: 50, nullable: true})
    @IsOptional()
    @Length(2, 50)
    birthday: string;

    @Column({type: 'varchar', length: 50, nullable: true})
    @IsOptional()
    @Length(2, 50)
    anniversary: string;

    @Column({type: 'varchar', length: 50, nullable: true})
    @IsOptional()
    @Length(2, 50)
    gender: string;

    @OneToMany(type => WebpageEntity, webpage => webpage.contact, {
        cascade: true,
        eager: true,
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
    })
    @IsOptional()
    @ValidateNested({ each: true })
    webpages: WebpageEntity[];

    @Column({type: 'varchar', length: 50, nullable:true, array: true})
    @IsOptional()
    @Length(2, 50)
    tags: string[];

    @CreateDateColumn({name: 'createdAt', nullable: false})
    createdAt: Date;

    @UpdateDateColumn({name: 'updatedAt', nullable: true})
    updatedAt: Date;


}
