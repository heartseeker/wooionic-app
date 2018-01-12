import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class StorageProvider  {

  cart;

  constructor(
    public http: HttpClient,
    public storage: Storage
  ) {
  }

  getCart(): Observable<any> {
    const subject = new Subject<any>();
    this.storage.get('cart').then((data) => {
      if(data !== null) {
        subject.next(data);
      } else {
        subject.next([]);
      }
    });
    return subject.asObservable();
  }

  getCartQty(): Observable<any> {
    const subject = new Subject<any>();
    let qty = 0;
    this.storage.get('cart').then((data) => {

      if(data !== null) {
        const p = data.map(product => {
          qty += product.qty
        });
        
        Promise.all(p).then(() => {
          subject.next(qty);
        });
      } else {
        subject.next(qty);
      }
      
    });

    return subject.asObservable();
  }

  getGrandTotal(): Observable<any> {
    const subject = new Subject<any>();
    let totalAmount = 0;
    this.storage.get('cart').then((data) => {

      if(data !== null) {
        const p = data.map(product => {
          totalAmount += product.amount
        });
        
        Promise.all(p).then(() => {
          subject.next(totalAmount);
        });
      } else {
        subject.next(totalAmount);
      }
      
    });

    return subject.asObservable();
  }

  getUser(): Observable<any> {
    const subject = new Subject<any>();
    this.storage.get('auth').then((data) => {
      if(data !== null) {
        subject.next(data);
      }
    });
    return subject.asObservable();
  }

  isLogin(): Observable<any> {
    const subject = new Subject<any>();
    this.storage.ready().then(() => {

      this.storage.get('auth').then((data) => {
        if (data === null) {
          subject.next(false);
        } else {
          subject.next(true);
        }
      });
    });
    return subject.asObservable();
  }


}
