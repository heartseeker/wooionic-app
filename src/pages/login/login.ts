import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from '../../providers/storage/storage';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage/dist/storage';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { HomePage } from '../home/home';
import { AuthProvider } from '../../providers/auth/auth';
import { HerokuApiProvider } from '../../providers/heroku-api/heroku-api';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  cartQty;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storageProvider: StorageProvider,
    public http: Http,
    public storage: Storage,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public auth: AuthProvider,
    private heroku: HerokuApiProvider,
  ) {
  }

  ionViewWillEnter() {
    this.storageProvider.getCartQty().subscribe(qty => {
      this.cartQty = qty;
    });
  }

  login(form) {

    const username = form.value.username;
    const password = form.value.password;

    const loader = this.loadingCtrl.create({
      content: "Please wait...",
    });

    loader.present();

    const body = { username, password };

    this.heroku.post('auth', body).subscribe(response => {
      loader.dismiss();
        
      // if error login
      //====================================================
      if (response.status === 'error') {
        const alert = this.alertCtrl.create({
          title: 'Login Error',
          subTitle: response.error,
          buttons: ['OK']
        });
        alert.present();
        return;
      } 
      
      // if successfully login
      //=====================================================
      this.auth.login(response.user);
      const alert = this.alertCtrl.create({
        title: 'Login Successful',
        subTitle: response.error,
        buttons: [{
          text: 'OK',
          handler: () => {
            if (this.navParams.get('next')) {
              this.navCtrl.push(this.navParams.get('next'));
            } else {
              this.navCtrl.setRoot(HomePage);
            }
          }
        }],
      });

      alert.present();
    });

  }

}
