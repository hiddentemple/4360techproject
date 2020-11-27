import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ContactFormModel, PhoneInputModel} from "./contact-form.model";
import {AbstractControl, FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {ContactModel, PhoneModel} from "@hiddentemple/api-interfaces";
import {filterToDefinedProperties, isDefined} from "../../core/utils/object.utils";
import {all} from "../../core/utils/function.utils";

// expected to update the current value of the FormGroup in some way
export type FormGroupModifier = (FormGroup) => void;
export type ControlGenerator = () => AbstractControl;

@Injectable({
  providedIn: 'root'
})
export class ContactFormService implements OnInit {
  private contactForm: BehaviorSubject<FormGroup>;

  get contactForm$(): Observable<FormGroup> { return this.contactForm.asObservable(); }

  constructor(private fb: FormBuilder) {
    const initialForm = this.fb.group(new ContactFormModel())
    this.contactForm = new BehaviorSubject<FormGroup>(initialForm)
  }

  ngOnInit(): void {}

  // Called in update contact view to set the contact
  setContact(contact: ContactModel) {
    const newForm = this.fb.group(new ContactFormModel(contact));
    this.contactForm.next(newForm);
  }

  /**
   * This method defers all validation to the FormGroup underlying this class. If the form is valid, then the value
   * of the form is returned. Note that all non-defined or empty fields are stripped from the model before return,
   * which is based on the assumption that missing required attributes are considered errors making the form invalid.
   */
  getSubmittableContact(): ContactModel | undefined {
    const contactForm = this.contactForm.getValue();
    if (contactForm.invalid) {
      throw new Error("Tried to get submittable contact, but form contained errors.")
    }

    const rawValue = contactForm.value;
    const reducedValue = filterToDefinedProperties<ContactModel>(rawValue) as ContactModel;
    if (reducedValue.phones) {
      reducedValue.phones = Object.values(reducedValue.phones).map((phone: PhoneInputModel) => {
        let {phoneNumber, countryCode, ...other} = phone
        phoneNumber = countryCode + phoneNumber;
        return {...other, phoneNumber}
      });
    }

    return reducedValue;
  }

  public hasValue(key: string): boolean {
    const currentValue: FormGroup = this.contactForm.getValue();
    if (!(key in currentValue.controls)) return false;
    const value = currentValue.controls[key].value
    return isDefined(value)
  }

  public anyHaveValue(keys: string[]): boolean {
    const currentValue: FormGroup = this.contactForm.getValue();
    for (const key of keys) {
      if (!(key in currentValue.controls)) { /* Do nothing, ie: continue */}
      else if (isDefined(currentValue.controls[key].value)) {return true;}
      // else, continue
    }
    return false;
  }

  public allHaveValue(keys: string[]): boolean {
    const currentValue: FormGroup = this.contactForm.getValue();
    for (const key of keys) {
      if (!(key in currentValue.controls && isDefined(currentValue.controls[key].value))) return false;
    }
    return true;
  }

  // public api methods for use in all child components
  addPhone(){ this.addArrayElement('phones', ContactFormModel.initPhone); }

  removePhone(i: number) { this.removeArrayElement('phones', i); }
  addEmail() { this.addArrayElement('emails', ContactFormModel.initEmail); }

  removeEmail(i: number) { this.removeArrayElement('emails', i); }
  addWebpage() { this.addArrayElement('webpages', ContactFormModel.initWebpage)}

  removeWebpage(i: number) { this.removeArrayElement('webpages', i); }
  addAddress() { this.addArrayElement('addresses', ContactFormModel.initAddress)}

  removeAddress(i: number) { this.removeArrayElement('addresses', i); }

  addTag(tag: string) {
    this.addArrayElement("tags", () => ContactFormModel.initTag(tag));
  }
  removeTag(tag: string) {
    const callBack: FormGroupModifier = (form: FormGroup) => {
      const currentTags: FormArray = form.get("tags") as FormArray;
      const rawTags: string[] = currentTags.getRawValue();
      const index: number = rawTags.indexOf(tag);
      if (index >= 0) {
        currentTags.removeAt(index)
      }
    }

    this.accessAndUpdate(callBack);
  }

  /**
   * Gets the value of the form and calls a callback function to update the form before emitting the (asynchronously)
   * updated value. Note, this function defers all responsibility of processing and updating the form to the callback.
   */
  private accessAndUpdate(callback: FormGroupModifier) {
    const currentForm: FormGroup = this.contactForm.getValue();
    callback(currentForm);
    this.contactForm.next(currentForm);
  }

  /**
   * Uses an object property key to pick a specific array. Then, generates a new AbstractControl for that array by
   * calling the generator callback.
   */
  private addArrayElement(key: string, generatorCallback: ControlGenerator) {
    const callback: FormGroupModifier = formGroup => {
      const currentArray: FormArray = formGroup.get(key);
      if (!currentArray) {
        throw new Error(`Invalid contact form key in addArrayElement: ${key}`);
      }

      const newControl: AbstractControl = generatorCallback();
      if (!newControl) {
        throw new Error(`Generator function in addArrayElement failed to generate a defined control for key: ${key}`)
      }

      currentArray.push(generatorCallback())
    };

    this.accessAndUpdate(callback);
  }

  /**
   * Uses an object property key to pick a specific array. Then, removes the control at index i.
   */
  private removeArrayElement(key: string, i: number) {
    const callback: FormGroupModifier = formGroup => {
      const currentArray: FormArray = formGroup.get(key);
      if (!currentArray) {
        throw new Error(`Invalid contact form key in removeArrayElement: ${key}`);
      }

      currentArray.removeAt(i);
    }

    this.accessAndUpdate(callback);
  }
}
