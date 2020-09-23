import {Injectable} from '@angular/core';
import {EMPTY, Observable, of} from 'rxjs';
import {ContactModel} from '../api/api-interfaces/contact/models/contact.model';
import {CreateContactResponse} from '../api/api-interfaces/contact/contracts/create.contact';
import {UpdateContactResponse} from '../api/api-interfaces/contact/contracts/update.contact';
import {DeleteContactResponse} from '../api/api-interfaces/contact/contracts/delete.contact';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http?: HttpClient) {}

  getContacts(): Observable<ContactModel[]> {
    return this.http.get<ContactModel[]>('/api/contacts');
  }

  createContact(contact: ContactModel): Observable<CreateContactResponse> {
    console.log('Create contact', contact);
    return EMPTY; // TODO
  }

  updateContact(contact: ContactModel): Observable<UpdateContactResponse> {
    console.log('Update contact', contact);
    return EMPTY; // TODO
  }

  deleteContact(contact: ContactModel): Observable<DeleteContactResponse> {
    console.log('Delete contact', contact);
    return EMPTY; // TODO
  }
}
