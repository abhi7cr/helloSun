import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { CommonModule} from '@angular/common';

@NgModule({
  exports: [
    FormsModule,
    CommonModule,
    NgbModule
  ]
})
export class SharedModule { }
