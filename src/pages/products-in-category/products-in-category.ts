import { HerokuApiProvider } from './../../providers/heroku-api/heroku-api';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-products-in-category',
  templateUrl: 'products-in-category.html',
})
export class ProductsInCategoryPage implements OnInit {

  category;
  products = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public heroku: HerokuApiProvider
  ) {
  }

  ngOnInit() {
    this.category = this.navParams.get('category');
    // heroku api
    //============================================================
    this.heroku.get('products?category=' + this.category.id).subscribe(products => {
      this.products = products;
    });
    
  }

  ionViewDidLoad() {
  }

}
