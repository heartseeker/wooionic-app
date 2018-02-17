import { OrdersProductPage } from './../orders-product/orders-product';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { Storage } from '@ionic/storage/dist/storage';
import { HerokuApiProvider } from '../../providers/heroku-api/heroku-api';



@IonicPage()
@Component({
  selector: 'page-orders',
  templateUrl: 'orders.html',
})
export class OrdersPage {

  cartQty;
  orders;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storageProvider: StorageProvider,
    public events: Events,
    public storage: Storage,
    public heroku: HerokuApiProvider,
    public loadingCtrl: LoadingController
  ) {
    this.listenToLoginEvents();
  }

  ionViewWillEnter() {
    this.storageProvider.getCartQty().subscribe(qty => {
      this.cartQty = qty;
    });
  }

  listenToLoginEvents() {
    this.storage.ready().then(() => {

      console.log('ordersssss');
      const loader = this.loadingCtrl.create({
        content: "Please wait...",
      });

      loader.present();
      this.storage.get('auth').then((data) => {

        // heroku api get orders
        //=============================================================
        this.heroku.get('orders?customer=' + data.id).subscribe(orders => {
          this.orders = orders;
          loader.dismiss();
        }, (err) => {
          console.log('err', err);
        });
      });
    });
  }

  productOrders(order) {
    this.navCtrl.push(OrdersProductPage, { order });   
  }
 
}
