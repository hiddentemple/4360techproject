import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContactBookHomeComponent} from './components/contact-book-home/contact-book-home.component';
import {ContactDetailPageComponent} from './components/contact-detail-page/contact-detail-page.component';

export const ContactBookRoutes = {
  home: 'contacts',
  id: 'contacts/:id'
};

const routes: Routes = [
  { path: ContactBookRoutes.home, component: ContactBookHomeComponent },
  { path: ContactBookRoutes.id, component: ContactDetailPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactBookRoutingModule { }
