import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'cs4360-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input() appTitle: string;

  constructor() { }

  ngOnInit(): void {
  }

}
