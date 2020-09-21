import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactBookRoutingModule } from './contact-book-routing.module';
import {ContactFormComponent} from "./contact-form/contact-form.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";


@NgModule({
  declarations: [ContactFormComponent],
  exports: [
    ContactFormComponent
  ],
  imports: [
    CommonModule,
    ContactBookRoutingModule,
    MatFormFieldModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatInputModule,
    MatFormFieldModule
  ]
})
export class ContactBookModule { }
