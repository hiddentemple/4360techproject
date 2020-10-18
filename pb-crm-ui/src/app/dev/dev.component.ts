import { Component, OnInit } from '@angular/core';
import {CategoryModel} from "@hiddentemple/api-interfaces";
import {CategoryCacheService} from "../contact-book/services/category-cache.service";


@Component({
  selector: 'app-dev',
  template: `
    <div class="container">
      <app-category-table [categories]="categories"></app-category-table>
    </div>
  `
})
export class DevComponent implements OnInit {
  categories: CategoryModel[];

  constructor(categoryCache: CategoryCacheService) {
    categoryCache.categories$.subscribe(categories => this.categories = categories)
  }
  ngOnInit(): void {
  }


}
