import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ContactBookRoutingModule} from './contact-book-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {ContactBookHomeComponent} from './components/contact-book-home/contact-book-home.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
import {ContactTableComponent} from './containers/contact-table/contact-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ContactDetailPageComponent} from './components/contact-detail-page/contact-detail-page.component';
import {ContactDetailComponent} from './containers/contact-detail/contact-detail.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatNativeDateModule, MatOptionModule, MatRippleModule} from '@angular/material/core';
import {AngularSplitModule} from 'angular-split';
import {EmailTableComponent} from './containers/email-table/email-table.component';
import {PhoneTableComponent} from './containers/phone-table/phone-table.component';
import {PortalModule} from '@angular/cdk/portal';
import {CoreModule} from '../core/core.module';
import {DialogComponent} from '../core/dialog/dialog.component';
import {ImportFileComponent} from './containers/import-file/import-file.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {DeleteConfirmationComponent} from './containers/delete-confirmation/delete-confirmation.component';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {ContactCardDeckComponent} from './containers/contact-card-deck/contact-card-deck.component';
import {NgxMasonryModule} from "ngx-masonry";
import {MatRadioModule} from '@angular/material/radio';
import {OverlayModule} from '@angular/cdk/overlay';
import {WebpageTableComponent} from './containers/website-table/webpage-table.component';
import {ContactFormComponent} from './form/contact-form.component';
import {NameFormComponent} from './form/components/name-form/name-form.component';
import {CompanyFormComponent} from './form/components/company-form/company-form.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {PhonesFormComponent} from './form/components/phones-form/phones-form.component';
import {EmailsFormComponent} from './form/components/emails-form/emails-form.component';
import {WebpageFormComponent} from './form/components/webpage-form/webpage-form.component';
import {AddressFormComponent} from './form/components/address-form/address-form.component';
import {MatCardModule} from "@angular/material/card";
import { NotesFormComponent } from './form/components/notes-form/notes-form.component';
import { TagsFormComponent } from './form/components/tags-form/tags-form.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ContactFormDialogComponent } from './form/contact-form-dialog.component';


@NgModule({
  declarations: [
    ContactBookHomeComponent,
    ContactTableComponent,
    ContactDetailPageComponent,
    ContactDetailComponent,
    EmailTableComponent,
    PhoneTableComponent,
    ImportFileComponent,
    PhoneTableComponent,
    DeleteConfirmationComponent,
    ContactCardDeckComponent,
    WebpageTableComponent,
    ContactFormComponent,
    NameFormComponent,
    CompanyFormComponent,
    PhonesFormComponent,
    EmailsFormComponent,
    WebpageFormComponent,
    AddressFormComponent,
    AddressFormComponent,
    NotesFormComponent,
    TagsFormComponent,
    ContactFormDialogComponent,
  ],
  exports: [
    ContactFormComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
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
    MatOptionModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatCheckboxModule,
    NgxMasonryModule,
    FormsModule,
    MatRadioModule,
    OverlayModule,
    MatExpansionModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  entryComponents: [
    DialogComponent,
    ContactFormComponent,
    ContactDetailComponent,
    DeleteConfirmationComponent,
    ImportFileComponent
  ]
})
export class ContactBookModule {
}
