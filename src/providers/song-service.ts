import {Injectable} from "@angular/core";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {AngularFireStorage} from "angularfire2/storage";
import {SongModel} from "../models/songModel/songModel.model";
import {PlaylistModel} from "../models/playlistModel/playlistModel.model";
import {PlaylistSongsModel} from "../models/playlistSongs/playlistSongs.model";
import {ProfileModel} from "../models/profileModel/profile.model";
import * as firebase from "firebase";


@Injectable()
export class SongService {
  private songsList = this.db.list<SongModel>('songs/');
  private playlistsList = this.db.list<PlaylistModel>('playlists/');
  private playlistsSongsList;
  num : number;
  random : string;
  array :[string];
  currentProfile: any = {};

  constructor(private db: AngularFireDatabase, private st: AngularFireStorage){}
  arr: any = [
    { string: "autor"},
    {string: "url"},
    { string : "portada"},
    {string: "duracion"}
  ];
  getSongs() {
    return this.songsList.valueChanges();
  }
  getProfile(uid: string) {
    return this.db.object(`profile/${uid}`)
      .valueChanges()
      .map(resp => {this.currentProfile = resp});
  }

  getPlaylists() {
    return this.playlistsList.valueChanges();
  }

  getPlaylistsSongs(playlist: PlaylistModel) {
    this.playlistsSongsList = this.db.list<PlaylistSongsModel>(`playlistsSongs/${playlist.key}`);
    return this.playlistsSongsList.valueChanges();
  }

  getSearchSongs(start,end): AngularFireList<any>{
    return this.db.list('/songs'&&'/playlist', ref =>
      ref.orderByChild('titulo').limitToFirst(10).startAt(start).endAt(end))
  }

  getLastSongs(){
    return this.db.list('/songs', ref =>
      ref.orderByChild("fecha").limitToLast(5)
    ).valueChanges();
  }

  getOld(){
    return this.db.list('/songs', ref =>
      ref.orderByChild("fecha").limitToFirst(5)
    ).valueChanges();
  }


  likeSong(song: SongModel) {
    this.db.object(`mySongs/${song.titulo}`).set(song);
  }

  dislikeSong(song: SongModel) {
    this.db.object(`mySongs/${song.titulo}`).remove();
  }

  rmSong(titulo : string){
    this.db.object(`mySongs/${titulo}`).remove();
  }




}
