import {EmailEntity} from "../entities/email.entity";
import {define} from "typeorm-seeding";
import {PhoneEmailCategory} from "@hiddentemple/api-interfaces";

define(EmailEntity, (faker, context: any) => {
    const email = new EmailEntity();
    email.address = faker.internet.email();
    email.category = faker.random.arrayElement(Object.values(PhoneEmailCategory));
    return email
})