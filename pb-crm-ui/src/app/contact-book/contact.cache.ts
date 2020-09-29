import {BehaviorSubject, Observable, Subject} from "rxjs";
import {ContactModel, contactToNameModel, ContactNameModel} from "../api/api-interfaces/contact/models/contact.model";
import {ContactService} from "./contact.service";
import {Injectable} from "@angular/core";
import {map, tap} from "rxjs/operators";
import {FindAllContactResponse} from "../api/api-interfaces/contact/contracts/find-all.contact";
import {CreateContactRequest, CreateContactResponse} from "../api/api-interfaces/contact/contracts/create.contact";
import {UpdateContactRequest} from "../api/api-interfaces/contact/contracts/update.contact";
import {DeleteContactRequest} from "../api/api-interfaces/contact/contracts/delete.contact";

@Injectable()
export class ContactCache {
  private _contacts$: BehaviorSubject<ContactModel[]>;

  constructor(private contactService: ContactService) {
    this._contacts$ = new BehaviorSubject<ContactModel[]>([]);
    this.refresh();
  }

  get contacts$(): Observable<ContactModel[]> {
    return this._contacts$.asObservable();
  }

  get names$(): Observable<ContactNameModel[]> {
    return this.contacts$.pipe(map((contacts: ContactModel[]) => contacts.map(contactToNameModel)));
  }

  addContact(contact: ContactModel): Observable<boolean> {
    const req: CreateContactRequest = contact;
    return this.contactService.createContact(req).pipe(
      map((contact: CreateContactResponse) => {
          const current: ContactModel[] = this._contacts$.getValue();
          // Add the created contact to the array using the spread operator
          this._contacts$.next([...current, contact]);
          return true;
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

  updateContact(id: string, updated: Partial<ContactModel>): Observable<ContactModel> {
    // Object construction with the spread operator
    const req: UpdateContactRequest = {...updated, id};
    return this.contactService.updateContact(req).pipe(map((contact: ContactModel) => {
      const filtered = this.remove(id);
      filtered.push(contact);
      this._contacts$.next(filtered);

      return contact;
    }));
  }

  deleteContact(id: string): Observable<boolean> {
    const req: DeleteContactRequest = {id};
    return this.contactService.deleteContact(req).pipe(
      // https://www.learnrxjs.io/learn-rxjs/operators/utility/do
      // TODO what happens if delete fails? does this do what we expect it to?
      map(() => {
        const filtered = this.remove(id);
        this._contacts$.next(filtered);
        return true;
      })
    )
  }

  refresh(): void {
    this.contactService.getContacts().subscribe(
      // Uses object deconstruction to pull out the contacts parameter of the FindAllContactsResponse (the type)
      ({contacts}: FindAllContactResponse) => this._contacts$.next(contacts)
    )
  }

  private remove(id: string): ContactModel[] {
    const current: ContactModel[] = this._contacts$.getValue();
    return current.filter(element => element.id !== id)
  }

}

