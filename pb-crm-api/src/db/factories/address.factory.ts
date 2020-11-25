import {AddressEntity} from "../entities/address.entity";
import {define} from "typeorm-seeding";
import {AddressCategory, WebpageCategory} from "@hiddentemple/api-interfaces";

define(AddressEntity, (faker) => {
    const address = new AddressEntity();
    address.street = faker.address.streetAddress()
    address.city = faker.address.city()
    address.postalCode = faker.address.zipCode()
    address.state = faker.address.state()
    address.country = faker.address.country()

    address.category = faker.random.arrayElement(Object.values(AddressCategory))
    return address;
})
