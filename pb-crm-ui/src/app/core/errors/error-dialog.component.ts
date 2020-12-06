import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HttpErrorResponse} from "@angular/common/http";

export class ErrorDialogData { error: HttpErrorResponse }

@Component({
  selector: 'app-error-dialog',
  template: `
    <h1 mat-dialog-title>Ruh Roh!</h1>
    <div mat-dialog-content>
      <h3><b>An error has occurred</b></h3>
      <p>{{error.error | json}}</p>
      <div *ngIf="isBackendError(); else clientOrNetworkError">
        <h3><b>Backend Error</b></h3>
        <p>Return code: {{error.status}} -  {{error.statusText}}</p>
      </div>
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

  isBackendError(): any {
    return !(this.data.error instanceof ErrorEvent);
  }
}
