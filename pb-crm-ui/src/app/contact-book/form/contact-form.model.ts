import {
  AddressModel,
  ContactModel,
  EmailModel,
  PhoneEmailCategory,
  PhoneModel,
  WebpageModel
} from "@hiddentemple/api-interfaces";
import {BehaviorSubject} from "rxjs";
import {AbstractControl, FormArray, FormControl, FormGroup, Validator, ValidatorFn, Validators} from "@angular/forms";
import {PhoneValidator} from "../containers/contact-form/contact-form.component";
import {filterToDefinedProperties, StringFilterer} from "../../core/utils/object.utils";

export const DEFAULT_SIZE = 255;

export function getMaxLengthValidator(size = DEFAULT_SIZE): ValidatorFn {
  return Validators.maxLength(DEFAULT_SIZE)
}

export const LengthAndRequiredValidators = [Validators.required, getMaxLengthValidator()]

export class ContactFormModel {
  // Personal Info (NameFormComponent)
  firstName = new FormControl('', LengthAndRequiredValidators);
  lastName = new FormControl('', LengthAndRequiredValidators);
  gender = new FormControl('', [getMaxLengthValidator()]);
  nickName = new FormControl('', [getMaxLengthValidator()]);
  // TODO anniversary, birthday

  // Company info (CompanyFormComponent)
  company = new FormControl('', [getMaxLengthValidator()]);
  jobTitle = new FormControl('', [getMaxLengthValidator()]);
  department = new FormControl('', [getMaxLengthValidator()]);
  organization = new FormControl('', [getMaxLengthValidator()]);

  notes = new FormControl("");  // NotesFormComponent

  phones = new FormArray([]);    // PhonesFormComponent
  emails = new FormArray([]);    // EmailFormComponent
  addresses = new FormArray([]); // AddressFormComponent
  webpages = new FormArray([]);  // WebpageFormComponent
  tags = new FormArray([]);      // TagFormComponent

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
    let phoneNumber = phone?.phoneNumber || "";
    let isPrimary = phone?.isPrimary || false;
    let category = phone?.category || "";

    return new FormGroup({
      phoneNumber: new FormControl(phoneNumber, [Validators.required, PhoneValidator]),
      category: new FormControl(category, [Validators.required]),
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
    let isPrimary = address?.isPrimary || false;

    return new FormGroup({
      street: new FormControl(street, LengthAndRequiredValidators),
      street2: new FormControl(street2, getMaxLengthValidator()),
      city: new FormControl(city, LengthAndRequiredValidators),
      state: new FormControl(state, Validators.required),
      postalCode: new FormControl(postalCode, [Validators.required]),
      country: new FormControl(country, [Validators.required]),
      category: new FormControl(category, Validators.required),
      isPrimary: new FormControl(isPrimary)
    })
  }

  public static initWebpage(webpage?: WebpageModel) {
    let url = webpage?.url || "";
    let category = webpage?.category || "";
    let isPrimary = webpage?.isPrimary || false;

    return new FormGroup({
      url: new FormControl(url, LengthAndRequiredValidators),
      category: new FormControl(category, Validators.required),
      isPrimary: new FormControl(isPrimary)
    })
  }

  private setContact(contact: ContactModel) {
    // Filter to only defined properties
    // Assign those properties to their corresponding property in this object
    //   If those properties are arrays, their specific function needs to be called
    const keysToIgnore = ["updatedAt", "createdAt", "anniversary", "birthdate"]; // TODO
    const keyFilter: StringFilterer = (key: string) => !(key in keysToIgnore);
    const reduced: Partial<ContactModel> = filterToDefinedProperties(contact, keyFilter);
    Object.entries(reduced).forEach(([key, value]) => this.assigner(key, value));
  }

  private assigner(key: string, value: any) {
    if (typeof value === 'string') this.assignSimple(key, value);
    else if (Array.isArray(value)) this.assignArray(key, value);
    else if (Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value)) {
      // https://stackoverflow.com/questions/643782/how-to-check-whether-an-object-is-a-date
      this.assignDate(key, value as Date)
    }
    else {
      throw new Error(`Failed to assign property key '${key}' to value '${JSON.stringify(value)}'`)
    }
  }

  private assignSimple(key: string, value: string) { (this[key] as AbstractControl).setValue(value) }

  private assignDate(key: string, value: Date) {
    // Assumes Date is valid
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
        // TODO
      default:
        throw new Error("Invalid key passed to assign array: " + key)
    }
  }

  private arrayAssigner(key: string, values: any[], generator: (any) => FormGroup) {
    Object.values(values).forEach(value => {
      const form: FormGroup = generator(value);
      (this[key] as FormArray).push(form);
    })
  }
}
