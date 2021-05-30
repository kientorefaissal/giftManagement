import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
        margin: 100px 0px;
      }

      .mat-form-field {
        width: 100%;
        min-width: 300px;
      }

      mat-card-title,
      mat-card-content {
        display: flex;
        justify-content: center;
      }

      .error {
        padding: 16px;
        width: 300px;
        color: white;
        background-color: red;
      }

      .button {
        display: flex;
        justify-content: flex-end;
      }
    `,
  ]
})
export class AuthComponent {


  @Output() onLoginSuccess = new EventEmitter<string>();
  @Output() onLoginFailed = new EventEmitter<string>(); 

  credentials = {username: '', password: ''};

  error = false;

  constructor(private auth: AuthService, private http: HttpClient, private router: Router) {

  }

  login() {
    this.error = !this.auth.authenticate(this.credentials); 
    if(!this.error){
      this.router.navigateByUrl('/home');
    }
  }

  loginUser() {
    this.error = !this.auth.authenticateUser(this.credentials
    ).subscribe((response: Response)=>{
      if(this.auth.authenticated==true){
        this.error = false;
        this.router.navigateByUrl('/home');
      }else{
        this.onLoginFailed.next();
        this.error = true;
      }
    }
   );
  }

  logout() {
    this.auth.signOut();
    //return false;
  }

}
