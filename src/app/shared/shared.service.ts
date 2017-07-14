import { Injectable, Output, EventEmitter } from '@angular/core';
import { Http, Response, Headers, Request, RequestOptions, RequestMethod, URLSearchParams } from '@angular/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SharedService {
    headers: Headers = null;

    // Observable string sources
    private nameUpdatedSource: BehaviorSubject<any> = new BehaviorSubject('');

    // Observable string streams
    nameUpdated$ = this.nameUpdatedSource.asObservable();

    constructor(private http: Http) {
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
}
