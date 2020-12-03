import {Component} from '@angular/core';
import {ContactModel, EmailCategory, LineItemModel, PhoneCategory} from "@hiddentemple/api-interfaces";


@Component({
  selector: 'app-dev',
  template: `
    <div class="container">
      <app-contact-form [contact]="contact"></app-contact-form>
    </div>
  `
})
export class DevComponent{
  contact: ContactModel = {
    createdAt: undefined, updatedAt: undefined,
    "firstName": "Michael",
    "lastName": "Newman",
    "company": "Charles Schwab",
    "notes": "Really swell buckaro",
    "gender": "non-binary",
    "emails": [
      {
        "address": "test@gmail.com",
        "category": EmailCategory.PERSONAL,
        "isPrimary": true
      },
      {
        "address": "test@work.com",
        "category": EmailCategory.OTHER,
        "isPrimary": false
      }
    ],
    "phones": [
      {
        "phoneNumber": "+12545898875",
        "category": PhoneCategory.PERSONAL,
        "isPrimary": true
      },
      {
        "phoneNumber": "+12545898875",
        "category": PhoneCategory.WORK,
        "isPrimary": false
      }
    ]
  }
}
