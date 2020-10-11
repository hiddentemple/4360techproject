import {EmailEntity} from "./email.entity";
import {EmailCategoryEntity} from "./email-category.entity";
import {CategoryCode} from "@hiddentemple/api-interfaces";
import {expectError, expectNoErrors} from "../../test.utils";

describe('EmailEntity', () => {
    let email: EmailEntity;

    beforeEach(() => {
        email = new EmailEntity();
    })

    it('should require an email address', () => {
        const expectedMessage = 'address should not be null or undefined';
        email.category = getEmailCategory();

        return expectError(email, 'address', 'isDefined', expectedMessage)
    });

    it('should accept valid emails', () => {
        email.category = getEmailCategory();
        email.address = "bob@gmail.com";

        return expectNoErrors(email);
    });

    it('should reject invalid emails', () => {
        const expectedMessage = 'address must be an email';
        email.category = getEmailCategory();
        email.address = "I'm not an email";

        return expectError(email, 'address', 'isEmail', expectedMessage);
    });

    it('should require a category', () => {
        const expectedMessage = 'category should not be null or undefined';
        email.address = "bob@gmail.com";

        return expectError(email, 'category', 'isDefined', expectedMessage)
    })

    it('should accept valid categories', () => {
        email.category = getEmailCategory();
        email.address = "bob@gmail.com";

        return expectNoErrors(email);
    });

});

function getEmailCategory(): EmailCategoryEntity {
    return { code: CategoryCode.PRIMARY, description: 'Primary', id: '', emails: [] }
}