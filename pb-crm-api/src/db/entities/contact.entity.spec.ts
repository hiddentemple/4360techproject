import {ContactEntity} from "./contact.entity";
import {expectError, expectNoErrors} from "../../test.utils";
import {EmailEntity} from "./email.entity";
import {PhoneEntity} from "./phone.entity";

describe("ContactEntity", () => {
    let contact: ContactEntity;

    beforeEach(() => {
        contact = new ContactEntity();
    })

    it('firstName should match name specification', () => {
        return validateName(contact, NameType.FIRST)
    })

    it('lastName should match name specification', () => {
        return validateName(contact, NameType.LAST)
    })

    it('should not require company', () => {
        contact = getValidContact(contact);
        return expectNoErrors(contact);
    });

    it('should reject companies of invalid length (too short)', () => {
        const expectedMessage = 'company must be longer than or equal to 2 characters';
        contact = getValidContact(contact);
        contact.company = 'a';

        return expectError(contact, 'company', 'length', expectedMessage);
    });

    it('should reject companies of invalid length (too long)', () => {
        const expectedMessage = 'company must be shorter than or equal to 255 characters';
        const tooLong = 'Iamreallyveryveryveryveryveryveryveryveryveryveryverylong'
        expect(tooLong.length > 255).toBeTruthy()

        contact = getValidContact(contact);
        contact.company = tooLong;

        return expectError(contact, 'company', 'length', expectedMessage);
    });

    it('should not require emails', () => {
        contact = getValidContact(contact);
        expect(contact.emails).toBeUndefined()
        return expectNoErrors(contact)
    });

    it('should not require phones', () => {
        contact = getValidContact(contact);
        expect(contact.phones).toBeUndefined()
        return expectNoErrors(contact)
    });

    // it('if emails are present, it should reject without a primary email', () => {
    //     const userEmail: EmailEntity = getEmail(CategoryCode.USER);
    //     const emails = [userEmail]
    //     const expectedMessage = 'Must have at least one primary email'
    //     contact = getValidContact(contact);
    //     contact.emails = emails;
    //
    //     return expectError(contact, 'emails', 'hasPrimary', expectedMessage)
    // });

    // it('should accept emails which contains a default', () => {
    //     const userEmail: EmailEntity = getEmail(CategoryCode.USER);
    //     const primaryEmail: EmailEntity = getEmail(CategoryCode.PRIMARY);
    //     const emails = [userEmail, primaryEmail]
    //     contact = getValidContact(contact);
    //     contact.emails = emails;
    //
    //     return expectNoErrors(contact)
    // });

    // it('if phones are present, it should reject without a primary phone', () => {
    //     const userPhone: PhoneEntity = getPhone(CategoryCode.USER);
    //     const phones = [userPhone]
    //     const expectedMessage = 'Must have at least one primary phone'
    //     contact = getValidContact(contact);
    //     contact.phones = phones;
    //
    //     return expectError(contact, 'phones', 'hasPrimary', expectedMessage)
    // });
    //
    // it('should accept phones which contains a default', () => {
    //     const userPhone: PhoneEntity = getPhone(CategoryCode.USER);
    //     const primaryPhone: PhoneEntity = getPhone(CategoryCode.PRIMARY);
    //     const phones = [userPhone, primaryPhone]
    //     contact = getValidContact(contact);
    //     contact.phones = phones;
    //
    //     return expectNoErrors(contact)
    // });
})

function getValidContact(contact: ContactEntity, firstName: string = 'vaildFirst', lastName: string = 'validLast') {
    contact.firstName = firstName;
    contact.lastName = lastName;
    return contact;
}


// function getEmail(category: CategoryCode): EmailEntity {
//     return {
//         id: '',
//         address: 'bob@gmail.com',
//         category: getCategory(category),
//         contact: undefined
//     }
// }
//
// function getPhone(category: CategoryCode): PhoneEntity {
//     return {
//         id: '',
//         phoneNumber: '3256545585',
//         category: getCategory(category),
//         contact: undefined
//     }
// }

enum NameType { FIRST, LAST}

async function validateName(contact: ContactEntity, name: NameType) {
    let target: string;
    let valid: string;

    if (name == NameType.FIRST) {
        target = 'firstName';
        valid = 'lastName';
    } else {
        target = 'lastName';
        valid = 'firstName'
    }

    const validName = 'billy';
    let errorMessage;
    contact[valid] = validName

    contact[target] = undefined // undefined
    errorMessage = target + ' should not be null or undefined';
    await expectError(contact, target, 'isDefined', errorMessage);

    contact[target] = 'b' // too short
    errorMessage = target + ' must be longer than or equal to 2 characters'
    await expectError(contact, target, 'length', errorMessage);

    const tooLong = 'Iamreallyveryveryveryveryveryveryveryveryveryveryverylong'
    expect(tooLong.length > 255).toBeTruthy()
    contact[target] = tooLong;
    errorMessage = target + ' must be shorter than or equal to 255 characters';
    await expectError(contact, target, 'length', errorMessage)

    contact[target] = 'I have spaces'
    errorMessage = target + ' must contain only alphabetic characters and \'-\'';
    await expectError(contact, target, 'matches', errorMessage)

    contact[target] = '1243' // numeric
    errorMessage = target + ' must contain only alphabetic characters and \'-\'';
    await expectError(contact, target, 'matches', errorMessage)

    contact[target] = validName;
    await expectNoErrors(contact);

    contact[target] = 'name-with-hyphens'
    await expectNoErrors(contact)

    contact[target] = 'name.with.dots'
    await expectNoErrors(contact)
}
