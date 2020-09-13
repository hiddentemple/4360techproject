import {
  Column,
  Entity,
  ManyToOne,
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

  @Column('numeric', {  })
  phone?: string;

  @Column('varchar', { length: 250 })
  description: string; // techlead, pm, etc

  @ManyToOne(type => ContactEntity, contact => contact.jobs)
  contact: ContactEntity;

  @ManyToOne(type => CompanyEntity, company => company.employees)
  company: CompanyEntity;

}
