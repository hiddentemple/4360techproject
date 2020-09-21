import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DevComponent} from './dev/dev.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';



@NgModule({
  declarations: [DevComponent, NavBarComponent],
  imports: [
    CommonModule
  ],
  exports: [NavBarComponent]
})
export class CoreModule { }
