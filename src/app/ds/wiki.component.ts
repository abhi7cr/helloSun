import { Component, AfterViewInit } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import {AppService} from '../app.service';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import * as $ from 'jquery';


@Component({
  selector: 'ds-route-0',
  template: `{{title}}{{name}}<br/>
             <input type='text' id='textInput' placeholder='search wiki'/>
             <ul id="results"></ul>
             <button class="btn btn-small btn-secondary"><a routerLink="" routerLinkActive="active">Go back Home</a></button>`,
  styleUrls: ['./ds.component.css']
})
export class WikiComponent implements AfterViewInit{
  title = 'I am the second component, part of the DSModule.Looks like you have set the input to:';
  name = '';
  constructor(private sharedService: AppService){
    sharedService.nameUpdated$.subscribe(updatedName => {
      this.name = updatedName;
    },
    error => {
      console.log(error);
    });
   
  }

  ngAfterViewInit() {
     this.main();
  }

  // Search Wikipedia for a given term
   searchWikipedia = (term) => {
      return this.sharedService.getWikipediaArticles(term);
    // return $.ajax({
    //   url: 'http://en.wikipedia.org/w/api.php',
    //   dataType: 'jsonp',
    //   data: {
    //     action: 'opensearch',
    //     format: 'json',
    //     search: term
    //   }
    // }).promise();
  }

   main = () => {
    var input = $('#textInput'),
        resultsList = $('#results');

    // Get all distinct key up events from the input and only fire if long enough and distinct
    var keyup = Observable.fromEvent(<any>input, 'keyup')
      .map(function (e: any) {
        return e.target.value; // Project the text from the input
      })
      .filter(function (text) {
        return text.length > 2; // Only if the text is longer than 2 characters
      })
      .distinctUntilChanged()
      .switchMap(this.searchWikipedia)
      .subscribe(
       (data: any[]) => {
         let results = Array(...(data));
         resultsList.empty();
         results.map(x => 
                      {
                        let li = document.createElement('li');
                        li.innerText = x;
                        let anchor = document.createElement('a');
                        anchor.href = x;
                        li.appendChild(anchor);
                        resultsList.append(li);
                      });
      },
       (error) => {
        // $results
        //   .appendChild($('<li>'))
        //   .text('Error:' + error);
      });
  

}

}
