import { Injectable } from '@angular/core';
import {ContactModel} from "@hiddentemple/api-interfaces";
import {ContactCacheService} from "./contact-cache.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DeleteConfirmationComponent} from "../containers/delete-confirmation/delete-confirmation.component";
import {MatDialog} from "@angular/material/dialog";

export type ContactActionCallback = (ContactModel) => Promise<any>;
export type DeleteActionCallBack = () => any;

@Injectable({
  providedIn: 'root'
})
export class ContactActionsService {

  constructor(
    private contactCache: ContactCacheService,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  async createContact(contact: ContactModel, callback: ContactActionCallback): Promise<any> {
    const addedContact: ContactModel = await this.contactCache.addContact(contact);
    this.snackbar.open('Contact Created', 'Close', {duration: 2000});
    return callback(addedContact);
  }

  async updateContact(contact: ContactModel, callback: ContactActionCallback): Promise<any> {
    const updatedContact: ContactModel = await this.contactCache.updateContact(contact);
    this.snackbar.open('Contact Updated', 'Close', {duration: 2000});
    return callback(updatedContact);
  }

  async deleteContact(contact: ContactModel, callback: DeleteActionCallBack): Promise<any> {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.contactCache.deleteContact(contact).subscribe(() => {
          this.snackbar.open('Contact Deleted', 'Close', {duration: 1000});
          callback();
        });
      }
    });
  }
}
