import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,  throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {apiUrls} from "../api.urls";

interface Serving {
    food_id: string;
    name: string;
    quantity: number;
}

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
        const idToDelete = {
            'id': `${id}`
        };
        return this.http.post(
            apiUrls.authServiceApi + '/api/user/getUserDataFromToken', idToDelete
        ).pipe(
            catchError(error => {
                return throwError(error);
            })
        );
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

    public createKitchenOrder(cod: string, table_id: string, foods: Serving[], date: Date){
        // TODO
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
        // TODO
    }

    public createBarOrder(cod: string, table_id: string, drinks: Serving[], date: Date){
        // TODO
    }

    public setKitchenOrderReady(id: string){
        // TODO
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

    public deleteBarOrder(id:string){
        // TODO
    }

    public setBarOrderReady(id: string){
        // TODO
    }
}
