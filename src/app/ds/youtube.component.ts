import { Component, Input, OnInit, OnChanges, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import {AppService} from '../app.service';
import * as $ from 'jquery';
import { WindowRef } from '../WindowRef';
declare var gapi: any;
@Component({
  selector: 'youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./ds.component.css']
})
export class YoutubeComponent implements OnInit, OnChanges, AfterViewInit {
  CLIENT_ID = '557232627676-7tvbo2nlvar3hgg2jav9ppilqtupg8f3.apps.googleusercontent.com';
  CLIENT_ID_NEW = '557232627676-b1b9c5hknvlcvr1l4l5shunv4ubpdbsg.apps.googleusercontent.com';

  // Array of API discovery doc URLs for APIs used by the quickstart
  DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];

  // Authorization scopes required by the API. If using multiple scopes,
  SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

  authorizeButton: any;
  signoutButton: any;
  playlistId: any;
  nextPageToken: any;
  prevPageToken: any;
  username: string;
  caption: string;
  imgUrl: string;
  
  constructor(private sharedService: AppService,
              private cdRef: ChangeDetectorRef,
              private winRef:WindowRef){
  }

  ngOnInit(){
  }

  ngAfterViewInit() {
     this.authorizeButton = this.winRef.nativeWindow().document.getElementById('authorize-button');
     this.signoutButton = this.winRef.nativeWindow().document.getElementById('signout-button');
     $('#search-button').attr('disabled', 'true');
     this.handleClientLoad();
  }

  ngOnChanges() {
  }

// Client ID and API key from the Developer Console
    

      /**
       *  On load, called to load the auth2 library and API client library.
       */
   handleClientLoad = () => {
        gapi.load('client:auth2', this.initClient);
    }

    handleAPILoaded = () => {
       $('#search-button').removeAttr('disabled');
       this.requestUserUploadsPlaylistId();
   }

     loadAPIClientInterfaces = () => {
        gapi.client.load('youtube', 'v3', ()=> {
          this.handleAPILoaded();
          })
      };

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
       initClient = () => {
        gapi.client.init({
          discoveryDocs: this.DISCOVERY_DOCS,
          clientId: this.CLIENT_ID_NEW,
          scope: this.SCOPES
        }).then( () => {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);

          // Handle the initial sign-in state.
          this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          this.authorizeButton.onclick = this.handleAuthClick;
          this.signoutButton.onclick = this.handleSignoutClick;
        });
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
       updateSigninStatus = (isSignedIn) => {
        if (isSignedIn) {
          this.authorizeButton.style.display = 'none';
          this.signoutButton.style.display = 'block';
          this.loadAPIClientInterfaces();
        } else {
          this.authorizeButton.style.display = 'block';
          this.signoutButton.style.display = 'none';
        }
      }

      /**
       *  Sign in the user upon button click.
       */
       handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }

      /**
       *  Sign out the user upon button click.
       */
       handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }


      /**
       * Print files.
       */
       requestUserUploadsPlaylistId = () => {
        var request = gapi.client.youtube.channels.list({
          mine: true,
          part: 'snippet,contentDetails'
        });
        request.execute((response)  => {
         this.username = response.result.items[0].snippet.title;
         this.caption = response.result.items[0].snippet.description;
         this.imgUrl = response.result.items[0].snippet.thumbnails.high.url;
         this.playlistId = response.result.items[0].contentDetails.relatedPlaylists.uploads;
         this.cdRef.detectChanges();
         this.requestVideoPlaylist(this.playlistId);
        });
      }

   // Retrieve the list of videos in the specified playlist.
    requestVideoPlaylist = (playlistId, pageToken?) => {
      $('#video-container').html('');
      var requestOptions = {
            playlistId: playlistId,
            part: 'snippet',
            maxResults: 10
        };
      if (pageToken) {
          requestOptions['pageToken'] = pageToken;
      }
  var request = gapi.client.youtube.playlistItems.list(requestOptions);
  request.execute((response) => {
    // Only show pagination buttons if there is a pagination token for the
    // next or previous page of results.
    this.nextPageToken = response.result.nextPageToken;
    var nextVis = this.nextPageToken ? 'visible' : 'hidden';
    $('#next-button').css('visibility', nextVis);
    this.prevPageToken = response.result.prevPageToken
    var prevVis = this.prevPageToken ? 'visible' : 'hidden';
    $('#prev-button').css('visibility', prevVis);
     $('#video-container').empty();
    var playlistItems = response.result.items;
    if (playlistItems) {
      $.each(playlistItems, (index, item) => {
        this.displayResult(item.snippet, 'playlist');
      });
    } else {
      $('#video-container').html('Sorry you have no uploaded videos');
    }
  });
}

      // Create a listing for a video.
 displayResult(videoSnippet, action) {
  let title = videoSnippet.title;
  let id = videoSnippet.resourceId.videoId;
  let videoId =  'http://youtube.com/watch?v=' + id;
  let htmlString = '<a href="' + videoId + '">' + title + '</a><br/>';
  if(action === 'playlist')
    $('#video-container').append(htmlString);
  else if(action === 'search')
    $('#search-container').append(htmlString);
}

// Retrieve the next page of videos in the playlist.
 nextPage() {
  this.requestVideoPlaylist(this.playlistId, this.nextPageToken);
}

// Retrieve the previous page of videos in the playlist.
 previousPage() {
  this.requestVideoPlaylist(this.playlistId, this.prevPageToken);
}

// Search for a specified string.
 search = () => {
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet'
  });

  request.execute((response) => {
    var str = JSON.stringify(response.result);
     $('#search-container').empty();
    $.each(response.result.items, (index, item) => {
        item.snippet['resourceId'] = {}
        item.snippet['resourceId']['videoId'] = item.id.videoId;
        this.displayResult(item.snippet, 'search');
      });
  });
}
}