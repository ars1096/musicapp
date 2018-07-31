import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import * as firebase from 'firebase';

import { AuthService } from "../../providers/auth-service";

import { UserModel } from "../../models/userModel/userModel.model";

import { HomePage } from '../home/home';
import { SignUpPage } from "../sign-up/sign-up";

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html'
})
export class SignInPage {
  user: UserModel = {
    email: '',
    password: ''
  };

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public authService: AuthService) {}

  signIn() {
    let loading = this.loadingCtrl.create({
      content: 'Iniciando sesión. Por favor, espere...'
    });
    loading.present();

    this.authService.signInWithEmailAndPassword(this.user).then(result => {
      let curUser = firebase.auth().currentUser;

      if (curUser.emailVerified) {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
      }

      loading.dismiss();

      this.navCtrl.setRoot(HomePage);
    }).catch(error => {
      loading.dismiss();

      console.log(error);
      this.alert('Error', 'Se ha producido un error al iniciar sesión. Por favor, inténtelo de nuevo.');
    });
  }

  signUp() {
    this.navCtrl.push(SignUpPage);
  }

  alert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }
}
