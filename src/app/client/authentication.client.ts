import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,  throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {apiUrls} from "../api.urls";

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
        console.log(dataToSend);
        return this.http.post(
            apiUrls.authServiceApi + '/api/user/getUserDataFromToken', dataToSend
        ).pipe(
            catchError(error => {
                return throwError(error);
            })
        );
    }
}
