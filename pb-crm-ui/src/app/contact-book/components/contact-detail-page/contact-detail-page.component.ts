import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactModel} from '@hiddentemple/api-interfaces';
import {ContactCacheService} from '../../services/contact-cache.service';
import {ContactBookRoutes} from "../../contact-book-routing.module";
import {ContactActionCallback} from "../../services/contact-actions.service";

@Component({
  selector: 'app-contact-detail-page',
  template: `
    <div class="container">
      <app-contact-detail *ngIf="showDetail; else form"
                          [contact]="contact"
                          (edit)="onEdit()"
                          (delete)="onDelete($event)">
      </app-contact-detail>
    </div>

    <ng-container #form>
      <app-contact-form [contact]="contact" (submitContact)="onUpdate($event)"></app-contact-form>
    </ng-container>
  `,
  styles: []
})
export class ContactDetailPageComponent implements OnInit {
  contact: ContactModel;
  showDetail = true;

  constructor(
    private route: ActivatedRoute,
    private cache: ContactCacheService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.cache.getContact(id).subscribe(contact => this.contact = contact);
  }

  onEdit() { this.showDetail = false; }

  onDelete(contact: ContactModel) {
    // callback function returns to contact book hom
    // this.router.navigate(...)
    this.router.navigate([ContactBookRoutes.home])
  }

  onUpdate(contact: ContactModel) {
    // callback sets this.contact to the contact that was returned form the cache
    const callback : ContactActionCallback = async (contact) => {
      this.contact = contact;
      this.showDetail = true;
    }
  }
}
