import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../shared/angular-material.module';

import { QuoteRoutingModule } from './quote-routing.module';
import { QuoteComponent } from './quote-component/quote.component';

@NgModule({
  declarations: [QuoteComponent],
  imports: [
    CommonModule,
    MaterialModule,
    QuoteRoutingModule
  ]
})
export class QuoteModule { }
