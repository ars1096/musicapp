import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase/app';

import {UserModel} from "../models/userModel/userModel.model";
import {Toast} from "ionic-angular";
import {ProfileModel} from "../models/profileModel/profile.model";

@Injectable()
export class AuthService {
  user: User;

  constructor(public angularFireAuth: AngularFireAuth) {
    angularFireAuth.authState.subscribe((user: User) => {
      this.user = user;
    });
  }

  get authenticated(): boolean {
    return this.user != null;
  }

  signInWithEmailAndPassword(userModel: UserModel): Promise<void> {

    return this.angularFireAuth.auth.signInWithEmailAndPassword(userModel.email, userModel.password);
  }

  createUserWithEmailAndPassword(userModel: UserModel): Promise<void> {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(userModel.email, userModel.password);
  }



  signOut(): Promise<void> {
    return this.angularFireAuth.auth.signOut();
  }
}
