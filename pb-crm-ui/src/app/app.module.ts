import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ContactBookModule} from './contact-book/contact-book.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ApiModule} from './api/api.module';
import {CoreModule} from './core/core.module';
import {DevComponent} from './dev/dev.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthModule} from './auth/auth.module';
import { DialogComponent } from './core/dialog/dialog.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {HttpRequestLoggerInterceptor} from "./core/interceptors/http-request-logger-interceptor.service";
import {InvoicingModule} from "./invoicing/invoicing.module";


@NgModule({
  declarations: [AppComponent, DevComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,

    ApiModule,
    AuthModule,
    ContactBookModule,
    InvoicingModule,

    AppRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestLoggerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
