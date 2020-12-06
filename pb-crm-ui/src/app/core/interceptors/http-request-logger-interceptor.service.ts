import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable()

export class HttpRequestLoggerInterceptor implements HttpInterceptor {
  // https://blog.angulartraining.com/http-interceptors-in-angular-61dcf80b6bdd
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // All HTTP requests are going to go through this method
    console.log('Received request to url', request.url)
    // Pass on the request to the next interceptor
    return next.handle(request).pipe(
      tap((response: HttpResponse<any>) => {
        if (response.type !== 0) {
          console.group('Response received');
          console.log('Request', request);
          console.log('Response', response);
          console.groupEnd();
        }
      })
    );
  }
}
