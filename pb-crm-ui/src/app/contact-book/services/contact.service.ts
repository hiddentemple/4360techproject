import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {
  AbstractContactRequest,
  Categorized,
  ContactModel,
  CreateContactRequest,
  CreateContactResponse, EmailDTO, GetAllContactsResponse,
  GetContactResponse, PhoneDTO
} from '@hiddentemple/api-interfaces';
import { UpdateContactRequest, UpdateContactResponse } from '@hiddentemple/api-interfaces';
import { ApiService } from '../../api/api.service';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private apiService: ApiService) {}

  getContacts(): Observable<GetAllContactsResponse>  {
    return this.apiService.get<GetAllContactsResponse>('/api/contact', {});
  }

  getContact(id: string): Observable<GetContactResponse>{
    return this.apiService.get<GetContactResponse>('/api/contact/' + id);
  }

  toDto(contact: ContactModel): AbstractContactRequest {
    const {phones, emails, ...other} = contact;

    const phoneDTOs: PhoneDTO[] = phones.map(phone => {
      const {category, ...otherPhoneProperties} = phone;
      return {...otherPhoneProperties, categoryId: category.id}
    })

    const emailDTOs: EmailDTO[] = emails.map(email => {
      const {category, ...otherPhoneProperties} = email;
      return {...otherPhoneProperties, categoryId: category.id}
    })

    return {contact: {...other, emails: emailDTOs, phones: phoneDTOs}};
  }

  createContact(contact: ContactModel): Observable<CreateContactResponse> {
    const req: CreateContactRequest = this.toDto(contact);
    return this.apiService.post<CreateContactResponse>('/api/contact', req, {});
  }

  updateContact(contact: ContactModel): Observable<UpdateContactResponse>{
      const req: UpdateContactRequest = this.toDto(contact);
      return this.apiService.patch<UpdateContactResponse>('/api/contact/' + contact.id, req, {});
  }

  deleteContact(id: string): Observable<any> {
    const url = '/api/contact/' + id;
    return this.apiService.delete(url, {});
  }
}
