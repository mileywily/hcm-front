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
        label: 'Informes',
        icon: 'pi pi-paperclip',
        items: [
          {
            label: 'Reporte para el médico',
            routerLink: 'solicitud-medico'
          }
        ]
      }
    ];
  }

  ngOnInit(): void {
  }

}
