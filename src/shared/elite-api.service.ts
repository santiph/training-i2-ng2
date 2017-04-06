import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EliteAPI {

    private baseUrl = 'https://elite-schedule-app-i2-60a7c.firebaseio.com/';
    currentTourney: any = {};
    private tournetData = {};

    constructor(private http: Http) { }

    getTournaments() {
        return new Promise(resolve => {
            this.http.get(`${this.baseUrl}/tournaments.json`)
                .subscribe(res => resolve(res.json()));
        });
    }

    getTournamentData(tourneyId, forceRefresh: boolean = false) : Observable<any> {
        if (!forceRefresh && this.tournetData[tourneyId]) {
            this.currentTourney = this.tournetData[tourneyId];
            console.log('**no need to make HTTP call, just return the data');
            return Observable.of(this.currentTourney);
        }

        // don't have data yet
        console.log('**about to make HTTP call');
        return this.http.get(`${this.baseUrl}/tournaments-data/${tourneyId}.json`)
            .map((response) => {
                this.tournetData[tourneyId] = response.json();
                this.currentTourney = this.tournetData[tourneyId];
                return this.currentTourney;
            });
    }

    getCurrentTourney() {
        return this.currentTourney;
    }

    refreshCurrentTourney() {
        return this.getTournamentData(this.currentTourney.tournament.id, true);
    }
}
