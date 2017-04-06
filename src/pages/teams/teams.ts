import { Component } from '@angular/core';
import { LoadingController ,NavController, NavParams } from 'ionic-angular';
import * as _ from 'lodash';

import { TeamHomePage } from '../pages';
import { EliteAPI } from '../../shared/shared';
/*
  Generated class for the Teams page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-teams',
    templateUrl: 'teams.html'
})
export class TeamsPage {

    private allTeams: any;
    private allTeamsDivision: any;
    teams = [];
    queryText: string = '';

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private eliteApi: EliteAPI,
        private loadingController: LoadingController) { }

    ionViewDidLoad() {
        console.log('ionViewDidLoad TeamsPage');
        let selectedTourney = this.navParams.data;
        let loader = this.loadingController.create({
            content: 'Getting data...'
        });

        loader.present().then(() => {
            this.eliteApi.getTournamentData(selectedTourney.id).subscribe(data => {
                this.allTeams = data.teams;
                this.allTeamsDivision = _.chain(data.teams)
                        .groupBy('division')
                        .toPairs()
                        .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
                        .value();
                this.teams = this.allTeamsDivision;

                console.log('division teams', this.teams);

                loader.dismiss();
            });
        });

    }

    itemTapped($event, team) {
        this.navCtrl.push(TeamHomePage, team);
    }

    updateTeams() {
        let queryTextLower = this.queryText.toLowerCase();
        let filteredTeams = [];
        _.forEach(this.allTeamsDivision, td => {
            let teams = _.filter(td.divisionTeams, t => (<any>t).name.toLowerCase().includes(queryTextLower));
            if (teams.length) {
                filteredTeams.push({ divisionName: td.divisionName, divisionTeams: teams });
            }
        });

        this.teams = filteredTeams;
    }
}
