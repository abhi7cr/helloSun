import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';

import {SharedService} from './shared.service';

@NgModule({
  exports: [
    FormsModule,
    CommonModule,
    NgbModule,
    HttpModule
  ],
  providers:[SharedService]
})
export class SharedModule { }
