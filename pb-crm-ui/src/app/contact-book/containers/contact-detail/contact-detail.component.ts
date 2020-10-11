import {Component, Input, OnInit} from '@angular/core';
import {ContactModel} from '@hiddentemple/api-interfaces';

@Component({
  selector: 'app-contact-detail',
  template: `
    <div class="container-fluid">
      <h2>{{contact.firstName}} {{contact.lastName}}</h2>
      <h3>Company: {{contact.company}}</h3>
      <!-- Notes Input-->
      <mat-form-field class="col-12">
        <mat-label>Notes</mat-label>
        <textarea matInput disabled maxlength="250" placeholder="Ex. This is a note..." formControlName="notes"></textarea>
      </mat-form-field>
      <app-phone-table [phones]="contact?.phones"></app-phone-table><br>
      <app-email-table [emails]="contact?.emails"></app-email-table><br>
<!--      <button mat-raised-button (click)="show =! show" type="button" color="accent">Add Notes</button>-->
    </div>
  `,
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent {
  show = true;

  @Input() contact: ContactModel;

}
