import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ContactCacheService} from "../../services/contact-cache.service";
import {BehaviorSubject, Observable} from "rxjs";
import {ContactModel} from "@hiddentemple/api-interfaces";
import {debounceTime, filter} from "rxjs/operators";
import {NgxMasonryOptions} from "ngx-masonry";
import {BreakpointService} from "../../../core/layout/breakpoint.service";
import {ContactSearchConfig, searchContacts} from "../../../core/utils/search.utils";
import {LoadingService} from "../../../core/loading/loading.service";

@Component({
  selector: 'app-contact-card-deck',
  styles: [],
  template: `
    <ngx-masonry [options]="masonaryOptions" [updateLayout]="updateLayout">
      <app-contact-detail *ngFor="let contact of contacts$ | async"
                          ngxMasonryItem
                          class="mat-elevation-z1 m-1"
                          (edit)="onEdit(contact)"
                          (delete)="onDelete(contact)"
                          [contact]="contact"
                          [ngStyle]="itemStyle">
      </app-contact-detail>
    </ngx-masonry>
  `
})
export class ContactCardDeckComponent implements OnInit {
  private allContacts: ContactModel[];
  private _contacts$ = new BehaviorSubject<ContactModel[]>([]);
  private isHandset: boolean;
  private _filterStr = "";

  public fillTotalWidth = false;
  updateLayout = true;
  masonaryOptions: NgxMasonryOptions = { horizontalOrder: true }

  @Input() set filterStr$(filterString$: Observable<string>) { this.handleFilterString(filterString$); }

  @Output() delete = new EventEmitter<ContactModel>();
  @Output() edit = new EventEmitter<ContactModel>();

  get contacts$(): Observable<ContactModel[]> { return this._contacts$.asObservable(); }
  get itemStyle(): any { return this.getItemStyle(); }

  constructor(
    private contactCache: ContactCacheService,
    private breakpointService: BreakpointService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    console.log("Contact card init")
    this.contactCache.contacts$
      .subscribe(contacts => {
        console.log("Contact card deck received new contacts: ", contacts)
        this.allContacts = contacts;
        this._contacts$.next(contacts)
      });

    this.breakpointService.isHandset$().subscribe(isHandset => this.isHandset = isHandset);
  }

  onEdit(contact: ContactModel) {
    // this.fillTotalWidth = true;
    this.edit.emit(contact);
  }

  onDelete(contact: ContactModel) {
    this.delete.emit(contact);
  }

  renderLayout(): void {
    this.updateLayout = !this.updateLayout;
  }

  private handleFilterString(filterString$: Observable<string>) {
    if (filterString$) {
      filterString$
        .pipe(
          filter(filterStr => {
            if (filterStr === this._filterStr) return false;
            else {
              this._filterStr = filterStr;
              return true;
            }
          }),
          debounceTime(250))
        .subscribe(filterStr => {
          this.loadingService.startLoad(filterStr);

          if (!filterStr || filterStr === "") {
            console.log("Filter string was empty, returning all contacts")
            this._contacts$.next(this.allContacts);
          } else {
            const config: ContactSearchConfig = {count: 10};
            const filteredContacts: ContactModel[] = searchContacts(filterStr, this.allContacts, config);

            console.group("Filtering contacts");
            console.log("Filter string:", filterStr);
            console.log("Filter config:", config);
            console.log("All contacts:", this.allContacts)
            console.log("Filtered contacts:", filteredContacts);
            console.groupEnd();

            this._contacts$.next(filteredContacts);
          }

          this.loadingService.endLoad(filterStr);
          this.renderLayout();
        })
    }
  }

  private getItemStyle() {
    // console.group("Get item style")
    // console.log("isHandset", this.isHandset)
    // console.log("fillTotalWidth", this.fillTotalWidth)
    if (this.isHandset || this.fillTotalWidth) {
      // console.log("Full Width")
      // console.groupEnd();
      return {
        "border-radius": "10px",
        "width": "98%"
      }
    } else {
      // console.log("47 Width")
      // console.groupEnd();
      return {
        "border-radius": "10px",
        "width": "47%"
      }
    }

  }
}
