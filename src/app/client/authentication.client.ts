import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,  throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {apiUrls} from "../api.urls";
import * as apiData from "../api_interfaces";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {
    constructor(private http: HttpClient) {
    }

  // Method to handle user login
  public login(email: string, password: string): Observable<any> {
        return this.http.post(
            apiUrls.authServiceApi + '/api/auth/login',
            {
                email: email,
                password: password,
            },
        );
    }

  // Method to handle user registration
  public register(username: string, email: string, password: string, role: string): Observable<any> {
        return this.http.post(
            apiUrls.authServiceApi + '/api/auth/register',
            {
                username: username,
                email: email,
                password: password,
                isAdmin: (role == "cashier"),
                roles: role //
            },
        );
    }

  // Method to get user data from token
  public getUserDataFromToken(token : string){
        const dataToSend = {
            'token': `${token}`
        };
        return this.http.post(
            apiUrls.authServiceApi + '/api/user/getUserDataFromToken', dataToSend
        ).pipe(
            catchError(error => {
                return throwError(error);
            })
        );
    }

  // Method to get all users from the server
  public getAllUsers(): Observable<any[]>{
        return this.http.get<any[]>(apiUrls.authServiceApi + '/api/user/all')
            .pipe(
            catchError(error => {
                console.error('Error:', error);
                return throwError('Something went wrong, please try again later.');
            })
        );
    }

  // Method to delete a user
  public deleteUser(id: string){
        const reqData = {
            id: id,
        };
        return this.http.post<string>(apiUrls.authServiceApi + '/api/user/delete', reqData);
    }

  // Method to get all foods from the server
  public getAllFoods(): Observable<any[]>{
        return this.http.get<any[]>(apiUrls.authServiceApi + '/api/restaurant/getAllFoods')
            .pipe(
            catchError(error => {
                console.error('Error:', error);
                return throwError('Something went wrong, please try again later.');
            })
        );
    }

  // Method to get all drinks from the server
  public getAllDrinks(): Observable<any[]>{
        return this.http.get<any[]>(apiUrls.authServiceApi + '/api/restaurant/getAllDrinks')
            .pipe(
            catchError(error => {
                console.error('Error:', error);
                return throwError('Something went wrong, please try again later.');
            })
        );
    }

  // Method to create a kitchen order
  public createKitchenOrder(cod: string, table_id: string, foods: apiData.FoodItem[], date: Date){
        const reqData = {
            cod: cod,
            table: table_id,
            ready: false,
            delivered: false,
            foods: foods,
            date: date,
        };
        return this.http.post<string>(apiUrls.authServiceApi + '/api/kitchen/create', reqData);
    }

  // Method to get all kitchen orders from the server
  public getAllKitchenOrders(): Observable<any[]>{
        return this.http.get<any[]>(apiUrls.authServiceApi + '/api/kitchen/all')
            .pipe(
            catchError(error => {
                console.error('Error:', error);
                return throwError('Something went wrong, please try again later.');
            })
        );
    }

  // Method to delete a kitchen order
  public deleteKitchenOrder(id: string){
        const reqData = {
            id: id,
        };
        return this.http.post<string>(apiUrls.authServiceApi + '/api/kitchen/delete', reqData);
    }

  // Method to set a kitchen order as ready
  public setKitchenOrderReady(id: string){
        const reqData = {
            id: id,
        };
        return this.http.post<string>(apiUrls.authServiceApi + '/api/kitchen/setReady', reqData);
    }

  // Method to deliver a kitchen order
  public deliverKitchenOrder(id: string){
        const reqData = {
            id: id,
        };
        return this.http.post<string>(apiUrls.authServiceApi + '/api/kitchen/deliver', reqData);
    }

  // Method to create a bar order
  public createBarOrder(cod: string, table_id: string, drinks: apiData.DrinkItem[], date: Date){
        const reqData = {
            cod: cod,
            table: table_id,
            ready: false,
            delivered: false,
            drinks: drinks,
            date: date,
        };
        return this.http.post<string>(apiUrls.authServiceApi + '/api/bar/create', reqData);
    }

  // Method to get all bar orders from the server
  public getAllBarOrders(): Observable<any[]>{
        return this.http.get<any[]>(apiUrls.authServiceApi + '/api/bar/all')
            .pipe(
            catchError(error => {
                console.error('Error:', error);
                return throwError('Something went wrong, please try again later.');
            })
        );
    }

  // Method to delete a bar order
  public deleteBarOrder(id: string){
        const reqData = {
            id: id,
        };
        return this.http.post<string>(apiUrls.authServiceApi + '/api/bar/delete', reqData);
    }

  // Method to set a bar order as ready
  public setBarOrderReady(id: string){
        const reqData = {
            id: id,
        };
        return this.http.post<string>(apiUrls.authServiceApi + '/api/bar/setReady', reqData);
    }

  // Method to deliver a bar order
  public deliverBarOrder(id: string){
        const reqData = {
            id: id,
        };
        return this.http.post<string>(apiUrls.authServiceApi + '/api/bar/deliver', reqData);
    }

  // Method to get all tables from the server
  public getAllTables(){
        return this.http.get<any[]>(apiUrls.authServiceApi + '/api/restaurant/getAllTables')
            .pipe(
            catchError(error => {
                console.error('Error:', error);
                return throwError('Something went wrong, please try again later.');
            })
        );
    }

  // Method to set a table as occupied
  public setTableOccupied(id: string, n_clients: number){
        const reqData = {
            id: id,
            n_clients: n_clients
        };
        return this.http.post<string>(apiUrls.authServiceApi + '/api/restaurant/setOccupied', reqData);
    }

  // Method to clear orders for a specific table
  public clearOrders(table_id: string){
        const reqData = {
            id: table_id,
        };
        return this.http.post<string>(apiUrls.authServiceApi + '/api/restaurant/clearOrders', reqData);
    }
}
