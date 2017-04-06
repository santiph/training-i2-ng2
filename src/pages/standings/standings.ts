import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as _ from 'lodash';

import { EliteAPI } from '../../shared/shared';


/*
  Generated class for the Standings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'standings',
  templateUrl: 'standings.html'
})
export class StandingsPage {

    standings: any[];
    allStandings: any[] = [];
    team: any = {};
    divisionFilter: string = 'division';

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private eliteApi: EliteAPI) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad StandingsPage');

    this.team = this.navParams.data;
    let tourneyData = this.eliteApi.getCurrentTourney();
    this.standings = tourneyData.standings;

    // this.allStandings =
    //     _.chain(this.standings)
    //         .groupBy('division')
    //         .toPairs()
    //         .map(item => _.zipObject(['divisionName', 'divisionStandings'], item))
    //         .value();

    console.log('standings:', this.standings);
    // console.log('division Standings:', this.allStandings);

    this.allStandings = tourneyData.standings;
    this.filterDivision();
  }

  getHeader(record, recordIndex, records) {

    if (recordIndex === 0 || record.division !== this.standings[recordIndex -1].division) {

      return record.division;

    } else {

      return null;
    }

  }

  filterDivision(){
    if(this.divisionFilter === 'all'){
      this.standings = this.allStandings;
    } else {
      this.standings = _.filter(this.allStandings, s => s.division === this.team.division);
    }
  }

}
