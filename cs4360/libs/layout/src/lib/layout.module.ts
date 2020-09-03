import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from "./material/material.module";
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  imports: [CommonModule, MaterialModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent]
})
export class LayoutModule {}
