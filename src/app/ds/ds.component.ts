import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { SharedService } from '../shared/shared.service';
import {AppService} from '../app.service';

@Component({
  selector: 'ds',
  templateUrl: './ds.component.html',
  styleUrls: ['./ds.component.css']
})
export class DSComponent implements OnInit, OnChanges {
  title = 'Welcome to DragonSpears Angular Guide (I am part of the DSComponent)';
  name: string;
  type: string;
  constructor(private sharedService: AppService){
    this.type = 'info';
    this.name = '';
    sharedService.nameUpdated$.subscribe(updatedName => {
      this.name = updatedName;
      this.type = this.name === 'clicked'?'info':'success';
    },
    error => {
      console.log(error);
    });
  }

  ngOnInit(){
  }

  ngOnChanges() {
  }
}
