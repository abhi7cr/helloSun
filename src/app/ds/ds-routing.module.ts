import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DSComponent }  from './ds.component';
import { WikiComponent }  from './wiki.component';
import { YoutubeComponent }  from './youtube.component';
import { SpotifyComponent }  from './spotify.component';

const routes: Routes = [
  { path: '', component: DSComponent },
  { path: 'wiki', component: WikiComponent },
  { path: 'youtube', component: YoutubeComponent },
  { path: 'spotify', component: SpotifyComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DSRoutingModule {}
