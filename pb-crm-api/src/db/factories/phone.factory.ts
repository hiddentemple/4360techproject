import {define} from "typeorm-seeding";
import {PhoneEntity} from "../entities/phone.entity";
import {EmailEntity} from "../entities/email.entity";
import {PhoneCategory} from "@hiddentemple/api-interfaces";
import {Chance} from "chance";



define(PhoneEntity, (faker) => {
    const phone = new PhoneEntity();
    phone.category = faker.random.arrayElement(Object.values(PhoneCategory));
    phone.phoneNumber = "+1" + Chance().phone({country: 'us', formatted: false});
    phone.isPrimary = false;
    return phone;
})

