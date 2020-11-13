import {ContactModel, PhoneEmailCategory, PhoneModel} from "@hiddentemple/api-interfaces";
import {BehaviorSubject} from "rxjs";
import {AbstractControl, FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {PhoneValidator} from "../containers/contact-form/contact-form.component";

export class ContactFormModel {

  // TODO better validators
  firstName = new FormControl('', [Validators.required, Validators.maxLength( 50)]);
  lastName = new FormControl('', [Validators.required, Validators.maxLength( 50)]);
  company = new FormControl('', [])

  phones = new FormArray([]);

  constructor(contact?: ContactModel) {
    if (contact) {
      this.firstName.setValue(contact.firstName);
      this.lastName.setValue(contact.lastName);

      if (contact.phones) { this.phones.setValue(contact.phones); }
    }
  }

  /**
   * Design note: the previous version of this function (in the old contact form) used to have default values in the
   * parameter, as opposed to the "falsey" test we run in this method. This was changed because a default parameter
   * value does not evaluate to a default if a null value is passed in as a parameter (interestingly, it does
   * evaluate to the method signature defined default if the passed parameter value is undefined)
   *
   * This way, we never initialize the value to a falsey state.
   */
  public static initPhone(number?: string, category?: PhoneEmailCategory, isPrimary: boolean): FormGroup {
    number = number || "";
    isPrimary = isPrimary || false;
    let initialCategory = category || "";

    return new FormGroup({
      phoneNumber: new FormControl(number, [Validators.required, PhoneValidator]),
      category: new FormControl(initialCategory, [Validators.required]),
      isPrimary: new FormControl(isPrimary)
    });
  }

  public static initEmail(address: string, category: PhoneEmailCategory, isPrimary: boolean): FormGroup {
    address = address || "";
    let initialCategory = category || "";
    
    return new FormGroup({
      address: new FormControl(address, [Validators.email, Validators.required]),
      category: new FormControl(category, [Validators.required]),
      isPrimary: new FormControl(isPrimary);
    });
  }
}
