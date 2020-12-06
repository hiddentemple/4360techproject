import {CustomerEntity} from "../entities/customer.entity";
import {define} from "typeorm-seeding";


define(CustomerEntity, (faker) => {
    const customer = new CustomerEntity();
    customer.name = faker.company.companyName();
    return customer;
})
