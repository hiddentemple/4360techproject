import {Injectable} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {debounceTime, filter, map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  private lastMatch = false;

  constructor(private breakPoint: BreakpointObserver) { }

  isHandset$(): Observable<boolean>  {
    return this.breakPoint.observe([Breakpoints.Handset])
      .pipe(
        // filter(result => {
        //   if (result.matches == this.lastMatch) return false;
        //   else {
        //     this.lastMatch = result.matches;
        //     return true;
        //   }
        // }),
        tap(result => console.log('Breakpoint match', result)),
        map(result => result.matches)
      );
  }
}
