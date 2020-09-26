import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ContactModel} from '../../../api/api-interfaces/contact/models/contact.model';

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
  displayedColumns: string[] = ['name', 'phone', 'email', 'company'];
  dataSource: MatTableDataSource<ContactModel>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
}
