import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingBarProgressService {
  isLoading = new BehaviorSubject<boolean>(false);
  loading$ = this.isLoading.asObservable();

  constructor() { }

  show() {
    console.log("showing")
    this.isLoading.next(true);
  }

  hide() {
    console.log("falsing")
    this.isLoading.next(false);
  }

}
