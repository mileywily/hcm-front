import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AuthService,
  GlobalService,
  UserRolesService,
  RolesService,
} from 'src/app/services';
import { Trabajador, RolModelo } from 'src/app/models';

declare var $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {

  user: Trabajador;
  asset: any;

  roles: RolModelo[] = [];

  /*=============================================*/
  /*** Definir los códigos de los roles        ***/
  /*=============================================*/

   /* Codigo de los roles  CATALOGOS (los catálogos deben ser manejador por perfil administrador)*/
  codRolCatalog: string;

  /* Codigo de los roles  CONSULTA BENEFICIARIOS (Esta consulta deben manejarla todos los perfiles)*/
  codRolBeneficiarios: string;

 /* =================================== */
  /* ======= MODULO CITAS MEDICAS ====== */
  /* =================================== */

  codRolCuposMedicos: string;
  codRolCalendario: string;
  codRolConsultaMedicos: string;

  codRolNuevaSolicitud: string;
  codRolModificarSolicitud: string;
  codRolConsultaSolicitud: string;

  codRolConsultaOrden: string;
  
  /* ================================================= */
  /* ======= MODULO TRIAJE ESTUDIOS ESPECIALES  ====== */
  /* ================================================= */

  codRolEstudiosEspeciales: string;

  /* ====================================== */
  /* ======= MODULO TRIAJE IMAGENES  ====== */
  /* ====================================== */


  /* ====================================== */
  /* ======= MODULO TRIAJE IMAGENES  ====== */
  /* ====================================== */


  /*=============================================*/
  /*** Habilitar los items del menu según rol ***/
  /*=============================================*/

  /*CATALOGOS*/

  itemRolCatalog: boolean = false;

  /*CONSULTA BENEFICIARIOS*/
  itemRolBeneficiarios: boolean = false;

  /*===== GESTION DE CITAS MEDICAS =====*/

  /*Gestion de cupos CITAS MEDICAS*/
  itemRolCuposMedicos: boolean    = false;    //Rol para ver link  de crear cupos de citas médicas
  itemRolCalendario: boolean      = false;    //Rol para ver link  de  consultar cupos de citas médicas
  itemRolConsultaMedicos: boolean = false;    //Rol para ver link  de  ver reporte médico de citas

  /*Gestion de solicitudes CITAS MEDICAS*/
  itemRolNuevaSolicitud: boolean      = false;   //Rol para ver link  de  crear nueva solicitud de citas médicas
  itemRolModificarSolicitud: boolean  = false;   //Rol para ver link  de  modificar solicitud de citas médicas
  itemRolConsultaSolicitud: boolean   = false;   //Rol para ver link  de  consultar solicitudes de citas médicas

  /*===== GESTION DE ESTUDIOS ESPECIALES =====*/

  
  /*===== GESTION DE IMAGENES =====*/



  /*===== GESTION DE LABORATORIOS =====*/



  constructor(
    private authService: AuthService,
    public globalService: GlobalService,
    private rolesService: RolesService,
    private srvRolesByUser: UserRolesService,
    private router: Router
  ) {

    this.codRolCatalog              =  this.rolesService.getCodRolCatalog();
    this.codRolBeneficiarios        =  this.rolesService.getCodRolBeneficiarios();
    this.codRolCuposMedicos         =  this.rolesService.getCodRolCitasVerLinkCrearCuposMedicos();
    this.codRolNuevaSolicitud       =  this.rolesService.getCodRolCitasVerLinkNuevaSolicitud();
    this.codRolModificarSolicitud   =  this.rolesService.getCodRolCitasVerLinkModificarSolicitud();
    this.codRolCalendario           =  this.rolesService.getCodRolCitasVerLinkCalendario();
    this.codRolConsultaSolicitud    =  this.rolesService.getCodRolCitasVerLinkConsultas();
    this.codRolConsultaOrden        =  this.rolesService.getCodRolCitasVerLinkModificarOrdenes();
    this.codRolConsultaMedicos      =  this.rolesService.getCodRolCitasVerLinkReporteMedico();
    this.codRolEstudiosEspeciales   =  this.rolesService.getCodRolEstudiosEspeciales();
    
  }

  ngOnInit(): void {
    $('[data-widget="treeview"]').Treeview('init');

    let currentUser = this.authService.getCurrentUser();
    this.user = JSON.parse(currentUser);
    this.asset = this.globalService.urlAssets;

    /* Se obtienen todos los roles del usuario de sesion */
    this.getRolIdUserBySir();

  }


  getRolIdUserBySir() {

    this.srvRolesByUser.getIdUserBySir(this.user.siglado)
      .toPromise()
      .then(results => {

        if (results) {
          this.findRolByUser(results.idUsuario);
        }
      })
      .catch(err => { console.log(err) });

  } 

  findRolByUser(idUser: any) {

    this.srvRolesByUser.getRoles(idUser)
      .toPromise()
      .then(roles => {
        this.roles = roles;
        this.srvRolesByUser.setRolesLocalStorage(this.roles);
        this.permissionsByUser();
      })
      .catch(err => { console.log(err); });
  }

  permissionsByUser() {

    this.itemRolCatalog             = this.srvRolesByUser.buscarRolPorCodigo(this.codRolCatalog).length > 0 ? true : false;
    this.itemRolBeneficiarios       = this.srvRolesByUser.buscarRolPorCodigo(this.codRolBeneficiarios).length > 0 ? true : false;
    this.itemRolCuposMedicos        = this.srvRolesByUser.buscarRolPorCodigo(this.codRolCuposMedicos).length > 0 ? true : false;
    this.itemRolNuevaSolicitud      = this.srvRolesByUser.buscarRolPorCodigo(this.codRolNuevaSolicitud).length > 0 ? true : false;
    this.itemRolModificarSolicitud  = this.srvRolesByUser.buscarRolPorCodigo(this.codRolModificarSolicitud).length > 0 ? true : false;
    this.itemRolCalendario          = this.srvRolesByUser.buscarRolPorCodigo(this.codRolCalendario).length > 0 ? true : false;
    this.itemRolConsultaSolicitud   = this.srvRolesByUser.buscarRolPorCodigo(this.codRolConsultaSolicitud).length > 0 ? true : false;
    this.itemRolConsultaMedicos     = this.srvRolesByUser.buscarRolPorCodigo(this.codRolConsultaMedicos).length > 0 ? true : false;
  }

}
