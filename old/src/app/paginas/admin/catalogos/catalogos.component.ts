import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { Router } from '@angular/router';



@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.component.html',
  styleUrls: ['./catalogos.component.scss']
})
export class CatalogosComponent implements OnInit {

  items: MenuItem[];
  activeItem: MenuItem;

  constructor(private router: Router,
  ) { }

  ngOnInit(): void {

    this.items = [
      {label: 'Tipo Solicitud', routerLink: 'tipo-solicitud'},
      {label: 'Estado Solicitud', routerLink: 'estado-solicitud'},
      {label: 'Tipo Atencion', routerLink: 'tipo-atencion'},
      {label: 'Estado Atención', routerLink: 'estado-atencion'},
      {label: 'Causa', routerLink: 'causa'},
      {label: 'Sitio Atención', routerLink: 'sitio'},
      {label: 'Especialidades',routerLink: 'especialidad'},
      {label: 'Medicos',routerLink: 'medico'},
      {label: 'Medico-Especialidades', routerLink: 'medico-especialidad'},
      {label: 'Servicios - Procedimientos', routerLink: 'servicio'},      
      {label: 'Tipo Atencion-Servicios', routerLink: 'servicio-tipo-atencion'},
      {label: 'Especialidad-Servicios', routerLink: 'servicio-especialidad'},
      {label: 'Proveedor-Servicios', routerLink: 'servicio-proveedor'},
      {label: 'Medico-Servicios', routerLink: 'servicio-medico'},
      {label: 'Prioridad', routerLink: 'prioridad'},
      {label: 'Recaudo', routerLink: 'recaudo'},
      {label: 'Grupo', routerLink: 'grupo'},
      {label: 'Examen', routerLink: 'examen'},
      {label: 'Proveedor', routerLink: 'proveedor'},
      {label: 'Grupo-Servicio', routerLink: 'grupo-servicio'},
      {label: 'Grupo-Examen', routerLink: 'grupo-examen'},
      {label: 'Grupo-Diagnostico', routerLink: 'tipo-diagnostico'},
      /*{label: 'Grupo-Diagnostico', routerLink: 'grupo-diagnostico'},*/
      {label: 'Diagnostico', routerLink: 'diagnostico'},
      {label: 'Domicilio', routerLink: 'domicilio'},
      {label: 'Tasa', routerLink: 'tasa'},
      {label: 'Ente', routerLink: 'ente'},
    ];

    this.activeItem = this.items[0];

    this.router.navigate(['catalogos/tipo-solicitud']);



  }

}
