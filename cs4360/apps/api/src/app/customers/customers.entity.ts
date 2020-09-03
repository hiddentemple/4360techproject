import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity('customers')
export class CustomersEntity {
  @PrimaryGeneratedColumn('uuid') id: string

  @Column('varchar', { length: 500, unique: true})
  firstname: string

  @Column('varchar', { length: 500 })
  lastname: string

  @Column('numeric')
  phone: number
}
