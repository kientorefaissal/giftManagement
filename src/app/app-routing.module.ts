import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import {HomeComponent} from './home/home.component';
import {AuthComponent} from './auth/auth.component'
import { AuthGuardService } from './services/authguard.service';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  { path: 'home', canActivate: [AuthGuardService], component: HomeComponent},
  { path: 'login', component: AuthComponent},
  { path: 'error', component: ErrorComponent},
  { path: '', pathMatch: 'full', redirectTo: 'home'},
  { path: '**', redirectTo: 'error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true /*, relativeLinkResolution: 'legacy'*/ })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
