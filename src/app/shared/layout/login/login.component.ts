import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { StateManagmentService } from '../../service/state-managment.service';
import { AppError } from '../../service/handle-errors/app-error-handler';
import { HttpApiService } from '../../service/http-api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../model/user.modal';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    user: User;
    loginSuccess: boolean;
    loginFailMessage: boolean = false;
  
    constructor(private httpApiService: HttpApiService, 
                private router: Router, 
                private route: ActivatedRoute, 
                private stateManagmentService: StateManagmentService) { 
    }

    ngOnInit() {
        this.user = new User();
        this.user.isAuthenticated = false;
        this.loginFailMessage = false;
    }

    login(user: User) {
        this.httpApiService.getLoginTokenAndUserRole(user).subscribe(
            response => {
                let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
                this.user.isAuthenticated = true
                this.user.role = response.json().role;
                this.router.navigate([returnUrl || '/search/pal']);
                this.stateManagmentService.addStateToSession(response.json().oauth, user);
            },
            (error: AppError) => {
                if(error instanceof AppError){
                    this.user.isAuthenticated = false;
                    this.loginFailMessage = true;
                }else{
                    this.router.navigate(['/error-page']);
                    throw error;
                }
            }
        );
    }
}
