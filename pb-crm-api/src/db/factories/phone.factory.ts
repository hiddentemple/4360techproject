import {define} from "typeorm-seeding";
import {PhoneEntity} from "../entities/phone.entity";
import {EmailEntity} from "../entities/email.entity";
import {CategoryEntity} from "../entities/category.entity";

export const MockPhoneTypes = ['Personal', 'Work', 'Private', '', '', '']

define(PhoneEntity, (faker, context: {primary?: CategoryEntity, user: CategoryEntity[]}) => {
    const phone = new PhoneEntity();
    const phoneStr: string = faker.phone.phoneNumberFormat(3)
    const oneDot: string = phoneStr.replace(".", "")
    const noDots: string = oneDot.replace(".", "")
    console.log("NO DOTS", noDots)
    phone.phoneNumber = noDots
    if (context.primary) {
        phone.category = context.primary
    } else {
        phone.category = faker.random.arrayElement(context.user)
    }
    return phone;
})

