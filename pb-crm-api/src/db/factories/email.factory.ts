import {EmailEntity} from "../entities/email.entity";
import {define} from "typeorm-seeding";

// An empty type is just as likely as a filled one
const MockEmailTypes = ['Personal', 'Work', 'Private', '', '', '']

define(EmailEntity, faker => {
    const email = new EmailEntity();
    email.address = faker.internet.email();
    // email.type = faker.random.arrayElement(MockEmailTypes)
    return email
})