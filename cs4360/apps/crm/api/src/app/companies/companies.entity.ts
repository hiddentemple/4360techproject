import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import {EmployeeEntity} from "../employees/employees.entity";
import {CompanyDTO} from "@crm/crm/shared";

@Entity('companies')
export class CompanyEntity{

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', { length: 500, unique: true, nullable: false })
  name: string;

  @Column('numeric', { unique: true })
  phone?: number;

  @Column('varchar', { length: 500, unique: true })
  email?: string;
}
