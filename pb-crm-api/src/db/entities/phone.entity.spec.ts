import {PhoneEntity} from "./phone.entity";
import {expectError, expectNoErrors, getCategory} from "../../test.utils";

describe('PhoneEntity', () => {
    let phone: PhoneEntity;

    beforeEach(() => {
        phone = new PhoneEntity();
    });

    it('should require a category', () => {
        const expectedMessage = 'category should not be null or undefined'
        phone.phoneNumber = '3032562563'

        return expectError(phone, 'category', 'isDefined', expectedMessage)
    });

    it('should accept valid categories', () => {
        phone.phoneNumber = '3032562563'
        phone.category = getCategory();

        return expectNoErrors(phone)
    })

    it('should accept valid US phone numbers', () => {
        phone.category = getCategory();
        phone.phoneNumber = '3034565896'

        return expectNoErrors(phone)
    });

    it('should require a phone number', () => {
        const expectedMessage = 'phoneNumber should not be null or undefined'
        phone.category = getCategory();

        return expectError(phone, 'phoneNumber', 'isDefined', expectedMessage);
    });

    it('should reject invalid phone numbers', () => {
        const expectedMessage = 'phoneNumber must be a valid phone number';
        phone.category = getCategory();
        phone.phoneNumber = '356'

        return expectError(phone, 'phoneNumber', 'isPhoneNumber', expectedMessage)
    });

    it('should reject invalid phone numbers (too short)', () => {
        const expectedMessage = 'Phone number must be exactly 10 digits';
        phone.category = getCategory();
        phone.phoneNumber = '356'

        return expectError(phone, 'phoneNumber', 'length', expectedMessage)
    });

    it('should reject invalid phone numbers (not a number)', () => {
        const expectedMessage = 'phoneNumber must be a number string';
        phone.category = getCategory();
        phone.phoneNumber = 'asf'

        return expectError(phone, 'phoneNumber', 'isNumberString', expectedMessage)
    });

    it('should reject invalid phone numbers (contains formatting)', () => {
        const expectedMessage = 'phoneNumber must be a number string';
        phone.category = getCategory();
        phone.phoneNumber = '303-589-5896'

        return expectError(phone, 'phoneNumber', 'isNumberString', expectedMessage)
    });

    it('should reject invalid phone numbers (contains an area code)', () => {
        const expectedMessage = 'phoneNumber must be a number string';
        phone.category = getCategory();
        phone.phoneNumber = '+13252545589'

        return expectError(phone, 'phoneNumber', 'isNumberString', expectedMessage)
    });

});
