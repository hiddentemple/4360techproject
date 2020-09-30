import {Component, Input, OnInit} from '@angular/core';
import {ContactModel} from '../../../api/api-interfaces/contact/models/contact.model';

@Component({
  selector: 'app-contact-detail',
  template: `
    <div class="container-fluid">
      <h2>{{contact.firstName}} {{contact.lastName}}</h2>
      <h4>Company: {{contact.company}}</h4>
      <div formArrayName="phones">Phone:
        <div *ngFor="let phone of contact.phones; let i=index">
          <ol>{{phone.type}} {{phone.number}}</ol>
        </div>
      </div>
      <div formArrayName="emails">Email:
        <div *ngFor="let email of contact.emails; let i=index">
          <ol>{{email.type}} {{email.address}}</ol>
        </div>
      </div>
    </div>

  `,
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent {

  @Input() contact: ContactModel;

}
