import {ContactFormModel} from "./contact-form.model";
import {AbstractControl, FormGroup} from "@angular/forms";
import {ContactModel, PhoneCategory, PhoneModel} from "@hiddentemple/api-interfaces";
import {parsePhoneNumber} from "libphonenumber-js";

describe('Setting a Contact', () => {
  let model: ContactFormModel

  beforeEach(() => {model = new ContactFormModel();});

  it('should assign string properties', () => {
    // Given
    const expectedPropertyValue = 'value';
    const propertyKey = 'firstName';

    // When
    model["assigner"](propertyKey, expectedPropertyValue);
    const actualPropertyValue = (model[propertyKey] as AbstractControl).value

    // Then
    expect(actualPropertyValue).toEqual(expectedPropertyValue)
  });

  it('should assign date properties in the defined format', () => {
    // Given
    const propertyKey = 'birthday';
    const propertyValue: Date = new Date();
    const expectedStringValue: string = propertyValue.toISOString();

    // When
    model["assigner"](propertyKey, propertyValue);
    const actualPropertyValue = (model[propertyKey] as AbstractControl).value;

    // Then
    expect(actualPropertyValue).toEqual(expectedStringValue)
  });

  it('should create phone form controls from PhoneModel', () => {
    // Given
    const phoneNumberString = "+17205836819";
    const parsedPhone = parsePhoneNumber(phoneNumberString);
    expect(parsedPhone.isValid()).toBeTrue();
    const expectedNumberPart = parsedPhone.nationalNumber;
    const expectedCountryCode = parsedPhone.countryCallingCode;

    const phone: PhoneModel = {
      phoneNumber: phoneNumberString,
      isPrimary: false,
      category: PhoneCategory.PERSONAL
    };

    // When
    const formGroup: FormGroup = ContactFormModel.initPhone(phone);

    // Then
    const actualCountryCode = formGroup.controls['countryCode'].value;
    const actualPhoneNumber = formGroup.controls['phoneNumber'].value;
    expect(actualCountryCode).toEqual(expectedCountryCode)
    expect(actualPhoneNumber).toEqual(expectedNumberPart)
  });

  it('should assign array values (based on phones)', () => {
    // Given
    const phone1: PhoneModel = {
      phoneNumber: "+13037085589",
      isPrimary: false,
      category: PhoneCategory.PERSONAL
    }
    const phone2: PhoneModel = {
      phoneNumber: "+13037088896",
      isPrimary: false,
      category: PhoneCategory.WORK
    }
    const phones = [phone1, phone2]
    const contact: ContactModel = {
      updatedAt: undefined, createdAt: undefined,
      firstName: 'first',
      lastName: 'last',
      phones
    }

    // When
    model = new ContactFormModel(contact)

    // Then
    const actualPhoneControls = model.phones
    expect(actualPhoneControls.length).toEqual(2)

    // Values of the actual controls are proven by init phone tests
  })

  it('should assign tags', () => {
    // Given
    const tag1 = 'tag1';
    const tag2 = 'tag2';
    const tags = [tag1, tag2];
    const contact: ContactModel = {
      createdAt: undefined,
      updatedAt: undefined,
      firstName: 'first',
      lastName: 'last',
      tags
    }

    // When
    model = new ContactFormModel(contact);

    // Then
    const actualTagControls = model.tags.value;
    expect(actualTagControls.length).toEqual(2)

    expect(actualTagControls.includes(tag1)).toBeTrue();
    expect(actualTagControls.includes(tag2)).toBeTrue();
  });


})
