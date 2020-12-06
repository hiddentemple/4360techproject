import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login-page',
  template: `
    <div class="row justify-content-center">
      <div class="col-sm-12 col-md-6 col-lg-4 m-4">
        <app-login-component></app-login-component>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class LoginPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
