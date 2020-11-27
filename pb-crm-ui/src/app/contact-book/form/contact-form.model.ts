import {
  AddressModel,
  ContactModel,
  EmailModel,
  PhoneCategory,
  PhoneModel,
  WebpageModel
} from "@hiddentemple/api-interfaces";
import {AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {filterToDefinedProperties, StringFilterer} from "../../core/utils/object.utils";
import {ControlGenerator} from "./contact-form.service";
import {parsePhoneNumber} from "libphonenumber-js";

export const DEFAULT_SIZE = 255;

export function getMaxLengthValidator(size = DEFAULT_SIZE): ValidatorFn {
  return Validators.maxLength(size)
}

export const LengthAndRequiredValidators = [Validators.required, getMaxLengthValidator()]

export const PhoneRegex = /^\d{5,15}$/;
export const PhoneValidator = Validators.pattern(PhoneRegex); // TODO validate length and numeric

export interface PhoneInputModel {
  phoneNumber: string;
  countryCode: string;
  isPrimary: boolean
  category: PhoneCategory;
}

export class ContactFormModel {
  // Personal Info (NameFormComponent)
  static readonly personalInfoKeys = ['firstName', 'lastName', 'gender', 'nickName', 'birthday', 'anniversary'];
  firstName = new FormControl('', LengthAndRequiredValidators);
  lastName = new FormControl('', LengthAndRequiredValidators);
  gender = new FormControl('', [getMaxLengthValidator()]);
  nickName = new FormControl('', [getMaxLengthValidator()]);
  birthday = new FormControl('');
  anniversary = new FormControl('')

  // Company info (CompanyFormComponent)
  static readonly companyKeys = ['company', 'jobTitle', 'department', 'organization'];
  company = new FormControl('', [getMaxLengthValidator()]);
  jobTitle = new FormControl('', [getMaxLengthValidator()]);
  department = new FormControl('', [getMaxLengthValidator()]);
  organization = new FormControl('', [getMaxLengthValidator()]);

  notes = new FormControl("");  // NotesFormComponent

  phones = new FormArray([]);    // PhonesFormComponent
  emails = new FormArray([]);    // EmailFormComponent
  addresses = new FormArray([]); // AddressFormComponent
  webpages = new FormArray([]);  // WebpageFormComponent

  tags = new FormArray([]);

  constructor(contact?: ContactModel) {
    if (contact) this.setContact(contact);
  }

  /**
   * Design note: the previous version of this function (in the old contact form) used to have default values in the
   * parameter, as opposed to the "falsey" test we run in this method. This was changed because a default parameter
   * value does not evaluate to a default if a null value is passed in as a parameter (interestingly, it does
   * evaluate to the method signature defined default if the passed parameter value is undefined)
   *
   * This way, we never initialize the value to a falsey state.
   */
  public static initPhone(phone?: PhoneModel): FormGroup {
    let isPrimary = phone?.isPrimary || false;
    let category = phone?.category || "";
    let phoneNumber = "";
    let countryCode = "+1";

    if (phone) {
      const parsedPhone = parsePhoneNumber(phone.phoneNumber);
      if (parsedPhone.isValid()) {
        phoneNumber = String(parsedPhone.nationalNumber)
        countryCode = "+" + String(parsedPhone.countryCallingCode)
      } else {
        console.error(`Phone number was not valid, cannot fill in input with values`)
      }
    }

    return new FormGroup({
      phoneNumber: new FormControl(phoneNumber, [Validators.required, PhoneValidator]),
      category: new FormControl(category, [Validators.required]),
      countryCode: new FormControl(countryCode, Validators.required),
      isPrimary: new FormControl(isPrimary)
    });
  }

  public static initEmail(email?: EmailModel): FormGroup {
    let address = email?.address || "";
    let category = email?.category || "";
    let isPrimary = email?.isPrimary || false;

    return new FormGroup({
      address: new FormControl(address, [Validators.email, Validators.required]),
      category: new FormControl(category, [Validators.required]),
      isPrimary: new FormControl(isPrimary)
    });
  }

  public static initAddress(address?: AddressModel) {
    let street = address?.street || "";
    let street2 = address?.street2 || "";
    let city = address?.city || "";
    let state = address?.state || "";
    let postalCode = address?.postalCode || "";
    let country = address?.country || "";
    let category = address?.category || "";

    return new FormGroup({
      street: new FormControl(street, LengthAndRequiredValidators),
      street2: new FormControl(street2, getMaxLengthValidator()),
      city: new FormControl(city, LengthAndRequiredValidators),
      state: new FormControl(state, Validators.required),
      postalCode: new FormControl(postalCode, [Validators.required]),
      country: new FormControl(country, [Validators.required]),
      category: new FormControl(category, Validators.required),
    })
  }

  public static initWebpage(webpage?: WebpageModel) {
    let url = webpage?.url || "";
    let category = webpage?.category || "";

    return new FormGroup({
      url: new FormControl(url, LengthAndRequiredValidators),
      category: new FormControl(category, Validators.required),
    })
  }

  public static initTag(tag?: string) {
    tag = tag || "";

    return new FormControl(tag)
  }

  private setContact(contact: ContactModel) {
    // Filter to only defined properties
    // Assign those properties to their corresponding property in this object
    //   If those properties are arrays, their specific function needs to be called
    console.group('Contact form set value')
    console.log('Paramter value', contact);
    const keysToIgnore = ["updatedAt", "createdAt", "id"];
    const keyFilter: StringFilterer = (key: string) => !(keysToIgnore.includes(key));
    const reduced: Partial<ContactModel> = filterToDefinedProperties(contact, keyFilter);
    console.log('Filtered to defined properties', reduced)
    Object.entries(reduced).forEach(([key, value]) => this.assigner(key, value));
    console.groupEnd()
  }

  private assigner(key: string, value: any) {
    console.group(`Assign key '${key}' to type '${typeof value}' with value: ${JSON.stringify(value)}`)
    if (typeof value === 'string') this.assignSimple(key, value);
    else if (Array.isArray(value)) this.assignArray(key, value);
    else if (Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value)) {
      // https://stackoverflow.com/questions/643782/how-to-check-whether-an-object-is-a-date
      this.assignDate(key, value as Date)
    }
    else {
      throw new Error(`Failed to assign property key '${key}' to value '${JSON.stringify(value)}'`)
    }
    console.log('Abstract control after assign', this[key])
    console.groupEnd()
  }

  private assignSimple(key: string, value: string) {
    console.log(`Simple Assign on key '${key}'`);
    (this[key] as AbstractControl).setValue(value);
  }

  private assignDate(key: string, value: Date) {
    console.log(`Date assign on key '${key}'`);
    (this[key] as AbstractControl).setValue(value.toISOString());
  }

  private assignArray(key: string, value: PhoneModel[] | EmailModel[] | AddressModel[] | WebpageModel[] | string[]) {
    switch (key) {
      case 'phones':
        this.arrayAssigner(key, value, ContactFormModel.initPhone);
        break;
      case 'emails':
        this.arrayAssigner(key, value, ContactFormModel.initEmail);
        break;
      case 'addresses':
        this.arrayAssigner(key, value, ContactFormModel.initAddress)
        break;
      case 'webpages':
        this.arrayAssigner(key, value, ContactFormModel.initWebpage)
        break;
      case 'tags':
        this.arrayAssigner(key, value, ContactFormModel.initTag)
        break;
      default:
        throw new Error("Invalid key passed to assign array: " + key)
    }
  }

  private arrayAssigner(key: string, values: any[], generator: (any) => AbstractControl) {
    console.log(`Array assigner on key '${key}'`)
    Object.values(values).forEach(value => {
      const form: AbstractControl = generator(value);
      (this[key] as FormArray).push(form);
    })
  }
}
