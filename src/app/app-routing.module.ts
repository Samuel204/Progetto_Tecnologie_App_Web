import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes} from "@angular/router";
import {WaitressComponent} from '.components/waitress/waitress.component';

const routes: Routes [
  { path: 'waitress', component: waitress}
  ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class AppRoutingModule { }
