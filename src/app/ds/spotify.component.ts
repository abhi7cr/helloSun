import { Component, Input, OnInit, OnChanges, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import {AppService} from '../app.service';
import { WindowRef } from '../WindowRef';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import * as $ from 'jquery';
import {UiArguments, FnArg, PRIMITIVE, SerializerTypes, ClientMessageBrokerFactory, ClientMessageBroker, MessageBus} from '@angular/platform-webworker';

const SPOTIFY_CHANNEL = 'SPOTIFY';

@Component({
  selector: 'ds',
  templateUrl: './spotify.component.html',
  styleUrls: ['./ds.component.css']
})
export class SpotifyComponent implements OnInit, OnChanges {
  title = 'Welcome to DragonSpears Angular Guide (I am part of the DSComponent)';
  name: string;
  type: string;
  client_id: string = 'dff70f42bf5847598ccf848523e77fcd';
  client_secret: string = 'f271b139245940dca859750440965687';
  scopes:string = 'user-read-private user-read-email user-library-read';
  tracks: any;
  arguments: any[];
  broker: ClientMessageBroker;
  accessToken: string;
  toggle_track: boolean = true;
  @ViewChild('spotifyMe') spotifyMe: ElementRef;
  constructor(private sharedService: AppService, 
              private winRef: WindowRef,
              private router: Router,
              private renderer: Renderer2,
              private location: Location,
              private _clientMessageBrokerFactory: ClientMessageBrokerFactory,
              private _messageBus: MessageBus){
    this.type = 'info';
    this.name = '';
    let savedBroker = this.sharedService.getBroker();
    this.broker = savedBroker !== undefined? savedBroker :
     _clientMessageBrokerFactory.createMessageBroker(SPOTIFY_CHANNEL);
    this.sharedService.saveBroker(this.broker);
   
    sharedService.nameUpdated$.subscribe(updatedName => {
      this.name = updatedName;
      this.type = this.name === 'clicked'?'info':'success';
      console.log(this.name);
    },
    error => {
      console.log(error);
    });

      if(router.url.includes('access_token') || this.accessToken !== undefined){
              this.accessToken = this.accessToken ||
                                       router.url.split('access_token=')[1]
                                      .split('&token_type')[0];
          //this.sharedService.accessToken = this.accessToken;
          this.arguments = [new FnArg(this.accessToken, PRIMITIVE)];
          let methodInfo = new UiArguments("setAccessToken", this.arguments);
          let promise = this.broker.runOnService(methodInfo, PRIMITIVE);
          promise.then(res => {
            console.log(res);
          });
          this.getTracks();
      }
   
    // (() => {
    //   const promise1 = new Promise((resolve, reject) => {
    //       resolve(123);
    //   });
    //   promise1.then((res) => {
    //     console.log('I get called:', res === 123); // I get called: true
    //   });
    // })();
   
    let methodInfo = new UiArguments("getAccessToken");
    let promise = this.broker.runOnService(methodInfo, PRIMITIVE);
    promise.then(res => {
           this.accessToken = res;
           console.log(res);
           if(this.accessToken !== null)
            this.getTracks();
      });
    }

    toggleTracks = () => {
      this.toggle_track = !this.toggle_track;
    }

    //Get user tracks from Spotify
    getTracks = () => {
            let url = 'https://api.spotify.com/v1/me/tracks';
            this.sharedService.getSpotifyTracks(url, this.accessToken).subscribe( res => {
            this.renderer.setValue(this.spotifyMe.nativeElement, '');
            res.json().then((json) => {
               let tracks = Array(...json.items);
                for(var i=0; i<tracks.length;i++){
                   this.displayResult(tracks[i]);
                 }
               });
           });
    }
  
  //Authorize Spotify user
  authorize = () => {  
        let url = 'https://accounts.spotify.com/authorize?';
        let query = 'response_type=token&client_id='+ this.client_id + '&scope=' + this.scopes;
        let urlWithQueryString = url+'&'+query;
        this.arguments = [new FnArg(urlWithQueryString, PRIMITIVE)];
        var methodInfo = new UiArguments("authorize", this.arguments);
        this.broker.runOnService(methodInfo, PRIMITIVE).then(res => {
            console.log(res);
        });
  }

   displayResult(track_obj) {
    let title = track_obj.track.name;
    let preview_url = track_obj.track.preview_url;
    let htmlString = '<div style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 25px 20px 0 rgba(0, 0, 0, 0.19)"><img src="' + track_obj.track.album.images[0].url + '" width="200" height="200"/><p style="padding:10px;">Artist:' + track_obj.track.artists[0].name + '</p><div style="padding:10px;"><p>' + title + '</p><audio controls><source src="' + preview_url + '"></audio></div></div>';
    this.tracks = this.renderer.createElement('tracks');
    this.renderer.setProperty(this.tracks, 'innerHTML',  htmlString);
    this.renderer.appendChild(this.spotifyMe.nativeElement, this.tracks);
}


  ngOnInit(){
  }

  ngOnChanges() {
  }
}