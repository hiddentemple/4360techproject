import {Factory, Seeder} from "typeorm-seeding";
import {Connection} from "typeorm";
import {AccountEntity} from "../entities/account.entity";

export default class CreateAccounts implements Seeder {
    public async run(factory: Factory, connection: Connection): Promise<any> {
        await factory(AccountEntity)().createMany(100)
    }
}
