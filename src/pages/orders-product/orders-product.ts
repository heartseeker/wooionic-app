import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the OrdersProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-orders-product',
  templateUrl: 'orders-product.html',
})
export class OrdersProductPage implements OnInit {

  products;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ngOnInit() {
    this.products = this.navParams.get('order').line_items;
    console.log('orders', this.products);
  }

  ionViewDidLoad() {
  }

}
