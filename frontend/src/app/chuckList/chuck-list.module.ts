import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../shared/angular-material.module';

import { ChuckListRoutingModule } from './chuck-list-routing.module';
import { ChuckListComponent } from './chuck-list-component/chuck-list.component';

@NgModule({
  declarations: [ChuckListComponent],
  imports: [
    CommonModule,
    ChuckListRoutingModule,
    MaterialModule
  ]
})
export class ChuckListModule { }
