import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';
import 'rxjs/add/operator/take';
import { AuthService } from "../../providers/auth-service";
import {ProfileModel} from "../../models/profileModel/profile.model";
import { UserModel } from "../../models/userModel/userModel.model";

import { SignInPage } from "../sign-in/sign-in";
import {SongService} from "../../providers/song-service";
import {AngularFireDatabase} from "angularfire2/database";
import {AngularFireAuth} from "angularfire2/auth";

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignUpPage {
  user: UserModel = {
    email: '',
    password: ''
  };

  profile : ProfileModel = {
    nombre: ''
  };

  constructor(public navCtrl: NavController, private afAuth : AngularFireAuth, private af : AngularFireDatabase,public loadingCtrl: LoadingController, public alertCtrl: AlertController, public authService: AuthService, private songsvc : SongService, private Angu: AngularFireDatabase, private afAu : AngularFireAuth) {}

  signUp() {
    let loading = this.loadingCtrl.create({
      content: "Registrando usuario. Por favor, espere..."
    });
    loading.present();
    this.authService.createUserWithEmailAndPassword(this.user).then(result => {
      let curUser = firebase.auth().currentUser;
      curUser.sendEmailVerification();
      
      loading.dismiss();

      this.alert('Verificación de correo electrónico', 'Le hemos enviado un mensaje para verificar su correo electrónico.');

      this.navCtrl.setRoot(SignInPage);
    }).catch(error => {
      loading.dismiss();

      console.log(error);
      this.alert('Error', 'Correo ya en uso.');
    });
  }

  alert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    this.createProfile();
    alert.present();
  }

  createProfile(){
        this.afAuth.authState.take(1).subscribe(auth => {
          this.af.object(`profile/${auth.uid}`).set(this.profile)
            .then(() => this.navCtrl.setRoot('ProfilePage'))
        });

    // this.songsvc.createProfile(profile).then(ref => {
    //     console.log(ref.key);
    // });
  }

}
