import {HttpClient, HttpHeaders} from '@angular/common/http';
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
                isBartender:(role=="bartender"),
                isWaitress:(role=="waitress"),
                isCook:(role=="cook"),
                isAdmin: (role == "cashier"),
                roles: role //
            },
        );
    }

/*  // Method to get user data from token
  public getUserDataFromID(token : string, userID : string){
    return this.http.get<any[]>(apiUrls.authServiceApi + '/api/user/'+userID)
    .pipe(
    catchError(error => {
        console.error('Error:', error);
        return throwError('Something went wrong, please try again later.');
    })
);
    }*/

  public getUserDataFromID(token: string, userID: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${token}`, // Include il token nell'header Authorization
      }),
    };
    return this.http.get<any>(`${apiUrls.authServiceApi}/api/user/${userID}`, httpOptions)
      .pipe(
        catchError(error => {
          console.error('Error:', error);
          return throwError('Something went wrong, please try again later.');
        })
      );
  }

  // Method to get all users from the server
  public getAllUsers(token:string): Observable<any[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${token}`, // Include il token nell'header Authorization
      }),
    };
        return this.http.get<any[]>(apiUrls.authServiceApi + '/api/user/', httpOptions)
            .pipe(
            catchError(error => {
                console.error('Error:', error);
                return throwError('Something went wrong, please try again later.');
            })
        );
    }

  // Method to delete a user
  /*public deleteUser(id: string){
        const reqData = {
            id: id,
        };
        //return this.http.post<string>(apiUrls.authServiceApi + '/api/user/delete', reqData);
    return this.http.delete<string>(apiUrls.authServiceApi + '/api/user/${id}');

  }*/

  // Metodo per eliminare un utente
  public deleteUser(id: string, token: string): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${token}`, // Passa il token come header Authorization
      }),
    };
    return this.http.delete<string>(`${apiUrls.authServiceApi}/api/user/${id}`, httpOptions);
  }

  // Method to get all foods from the server
  public getAllFoods(token:string): Observable<any[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${token}`, // Include il token nell'header Authorization
      }),
    };
        return this.http.get<any[]>(apiUrls.authServiceApi + '/api/restaurant/food/', httpOptions)
            .pipe(
            catchError(error => {
                console.error('Error:', error);
                return throwError('Something went wrong, please try again later.');
            })
        );
    }

  // Method to get all drinks from the server
  public getAllDrinks(token:string): Observable<any[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${token}`, // Include il token nell'header Authorization
      }),
    };
        return this.http.get<any[]>(apiUrls.authServiceApi + '/api/restaurant/drink/', httpOptions)
            .pipe(
            catchError(error => {
                console.error('Error:', error);
                return throwError('Something went wrong, please try again later.');
            })
        );
    }

  // Method to create a kitchen order
  public createKitchenOrder(cod: string, table_id: string, foods: apiData.FoodItem[], date: Date, token:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${token}`, // Include il token nell'header Authorization
      }),
    };
        const reqData = {
            cod: cod,
            table: table_id,
            ready: false,
            delivered: false,
            foods: foods,
            date: date,
        };
        return this.http.post<string>(`${apiUrls.authServiceApi}/api/kitchen/${table_id}`, reqData, httpOptions);
    }

  // Method to get all kitchen orders from the server
  public getAllKitchenOrders(token:string): Observable<any[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${token}`, // Include il token nell'header Authorization
      }),
    };
        return this.http.get<any[]>(apiUrls.authServiceApi + '/api/kitchen/', httpOptions)
            .pipe(
            catchError(error => {
                console.error('Error:', error);
                return throwError('Something went wrong, please try again later.');
            })
        );
    }

  /*// Method to delete a kitchen order
  public deleteKitchenOrder(id: string){
        const reqData = {
            id: id,
        };
        return this.http.delete<string>(apiUrls.authServiceApi + '/api/kitchen/${id}');
    }*/

  // Metodo per eliminare un ordine di cucina
  public deleteKitchenOrder(id: string, token: string): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${token}`, // Passa il token come header Authorization
      }),
    };
    return this.http.delete<string>(`${apiUrls.authServiceApi}/api/kitchen/${id}`, httpOptions);
  }

  // Method to set a kitchen order as ready
  public setKitchenOrderReady(id: string, token:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${token}`, // Include il token nell'header Authorization
      }),
    };
        const reqData = {
            id: id,
        };
        return this.http.put<string>(`${apiUrls.authServiceApi}/api/kitchen/${id}/setReady`, reqData, httpOptions);
    }

  // Method to deliver a kitchen order
  public deliverKitchenOrder(id: string, token:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${token}`, // Include il token nell'header Authorization
      }),
    };
        const reqData = {
            id: id,
        };
        return this.http.put<string>(`${apiUrls.authServiceApi}/api/kitchen/${id}/deliver`, reqData, httpOptions);
    }

  // Method to create a bar order
  public createBarOrder(cod: string, table_id: string, drinks: apiData.DrinkItem[], date: Date, token:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${token}`, // Include il token nell'header Authorization
      }),
    };
        const reqData = {
            cod: cod,
            table: table_id,
            ready: false,
            delivered: false,
            drinks: drinks,
            date: date,
        };
        return this.http.post<string>(`${apiUrls.authServiceApi}/api/bar/${table_id}`, reqData, httpOptions);
    }

  // Method to get all bar orders from the server
  public getAllBarOrders(token:string): Observable<any[]>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${token}`, // Include il token nell'header Authorization
      }),
    };
        return this.http.get<any[]>(apiUrls.authServiceApi + '/api/bar/', httpOptions)
            .pipe(
            catchError(error => {
                console.error('Error:', error);
                return throwError('Something went wrong, please try again later.');
            })
        );
    }

 /* // Method to delete a bar order
  public deleteBarOrder(id: string){
        const reqData = {
            id: id,
        };
        return this.http.delete<string>(apiUrls.authServiceApi + '/api/bar/${id}');
    }*/

  // Metodo per eliminare un ordine al bar
  public deleteBarOrder(id: string, token: string): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${token}`, // Passa il token come header Authorization
      }),
    };
    return this.http.delete<string>(`${apiUrls.authServiceApi}/api/bar/${id}`, httpOptions);
  }

  // Method to set a bar order as ready
  public setBarOrderReady(id: string,token:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${token}`, // Include il token nell'header Authorization
      }),
    };
        const reqData = {
            id: id,
        };
        return this.http.put<string>(`${apiUrls.authServiceApi}/api/bar/${id}/setReady`, reqData, httpOptions);
    }

  // Method to deliver a bar order
  public deliverBarOrder(id: string,token:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${token}`, // Include il token nell'header Authorization
      }),
    };
        const reqData = {
            id: id,
        };
        return this.http.put<string>(`${apiUrls.authServiceApi}/api/bar/${id}/deliver`, reqData, httpOptions);
    }

  // Method to get all tables from the server
  public getAllTables(token:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${token}`, // Include il token nell'header Authorization
      }),
    };
        return this.http.get<any[]>(apiUrls.authServiceApi + '/api/restaurant/table/', httpOptions)
            .pipe(
            catchError(error => {
                console.error('Error:', error);
                return throwError('Something went wrong, please try again later.');
            })
        );
    }

  // Method to set a table as occupied
  public setTableOccupied(id: string, n_clients: number, token:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${token}`, // Include il token nell'header Authorization
      }),
    };
        const reqData = {
            id: id,
            n_clients: n_clients
        };
        return this.http.put<string>(`${apiUrls.authServiceApi}/api/restaurant/table/${id}/SetOccupied`, reqData, httpOptions);
    }

  // Method to clear orders for a specific table
  public clearOrders(table_id: string, token:string){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `${token}`, // Include il token nell'header Authorization
      }),
    };
        const reqData = {
            id: table_id,
        };
        return this.http.put<string>(`${apiUrls.authServiceApi}/api/restaurant/table/${table_id}/clearOrders`, reqData, httpOptions);
    }
}
