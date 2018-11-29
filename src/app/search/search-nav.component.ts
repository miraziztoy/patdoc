import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-search',
    templateUrl: './search-nav.component.html',
    styleUrls: ['./search-nav.component.css']
})
export class SearchNavComponent implements OnInit, DoCheck {
    activeRoute:string;

    constructor(private router: Router) { }

    ngOnInit() {
        this.activeRoute = 'pal';
    }

    ngDoCheck(){
        if(this.router.url == ('/search' || '/search/pal'))
            this.activeRoute = 'pal';
        else if (this.router.url == '/search/tags')
            this.activeRoute = 'tags';
        else if (this.router.url == '/search/template')
            this.activeRoute = 'template';
    }

}
