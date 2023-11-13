import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from "./components/homepage/homepage.component";
import {WaitressComponent} from "./components/waitress/waitress.component";
import {CooksComponent} from "./components/cooks/cooks.component";
import {BartendersComponent} from "./components/bartenders/bartenders.component";
import {CashierComponent} from "./components/cashier/cashier.component";
import {RegistrationComponent} from"./components/registration/registration.component";
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'waitress', component: WaitressComponent},
  {path: 'cooks', component: CooksComponent},
  {path: 'bartenders', component: BartendersComponent},
  {path: 'cashiers', component: CashierComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},


];

@NgModule({
  declarations: [], //HomepageComponent is declared here
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
