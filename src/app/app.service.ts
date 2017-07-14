import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod, URLSearchParams, Jsonp } from '@angular/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class AppService {
    headers: Headers = null;

    // Observable string sources
    private nameUpdatedSource: BehaviorSubject<any> = new BehaviorSubject('');

    // Observable string streams
    nameUpdated$ = this.nameUpdatedSource.asObservable();

    constructor(private http: Http, 
                private jsonp: Jsonp) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    public setName(name: string):void {
      this.emitNameUpdatedEvent(name);
    }

    private emitNameUpdatedEvent(name: string) {
        this.nameUpdatedSource.next(name);
    }

    public handleError(error: Response) {
        //Session expired, return Forbidden or Unauthorized and redirect to login page
        return Observable.throw(error.json().error);
    }

    public getWikipediaArticles(query: string): Observable<any>{
          let search = new URLSearchParams()
          search.set('action', 'opensearch');
          search.set('search', query);
          search.set('format', 'json');
      
          return this.jsonp.get('http://en.wikipedia.org/w/api.php?callback=JSONP_CALLBACK', {search})
                 .map((request) => request.json()[1]);
    }
}
