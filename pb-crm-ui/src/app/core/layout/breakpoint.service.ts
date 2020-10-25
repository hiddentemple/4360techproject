import {Injectable} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {

  constructor(private breakPoint: BreakpointObserver) { }

  isHandset$(): Observable<boolean>  {
    return this.breakPoint.observe([Breakpoints.Handset])
      .pipe(
        tap(result => console.log('Breakpoint match', result)),
        map(result => result.matches)
      );
  }
}
