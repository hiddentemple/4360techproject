import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm'
import {ContactModel} from "@crm/shared/model";

@Entity('contacts')
export class CustomersEntity implements ContactModel {
  @PrimaryGeneratedColumn('uuid') id: string

  @Column('varchar', { length: 500, unique: true})
  firstname: string

  @Column('varchar', { length: 500 })
  lastname: string

  @Column('numeric')
  phone: number

  @OneToMany

}
