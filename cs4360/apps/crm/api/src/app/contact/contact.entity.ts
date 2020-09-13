import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import { EmployeeEntity } from "../../../../../../libs/crm/nest/dao/src/lib/entities/employee.entity";

@Entity("contacts")
export class ContactEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column('varchar', { length: 50, nullable: false })
  firstname: string;

  @Column('varchar', { length: 50, nullable: false })
  lastname: string;

  @Column('numeric', {  })
  personalPhone?: number;

  @Column('varchar', { length: 50 })
  personalEmail?: string;

  @OneToMany(type => EmployeeEntity, employee => employee.contact)
  jobs: EmployeeEntity[];

}
