import {ContactEntity} from "../entities/contact.entity";
import {define, factory} from "typeorm-seeding";
import {EmailEntity} from "../entities/email.entity";
import {PhoneEntity} from "../entities/phone.entity";


define(ContactEntity, (faker) => {
    const contact = new ContactEntity();
    contact.firstName = faker.name.firstName();
    contact.lastName = faker.name.lastName();

    contact.notes = faker.lorem.sentence(5);
    contact.company = faker.company.companyName();

    const emailCount: number = faker.random.number(5);
    contact.emails = factory(EmailEntity)().createMany(emailCount) as any;

    const phoneCount: number = faker.random.number(5);
    contact.phones = factory(PhoneEntity)().createMany(phoneCount) as any;

    return contact;
})