import {define} from "typeorm-seeding";
import {PhoneEntity} from "../entities/phone.entity";

export const MockPhoneTypes = ['Personal', 'Work', 'Private', '', '', '']

define(PhoneEntity, faker => {
    const phone = new PhoneEntity();
    phone.number = +faker.phone.phoneNumber(); // Uses unary + operator to convert string -> number
    phone.type = faker.random.arrayElement(MockPhoneTypes);
    return phone;
})