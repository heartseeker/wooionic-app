import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductsInCategoryPage } from './products-in-category';

@NgModule({
  declarations: [
    ProductsInCategoryPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductsInCategoryPage),
  ],
})
export class ProductsInCategoryPageModule {}
