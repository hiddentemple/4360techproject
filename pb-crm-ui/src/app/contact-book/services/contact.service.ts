import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {
  ContactModel,
  CreateContactRequest,
  CreateContactResponse,
  GetAllContactsResponse,
  GetContactResponse,
  UpdateContactRequest,
  UpdateContactResponse,
} from '@hiddentemple/api-interfaces';
import {ApiService} from '../../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private apiService: ApiService) {}

  getContacts(): Observable<GetAllContactsResponse>  {
    return this.apiService.get<GetAllContactsResponse>('/api/contact', {});
  }

  emptyReducer<T>(acc: T, [key, value]): T {
    if (!value) return acc
    else if (Array.isArray(value) && value.length === 0) { return acc;}
    else if (typeof value === 'object') { return {...acc, ...this.reduceToDefined(value)} }
    else if (value == {}) {return acc;}
    else if (typeof value === 'string' && value.length === 0) { return acc; }
    else return {...acc, [key]: value}
  }

  getContact(id: string): Observable<GetContactResponse>{
    return this.apiService.get<GetContactResponse>('/api/contact/' + id);
  }

  reduceToDefined<T>(model: T): Partial<T> {
    const acc: Partial<T> = {};
    return Object.entries(model).reduce(this.emptyReducer, acc);
  }

  async createContact(contact: ContactModel): Promise<CreateContactResponse> {
    const req: CreateContactRequest = { contact: this.reduceToDefined(contact) as ContactModel }; // cast will fail if invalid model passed
    return this.apiService.post<CreateContactResponse>('/api/contact', req, {}).toPromise();
  }

  async updateContact(contact: ContactModel): Promise<UpdateContactResponse>{
      const req: UpdateContactRequest = { contact: this.reduceToDefined(contact) as ContactModel }; // cast will fail if invalid model passed
      return this.apiService.put<UpdateContactResponse>('/api/contact/' + contact.id, req, {}).toPromise();
  }

  deleteContact(id: string): Observable<any> {
    const url = '/api/contact/' + id;
    return this.apiService.delete(url, {});
  }
}
