import {Injectable} from '@angular/core';
import {EMPTY, Observable, of} from "rxjs";
import {ContactModel} from "../api/api-interfaces/contact/models/contact.model";
import {CreateContactResponse} from "../api/api-interfaces/contact/contracts/create.contact";
import {UpdateContactResponse} from "../api/api-interfaces/contact/contracts/update.contact";
import {DeleteContactResponse} from "../api/api-interfaces/contact/contracts/delete.contact";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor() {
  }

  getContacts(): Observable<ContactModel[]> {
    return of([
      {
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
      },
      {
        firstName: 'Michael',
        lastName: 'Newman',
        company: 'Charles Schwab',
        emails: [
          {
            address: 'michael.newman@schwab.com',
            type: 'work'
          },
          {
            address: 'bluemaster92@gmail.com',
            type: 'personal'
          }
        ],
        phones: [
          {
            number: 4586985689,
            type: 'Made up'
          }
        ]
      }
    ])
  }

  createContact(contact: ContactModel): Observable<CreateContactResponse> {
    console.log("Create contact", contact)
    return EMPTY; // TODO
  }

  updateContact(contact: ContactModel): Observable<UpdateContactResponse> {
    console.log("Update contact", contact)
    return EMPTY; // TODO
  }

  deleteContact(contact: ContactModel): Observable<DeleteContactResponse> {
    console.log("Delete contact", contact)
    return EMPTY; // TODO
  }
}
