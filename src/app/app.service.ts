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
    broker: any = undefined;
    _accessToken: string = undefined;
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

    public saveBroker(broker: any){
          this.broker = broker;
    }
    public getBroker(){
        return this.broker;
    }

    public get accessToken(){
            return this._accessToken;
    }

    public set accessToken(accessToken){
        this._accessToken = accessToken;
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

    public getSpotifyTracks(url:string, code: string): Observable<any>{
         let headers = new Headers();
            headers.append('Authorization', 'Bearer ' + code);
            headers.append('Accept', 'application/json');
         return Observable.fromPromise(fetch(url, 
                                {
                                   headers: {'Authorization': 'Bearer ' + code}, 
                                   method: 'GET', 
                                   cache: 'default'
                                

                                 }).then(res => {
                                  if(res.status === 401)
                                    throw new Error('Unauthorized');
                                  else 
                                    return res;
                                 }));
                          
           
            // let options = new RequestOptions({
            // method: RequestMethod.Get,
            // headers: headers

      // return this.http.get(url, options)
      //   .map((res: Response) => res.json())
      //       .catch(this.handleError)
    } 


}
