import {define} from "typeorm-seeding";
import {PhoneEntity} from "../entities/phone.entity";
import {EmailEntity} from "../entities/email.entity";
import {PhoneEmailCategory} from "@hiddentemple/api-interfaces";

define(PhoneEntity, (faker, context: any) => {
    const phone = new PhoneEntity();
    const phoneStr: string = faker.phone.phoneNumberFormat(3)
    const oneDot: string = phoneStr.replace(".", "")
    const noDots: string = oneDot.replace(".", "")
    phone.phoneNumber = "+1303" + noDots.slice(3, 10);

    phone.category = faker.random.arrayElement(Object.values(PhoneEmailCategory));

    return phone;
})

