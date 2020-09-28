import {ContactEntity} from "../entities/contact.entity";
import {define, factory} from "typeorm-seeding";
import {EmailEntity} from "../entities/email.entity";
import {PhoneEntity} from "../entities/phone.entity";


define(ContactEntity, faker => {
    const contact = new ContactEntity();
    contact.firstName = faker.name.firstName();
    contact.lastName = faker.name.lastName();

    if (faker.random.boolean()) { contact.notes = faker.lorem.sentence(5); }
    if (faker.random.boolean()) { contact.company = faker.company.companyName(); }

    const emailCount = faker.random.number(5);
    contact.emails = factory(EmailEntity)().createMany(emailCount) as any;

    const phoneCount = faker.random.number(5);
    contact.phones = factory(PhoneEntity)().createMany(phoneCount) as any;

    return contact;
})