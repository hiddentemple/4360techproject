import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ContactFormModel} from "./contact-form.model";
import {AbstractControl, FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {ContactModel} from "@hiddentemple/api-interfaces";

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

  // public api methods for use in all child components
  addPhone(){ this.addArrayElement('phones', ContactFormModel.initPhone); }
  removePhone(i: number) { this.removeArrayElement('phones', i); }

  addEmail() { this.addArrayElement('emails', ContactFormModel.initEmail); }
  removeEmail(i: number) { this.removeArrayElement('emails', i); }

  addWebpage() { this.addArrayElement('webpages', ContactFormModel.initWebpage)}
  removeWebpage(i: number) { this.removeArrayElement('webpages', i); }

  addAddress() { this.addArrayElement('addresses', ContactFormModel.initAddress)}
  removeAddress(i: number) { this.removeArrayElement('addresses', i); }

  // TODO tags

  /**
   * This method defers all validation to the FormGroup underlying this class. If the form is valid, then the value
   * of the form is returned.
   */
  getSubmittableContact(): ContactModel | undefined {
    const contactForm = this.contactForm.getValue();
    if (contactForm.invalid) {
      throw new Error("Tried to get submittable contact, but form contained errors.")
    }
    return contactForm.value;
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
