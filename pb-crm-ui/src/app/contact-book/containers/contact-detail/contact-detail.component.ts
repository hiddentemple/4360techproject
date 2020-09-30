import {Component, Input, OnInit} from '@angular/core';
import {ContactModel} from '../../../api/api-interfaces/contact/models/contact.model';

@Component({
  selector: 'app-contact-detail',
  template: `
    <div class="container-fluid">
      <h2>Name: {{contact?.firstName}} {{contact?.lastName}}</h2>
    </div>

  `,
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent {

  @Input() contact: ContactModel;

}
