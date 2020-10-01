import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {ContactModel} from '../../../api/api-interfaces/contact/models/contact.model';
import { MatMenuTrigger } from '@angular/material/menu';

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

  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();
  @Output() view = new EventEmitter<string>();

  @Input() size: TableSize;
  @Input() set contacts(contacts: ContactModel[]) { this.setContacts(contacts); }

  get displayedColumns(): string[] {
    switch (this.size){
      case TableSize.COMPACT:
        return ['firstName', 'lastName', 'company', 'actions'];
      case TableSize.FULL:
        return ['firstName', 'lastName', 'company', 'updatedAt', 'actions'];
    }
  }

  constructor() {
    this.dataSource = new MatTableDataSource([]);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getIDForRow(contact: ContactModel): string { return contact.id }
  onEdit(id: string) { this.edit.emit(id); }
  onDelete(id: string) { this.delete.emit(id); }
  onView(id: string) { this.view.emit(id); }

  applyFilter(event: Event) {
    const filterValue: string = (event.target as HTMLInputElement).value;
    this.setFilter(filterValue)
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
}
