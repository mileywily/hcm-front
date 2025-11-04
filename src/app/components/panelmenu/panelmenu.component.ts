import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';


import {
  MenuService,
  AuthService,
  GlobalService,
  UserRolesService,
  RolesService
}
from 'src/app/services';

import {
  Trabajador,
  RolModelo
}
from 'src/app/models';

@Component({
  selector: 'app-panelmenu',
  templateUrl: './panelmenu.component.html',
  styleUrls: ['./panelmenu.component.scss']
})
export class PanelmenuComponent implements OnInit {

  items: MenuItem[];

  user: Trabajador;
  asset: any;

  roles: RolModelo[] = [];


  /*========CODIGO DE ROLES========*/

  /* Codigo de los roles  Catalogos (los catálogos deben ser manejador por perfil administrador)*/
  codRolCatalog: string;                //ROL-CITAS-V-CATALOG
  /* Codigo de los roles  consulta beneficiario (Esta consulta deben manejarla todos los perfiles)*/
  codRolBeneficiarios: string;          //ROL-CITAS-V-BENEF

  /*códigos CITAS MEDICAS*/
  codRolCitasVerLinkCrearCuposMedicos: string;          //ROL-CITAS-V-CUP_MED
  codRolCitasVerLinkCalendario: string;                 //ROL-CITAS-V-CAL
  codRolCitasVerLinkReporteMedico: string;              //ROL-CITAS-V-C-MED
  codRolCitasVerLinkNuevaSolicitud: string;             //ROL-CITAS-V-N-SOL
  codRolCitasVerLinkModificarSolicitud: string;         //ROL-CITAS-V-M-SOL
  codRolCitasVerLinkConsultas: string;                  //ROL-CITAS-V-C-SOL
  codRolCitasVerLinkModificarOrdenes: string;           //ROL-CITAS-V-C-ORD

  /*códigos ESTUDIOS ESPECIALES */

  codRolEstudiosEspecialesVerLinkCrearCupos: string;           //ROL-TRIAJE-V-CUP-EE
  codRolEstudiosEspecialesVerLinkCalendario: string;           //ROL-TRIAJE-V-CAL-EE
  codRolEstudiosEspecialesVerLinkReporteCupos: string;         //ROL-TRIAJE-V-REP-CUP-EE
  codRolEstudiosEspecialesCrearSolicitud: string;              //ROL-TRIAJE-CRE-SOL-EE;
  codRolEstudiosEspecialesModificarSolicitud : string;         //ROL-TRIAJE-MOD-SOL-EE
  codRolEstudiosEspecialesVerLinkModificarOrden: string;       //'ROL-TRIAJE-V-C-SOL-EE
  codRolEstudiosEspecialesVerLinkConsultas: string;            //'ROL-TRIAJE-V-C-SOL-EE'

  /*códigos IMAGENOLOGIA */
  codRolImagenVerLinkCrearCupos: string;                    //'ROL-TRIAJE-V-CUP-IMG'
  codRolImagenVerLinkConsultaCalendario: string;            //ROL-TRIAJE-V-CAL-IMG
  codRolImagenVerLinkReporteCupos: string;                  //ROL-TRIAJE-V-REP-CUP-IMG
  codRolImagenCrearSolicitud: string;                       //'ROL-TRIAJE-CRE-SOL-IMG'
  codRolImagenModificarSolicitud: string;             //ROL-TRIAJE-MOD-SOL-IMG
  codRolImagenVerLinkModificarOrden: string;                //ROL-TRIAJE-V-C-ORD-IMG
  codRolImagenConsultasSolicitudes: string;                 //ROL-TRIAJE-V-C-SOL-IMG
  

  /*códigos LABORATORIO */
  codRolLaboratorioVerLinkCrearCupos: string;              //'ROL-TRIAJE-V-CUP-LAB'
  codRolLaboratorioVerLinkConsultaCalendario: string;      //ROL-TRIAJE-V-CAL-LAB
  codRolLaboratorioVerLinkReporteCupos: string;            //ROL-TRIAJE-V-REP-CUP-LAB
  codRolLaboratorioCrearSolicitud: string;                 //'ROL-TRIAJE-CRE-SOL-LAB'
  codRolLaboratorioModificarSolicitud: string;             //ROL-TRIAJE-MOD-SOL-LAB
  codRolLaboratorioVerLinkModificarOrden: string;          //ROL-TRIAJE-V-C-ORD-LAB
  codRolLaboratorioConsultaSolicitud: string;              //ROL-TRIAJE-V-C-SOL-LAB


  /*códigos ELECTIVA QUIRURGICA*/
  codRolElectivaQUIVerLinkCrearCupos: string;              //'ROL-ELEC-V-CUP-QUI'
  codRolElectivaQUIVerLinkConsultaCalendario: string;      //'ROL-ELEC-V-CAL-QUI'
  codRolElectivaQUIVerLinkReporteCupos: string;            //'ROL-ELEC-V-REP-CUP-QUI'
  codRolElectivaQUICrearSolicitud: string;                 //'ROL-ELEC-CRE-SOL-QUI'
  codRolElectivaQUIModificarSolicitud: string;             //ROL-ELEC-MOD-SOL-QUI
  codRolElectivaQUIVerLinkModificarOrden: string;          //ROL-ELEC-V-C-ORD-QUI
  codRolElectivaQUIConsultaSolicitud: string;              //ROL-ELEC-V-C-SOL-QUI

   /*códigos ELECTIVA ONCOLOGICO*/
   codRolElectivaONVerLinkCrearCupos: string;              //'ROL-ELEC-V-CUP-ON'
   codRolElectivaONVerLinkConsultaCalendario: string;      //'ROL-ELEC-V-CAL-ON'
   codRolElectivaONVerLinkReporteCupos: string;            //'ROL-ELEC-V-REP-CUP-ON'
   codRolElectivaONCrearSolicitud: string;                 //'ROL-ELEC-CRE-SOL-ON'
   codRolElectivaONModificarSolicitud: string;             //ROL-ELEC-MOD-SOL-ON
   codRolElectivaONVerLinkModificarOrden: string;          //ROL-ELEC-V-C-ORD-ON
   codRolElectivaONConsultaSolicitud: string;              //ROL-ELEC-V-C-SOL-ON


  /*=============ITEMS=============*/

  /*Catalogos*/
  itemRolCatalog: boolean = false;                      //ROL-CITAS-V-CATALOG Rol para ver link  de Catalogos
  /*consulta beneficiario*/
  itemRolBeneficiarios: boolean = false;                //ROL-CITAS-V-BENEF   Rol para ver link  de consulta beneficiario

  /*Gestion de cupos CITAS MEDICAS*/
  itemRolCitasVerLinkCrearCuposMedicos: boolean       = false;   //ROL-CITAS-V-CUP_MED     Rol para ver link  de crear cupos de citas médicas
  itemRolCitasVerLinkCalendario: boolean              = false;   //ROL-CITAS-V-CAL         Rol para ver link  de  consultar cupos de citas médicas
  itemRolCitasVerLinkReporteMedico: boolean           = false;   //ROL-CITAS-V-C-MED       Rol para ver link  de  ver reporte médico de citas
  itemRolCitasVerLinkNuevaSolicitud: boolean          = false;   //ROL-CITAS-V-N-SOL Rol para ver link  de  crear nueva solicitud de citas médicas
  itemRolCitasVerLinkModificarSolicitud: boolean      = false;   //ROL-CITAS-V-M-SOL Rol para ver link  de  modificar solicitud de citas médicas
  itemRolCitasVerLinkConsultas: boolean               = false;   //ROL-CITAS-V-C-SOL Rol para ver link  de  consultar solicitudes de citas médicas
  itemRolCitasVerLinkModificarOrdenes: boolean        = false;   //ROL-CITAS-V-C-SOL Rol para ver link  de  consultar solicitudes de citas médicas
  
    /*Gestion de TRIAJE ESTUDIOS ESPECIALES*/
  itemRolEstudiosEspecialesVerLinkCrearCupos: boolean      = false;   //ROL-TRIAJE-V-CUP-EE
  itemRolEstudiosEspecialesVerLinkCalendario: boolean      = false;   //ROL-TRIAJE-V-CAL-EE
  itemRolEstudiosEspecialesVerLinkReporteCupos: boolean    = false;   //ROL-TRIAJE-V-REP-CUP-EE
  itemRolEstudiosEspecialesCrearSolicitud: boolean         = false;   //ROL-TRIAJE-CRE-SOL-EE;
  itemRolEstudiosEspecialesModificarSolicitud: boolean     = false;   //ROL-TRIAJE-MOD-SOL-EE
  itemRolEstudiosEspecialesVerLinkModificarOrden: boolean  = false;   //ROL-TRIAJE-V-C-SOL-EE
  itemRolEstudiosEspecialesVerLinkConsultas: boolean       = false;   //ROL-TRIAJE-V-C-SOL-EE

  /*Gestion de TRIAJE IMAGENES*/
  itemRolImagenVerLinkCrearCupos: boolean                    = false;   //ROL-TRIAJE-V-CUP-IMG
  itemRolImagenVerLinkConsultaCalendario: boolean            = false;   //ROL-TRIAJE-V-CAL-IMG
  itemRolImagenVerLinkReporteCupos: boolean                  = false;   //ROL-TRIAJE-V-REP-CUP-IMG
  itemRolImagenCrearSolicitud: boolean                       = false;   //ROL-TRIAJE-CRE-SOL-IMG;
  itemRolImagenModificarSolicitud: boolean                   = false;   //ROL-TRIAJE-MOD-SOL-IMG
  itemRolImagenVerLinkModificarOrden: boolean                = false;   //ROL-TRIAJE-V-C-ORD-IMG
  itemRolImagenConsultasSolicitudes: boolean                 = false;   //ROL-TRIAJE-V-C-SOL-IMG

  /*Gestion de TRIAJE LABORATORIO*/
  itemRolLaboratorioVerLinkCrearCupos: boolean          = false;    //'ROL-TRIAJE-V-CUP-LAB'
  itemRolLaboratorioVerLinkConsultaCalendario: boolean  = false;    //ROL-TRIAJE-V-CAL-LAB
  itemRolLaboratorioVerLinkReporteCupos: boolean        = false;    //ROL-TRIAJE-V-REP-CUP-LAB
  itemRolLaboratorioCrearSolicitud: boolean             = false;    //'ROL-TRIAJE-CRE-SOL-LAB'
  itemRolLaboratorioModificarSolicitud: boolean         = false;    //ROL-TRIAJE-MOD-SOL-LAB
  itemRolLaboratorioVerLinkModificarOrden: boolean      = false;    //ROL-TRIAJE-V-C-ORD-LAB
  itemRolLaboratorioConsultaSolicitud: boolean          = false;    //ROL-TRIAJE-V-C-SOL-LAB



  //QUIRUQUICOS
  itemRolElectivaQUIVerLinkCrearCupos: boolean       = false;        //ROL-ELECT-V-CUP-QUI
  itemRolElectivaQUICrearSolicitud: boolean             = false;    //ROL-ELECT-CRE-SOL-QUI
  itemRolElectivaQUIModificarSolicitud : boolean =false;            //ROL-ELECT-MOD-SOL-QUI
  itemRolElectivaQUIVerLinkModificarOrden: boolean      = false;    //ROL-ELECT-V-C-ORD-QUI
  itemRolElectivaQUIVerLinkConsultaCalendario: boolean  = false;    //ROL-ELECT-V-CAL-QUI
  itemRolElectivaQUIVerLinkReporteCupos: boolean        = false;    //ROL-ELECT-V-REP-CUP-QUI
  itemRolElectivaQUIconsultaSolicitud =false ;                     //ROL-ELECT-V-C-SOL-QUI
  
  
  //ONCOLOGICO
  itemRolElectivaONVerLinkCrearCupos : boolean = false;             //ROL-ELECT-V-CUP-ON
  itemRolElectivaONCrearSolicitud: boolean             = false;    //ROL-ELECT-CRE-SOL-ON
  itemRolElectivaONModificarSolicitud : boolean =false;            //ROL-ELECT-MOD-SOL-ON
  itemRolElectivaONVerLinkModificarOrden: boolean      = false;    //ROL-ELECT-V-C-ORD-ON
  itemRolElectivaONVerLinkConsultaCalendario: boolean  = false;    //ROL-ELECT-V-CAL-ON
  itemRolElectivaONVerLinkReporteCupos: boolean        = false;    //ROL-ELECT-V-REP-CUP-ON
  itemRolElectivaONconsultaSolicitud =false ;                     //ROL-ELECT-V-C-SOL-ON

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    public globalService: GlobalService,
    private rolesService: RolesService,
    private srvRolesByUser: UserRolesService,
    private menuService:  MenuService

  ) { 


 

    /*****   ROLES GENERAL  *****/
    this.codRolCatalog                            =  this.rolesService.getCodRolCatalog();
    this.codRolBeneficiarios                      =  this.rolesService.getCodRolBeneficiarios();

    /*****   ROLES DE CITAS  *****/
    this.codRolCitasVerLinkCrearCuposMedicos      =  this.rolesService.getCodRolCitasVerLinkCrearCuposMedicos();
    this.codRolCitasVerLinkCalendario             =  this.rolesService.getCodRolCitasVerLinkCalendario();
    this.codRolCitasVerLinkReporteMedico          =  this.rolesService.getCodRolCitasVerLinkReporteMedico();
    this.codRolCitasVerLinkNuevaSolicitud         =  this.rolesService.getCodRolCitasVerLinkNuevaSolicitud();
    this.codRolCitasVerLinkModificarSolicitud     =  this.rolesService.getCodRolCitasVerLinkModificarSolicitud();
    this.codRolCitasVerLinkConsultas              =  this.rolesService.getCodRolCitasVerLinkConsultas();
    this.codRolCitasVerLinkModificarOrdenes       =  this.rolesService.getCodRolCitasVerLinkModificarOrdenes();
    this.codRolCitasVerLinkConsultas              =  this.rolesService.getCodRolCitasVerLinkConsultas();
    
    /*****   ROLES DE TRIAJE ESTUDIOS ESPECIALES  *****/
    this.codRolEstudiosEspecialesVerLinkCrearCupos           =  this.rolesService.getCodRolEstudiosEspecialesVerLinkCrearCupos();    
    this.codRolEstudiosEspecialesVerLinkCalendario           =  this.rolesService.getCodRolEstudiosEspecialesVerLinkCalendario();     
    this.codRolEstudiosEspecialesVerLinkReporteCupos         =  this.rolesService.getCodRolEstudiosEspecialesVerLinkReporteCupos();     
    this.codRolEstudiosEspecialesCrearSolicitud              =  this.rolesService.getCodRolEstudiosEspecialesCrearSolicitud();             
    this.codRolEstudiosEspecialesModificarSolicitud          =  this.rolesService.getCodRolEstudiosEspecialesModificarSolicitud();       
    this.codRolEstudiosEspecialesVerLinkModificarOrden       =  this.rolesService.getCodRolEstudiosEspecialesVerLinkModificarOrden();    
    this.codRolEstudiosEspecialesVerLinkConsultas            =  this.rolesService.getCodRolEstudiosEspecialesVerLinkConsultas();       

    /*****   ROLES DE TRIAJE IMAGEN  *****/

    this.codRolImagenVerLinkCrearCupos            =  this.rolesService.getCodRolImagenVerLinkCrearCupos();   
    this.codRolImagenVerLinkConsultaCalendario    =  this.rolesService.getCodRolImagenVerLinkConsultaCalendario();   
    this.codRolImagenVerLinkReporteCupos          =  this.rolesService.getCodRolImagenVerLinkReporteCupos();   
    this.codRolImagenCrearSolicitud               =  this.rolesService.getCodRolImagenCrearSolicitud();   
    this.codRolImagenModificarSolicitud           =  this.rolesService.getCodRolImagenModificarSolicitud();   
    this.codRolImagenVerLinkModificarOrden        =  this.rolesService.getCodRolImagenVerLinkModificarOrden();   
    this.codRolImagenConsultasSolicitudes         =  this.rolesService.getCodRolImagenConsultasSolicitudes();   

    /*****   ROLES DE TRIAJE LABORATORIO  *****/

    this.codRolLaboratorioVerLinkCrearCupos          =  this.rolesService.getCodRolLaboratorioVerLinkCrearCupos();    
    this.codRolLaboratorioVerLinkConsultaCalendario  =  this.rolesService.getCodRolLaboratorioVerLinkConsultaCalendario();    
    this.codRolLaboratorioVerLinkReporteCupos        =  this.rolesService.getCodRolLaboratorioVerLinkReporteCupos();    
    this.codRolLaboratorioCrearSolicitud             =  this.rolesService.getCodRolLaboratorioCrearSolicitud();    
    this.codRolLaboratorioModificarSolicitud         =  this.rolesService.getCodRolLaboratorioModificarSolicitud();    
    this.codRolLaboratorioVerLinkModificarOrden      =  this.rolesService.getCodRolLaboratorioVerLinkModificarOrden();    
    this.codRolLaboratorioConsultaSolicitud          =  this.rolesService.getCodRolLaboratorioConsultaSolicitud();     
    

    
    /*****   ROLES DE TRIAJE QUIRURGICO  *****/

    this.codRolElectivaQUIVerLinkCrearCupos          =  this.rolesService.getCodRolElectivaQUIVerLinkCrearCupos();    
    this.codRolElectivaQUIVerLinkConsultaCalendario  =  this.rolesService.getCodRolElectivaQUIVerLinkConsultaCalendario();    
    this.codRolElectivaQUIVerLinkReporteCupos        =  this.rolesService.getCodRolElectivaQUIVerLinkReporteCupos();    
    this.codRolElectivaQUICrearSolicitud             =  this.rolesService.getCodRolElectivaQUICrearSolicitud();    
    this.codRolElectivaQUIModificarSolicitud         =  this.rolesService.getCodRolElectivaQUIModificarSolicitud();    
    this.codRolElectivaQUIVerLinkModificarOrden      =  this.rolesService.getCodRolElectivaQUIVerLinkModificarOrden();    
    this.codRolElectivaQUIConsultaSolicitud          =  this.rolesService.getCodRolElectivaQUIConsultaSolicitud();     
    


    
    /*****   ROLES DE TRIAJE ONCOLOGICO  *****/

    this.codRolElectivaONVerLinkCrearCupos          =  this.rolesService.getCodRolElectivaONVerLinkCrearCupos();    
    this.codRolElectivaONVerLinkConsultaCalendario  =  this.rolesService.getCodRolElectivaONVerLinkConsultaCalendario();    
    this.codRolElectivaONVerLinkReporteCupos        =  this.rolesService.getCodRolElectivaONVerLinkReporteCupos();    
    this.codRolElectivaONCrearSolicitud             =  this.rolesService.getCodRolElectivaONCrearSolicitud();    
    this.codRolElectivaONModificarSolicitud         =  this.rolesService.getCodRolElectivaONModificarSolicitud();    
    this.codRolElectivaONVerLinkModificarOrden      =  this.rolesService.getCodRolElectivaONVerLinkModificarOrden();    
    this.codRolElectivaONConsultaSolicitud          =  this.rolesService.getCodRolElectivaONConsultaSolicitud();     
    


  }

  ngOnInit() {
    /*Perfil-Rol del usuario*/

    let currentUser = this.authService.getCurrentUser();
    this.user = JSON.parse(currentUser);
    this.asset = this.globalService.urlAssets;

    /* Se obtienen todos los roles del usuario de sesion */
    //this.getRolIdUserBySir();
    this.permissionsByUser() 
  }

  construirMenu(){
    this.items = [
      {
        label: 'Catálogos',
        icon:'pi pi-fw pi-th-large',
        routerLink:'catalogos',
        visible: this.itemRolCatalog
      },
      {
        label: 'Beneficiarios',
        icon:'pi pi-fw pi-id-card',
        routerLink:'consultar-beneficiario',
        visible: this.itemRolBeneficiarios
      },
      {
      label: 'Registro de cupos',
      icon:'pi pi-fw pi-ticket',
      visible: (this.itemRolCitasVerLinkCrearCuposMedicos || this.itemRolEstudiosEspecialesVerLinkCrearCupos
                || this.itemRolImagenVerLinkCrearCupos  || this.itemRolLaboratorioVerLinkCrearCupos),  
      items: [
          {
            
            label: 'Citas Médicas',
            icon:'pi pi-fw pi-arrow-circle-right',
            command: () => this.opcionRegistrarCupo(2),
            visible: (this.itemRolCitasVerLinkCrearCuposMedicos  && this.menuService.getTipoSolicitud() == 1)
          },

          {
            label: 'Estudios Especiales',
            icon:'pi pi-fw pi-arrow-circle-right',
            command: () => this.opcionRegistrarCupo(5),
            visible: (this.itemRolEstudiosEspecialesVerLinkCrearCupos && this.menuService.getTipoSolicitud() == 7)
          },

          {
            label: 'Imagenología',
            icon:'pi pi-fw pi-arrow-circle-right',
            command: () => this.opcionRegistrarCupo(3),
            visible: (this.itemRolImagenVerLinkCrearCupos && this.menuService.getTipoSolicitud() == 7)
          },

          {
            label: 'Laboratorios',
            icon:'pi pi-fw pi-arrow-circle-right',
            command: () => this.opcionRegistrarCupo(4),
            visible: (this.itemRolLaboratorioVerLinkCrearCupos  && this.menuService.getTipoSolicitud() == 7)
          }
      ]
      },
      {
        label: 'Modificar de cupos',
        icon:'pi pi-fw pi-ticket',
        visible: (this.itemRolCitasVerLinkCrearCuposMedicos || this.itemRolEstudiosEspecialesVerLinkCrearCupos
                  || this.itemRolImagenVerLinkCrearCupos  || this.itemRolLaboratorioVerLinkCrearCupos),  
        items: [
            {
              
              label: 'Citas Médicas',
              icon:'pi pi-fw pi-arrow-circle-right',
              command: () => this.opcionModificarCupo(2),
              visible: (this.itemRolCitasVerLinkCrearCuposMedicos  && this.menuService.getTipoSolicitud() == 1)
            },
  
            {
              label: 'Estudios Especiales',
              icon:'pi pi-fw pi-arrow-circle-right',
              command: () => this.opcionModificarCupo(5),
              visible: (this.itemRolEstudiosEspecialesVerLinkCrearCupos && this.menuService.getTipoSolicitud() == 7)
            },
  
            {
              label: 'Imagenología',
              icon:'pi pi-fw pi-arrow-circle-right',
              command: () => this.opcionModificarCupo(3),
              visible: (this.itemRolImagenVerLinkCrearCupos && this.menuService.getTipoSolicitud() == 7)
            },
  
            {
              label: 'Laboratorios',
              icon:'pi pi-fw pi-arrow-circle-right',
              command: () => this.opcionModificarCupo(4),
              visible: (this.itemRolLaboratorioVerLinkCrearCupos  && this.menuService.getTipoSolicitud() == 7)
            }
        ]
        }
      ,
      {
      label: 'Solicitudes Citas',
      visible: this.menuService.getTipoSolicitud() == 1, //CITAS
      icon:'pi pi-fw pi-phone',
      expanded: true,
      items: [
          {
              label: 'Nueva solicitud',
              icon:'pi pi-fw pi-file',
              command: () => this.opcionNuevaSolicitud(2),
              visible: this.itemRolCitasVerLinkNuevaSolicitud 
          },
          {
              label: 'Modificar solicitud',
              icon:'pi pi-fw pi-copy',
              command: () => this.opcionModificarSolicitud(2),
              visible: this.itemRolCitasVerLinkModificarSolicitud
 
          },
          {
              label: 'Modificar Orden',
              icon:'pi pi-fw pi-pencil',
              command: () => this.opcionModificarOrden(2),
              visible: this.itemRolCitasVerLinkModificarOrdenes
          },
          {
            label: 'Calendario',
            icon:'pi pi-fw pi-calendar',
            command: () => this.opcionConsultarCalendario(2),
            visible:  this.itemRolCitasVerLinkCalendario 

          },
          {
              label: 'Reporte Médico',
              icon:'pi pi-fw pi-user',
              command: () => this.opcionReporteMedico(2),
              visible:  this.itemRolCitasVerLinkReporteMedico 
          },
          {
            label: 'Consultas',
            icon:'pi pi-fw pi-search',
            expanded: true,
            visible: this.itemRolCitasVerLinkConsultas,
            items: [
              {
                  label: 'Solicitudes',
                  icon:'pi pi-fw pi-bars',
                  routerLink:'servicios-solicitud'
              },
              {
                  label: 'Sol./Servicios Pendiente',
                  icon:'pi pi-fw pi-list',
                  command: () => this.opcionConsultaSolicitudesAbiertas(2)
              },
              {
                  label: 'Ordenes',
                  icon:'pi pi-fw pi-spinner ',
                  routerLink:'servicios-orden'
              },
              { 
                label: 'Auditorias',
                icon:'pi pi-fw pi-spinner ',
                command: () => this.opcionAuditorias(2)
                
              }
            ]
            }         
      ]
      },
      {
        label: 'Solicitudes Triaje',
        icon:'pi pi-fw pi-users',
        expanded: true,
        visible: this.menuService.getTipoSolicitud() == 7, //TRIAJE
        items: [
            {
                label: 'Estudios Especiales',
                visible: this.itemRolEstudiosEspecialesCrearSolicitud,
                expanded: true,
                items: [
                    {
                        label: 'Nueva solicitud',
                        icon:'pi pi-fw pi-file',
                        command: () => this.opcionNuevaSolicitud(5),
                        visible: this.itemRolEstudiosEspecialesCrearSolicitud
                    },
                    {
                        label: 'Modificar Solicitud',
                        icon:'pi pi-fw pi-copy',
                        command: () => this.opcionModificarSolicitud(5),
                        visible: this.itemRolEstudiosEspecialesModificarSolicitud
                    },
                    {
                        label: 'Modificar Orden',
                        icon:'pi pi-fw pi-pencil',
                        command: () => this.opcionModificarOrden(5),
                        visible: this.itemRolEstudiosEspecialesVerLinkModificarOrden
                    },
                    {
                      label: 'Calendario',
                      icon:'pi pi-fw pi-calendar',
                      command: () => this.opcionConsultarCalendario(5),
                      visible: this.itemRolEstudiosEspecialesVerLinkCalendario 
                    },
                    {
                        label: 'Reporte Cupos',
                        icon:'pi pi-fw pi-user',
                        command: () => this.opcionReporteMedico(5),
                        visible: this.itemRolEstudiosEspecialesVerLinkReporteCupos 
                    },
                    {
                      label: 'Consulta Reportes',
                      icon:'pi pi-fw pi-search',
                      visible: this.itemRolEstudiosEspecialesVerLinkConsultas,
                      items: [
                        {
                            label: 'Solicitudes',
                            icon:'pi pi-fw pi-bars',
                            command: () => this.opcionConsultaSolicitudes(5)
                        },
                        {
                            label: 'Sol./Servicios Pendiente',
                            icon:'pi pi-fw pi-list',
                            command: () => this.opcionConsultaSolicitudesAbiertas(5)
                        },
                        {
                            label: 'Ordenes',
                            icon:'pi pi-fw pi-spinner ',
                            command: () => this.opcionConsultaOrdenes(5)
                        },
                        { 
                          label: 'Auditorias',
                          icon:'pi pi-fw pi-spinner ',
                          command: () => this.opcionAuditorias(5)
                          
                        }
                      ]
                      }
                    
                ]
            },
            {
                label: 'Imagenología',
                visible: this.itemRolImagenCrearSolicitud,
                expanded: true,
                items: [
                    {
                        label: 'Nueva solicitud',
                        icon:'pi pi-fw pi-file',
                        command: () => this.opcionNuevaSolicitud(3),
                        visible: this.itemRolImagenCrearSolicitud
                    },
                    {
                        label: 'Modificar solicitud',
                        icon:'pi pi-fw pi-copy',
                        command: () => this.opcionModificarSolicitudTriaje(3),
                        visible: this.itemRolImagenModificarSolicitud
                    },
                    {
                        label: 'Modificar orden',
                        icon:'pi pi-fw pi-pencil',
                        command: () => this.opcionModificarOrdenTriaje(3),
                        visible: this.itemRolImagenVerLinkModificarOrden
                    },
                    {
                      label: 'Calendario',
                      icon:'pi pi-fw pi-calendar',
                      command: () => this.opcionConsultarCalendario(3),
                      visible: this.itemRolImagenVerLinkConsultaCalendario
                    },
                    {
                        label: 'Reporte Cupos Imagenología',
                        icon:'pi pi-fw pi-user',
                        command: () => this.opcionReporteCuposTriaje(3),
                        visible: this.itemRolImagenVerLinkReporteCupos
                    },
                    {
                      label: 'Consulta Reportes',
                      icon:'pi pi-fw pi-search',
                      visible: this.itemRolImagenConsultasSolicitudes,
                      items: [
                        {
                            label: 'Solicitudes',
                            icon:'pi pi-fw pi-bars',
                            command: () => this.opcionConsultaSolicitudes(3)

                        },
                        {
                        label: 'Sol./Servicios Pendiente',
                        icon:'pi pi-fw pi-list',
                        command: () => this.opcionConsultaSolicitudesAbiertasImagen(3)
                        },
                        {
                            label: 'Ordenes',
                            icon:'pi pi-fw pi-spinner ',
                            command: () => this.opcionConsultaOrdenesImagen(3)
                        },
                        { 
                          label: 'Auditorias',
                          icon:'pi pi-fw pi-spinner ',
                          command: () => this.opcionAuditorias(3)
                          
                        }
                      ]
                      },
                ]
            },
            {
                label: 'Laboratorio',
                visible: this.itemRolLaboratorioCrearSolicitud,
                expanded: true,
                items: [
                    {
                        label: 'Nueva solicitud',
                        icon:'pi pi-fw pi-file',
                        command: () => this.opcionNuevaSolicitud(4),
                        visible: this.itemRolLaboratorioCrearSolicitud  
                    },
                    {
                        label: 'Modificar solicitud',
                        icon:'pi pi-fw pi-copy',
                        command: () => this.opcionModificarSolicitudTriajeLab(4),
                        visible: this.itemRolLaboratorioModificarSolicitud  
                    },
                    {
                        label: 'Modificar Orden',
                        icon:'pi pi-fw pi-pencil',
                        command: () => this.opcionModificarOrdenTriajeLab(4),
                        visible: this.itemRolLaboratorioVerLinkModificarOrden 
                    },
                    {
                      label: 'Calendario',
                      icon:'pi pi-fw pi-calendar',
                      command: () => this.opcionConsultarCalendario(4),
                      visible: this.itemRolLaboratorioVerLinkConsultaCalendario
                    },
                    {
                        label: 'Reporte Cupos Laboratorio',
                        icon:'pi pi-fw pi-user',
                        command: () => this.opcionReporteCuposLab(4),
                        visible: this.itemRolLaboratorioVerLinkReporteCupos
                    },
                    {
                      label: 'Consulta Reportes',
                      icon:'pi pi-fw pi-search',
                      visible: this.itemRolLaboratorioConsultaSolicitud,
                      items: [
                        {
                            label: 'Solicitudes',
                            icon:'pi pi-fw pi-bars',
                            command: () => this.opcionConsultaSolicitudes(4)
                        },
                        {
                        label: 'Sol./Servicios Pendiente',
                        icon:'pi pi-fw pi-list',
                        command: () => this.opcionConsultaSolicitudesAbiertasLab(4)
                        },
                        {
                            label: 'Ordenes',
                            icon:'pi pi-fw pi-spinner ',
                            command: () => this.opcionConsultaOrdenesLab(4)
                        },
                        { 
                          label: 'Auditorias',
                          icon:'pi pi-fw pi-spinner ',
                          command: () => this.opcionAuditorias(4)
                          
                        }
                      ]
                      }
                ]
            }
        ]
        },
        /*Electivas*/ 
        {
          label: 'Solicitudes Electivas',
          icon:'pi pi-fw pi-users',
          expanded: true,
          visible: this.menuService.getTipoSolicitud() == 3, //ELECTIVAS   
          items: [ 
            {
                  label: 'Procedimientos Electivos',
                  visible: this.itemRolElectivaQUICrearSolicitud,
                  expanded: true,
                  items: [
                    {
                      label: 'Nueva solicitud',
                      icon:'pi pi-fw pi-file',
                      command: () => this.opcionNuevaSolicitud(11),
                      visible: this.itemRolElectivaQUICrearSolicitud  
                    },
                    {
                        label: 'Modificar solicitud',
                        icon:'pi pi-fw pi-copy',
                        command: () => this.opcionModificarSolicitudElectQuirurgico(11),
                        visible: this.itemRolElectivaQUIModificarSolicitud  
                    },
                    {
                        label: 'Modificar Orden',
                        icon:'pi pi-fw pi-pencil',
                        command: () => this.opcionModificarOrdenElectQuirurgico(11),
                        visible: false //this.itemRolElectivaQUIVerLinkModificarOrden 
                    },
                    {
                      label: 'Calendario',
                      icon:'pi pi-fw pi-calendar',
                      command: () => this.opcionConsultarCalendarioElectivas(11),
                      visible: false //this.itemRolElectivaQUIVerLinkConsultaCalendario
                    }
                    ,
                    {
                        label: 'Reporte Cupos Electivas Quirurgicas',
                        icon:'pi pi-fw pi-user',
                        command: () => this.opcionReporteCuposElectivasQUI(11),
                        visible: false //this.itemRolElectivaQUIVerLinkReporteCupos
                    },
                    {
                      label: 'Consulta Reportes',
                      icon:'pi pi-fw pi-search',
                      visible: false, //this.itemRolElectivaQUIconsultaSolicitud,
                      items: [
                        {
                            label: 'Solicitudes',
                            icon:'pi pi-fw pi-bars',
                            command: () => this.opcionConsultaSolicitudesElectivaQUI(11),
                            visible: false
                        },
                        {
                        label: 'Sol./Servicios Pendiente',
                        icon:'pi pi-fw pi-list',
                        command: () => this.opcionConsultaSolicitudesAbiertasQUI(11),
                        visible: false
                        },
                        {
                            label: 'Ordenes',
                            icon:'pi pi-fw pi-spinner ',
                            command: () => this.opcionConsultaOrdenesQUI(11),
                            visible: false //this.itemRolElectivaONVerLinkReporteCupos
                        }
                      ]
                      }
                  ]

            }/*,
            {
                  label: 'Equipos, Protesis y Otros',
                  visible: this.itemRolElectivaVerLinkNuevaSolicitud,
                  expanded: true,
                  items: [ 
                    {
                    label: 'Nueva solicitud',
                    icon:'pi pi-fw pi-file',
                    command: () => this.opcionNuevaSolicitud(7),
                    visible: this.itemRolElectivaCrearSolicitud  
                    }
                  ]
            },
            {
              label: 'Estudio y Tratamientos Especiales ',
              visible: this.itemRolElectivaVerLinkNuevaSolicitud,
              expanded: true,
              items: [
                {
                  label: 'Nueva solicitud',
                  icon:'pi pi-fw pi-file',
                  command: () => this.opcionNuevaSolicitud(8),
                  visible: this.itemRolElectivaCrearSolicitud  
                  }
              ]

            },
            {
              label: 'Maternidad ',
              visible: this.itemRolElectivaVerLinkNuevaSolicitud,
              expanded: true,
              items: [
                {
                  label: 'Nueva solicitud',
                  icon:'pi pi-fw pi-file',
                  command: () => this.opcionNuevaSolicitud(9),
                  visible: this.itemRolElectivaCrearSolicitud  
                  }
              ]

            }*/,
            {
              label: 'Medicamentos ',
              visible: this.itemRolElectivaONCrearSolicitud,
              expanded: true,
              items: [
                {
                  label: 'Nueva solicitud',
                  icon:'pi pi-fw pi-file',
                  command: () => this.opcionNuevaSolicitud(10),
                  visible: this.itemRolElectivaONCrearSolicitud  
                  }
              ]

            },
            {
              label: 'Oncológicos ',
              visible: false,//this.itemRolElectivaONCrearSolicitud,
              expanded: true,
              items: [
                {
                  label: 'Nueva solicitud',
                  icon:'pi pi-fw pi-file',
                  command: () => this.opcionNuevaSolicitud(12),
                  visible: this.itemRolElectivaONCrearSolicitud  
                },
                  {
                        label: 'Modificar solicitud',
                        icon:'pi pi-fw pi-copy',
                        command: () => this.opcionModificarSolicitudElectOncologico(12),
                        visible: this.itemRolElectivaONModificarSolicitud  
                  },
                  {
                        label: 'Modificar Orden',
                        icon:'pi pi-fw pi-pencil',
                        command: () => this.opcionModificarOrdenElectQuirurgico(12),
                        visible: false //this.itemRolElectivaONVerLinkModificarOrden 
                  },
                  {
                      label: 'Calendario',
                      icon:'pi pi-fw pi-calendar',
                      command: () => this.opcionConsultarCalendarioElectivas(12),
                      visible: false //this.itemRolElectivaONVerLinkConsultaCalendario
                  }
                  ,
                  {
                        label: 'Reporte Cupos Electivas Oncologicos',
                        icon:'pi pi-fw pi-user',
                        command: () => this.opcionReporteCuposElectivasON(12),
                        visible: false//this.itemRolElectivaONVerLinkReporteCupos
                  },
                  {
                    label: 'Consulta Reportes',
                    icon:'pi pi-fw pi-search',
                    visible: false, //this.itemRolElectivaONconsultaSolicitud,
                    items: [
                      {
                          label: 'Solicitudes',
                          icon:'pi pi-fw pi-bars',
                          command: () => this.opcionConsultaSolicitudesElectivaON(12),
                          visible: false //this.itemRolElectivaONVerLinkReporteCupos
                      },
                      {
                      label: 'Sol./Servicios Pendiente',
                      icon:'pi pi-fw pi-list',
                      command: () => this.opcionConsultaSolicitudesAbiertasON(12),
                      visible: false //this.itemRolElectivaONVerLinkReporteCupos
                      },
                      {
                          label: 'Ordenes',
                          icon:'pi pi-fw pi-spinner ',
                          command: () => this.opcionConsultaOrdenesON(12),
                          visible: false //this.itemRolElectivaONVerLinkReporteCupos
                      }
                    ]
                    }
              ]

            },
            {
              label: 'Reportes Procedimientos Electivos',
              expanded: true,
              icon:'pi pi-fw pi-user',
         //     command: () => this.opcionReporteCuposElectivasON(12),
              visible: this.itemRolElectivaONVerLinkReporteCupos,
               //this.itemRolElectivaONconsultaSolicitud,
                    items: [
                      {
                          label: 'Solicitudes',
                          icon:'pi pi-fw pi-bars',
                          command: () => this.opcionConsultaSolicitudesElectivaON(12),
                          visible: true //this.itemRolElectivaONVerLinkReporteCupos
                      },
                      {
                      label: 'Sol./Servicios Pendiente',
                      icon:'pi pi-fw pi-list',
                      command: () => this.opcionConsultaSolicitudesAbiertasON(12),
                      visible: false //this.itemRolElectivaONVerLinkReporteCupos
                      },
                      {
                          label: 'Ordenes',
                          icon:'pi pi-fw pi-spinner ',
                          command: () => this.opcionConsultaOrdenesON(12),
                          visible: false //this.itemRolElectivaONVerLinkReporteCupos
                      }
                    ]
            }
          ]
        }
        ,
        {
          label: 'Salir',
          icon:'pi pi-fw pi-sign-out',
          command: () => this.salir()
        },
    ]
  }
  
  permissionsByUser() {

    this.itemRolCatalog                         = this.srvRolesByUser.buscarRolPorCodigo(this.codRolCatalog).length > 0 ? true : false;
    this.itemRolBeneficiarios                   = this.srvRolesByUser.buscarRolPorCodigo(this.codRolBeneficiarios).length > 0 ? true : false;

   /* CITAS MEDICAS */
    this.itemRolCitasVerLinkCrearCuposMedicos   = this.srvRolesByUser.buscarRolPorCodigo(this.codRolCitasVerLinkCrearCuposMedicos).length > 0 ? true : false;
    this.itemRolCitasVerLinkCalendario          = this.srvRolesByUser.buscarRolPorCodigo(this.codRolCitasVerLinkCalendario).length > 0 ? true : false;
    this.itemRolCitasVerLinkReporteMedico       = this.srvRolesByUser.buscarRolPorCodigo(this.codRolCitasVerLinkReporteMedico).length > 0 ? true : false;
    this.itemRolCitasVerLinkNuevaSolicitud      = this.srvRolesByUser.buscarRolPorCodigo(this.codRolCitasVerLinkNuevaSolicitud).length > 0 ? true : false;
    this.itemRolCitasVerLinkModificarSolicitud  = this.srvRolesByUser.buscarRolPorCodigo(this.codRolCitasVerLinkModificarSolicitud).length > 0 ? true : false;
    this.itemRolCitasVerLinkModificarOrdenes    = this.srvRolesByUser.buscarRolPorCodigo(this.codRolCitasVerLinkModificarOrdenes).length > 0 ? true : false;
    this.itemRolCitasVerLinkConsultas           = this.srvRolesByUser.buscarRolPorCodigo(this.codRolCitasVerLinkConsultas).length > 0 ? true : false;

     /* ESTUDIOS ESPECIALES */
    this.itemRolEstudiosEspecialesVerLinkCrearCupos       = this.srvRolesByUser.buscarRolPorCodigo(this.codRolEstudiosEspecialesVerLinkCrearCupos).length > 0 ? true : false;
    this.itemRolEstudiosEspecialesVerLinkCalendario       = this.srvRolesByUser.buscarRolPorCodigo(this.codRolEstudiosEspecialesVerLinkCalendario).length > 0 ? true : false;
    this.itemRolEstudiosEspecialesVerLinkReporteCupos     = this.srvRolesByUser.buscarRolPorCodigo(this.codRolEstudiosEspecialesVerLinkReporteCupos).length > 0 ? true : false;
    this.itemRolEstudiosEspecialesCrearSolicitud          = this.srvRolesByUser.buscarRolPorCodigo(this.codRolEstudiosEspecialesCrearSolicitud).length > 0 ? true : false;
    this.itemRolEstudiosEspecialesModificarSolicitud      = this.srvRolesByUser.buscarRolPorCodigo(this.codRolEstudiosEspecialesModificarSolicitud).length > 0 ? true : false;
    this.itemRolEstudiosEspecialesVerLinkModificarOrden   = this.srvRolesByUser.buscarRolPorCodigo(this.codRolEstudiosEspecialesVerLinkModificarOrden).length > 0 ? true : false;
    this.itemRolEstudiosEspecialesVerLinkConsultas        = this.srvRolesByUser.buscarRolPorCodigo(this.codRolEstudiosEspecialesVerLinkConsultas).length > 0 ? true : false;
    
     /* IMAGENES */
     this.itemRolImagenVerLinkCrearCupos                = this.srvRolesByUser.buscarRolPorCodigo(this.codRolImagenVerLinkCrearCupos).length > 0 ? true : false;
     this.itemRolImagenVerLinkConsultaCalendario        = this.srvRolesByUser.buscarRolPorCodigo(this.codRolImagenVerLinkConsultaCalendario).length > 0 ? true : false;
     this.itemRolImagenVerLinkReporteCupos              = this.srvRolesByUser.buscarRolPorCodigo(this.codRolImagenVerLinkReporteCupos).length > 0 ? true : false;
     this.itemRolImagenCrearSolicitud                   = this.srvRolesByUser.buscarRolPorCodigo(this.codRolImagenCrearSolicitud).length > 0 ? true : false;
     this.itemRolImagenModificarSolicitud               = this.srvRolesByUser.buscarRolPorCodigo(this.codRolImagenModificarSolicitud).length > 0 ? true : false;
     this.itemRolImagenVerLinkModificarOrden            = this.srvRolesByUser.buscarRolPorCodigo(this.codRolImagenVerLinkModificarOrden).length > 0 ? true : false;
     this.itemRolImagenConsultasSolicitudes             = this.srvRolesByUser.buscarRolPorCodigo(this.codRolImagenConsultasSolicitudes).length > 0 ? true : false;
     
     /* LABORATORIO */
     this.itemRolLaboratorioVerLinkCrearCupos          = this.srvRolesByUser.buscarRolPorCodigo(this.codRolLaboratorioVerLinkCrearCupos).length > 0 ? true : false;
     this.itemRolLaboratorioVerLinkConsultaCalendario  = this.srvRolesByUser.buscarRolPorCodigo(this.codRolLaboratorioVerLinkConsultaCalendario).length > 0 ? true : false;
     this.itemRolLaboratorioVerLinkReporteCupos        = this.srvRolesByUser.buscarRolPorCodigo(this.codRolLaboratorioVerLinkReporteCupos).length > 0 ? true : false;
     this.itemRolLaboratorioCrearSolicitud             = this.srvRolesByUser.buscarRolPorCodigo(this.codRolLaboratorioCrearSolicitud).length > 0 ? true : false;
     this.itemRolLaboratorioModificarSolicitud         = this.srvRolesByUser.buscarRolPorCodigo(this.codRolLaboratorioModificarSolicitud).length > 0 ? true : false;
     this.itemRolLaboratorioVerLinkModificarOrden      = this.srvRolesByUser.buscarRolPorCodigo(this.codRolLaboratorioVerLinkModificarOrden).length > 0 ? true : false;
     this.itemRolLaboratorioConsultaSolicitud          = this.srvRolesByUser.buscarRolPorCodigo(this.codRolLaboratorioConsultaSolicitud).length > 0 ? true : false;
     

   /* ELECTIVA QUIRURGICA */
   this.itemRolElectivaQUIVerLinkCrearCupos          = this.srvRolesByUser.buscarRolPorCodigo(this.codRolElectivaQUIVerLinkCrearCupos).length > 0 ? true : false;
   this.itemRolElectivaQUIVerLinkConsultaCalendario  = this.srvRolesByUser.buscarRolPorCodigo(this.codRolElectivaQUIVerLinkConsultaCalendario).length > 0 ? true : false;
   this.itemRolElectivaQUIVerLinkReporteCupos        = this.srvRolesByUser.buscarRolPorCodigo(this.codRolElectivaQUIVerLinkReporteCupos).length > 0 ? true : false;
   this.itemRolElectivaQUICrearSolicitud             = this.srvRolesByUser.buscarRolPorCodigo(this.codRolElectivaQUICrearSolicitud).length > 0 ? true : false;
   this.itemRolElectivaQUIModificarSolicitud         = this.srvRolesByUser.buscarRolPorCodigo(this.codRolElectivaQUIModificarSolicitud).length > 0 ? true : false;
   this.itemRolElectivaQUIVerLinkModificarOrden      = this.srvRolesByUser.buscarRolPorCodigo(this.codRolElectivaQUIVerLinkModificarOrden).length > 0 ? true : false;
   this.itemRolElectivaQUIconsultaSolicitud          = this.srvRolesByUser.buscarRolPorCodigo(this.codRolElectivaQUIConsultaSolicitud).length > 0 ? true : false;
 

/* ELECTIVA ONCOLOGICO */
this.itemRolElectivaONVerLinkCrearCupos          = this.srvRolesByUser.buscarRolPorCodigo(this.codRolElectivaONVerLinkCrearCupos).length > 0 ? true : false;
this.itemRolElectivaONVerLinkConsultaCalendario  = this.srvRolesByUser.buscarRolPorCodigo(this.codRolElectivaONVerLinkConsultaCalendario).length > 0 ? true : false;
this.itemRolElectivaONVerLinkReporteCupos        = this.srvRolesByUser.buscarRolPorCodigo(this.codRolElectivaONVerLinkReporteCupos).length > 0 ? true : false;
this.itemRolElectivaONCrearSolicitud             = this.srvRolesByUser.buscarRolPorCodigo(this.codRolElectivaONCrearSolicitud).length > 0 ? true : false;
this.itemRolElectivaONModificarSolicitud         = this.srvRolesByUser.buscarRolPorCodigo(this.codRolElectivaONModificarSolicitud).length > 0 ? true : false;
this.itemRolElectivaONVerLinkModificarOrden      = this.srvRolesByUser.buscarRolPorCodigo(this.codRolElectivaONVerLinkModificarOrden).length > 0 ? true : false;
this.itemRolElectivaONconsultaSolicitud          = this.srvRolesByUser.buscarRolPorCodigo(this.codRolElectivaONConsultaSolicitud).length > 0 ? true : false;


     this.construirMenu();
  }

  opcionNuevaSolicitud(opcion: any){
    this.menuService.setTipoAtencion(opcion);

    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["solicitud-beneficiario/-1/-1"]));
  }

  opcionModificarSolicitud(opcion: any){
    this.menuService.setTipoAtencion(opcion);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["solicitud-modificar"]));
  }



  opcionModificarSolicitudTriaje(opcion: any){
    this.menuService.setTipoAtencion(opcion);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["solicitud-modificar-triaje"]));
  }

  
  opcionModificarSolicitudTriajeLab(opcion: any){
    this.menuService.setTipoAtencion(opcion);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["solicitud-modificar-triaje-lab"]));
  }

  opcionModificarSolicitudElectQuirurgico(opcion: any)
  {
    this.menuService.setTipoAtencion(opcion);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["solicitud-modificar-elect-quir"]));
  }


  opcionModificarSolicitudElectOncologico(opcion: any)
  {
    this.menuService.setTipoAtencion(opcion);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["solicitud-modificar-elect-onc"]));
  }

  opcionModificarOrden(opcion: any){
    this.menuService.setTipoAtencion(opcion);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["orden-modificar"]));
  }

  opcionModificarOrdenTriaje(opcion: any){
    this.menuService.setTipoAtencion(opcion);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["orden-modificar-triaje"]));
  }

  opcionModificarOrdenTriajeLab(opcion: any){
    this.menuService.setTipoAtencion(opcion);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["orden-modificar-triaje-lab"]));
  }

  opcionModificarOrdenElectQuirurgico(opcion: any){
    this.menuService.setTipoAtencion(opcion);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["orden-modificar-elec-quir"]));
  }º

  opcionModificarOrdenElectOncologico(opcion: any){
    this.menuService.setTipoAtencion(opcion);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["orden-modificar-elec-onc"]));
  }


  opcionConsultaSolicitudes(opcion: any){
    this.menuService.setTipoAtencion(opcion);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["servicios-solicitud"]));
  }

  opcionConsultaSolicitudesElectivaQUI(opcion: any){
    this.menuService.setTipoAtencion(opcion);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["servicios-solicitud-electivas"]));
  }

  opcionConsultaSolicitudesElectivaON(opcion: any){
    this.menuService.setTipoAtencion(opcion);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["servicios-solicitud-electivas"]));
  }

  opcionConsultaSolicitudesAbiertas(opcion: any){
    this.menuService.setTipoAtencion(opcion);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["servicios-solicitud-abiertas"]));
  }

  opcionConsultaSolicitudesAbiertasLab(opcion: any){
    this.menuService.setTipoAtencion(opcion);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["servicios-solicitud-abiertas-lab"]));
  }

  
  opcionConsultaSolicitudesAbiertasQUI(opcion: any){
    this.menuService.setTipoAtencion(opcion);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["servicios-solicitud-abiertas-qui"]));
  }

  
  opcionConsultaSolicitudesAbiertasON(opcion: any){
    this.menuService.setTipoAtencion(opcion);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["servicios-solicitud-abiertas-on"]));
  }
  

  opcionConsultaSolicitudesAbiertasImagen(opcion: any){
    this.menuService.setTipoAtencion(opcion);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["servicios-solicitud-abiertas-img"]));
  }


  opcionConsultaOrdenes(opcion: any){
    this.menuService.setTipoAtencion(opcion);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["servicios-orden"]));
  }

  opcionConsultaOrdenesLab(opcion: any){
    this.menuService.setTipoAtencion(opcion);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["reporte-orden-lab"]));
  }

  opcionAuditorias(opcion: any){
    this.menuService.setTipoAtencion(opcion);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["auditorias-solicitud"]));
  }


  opcionConsultaOrdenesQUI(opcion: any){
    this.menuService.setTipoAtencion(opcion);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["reporte-orden-qui"]));
  }
  opcionConsultaOrdenesON(opcion: any){
    this.menuService.setTipoAtencion(opcion);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["reporte-orden-on"]));
  }

  opcionConsultaOrdenesImagen(opcion: any){
    this.menuService.setTipoAtencion(opcion);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["reporte-orden-img"]));
  }

  opcionReporteMedico(opcion: any){
    this.menuService.setTipoAtencion(opcion);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["reporte-medico"]));
  }

  opcionReporteCuposLab(opcion: any){
    this.menuService.setTipoAtencion(opcion);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["reporte-cupos-lab"]));
  }

  opcionReporteCuposElectivasQUI(opcion: any){
    this.menuService.setTipoAtencion(opcion);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["reporte-cupos-elec-quirurgico"]));
  }

  opcionReporteCuposElectivasON(opcion: any){
    this.menuService.setTipoAtencion(opcion);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["reporte-cupos-elec-oncologico"]));
  }

  opcionReporteCuposTriaje(opcion: any){
    this.menuService.setTipoAtencion(opcion);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["reporte-cupos-triaje"]));
  }

  opcionReporteCupos(opcion: any){
    this.menuService.setTipoAtencion(opcion);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate(["reporte-cupos"]));
  }

  
  opcionRegistrarCupo(opcion: any){
    this.menuService.setTipoAtencion(opcion);

    if (opcion==3){
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(["registrar-cupos-triaje"]));
    }else{
      if (opcion == 4)
      {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(["registrar-cupos-lab"]));
      }
      else
      {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(["registrar-cupos"]));  
      }

    }

  }

  opcionModificarCupo(opcion: any){
    this.menuService.setTipoAtencion(opcion);

    if (opcion==3 || opcion == 4){
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(["modificar-cupos-triaje"]));
    }else{
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(["modificar-cupos"]));  
    }

  }

  opcionConsultarCalendario(opcion: any){
    this.menuService.setTipoAtencion(opcion);
    
    if (opcion==3){
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(["calendario-triaje-img/C"]));

      
    }else{

            
    if (opcion == 4){
      
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(["calendario-triaje-lab/C"]));
    }
    else
    {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(["calendario/C"]));
    }



    }
  }

  opcionConsultarCalendarioElectivas(opcion: any){
    this.menuService.setTipoAtencion(opcion);
    
    if (opcion==11){
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(["calendario-electiva-quir/C"]));

      
    }else{

            
    if (opcion == 12){
      
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(["calendario-electiva-onc/C"]));
    }
    else
    {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(["calendario/C"]));
    }



    }
  }

  salir(){
    this.menuService.salir();
    //this.router.navigate(["login"]);
    this.router.navigate(['menu-principal']);
  }


}
