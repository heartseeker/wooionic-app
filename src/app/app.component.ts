import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, Platform, MenuController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { HomePage } from '../pages/home/home';
import { HerokuApiProvider } from '../providers/heroku-api/heroku-api';
import { ProductsInCategoryPage } from '../pages/products-in-category/products-in-category';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { Storage } from '@ionic/storage/dist/storage';
import { OrdersPage } from './../pages/orders/orders';



export interface PageInterface {
  title: string;
  name: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabName?: string;
  tabComponent?: any;
}

interface UserInterface {
  avatar: string;
  capabilities: any;
  description: string;
  displayname: string;
  email: string;
  firstname: string;
  id: number;
  lastname: string;
  nicename: string;
  nickname: string;
  registered: string;
  url: string;
  username: string;
}


@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  ordersPage = OrdersPage;
  categories = [];
  login = LoginPage;
  user: UserInterface = {
    avatar: null,
    capabilities: null,
    description: null,
    displayname: null,
    email: null,
    firstname: null,
    id: null,
    lastname: null,
    nicename: null,
    nickname: '',
    registered: null,
    url: null,
    username: null
  };

  // List of pages that can be navigated to from the left menu
  // the left menu only works after login
  // the login page disables the left menu
  loggedOutPages: PageInterface[] = [
    { title: 'Login', name: 'LoginPage', component: LoginPage, icon: 'log-in' },
  ];
  loggedInPages: PageInterface[] = [
    { title: 'Category', name: 'ProductsInCategoryPage', component: ProductsInCategoryPage, icon: 'person' },
  ];

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public heroku: HerokuApiProvider,
    public menu: MenuController,
    public events: Events,
    public auth: AuthProvider,
    public storage: Storage
  ) {


    this.initializeApp();

    // decide which menu items should be hidden by current login status stored in local storage
    this.auth.hasLoggedIn().then((hasLoggedIn) => {
      this.enableMenu(hasLoggedIn === true);
    });
    this.enableMenu(true);

    this.listenToLoginEvents();
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
        console.log('categories', this.categories);
      });
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  enableMenu(loggedIn: boolean) {
    this.menu.enable(loggedIn, 'loggedInMenu');
    this.menu.enable(!loggedIn, 'loggedOutMenu');
  }

  listenToLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.storage.ready().then(() => {
        this.storage.get('auth').then((data) => {
          this.user = data;
        });
      });
      this.enableMenu(true);
    });

    this.events.subscribe('user:signup', () => {
      this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      this.enableMenu(false);
    });
  }

  openCategory(category) {
    this.nav.setRoot(ProductsInCategoryPage, { category });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page);
  }

  onLogOut() {
    this.auth.logout();
  }

  
}
