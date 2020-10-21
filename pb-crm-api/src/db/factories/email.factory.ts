import {EmailEntity} from "../entities/email.entity";
import {define} from "typeorm-seeding";
import {CategoryEntity} from "../entities/category.entity";

// An empty type is just as likely as a filled one
const MockEmailTypes = ['Personal', 'Work', 'Private', '', '', '']

define(EmailEntity, (faker, context: {primary?: CategoryEntity, user: CategoryEntity[]}) => {
    const email = new EmailEntity();
    email.address = faker.internet.email();

    if (context.primary) {
        email.category = context.primary
    } else {
        email.category = faker.random.arrayElement(context.user)
    }

    return email
})