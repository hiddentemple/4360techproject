import {factory, Factory, Seeder} from "typeorm-seeding";
import {Connection} from "typeorm";
import {ContactEntity} from "../entities/contact.entity";


export default class CreateContacts implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await factory(ContactEntity)().createMany(100)
    }
}
