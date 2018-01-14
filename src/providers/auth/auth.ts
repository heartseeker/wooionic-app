import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  HAS_LOGGED_IN = 'hasLoggedIn';

  constructor(
    public storage: Storage,
    public events: Events
  ) {
    
  }

  login(user): void {
    this.storage.set(this.HAS_LOGGED_IN, true);
    this.setUsername(user);
    this.events.publish('user:login');
  };

  logout(): void {
    this.storage.remove(this.HAS_LOGGED_IN);
    this.storage.remove('auth');
    this.events.publish('user:logout');
  };

  setUsername(user): void {
    this.storage.set('auth', user);
  };

  hasLoggedIn(): Promise<boolean> {
    return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
      return value === true;
    });
  };

}
