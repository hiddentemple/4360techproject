import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {ContactModel} from '../api/api-interfaces/contact/models/contact.model';
import { CreateContactRequest, CreateContactResponse } from '../api/api-interfaces/contact/contracts/create.contact';
import { UpdateContactRequest, UpdateContactResponse } from '../api/api-interfaces/contact/contracts/update.contact';

import { tap } from 'rxjs/operators';
import { ApiService } from '../api/api.service';
import { FindAllContactResponse } from '../api/api-interfaces/contact/contracts/find-all.contact';
import {
  FindOneContactRequest,
  FindOneContactResponse,
} from '../api/api-interfaces/contact/contracts/find-one.contact';
import {
  CreateBulkContactRequest,
  CreateBulkContactResponse,
} from '../api/api-interfaces/contact/contracts/create.bulkContacts';
import {DeleteContactRequest, DeleteContactResponse} from "../api/api-interfaces/contact/contracts/delete.contact";





@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private _contacts$: Subject<Partial<ContactModel>>;

  constructor(private apiService: ApiService) {
    this._contacts$ = new Subject<Partial<ContactModel>>();
  }

  get contacts$(): Observable<Partial<ContactModel>> { return this._contacts$.asObservable(); }


  // TODO - Error handling
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

  updateContact(contact: UpdateContactRequest): Observable<UpdateContactResponse> {
    const url = '/api/contacts/' + contact.id;
    return this.apiService.patch<UpdateContactResponse>(url, contact, {});
  }

  deleteContact({id}: DeleteContactRequest): Observable<DeleteContactResponse> {
    const url = '/api/contacts/' + id;
    return this.apiService.delete(url, {});
  }
}
