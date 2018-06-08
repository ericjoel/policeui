import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  
  menu = [
    {
      text: 'Agregar Poliza',
      route: `/police`
    }
  ];

  constructor() { }
  
  ngOnInit() {
  }

}
