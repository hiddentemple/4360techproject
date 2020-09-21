import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ContactBookHomeComponent} from "./components/contact-book-home/contact-book-home.component";

export const ContactBookRoutes = {
  home: 'contacts'
}

const routes: Routes = [
  { path: ContactBookRoutes.home, component: ContactBookHomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactBookRoutingModule { }
