import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { ContactEntity } from "../contacts/contacts.entity";
import {CompanyEntity} from "../companies/companies.entity";
import {EmployeeDTO} from "@crm/crm/shared";


@Entity('employees')
export class EmployeeEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 50, nullable: false })
  email: string;

  @Column('numeric', {  })
  phone?: number;

  @Column('varchar', { length: 250 })
  description: string; // techlead, pm, etc

  // @ManyToOne(type => ContactEntity, contact => contact.jobs)
  // contact: ContactEntity;

  // @ManyToOne(type => CompanyEntity, company => company.employees)
  // company: CompanyEntity;

}
