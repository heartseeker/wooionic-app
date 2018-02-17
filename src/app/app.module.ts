import { LoginPage } from './../pages/login/login';
import { SignupPage } from './../pages/signup/signup';
import { SearchPage } from './../pages/search/search';
import { ComponentsModule } from './../components/components.module';
import { ProductsInCategoryPage } from './../pages/products-in-category/products-in-category';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WoocommerceApiProvider } from '../providers/woocommerce-api/woocommerce-api';
import { HerokuApiProvider } from '../providers/heroku-api/heroku-api';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MainPipeModule } from './main-pipe.module';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { CartPage } from '../pages/cart/cart';
import { IonicStorageModule } from '@ionic/storage';
import { StorageProvider } from '../providers/storage/storage';
import { AuthProvider } from '../providers/auth/auth';
import { OrdersPage } from '../pages/orders/orders';
import { CheckoutPage } from '../pages/checkout/checkout';
import { OrdersProductPage } from '../pages/orders-product/orders-product';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProductsInCategoryPage,
    ProductDetailPage,
    CartPage,
    SearchPage,
    SignupPage,
    LoginPage,
    OrdersPage,
    CheckoutPage,
    OrdersProductPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    MainPipeModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProductsInCategoryPage,
    ProductDetailPage,
    CartPage,
    SearchPage,
    SignupPage,
    LoginPage,
    OrdersPage,
    CheckoutPage,
    OrdersProductPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WoocommerceApiProvider,
    HerokuApiProvider,
    StorageProvider,
    AuthProvider
  ]
})
export class AppModule {}
