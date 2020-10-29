import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ContactModel, PhoneEmailCategory} from '@hiddentemple/api-interfaces';

export enum TableSize { FULL, COMPACT }

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styles: [
    `table {
      width: 100%;
    }`,
    `mat-form-field {
      font-size: 14px;
      width: 100%;
    }`,
    `td, th {
      width: auto;
    }`
  ]
})
export class ContactTableComponent implements AfterViewInit {
  dataSource: MatTableDataSource<ContactModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) dataTable: MatTable<any>;

  @Output() delete = new EventEmitter<ContactModel>();
  @Output() edit = new EventEmitter<ContactModel>();
  @Output() view = new EventEmitter<ContactModel>();

  @Input() size: TableSize;
  @Input() set contacts(contacts: ContactModel[]) { this.setContacts(contacts); }

  get displayedColumns(): string[] { return this.getColumns(); }

  constructor() {
    this.dataSource = new MatTableDataSource([]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onEdit(contact: ContactModel) { this.edit.emit(contact); }
  onDelete(contact: ContactModel) { this.delete.emit(contact); }
  onView(contact: ContactModel) { this.view.emit(contact); }

  applyFilter(event: Event) {
    const filterValue: string = (event.target as HTMLInputElement).value;
    this.setFilter(filterValue)
  }

  getPrimaryPhone(contact: ContactModel): string {
    if (!contact.phones || contact.phones.length === 0) return '';
    // else
    return contact.phones.find(phone => phone.category === PhoneEmailCategory.PRIMARY)?.phoneNumber
  }

  getPrimaryEmail(contact: ContactModel): string {
    if (!contact.emails || contact.emails.length === 0) return '';
    // else
    return contact.emails.find(email => email.category === PhoneEmailCategory.PRIMARY)?.address
  }

  private setFilter(filterStr: string) {
    this.dataSource.filter = filterStr.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
  }

  private setContacts(contacts: ContactModel[]) {
    if ((!contacts) || contacts === []) {
      console.log('Contacts received a falsey value: ', contacts);
      return;
    }

    console.log('Contact Table received new contacts: ', contacts);
    this.dataSource.data = contacts;
    if (this.dataTable) {
      console.log("Data table is present, rendering rows");
      this.dataTable.renderRows();
    }
  }

  private getColumns(): string[] {
    switch (this.size){
      case TableSize.COMPACT:
        return ['firstName', 'lastName', 'actions'];
      case TableSize.FULL:
        return ['firstName', 'lastName', 'company', 'email', 'phone', 'actions'];
    }
  }
}
