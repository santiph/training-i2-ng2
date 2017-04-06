import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { MyApp } from './app.component';

import { GamePage, MapPage, MyTeamsPage, StandingsPage, TeamHomePage, TeamsPage, TeamDetailPage, TournamentsPage } from '../pages/pages';
import { EliteAPI, UserSettings } from '../shared/shared';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    GamePage,
    MapPage,
    MyTeamsPage,
    StandingsPage,
    TeamHomePage,
    TeamsPage,
    TeamDetailPage,
    TournamentsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['localstorage']
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAxnQltfbcYMNGeYUxf65PRmCljjiVbDuE'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GamePage,
    MapPage,
    MyTeamsPage,
    StandingsPage,
    TeamHomePage,
    TeamsPage,
    TeamDetailPage,
    TournamentsPage
  ],
  providers: [
    EliteAPI,
    UserSettings,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
