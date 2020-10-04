import { Component, OnInit } from '@angular/core';
import {ContactModel} from '../api/api-interfaces/contact/models/contact.model';

@Component({
  selector: 'app-dev',
  template: `
    <div class="container">
      <app-contact-form></app-contact-form>

    </div>
  `
})
export class DevComponent implements OnInit {
  ngOnInit(): void {
  }


}
