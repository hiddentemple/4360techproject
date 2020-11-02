import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {DialogInterface } from './temp-dialog.interface';
import { DialogComponent } from './dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogRef: MatDialogRef<DialogComponent>;

  constructor(public dialog: MatDialog) { }

  openDialog(data: DialogInterface, additionalDialogConfigData?: any): MatDialogRef<DialogComponent>{
    if (this.dialogRef){
      this.dialogRef.close();
    }
    this.dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data,
      ...additionalDialogConfigData
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if (result){
        console.log(result);
      }
    });

    return this.dialogRef;
  }
}
