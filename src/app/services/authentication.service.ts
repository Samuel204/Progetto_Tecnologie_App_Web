import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {AuthenticationClient} from "../client/authentication.client";


@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private tokenKey = 'token';

  constructor(
    private authenticationClient: AuthenticationClient,
    private router: Router
  ) {}

  public login(email: string, password: string): void {
    this.authenticationClient.login(email, password).subscribe((token) => {
      localStorage.setItem(this.tokenKey, token.token);
      console.log(token.token);
      this.router.navigate(['/']); //una provA
    });
  }

  public register(username: string, email: string, password: string, roles:string): void {
    this.authenticationClient
      .register(username, email, password, roles)
      .subscribe((token) => {
        localStorage.setItem(this.tokenKey, token.token);
        this.router.navigate(['/login']);
      });
  }

  public logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/']);
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken() {
   return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }

  public getUserDataFromToken() {
    const token = this.getToken();
    if(token == null){
      return null;
    }
    else{
      return this.authenticationClient.getUserDataFromToken(token);
    }
  }

}
