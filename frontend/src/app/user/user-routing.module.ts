import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserComponent } from './user-component/user.component';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent,
    data: { animation: 'jokes' },
  },
  {
    path: 'user/login',
    component: LoginComponent,
    data: { animation: 'joke' },
  },
  {
    path: 'user/create',
    component: CreateComponent,
    data: { animation: 'joke' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
