import {Component, inject, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // Form group to handle login form
  public loginForm!: FormGroup;

  constructor(private authenticationService: AuthenticationService) {}

  // Lifecycle hook called after Angular has initialized all data-bound properties
  ngOnInit() {
    // Initialize the login form with email and password controls
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  // Method triggered on form submission
  public onSubmit() {
    // Call the login method from AuthenticationService with email and password
    this.authenticationService.login(
      this.loginForm.get('email')!.value,
      this.loginForm!.get('password')!.value
    )
  }
}
