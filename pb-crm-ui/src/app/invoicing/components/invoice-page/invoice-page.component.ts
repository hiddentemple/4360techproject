import { Component, OnInit } from '@angular/core';
import {AccountModel} from "@hiddentemple/api-interfaces";

@Component({
  selector: 'app-invoice-page',
  template: `
    <p>
      invoice-page works!
    </p>
  `,
  styles: [
  ]
})
export class InvoicePageComponent implements OnInit {
  accounts: AccountModel[] = [
    {
      acctNumber: "",
      createdAt: undefined,
      id: "",
      invoices: [],
      notes: "",
      paymentInfo: undefined,
      updatedAt: undefined
    },
    {
      acctNumber: "",
      createdAt: undefined,
      id: "",
      invoices: [],
      notes: "",
      paymentInfo: undefined,
      updatedAt: undefined
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
