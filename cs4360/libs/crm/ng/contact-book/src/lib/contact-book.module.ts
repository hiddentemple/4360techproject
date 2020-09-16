import { NgModule } from '@angular/core';
import { ContactFormComponent } from './contact-form/contact-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";



@NgModule({
  declarations: [ContactFormComponent],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [ContactFormComponent]
})
export class ContactBookModule { }
