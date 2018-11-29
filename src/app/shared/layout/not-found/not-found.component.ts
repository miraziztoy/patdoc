import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
    time=30;
    i=0;

    constructor() { }

    ngOnInit() {
        this.loopInterval(document.querySelector('.thirdDigit'), 40, 4);
        this.loopInterval(document.querySelector('.secondDigit'), 80, 0);
        this.loopInterval(document.querySelector('.firstDigit'), 100, 4);
    }

    loopInterval(selector, number:number, value:number){
        let loop = setInterval(() =>{
            if(this.i > number) {
                clearInterval(loop);
                selector.textContent = value;
            }else{
                selector.textContent =this.randomNumber();
                this.i++;
            }
        }, this.time);
    }

    randomNumber() {
        return Math.floor(Math.random() * 9)+1;
    }
}