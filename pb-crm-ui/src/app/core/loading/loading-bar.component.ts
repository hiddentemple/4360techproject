import { Component, OnInit } from '@angular/core';
import {LoadingService} from "./loading.service";

@Component({
  selector: 'app-loading-bar',
  template: `
    <mat-progress-bar *ngIf="isLoading" mode="indeterminate"></mat-progress-bar>
  `,
  styles: [
  ]
})
export class LoadingBarComponent implements OnInit {
  isLoading = false;

  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadingService.isLoading$.subscribe(isLoading => this.isLoading = isLoading);
  }
}
