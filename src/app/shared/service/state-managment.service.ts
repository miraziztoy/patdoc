import { BehaviorSubject } from 'rxjs';
import { User } from '../model/user.modal';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable() 
export class StateManagmentService {

    constructor(){};

    private expTokenTime: Date;
    private token: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    private authUser: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
    private isAuthenticated: BehaviorSubject<string> = new BehaviorSubject<string>('false');
    
    initializaState() {
        this.addTokenToState();
        this.addAuthUserToState();
    };

    getUser(): Observable<User> {
        return this.authUser.asObservable();
    };

    getToken(): Observable<any> {
        return this.token.asObservable();
    };

    getIsAuth(): Observable<any> {
        return this.isAuthenticated.asObservable();
    };

    addAuthUserToState() {
       this.authUser.next(JSON.parse(sessionStorage.getItem('user')));   
    };

    addTokenToState() {
        this.token.next(sessionStorage.getItem('token'));
    };

    removeAllStates() {
        this.authUser.next(new User());
        this.token.next([]);
        sessionStorage.clear();
        this.isAuthenticated.next('false');
    };

    addStateToSession(token, user: User) {
        this.isAuthenticated.next('true');
        this.expTokenTime = this.convertTokenExpTime(token.expiresIn);

        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('token', token.accessToken);
        sessionStorage.setItem('tokenExp', (this.expTokenTime).toString());
    };

    isLoggedIn() {
        this.initializaState();
        let currentTime = new Date();
        this.expTokenTime = new Date(sessionStorage.getItem('tokenExp'));
        
        if(currentTime >= this.expTokenTime) {
            this.isAuthenticated.next('false');
            return false;
        };
        this.isAuthenticated.next('true');      
        return true;
    };
    
    convertTokenExpTime(expTime) {
        let currentDate = new Date();
        currentDate.setHours(currentDate.getHours() + Math.floor(expTime / 3600));
        currentDate.setMinutes(currentDate.getMinutes() + Math.floor(expTime % 3600 / 60));
        currentDate.setSeconds(currentDate.getSeconds() + Math.floor(expTime % 3600 % 60));
        return currentDate;
    };
};