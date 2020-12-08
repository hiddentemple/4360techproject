import {define, factory} from "typeorm-seeding";
import {CustomerEntity} from "../entities/customer.entity";
import {BillerEntity} from "../entities/biller.entity";
import {AddressEntity} from "../entities/address.entity";

define(BillerEntity, (faker) => {
    const biller = new BillerEntity();
    biller.name = faker.company.companyName();
    biller.address = factory(AddressEntity)().create() as any;
    return biller;
})
