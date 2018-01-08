import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class StorageProvider  {

  cart;

  constructor(
    public http: HttpClient,
    public storage: Storage
  ) {
    this.storage.get('cart').then((data) => {
      this.cart = data;
    });
  }

  getCart() {
    return this.cart;
  }

  getCartQty<T>(): Observable<any> {
    const subject = new Subject<any>();
    let qty = 0;
    this.storage.get('cart').then((data) => {

      const p = data.map(product => {
        qty += product.qty
      });
      
      Promise.all(p).then(() => {
        subject.next(qty);
      });
      
    });

    return subject.asObservable();
  }


}
