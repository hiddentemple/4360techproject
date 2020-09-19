import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CreateContactRequest} from "../../../../../shared/src/lib/contracts/contact";
import {ContactDTO, EmailDTO, PhoneDTO} from "@crm/shared";

@Component({
  selector: 'crm-ui-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;

  @Input() set contact(contact: ContactDTO) {
    this.contactForm.controls.firstName.setValue(contact.firstName);
    this.contactForm.controls.lastName.setValue(contact.lastName);
    contact.emails.forEach((email: EmailDTO) => {
      const emails: FormArray = this.getEmailFormArray();
    })
    contact.phones.forEach((phone:PhoneDTO) => {
      const phones: FormArray = this.getPhoneFormArray();
    })
  }

  @Output() submit = new EventEmitter<CreateContactRequest>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      emails: this.fb.array([this.initEmail()]),
      phones: this.fb.array([this.initPhone()])
    });
  }

  getEmailFormArray(): FormArray { return this.contactForm.controls.emails as FormArray; }

  getPhoneFormArray(): FormArray { return this.contactForm.controls.phones as FormArray; }

  initEmail(address: string = ''): FormGroup {
    return this.fb.group({
      address: [address, [Validators.email, Validators.required]],
    });
  }

  initPhone(phoneNumber: string = ''): FormGroup {
    return this.fb.group({
      phoneNumber: [phoneNumber],
    });
  }


  addEmailInput(): void {
    const control: FormArray = this.getEmailFormArray();
    control.push(this.initEmail());
  }

  addPhoneInput(): void {
    const control: FormArray = this.getPhoneFormArray();
    control.push(this.initPhone());
  }

  removeEmail(i: number): void {
    const control: FormArray = this.getEmailFormArray();
    control.removeAt(i);
  }

  removePhone(i: number): void {
    const control: FormArray = this.getPhoneFormArray();
    control.removeAt(i);
  }

  onSubmit(): void {
    if (this.contactForm.valid) {this.submit.emit(this.contactForm.value);}
    else {console.error("Try to submit when form is invalid.");}
  }


}
