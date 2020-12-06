import {define} from "typeorm-seeding";
import {PhoneEntity} from "../entities/phone.entity";
import {EmailEntity} from "../entities/email.entity";
import {PhoneCategory} from "@hiddentemple/api-interfaces";
import {Chance} from "chance";
import {parsePhoneNumber} from "libphonenumber-js";



define(PhoneEntity, (faker) => {
    const phone = new PhoneEntity();
    phone.category = faker.random.arrayElement(Object.values(PhoneCategory));
    let phoneNumber, parsedNumber;
    while (true) {
        // Generate numbers until valid phone number is found
        try {
            phoneNumber = "+1" + Chance().phone({country: 'us', formatted: false});
            parsedNumber = parsePhoneNumber(phoneNumber)
            if (parsedNumber.isValid()) break;
        } catch (e) {
            // continue
        }
    }
    phone.phoneNumber = phoneNumber;
    phone.isPrimary = false;
    return phone;
})

