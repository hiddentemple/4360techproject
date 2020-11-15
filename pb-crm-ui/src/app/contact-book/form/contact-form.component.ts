import {Component, OnInit, ViewChild} from '@angular/core';
import {ContactFormService} from "./contact-form.service";
import {FormGroup} from "@angular/forms";
import {tap} from "rxjs/operators";
import {MatAccordion} from "@angular/material/expansion";
import {ContactModel} from "@hiddentemple/api-interfaces";

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styles: [
      `
      .example-action-buttons {
        padding-bottom: 20px;
      }

      .example-headers-align .mat-expansion-panel-header-title,
      .example-headers-align .mat-expansion-panel-header-description {
        flex-basis: 0;
      }

      .example-headers-align .mat-expansion-panel-header-description {
        justify-content: space-between;
        align-items: center;
      }

      .example-headers-align .mat-form-field + .mat-form-field {
        margin-left: 8px;
      }
    `
  ]
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;

  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(private formService: ContactFormService) {
  }

  ngOnInit(): void {
    this.formService.contactForm$
      .pipe(tap(form => console.log("New Contact Form", form)))
      .subscribe(contactForm => this.contactForm = contactForm)
  }

  onSubmit() {
    const submittableContact: ContactModel = this.formService.getSubmittableContact();
    console.group("Submit form")
    console.log("Form", this.contactForm)
    console.log("Generated contact", submittableContact)
    console.groupEnd()
  }
}
