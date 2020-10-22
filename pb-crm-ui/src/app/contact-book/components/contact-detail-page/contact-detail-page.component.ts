import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ContactModel} from '@hiddentemple/api-interfaces';
import {ContactCacheService} from '../../services/contact-cache.service';

@Component({
  selector: 'app-contact-detail-page',
  template: `
    <div class="container">
        <app-contact-detail [contact]="contact"></app-contact-detail>
    </div>
  `,
  styles: []
})
export class ContactDetailPageComponent implements OnInit {
  contact: ContactModel;

  @Output() delete = new EventEmitter<ContactModel>();
  @Output() edit = new EventEmitter<ContactModel>();

  constructor(
    private route: ActivatedRoute,
    private cache: ContactCacheService
  ) { }

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.cache.getContact(id).subscribe(contact => this.contact = contact);
  }

  onEdit(contact: ContactModel) { this.edit.emit(contact); }
  onDelete(contact: ContactModel) { this.delete.emit(contact); }

}
