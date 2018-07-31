import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import {MylistPage} from "../mylist/mylist";
import { AuthService } from "../../providers/auth-service";
import { UserModel } from '../../models/userModel/userModel.model';
import { SignInPage } from "../sign-in/sign-in";
import {ProfilePage} from "../profile/profile";
import {SearchPage} from "../search/search";
import {LoadingController} from "ionic-angular";
import {SongModel} from "../../models/songModel/songModel.model";
import {SongService} from "../../providers/song-service";
import {PlayerPage} from "../player/player";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  ImageArray: any = [];
  curUser = firebase.auth().currentUser;
  email = "";
  emailVer = false;
  songs: any;
  old : any;
  public lastSongs: firebase.database.Reference;
  songsList$ : Observable<SongModel[]>;
  constructor(public navCtrl: NavController, private authService: AuthService, public loadingCtrl: LoadingController, private dbService: SongService) {
    this.ImageArray = [{'image': 'http://res.cloudinary.com/adrianrs/image/upload/c_scale,h_630,w_1200/v1524826570/21p1.jpg'},
      {'image': 'http://res.cloudinary.com/adrianrs/image/upload/q_77/v1524826577/bruno.jpg'},
      {'image': 'http://res.cloudinary.com/adrianrs/image/upload/v1524826581/grupo3.jpg'},

    ]

    this.lastSongs = firebase.database().ref('/songs');

    if (this.curUser != null) {
      this.email = this.curUser.email;
      this.emailVer = this.curUser.emailVerified;
    } else {
      this.email = "NOBODY";
    }
  }

  signOut() {
    this.authService.signOut();
    this.navCtrl.setRoot(SignInPage);
  }

  Move(){
    this.navCtrl.push(MylistPage);
  }

  moveSearch(){

    this.navCtrl.setRoot(SearchPage);
  }

  moveProfile(){
    this.navCtrl.push(ProfilePage);
  }

  ionViewDidLoad(){

    this.dbService.getLastSongs().subscribe(
      (data) => {this.songs = data;
      }
    );
    this.dbService.getOld().subscribe((data)=>{this.old = data;
    });
  }

  seeSong(song: SongModel){
    this.navCtrl.setRoot(PlayerPage, {song: song});

  }

  moveHome(){

    this.navCtrl.setRoot(HomePage);
  }



}
