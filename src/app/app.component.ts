import { Component } from '@angular/core';
import {AppService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  name = 'Abhi';
  val = '';
  classList = 'col-lg-4 col-xl-4 col-md-6 col-sm-6 col-12';

  constructor(private sharedService: AppService){
  }

  setName = () => this.sharedService.setName(this.val)
}
