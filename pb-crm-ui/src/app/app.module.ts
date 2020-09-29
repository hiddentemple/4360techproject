import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ContactBookModule} from './contact-book/contact-book.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {ApiModule} from './api/api.module';
import {CoreModule} from './core/core.module';
import {DevComponent} from './dev/dev.component';
import { HttpClientModule } from '@angular/common/http';
import {AuthModule} from "./auth/auth.module";

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

    AppRoutingModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
