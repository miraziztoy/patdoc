import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { AppError, NotFoundError } from './handle-errors/app-error-handler';
import { StateManagmentService } from './state-managment.service';
import { catchError } from 'rxjs/operators';
import { User } from '../model/user.modal';
import { throwError } from 'rxjs';


@Injectable()
export class HttpApiService {

    readonly url: string = 'https://owcp-dev-apigateway-is.acuitys.com';

    constructor(private http: Http, 
                private stateManagmentService: StateManagmentService) {
    }
    
    private addLoginHeader(userName: string, password: string) {

        let headers = new Headers(
            { 
                'Content-Type': 'application/json', 'Accept': 'application/json', 
                'Authorization': "Basic " + btoa(userName + ":" + password), 
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods' : "POST, GET, OPTIONS, DELETE, PUT"
                ,'Access-Control-Allow-Headers': "access-control-allow-origin,x-requested-with, Content-Type, origin, authorization, accept, client-security-token" 
            }
        );

        return new RequestOptions({ headers: headers });
    }

    private addTokenHeader() {
        let token;
		this.stateManagmentService.getToken().subscribe(x => token = x);
        
        let headers = new Headers(
            { 
                'Content-Type': 'application/json', 'Accept': 'application/json', 
                'Authorization': "Bearer " + token, 
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods' : "POST, GET, OPTIONS, DELETE, PUT"
                ,'Access-Control-Allow-Headers': "access-control-allow-origin,x-requested-with, Content-Type, origin, authorization, accept, client-security-token" 
            }
        );

        return new RequestOptions({ headers: headers });
    }

    private handleError(error:Response) {
        return (error.status == 404) ? 
            throwError(new NotFoundError(error)) : 
            throwError(new AppError(error));
    }

    getLoginTokenAndUserRole(user: User) {
        let requestUrl = this.url + "/gateway/Common/OWCS_Common/wsp/loginService?requestToken=true&clientName=OwcsWebApp&scope=OwcsWebScope&reuseToken=true&ifExpired=refresh";
        let loginOptions = this.addLoginHeader(user.username, user.password);

        return this.http.get(requestUrl, loginOptions).pipe(catchError(this.handleError));
    }

    

}
