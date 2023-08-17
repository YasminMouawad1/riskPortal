import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddNotificationService {

   
  public count : any= 0;

  private subject: BehaviorSubject<number>;

  constructor() {
    this.subject = new BehaviorSubject(this.count);
  }
 
  public getCount(): Observable<number> { 
   // return this.subject.asObservable();
   return this.count;
  }

  public increment(): void {
    this.count++;
    this.notify();
  }

  

  private notify(): void {
    this.subject.next(this.count);
  }
}