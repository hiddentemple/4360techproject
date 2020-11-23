import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {
  AbstractContactRequest,
  AddressDTO,
  ContactModel,
  CreateContactRequest,
  CreateContactResponse,
  EmailDTO,
  EmailModel,
  GetAllContactsResponse,
  GetContactResponse,
  PhoneDTO,
  PhoneModel,
  UpdateContactRequest,
  UpdateContactResponse,
  WebpageDTO,
} from '@hiddentemple/api-interfaces';
import {ApiService} from '../../api/api.service';
import {GetAllAccountResponse} from '@hiddentemple/api-interfaces';
import {GetAccountResponse} from '@hiddentemple/api-interfaces';
import {
  AccountModel,
  CreateAccountRequest,
  CreateAccountResponse, UpdateAccountRequest, UpdateAccountResponse
} from "../../../../../../api-interfaces/src/invoicing";

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private apiService: ApiService) {}

  GetAccounts(): Observable<GetAllAccountResponse>  {
    return this.apiService.get<GetAllAccountResponse>('/api/contact', {});
  }

  getAccount(id: string): Observable<GetAccountResponse>{
    return this.apiService.get<GetAccountResponse>('/api/contact/' + id);
  }

  emptyReducer<T>(acc: T, [key, value]): T {
    if (Array.isArray(value) && value.length === 0) { return acc; }
    else if (typeof value === 'string' && value.length === 0) { return acc; }
    else if (value === {}) {return acc; }
    else { return {...acc, [key]: value}; }
  }

  reduceToDefined<T>(model: T): Partial<T> {
    const acc: Partial<T> = {};
    return Object.entries(model).reduce(this.emptyReducer, acc);
  }

  async createAccount(account: AccountModel): Promise<CreateAccountResponse> {
    const req: CreateAccountRequest = { account: this.reduceToDefined(account) as AccountModel }; // cast will fail if invalid model passed
    return this.apiService.post<CreateAccountResponse>('/api/contact', req, {}).toPromise();
  }

  async updateAccount(account: AccountModel): Promise<UpdateAccountResponse>{
    const req: UpdateAccountRequest = { account: this.reduceToDefined(account) as AccountModel }; // cast will fail if invalid model passed
    return this.apiService.put<UpdateAccountResponse>('/api/contact/' + account.id, req, {}).toPromise();
  }

  deleteContact(id: string): Observable<any> {
    const url = '/api/contact/' + id;
    return this.apiService.delete(url, {});
  }
}