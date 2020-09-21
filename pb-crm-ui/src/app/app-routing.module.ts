import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DevComponent} from './dev/dev.component';

const routes: Routes = [
  { path: 'dev', component: DevComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
