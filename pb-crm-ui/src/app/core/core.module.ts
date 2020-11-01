import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NavBarComponent} from './nav-bar/nav-bar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule} from '@angular/router';
import {LayoutModule} from '@angular/cdk/layout';
import {ErrorDialogComponent} from './errors/error-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import { LoadingBarComponent } from './loading/loading-bar.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';



@NgModule({
  declarations: [NavBarComponent, ErrorDialogComponent, LoadingBarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    LayoutModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatProgressBarModule
  ],
  exports: [NavBarComponent, LoadingBarComponent],
  entryComponents: [ErrorDialogComponent]
})
export class CoreModule { }
