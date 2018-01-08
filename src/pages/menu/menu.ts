import { HerokuApiProvider } from './../../providers/heroku-api/heroku-api';
import { Component, OnInit } from '@angular/core';
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
            categories[index]['icon'] = 'md-camera';
            break;

          case 'cellfones':
            categories[index]['icon'] = 'ios-phone-portrait';
            break;
          
        }

      });

      Promise.all(promise).then(() => {
        this.categories = categories;
      });

      console.log('categories', categories);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
