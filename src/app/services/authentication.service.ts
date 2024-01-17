import { Injectable } from '@angular/core';
import { Observable,  throwError} from 'rxjs';
import { Router } from '@angular/router';
import {AuthenticationClient} from "../client/authentication.client";
import * as apiData from "../api_interfaces";
import { take } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

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
    return this.authenticationClient.getAllFoods()
      .pipe(
        catchError(error => {
          console.error('An error has occurred: ', error);
          return [];
        })
      );
  }

  public getAllDrinks(): Observable<any[]>{
    return this.authenticationClient.getAllDrinks()
      .pipe(
        catchError(error => {
          console.error('An error has occurred: ', error);
          return [];
        })
      );
  }

  public createKitchenOrder(cod: string, table_id: string, foods: apiData.FoodItem[], date: Date){
    this.authenticationClient.createKitchenOrder(cod, table_id, foods, date)
      .subscribe(
        (response) => {
          console.log('Order created successfully: ', response);
        },
        (error) => {
          console.error('Error creating order: ', error);
        }
      );
  }

  public getAllKitchenOrders(): Observable<any[]>{
    return this.authenticationClient.getAllKitchenOrders()
      .pipe(
        catchError(error => {
          console.error('An error has occurred: ', error);
          return [];
        })
      );
  }

  public deleteKitchenOrder(id: string){
    this.authenticationClient.deleteKitchenOrder(id)
      .subscribe(
        (response) => {
          console.log('Order deleted successfully: ', response);
        },
        (error) => {
          console.error('Error deleting order: ', error);
        }
      );
  }

  public setKitchenOrderReady(order_id: string){
    this.authenticationClient.setKitchenOrderReady(order_id)
      .subscribe(
        (response) => {
          console.log('Order created successfully: ', response);
        },
        (error) => {
          console.error('Error creating order: ', error);
        }
      );
  }

  public createBarOrder(cod: string, table_id: string, drinks: apiData.DrinkItem[], date: Date){
    this.authenticationClient.createBarOrder(cod, table_id, drinks, date)
    .subscribe(
      (response) => {
        console.log('Order created successfully: ', response);
      },
      (error) => {
        console.error('Error creating order: ', error);
      }
    );
  }

  public getAllBarOrders(): Observable<any[]>{
    return this.authenticationClient.getAllBarOrders()
      .pipe(
        catchError(error => {
          console.error('An error has occurred: ', error);
          return [];
        })
      );
  }

  public deleteBarOrder(id:string){
    this.authenticationClient.deleteBarOrder(id)
    .subscribe(
      (response) => {
        console.log('Order deleted successfully: ', response);
      },
      (error) => {
        console.error('Error deleting order: ', error);
      }
    );
  }

  public setBarOrderReady(order_id: string){
    this.authenticationClient.setBarOrderReady(order_id)
      .subscribe(
        (response) => {
          console.log('Order created successfully: ', response);
        },
        (error) => {
          console.error('Error creating order: ', error);
        }
      );
  }

  public getAllTables(){
    return this.authenticationClient.getAllTables();
  }

  public clearOrders(table_id: string){
    this.authenticationClient.clearOrders(table_id)
    .subscribe(
      (response) => {
        console.log('Orders cleared successfully: ', response);
      },
      (error) => {
        console.error('Error clearing orders: ', error);
      }
    );
  }
}
