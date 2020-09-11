import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany
} from 'typeorm'
import {CompanyEntity} from "./company.entity";
import {EmployeeEntity} from "./employee.entity";

@Entity("contacts")
export class ContactEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', { length: 50, nullable: false })
  firstname: string;

  @Column('varchar', { length: 50, nullable: false })
  lastname: string;

  @Column('numeric', { min: 10 })
  personalPhone?: number;

  @Column('varchar', { length: 50 })
  personalEmail?: string;

  @OneToMany(type => EmployeeEntity, employee => employee.contact)
  jobs: EmployeeEntity[];

}
