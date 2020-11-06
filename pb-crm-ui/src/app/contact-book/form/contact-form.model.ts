import {ContactModel, PhoneModel} from "@hiddentemple/api-interfaces";
import {BehaviorSubject} from "rxjs";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

export type ContactFormInput = Pick<ContactModel, "firstName" | "lastName" | "phones">

export class ContactFormModel {
  // TODO better validators
  firstName = new FormControl('', [Validators.required, Validators.maxLength( 50)]);
  lastName = new FormControl('', [Validators.required, Validators.maxLength( 50)]);
  phones = new FormArray([]);

  constructor(contact?: ContactFormInput) {
    if (contact) {
      this.firstName.setValue(contact.firstName);
      this.lastName.setValue(contact.lastName);

      if (contact.phones) { this.phones.setValue(contact.phones); }
    }
  }
}
