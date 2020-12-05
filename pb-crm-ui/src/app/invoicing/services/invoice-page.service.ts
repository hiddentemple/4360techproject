import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {
  AbstractInvoiceRequest,
  InvoiceModel,
  CreateInvoiceRequest,
  CreateInvoiceResponse,
  GetAllInvoicesResponse,
  GetInvoiceResponse,
  UpdateInvoiceRequest,
  UpdateInvoiceResponse,
} from '@hiddentemple/api-interfaces';
import {ApiService} from '../../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class InvoicePageService {

  constructor(private apiService: ApiService) {}

  getInvoices(): Observable<GetAllInvoicesResponse>  {
    return this.apiService.get<GetAllInvoicesResponse>('/api/invoice', {});
  }

  getInvoice(id: string): Observable<GetInvoiceResponse>{
    return this.apiService.get<GetInvoiceResponse>('/api/invoice/' + id);
  }

  emptyReducer<T>(acc: T, [key, value]): T {
    if (Array.isArray(value) && value.length === 0) { return acc;}
    else if (typeof value === 'string' && value.length === 0) { return acc; }
    else if (value == {}) {return acc;}
    else return {...acc, [key]: value}
  }

  reduceToDefined<T>(model: T): Partial<T> {
    const acc: Partial<T> = {};
    return Object.entries(model).reduce(this.emptyReducer, acc);
  }

  async createInvoice(invoice: InvoiceModel): Promise<CreateInvoiceResponse> {
    const req: CreateInvoiceRequest = { invoice: this.reduceToDefined(invoice) as InvoiceModel }; // cast will fail if invalid model passed
    return this.apiService.post<CreateInvoiceResponse>('/api/invoice', req, {}).toPromise();
  }

  async updateInvoice(invoice: InvoiceModel): Promise<UpdateInvoiceResponse>{
    const req: UpdateInvoiceRequest = { invoice: this.reduceToDefined(invoice) as InvoiceModel }; // cast will fail if invalid model passed
    return this.apiService.put<UpdateInvoiceResponse>('/api/invoice/' + invoice.id, req, {}).toPromise();
  }

  deleteInvoice(id: string): Observable<any> {
    const url = '/api/invoice/' + id;
    return this.apiService.delete(url, {});
  }
}
