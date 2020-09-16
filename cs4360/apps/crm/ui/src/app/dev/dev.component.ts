import { Component, OnInit } from '@angular/core';
import {ContactFormEvent} from "@crm/ng/contact-book";

@Component({
  selector: 'cs4360-dev',
  template: `
    <crm-ui-contact-form (submit)="onSubmit($event)"></crm-ui-contact-form>
  `
})
export class DevComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(event:ContactFormEvent): void { console.log(event)}
}
