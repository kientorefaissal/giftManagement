import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'menuprincipal',
  templateUrl: './menuprincipal.component.html',
  styles: [
  `.mat-form-field + .mat-form-field {
    margin-left: 8px;
  }`
  ]
})
export class MenuprincipalComponent implements OnInit {
  panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }

}
