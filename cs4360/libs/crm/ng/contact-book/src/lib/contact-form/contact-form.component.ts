import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ContactModel} from "@crm/shared/model";

@Component({
  selector: 'cs4360-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {

  @Input() contact: ContactModel

  @Output() submit: EventEmitter<ContactModel>

  constructor() { }

  ngOnInit(): void {
  }

}
