import {Injectable} from '@angular/core';
import {ApiService} from "../../api/api.service";
import {
  AbstractInnerCategoryRequest,
  CreateCategoryRequest,
  CreateCategoryResponse,
  GetAllCategoriesResponse,
  GetCategoryResponse
} from "@hiddentemple/api-interfaces";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  static readonly API_ROOT = "api/category/"

  constructor(private api: ApiService) { }

  getCategory(id: string): Observable<GetCategoryResponse> {
    const url = CategoryService.API_ROOT + id;
    return this.api.get<GetCategoryResponse>(url);
  }

  getAllCategories(): Observable<GetAllCategoriesResponse> {
    return this.api.get<GetAllCategoriesResponse>(CategoryService.API_ROOT);
  }

  createCategory(category: AbstractInnerCategoryRequest): Observable<CreateCategoryResponse> {
    const req: CreateCategoryRequest = {category};
    return this.api.post<CreateCategoryResponse>(CategoryService.API_ROOT, req)
  }

  deleteCategory(id: string): Observable<any> {
    const url = CategoryService.API_ROOT + id;
    return this.api.delete(url);
  }

}
