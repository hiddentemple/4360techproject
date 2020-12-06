import {BehaviorSubject, Observable} from 'rxjs';
import {AccountService} from './account.service';
import {Injectable} from '@angular/core';
import {map, take, tap} from 'rxjs/operators';
import {CacheOperation} from '../../core/cache';
import {
  AccountModel,
  CreateAccountResponse,
  GetAllAccountResponse,
  UpdateAccountResponse
} from '@hiddentemple/api-interfaces';


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
          console.group('Account Cache Value Change');
          console.log('Operation: ', cacheModel.lastChange);
          console.log('Model', cacheModel);
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
        const newModel: CacheAdd = { accounts: newAccounts, lastChange: CacheOperation.ADD, newAccount: account };
        this._accounts$.next(newModel);
        return account;
      }
    );
  }

  getAccount(idKey: string): Observable<AccountModel | undefined> {
    return this.accounts$.pipe(map((contacts: AccountModel[]) =>
      // TODO if undefined is returned here, attempt to query the api for a contact matching this id
      //  presently, we just assume that if the cache does not have this key, it does not exist
      contacts.find((element: AccountModel) => idKey === element.id)
    ));
  }

  async updateAccount(toUpdate: AccountModel): Promise<AccountModel> {
    // Object construction with the spread operator
    return await this.accountService.updateAccount(toUpdate).then((response: UpdateAccountResponse) => {
      const updatedAccount = response.account;
      const filtered = this.remove(toUpdate.id);
      filtered.push(updatedAccount);
      const newModel: CacheUpdate = {
        accounts: filtered,
        lastChange: CacheOperation.UPDATE,
        oldAccount: toUpdate,
        updateAccount: updatedAccount
      };
      this._accounts$.next(newModel);
      return updatedAccount;
    });
  }

  deleteAccount(account: AccountModel): Observable<boolean> {
    return this.accountService.deleteAccount(account.id).pipe(
      // https://www.learnrxjs.io/learn-rxjs/operators/utility/do
      // TODO what happens if delete fails? does this do what we expect it to?
      take(1),
      map(() => {
        const filtered = this.remove(account.id);
        const newModel: CacheDelete = { deleteAccount: account, lastChange: CacheOperation.DELETE, accounts: filtered};
        this._accounts$.next(newModel);
        return true;
      })
    );
  }

  refresh(): Observable<any> {
    return this.accountService.getAccounts()
      .pipe(
        tap((res: GetAllAccountResponse) => {
          const newModel: CacheModel = { lastChange: CacheOperation.LOAD, accounts: res.accounts };
          this._accounts$.next(newModel);
        })
      );
  }

  private remove(id: string): AccountModel[] {
    const {accounts} = this._accounts$.getValue();
    return accounts.filter(element => element.id !== id);
  }

}

