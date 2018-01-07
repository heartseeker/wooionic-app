import { Injectable } from '@angular/core';
import * as WC from 'woocommerce-api';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class WoocommerceApiProvider {

  wooCommerce;

  constructor() {
    // this.wooCommerce = WC(environment.wooCommerce);
  }

  // get2<T>(url: string): Observable<T> {
    // const subject = new Subject<T>();

    // this.wooCommerce.getAsync(url).then(result => {
    //   subject.next(JSON.parse(result.toJSON().body));
    // });

    // return subject.asObservable();
  // }

  // get<T>(url: string): Promise<T[]> {
  //   const data =  this.wooCommerce.getAsync(url).then(result => {
  //     return JSON.parse(result.toJSON().body);
  //   });

  //   return Promise.resolve(data);
  // }

}
