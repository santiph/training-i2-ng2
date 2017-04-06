import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { EliteAPI } from '../../shared/shared'
declare var window: any;

/*
  Generated class for the Map page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  map: any = {};

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private eliteApi: EliteAPI) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');

    let games = this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTourney();
    let location = tourneyData.locations[games.locationId];

    this.map = {
        lat: location.latitude,
        lng: location.longitude,
        zoom: 12,
        markerLabel: games.location
    };
  }

  goToDirections() {
      console.log('Navigate to', `geo:${this.map.lat},${this.map.lng}?q=${this.map.lat},${this.map.lng};u=35`);
      window.location = `geo:${this.map.lat},${this.map.lng}?q=${this.map.lat},${this.map.lng};u=35`;
  }

}
