import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactModel} from '@hiddentemple/api-interfaces';
import {ContactCacheService} from '../../services/contact-cache.service';
import {ContactBookRoutes} from "../../contact-book-routing.module";
import {ContactActionCallback, ContactActionsService} from "../../services/contact-actions.service";

@Component({
  selector: 'app-contact-detail-page',
  template: `
    <div class="container">
      <app-contact-detail *ngIf="showDetail; else form"
                          [contact]="contact"
                          (edit)="onEditEvent()"
                          (delete)="onDelete($event)">
      </app-contact-detail>
      <ng-template #form>
        <app-contact-form [contact]="contact" (submitContact)="onUpdateSubmit($event)"></app-contact-form>
      </ng-template>
    </div>
  `,
  styles: []
})
export class ContactDetailPageComponent implements OnInit {
  contact: ContactModel;
  showDetail = true;

  constructor(
    private route: ActivatedRoute,
    private cache: ContactCacheService,
    private router: Router,
    private contactActions: ContactActionsService
  ) { }

  ngOnInit(): void {
    const id: string = this.route.snapshot.paramMap.get('id');
    this.cache.getContact(id).subscribe(contact => this.contact = contact);
  }

  onDelete(contact: ContactModel) {
    // callback function returns to contact book home
    // this.router.navigate(...)
    const callback: () => any = async () => {
      this.router.navigate([ContactBookRoutes.home]);
    };
    this.contactActions.deleteContact(contact, callback);
  }

  onUpdateSubmit(contact: ContactModel) {
    // callback sets this.contact to the contact that was returned form the cache
    const callback: ContactActionCallback = async (contact) => {
      this.contact = contact;
      this.showDetail = true;
    };
    this.contactActions.updateContact(contact, callback);
  }

  onEditEvent() { this.showDetail = false; }
}
