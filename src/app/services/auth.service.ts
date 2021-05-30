import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { User } from '../models/user.model';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable()
export class AuthService {

    authenticated = false;
    private user: User;

  constructor(private router: Router, private http: HttpClient) {
  }
 authenticate(credentials/*, callback*/) : boolean{  

        const headers = new HttpHeaders(credentials ? {
            authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
        } : {});

        this.http.get('/parrainage/login', {headers: headers}).subscribe((response: HttpResponse<boolean>) => {
            console.log('response:'+response);
            if (response.toString()=='true') {
                this.authenticated = true;
                this.router.navigate(['/home']);
            } else {
                this.authenticated = false;
            }
            
            //return callback && callback();
        });
        return this.authenticated;
  }

  authenticateUser(credentials) {  
      return Observable.create(observer => {
        const headers = new HttpHeaders(credentials ? {
            authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
        } : {});
    
        this.http.get('/parrainage/login', {headers: headers}).subscribe((response: HttpResponse<boolean>) => {
            console.log('response:'+response);
            if (response.toString()=='true') {
                this.authenticated = true;
            } else {
                this.authenticated = false;
            }
            observer.next(this.authenticated);
            observer.complete();
        },
        error => {
            this.authenticated = false;
            observer.next(this.authenticated);
            observer.complete();
        });
      })
    }

    createUser(credentials, callback){
        /*cons t headers = new HttpHeaders(credentials ? {
            compte : {credentials.username + ':' + credentials.password}
        } : {});*/

        this.http.post('/parrainage/comptes/save', {compte: credentials}).subscribe(response => {
            if (response['nom']) {
                this.authenticated = true;
            } else {
                this.authenticated = false;
            }
            return callback && callback();
        });
    }

    signOut(){
        this.authenticated = false;
        this.http.get('/auth/logout').subscribe(response => {
            if (response) {
                this.authenticated = false;
                //this.router.navigate(['/login']);
            } 
        });
        this.router.navigate(['/login']);
    }

    private setCurrentUser(login: string, nom: string, prenom: string, age: number, genre: string){
        this.user = new User(login, nom, prenom, age, genre);
    }

    public getCurrentUser(){
        return this.user;
    }

}