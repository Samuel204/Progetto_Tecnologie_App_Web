import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export  class RegistrationComponent implements  OnInit{
  public registerForm!: FormGroup;
  // Flag to indicate whether an account with the same email already exists
  public accountExistsError = false;

  // Constructor with injected AuthenticationService and Router
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  // Lifecycle hook called after Angular has initialized all data-bound properties
  ngOnInit() {
    // Initialize the registration form with controls for username, email, password, and role
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      // Per validare la lunghezza della password (esempio):
      // password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      role: new FormControl('waitress', Validators.required) //
    });
  }

  // Method triggered on form submission
  public onSubmit() {
    // Call the register method from AuthenticationService with username, email, password, and role
    this.authenticationService.register(
      this.registerForm.get('username')!.value,
      this.registerForm.get('email')!.value,
      this.registerForm!.get('password')!.value,
      this.registerForm!.get('role')!.value
    )
  }

  // Validation method for username
  isUsernameInvalid() {
    const usernameControl = this.registerForm.get('username');
    return usernameControl?.invalid && usernameControl?.touched;
  }

  // Validation method for email
  isEmailInvalid() {
    const emailControl = this.registerForm.get('email');
    return emailControl?.invalid && emailControl?.touched;
  }

  // Validation method for password
  isPasswordInvalid() {
    const passwordControl = this.registerForm.get('password');
    return passwordControl?.invalid && passwordControl?.touched;
  }

  // Validation method for role
  isRoleInvalid() {
    const roleControl = this.registerForm.get('role');
    return roleControl?.invalid && roleControl?.touched;
  }
}
