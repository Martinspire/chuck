import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectivePreloadingStrategyService } from './shared/selective-preloading-strategy.service';

const routes: Routes = [
  { path: '',   redirectTo: '/chucklist', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {
        enableTracing: false, // <-- debugging purposes only
        preloadingStrategy: SelectivePreloadingStrategyService,
        onSameUrlNavigation: 'reload'
      })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
