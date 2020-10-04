import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactModel} from 'api-interfaces';

@Component({
  selector: 'app-contact-detail-page',
  template: `
    <p>Contact Detail Page Works</p>
  `,
  styles: []
})
export class ContactDetailPageComponent implements OnInit {
  contact: ContactModel;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(map => this.contact);
  }

}
