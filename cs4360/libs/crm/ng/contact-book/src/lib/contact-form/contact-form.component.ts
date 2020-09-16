import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
export interface ContactFormEvent {
  firstName : string;
  lastName : string;
}
@Component({
  selector: 'crm-ui-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  nameForm = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),

  })
  @Output() submit = new EventEmitter <ContactFormEvent>();
  constructor() { }

  ngOnInit(): void {
  }
  onSubmit(): void {
    if (this.nameForm.status === "VALID"){
      this.submit.emit(this.nameForm.value)
    }else{
      console.error("Try to submit when form is invalid.")
    }
  }
}
