import { HerokuApiProvider } from './../../providers/heroku-api/heroku-api';
import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { ProductDetailPage } from '../product-detail/product-detail';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { CartPage } from '../cart/cart';
import { StorageProvider } from '../../providers/storage/storage';
import { SearchPage } from '../search/search';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit{

  featuredProducts = [];

  foneProducts = [];

  allProducts = [];

  page: number = 1;

  cartQty: any = 0;
  
  constructor(
    private navCtrl: NavController,
    private toastCtrl: ToastController,
    private heroku: HerokuApiProvider,
    private modalCtrl: ModalController,
    private storageProvider: StorageProvider,
    private loadingCtrl: LoadingController
  ) {}

  ionViewWillEnter() {
    this.storageProvider.getCartQty().subscribe(qty => {
      this.cartQty = qty;
    });
  }

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

    const loader = this.loadingCtrl.create({
      content: "Please wait...",
    });

    loader.present();

    // all products
    this.loadProducts(null);

    this.heroku.get('products?category=17').subscribe(products => {
      this.featuredProducts = products;
      console.log('heroku products', products);
    });

    this.heroku.get('products?category=16').subscribe(products => {
      this.foneProducts = products;
      loader.dismiss();
    });

    this.storageProvider.getCartQty().subscribe(qty => {
      this.cartQty = qty;
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

  onSearch(search) {
    this.navCtrl.push(SearchPage, { search });
  }

  goToProductDetail(product) {
    this.navCtrl.push(ProductDetailPage, { product });
  }

  openCart() {
    const modal = this.modalCtrl.create(CartPage);
    modal.present();
    modal.onDidDismiss(() => {
      // update number in cart
      this.storageProvider.getCartQty().subscribe(qty => {
        this.cartQty = qty;
      });
    });
  }
  

}
