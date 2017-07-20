import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WikiComponent} from './ds/wiki.component';
import { DSComponent }  from './ds/ds.component';
import { YoutubeComponent }  from './ds/youtube.component';
import { SpotifyComponent }  from './ds/spotify.component';

export const routes: Routes = [
  {path: 'ds/wiki', component: WikiComponent},
  {path: 'ds', component: DSComponent},
  {path: 'ds/youtube', component: YoutubeComponent},
  {path: 'ds/spotify', component: SpotifyComponent}
  // { path: 'ds', loadChildren: 'app/ds/ds.module#DSModule' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
