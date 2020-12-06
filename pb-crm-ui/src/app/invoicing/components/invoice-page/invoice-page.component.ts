import { Component, OnInit } from '@angular/core';
import {AccountModel, InvoiceModel} from "@hiddentemple/api-interfaces";
import {ActivatedRoute} from "@angular/router";
import {InvoicePageService} from "../../services/invoice-page.service";

@Component({
  selector: 'app-invoice-page',
  template: `
    <div class="container" *ngIf="invoice; else loading">
      <!-- Header -->
      <div class="row">
        <h1 class="col-12">{{invoice?.type}} Detail</h1>
        <h3 class="col-12" style="color: dimgray">ID: {{invoice?.id}}</h3>
      </div>

      <!-- Type of invoice -->
      <div class="row">
        <div class="col-12">

        </div>
      </div>

      <!-- Biller, Billed, Actions, Logo -->
      <div class="row">
        <div class="col-8">
          <ul style="list-style-type:none; padding: 0;">
            <li>Date: {{invoice?.date | date}}</li>
            <li>Billed By: {{invoice?.biller?.name}}</li>
            <li>Billed To: {{invoice?.customer?.name}}</li>
          </ul>
        </div>

        <div class="col-4">
          <!-- Actions and Logo -->
        </div>
      </div>


      <!-- Line Items -->
      <div class="row">
        <div class="col-12">
          <app-line-item-table [lineItems]="invoice?.lineItems"></app-line-item-table>
        </div>
      </div>

      <!-- Recent Activity, Notes, Cost -->
      <div class="row">

      </div>
    </div>

    <ng-template #loading>
      Jeez, give me a second my guy, I'm loading...
    </ng-template>
  `,
  styles: [
  ]
})
export class InvoicePageComponent implements OnInit {
  invoice: InvoiceModel;
  accountId: string;

  get invoiceId(): string { return this.invoice?.id; }

  constructor(private route: ActivatedRoute, private invoiceService: InvoicePageService) { }

  ngOnInit(): void {
    const invoiceId = this.route.snapshot.paramMap.get('id');
    this.accountId = this.route.snapshot.queryParamMap.get('acc');
    this.invoiceService.get(invoiceId, this.accountId).subscribe(invoice => this.invoice = invoice)
  }

}
