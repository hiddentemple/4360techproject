import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dev',
  template: `
    <div class="container">
      <app-contact-form></app-contact-form>

    </div>
  `
})
export class DevComponent implements OnInit {
  ngOnInit(): void {
  }


}
