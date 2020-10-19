import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";

export class ErrorDialogData { error: HttpErrorResponse }

@Component({
  selector: 'app-error-dialog',
  template: `
    <h1 mat-dialog-title>Ruh Roh!</h1>
    <div mat-dialog-content>
      <h3>An error has occurred</h3>
      <p>{{error | json}}</p>
<!--      <div *ngIf="isBackendError(); else clientOrNetworkError">-->
<!--        <h4>Backend Error</h4>-->
<!--        <p>Return code: {{error.status}}</p>-->
<!--      </div>-->
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close] cdkFocusInitial>Ok</button>
    </div>

    <ng-template #clientOrNetworkError>

    </ng-template>
  `,
  styles: [
  ]
})
export class ErrorDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ErrorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ErrorDialogData) {}

  get error(): HttpErrorResponse { return this.data.error; }


  onNoClick(): void {
    this.dialogRef.close();
  }

  isBackendError() {
    return !(this.data.error instanceof ErrorEvent);
  }
}
