import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from './components/login-page/login-page.component';

export const AuthRoutes = {
  login: 'auth/login',
  register: 'auth/register',
  forgotPassword: '', // TODO should these be the same? or different routes, like they are now?
  forgotEmail: ``
};

const routes: Routes = [
  { path: AuthRoutes.login, component: LoginPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
