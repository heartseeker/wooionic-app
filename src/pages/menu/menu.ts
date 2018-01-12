import { ProductsInCategoryPage } from './../products-in-category/products-in-category';
import { HerokuApiProvider } from './../../providers/heroku-api/heroku-api';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { WoocommerceApiProvider } from '../../providers/woocommerce-api/woocommerce-api';
import { SignupPage } from '../signup/signup';
import { LoginPage } from '../login/login';
import { StorageProvider } from '../../providers/storage/storage';
import { Storage } from '@ionic/storage/dist/storage';


@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage implements OnInit{

  homePage;
  categories;
  user = false;
  isLogin;
  x = false;

  @ViewChild('content') nav: NavController;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: WoocommerceApiProvider,
    public heroku: HerokuApiProvider,
    public storageProvider: StorageProvider,
    public storage: Storage,
    public cd: ChangeDetectorRef
  ) {
    this.homePage = HomePage;
  }
  

  ionViewWillEnter() {
    this.storageProvider.getUser().subscribe(({user}) => {
      this.user = user;
      console.log(user);
    });

    // this.storageProvider.isLogin().subscribe((s) => {
    //   this.isLogin = s;
    //   console.log('login!');
    //   console.log('this.isLogin', this.isLogin);
    // });

    this.storage.ready().then(() => {
      this.storage.get('auth').then((data) => {
        if (data === null) {
          this.isLogin = 0;
        } else {
          this.isLogin = 1;
        }
        console.log('isLogin', this.isLogin);
        this.cd.detectChanges();

        console.log('get auth', data);
      });
    });
  }

  ngOnInit() {
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

  goToSignUp() {
    this.nav.setRoot(SignupPage);
  }

  goToLogin() {
    this.storageProvider.isLogin().subscribe((s) => {
      this.isLogin = s;
      this.nav.setRoot(LoginPage);
    });
  }

  onLogOut() {
    this.storage.remove('auth').then(() => {
      this.storageProvider.isLogin().subscribe((s) => {
        this.isLogin = s;
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

}
