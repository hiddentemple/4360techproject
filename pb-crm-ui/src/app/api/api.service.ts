import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(private http: HttpClient) {
  }


  private static handleError(error: HttpErrorResponse): Observable<any>{
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else if (error.status === 404){
        return throwError('User not found!');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Status:  ${error.status}, ` +
        `\tbody: ${error.message}`);
      return throwError(
        'Something bad happened; please try again later.');
    }
  }


  get<T>(url: string, options = {}, handleError = ApiService.handleError): Observable<T> {
    return this.http.get<T>(url, options).pipe(
      retry(1),
      catchError(handleError)
    );
  }

  post<T>(url: string, object: any, options: {}, handleError = ApiService.handleError): Observable<T> {
    return this.http.post<T>(url, object, options).pipe(
      retry(1),
      catchError(handleError)
    );
  }

  put<T>(url: string, object: any, options: {}, handleError = ApiService.handleError): Observable<T> {
    return this.http.put<T>(url, object, options).pipe(
      retry(1),
      catchError(handleError)
    );
  }

  delete<T>(url: string, options: {}, handleError = ApiService.handleError): Observable<T> {
    return this.http.delete<T>(url, options).pipe(
      retry(1),
      catchError(handleError)
    );
  }
}
