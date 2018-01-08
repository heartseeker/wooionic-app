import { IonicModule } from 'ionic-angular';
import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list/product-list';
import { MainPipeModule } from '../app/main-pipe.module';

@NgModule({
  declarations: [
    ProductListComponent,
  ],
  imports: [
    IonicModule,
	MainPipeModule
  ],
  exports: [
    ProductListComponent,
  ],
})


export class ComponentsModule {}
