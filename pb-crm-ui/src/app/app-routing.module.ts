import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DevComponent} from './dev/dev.component';
import {ContactBookHomeComponent} from "./contact-book/components/contact-book-home/contact-book-home.component";

const routes: Routes = [
  { path: 'dev', component: DevComponent },
  { path: '', component: ContactBookHomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
