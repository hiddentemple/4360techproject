import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

export const LayoutMaterialModules = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule
]

@NgModule({
  declarations: [],
  imports: [...LayoutMaterialModules],
  exports: [...LayoutMaterialModules]
})
export class MaterialModule { }
