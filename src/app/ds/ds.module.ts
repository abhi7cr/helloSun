import { NgModule } from '@angular/core';

import { DSComponent } from './ds.component';
import { WikiComponent } from './wiki.component';
import { YoutubeComponent } from './youtube.component';

import { SharedModule } from '../shared/shared.module';
import { DSRoutingModule } from './ds-routing.module';

@NgModule({
  declarations: [
    DSComponent,
    WikiComponent,
    YoutubeComponent
  ],
  imports: [
    SharedModule,
    DSRoutingModule
  ],
  exports: [
    DSComponent,
    WikiComponent,
    YoutubeComponent
  ],
  providers: [],
})
export class DSModule { }
