import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";

export interface LoginForm {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login-component',
  template: `
    <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
      <p>
        <mat-form-field class="full-width">
          <mat-label>Email</mat-label>
          <input matInput type="email" formControlName="email" placeholder="example@google.com">

          <mat-error *ngIf="emailControl.hasError('email') && !emailControl.hasError('required')">
            Not a valid email address
          </mat-error>

          <mat-error *ngIf="emailControl.hasError('required')">
            Must enter an email
          </mat-error>
        </mat-form-field>
      </p>

      <p>
        <mat-form-field class="full-width" >
          <mat-label>Password</mat-label>
          <input matInput type="password" formControlName="password">

          <mat-error *ngIf="passwordControl.hasError('required')">
            Must enter a password
          </mat-error>
        </mat-form-field>
      </p>
      <div class="float-right">
        <button mat-button style="color:gray;">Forgot Email or Password</button>
        <button class="float-right" type="submit" mat-raised-button color="primary" [disabled]="!loginForm.valid">
          Login
        </button>
      </div>
    </form>


  `,
  styles: [
    `.full-width {
      width: 100%;
    }`
  ]
})
export class LoginComponentComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  @Output() submit = new EventEmitter<LoginForm>();

  get emailControl(): AbstractControl { return this.loginForm.get('email'); }
  get passwordControl(): AbstractControl { return this.loginForm.get('password'); }

  onSubmit() {
    if (this.loginForm.valid) {
      this.submit.emit(this.loginForm.value)
    } else {
      console.warn("Attempted to submit form when it was invalid", this.loginForm)
    }
  }
}
