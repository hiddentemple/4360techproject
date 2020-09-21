import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-create-contact-button',
  template: `
    <button (click)="onClick()"
            mat-icon-button
            aria-label="Add Contact"
            matTooltip="Add a new contact"
            matTooltipPosition="{{tooltipPosition}}">
      <mat-icon color="primary">add_circle_outline</mat-icon>
    </button>
  `,
  styles: [
  ]
})
export class CreateContactButtonComponent {

  @Input() tooltipPosition: string = 'left';
  @Output() add = new EventEmitter<void>();

  onClick() {
    this.add.emit();
  }


}
