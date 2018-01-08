import { ProductsInCategoryPage } from './../products-in-category/products-in-category';
import { HerokuApiProvider } from './../../providers/heroku-api/heroku-api';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { WoocommerceApiProvider } from '../../providers/woocommerce-api/woocommerce-api';



@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage implements OnInit{

  homePage;
  categories;

  @ViewChild('content') nav: NavController;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: WoocommerceApiProvider,
    public heroku: HerokuApiProvider
  ) {
    this.homePage = HomePage;
  }

  ngOnInit() {
    // WoocommerceApiProvider
    //=============================================================
    // this.http.get('products/categories').then(res => {
    //   this.categories = res;
    //   console.log('categories', res);
    // });

    // heroku api
    //=============================================================
    this.heroku.get('products/categories').subscribe(categories => {
      
      const promise = categories.map((category, index) => {
        switch (category.slug) {
          case 'technology':
            categories[index]['icon'] = 'md-bulb';
            break;

          case 'featured':
            categories[index]['icon'] = 'ios-camera-outline';
            break;

          case 'cellfones':
            categories[index]['icon'] = 'md-phone-portrait';
            break;
            
          case 'clothing':
            categories[index]['icon'] = 'ios-shirt-outline';
            break;
          
        }

      });

      Promise.all(promise).then(() => {
        this.categories = categories;
      });
    });
  }

  goToHome() {
    this.nav.setRoot(HomePage);
  }

  goToCategory(category) {
    this.nav.setRoot(ProductsInCategoryPage, { category });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
