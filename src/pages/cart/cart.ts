import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { ViewController } from 'ionic-angular/navigation/view-controller';
import { Storage } from '@ionic/storage/dist/storage';


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  products = [];
  total = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storageProvider: StorageProvider,
    public viewCtrl: ViewController,
    public storage: Storage
  ) {
  }

  ionViewDidLoad() {
    this.storageProvider.getCart().subscribe(products => {
      this.products = products;
    });
    this.storageProvider.getGrandTotal().subscribe(total => {
      this.total = total;
    });
    
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  decrement(product, index) {
    let data = this.products;
    data[index].qty -= 1;
    data[index].amount -= +product.product.price;
    
    // if no qty anymore remove product from cart
    if (data[index].qty === 0) {
      data.splice(index, 1);
    }

    this.storage.set('cart', data).then((updatedProducts) => {

      // update products in cart
      this.storageProvider.getCart().subscribe(products => {
        this.products = products;
      });

      // update grand total
      this.storageProvider.getGrandTotal().subscribe(total => {
        this.total = total;
      });

    });
  }

  increment(product, index) {
    let data = this.products;
    data[index].qty += 1;
    data[index].amount += +product.product.price;

    this.storage.set('cart', data).then((updatedProducts) => {

      // update products in cart
      this.storageProvider.getCart().subscribe(products => {
        this.products = products;
      });

      // update grand total
      this.storageProvider.getGrandTotal().subscribe(total => {
        this.total = total;
      });

    });

  }

}
