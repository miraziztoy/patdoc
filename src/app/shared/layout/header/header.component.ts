import { Component, OnInit } from '@angular/core';
import { StateManagmentService } from '../../service/state-managment.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    isAuthenticated: boolean;

    constructor(private stateManagmentService: StateManagmentService, 
                private router: Router) { 
    }

    ngOnInit() {
        this.stateManagmentService.getIsAuth().subscribe(isAuth => {
            isAuth === "true" ? this.isAuthenticated = true : this.isAuthenticated = false;
        });
    }

    logout() {
        this.stateManagmentService.removeAllStates();
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
    };
}
