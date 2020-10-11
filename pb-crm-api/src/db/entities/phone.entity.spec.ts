import {PhoneEntity} from "./phone.entity";
import {PhoneCategoryEntity} from "./phone-category.entity";
import {CategoryCode} from "@hiddentemple/api-interfaces";
import {expectError, expectNoErrors} from "../../test.utils";

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
        phone.category = getPhoneCategory();

        return expectNoErrors(phone)
    })

    it('should accept valid US phone numbers', () => {
        phone.category = getPhoneCategory();
        phone.phoneNumber = '3034565896'

        return expectNoErrors(phone)
    });

    it('should require a phone number', () => {
        const expectedMessage = 'phoneNumber should not be null or undefined'
        phone.category = getPhoneCategory();

        return expectError(phone, 'phoneNumber', 'isDefined', expectedMessage);
    });

    it('should reject invalid phone numbers', () => {
        const expectedMessage = 'phoneNumber must be a valid phone number';
        phone.category = getPhoneCategory();
        phone.phoneNumber = '356'

        return expectError(phone, 'phoneNumber', 'isPhoneNumber', expectedMessage)
    });

    it('should reject invalid phone numbers (too short)', () => {
        const expectedMessage = 'Phone number must be exactly 10 digits';
        phone.category = getPhoneCategory();
        phone.phoneNumber = '356'

        return expectError(phone, 'phoneNumber', 'length', expectedMessage)
    });

    it('should reject invalid phone numbers (not a number)', () => {
        const expectedMessage = 'phoneNumber must be a number string';
        phone.category = getPhoneCategory();
        phone.phoneNumber = 'asf'

        return expectError(phone, 'phoneNumber', 'isNumberString', expectedMessage)
    });

    it('should reject invalid phone numbers (contains formatting)', () => {
        const expectedMessage = 'phoneNumber must be a number string';
        phone.category = getPhoneCategory();
        phone.phoneNumber = '303-589-5896'

        return expectError(phone, 'phoneNumber', 'isNumberString', expectedMessage)
    });

    it('should reject invalid phone numbers (contains an area code)', () => {
        const expectedMessage = 'phoneNumber must be a number string';
        phone.category = getPhoneCategory();
        phone.phoneNumber = '+13252545589'

        return expectError(phone, 'phoneNumber', 'isNumberString', expectedMessage)
    });

});

export function getPhoneCategory(code: CategoryCode = CategoryCode.PRIMARY): PhoneCategoryEntity {
    return {id: '', code: code, description: 'Primary', phones: []}
}