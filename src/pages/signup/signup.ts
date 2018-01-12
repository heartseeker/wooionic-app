import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { StorageProvider } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  newUser = {};
  countries$;
  cartQty = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public http: Http,
    public storageProvider: StorageProvider
  ) {
  }

  ionViewDidLoad() {
    this.countries$ = this.http.get('https://restcountries.eu/rest/v2/all').map(res => res.json());

    this.storageProvider.getCartQty().subscribe(qty => {
      this.cartQty = qty;
    });
  }

  signUp() {
    
  }

}
