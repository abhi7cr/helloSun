// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpModule, JsonpModule} from '@angular/http';
import {WORKER_APP_LOCATION_PROVIDERS, WorkerAppModule} from '@angular/platform-webworker';
import {APP_BASE_HREF} from '@angular/common';

import { AppComponent } from './app.component';

import {AppService} from './app.service';

import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import { WindowRef } from './WindowRef';
import {DSModule} from './ds/ds.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    WorkerAppModule,
    HttpModule,
    JsonpModule,
    DSModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    SharedModule
  ],
  providers: [AppService, WORKER_APP_LOCATION_PROVIDERS,
              WindowRef,
              {provide: APP_BASE_HREF, useValue: '/'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
