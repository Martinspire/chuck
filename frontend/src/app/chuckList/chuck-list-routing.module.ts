import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChuckListComponent } from './chuck-list-component/chuck-list.component';

const routes: Routes = [
  { path: 'chucklist',  component: ChuckListComponent, data: { animation: 'jokes' } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChuckListRoutingModule { }
