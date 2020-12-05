import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {AccountModel} from '@hiddentemple/api-interfaces';


@Component({
  selector: 'app-dev',
  template: `
    <app-account-list [accounts] = "accounts"></app-account-list>
  `
})
export class DevComponent{
  accounts: AccountModel[] = [
    {
      acctNumber: "",
      name: 'TODO',
      createdAt: undefined,
      id: "TODO",
      invoices: [],
      notes: "",
      paymentInfo: undefined,
      updatedAt: undefined
    },
    {
      acctNumber: "",
      name: 'TODO',
      createdAt: undefined,
      id: "TODO",
      invoices: [],
      notes: "",
      paymentInfo: undefined,
      updatedAt: undefined
    },
  ]}
