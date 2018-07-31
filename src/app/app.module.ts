import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {SearchPage} from "../pages/search/search";


import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { FIREBASE_CONFIG } from "./firebase.credentials";
import { AngularFireAuthModule } from "angularfire2/auth";

import { AuthService } from "../providers/auth-service";
import { ToastService } from "../providers/toast-service";

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignUpPage } from "../pages/sign-up/sign-up";
import { SignInPage } from "../pages/sign-in/sign-in";
import {MylistPage} from "../pages/mylist/mylist";
import {PlayerPage} from "../pages/player/player";
import {ProgressBarComponent} from "../components/progress-bar/progress-bar";
import { Media} from '@ionic-native/media';
import {ProfilePage} from "../pages/profile/profile";
import {SongService} from "../providers/song-service";
import {AngularFireStorageModule} from "angularfire2/storage";
import {PlaylistPage} from "../pages/playlist/playlist";


@NgModule({
  declarations: [MyApp, HomePage, SignUpPage, SignInPage, MylistPage, PlayerPage, ProgressBarComponent, ProfilePage, SearchPage, PlaylistPage],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [MyApp, HomePage, SignUpPage, SignInPage,MylistPage, PlayerPage, ProgressBarComponent, ProfilePage, SearchPage, PlaylistPage],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    ToastService,
    Media,
    SongService

  ]
})

export class AppModule {}
