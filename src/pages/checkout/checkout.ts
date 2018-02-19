import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events, MenuController, App } from 'ionic-angular';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { HerokuApiProvider } from '../../providers/heroku-api/heroku-api';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {

  countries$;

  newOrder: any;
  paymentMethods: any[];
  paymentMethod: any;
  billing_shipping_same: boolean;
  userInfo: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public storage: Storage,
    public heroku: HerokuApiProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public events: Events,
    public menu: MenuController,
    public app: App
  ) {
    this.newOrder = {};
    this.newOrder.billing = {};
    this.newOrder.shipping = {};
    this.billing_shipping_same = false;

    this.paymentMethods = [
      { method_id: 'bacs', method_title: 'Direct Bank Transfer' },
      { method_id: 'cheque', method_title: 'Cheque Payment' },
      { method_id: 'cod', method_title: 'Cash on Delivery' },
      { method_id: 'paypal', method_title: 'PayPal' }];

      const loader = this.loadingCtrl.create({
        content: "Please wait...",
      });
  
      loader.present();

      this.storage.get('auth').then((user) => {
        this.userInfo = user;

        this.heroku.get('customers/' + user.id).subscribe(userDetail => {

          loader.dismiss();

          this.newOrder = userDetail;
          console.log('userDetail', this.newOrder);
        })
      })
      
  }

  setBillingToShipping() {
    this.billing_shipping_same = !this.billing_shipping_same;

    if (this.billing_shipping_same) {
      this.newOrder.shipping = this.newOrder.billing;
    }

  }

  placeOrder() {

    const loader = this.loadingCtrl.create({
      content: "Please wait...",
    });

    loader.present();

    let orderItems: any[] = [];
    let data: any = {};

    let paymentData: any = {};

    const p = this.paymentMethods.map((element, index) => {
      if (element.method_id == this.paymentMethod) {
        paymentData = element;
      }
    });

    Promise.all(p).then(() => {

      
      
      data = {
        method_id: paymentData.method_id,
        method_title: paymentData.method_title,
        paid: true,
        billing: this.newOrder.billing,
        shipping: this.newOrder.shipping,
        customer_id: this.userInfo.id || '',
        line_items: orderItems
      };
      
      this.storage.get("cart").then((cart) => {
        
        cart.forEach((element, index) => {
          orderItems.push({
            product_id: element.product.id,
            quantity: element.qty
          });
        });
        
        data.line_items = orderItems;
        
        this.heroku.post('orders', data).subscribe((response) => {
          loader.dismiss();
          this.alertCtrl.create({
            title: "Order Placed Successfully",
            message: "Your order has been placed successfully. Your order number is " + response.number,
            buttons: [{
              text: "OK",
              handler: () => {
                  this.storage.remove('cart');
                  this.navCtrl.popToRoot().then(() => {
                    this.navCtrl.popTo(HomePage);
                  });
                }
              }]
          }).present();
                
        })
              
      });
    });
      
      
      
      
    }
    
    ionViewDidLoad() {
      this.countries$ = this.http.get('https://restcountries.eu/rest/v2/all').map(res => res.json());
    }
    
  }
          