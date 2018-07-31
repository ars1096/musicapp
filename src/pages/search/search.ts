import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController} from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {SongService} from "../../providers/song-service";
import {SongModel} from "../../models/songModel/songModel.model";
import firebase from 'firebase';
import {SignInPage} from "../sign-in/sign-in";
import {PlayerPage} from "../player/player";
import {PlaylistPage} from "../playlist/playlist";
import {PlaylistModel} from "../../models/playlistModel/playlistModel.model";
import {MylistPage} from "../mylist/mylist";
import {ProfilePage} from "../profile/profile";
import {HomePage} from "../home/home";
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
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
  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingController: LoadingController, private songs: SongService ) {
    this.songsTRef = firebase.database().ref('/songs');
    this.playlistsTRef = firebase.database().ref('/playlists');



    this.songsTRef.on('value', songsTList => {
      let songsT = [];
      songsTList.forEach( songT => {
        songsT.push(songT.val());
        return false;
      });

      this.songsTList = songsT;
      this.loadedSongsTList = songsT;
    });

    this.playlistsTRef.on('value', playlistsTList => {
      let playlistsT = [];
      playlistsTList.forEach( playlistT => {
        playlistsT.push(playlistT.val());
        return false;
      });

      this.playlistsTList = playlistsT;
      this.loadedPlaylistsTList = playlistsT;
    });


  }

  initializeSongs(): void {
    this.songsTList = this.loadedSongsTList;
    this.playlistsTList = this.loadedPlaylistsTList;
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

  getSong(searchbar) {
    // Reset items back to all of the items
    this.initializeSongs();

    // set q to the value of the searchbar
    var query = searchbar.srcElement.value;


    // if the value is an empty string don't filter the items
    if (!query) {
      return;
    }

    this.songsTList = this.songsTList.filter((v) => {
      if(v.titulo && query) {
        if (v.titulo.toLowerCase().indexOf(query.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

  }

  moveHome(){

  }

  getList(searchbar) {
    // Reset items back to all of the items
    this.initializeSongs();

    // set q to the value of the searchbar
    var query = searchbar.srcElement.value;


    // if the value is an empty string don't filter the items
    if (!query) {
      return;
    }

    this.playlistsTList = this.playlistsTList.filter((v) => {
      if(v.titulo && query) {
        if (v.titulo.toLowerCase().indexOf(query.toLowerCase()) > -1) {
          return true;
        }
        return false;
      }
    });

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




}
