import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomepageComponent } from "./components/homepage/homepage.component";
import {RouterOutlet} from "@angular/router";
import {WaitressComponent} from "./components/waitress/waitress.component";
import { CooksComponent } from './components/cooks/cooks.component';
import { BartendersComponent } from './components/bartenders/bartenders.component';
import { CashierComponent } from './components/cashier/cashier.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    WaitressComponent,
    CooksComponent,
    BartendersComponent,
    CashierComponent,
    RegistrationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
