import { Injectable } from '@angular/core';
import { Observable,  throwError} from 'rxjs';
import { Router } from '@angular/router';
import {AuthenticationClient} from "../client/authentication.client";

interface Serving {
  food_id: string;
  name: string;
  quantity: number;
}

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
     this.router.navigate(['/']); //una provA
    });
  }

  public register(username: string, email: string, password: string, roles:string): void {
    this.authenticationClient.register(username, email, password, roles).subscribe((res) => {
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

  public getAllUsers(): Observable<any[]>{
    return this.authenticationClient.getAllUsers();
  }

  public deleteUser(id: string) {
    return this.authenticationClient.deleteUser(id);
  }

  public getAllFoods(): Observable<any[]>{
    return this.authenticationClient.getAllFoods();
  }

  public getAllDrinks(): Observable<any[]>{
    return this.authenticationClient.getAllDrinks();
  }

  public createKitchenOrder(cod: string, table_id: string, foods: Serving[], date: Date){
    return this.authenticationClient.createKitchenOrder(cod, table_id, foods, date);
}

  public getAllKitchenOrders(): Observable<any[]>{
    return this.authenticationClient.getAllKitchenOrders();
  }

  public deleteKitchenOrder(id: string){
    return this.authenticationClient.deleteKitchenOrder(id);
  }

  public setKitchenOrderReady(id: string){
    return this.authenticationClient.setKitchenOrderReady(id);
  }

  public createBarOrder(cod: string, table_id: string, drinks: Serving[], date: Date){
    return this.authenticationClient.createBarOrder(cod, table_id, drinks, date);
  }

  public getAllBarOrders(): Observable<any[]>{
    return this.authenticationClient.getAllBarOrders();
  }

  public deleteBarOrder(id:string){
    return this.authenticationClient.deleteBarOrder(id);
  }

  public setBarOrderReady(id: string){
    return this.authenticationClient.setBarOrderReady(id);
  }
}
