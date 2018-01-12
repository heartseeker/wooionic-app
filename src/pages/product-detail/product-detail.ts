import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { HerokuApiProvider } from '../../providers/heroku-api/heroku-api';
import { CartPage } from '../cart/cart';
import { Storage } from '@ionic/storage';
import { StorageProvider } from '../../providers/storage/storage';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';


@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage implements OnInit{

  product;
  reviews = [];

  cartQty: any = 0;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public heroku: HerokuApiProvider,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    public storage: Storage,
    public storageProvider: StorageProvider,
    public toastCtrl: ToastController
  ) {
  }

  ngOnInit() {
    this.product = this.navParams.get('product');

    
  
    // get product reviews
    //==========================================================
    this.heroku.get(`product/${this.product.id}/reviews`).subscribe(reviews => {
      this.reviews = reviews;
      console.log('reviews', reviews);
    });

    this.storageProvider.getCartQty().subscribe(qty => {
      this.cartQty = qty;
    });

  }

  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }

  starLeft(number) {
    var items: number[] = [];
    const starLeft = 5 - number;
    if(number == 0)
      return [];
    for(var i = 1; i <= starLeft; i++){
      items.push(i);
    }
    return items;
  }

  openCart() {
    const modal = this.modalCtrl.create(CartPage);
    modal.present();
    modal.onDidDismiss(() => {
      this.storageProvider.getCartQty().subscribe(qty => {
        this.cartQty = qty;
      });
    }); 
  }

  addToCart(product) {
    this.storage.get('cart').then(data => {
      // check if data not exist
      let notExist = true;

      // check if cart is empty
      if(data === null || data.length === 0) {
        data = [];
        data.push({
          product: product,
          qty: 1,
          amount: +product.price
        });
      } else {
        // find the same product
        const promises = data.map((p, index) => {
          if (p.product.id === product.id) {
            notExist = false;
            data[index].qty += 1;
            data[index].amount += +p.product.price;
          }
        });

        Promise.all(promises).then(() => {
          if (notExist) {
            data.push({
              product: product,
              qty: 1,
              amount: +product.price
            });
          }
        });
        
      }

      this.storage.set('cart', data).then(() => {
        this.storageProvider.getCartQty().subscribe(qty => {
          this.cartQty = qty;
        });
        this.toastCtrl.create({
          message: '1 Product added to cart',
          duration: 1000
        }).present();
      });

      


    })
  }

}
