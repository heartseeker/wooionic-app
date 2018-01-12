import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list/product-list';
import { MainPipeModule } from '../app/main-pipe.module';
import { SearchbarComponent } from './searchbar/searchbar';

@NgModule({
  declarations: [
    ProductListComponent,
    SearchbarComponent,
  ],
  imports: [
    IonicModule,
	MainPipeModule
  ],
  exports: [
    ProductListComponent,
    SearchbarComponent,
  ],
})


export class ComponentsModule {}
