import { NgModule } from '@angular/core';

import { DSComponent } from './ds.component';
import { WikiComponent } from './wiki.component';
import { YoutubeComponent } from './youtube.component';
import { SpotifyComponent } from './spotify.component';

import { SharedModule } from '../shared/shared.module';
import { DSRoutingModule } from './ds-routing.module';
import {WORKER_APP_LOCATION_PROVIDERS, WorkerAppModule} from '@angular/platform-webworker';

@NgModule({
  declarations: [
    DSComponent,
    WikiComponent,
    YoutubeComponent,
    SpotifyComponent
  ],
  imports: [
    SharedModule,
    DSRoutingModule
  ],
  exports: [
    DSComponent,
    WikiComponent,
    YoutubeComponent,
    SpotifyComponent
  ],
  providers: [ WORKER_APP_LOCATION_PROVIDERS],
})
export class DSModule { }
