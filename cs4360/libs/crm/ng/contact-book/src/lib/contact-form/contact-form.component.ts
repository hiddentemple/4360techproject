import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CreateContactRequest} from "../../../../../shared/src/lib/contracts/contact";
import {ContactDTO, EmailDTO} from "@crm/crm/shared";

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
  }

  @Output() submit = new EventEmitter<CreateContactRequest>();

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.contactForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      emails: this.fb.array([this.initEmail()])
    });
  }

  getEmailFormArray(): FormArray { return this.contactForm.controls.emails as FormArray; }

  initEmail(address: string = '', type: string = ''): FormGroup {
    return this.fb.group({
      address: [address, [Validators.email, Validators.required]],
      type: [type]
    });
  }


  addEmailInput(): void {
    const control: FormArray = this.getEmailFormArray();
    control.push(this.initEmail());
  }

  removeEmail(i: number): void {
    const control: FormArray = this.getEmailFormArray();
    control.removeAt(i);
  }

  onSubmit(): void {
    if (this.contactForm.valid) { this.submit.emit(this.contactForm.value); }
    else { console.error("Try to submit when form is invalid."); }
  }
}
