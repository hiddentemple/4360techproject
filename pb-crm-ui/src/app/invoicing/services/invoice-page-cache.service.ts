import { Injectable } from '@angular/core';
import {
  InvoiceModel,
  CreateInvoiceResponse,
  GetAllInvoicesResponse,
  UpdateInvoiceResponse,
} from '@hiddentemple/api-interfaces';
import {InvoiceService} from './invoice.service';
import {Injectable} from '@angular/core';
import {map, take, tap} from 'rxjs/operators';
import {CacheOperation} from "../../core/cache";
import {BehaviorSubject, Observable} from "rxjs";

interface InvoicePageCacheModel {
  lastChange: CacheOperation;
  invoices: InvoiceModel[];
}

interface CacheAdd extends InvoicePageCacheModel {
  newInvoice: InvoiceModel;
}

interface CacheUpdate extends InvoicePageCacheModel {
  oldInvoice: InvoiceModel;
  updatedInvoice: InvoiceModel;
}

interface CacheDelete extends InvoicePageCacheModel {
  deletedInvoice: InvoiceModel;
}

@Injectable({
  providedIn: 'root'
})
export class InvoicePageCacheService {

  private _invoices$: BehaviorSubject<InvoicePageCacheModel>;

  constructor(private invoiceService: InvoiceService) {
    this._invoices$ = new BehaviorSubject<InvoicePageCacheModel>({ lastChange: CacheOperation.INIT, invoices: [] });
    this.refresh().subscribe(() => console.log('Cache Init'));
  }

  get invoices$(): Observable<InvoiceModel[]> {
    return this._invoices$.asObservable()
      .pipe(
        tap((cacheModel: InvoicePageCacheModel) => {
          console.group("Invoice Cache Value Change");
          console.log("Operation: ", cacheModel.lastChange);
          console.log("Model", cacheModel);
          console.groupEnd();
        }),
        map((cacheModel: InvoicePageCacheModel) => cacheModel.invoices)
      );
  }

  async addInvoice(invoiceToAdd: InvoiceModel): Promise<InvoiceModel> {
    return this.invoiceService.createInvoice(invoiceToAdd).then(
      ({invoice}: CreateInvoiceResponse) => {
        const {invoices} = this._invoices$.getValue();
        const newInvoices: InvoiceModel[] = [...invoices, invoice];
        const newModel: CacheAdd = { invoices: newInvoices, lastChange: CacheOperation.ADD, newInvoice: invoice }
        this._invoices$.next(newModel);
        return invoice;
      }
    );
  }

  getInvoice(idKey: string): Observable<InvoiceModel | undefined> {
    return this.invoices$.pipe(map((invoices: InvoiceModel[]) =>
      // TODO if undefined is returned here, attempt to query the api for a invoice matching this id
      //  presently, we just assume that if the cache does not have this key, it does not exist
      invoices.find((element: InvoiceModel) => idKey === element.id)
    ));
  }

  async updateInvoice(toUpdate: InvoiceModel): Promise<InvoiceModel> {
    // Object construction with the spread operator
    return await this.invoiceService.updateInvoice(toUpdate).then((response: UpdateInvoiceResponse) => {
      const updatedInvoice = response.invoice;
      const filtered = this.remove(toUpdate.id);
      filtered.push(updatedInvoice);
      const newModel: CacheUpdate = {
        invoices: filtered,
        lastChange: CacheOperation.UPDATE,
        oldInvoice: toUpdate,
        updatedInvoice: updatedInvoice
      }
      this._invoices$.next(newModel);
      return updatedInvoice;
    });
  }

  deleteInvoice(invoice: InvoiceModel): Observable<boolean> {
    return this.invoiceService.deleteInvoice(invoice.id).pipe(
      // https://www.learnrxjs.io/learn-rxjs/operators/utility/do
      // TODO what happens if delete fails? does this do what we expect it to?
      take(1),
      map(() => {
        const filtered = this.remove(invoice.id);
        const newModel: CacheDelete = { deletedInvoice: invoice, lastChange: CacheOperation.DELETE, invoices: filtered};
        this._invoices$.next(newModel);
        return true;
      })
    );
  }

  refresh(): Observable<any> {
    return this.invoiceService.getInvoices()
      .pipe(
        tap(({invoices}: GetAllInvoicesResponse) => {
          const newModel: InvoicePageCacheModel = { lastChange: CacheOperation.LOAD, invoices: invoices };
          this._invoices$.next(newModel);
        })
      );
  }

  private remove(id: string): InvoiceModel[] {
    const {invoices} = this._invoices$.getValue();
    return invoices.filter(element => element.id !== id);
  }
}
