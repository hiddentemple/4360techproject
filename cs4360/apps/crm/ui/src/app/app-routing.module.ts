import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";
import {DevComponent} from "./dev/dev.component";

export const AppRoutes = {
  dev: 'dev'
}

const routes: Routes = [
  { path: AppRoutes.dev, component: DevComponent }
  // Not found component
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
