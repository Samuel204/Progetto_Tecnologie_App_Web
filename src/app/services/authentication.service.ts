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
  // Method for user login
  public login(email: string, password: string): void {
    // Call login method from the authentication client
    this.authenticationClient.login(email, password).subscribe((token) => {
      // Store the received token in local storage
      localStorage.setItem(this.tokenKey, token.token);
      // Navigate to the root route after successful login
      this.router.navigate(['/']);
    });
  }

  // Method for user registration
  public register(username: string, email: string, password: string, roles:string): void {
    this.authenticationClient.register(username, email, password, roles).subscribe((res) => {
      this.router.navigate(['/login']);
    });
  }

  // Method for user logout
  public logout() {
    // Remove the token from local storage
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/']);
  }

  // Method to check if a user is logged in
  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  // Method to get the user token
  public getToken() {
   return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }

  // Method to get user data from the token
  public getUserDataFromToken() {
    const token = this.getToken();
    if(token == null){
      return null;
    }
    else{
      return this.authenticationClient.getUserDataFromToken(token);
    }
  }

  // Method to get all users from the server
  public getAllUsers(): Observable<any[]>{
    return this.authenticationClient.getAllUsers()
      .pipe(
        catchError(error => {
          console.error('An error has occurred: ', error);
          return [];
        })
      );
  }

  // Method to delete a user
  public deleteUser(id: string) {
    this.authenticationClient.deleteUser(id)
      .subscribe(
        (response) => {
          console.log('Order deleted successfully: ', response);
        },
        (error) => {
          console.error('Error deleting order: ', error);
        }
      );
  }

  // Method to get all foods from the server
  public getAllFoods(): Observable<any[]>{
    return this.authenticationClient.getAllFoods()
      .pipe(
        catchError(error => {
          console.error('An error has occurred: ', error);
          return [];
        })
      );
  }

  // Method to get all drinks from the server
  public getAllDrinks(): Observable<any[]>{
    return this.authenticationClient.getAllDrinks()
      .pipe(
        catchError(error => {
          console.error('An error has occurred: ', error);
          return [];
        })
      );
  }

  // Method to create a kitchen order
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

  // Method to get all kitchen orders from the server
  public getAllKitchenOrders(): Observable<any[]>{
    return this.authenticationClient.getAllKitchenOrders()
      .pipe(
        catchError(error => {
          console.error('An error has occurred: ', error);
          return [];
        })
      );
  }

  // Method to delete a kitchen order
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

  // Method to set a kitchen order as ready
  public setKitchenOrderReady(order_id: string){
    this.authenticationClient.setKitchenOrderReady(order_id)
      .subscribe(
        (response) => {
          console.log('Order set to ready: ', response);
        },
        (error) => {
          console.error('Error setting order: ', error);
        }
      );
  }

  // Method to deliver a kitchen order
  public deliverKitchenOrder(order_id: string){
    this.authenticationClient.deliverKitchenOrder(order_id)
      .subscribe(
        (response) => {
          console.log('Order delivered successfully: ', response);
        },
        (error) => {
          console.error('Error delivering order: ', error);
        }
      );
  }

  // Method to create a bar order
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

  // Method to get all bar orders from the server
  public getAllBarOrders(): Observable<any[]>{
    return this.authenticationClient.getAllBarOrders()
      .pipe(
        catchError(error => {
          console.error('An error has occurred: ', error);
          return [];
        })
      );
  }

  // Method to delete a bar order
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

  // Method to set a bar order as ready
  public setBarOrderReady(order_id: string){
    this.authenticationClient.setBarOrderReady(order_id)
      .subscribe(
        (response) => {
          console.log('Order set to ready: ', response);
        },
        (error) => {
          console.error('Error setting order: ', error);
        }
      );
  }

  // Method to deliver a bar order
  public deliverBarOrder(order_id: string){
    this.authenticationClient.deliverBarOrder(order_id)
      .subscribe(
        (response) => {
          console.log('Order delivered successfully: ', response);
        },
        (error) => {
          console.error('Error delivering order: ', error);
        }
      );
  }

  // Method to get all tables from the server
  public getAllTables(){
    return this.authenticationClient.getAllTables();
  }

  // Method to set a table as occupied
  public setTableOccupied(id: string, n_clients: number){
    this.authenticationClient.setTableOccupied(id, n_clients)
    .subscribe(
      (response) => {
        console.log('Orders cleared successfully: ', response);
      },
      (error) => {
        console.error('Error clearing orders: ', error);
      }
    );
  }

  // Method to clear orders for a specific table
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
