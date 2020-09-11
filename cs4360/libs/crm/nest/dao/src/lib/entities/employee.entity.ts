import {
  Column,
  Entity,
  ManyToOne, OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import {ContactEntity} from "./contact.entity";
import {CompanyEntity} from "./company.entity";

@Entity('employees')
export class EmployeeEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50, nullable: false })
  email: string;

  @Column('numeric', { min: 10 })
  phone?: string;

  @Column('varchar', { length: 250 })
  description: string; // techlead, pm, etc

  @ManyToOne(type => ContactEntity, contact => contact.jobs)
  contact: ContactEntity;

  @ManyToOne(type => CompanyEntity, company => company.employees)
  company: CompanyEntity;

}
