import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  title = 'ParrainageFront';
  constructor(private auth: AuthService, private http: HttpClient, private router: Router) {

  }

  logout() {
    this.auth.signOut();
    //return false;
  }
}
