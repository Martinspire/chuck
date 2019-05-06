import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../shared/angular-material.module';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user-component/user.component';
import { LoginComponent } from './login/login.component';
import { CreateComponent } from './create/create.component';

@NgModule({
  declarations: [UserComponent, LoginComponent, CreateComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    UserRoutingModule
  ]
})
export class UserModule { }
