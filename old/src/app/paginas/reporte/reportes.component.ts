import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.scss']
})
export class ReportesComponent implements OnInit {

  items: MenuItem[];

  constructor(
  ) {

    this.items = [
      {
        label: 'Reportes',
        icon: 'pi pi-paperclip',
        /*items: [
          {
            label: 'Despachos',
            //routerLink: 'despachos'
          },
          {
            label: 'Resumen flujo de caja',
            //routerLink: 'resumen'
          },
          {
            label: 'Informes por sector',
            //routerLink: 'sectores'
          } 
        ]*/
      }
    ];
  }

  ngOnInit(): void {
  }

}
