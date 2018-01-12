import { ProductDetailPage } from './../../pages/product-detail/product-detail';
import { ToastController, NavController } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { HerokuApiProvider } from '../../providers/heroku-api/heroku-api';


@Component({
  selector: 'product-list',
  templateUrl: 'product-list.html'
})
export class ProductListComponent {

  @Input('products') products;
  @Input('category') category = null;

  page: number = 1;

  constructor(
    private heroku: HerokuApiProvider,
    private toastCtrl: ToastController,
    private navCtrl: NavController,
  ) {
  }

  loadProducts(event) {
    if (event !== null) {
      this.page++;
    }

    let url = 'products?page=' + this.page;

    if(this.category !== null) {
        url = 'products?category=' + this.category.id + '&page=' + this.page;
    }

    // heroku api
    //============================================================
    this.heroku.get(url).subscribe(products => {
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

  goToProductDetail(product) {
    this.navCtrl.push(ProductDetailPage, { product });
  }
  

}
