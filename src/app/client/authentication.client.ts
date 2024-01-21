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

    public login(email: string, password: string): Observable<any> {
        return this.http.post(
            apiUrls.authServiceApi + '/api/auth/login',
            {
                email: email,
                password: password,
            },
        );
    }

    public register(username: string, email: string, password: string, role: string): Observable<any> {
        return this.http.post(
            apiUrls.authServiceApi + '/api/auth/register',
            {
                username: username,
                email: email,
                password: password,
                roles: role //
            },
        );
    }

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

    public getAllUsers(): Observable<any[]>{
        return this.http.get<any[]>(apiUrls.authServiceApi + '/api/user/all')
            .pipe(
            catchError(error => {
                console.error('Error:', error);
                return throwError('Something went wrong, please try again later.');
            })
        );
    }

    public deleteUser(id: string){
        const reqData = {
            id: id,
        };
        return this.http.post<string>(apiUrls.authServiceApi + '/api/user/delete', reqData);
    }

    public getAllFoods(): Observable<any[]>{
        return this.http.get<any[]>(apiUrls.authServiceApi + '/api/restaurant/getAllFoods')
            .pipe(
            catchError(error => {
                console.error('Error:', error);
                return throwError('Something went wrong, please try again later.');
            })
        );
    }

    public getAllDrinks(): Observable<any[]>{
        return this.http.get<any[]>(apiUrls.authServiceApi + '/api/restaurant/getAllDrinks')
            .pipe(
            catchError(error => {
                console.error('Error:', error);
                return throwError('Something went wrong, please try again later.');
            })
        );
    }

    public createKitchenOrder(cod: string, table_id: string, foods: apiData.FoodItem[], date: Date){
        const reqData = {
            cod: cod,
            table: table_id,
            ready: false,
            foods: foods,
            date: date,
        };
        return this.http.post<string>(apiUrls.authServiceApi + '/api/kitchen/create', reqData);
    }

    public getAllKitchenOrders(): Observable<any[]>{
        return this.http.get<any[]>(apiUrls.authServiceApi + '/api/kitchen/all')
            .pipe(
            catchError(error => {
                console.error('Error:', error);
                return throwError('Something went wrong, please try again later.');
            })
        );
    }

    public deleteKitchenOrder(id: string){
        const reqData = {
            id: id,
        };
        return this.http.post<string>(apiUrls.authServiceApi + '/api/kitchen/delete', reqData);
    }

    public setKitchenOrderReady(id: string){
        const reqData = {
            id: id,
        };
        return this.http.post<string>(apiUrls.authServiceApi + '/api/kitchen/setReady', reqData);
    }

    public createBarOrder(cod: string, table_id: string, drinks: apiData.DrinkItem[], date: Date){
        const reqData = {
            cod: cod,
            table: table_id,
            ready: false,
            drinks: drinks,
            date: date,
        };
        return this.http.post<string>(apiUrls.authServiceApi + '/api/bar/create', reqData);
    }

    public getAllBarOrders(): Observable<any[]>{
        return this.http.get<any[]>(apiUrls.authServiceApi + '/api/bar/all')
            .pipe(
            catchError(error => {
                console.error('Error:', error);
                return throwError('Something went wrong, please try again later.');
            })
        );
    }

    public deleteBarOrder(id: string){
        const reqData = {
            id: id,
        };
        return this.http.post<string>(apiUrls.authServiceApi + '/api/bar/delete', reqData);
    }

    public setBarOrderReady(id: string){
        const reqData = {
            id: id,
        };
        return this.http.post<string>(apiUrls.authServiceApi + '/api/bar/setReady', reqData);
    }

    public getAllTables(){
        return this.http.get<any[]>(apiUrls.authServiceApi + '/api/restaurant/getAllTables')
            .pipe(
            catchError(error => {
                console.error('Error:', error);
                return throwError('Something went wrong, please try again later.');
            })
        );
    }

    public clearOrders(table_id: string){
        const reqData = {
            id: table_id,
        };
        return this.http.post<string>(apiUrls.authServiceApi + '/api/restaurant/clearOrders', reqData);
    }
}
