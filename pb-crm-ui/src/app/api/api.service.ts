import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, retry} from 'rxjs/operators';
import {ErrorDialogService} from "../core/errors/error-dialog.service";

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient, private errorService: ErrorDialogService) {}

  get<T>(url: string, options = {}, handleError = this.handleError): Observable<T> {
    return this.http.get<T>(url, options).pipe(
      retry(1),
      catchError(handleError)
    );
  }

  post<T>(url: string, object: any, options?: {}): Observable<T> {
    return this.http.post<T>(url, object, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  patch<T>(url: string, object: any, options?: {}, handleError = this.handleError): Observable<T> {
    if (object.hasOwnProperty('id')) {
      // Dont allow the update of an id with a PUT
      const { id, ...model } = object;
      console.log('MODEL: ', model);
      object = model;
    }

    return this.http.patch<T>(url, object, options).pipe(
      retry(1),
      catchError(handleError)
    );
  }

  put<T>(url: string, object: any, options?: {}, handleError = this.handleError): Observable<T>{
    return this.http.put<T>(url, object, options).pipe(
      catchError(handleError)
    );
  }

  delete<T>(url: string, options?: {}, handleError = this.handleError): Observable<T> {
    return this.http.delete<T>(url, options).pipe(
      retry(1),
      catchError(handleError)
    );
  }

  handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('A client-side or network error occurred:', error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error('Backend returned a failure response', error)
    }
    this.errorService.openErrorDialog(error)
    return throwError(
      'Something bad happened; please try again later.');
  }
}
