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

  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      // Per validare la lunghezza della password (esempio):
      // password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      role: new FormControl('', Validators.required) //
    });
  }
  public onSubmit() {
    this.authenticationService.register(
      this.registerForm.get('username')!.value,
      this.registerForm.get('email')!.value,
      this.registerForm!.get('password')!.value,
      this.registerForm!.get('role')!.value
    );
  }

  isUsernameInvalid() {
    const usernameControl = this.registerForm.get('username');
    return usernameControl?.invalid && usernameControl?.touched;
  }

  isEmailInvalid() {
    const emailControl = this.registerForm.get('email');
    return emailControl?.invalid && emailControl?.touched;
  }

  isPasswordInvalid() {
    const passwordControl = this.registerForm.get('password');
    return passwordControl?.invalid && passwordControl?.touched;
  }

  isRoleInvalid() {
    const roleControl = this.registerForm.get('role');
    return roleControl?.invalid && roleControl?.touched;
  }
}
