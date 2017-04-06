import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TeamHomePage, TournamentsPage } from '../pages';

import { EliteAPI, UserSettings } from '../../shared/shared';
/*
  Generated class for the MyTeams page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html'
})
export class MyTeamsPage {

  favorites: any = [
    // {
    //   team: { id: 6182, name: 'HC Elite 7th', coach: 'Michelotti'},
    //   tournamentId: '89e13aa2-ba6d-4f55-9cc2-61eba6172c63',
    //   tournamentName: 'March Madness Tournament'
    // },
    // {
    //   team: { id: 805, name: 'HC Elite', coach: 'Michelotti'},
    //   tournamentId: '98c6857e-b0d1-4295-b89e-2d95a45437f2',
    //   tournamentName: 'Holiday Hoops Challenge'
    // }
  ];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private eliteApi: EliteAPI,
    private userSettings: UserSettings,
    private loadingController: LoadingController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTeamsPage');
  }

  ionViewDidEnter() {
      this.userSettings.getAllFavorites().then(favs => this.favorites = favs);
  }

  goToTournaments() {
      this.navCtrl.push(TournamentsPage);
  }

  favoriteTapped($event, favorite) {
    let loader = this.loadingController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    this.eliteApi.getTournamentData(favorite.tournamentId)
      .subscribe(t => this.navCtrl.push(TeamHomePage, favorite.team));
  }

}
