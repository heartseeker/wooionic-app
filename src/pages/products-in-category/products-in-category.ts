import { HerokuApiProvider } from './../../providers/heroku-api/heroku-api';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { CartPage } from '../cart/cart';


@IonicPage()
@Component({
  selector: 'page-products-in-category',
  templateUrl: 'products-in-category.html',
})
export class ProductsInCategoryPage implements OnInit {

  category;
  products = [];

  cartQty: any = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public heroku: HerokuApiProvider,
    public storageProvider: StorageProvider,
    public modalCtrl: ModalController
  ) {
  }

  ionViewWillEnter() {
    this.storageProvider.getCartQty().subscribe(qty => {
      this.cartQty = qty;
    });
  }

  ngOnInit() {
    this.category = this.navParams.get('category');
    // heroku api
    //============================================================
    this.heroku.get('products?category=' + this.category.id).subscribe(products => {
      this.products = products;
    });

    this.storageProvider.getCartQty().subscribe(qty => {
      this.cartQty = qty;
    });
    
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
