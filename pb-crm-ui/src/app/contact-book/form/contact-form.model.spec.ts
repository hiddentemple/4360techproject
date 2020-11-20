import {ContactFormModel} from "./contact-form.model";
import {AbstractControl, FormGroup} from "@angular/forms";
import {PhoneCategory, PhoneModel} from "@hiddentemple/api-interfaces";
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
    console.log(formGroup)
    const actualCountryCode = formGroup.controls['countryCode'].value;
    const actualPhoneNumber = formGroup.controls['phoneNumber'].value;

    // Then
    expect(actualCountryCode).toEqual(expectedCountryCode)
    expect(actualPhoneNumber).toEqual(expectedNumberPart)
  });

  it('should assign tags');


})
