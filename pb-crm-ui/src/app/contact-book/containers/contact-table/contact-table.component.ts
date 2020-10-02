import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ContactModel} from '@shared/contact/models/contact.model';
import { MatMenuTrigger } from '@angular/material/menu';



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
        width: 25%;
    }`
  ]
})
export class ContactTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'phone', 'email', 'company', 'actions'];
  dataSource: MatTableDataSource<ContactModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @ViewChild(MatTable) dataTable: MatTable<any>;

  @Output() delete = new EventEmitter<any>();
  onClick(id: string) {
    this.delete.emit({ Event, id});
    this.dataTable.renderRows();
  }



  @Input() set contacts(contacts: ContactModel[]) {
    if (!contacts || contacts === []) {
      console.log('Contacts received a falsey value: ', contacts);
      return;
    }

    console.log('Contact Table received new contacts: ', contacts);
    this.dataSource.data = contacts;
  }

  constructor() {
    this.dataSource = new MatTableDataSource([]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPhoneForRow(contact: ContactModel): number | string {
    if (contact.phones && contact.phones.length > 0) { return contact.phones[0].number; }
    else { return ''; }
  }

  getEmailForRow(contact: ContactModel): string {
    if (contact.emails && contact.emails.length > 0) { return contact.emails[0].address; }
    else { return ''; }
  }

  getIDForRow(contact: ContactModel): string {
    if (contact.id) { return contact.id; }
    else { return null; }
  }
}
