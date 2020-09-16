import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { DevComponent } from './dev/dev.component';
import {AppRoutingModule} from "./app-routing.module";
import {ContactBookModule} from "@crm/ng/contact-book";

@NgModule({
  declarations: [AppComponent, DevComponent],
  imports: [
    // Angular Modules
    BrowserModule,
    RouterModule,

    // Core Modules

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
