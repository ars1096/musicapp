import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import  * as SoundboardMapping from '../../models/soundboard/soundboard.mapping';
import {Media, MediaObject} from '@ionic-native/media';
import {SongModel} from "../../models/songModel/songModel.model";
import {SongService} from "../../providers/song-service";
import * as firebase from "firebase";
import {HomePage} from "../home/home";

/**
 * Generated class for the PlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player',
  templateUrl: 'player.html',
})
export class PlayerPage {
  private currentUser = firebase.auth().currentUser;
  public soundboardData: SoundboardMapping.SoundboardMap[];

  canciones: any;

  public playing: boolean = false;
  currentTrack: any;
  progressInterval: any;
  primera : boolean;
  private file: MediaObject;
  private song;
  like : boolean= false;
  count : number;

  constructor(public navCtrl: NavController, public navParams: NavParams, private media: Media, private songSvc: SongService  ) {
    this.soundboardData = SoundboardMapping.SounboardMock;

    this.song = navParams.get('song');
    // this.count = parseInt(this.song.nreproducciones);
    // this.song.nreproducciones.setValue(this.count.toString())
    // this.songSvc.updateSongNPlays(this.count + 1, this.song.key  );


    // nextTrack() {
    //
    //   let index = this.canciones.indexOf(this.currentTrack);
    //   index >= this.canciones.length - 1 ? index = 0 : index++;
    //
    //   this.playTrack(this.canciones[index]);
    //
    // }
    //
    // prevTrack() {
    //
    //   let index = this.canciones.indexOf(this.currentTrack);
    //   index > 0 ? index-- : index = this.canciones.length - 1;
    //
    //   this.playTrack(this.canciones[index]);
    //
    // }
  }
  public playSound(){
    if(this.primera = true) {


      this.file = this.media.create(this.song.url);
    }
    this.primera = false;
    this.playing = true;
    this.file.play();

  }

  public pauseSound(){
    this.file.pause();
    this.playing = false;
  }

  public likeSong(){
    this.like = true;
    this.songSvc.likeSong(this.song);
  }

  public  disLikeSong(){
    this.like = false;
    this.songSvc.dislikeSong(this.song);
  }

  public position(){
    this.file.getCurrentPosition().then((position) => {
      console.log(position);
    });
  }

  moveHome(){

    this.navCtrl.setRoot(HomePage);
  }

}


