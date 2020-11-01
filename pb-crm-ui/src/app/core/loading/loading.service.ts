import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private isLoadingSubject = new BehaviorSubject<any[]>([]);

  get isLoading$(): Observable<boolean> {
    return this.isLoadingSubject
      .pipe(map(currentlyLoading => currentlyLoading.length !== 0));
  }

  startLoad(obj: any) {
    console.log("start load")
    const current = this.isLoadingSubject.getValue();
    current.push(obj);
    this.isLoadingSubject.next(current);
  }

  endLoad(obj: any) {
    console.log("end load")
    const current = this.isLoadingSubject.getValue();
    const filtered = current.filter(inCurrent => inCurrent !== obj);
    this.isLoadingSubject.next(filtered);
  }

}
