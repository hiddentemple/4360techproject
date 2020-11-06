import {Component, OnInit} from '@angular/core';
import {ContactFormService} from "./contact-form.service";
import {FormGroup} from "@angular/forms";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-contact-form',
  template: `
    <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
      <app-name-form [contactForm]="contactForm"></app-name-form>

      <button mat-raised-button color="primary" [disabled]="!contactForm.valid" type="submit" class="float-right">
        Submit
      </button>
    </form>
  `,
  styles: []
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;

  constructor(private formService: ContactFormService) {
  }

  ngOnInit(): void {
    this.formService.contactForm$
      .pipe(tap(form => console.log("New Contact Form", form)))
      .subscribe(contactForm => this.contactForm = contactForm)
  }

  onSubmit() {
    console.log("Submit form", this.contactForm)
  }
}
