import { Injectable } from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import { Router } from '@angular/router';
import {AuthenticationClient} from "../client/authentication.client";
import * as apiData from "../api_interfaces";
import { take } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import {apiUrls} from "../api.urls";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private tokenKey = 'token';
  private userID = '';

  constructor(
    private authenticationClient: AuthenticationClient,
    private router: Router
  ) {}
  // Method for user login
  public login(email: string, password: string): void {
    // Call login method from the authentication client
    this.authenticationClient.login(email, password).pipe(take(1)).subscribe((data) => {
      // Store the received token in local storage
      localStorage.setItem(this.tokenKey, data.token);
      // Store user data in local storage
      localStorage.setItem(this.userID, data.user_id);
      // Navigate to the root route after successful login
      this.router.navigate(['/']);
    });
  }

  // Method for user registration
  public register(username: string, email: string, password: string, roles:string): void {
    this.authenticationClient.register(username, email, password, roles).pipe(take(1)).subscribe((res) => {
      this.router.navigate(['/login']);
    });
  }

  // Method for user logout
  public logout() {
    // Remove the token from local storage
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userID);
    this.router.navigate(['/']);
  }

  // Method to check if a user is logged in
  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  // Method to get the user token
  public getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    return token ? token : null;
  }

  public getUserID() {
    return this.isLoggedIn() ? localStorage.getItem(this.userID) : null;
  }

  // Method to get user data from the token
  public getUserDataFromToken() {
    // This is actually a hack to avoid rewriting the entire codebase, because we updated the API interface
    // and now it requires the user ID as well. So this function silently fetches the user ID as well, despite
    // its name.
    const token = this.getToken();
    const userID = this.getUserID();
    if(token == null || userID == null){
      return null;
    }
    else{
      return this.authenticationClient.getUserDataFromID(token, userID);
    }
  }

  // Method to get all users from the server
  public getAllUsers(): Observable<any[]> | null{
    const token = this.getToken();
    if(token == null ){
      return null;
    }
    else
    return this.authenticationClient.getAllUsers(token)
      .pipe(
        catchError(error => {
          console.error('An error has occurred: ', error);
          return [];
        })
      );
  }

  // Method to delete a user
  public deleteUser(id: string) {
    const token = this.getToken();

    if(token) {
      this.authenticationClient.deleteUser(id,token).pipe(take(1))
        .subscribe(
          (response) => {
            console.log('Order deleted successfully: ', response);
          },
          (error) => {
            console.error('Error deleting order: ', error);
          }
        );
    }else {
      console.error('User token not available.');
    }
  }

  // Method to get all foods from the server
  public getAllFoods(): Observable<any[]> {
    //const token = this.getToken();
    let token = localStorage.getItem(this.tokenKey);


    if (token) {
      return this.authenticationClient.getAllFoods(token)
        .pipe(
          catchError(error => {
            console.error('An error has occurred: ', error);
            return [];
          })
        );
    }
    else{
      console.error('User token not available.');
      return of([]);
    }
  }

  // Method to get all drinks from the server
  public getAllDrinks(): Observable<any[]> {
    //const token = this.getToken();
    let token = localStorage.getItem(this.tokenKey);


    if (token) {
      return this.authenticationClient.getAllDrinks(token)
        .pipe(
          catchError(error => {
            console.error('An error has occurred: ', error);
            return [];
          })
        );
    }
    else{
      console.error('User token not available.');
      return of([]);
    }
  }

  // Method to create a kitchen order
  public createKitchenOrder(cod: string, table_id: string, foods: apiData.FoodItem[], date: Date) {
    const token = this.getToken();

    if (token) {
      this.authenticationClient.createKitchenOrder(cod, table_id, foods, date, token).pipe(take(1))
        .subscribe(
          (response) => {
            console.log('Order created successfully: ', response);
          },
          (error) => {
            console.error('Error creating order: ', error);
          }
        );
    } else {
      console.error('User token not available.');
    }
  }

  // Method to get all kitchen orders from the server
  public getAllKitchenOrders(): Observable<any[]>{
    //const token = this.getToken();
    let token = localStorage.getItem(this.tokenKey);


    if (token) {
    return this.authenticationClient.getAllKitchenOrders(token)
      .pipe(
        catchError(error => {
          console.error('An error has occurred: ', error);
          return [];
        })
      );
  }
    else{
      console.error('User token not available.');
      return of([]);
    }
  }

  // Method to delete a kitchen order
  public deleteKitchenOrder(id: string) {

    const token = this.getToken();
    if (token) {

    this.authenticationClient.deleteKitchenOrder(id,token).pipe(take(1))
      .subscribe(
        (response) => {
          console.log('Order deleted successfully: ', response);
        },
        (error) => {
          console.error('Error deleting order: ', error);
        }
      );
  }else {
      console.error('User token not available.');
    }

  }

  // Method to set a kitchen order as ready
  public setKitchenOrderReady(order_id: string){
    const token= this.getToken();

    if(token){
    this.authenticationClient.setKitchenOrderReady(order_id,token).pipe(take(1))
      .subscribe(
        (response) => {
          console.log('Order set to ready: ', response);
        },
        (error) => {
          console.error('Error setting order: ', error);
        }
      );
  }
    else{
      console.error('User token not available.');

    }
  }

  // Method to deliver a kitchen order
  public deliverKitchenOrder(order_id: string){
    const token=this.getToken();

    if(token){
    this.authenticationClient.deliverKitchenOrder(order_id,token).pipe(take(1))
      .subscribe(
        (response) => {
          console.log('Order delivered successfully: ', response);
        },
        (error) => {
          console.error('Error delivering order: ', error);
        }
      );
  }
    else{
      console.error('User token not available.');

    }
  }

  // Method to create a bar order
  public createBarOrder(cod: string, table_id: string, drinks: apiData.DrinkItem[], date: Date){
    const token= this.getToken();

    if(token){
    this.authenticationClient.createBarOrder(cod, table_id, drinks, date,token).pipe(take(1))
    .subscribe(
      (response) => {
        console.log('Order created successfully: ', response);
      },
      (error) => {
        console.error('Error creating order: ', error);
      }
    );
  }
    else{
      console.error('User token not available.');

    }
  }

  // Method to get all bar orders from the server
  public getAllBarOrders(): Observable<any[]> {
    //const token = this.getToken();
    let token = localStorage.getItem(this.tokenKey);


    if (token) {
      return this.authenticationClient.getAllBarOrders(token)
        .pipe(
          catchError(error => {
            console.error('An error has occurred: ', error);
            return [];
          })
        );
    } else {
      console.error('User token not available.');
      return of([]);
    }
  }

  // Method to delete a bar order
  public deleteBarOrder(id:string){

    const token= this.getToken();
    if(token) {
      this.authenticationClient.deleteBarOrder(id,token).pipe(take(1))
        .subscribe(
          (response) => {
            console.log('Order deleted successfully: ', response);
          },
          (error) => {
            console.error('Error deleting order: ', error);
          }
        );
    }else {
      console.error('User token not available.');
    }
  }

  // Method to set a bar order as ready
  public setBarOrderReady(order_id: string){
    const token= this.getToken();

    if(token){
    this.authenticationClient.setBarOrderReady(order_id,token).pipe(take(1))
      .subscribe(
        (response) => {
          console.log('Order set to ready: ', response);
        },
        (error) => {
          console.error('Error setting order: ', error);
        }
      );
  }
    else{
      console.error('User token not available.');
    }
  }

  // Method to deliver a bar order
  public deliverBarOrder(order_id: string){
    const token= this.getToken();

    if(token){
    this.authenticationClient.deliverBarOrder(order_id,token).pipe(take(1))
      .subscribe(
        (response) => {
          console.log('Order delivered successfully: ', response);
        },
        (error) => {
          console.error('Error delivering order: ', error);
        }
      );
  }else {
      console.error('User token not available.');
    }
  }

  // Method to get all tables from the server
  public getAllTables(){
   // const token=this.getToken();
    let token = localStorage.getItem(this.tokenKey);


    if(token){
      //console.log('Token prima della richiesta:', token); // Stampa il token nella console
      return this.authenticationClient.getAllTables(token)
      .pipe(
        catchError(error => {
          console.error('An error has occurred: ', error);
          return [];
        })
      );
  }else{
      console.error('User token not available.');
      return of([]);
    }
  }

  // Method to set a table as occupied
  public setTableOccupied(id: string, n_clients: number){
    const token=this.getToken();

    if(token){
    this.authenticationClient.setTableOccupied(id, n_clients,token).pipe(take(1))
    .subscribe(
      (response) => {
        console.log('Orders cleared successfully: ', response);
      },
      (error) => {
        console.error('Error clearing orders: ', error);
      }
    );
  }else{
      console.error('User token not available.');
    }
  }

  // Method to clear orders for a specific table
  public clearOrders(table_id: string){
    const token=this.getToken();

    if(token){
    this.authenticationClient.clearOrders(table_id,token).pipe(take(1))
    .subscribe(
      (response) => {
        console.log('Orders cleared successfully: ', response);
      },
      (error) => {
        console.error('Error clearing orders: ', error);
      }
    );
  }else{
      console.error('User token not available.');
    }
  }
}
