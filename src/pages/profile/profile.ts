import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {ProfileModel} from "../../models/profileModel/profile.model";
import {AngularFireAuth} from "angularfire2/auth";
import {AngularFireDatabase} from "angularfire2/database";
import {FirebaseObjectObservable} from "angularfire2/database-deprecated";
import * as firebase from "firebase";
import {SongService} from "../../providers/song-service";


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  profileData :  FirebaseObjectObservable<ProfileModel>;
  dato : any;
  user : any;
  private profile ;

  constructor(public navCtrl: NavController, private  songSvc: SongService, public navParams: NavParams, private afAuth : AngularFireAuth, private af : AngularFireDatabase, private toast: ToastController) {
    this.user = firebase.auth().currentUser.uid;

    this.songSvc
      .getProfile(this.user);

    console.log(this.songSvc.currentProfile);
  }


  ionViewDidLoad() {

    this.af.list(`profile/${this.user}`).valueChanges();


  }

  // createProfile(){
  //   this.afAuth.authState.subscribe(auth =>
  //   this.af.list(`profile/${auth.uid}`).push(this.profile))
  //
  // }

}
