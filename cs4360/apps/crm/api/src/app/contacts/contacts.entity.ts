import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm'

import { EmployeeEntity } from "../employees/employees.entity";
import {ContactDTO} from "@crm/crm/shared";

@Entity("contacts")
export class ContactEntity implements ContactDTO{

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', { length: 50, nullable: false })
  firstname: string;

  @Column('varchar', { length: 50, nullable: false })
  lastname: string;

  @Column('numeric', { nullable: true })
  personalPhone?: number;

  @Column('varchar', { length: 50, nullable: true })
  personalEmail?: string;

  // @OneToMany(type => EmployeeEntity, employee => employee.contact)
  // jobs: EmployeeEntity[];

}
