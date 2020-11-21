import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {InvoicingRoutes} from "../../invoicing-routing.module";

@Component({
  selector: 'app-account-summary-page',
  template: `
    <p>
      account-summary-page works!
    </p>
    <button (click)="goToDashboard()">Go To Account Dashboard</button>
    <button (click)="goToInvoice()">Go To Invoice</button>
  `,
  styles: [
  ]
})
export class AccountSummaryPageComponent implements OnInit {


  constructor(private router: Router, private route: ActivatedRoute) {
    const id = route.snapshot.paramMap.get('id'); // get the id from the URL
    // Get the account from cache
  }

  ngOnInit(): void {
  }

  goToDashboard() {
    this.router.navigate([InvoicingRoutes.home])
  }

  goToInvoice() {
    const id = "asgasdf2" // id of invoice
    this.router.navigate([InvoicingRoutes.invoicesWithoutID, id])
  }
}
