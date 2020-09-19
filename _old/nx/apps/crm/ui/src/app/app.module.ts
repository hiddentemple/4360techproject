import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { DevComponent } from './dev/dev.component';
import {AppRoutingModule} from "./app-routing.module";
import {ContactBookModule} from "@crm/ng/contact-book";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [AppComponent, DevComponent],
  imports: [
    // Angular Modules
    BrowserModule,
    RouterModule,
    BrowserAnimationsModule,
    // Core Modules
    MatFormFieldModule,
    MatInputModule,
    // Imported from Libs
    ContactBookModule,

    // Feature Modules

    // Routing
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
