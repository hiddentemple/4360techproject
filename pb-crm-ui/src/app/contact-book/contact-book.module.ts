import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContactBookRoutingModule} from './contact-book-routing.module';
import {ContactFormComponent} from './containers/contact-form/contact-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {ContactBookHomeComponent} from './components/contact-book-home/contact-book-home.component';
import {CreateContactButtonComponent} from './containers/create-contact-button/create-contact-button.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ContactSearchComponent } from './containers/contact-search/contact-search.component';
import { CreateContactDialogComponent } from './containers/create-contact-dialog/create-contact-dialog.component';
import { MatDialogModule} from '@angular/material/dialog';
import { ContactTableComponent } from './containers/contact-table/contact-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ContactDetailPageComponent} from './components/contact-detail-page/contact-detail-page.component';
import {ContactDetailComponent} from './containers/contact-detail/contact-detail.component';
import { MatMenuModule } from '@angular/material/menu';
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import { ContactHomeSidenavComponent } from './containers/contact-home-sidenav/contact-home-sidenav.component';
import {MatRippleModule} from "@angular/material/core";
import {AngularSplitModule} from "angular-split";


@NgModule({
  declarations: [
    ContactFormComponent,
    ContactBookHomeComponent,
    CreateContactDialogComponent,
    ContactTableComponent,
    ContactDetailPageComponent,
    ContactDetailComponent,
    ContactSearchComponent,
    EmailTableComponent,
    PhoneTableComponent
  ],
  exports: [
    ContactFormComponent
  ],
  imports: [
    CommonModule,
    ContactBookRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSnackBarModule,
    MatRippleModule,
    AngularSplitModule.forRoot(),
    PortalModule,
  ],
  entryComponents: [
    ContactFormComponent,
    ContactDetailComponent
  ]
})
export class ContactBookModule {
}
