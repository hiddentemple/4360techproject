import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {ApiService} from '../../api/api.service';
import {
  AccountModel,
  CreateAccountRequest,
  CreateAccountResponse,
  GetAccountResponse,
  GetAllAccountResponse,
  UpdateAccountRequest,
  UpdateAccountResponse
} from '@hiddentemple/api-interfaces';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  constructor(private apiService: ApiService) {}

  getAccounts(): Observable<GetAllAccountResponse>  {
    return this.apiService.get<GetAllAccountResponse>('/api/account', {});
  }

  getAccount(id: string): Observable<GetAccountResponse>{
    return this.apiService.get<GetAccountResponse>('/api/account/' + id);
  }

  async createAccount(account: AccountModel): Promise<CreateAccountResponse> {
    const req: CreateAccountRequest = { account };
    return this.apiService.post<CreateAccountResponse>('/api/account', req, {}).toPromise();
  }

  async updateAccount(account: AccountModel): Promise<UpdateAccountResponse>{
    const req: UpdateAccountRequest = { account }; // cast will fail if invalid model passed
    return this.apiService.put<UpdateAccountResponse>('/api/account/' + account.id, req, {}).toPromise();
  }

  deleteAccount(id: string): Observable<any> {
    const url = '/api/account/' + id;
    return this.apiService.delete(url, {});
  }
}
