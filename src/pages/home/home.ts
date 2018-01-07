import { HerokuApiProvider } from './../../providers/heroku-api/heroku-api';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { WoocommerceApiProvider } from '../../providers/woocommerce-api/woocommerce-api';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  featuredProducts = [];

  foneProducts = [];

  allProducts = [];

  page: number = 1;
  
  constructor(
    private navCtrl: NavController,
    private http: WoocommerceApiProvider,
    private toastCtrl: ToastController,
    private heroku: HerokuApiProvider
  ) {}

  ngOnInit() {
    // wooionic directly
    //============================================================

    // this.http.get('products?category=17').then((products) => {
    //   console.log('products', products);
    //   this.featuredProducts = products;
    // });

    // featured cellfones
    // this.http.get('products?category=16').then((products) => {
    //   this.foneProducts = products;
    // });

    // all products
    this.loadProducts(null);

    this.heroku.get('products?category=17').subscribe(products => {
      this.featuredProducts = products;
      console.log('heroku products', products);
    });

    this.heroku.get('products?category=16').subscribe(products => {
      this.foneProducts = products;
    });

  }

  loadProducts(event) {
    if (event !== null) {
      this.page++;
    }

    // wooionic directly
    //============================================================
    // this.http.get('products?page=' + this.page).then((products) => {
    //   this.allProducts = this.allProducts.concat(products);
    //   if (products.length < 10) {
    //     event.enable(false);
    //     this.toastCtrl.create({
    //       message: 'No More Products',
    //       duration: 3000
    //     }).present();
    //   }
    // });

    // heroku api
    //============================================================
    this.heroku.get('products?page=' + this.page).subscribe(products => {
      this.allProducts = this.allProducts.concat(products);
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
