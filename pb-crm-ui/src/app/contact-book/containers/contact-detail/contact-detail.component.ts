import {Component, Input, OnInit} from '@angular/core';
import {ContactModel} from '../../../api/api-interfaces/contact/models/contact.model';

@Component({
  selector: 'app-contact-detail',
  template: `
    <h1>{{title}}</h1>
    <h2>Name: {{firstName}} {{lastName}}</h2>

  `,
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {
  title: string;
  firstName: string;
  lastName: string;

  @Input() set contacts(contacts: ContactModel[]){
    if (!contacts || contacts === []) {
      console.log('Contacts received a falsey value: ', contacts);
      return;
    }

    console.log('Contact Table received new contacts: ', contacts);
    this.dataSource.data = contacts;
  }

  constructor() {
    this.title = 'Contact Details';
    this.firstName = '';
    this.lastName = '';
  }

  ngOnInit(): void {
  }

}
