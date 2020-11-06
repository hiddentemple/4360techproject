import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ContactFormInput, ContactFormModel} from "./contact-form.model";
import {Form, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PhoneValidator} from "../containers/contact-form/contact-form.component";

export type FormGroupModifier = (FormGroup) => void;

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

  ngOnInit(): void {
    console.log("Form Service OnInit");
  }

  setContact(contact: ContactFormInput) {
    const newForm = this.fb.group(new ContactFormModel(contact));
    this.contactForm.next(newForm);
  }

  addPhone() { this.add('phones'); }
  removePhone(i: number) { this.remove('phones', i); }

  private accessAndUpdate(callback: FormGroupModifier) {
    const currentForm: FormGroup = this.contactForm.getValue();
    callback(currentForm);
    this.contactForm.next(currentForm);
  }

  private add(key: string) {
    const callback: FormGroupModifier = formGroup => {
      const currentPhones: FormArray = formGroup.get(key);
      if (!currentPhones) {
        throw new Error(`Invalid contact form key in add: ${key}`);
      }

      currentPhones.push(this.fb.group({
        phoneNumber: ["", [Validators.required, PhoneValidator]],
        category: ["", [Validators.required]]
      }))
    };

    this.accessAndUpdate(callback);
  }

  private remove(key: string, i: number) {
    const callback: FormGroupModifier = formGroup => {
      const currentPhones: FormArray = formGroup.get(key);
      if (!currentPhones) {
        throw new Error(`Invalid contact form key in add: ${key}`);
      }

      currentPhones.removeAt(i);
    }

    this.accessAndUpdate(callback);
  }
}
