import { ComponentsModule } from './../components/components.module';
import { ProductsInCategoryPage } from './../pages/products-in-category/products-in-category';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuPage } from '../pages/menu/menu';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { WoocommerceApiProvider } from '../providers/woocommerce-api/woocommerce-api';
import { HerokuApiProvider } from '../providers/heroku-api/heroku-api';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { MainPipeModule } from './main-pipe.module';
import { ProductDetailPage } from '../pages/product-detail/product-detail';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    MenuPage,
    ProductsInCategoryPage,
    ProductDetailPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    MainPipeModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MenuPage,
    ProductsInCategoryPage,
    ProductDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WoocommerceApiProvider,
    HerokuApiProvider
  ]
})
export class AppModule {}
