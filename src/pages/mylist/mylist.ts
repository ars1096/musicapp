import { Component } from '@angular/core';
import {IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ModalController} from "ionic-angular";
import {PlayerPage} from "../player/player";
import {SongModel} from "../../models/songModel/songModel.model";
import {Observable} from "rxjs/Observable";
import {SongService} from "../../providers/song-service";
import {PlaylistPage} from "../playlist/playlist";
import firebase from "firebase";
import {PlaylistModel} from "../../models/playlistModel/playlistModel.model";
import {SearchPage} from "../search/search";
import {ProfilePage} from "../profile/profile";
import {HomePage} from "../home/home";

/**
 * Generated class for the MylistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mylist',
  templateUrl: 'mylist.html',
})
export class MylistPage {

  spiner : boolean = true;
  array: any;

  searchQuery: string = '';
  queryText: string;
  segments : String = "List";

  public songsTList: Array<any>;
  public loadedSongsTList: Array<any>;
  public songsTRef: firebase.database.Reference;
  public playlistsTList: Array<any>;
  public loadedPlaylistsTList: Array<any>;
  public playlistsTRef: firebase.database.Reference;
  load: any;

  public isSearchbarOpened = false;
  songsList$ : Observable<SongModel[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, private songSvc: SongService, private loadingController: LoadingController, private songs: SongService ) {
    this.songsTRef = firebase.database().ref('/mySongs');
    this.songsTRef.on('value', songsTList => {
      let songsT = [];
      songsTList.forEach( songT => {
        songsT.push(songT.val());
        return false;
      });

      this.songsTList = songsT;
      this.loadedSongsTList = songsT;
    });




  }

  initializeSongs(): void {
    this.songsTList = this.loadedSongsTList;
  }

  ionViewDidLoad(){
    let loader = this.loadingController.create({
      content: 'Componiendo las canciones...',
      spinner: 'ios'
    });
    loader.present().then(()=>{
      this.songs.getSongs().subscribe(
        (data) => {this.load= data;
          loader.dismiss();
        }
      );
    })
  }

  disLikeSong(song: any){
    this.songSvc.rmSong(song);
  }


  seeSong(song: SongModel){
    this.navCtrl.push(PlayerPage, {song: song});

  }
  seePlaylist(playlist: PlaylistModel){
    this.navCtrl.setRoot(PlaylistPage, {playlist: playlist});
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

  moveHome(){

    this.navCtrl.setRoot(HomePage);
  }

}
