import {define, factory} from "typeorm-seeding";
import {UserEntity} from "../entities/user.entity";
import {UserTypeEntity} from "../entities/user-type.entity";
import {ContactEntity} from "../entities/contact.entity";


define(UserEntity, faker => {
    const user = new UserEntity();
    user.email = faker.internet.email();
    user.password = faker.internet.password();

    user.userType = factory(UserTypeEntity)().create() as any;
    user.contact = factory(ContactEntity)().create() as any;

    return user;
})