import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TeamHomePage, MapPage } from '../pages';
import { EliteAPI } from '../../shared/shared';

/*
  Generated class for the Game page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage {

  game: any = {};

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private eliteApi: EliteAPI) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
    this.game = this.navParams.data;
    this.game.gameTime = Date.parse(this.game.time);
  }

  teamTapped(teamId) {
    let tourneyData = this.eliteApi.getCurrentTourney();
    let team = tourneyData.teams.find(t => t.id === teamId);
    this.navCtrl.push(TeamHomePage, team);
  }

  isWinner(team1Score, team2Score) {
    return Number(team1Score) > Number(team2Score);
  }

  goToMap() {
    this.navCtrl.push(MapPage, this.game);
  }
  goToDirections() {}
}
