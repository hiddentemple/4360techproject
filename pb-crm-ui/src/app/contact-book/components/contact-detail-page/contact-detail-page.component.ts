import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactModel} from '@hiddentemple/api-interfaces';
import {ContactCacheService} from '../../services/contact-cache.service';

@Component({
  selector: 'app-contact-detail-page',
  template: `
    <p>Contact Detail Page Works</p>
    <app-contact-detail [contact]="contact"></app-contact-detail>
  `,
  styles: []
})
export class ContactDetailPageComponent implements OnInit {
  contact: ContactModel;

  constructor(
    private route: ActivatedRoute,
    private cache: ContactCacheService
  ) { }

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.cache.getContact(id).subscribe(contact => this.contact = contact);
  }

}
