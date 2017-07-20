import { Component, Input, OnInit, OnChanges, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import {AppService} from '../app.service';
import { WindowRef } from '../WindowRef';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import * as $ from 'jquery';
import {UiArguments, FnArg, PRIMITIVE, ClientMessageBrokerFactory, ClientMessageBroker} from '@angular/platform-webworker';

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
  @ViewChild('spotifyMe') spotifyMe: ElementRef;
  constructor(private sharedService: AppService, 
              private winRef: WindowRef,
              private router: Router,
              private renderer: Renderer2,
              private location: Location,
              private _clientMessageBrokerFactory: ClientMessageBrokerFactory){
    this.type = 'info';
    this.name = '';
    
    this.broker = _clientMessageBrokerFactory.createMessageBroker(SPOTIFY_CHANNEL);
   
    sharedService.nameUpdated$.subscribe(updatedName => {
      this.name = updatedName;
      this.type = this.name === 'clicked'?'info':'success';
    },
    error => {
      console.log(error);
    });
    if(router.url.includes('access_token')){
      let code = router.url.split('access_token=')[1]
                                      .split('&token_type')[0];
      let url = 'https://api.spotify.com/v1/me/tracks';
      this.sharedService.getSpotifyTracks(url, code).subscribe( res => {
           this.renderer.setValue(this.spotifyMe.nativeElement, '');
           res.json().then((json) => {
               let tracks = Array(...json.items);
                for(var i=0; i<tracks.length;i++){
                   this.displayResult(tracks[i]);
                 }
               });
           })
     }
    }
  

  authorize = () => {  
        let url = 'https://accounts.spotify.com/authorize?';
        let redirect_uri = this.router.url === '/ds/spotify'? 'http://localhost:1333' + this.router.url : this.router.url;
        let query = 'response_type=token&client_id='+ this.client_id + '&scope=' + this.scopes + '&redirect_uri='+ redirect_uri;
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
  let htmlString = title + '<br/><audio controls><source src="' + preview_url + '"></audio><br/>';
    this.tracks = this.renderer.createElement('tracks');
    this.renderer.setProperty(this.tracks, 'innerHTML',  htmlString);
    this.renderer.appendChild(this.spotifyMe.nativeElement, this.tracks);
}


  ngOnInit(){
  }

  ngOnChanges() {
  }
}