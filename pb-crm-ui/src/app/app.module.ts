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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {HttpRequestLoggerInterceptor} from './core/interceptors/http-request-logger-interceptor.service';
import {AuthModule} from './auth/auth.module';


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
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestLoggerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
