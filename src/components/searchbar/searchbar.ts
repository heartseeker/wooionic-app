import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage } from '../../pages/search/search';

/**
 * Generated class for the SearchbarComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'searchbar',
  templateUrl: 'searchbar.html'
})
export class SearchbarComponent {

  text: string;

  constructor(
    public navCtrl: NavController
  ) {}

  onSearch(search) {
    this.navCtrl.push(SearchPage, { search });
  }

}
