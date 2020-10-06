import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ContactModel} from 'api-interfaces';
import { CreateContactRequest, CreateContactResponse } from 'api-interfaces';
import { UpdateContactRequest, UpdateContactResponse } from 'api-interfaces';
import { ApiService } from '../api/api.service';
import { FindOneContactRequest, FindOneContactResponse, } from 'api-interfaces';
import { CreateBulkContactRequest, CreateBulkContactResponse, } from 'api-interfaces';
import {DeleteContactRequest, DeleteContactResponse} from 'api-interfaces';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private apiService: ApiService) {}

  getContacts(): Observable<ContactModel[]>  {
    return this.apiService.get<ContactModel[]>('/api/contacts', {});
  }

  getContact(contact: FindOneContactRequest): Observable<FindOneContactResponse>{
    return this.apiService.get<FindOneContactResponse>('/api/contacts/' + contact.id);
  }

  createContact(contact: CreateContactRequest): Observable<CreateContactResponse> {
    return this.apiService.post<CreateContactResponse>('/api/contacts', contact, {});
  }

  createContacts(contacts: CreateBulkContactRequest): Observable<CreateBulkContactResponse>{
    return this.apiService.post<CreateBulkContactResponse>('/api/contacts/bulk', contacts, {});
  }


  updateContact(contact: UpdateContactRequest): Observable<UpdateContactResponse>{
      const url = '/api/contacts/' + contact.id;
      return this.apiService.patch<UpdateContactResponse>(url, contact, {});
  }

  deleteContact({id}: DeleteContactRequest): Observable<DeleteContactResponse> {
    const url = '/api/contacts/' + id;
    return this.apiService.delete(url, {});
  }
}
