import {Component, Input, OnInit} from '@angular/core';
import {ContactModel} from "../../../api/api-interfaces/contact/models/contact.model";

@Component({
  selector: 'app-contact-detail',
  template: `
    <p>
      contact-detail works!
    </p>
  `,
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {

  @Input() contact: ContactModel

  constructor() { }

  ngOnInit(): void {
  }

}
