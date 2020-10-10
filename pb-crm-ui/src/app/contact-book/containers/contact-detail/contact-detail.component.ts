import {Component, Input, OnInit} from '@angular/core';
import {ContactModel} from '@hiddentemple/api-interfaces';

@Component({
  selector: 'app-contact-detail',
  template: `
    <div class="container-fluid">
      <h2>{{contact.firstName}} {{contact.lastName}}</h2>
      <h3>Company: {{contact.company}}</h3>
      <app-phone-table [phones]="contact?.phones"></app-phone-table><br>
      <app-email-table [emails]="contact?.emails"></app-email-table>
    </div>
  `,
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent {

  @Input() contact: ContactModel;

}
