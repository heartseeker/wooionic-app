import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RequestOptions, Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the HerokuApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HerokuApiProvider {

  constructor(
    public http: Http
  ) {
  }

  get(url: string) {
    const headers = new Headers({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    const options = new RequestOptions({ headers: headers });
    return this.http.get(environment.heroku.url + url, options).map(res => res.json());
  }

  post(url: string, body) {
    const headers = new Headers({ 
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    const options = new RequestOptions({ headers: headers });
    return this.http.post(environment.heroku.url + url, body, options).map(res => res.json());
  }

}
