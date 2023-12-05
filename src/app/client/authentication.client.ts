import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map, Observable, tap} from 'rxjs';
import {apiUrls} from "../api.urls";
import {RoleInformation} from "./userInformation";

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {
    constructor(private http: HttpClient) {
    }

    public login(email: string, password: string): Observable<string> {
        return this.http.post(
            apiUrls.authServiceApi + '/api/auth/login',
            {
                email: email,
                password: password,
            },
            {responseType: 'text'}
        );
    }

    public register(
        username: string,
        email: string,
        password: string,
        role: string //
    ): Observable<string> {
        return this.http.post(
            apiUrls.authServiceApi + '/api/auth/register',
            {
                username: username,
                email: email,
                password: password,
                roles: role //
            },
            {responseType: 'text'}
        );
    }

    /*
    public getUserNo(): Observable<{ _id: string, username: string, roles: { id: string, name: string }[] }> {
        return this.http.get<{ _id: string, username: string, roles: { id: string, name: string }[] }>(
            apiUrls.authServiceApi + '/api/user/getUserData'
        );
    }

    public getUserRole(): Observable<object> {
        const url = apiUrls.authServiceApi + '/api/user/getUserRole';
        return this.http.get(url);
    }
*/


}
