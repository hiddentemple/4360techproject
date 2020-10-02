import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateContactRequest, CreateContactResponse, } from '@shared/contact/contracts/create.contact';
import { UpdateContactRequest, UpdateContactResponse, } from '@shared/contact/contracts/update.contact';
import { ApiService } from '../api/api.service';
import { FindAllContactResponse } from '@shared/contact/contracts/find-all.contact';
import { FindOneContactRequest, FindOneContactResponse, } from '@shared/contact/contracts/find-one.contact';
import { CreateBulkContactRequest, CreateBulkContactResponse, } from '@shared/contact/contracts/create.bulkContacts';


@Injectable({
  providedIn: 'root',
})
export class ContactService {
  constructor(private apiService: ApiService) {
  }


  // TODO - Error handling
  getContacts(): Observable<FindAllContactResponse> {
    return this.apiService.get<FindAllContactResponse>('/api/contacts', {});
  }

  getContact(contact: FindOneContactRequest): Observable<FindOneContactResponse> {
    return this.apiService.get<FindOneContactResponse>('/api/contacts/' + contact.id);
  }

  createContact(contact: CreateContactRequest): Observable<CreateContactResponse> {
    return this.apiService.post<CreateContactResponse>('/api/contacts', contact, {});
  }

  createContacts(contacts: CreateBulkContactRequest): Observable<CreateBulkContactResponse> {
    return this.apiService.post<CreateBulkContactResponse>('/api/contacts/bulk', contacts, {});
  }

  updateContact(contact: UpdateContactRequest): Observable<UpdateContactResponse> {
    const url = '/api/contacts/' + contact.id;
    return this.apiService.put<UpdateContactResponse>(url, contact.data, {});
  }

  deleteContact(id: string): Observable<any> {
    const url = '/api/contacts/' + id;
    return this.apiService.delete(url, {});
    // TODO - implement interface
  }
}
