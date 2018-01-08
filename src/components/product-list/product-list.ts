import { ToastController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { HerokuApiProvider } from '../../providers/heroku-api/heroku-api';


@Component({
  selector: 'product-list',
  templateUrl: 'product-list.html'
})
export class ProductListComponent {

  @Input('products') products;

  page: number = 1;

  constructor(
    private heroku: HerokuApiProvider,
    private toastCtrl: ToastController,
  ) {
  }

  loadProducts(event) {
    if (event !== null) {
      this.page++;
    }

    // heroku api
    //============================================================
    this.heroku.get('products?page=' + this.page).subscribe(products => {
      this.products = this.products.concat(products);
      if (products.length < 10) {
            event.enable(false);
            this.toastCtrl.create({
              message: 'No More Products',
              duration: 3000
            }).present();
          }
    });


  }

}
