import {Injectable} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ErrorDialogComponent} from './error-dialog.component';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ErrorDialogService {

  constructor(private dialog: MatDialog) { }

  openErrorDialog(error: HttpErrorResponse): void {
    this.dialog.open(ErrorDialogComponent, {data: {error}});
  }
}
