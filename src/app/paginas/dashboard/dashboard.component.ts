import { Component, OnInit } from '@angular/core';


import {
  MenuService
}
from 'src/app/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  constructor(
    private menuService:  MenuService
  ) { }

  ngOnInit(): void { 
   //console.log("TIPO SOLICITUD dasboard::::::: " , this.menuService.getTipoSolicitud());

  }


}
