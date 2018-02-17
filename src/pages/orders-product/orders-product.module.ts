import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrdersProductPage } from './orders-product';

@NgModule({
  declarations: [
    OrdersProductPage,
  ],
  imports: [
    IonicPageModule.forChild(OrdersProductPage),
  ],
})
export class OrdersProductPageModule {}
