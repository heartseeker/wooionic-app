import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { HerokuApiProvider } from '../../providers/heroku-api/heroku-api';
import { CartPage } from '../cart/cart';

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage implements OnInit{

  product;
  reviews = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public heroku: HerokuApiProvider,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController
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
    this.modalCtrl.create(CartPage).present();
  }

}
