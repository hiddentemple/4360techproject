import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ContactModel} from '../../../api/api-interfaces/contact/models/contact.model';
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
      width: auto;
    }`
  ]
})
export class ContactTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['firstName', 'lastName', 'company', 'updatedAt', 'actions'];
  dataSource: MatTableDataSource<ContactModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) dataTable: MatTable<any>;

  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();
  @Output() view = new EventEmitter<string>();

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

  onEdit(id: string) { this.edit.emit(id); }

  onDelete(id: string) { this.delete.emit(id); }

  onView(id: string) { this.view.emit(id); }
}
