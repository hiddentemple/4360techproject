import {BehaviorSubject, Observable} from 'rxjs';
import {AccountService} from './account.service';
import {Injectable} from '@angular/core';
import {map, take, tap} from 'rxjs/operators';
import {CacheOperation} from "../../core/cache";
import {AccountModel, CreateAccountResponse} from "../../../../../../api-interfaces/src/invoicing";


// File scoped interface (no export)
interface CacheModel {
  lastChange: CacheOperation;
  accounts: AccountModel[];
}

interface CacheAdd extends CacheModel {
  newAccount: AccountModel;
}

interface CacheUpdate extends CacheModel {
  oldAccount: AccountModel;
  updateAccount: AccountModel;
}

interface CacheDelete extends CacheModel {
  deleteAccount: AccountModel;
}

@Injectable({
  providedIn: 'root'
})
export class AccountCacheService {
  // tslint:disable-next-line:variable-name
  private _accounts$: BehaviorSubject<CacheModel>;

  constructor(private accountService: AccountService) {
    this._accounts$ = new BehaviorSubject<CacheModel>({ lastChange: CacheOperation.INIT, accounts: [] });
    this.refresh().subscribe(() => console.log('Cache Init'));
  }

  get accounts$(): Observable<AccountModel[]> {
    return this._accounts$.asObservable()
      .pipe(
        tap((cacheModel: CacheModel) => {
          console.group("Account Cache Value Change");
          console.log("Operation: ", cacheModel.lastChange);
          console.log("Model", cacheModel);
          console.groupEnd();
        }),
        map((cacheModel: CacheModel) => cacheModel.accounts)
      );
  }

  async addAccounts(accountToAdd: AccountModel): Promise<AccountModel> {
    return this.accountService.createAccount(accountToAdd).then(
      ({account}: CreateAccountResponse) => {
        const {accounts} = this._accounts$.getValue();
        const newAccounts: AccountModel[] = [...accounts, account];
        const newModel: CacheAdd = { accounts: newAccounts, lastChange: CacheOperation.ADD, newAccount: account }
        this._accounts$.next(newModel);
        return account;
      }
    );
  }

  getContact(idKey: string): Observable<ContactModel | undefined> {
    return this.contacts$.pipe(map((contacts: ContactModel[]) =>
      // TODO if undefined is returned here, attempt to query the api for a contact matching this id
      //  presently, we just assume that if the cache does not have this key, it does not exist
      contacts.find((element: ContactModel) => idKey === element.id)
    ));
  }

  async updateContact(toUpdate: ContactModel): Promise<ContactModel> {
    // Object construction with the spread operator
    return await this.contactService.updateContact(toUpdate).then((response: UpdateContactResponse) => {
      const updatedContact = response.contact;
      const filtered = this.remove(toUpdate.id);
      filtered.push(updatedContact);
      const newModel: CacheUpdate = {
        contacts: filtered,
        lastChange: CacheOperation.UPDATE,
        oldContact: toUpdate,
        updatedContact: updatedContact
      }
      this._contacts$.next(newModel);
      return updatedContact;
    });
  }

  deleteContact(contact: ContactModel): Observable<boolean> {
    return this.contactService.deleteContact(contact.id).pipe(
      // https://www.learnrxjs.io/learn-rxjs/operators/utility/do
      // TODO what happens if delete fails? does this do what we expect it to?
      take(1),
      map(() => {
        const filtered = this.remove(contact.id);
        const newModel: CacheDelete = { deletedContact: contact, lastChange: CacheOperation.DELETE, contacts: filtered};
        this._contacts$.next(newModel);
        return true;
      })
    );
  }

  refresh(): Observable<any> {
    return this.contactService.getContacts()
      .pipe(
        tap(({contacts}: GetAllContactsResponse) => {
          const newModel: CacheModel = { lastChange: CacheOperation.LOAD, contacts: contacts };
          this._contacts$.next(newModel);
        })
      );
  }

  private remove(id: string): ContactModel[] {
    const {contacts} = this._contacts$.getValue();
    return contacts.filter(element => element.id !== id);
  }

}

