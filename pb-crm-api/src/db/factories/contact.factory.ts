import {ContactEntity} from "../entities/contact.entity";
import {define, factory} from "typeorm-seeding";
import {EmailEntity} from "../entities/email.entity";
import {PhoneEntity} from "../entities/phone.entity";
import {CategoryEntity} from "../entities/category.entity";


define(ContactEntity, (faker, context: {primary: CategoryEntity}) => {
    const contact = new ContactEntity();
    contact.firstName = faker.name.firstName();
    contact.lastName = faker.name.lastName();

    contact.notes = faker.lorem.sentence(5);
    contact.company = faker.company.companyName();

    const primaryEmail: EmailEntity = factory(EmailEntity)(context).create() as any;
    contact.emails = [primaryEmail];
    const primaryPhone: PhoneEntity = factory(PhoneEntity)(context).create() as any;
    contact.phones = [primaryPhone];

    return contact;
})