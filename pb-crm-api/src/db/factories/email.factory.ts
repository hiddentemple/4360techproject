import {EmailEntity} from "../entities/email.entity";
import {define} from "typeorm-seeding";

const EmailTypes = ['Personal', 'Work', 'Private', '', '', '']

define(EmailEntity, (faker: typeof Faker) => {
    const address = faker.internet.email();

    const tpye

})