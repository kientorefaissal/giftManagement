import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private http: HttpClient) { }

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
   
    return new Promise(
        (resolve, reject) => {
            this.http.get('/parrainage/login').toPromise().then((response: HttpResponse<Boolean>) => {
                if(response.toString()=="true") {
                    resolve(true);
                  } else {
                    resolve(false);
                    this.router.navigate(['/login']);
                  }
            })
            .catch(err => { 
              console.log ('error');
              resolve(false);
              this.router.navigate(['/login']);
            })
        }
      );
  }
}