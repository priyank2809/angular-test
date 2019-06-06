import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { User } from '../../models/user/user.model';

import { Observable, throwError } from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class UserService {

    // selectedUser: User = {
    //     fullName: '',
    //     email: '',
    //     password: ''
    // };

    auth_email: string;
    auth_token: string;
    auth_id: string;
    auth_fullname: any;
    auth_password: any;

    redirectUrl: string;
    currentUser: User;

    noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

    constructor(private http: HttpClient) { }

    // http methods

    postUser(user: User) {
        return this.http.post(environment.apiBaseUrl + '/register', user, this.noAuthHeader);
    }

    login(authCredentials) {
        return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials, this.noAuthHeader);
    }

    getUserProfile() {
        return this.http.get(environment.apiBaseUrl + '/userProfile');
    }

    public GetLoginDetailById = (id: any): Observable<any> => {
        //return this.http.get(environment.apiBaseUrl + '/userdetailsById/'+id);

        return this.http
            .get(environment.apiBaseUrl + '/userdetailsById/'+id)
            .pipe(map(res => <any>res || []),
            catchError(error => throwError(error.message || error))
            );
    }

    //Helper Methods

    setToken(user: any) {
        
        // localStorage.setItem('token', token);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.auth_email = user.email;
        this.auth_token = user.token;
        this.auth_id = user._id;
        this.auth_fullname = user.fullname;
        this.auth_password = user.password;
        
    }

    getToken() {
        return JSON.parse(localStorage.getItem('currentUser'));
    }

    deleteToken() {
        localStorage.removeItem('currentUser');
        this.auth_email = '';
        this.auth_token = '';
        this.auth_id = '';
        this.auth_fullname = '';
        this.auth_password = '';
    }

    logout(): void {
        localStorage.removeItem('currentUser');
        this.auth_email = '';
        this.auth_token = '';
        this.auth_id = '';
        this.auth_fullname = '';
        this.auth_password = '';
    }

    // getUserPayload() {
    //     var token = this.getToken();
    //     if (token) {
    //         var userPayload = atob(token.split('.')[1]);
    //         return JSON.parse(userPayload);
    //     }
    //     else
    //         return null;
    // }

    isLoggedIn() {
        // var userPayload = this.getUserPayload();
        // if (userPayload){
        //     return userPayload.exp > Date.now() / 1000;
        // } else {
        //     return false;
        // }

        var currentUser = JSON.parse(localStorage.getItem('currentUser'));

        if (currentUser) {
        //this.setBodyClass();
            return true;
        } else {
            return false;
        }
    }

    getLoginUser() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.auth_email = this.currentUser.email;
        this.auth_token = this.currentUser.token;
        this.auth_fullname = this.currentUser.fullName;
        this.auth_password = this.currentUser.password;
        
        this.auth_id = this.currentUser._id;
        
        
        return this.currentUser;
  
    }
}