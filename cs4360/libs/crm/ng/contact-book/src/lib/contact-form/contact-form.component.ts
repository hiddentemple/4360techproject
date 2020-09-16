import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Form, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CreateContactRequest} from "../../../../../shared/src/lib/contracts/contact";

@Component({
  selector: 'crm-ui-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;

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

  initEmail() {
    return this.fb.group({
      address: ['', [Validators.email, Validators.required]],
      type: ['']
    });
  }

  addEmail() {
    const control: FormArray = this.getEmailFormArray();
    control.push(this.initEmail());
  }

  removeEmail(i: number) {
    const control: FormArray = this.getEmailFormArray();
    control.removeAt(i);
  }

  onSubmit(): void {
    if (this.contactForm.valid) { this.submit.emit(this.contactForm.value); }
    else { console.error("Try to submit when form is invalid."); }
  }
}
