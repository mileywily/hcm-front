import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

import {
  AuthService,
  SolicitudesService,
  SolicitudService,
  UserRolesService,
  RolesService,
  MenuService
}
from 'src/app/services';

import {
  RolModelo
}
from 'src/app/models';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrls: ['./solicitudes.component.scss']
})
export class SolicitudesComponent implements OnInit {

  items: MenuItem[];
  activeItem: MenuItem;

  beneficiarioId: any;
  solicitudId: any;
  tipoAtencionId: any;

  usuario: any;

  roles: RolModelo[] = [];

  /* Codigo de los roles */
  codRolCitasCrearOrdenes: string;

  /* Habilitar los items del menu según rol */
  itemRolCitasCrearOrdenes: boolean = false;

  constructor(
      private solicitudesService: SolicitudesService,
      private router: Router,
      private activatedRoute: ActivatedRoute,
      private solicitudService: SolicitudService,
      private authService: AuthService,
      private rolesService: RolesService,
      private srvRolesByUser: UserRolesService,
      private menuService: MenuService
  ) {

    this.codRolCitasCrearOrdenes = this.rolesService.getCodRolCitasCrearOrden();
    this.itemRolCitasCrearOrdenes  = this.srvRolesByUser.buscarRolPorCodigo(this.codRolCitasCrearOrdenes).length > 0 ? true : false;


    this.tipoAtencionId = this.menuService.getTipoAtencion();
  }

  ngOnInit(): void {

    this.beneficiarioId = this.activatedRoute.snapshot.params.beneficiario_id;
    this.solicitudId = this.activatedRoute.snapshot.params.solicitud_id;

    let currentUser = this.authService.getCurrentUser();
    this.usuario  = JSON.parse(currentUser);

    /*
    if (this.itemRolCitasCrearOrdenes == true){
      this.items = [
        { label: 'Solicitud de Servicio', routerLink: 'solicitud-servicio/' + this.beneficiarioId + '/' + this.solicitudId} ,
        { label: 'Solicitudes del Beneficiario', routerLink: 'solicitud-listar/' + this.beneficiarioId},
        { label: 'Solicitudes por Titular', routerLink: 'solicitud-listar-titular/' + this.beneficiarioId},
      ];
    }else{
      this.items = [
        { label: 'Solicitud de Servicio', routerLink: 'solicitud-servicio/' + this.beneficiarioId + '/' + this.solicitudId}
      ];
    }
    */
    
     // OJO!!!!! VALIDAR VISTA DE TAQUILLA

    //Aun cuando ESTUDIOS ESPECIALES forma parte de TRIAJE, usamos los mismos componentes (FORMULARIOS) 
    //para su gestión debido a que los formularios son iguales en ambos casos.

    //En caso de que sean solicitudes de CITAS ó ESTUDIOS ESPECIALES
    if (this.tipoAtencionId == 2 )
    {
      this.items = [
        { label: 'Solicitud de Servicio', routerLink: 'solicitud-servicio/' + this.beneficiarioId + '/' + this.solicitudId} ,
        { label: 'Solicitudes del Beneficiario', routerLink: 'solicitud-listar/' + this.beneficiarioId},
        { label: 'Solicitudes por Titular', routerLink: 'solicitud-listar-titular/' + this.beneficiarioId}
      ];

      this.router.navigate(['solicitud-servicio', this.beneficiarioId, this.solicitudId], { relativeTo: this.activatedRoute });
    };

      //En caso de que sean solicitudes de  ESTUDIOS ESPECIALES
      if ( this.tipoAtencionId == 5)
      {
        this.items = [
          { label: 'Solicitud de Servicio', routerLink: 'solicitud-servicio-triaje/' + this.beneficiarioId + '/' + this.solicitudId} ,
          { label: 'Solicitudes del Beneficiario', routerLink: 'solicitud-listar/' + this.beneficiarioId},
          { label: 'Solicitudes por Titular', routerLink: 'solicitud-listar-titular/' + this.beneficiarioId}
        ];
  
        this.router.navigate(['solicitud-servicio-triaje', this.beneficiarioId, this.solicitudId], { relativeTo: this.activatedRoute });
      };


    //En caso de que sean solicitudes de IMAGEN ó LABORATORIO
    

         //En caso de que sean solicitudes de IMAGEN
      if (this.tipoAtencionId == 3 )
      {
      this.items = [
        { label: 'Solicitud de Servicio', routerLink: 'solicitud-servicio-triaje-img/' + this.beneficiarioId + '/' + this.solicitudId} ,
        { label: 'Solicitudes del Beneficiario', routerLink: 'solicitud-listar/' + this.beneficiarioId},
        { label: 'Solicitudes por Titular', routerLink: 'solicitud-listar-titular/' + this.beneficiarioId}
      ];

      this.router.navigate(['solicitud-servicio-triaje-img', this.beneficiarioId, this.solicitudId], { relativeTo: this.activatedRoute });
    
     }

     if (this.tipoAtencionId == 4 )
     {
      this.items = [
        { label: 'Solicitud de Servicio', routerLink: 'solicitud-servicio-triaje-lab/' + this.beneficiarioId + '/' + this.solicitudId} ,
        { label: 'Solicitudes del Beneficiario', routerLink: 'solicitud-listar/' + this.beneficiarioId},
        { label: 'Solicitudes por Titular', routerLink: 'solicitud-listar-titular/' + this.beneficiarioId}
      ];

         this.router.navigate(['solicitud-servicio-triaje-lab', this.beneficiarioId, this.solicitudId], { relativeTo: this.activatedRoute });
    }

   

     if (this.tipoAtencionId == 11 )
     {
      this.items = [
        { label: 'Solicitud de Servicio', routerLink: 'solicitud-servicio-electiva-quir/' + this.beneficiarioId + '/' + this.solicitudId} ,
        { label: 'Solicitudes del Beneficiario', routerLink: 'solicitud-listar/' + this.beneficiarioId},
        { label: 'Solicitudes por Titular', routerLink: 'solicitud-listar-titular/' + this.beneficiarioId}
      ];

      this.router.navigate(['solicitud-servicio-electiva-quir', this.beneficiarioId, this.solicitudId], { relativeTo: this.activatedRoute });
    }

     if (this.tipoAtencionId == 12 )
     {
      this.items = [
        { label: 'Solicitud de Servicio', routerLink: 'solicitud-servicio-elec-onc/' + this.beneficiarioId + '/' + this.solicitudId} ,
        { label: 'Solicitudes del Beneficiario', routerLink: 'solicitud-listar/' + this.beneficiarioId},
        { label: 'Solicitudes por Titular', routerLink: 'solicitud-listar-titular/' + this.beneficiarioId}
      ];

      this.router.navigate(['solicitud-servicio-elec-onc', this.beneficiarioId, this.solicitudId], { relativeTo: this.activatedRoute });
     }

     if (this.tipoAtencionId == 10 )
     {
      this.items = [
        { label: 'Solicitud de Servicio', routerLink: 'solicitud-servicio-elec-med/' + this.beneficiarioId + '/' + this.solicitudId} ,
        { label: 'Solicitudes del Beneficiario', routerLink: 'solicitud-listar/' + this.beneficiarioId},
        { label: 'Solicitudes por Titular', routerLink: 'solicitud-listar-titular/' + this.beneficiarioId}
      ];

      this.router.navigate(['solicitud-servicio-elec-med', this.beneficiarioId, this.solicitudId], { relativeTo: this.activatedRoute });
     }


    this.activeItem = this.items[0];

    //this.router.navigate(['solicitud-servicio', this.beneficiarioId, this.solicitudId], { relativeTo: this.activatedRoute });
  }

  ngOnDestroy(){
    this.solicitudService.setParams({});
  }




}
 