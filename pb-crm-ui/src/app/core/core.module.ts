import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {LayoutModule} from '@angular/cdk/layout';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [NavBarComponent, DialogComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    LayoutModule,
    MatDialogModule,
  ],
  exports: [NavBarComponent, DialogComponent],
  entryComponents: [DialogComponent]
})
export class CoreModule { }
