import { Component, OnInit, inject } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validator, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AppModule} from "../../app.module";
import {RouterModule} from "@angular/router";

@Component({
  selector: 'app-registration',
  standalone:true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export default class RegistrationComponent implements  OnInit{
 fb= inject(FormBuilder);

 registerForm!: FormGroup;

 ngOnInit() {
   this.registerForm = this.fb.group({
     username: ['', Validators.required],
     password: ['', Validators.required],
     role: ['', Validators.required],
     confirmPassword: ['', Validators.required]

   });
 }
  register()
  {
    console.log(this.registerForm.value);

  }
}




