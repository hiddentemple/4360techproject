import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {
  AbstractInnerCategoryRequest,
  CategoryCode,
  CategoryModel,
  CreateCategoryResponse,
  GetAllCategoriesResponse
} from "@hiddentemple/api-interfaces";
import {map} from "rxjs/operators";
import {CategoryService} from "./category.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryCacheService implements OnInit {
  private _categories$ = new BehaviorSubject<CategoryModel[]>([]);
  private _primary$ = new BehaviorSubject<CategoryModel>(undefined);

  constructor(private categoryService: CategoryService) {
    this.categoryService.getAllCategories().subscribe(({categories}: GetAllCategoriesResponse) => {
      const filtered: CategoryModel[] = categories.filter(category => category.code == CategoryCode.PRIMARY)
      if (filtered.length !== 1) {
        throw new Error("Invalid response received from backend. No primary found in: " + JSON.stringify(categories))
      }

      console.log('Init Categories')
      this._primary$.next(filtered[0]);
      this._categories$.next(categories);
    })
  }

  get categories$(): Observable<CategoryModel[]> { return this._categories$.asObservable(); }
  get primary$(): Observable<CategoryModel> { return this._primary$.asObservable(); }
  get descriptions$(): Observable<string[]> {
    return this.categories$.pipe(map(categories => categories.map(category => category.description)))
  }

  ngOnInit() {
  }

  addCategory(newCategory: AbstractInnerCategoryRequest): Observable<CategoryModel> {
    return this.categoryService.createCategory(newCategory).pipe(map(({category}: CreateCategoryResponse) =>{
      const current: CategoryModel[] = this._categories$.getValue();
      current.push(category)
      this._categories$.next(current);
      return category;
    }))
  }

  deleteCategory(categoryToDelete: CategoryModel): Observable<any> {
    return this.categoryService.deleteCategory(categoryToDelete.id).pipe(map(() => {
      const current: CategoryModel[] = this._categories$.getValue();
      const filtered = current.filter(category => category.id !== categoryToDelete.id)
      this._categories$.next(filtered);
    }))
  }
}
