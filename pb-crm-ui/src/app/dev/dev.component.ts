import { Component, OnInit } from '@angular/core';
import {ContactModel} from "../api/api-interfaces/contact/models/contact.model";

@Component({
  selector: 'app-dev',
  template: `
    <div class="container">
      <h1>Add Form</h1>
      <app-contact-form (submit)="onSubmit($event)"></app-contact-form>

      <h1>Update Form</h1>
      <app-contact-form [contact]="mockContact" (submit)="onSubmit($event)"></app-contact-form>
    </div>

  `
})
export class DevComponent implements OnInit {

  mockContact: ContactModel = {
    id: 'contactid',
    firstName: 'Ben',
    lastName: 'Poe',
    emails: [
      {
        id: '1',
        address: 'benpoe@personal.com',
        type: 'personal'
      },
      {
        id: '2',
        address: 'benpoe@work.com',
        type: 'work'
      },
      {
        id: '3',
        address: 'benpoe@school.com',
        type: 'school'
      }
    ],
    phones: [
      {
        id: '1',
        number: 3038675309,
        type: 'personal home'
      },
      {
        id: '2',
        number: 3033334444,
        type: 'personal cell'
      },
      {
        id: '3',
        number: 1012024040,
        type: 'work'
      }
    ]

  };

  constructor() {
  }

  ngOnInit(): void {
  }

  onSubmit(event: ContactModel) {
    console.log('Submit', event);
  }

}
