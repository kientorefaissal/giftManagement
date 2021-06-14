import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  styles: [
    `
    mat-sidenav-container {
      position: absolute;
      top: 70px;
      bottom: 0;
      left: 0;
      right: 0;
    }`
  ]
})
export class HomeComponent {
  title = 'ParrainageFront';
  opened: boolean;
  constructor(private auth: AuthService, private http: HttpClient, private router: Router) {
    this.opened=true;
  }

  logout() {
    this.auth.signOut();
    //return false;
  }
}
