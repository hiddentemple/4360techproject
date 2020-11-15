import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";


@Component({
  selector: 'app-dev',
  template: `
    <div class="container">
      <app-contact-form></app-contact-form>
    </div>
  `
})
export class DevComponent{

}
