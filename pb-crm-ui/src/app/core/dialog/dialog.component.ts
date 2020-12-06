import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogInterface } from './temp-dialog.interface';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogInterface, private dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
  }

  close(): void{
    this.dialogRef.close(true);
  }

  onSubmit(event): any{
    return event;
  }
}
