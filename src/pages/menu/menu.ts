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
    public http: WoocommerceApiProvider
  ) {
    this.homePage = HomePage;
  }

  ngOnInit() {
    this.http.get('products/categories').then(res => {
      this.categories = res;
      console.log('categories', res);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
