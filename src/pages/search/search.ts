import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HerokuApiProvider } from '../../providers/heroku-api/heroku-api';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';



@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  search;
  products = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public heroku: HerokuApiProvider,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    this.search = this.navParams.get('search').value;

    const loader = this.loadingCtrl.create({
      content: "Please wait...",
    });

    loader.present();
    
    this.heroku.get('products?search=' + this.search).subscribe(products => {
      loader.dismiss();
      this.products = products;
    });

  }

}
