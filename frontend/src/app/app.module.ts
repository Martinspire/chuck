import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/angular-material.module';

import { ChuckListModule } from './chuckList/chuck-list.module';
import { PageNotFoundModule } from './page-not-found/page-not-found.module';
import { QuoteModule } from './quote/quote.module';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,

    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,

    ChuckListModule,
    QuoteModule,
    UserModule,
    PageNotFoundModule // this last so the 404 does't override the normal urls
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
