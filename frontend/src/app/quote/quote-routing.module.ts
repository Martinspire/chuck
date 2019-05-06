import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuoteComponent } from './quote-component/quote.component';

const routes: Routes = [
  { path: 'quote',  component: QuoteComponent, data: { animation: 'joke' } }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuoteRoutingModule { }
