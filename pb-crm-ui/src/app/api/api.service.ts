import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, retry, tap} from 'rxjs/operators';
import {ErrorDialogService} from '../core/errors/error-dialog.service';
import {LoadingService} from '../core/loading/loading.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private errorService: ErrorDialogService,
    private loadingService: LoadingService
  ) {}

  get<T>(url: string, options = {}, handleError = this.handleError): Observable<T> {
    this.loadingService.startLoad(url);
    return this.http.get<T>(url, options).pipe(
      retry(1),
      catchError(err => this.handleError(err)),
      tap(() => this.loadingService.endLoad(url))
    );
  }

  post<T>(url: string, object: any, options?: {}): Observable<T> {
    this.loadingService.startLoad(url);
    return this.http.post<T>(url, object, options).pipe(
      retry(1),
      catchError(err => this.handleError(err)),
      tap(() => this.loadingService.endLoad(url))
    );
  }

  patch<T>(url: string, object: any, options?: {}, handleError = this.handleError): Observable<T> {
    this.loadingService.startLoad(url);
    if (object.hasOwnProperty('id')) {
      // Dont allow the update of an id with a PUT
      const { id, ...model } = object;
      console.log('MODEL: ', model);
      object = model;
    }

    return this.http.patch<T>(url, object, options).pipe(
      retry(1),
      catchError(err => this.handleError(err)),
      tap(() => this.loadingService.endLoad(url))
    );
  }

  put<T>(url: string, object: any, options?: {}, handleError = this.handleError): Observable<T>{
    this.loadingService.startLoad(url);
    return this.http.put<T>(url, object, options).pipe(
      retry(1),
      catchError(err => this.handleError(err)),
      tap(() => this.loadingService.endLoad(url))
    );
  }

  delete<T>(url: string, options?: {}, handleError = this.handleError): Observable<T> {
    this.loadingService.startLoad(url);
    return this.http.delete<T>(url, options).pipe(
      retry(1),
      catchError( err => this.handleError(err)),
      tap(() => this.loadingService.endLoad(url))
    );
  }

  handleError(error: HttpErrorResponse): Observable<any> {
    console.log('Im a little hoe');
    this.loadingService.endAll();
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('A client-side or network error occurred:', error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error('Backend returned a failure response', error);
    }
    this.errorService.openErrorDialog(error);
    return throwError(
      'Something bad happened; please try again later.');
  }
}
