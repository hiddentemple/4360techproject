import {factory, Factory, Seeder} from "typeorm-seeding";
import {Connection} from "typeorm";
import {ContactEntity} from "../entities/contact.entity";
import {CategoryEntity} from "../entities/category.entity";


export default class CreateContacts implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        const primaryCategory: CategoryEntity = await factory(CategoryEntity)({description: "primary", isPrimary: true}).create() ;
        await factory(ContactEntity)({primary: primaryCategory}).createMany(10)
    }
}