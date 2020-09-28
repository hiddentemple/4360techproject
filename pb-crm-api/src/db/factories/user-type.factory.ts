import {define} from "typeorm-seeding";
import {UserTypeEntity} from "../entities/user-type.entity";

export const MockUserTypes = {
    types: ['Admin', 'Client', 'Employee'],
    descriptionMap: {
        'Admin': 'Admin with all privileges',
        'Client': 'Client with limited scope to specific invoices',
        'Employee': 'Client with company-wide scope. Can create invoices and contacts'
    }
}


define(UserTypeEntity, faker => {
    const usertype = new UserTypeEntity();
    const type = faker.random.arrayElement(MockUserTypes.types);
    usertype.type = type;
    usertype.description = MockUserTypes.descriptionMap[type];

    return usertype;
})