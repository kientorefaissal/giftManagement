import { Component, Output } from '@angular/core';
import {  AuthService } from './services/auth.service';
import { HttpClient } from "@angular/common/http";
import { EventEmitter } from 'events';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {

  authenticated = false;
  constructor(private app: AuthService, private http: HttpClient) {
  //  this.app.authenticate(undefined, undefined);
  // app.authenticate(undefined, undefined).subscribe((response: Response) => {
  //     console.log(response);
  //     if(this.app.authenticated){
  //       this.showHome();
  //     }else{
  //       this.hideHome();
  //     }
  // });
  }

  logout() {
    this.http.post('logout', {}).subscribe(() => {
        this.app.authenticated = false;
       // this.router.navigateByUrl('/login');
    });
  }

  ngOnInit(){
    this.authenticated = this.app.authenticated;
  }

  showHome(){
    this.authenticated = true;
  }

  hideHome(){
    this.authenticated = false;
  }

}
