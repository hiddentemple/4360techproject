import {BehaviorSubject, Observable} from 'rxjs';
import {
  ContactModel,
  CreateContactRequest,
  CreateContactResponse,
  UpdateContactResponse,
  DeleteContactRequest
} from '@hiddentemple/api-interfaces';
import {ContactService} from './contact.service';
import {Injectable} from '@angular/core';
import {map, tap} from 'rxjs/operators';


// File scoped interface (no export)
interface CacheModel {
  lastChange: CacheOperation;
  contacts: ContactModel[];
}

interface CacheAdd extends CacheModel {
  newContact: ContactModel;
}

interface CacheUpdate extends CacheModel {
  oldContact: ContactModel;
  updatedContact: ContactModel;
}

interface CacheDelete extends CacheModel {
  deletedContact: ContactModel;
}

// file Scoped
enum CacheOperation { INIT, LOAD, ADD, UPDATE, DELETE}

@Injectable({
  providedIn: 'root'
})
export class ContactCacheService {
  // tslint:disable-next-line:variable-name
  private _contacts$: BehaviorSubject<CacheModel>;

  constructor(private contactService: ContactService) {
    this._contacts$ = new BehaviorSubject<CacheModel>({ lastChange: CacheOperation.INIT, contacts: [] });
    this.refresh().subscribe(() => console.log('Cache Init'));
  }

  get contacts$(): Observable<ContactModel[]> {
    return this._contacts$.asObservable()
      .pipe(
        tap((cacheModel: CacheModel) => {
          console.group("New Contacts")
          console.log("Operation: ", cacheModel.lastChange)
          console.log("Model", cacheModel)
          console.groupEnd()
        }),
        map((cacheModel: CacheModel) => cacheModel.contacts)
      );
  }

  addContact(contactToAdd: ContactModel): Observable<ContactModel> {
    const req: CreateContactRequest = contactToAdd;
    return this.contactService.createContact(req).pipe(
      map(({contact}: CreateContactResponse) => {
          const {contacts} = this._contacts$.getValue();
          contacts.push(contact);
          const newModel: CacheAdd = { contacts, lastChange: CacheOperation.ADD, newContact: contact }
          this._contacts$.next(newModel);
          return contact;
        }
      ));
  }

  getContact(idKey: string): Observable<ContactModel | undefined> {
    return this.contacts$.pipe(map((contacts: ContactModel[]) =>
      // TODO if undefined is returned here, attempt to query the api for a contact matching this id
      //  presently, we just assume that if the cache does not have this key, it does not exist
      contacts.find((element: ContactModel) => idKey === element.id)
    ));
  }

  updateContact(toUpdate: ContactModel): Observable<ContactModel> {
    // Object construction with the spread operator
    return this.contactService.updateContact(toUpdate).pipe(map((response: UpdateContactResponse) => {
      const updatedContact = response.contact;
      const filtered = this.remove(toUpdate.id);
      filtered.push(updatedContact);
      const newModel: CacheUpdate = {
        contacts: filtered,
        lastChange:
        CacheOperation.UPDATE,
        oldContact: toUpdate,
        updatedContact: updatedContact
      }
      this._contacts$.next(newModel);
      return updatedContact;
    }));
  }

  deleteContact(contact: ContactModel): Observable<boolean> {
    const req: DeleteContactRequest = {id: contact.id};
    return this.contactService.deleteContact(req).pipe(
      // https://www.learnrxjs.io/learn-rxjs/operators/utility/do
      // TODO what happens if delete fails? does this do what we expect it to?
      map(() => {
        const filtered = this.remove(contact.id);
        const newModel: CacheDelete = { deletedContact: contact, lastChange: CacheOperation.DELETE, contacts: filtered}
        this._contacts$.next(newModel);
        return true;
      })
    );
  }

  refresh(): Observable<any> {
    return this.contactService.getContacts()
      .pipe(
        tap((contacts: ContactModel[]) => {
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

