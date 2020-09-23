import {Injectable} from '@angular/core';
import { EMPTY, Observable, of, throwError } from 'rxjs';
import {ContactModel} from '../api/api-interfaces/contact/models/contact.model';
import {CreateContactResponse} from '../api/api-interfaces/contact/contracts/create.contact';
import {UpdateContactResponse} from '../api/api-interfaces/contact/contracts/update.contact';
import {DeleteContactResponse} from '../api/api-interfaces/contact/contracts/delete.contact';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http?: HttpClient) {
  }

  getContacts(): Observable<ContactModel[]> {
    return this.http.get<ContactModel[]>('/api/contacts');
    // TODO - Error handling
  }

  getContact(id: string): Observable<ContactModel>{
    return this.http.get<ContactModel>('/api/contacts/' + id);
    // TODO - Error handling
  }

  createContact(contact: ContactModel): Observable<CreateContactResponse> {
    return this.http.post<CreateContactResponse>('/api/contacts', contact, {});
    // TODO - Error handling
  }


  createContacts(contacts: ContactModel[]): Observable<CreateContactResponse>{
    return this.http.post<CreateContactResponse>('/api/contacts/bulk', contacts, {});
  }


  updateContact(contact: ContactModel, id: string): Observable<UpdateContactResponse> {
    const url = '/api/contacts/' + id;
    return this.http.put<UpdateContactResponse>(url, contact, {});
    // TODO - Error handling
  }

  deleteContact(id: string): Observable<DeleteContactResponse> {
    const url = '/api/contacts/' + id;
    return this.http.delete(url, {});
    // TODO - Error handling
  }
}
