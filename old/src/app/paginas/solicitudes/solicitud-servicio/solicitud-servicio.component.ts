import { Component, OnInit } from '@angular/core';

import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';

import {  
          Solicitud,
          TipoCobertura,
          TipoSolicitud,
          Especialidad,
          Respuesta,
          Trabajador,
          RolModelo,
          TipoAtencion
       }
  from 'src/app/models';



import {  BeneficiarioService,
          SolicitudService,
          TipoCoberturaService,
          TipoSolicitudService,
          EspecialidadService,
          EstadoSolicitudService,
          AtencionService,
          AuthService,
          OrdenServicioService,
          CausaService,
          UserRolesService,
          RolesService,
          TipoAtencionService,
          ServicioEspecialidadService,
          SolicitudServicioService,

          MenuService,
          MedicoEspecialidadService,
          SolicitudRecaudoService,
          RecaudoService,
          DiagnosticoService,
          DomicilioService
       }
from 'src/app/services';


import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-solicitud-servicio',
  templateUrl: './solicitud-servicio.component.html',
  styleUrls: ['./solicitud-servicio.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class SolicitudServicioComponent implements OnInit {

  nuevoRegistro: boolean;
  submitted: boolean;
  form: FormGroup;
  myForm: FormGroup;
  new: boolean;
  blocked: boolean = false;
  es: any;

  displayDialog: boolean;
  tituloDialogo: string = "";

  cedula: any;
  nombre_beneficiario: any;
  nombre_titular: any;
  edad: any;
  sexo: any;
  parentesco: any;
  fecha_nacimiento: any;
  email: any;
  telefono1: any;
  telefono2: any;

  solicitud_id: any;
  cols: any[];
  exportColumns: any[];
  x: any[];


  beneficiarioId: any;
  solicitudId: any;
  beneficiario: any = {};
  titular: any = {};
  age: number;

  loading: boolean;

  parametros: any;
  displayHelpW: boolean = false;
  title: any;

  //Transacciones
  solicitud: any = {};

  reporte: any[];
  ordenes: any[]=[];
  sol_activas: any[];
  sol_activas_mes: any[];
  //combos
  tipoCoberturas: TipoCobertura[];
  tipoCobertura: TipoCobertura;

  tipoSolicitudes: TipoSolicitud[];
  tipoSolicitud: TipoSolicitud;

  especialidades: Especialidad[];
  especialidad: Especialidad;

  estadoSolicitudes: any[];
  estadoSolicitud: any;

  causas: any[];
  causa: any;

  currentUser: any;
  formattedFechaSolicitud: any;

  usuario: any;
  datos_orden: any;
  causa_id: any;

  user: Trabajador;
  asset: any;

  roles: RolModelo[] = [];

  /* Codigo de los roles CITAS*/
  codRolCitasCrearOrdenes: string;
  codRolCitasCrearSolicitudConsulta: string;
  codRolCitasModificarSolicitudConsulta: string;
  codRolCitasCrearOrdenesAdm: string;
  codRolCitasConfirmarOrden: string;
  codRolCitasCancelarOrden: string;
  /* Habilitar los items del menu según rol  CITAS*/
  rolCitasCrearOrdenes: boolean = false;
  rolCitasCrearSolicitudConsulta: boolean = false;
  rolCitasModificarSolicitudConsulta: boolean = false;
  rolCitasCrearOrdenesAdm: boolean = false;
  rolCitasCancelarOrden   : boolean = false;
  rolCitasConfirmarOrden   : boolean = false;


  /* Codigo de los roles ESTUDIOS ESPECIALES*/
  codRolEstudiosEspecialesCrearOrden: string;
  codRolEstudiosEspecialesCrearSolicitud: string;
  codRolEstudiosEspecialesCancelarOrden: string;
  codRolEstudiosEspecialesConfirmarOrden: string;
  codRolEstudiosConfirmarOrden: string;
  codRolEstudiosEspecialesModificarSolicitud: string;
  /* Habilitar los items del menu según rol  ESTUDIOS*/
  rolEstudiosCrearOrdenes: boolean = false;
  rolEstudiosCrearSolicitud: boolean = false;
  rolEstudiosModificarSolicitud: boolean = false;
  rolEstudiosCancelarOrden   : boolean = false;
  rolEstudiosConfirmarOrden   : boolean = false;


  fecha_recepcion: any;

  //combos
  tipoOrden: TipoAtencion;
  tipoOrdenes: TipoAtencion[];

  tipoAtencionId: any;
  tipoSolicitudId: any;

  tipoAtencion: any;
  mostrarAlerta : boolean;


  //Servicios asociados a estudios especiales
  servicioSolicitado: ServicioEspecialidadService;
  serviciosSolicitados: ServicioEspecialidadService[];
  serviciosSolicitadosSel: any[];

  //Servicios asociados a consultas vestidas
  servicioEstandard: ServicioEspecialidadService;
  serviciosEstandardSolicitados: ServicioEspecialidadService[];

  deshabilitarGuardar: boolean;
  deshabilitarCrearOrden: boolean;
  deshabilitarAcciones: boolean;

  reporteServicios: any[];
  medicos:any[];

  diagnosticos:any[];

  domicilios:any[];

  recaudos: any[];
  recaudo: any;
  recaudosEntregados: any[];

  deshabilitarBotonCancelar: boolean;
  deshabilitarBotonConfirmar: boolean;

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private confirmationService: ConfirmationService,
    private authService: AuthService,
    private beneficiarioService: BeneficiarioService,
    private tipoSolicitudService: TipoSolicitudService,
    private tipoCoberturaService: TipoCoberturaService,
    private especialidadService: EspecialidadService,
    private estadoSolicitudService: EstadoSolicitudService,
    private solicitudService: SolicitudService,
    private atencionService: AtencionService,
    private messageService: MessageService,
    private ordenService:  OrdenServicioService,
    private causaService:  CausaService,
    private rolesService: RolesService,
    private srvRolesByUser: UserRolesService,
    private tipoOrdenService: TipoAtencionService,
    private servicioEspecialidadService: ServicioEspecialidadService,
    private solicitudServiciosService: SolicitudServicioService,
    private diagnosticoService : DiagnosticoService,
    private menuService: MenuService,
    private medicoEspecialidadService: MedicoEspecialidadService,
    private solicitudRecaudoService: SolicitudRecaudoService,
    private recaudoService:          RecaudoService,
    private domicilioService : DomicilioService
  ) {

    this.createForm();

    this.cols = [
      { field: 'atencion_id', header: 'Nro. Orden', width: '20%'},
      { field: 'nombre_tipo_atencion', header: 'Tipo Atencion', width: '30%' },
      { field: 'nombre_servicio', header: 'Servicio', width: '30%' },
      { field: 'nombre_estado_atencion', header: 'Estado', width: '20%' }
    ];

    //Asignaciones CITAS
    this.codRolCitasCrearOrdenes                = this.rolesService.getCodRolCitasCrearOrden();
    this.codRolCitasCrearSolicitudConsulta      =  this.rolesService.getCodRolCrearSolicitudConsulta();
    this.codRolCitasCrearOrdenesAdm             =  this.rolesService.getCodRolCitasCrearAdm();
    this.codRolCitasCancelarOrden               =  this.rolesService.getCodRolCitasCancelarOrden();
    this.codRolCitasConfirmarOrden              =  this.rolesService.getCodRolCitasConfirmarOrden();
    this.codRolCitasModificarSolicitudConsulta  =  this.rolesService.getCodRolCitasModificarSolicitudConsulta();
 
    this.rolCitasCrearSolicitudConsulta     = this.srvRolesByUser.buscarRolPorCodigo(this.codRolCitasCrearSolicitudConsulta).length > 0 ? true : false;
    this.rolCitasCrearOrdenes               = this.srvRolesByUser.buscarRolPorCodigo(this.codRolCitasCrearOrdenes).length > 0 ? true : false;
    this.rolCitasCrearOrdenesAdm            = this.srvRolesByUser.buscarRolPorCodigo(this.codRolCitasCrearOrdenesAdm).length > 0 ? true : false;
    this.rolCitasCancelarOrden              = this.srvRolesByUser.buscarRolPorCodigo(this.codRolCitasCancelarOrden).length > 0 ? true : false;
    this.rolCitasConfirmarOrden             = this.srvRolesByUser.buscarRolPorCodigo(this.codRolCitasConfirmarOrden).length > 0 ? true : false;
    this.rolCitasModificarSolicitudConsulta = this.srvRolesByUser.buscarRolPorCodigo(this.codRolCitasModificarSolicitudConsulta).length > 0 ? true : false;

    //Asignaciones ESTUDIOS ESPECIALES
    this.codRolEstudiosEspecialesCrearOrden         = this.rolesService.getCodRolEstudiosEspecialesCrearOrden();
    this.codRolEstudiosEspecialesCrearSolicitud     =  this.rolesService.getCodRolEstudiosEspecialesCrearSolicitud();
    this.codRolEstudiosEspecialesCancelarOrden      =  this.rolesService.getCodRolEstudiosEspecialesCancelarOrden();
    this.codRolEstudiosEspecialesConfirmarOrden     =  this.rolesService.getCodRolEstudiosEspecialesConfirmarOrden();
    this.codRolEstudiosEspecialesModificarSolicitud =  this.rolesService.getCodRolEstudiosEspecialesModificarSolicitud();
 
    this.rolEstudiosCrearSolicitud              = this.srvRolesByUser.buscarRolPorCodigo(this.codRolEstudiosEspecialesCrearSolicitud).length > 0 ? true : false;
    this.rolEstudiosCrearOrdenes                = this.srvRolesByUser.buscarRolPorCodigo(this.codRolEstudiosEspecialesCrearOrden).length > 0 ? true : false;
    this.rolEstudiosModificarSolicitud          = this.srvRolesByUser.buscarRolPorCodigo(this.codRolEstudiosEspecialesModificarSolicitud).length > 0 ? true : false;
    this.rolEstudiosCancelarOrden               = this.srvRolesByUser.buscarRolPorCodigo(this.codRolEstudiosEspecialesCancelarOrden).length > 0 ? true : false;
    this.rolEstudiosConfirmarOrden              = this.srvRolesByUser.buscarRolPorCodigo(this.codRolEstudiosEspecialesConfirmarOrden).length > 0 ? true : false;
    this.rolEstudiosModificarSolicitud          = this.srvRolesByUser.buscarRolPorCodigo(this.codRolEstudiosEspecialesModificarSolicitud).length > 0 ? true : false;


    this.title = "Solicitud de Servicio";
    
    this.tipoSolicitudId  = this.menuService.getTipoSolicitud();
    this.tipoAtencionId  = this.menuService.getTipoAtencion();

    this.tipoOrdenService
    .getById(this.tipoAtencionId)
    .toPromise()
    .then((results) => {
      this.tipoAtencion = results;
      this.title = this.title + ' ' + this.tipoAtencion.nombre;
    })
    .catch((err) => {
      console.log(err);
    });
  }

  ngOnInit() {
    this.deshabilitarGuardar=false;
    this.deshabilitarCrearOrden=false;
    this.deshabilitarAcciones= false;
    this.mostrarAlerta=true;
    this.serviciosSolicitados=[];
    this.serviciosEstandardSolicitados=[];
    this.reporteServicios=[];
    //this.beneficiarioId = this._route.snapshot.paramMap.get('beneficiario_id');
    //this.solicitudId = this.solicitudService.getParams().solicitudId;

    this.beneficiarioId = this.activatedRoute.snapshot.params.beneficiario_id;
    this.solicitudId = this.activatedRoute.snapshot.params.solicitud_id;

    let format = 'yyyy-MM-dd';
    const locale = 'en-ES';
    let date: Date = new Date();
    this.fecha_recepcion= date;

    //Se valida si el titular tiene 5 solicitudes de consultas

    
        this.consultar();

        this.fullDropdownEstado();
        this.fullDropdownTipoCobertura();
        this.fullDropdownTipoSolicitud();
        this.fullDropdownEspecialidades();
        this.fullDropdownCausas();
        this.fullDropdownTipoOrden();
        this.dropdownRecaudo();
        this.dropdownDiagnosticos();
        
        this.dropdownDomicilios();
    
        this.openNew();
    
        this.currentUser = JSON.parse(this.authService.getCurrentUser());
        //this.parametros = {nombre:"prueba"};
    
        this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
    
        let currentUser = this.authService.getCurrentUser();
        this.usuario  = JSON.parse(currentUser);
    
        //Colsultar si el beneficiario tiene solicitudes abiertas o asignadas
        //Para dar mensaje de advertencia al analista
    
        this.consultarSolicitudesActivas();
        this.deshabilitarBotonGuardar();
        this.deshabilitarBotonCrearOrden();
        this.deshabilitarAccionCancelar();
        this.deshabilitarAccionConfirmar();
       // this.rolCitasCrearOrdenesAdm =true;
        this.consultarSolicitudesPorMes();

    

  }


  handleChange(e, registro: any) {
    //handleChange(e, registro: TipoSolicitud) {
    //registro.activo= (e.checked == true ? 1 : 0)
  }

  ngOnDestroy(){
    this.ordenService.setParams({});
  }


  createForm() {

    this.form = this.fb.group({
      motivo:               [''],
      telefono:             ['', [Validators.required]],
      telefono2:            ['', [Validators.required]],
      email:                [''],
      cedula_hcm:           [''],
      tipoCobertura:        [''],
      tipoSolicitud:        [''],
      especialidad:         ['', [Validators.required]],
      medico:               [''],
      domicilio:            ['', [Validators.required]],
      estadoSolicitud:      [''],
      fecha_recepcion:      [''],
      observacion:          [''],
      tipoOrden:            [''],
      serviciosSolicitadosSel:  ['']
    });

    this.myForm = this.fb.group({
      recaudo: ['', [Validators.required]]

    });
  }

  consultarSolicitudesActivas(){
    if (this.beneficiarioId){
        //buscar solicitudes de un beneficiario
        //OJO ACTIVAS DE ESE TIPO DE SOLICITUD, AGREGAR FILTRO !!!!!!!
        let data = {
          beneficiario_id: this.beneficiarioId
        }

        this.solicitudService.getSolicitudesActivasByBeneficiario(data)
        .toPromise()
        .then(results => {
          this.sol_activas = results;
          if (this.sol_activas.length>0){
              this.showError('El beneficiario tiene solicitudes ABIERTAS. Verificar.');
           
          }

        })
        .catch(err => { console.log(err) });
    }

  }

  consultarSolicitudesPorMes(){
    if (this.beneficiarioId){
        //buscar solicitudes de un beneficiario
        //OJO ACTIVAS DE ESE TIPO DE SOLICITUD, AGREGAR FILTRO !!!!!!!
        let data = {
          beneficiario_id: this.beneficiarioId
        }

        this.solicitudService.getSolicitudesByTitularCantidad(data)
        .toPromise()
        .then(results => {
          this.sol_activas_mes = results;
          if (this.sol_activas_mes.length>0){
              this.mostrarAlerta=false;
              if (!this.rolCitasCrearOrdenesAdm) 
                {
                  this.deshabilitarGuardar=true;
                }
              this.showError('El beneficiario supero la cantidad de solicitudes del Mes.');
              return;
          }

        })
        .catch(err => { console.log(err) });
    }

  }

  deshabilitarBotonGuardar(){
     //Solicitudes CERRADAS o CANCELADAS
    if (this.solicitud.estado_solicitud_id == 2 || this.solicitud.estado_solicitud_id == 3 ){
      this.deshabilitarGuardar = true;
    };

    //Si no tiene el rol no puede guardar
     if (!this.rolCitasCrearSolicitudConsulta  && !this.rolEstudiosCrearSolicitud ){    
      this.deshabilitarGuardar = true;
    }
  }

  deshabilitarBotonCrearOrden(){

    //Si no tiene el rol no puede crear ordenes
    if (!this.rolCitasCrearOrdenes && !this.rolEstudiosCrearOrdenes){    
      this.deshabilitarCrearOrden = true;
    }

    //Solicitudes CERRADAS 
    if (this.solicitud.estado_solicitud_id == 2){
          this.deshabilitarCrearOrden = true;
    };
    //Solicitudes o CANCELADAS
    if (this.solicitud.estado_solicitud_id == 3){
          this.deshabilitarCrearOrden = true;       
    }; 
    
    //Solicitudes ASIGNADAS
    if (this.solicitud.estado_solicitud_id == 4 ){
      //Permite crear ordenes despues de que la solicitud este asiganada 
      if (!this.rolCitasCrearOrdenesAdm && !this.rolEstudiosCrearOrdenes){    
        this.deshabilitarCrearOrden = true;
      }

    };

  }

  deshabilitarAccionCancelar(){

    if (!this.rolCitasCancelarOrden && !this.rolEstudiosCancelarOrden){  
          this.deshabilitarBotonConfirmar= true;
    }

  };

  deshabilitarAccionConfirmar(){
    if (!this.rolCitasConfirmarOrden && !this.rolEstudiosConfirmarOrden){  
        this.deshabilitarBotonCancelar= true;
    }
  };


  dropdownEstudiosEspeciales(){
    if (this.solicitud.especialidad_id){
      this.serviciosSolicitadosSel=[];
      this.servicioEspecialidadService
        .getAllByEspecialidad(Number(this.solicitud.especialidad_id))
        .toPromise()
        .then((results) => {
          this.serviciosSolicitados = results;
          //Filtro por tipo atención
          if (results){
            let aux=[];
            aux=results;
            this.serviciosSolicitados = aux.filter(x => x.tipo_atencion_id == this.solicitud.tipo_atencion_id);

          }
        })
        .catch((err) => {
          console.log(err);
        });

      }
  }

  dropdownEstudiosEstandard(){

    if (this.solicitud.especialidad_id){
      this.serviciosSolicitadosSel=[];
      this.servicioEspecialidadService
        .getAutomaticosByEspecialidad(Number(this.solicitud.especialidad_id))
        .toPromise()
        .then((results) => {
          this.serviciosEstandardSolicitados = results;
          //Filtro por tipo atención
          if (results){
            let aux=[];
            aux=results;
            this.serviciosEstandardSolicitados = aux.filter(x => x.tipo_atencion_id != 2);
            //console.log( 'servicios estandard : ',  this.serviciosEstandardSolicitados.length);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      }
  }

  fullDropdownTipoSolicitud() {
    this.tipoSolicitudService
      .getAllActivos()
      .toPromise()
      .then((results) => {
        let aux=[];
        aux=results;
        this.tipoSolicitudes = aux.filter(x => x.tipo_solicitud_id == this.menuService.getTipoSolicitud());

        if (this.tipoSolicitudes){
          this.tipoSolicitud = this.tipoSolicitudes[0];

          if (!this.solicitud.tipo_solicitud_id){
            this.solicitud.tipo_solicitud_id = this.tipoSolicitud.value;
          }

        }

      })
      .catch((err) => {
        console.log(err);
      });
  }

  fullDropdownTipoOrden() {
    this.tipoOrdenService.getAllByTipoSolicitud(this.menuService.getTipoSolicitud())
      .toPromise()
      .then((results) => {

        let aux=[];
        aux=results;
        this.tipoOrdenes = aux.filter(x => x.tipo_atencion_id == this.menuService.getTipoAtencion());

        //this.tipoOrdenes = results;

        //Modificar para nuevos roles !!!
        this.solicitud.tipo_atencion_id =  this.tipoOrdenes[0].tipo_atencion_id;

        this.deshabilitarBotonGuardar();
        this.deshabilitarBotonCrearOrden();
        this.deshabilitarAccionCancelar();
        this.deshabilitarAccionConfirmar();

      })
      .catch((err) => {
        console.log(err);
      });
  }

  fullDropdownTipoCobertura() {
    this.tipoCoberturaService.getAllComboActivas()
      .toPromise()
      .then((results) => {
        this.tipoCoberturas= results;
        if (this.tipoCoberturas){
           //this.solicitud.tipo_cobertura_id = this.tipoCoberturas[0];
          this.tipoCobertura = this.tipoCoberturas[0];

        }
      })
      .catch((err) => {
        console.log(err);
      });
  }


  fullDropdownEspecialidades() {
    this.especialidadService.getAllCombo()
      .toPromise()
      .then((results) => {
        this.especialidades = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  fullDropdownEstado() {
    this.estadoSolicitudService.getAllCombo()
      .toPromise()
      .then((results) => {
        this.estadoSolicitudes = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }


  fullDropdownCausas() {
    this.causaService
      .getAllCombo()
      .toPromise()
      .then((results) => {
        this.causas = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  dropdownM() {
    this.medicoEspecialidadService
      .getMedicoByEspecialidad(this.solicitud.especialidad_id)
      .toPromise()
      .then((results) => {
        this.medicos = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  dropdownDomicilios() {
    this.domicilioService
      .getAllCombo()
      .toPromise()
      .then((results) => {
        this.domicilios = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }


  dropdownDiagnosticos() {
    this.diagnosticoService
      .getAllCombo()
      .toPromise()
      .then((results) => {
        this.diagnosticos = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }



  consultar(){
    
    if (!this.beneficiarioId) {
      return;
    };

    if (this.solicitudId != -1){
     this.solicitudService.getById(this.solicitudId)
     .toPromise()
     .then(results => {
       if (results){
         this.solicitud = results;
         this.solicitud_id = this.solicitud.solicitud_id
         this.fecha_recepcion = this.solicitud.fecha_recepcion;
         this.dropdownM();
         this.consultarOrdenes();
         this.consultarServiciosRequeridos();
         this.consultarRecaudosPorSolicitud();
       }
     })
     .catch(err => { console.log(err) });

    }else{
      this.consultarOrdenes();
      this.consultarServiciosRequeridos();
      this.consultarRecaudosPorSolicitud();
    }

    //this.loading = true;

    this.beneficiarioService.getById(this.beneficiarioId)
      .toPromise()
      .then(results => {

        this.beneficiario = results;
        this.calculateAge();

        if (this.beneficiario){
          let data = {
            cedula_titular: this.beneficiario.cedula_titular
          }

          this.beneficiarioService.getTitularByBeneficiario(data)
          .toPromise()
          .then(results => {

            if (results){
              this.titular = results[0];

              if (!this.beneficiario.cedula_hcm){
                this.beneficiario.cedula_hcm = this.beneficiario.cedula_beneficiario;
              }

            }
            //this.loading = false;
          })
          .catch(err => { console.log(err) });
        }
        //this.loading = false;
      })
      .catch(err => { console.log(err) });
    //this.loading = false;

  }

  //Consultar ordenes de atencion de una solicitud
  consultarOrdenes(){
    if (this.solicitud.solicitud_id){

      let data = {
        solicitud_id: this.solicitud.solicitud_id
      }

      //console.log('Data: ' + this.solicitud.solicitud_id);
      this.atencionService.getOrdenesBySolicitud(data)
      .toPromise()
      .then(results => {
        if (results){
          this.ordenes = results;
        }
      })
      .catch(err => { console.log(err) });

      this.deshabilitarBotonGuardar();
      this.deshabilitarBotonCrearOrden();
      this.deshabilitarAccionCancelar();
      this.deshabilitarAccionConfirmar();
     }
  }

  //Consultar ordenes de atencion de una solicitud
  consultarServiciosRequeridos(){
    if (this.solicitud.solicitud_id){
        this.solicitudServiciosService
        .getAllBySolicitud(this.solicitud.solicitud_id)
        .toPromise()
        .then((results) => {
          this.reporteServicios = results;
        })
        .catch((err) => {
          console.log(err);
        });

    }
  }

  guardar(){
     //console.log(this.serviciosSolicitadosSel);
    
    this.submitted = true;
    this.set();

    if (this.form.valid) {
      this.blocked = true;
      if (!this.solicitud.solicitud_id) {
        //console.log('Es nuevo');

        let format = 'yyyy-MM-dd HH:mm:ss';
        const locale = 'en-ES';
        let date: Date = new Date();

        let fecha_solicitud;
        let fecha_recepcion;

        fecha_solicitud = formatDate(date, format, locale);

        if (this.fecha_recepcion!= null){
          fecha_recepcion = formatDate(this.fecha_recepcion, format, locale);
          this.solicitud.fecha_recepcion = fecha_recepcion;
        }else{
          this.solicitud.fecha_recepcion = fecha_solicitud;
        }

        this.fecha_recepcion =  this.solicitud.fecha_recepcion;

        this.solicitud.fecha_solicitud = fecha_solicitud;
        this.solicitud.usuario_creador= this.usuario.siglado; // login usuario conectado
        this.solicitud.nombre_creador= this.usuario.nombre;   // nombre usuario conecta
        this.solicitud.servicios = this.serviciosSolicitadosSel;
        this.solicitud.ente_id = 1;



        this.solicitudService
          .create(this.solicitud)
          .toPromise()
          .then((results) => {
            let aux: Respuesta = results;
            if (aux) {
              if (aux.status==500){
                this.showSuccess(aux.details);
                this.blocked = false;
              }else{
                this.showSuccess(aux.details);
                this.solicitud = aux.result;
  
                this.solicitud_id =  this.solicitud.solicitud_id;
  
                //this.solicitudService.setParams({solicitudId: this.solicitud.solicitud_id});
                this.solicitudId =  this.solicitud.solicitud_id;
  
                this.consultarServiciosRequeridos();
  
                //actualizar email y teléfonos del beneficiario
                this.beneficiarioService.update(this.beneficiario)
                .toPromise()
                .then(results => {
                  if (results){
                    //console.log('Se actualiza beneficiario en la creacion');
                    this.blocked = false;
                  }
                })
                .catch(err => {
                  this.blocked = false;
                  this.showError(err);
                });
              }



            } else {
              this.blocked = false;
              this.showError(aux.details);
            }

          })
          .catch((err) => {
            this.blocked = false;
            this.showError(err);
            
          });
      } else {
        //console.log('Editar');

        let format = 'yyyy-MM-dd HH:mm:ss';
        const locale = 'en-ES';
        let date: Date = new Date();

        let fecha_modificacion;
        let fecha_recepcion;

        fecha_modificacion = formatDate(date, format, locale);


        if (this.fecha_recepcion!= null){
          fecha_recepcion = formatDate(this.fecha_recepcion, format, locale);
          this.solicitud.fecha_recepcion = fecha_recepcion;
          this.fecha_recepcion = this.solicitud.fecha_recepcion;
        }

        this.solicitud.usuario_modificador= this.usuario.siglado; // login usuario conectado
        this.solicitud.nombre_modificador= this.usuario.nombre; // nombre usuario conecta
        this.solicitud.modified = fecha_modificacion ; // nombre usuario conecta

        this.solicitudService
          .update(this.solicitud)
          .toPromise()
          .then((results) => {
            let aux: Respuesta = results;
            if (aux) {

              if (aux.status==500){
                this.showSuccess(aux.details);
                this.blocked = false;
              }else{
                this.showSuccess(aux.details);
           
                this.solicitud_id =  this.solicitud.solicitud_id;
                this.solicitudId =  this.solicitud.solicitud_id;
                //this.solicitudService.setParams({solicitudId: this.solicitud.solicitud_id});
  
                //actualizar email y teléfonos del beneficiario
                this.beneficiarioService.update(this.beneficiario)
                .toPromise()
                .then(results => {
                  if (results){
                    //console.log('Se actualiza beneficiario en la modificacion');
                    this.blocked = false;
                  }
                })
                .catch(err => {
                  this.blocked = false;
                  this.showError(err);
                });
              }

            } else {
              this.blocked = false;
              this.showError(aux.details);
            }

          })
          .catch((err) => {
            this.blocked = false;
            this.showError(err);
          });
      }
      this.consultarOrdenes();
      this.consultarServiciosRequeridos();

      this.submitted = true;
    }

  }

  //Crear orden
  crearOrden() {
    //El selected en este caso corresponde al elemento seleccionado en la tabla de la vista
      this.navigate('orden-servicio', this.solicitud.solicitud_id, this.tipoSolicitud.tipo_solicitud_id, this.solicitud.especialidad_id);
  }

  navigate(route, value1, value2, value3) {
      //En este caso, la ruta detalle recibe un parámetro, por ello el valor de value
      //En caso de no recibir parámetro, omitir el value en el arreglo
      this.router.navigate([route, value1, value2, value3], { relativeTo: this.activatedRoute });
  }

  openNew() {
    this.new = true;
    this.solicitud = {};
    this.submitted = false;
  }

  dialogoCausa(datos: any) {

      this.datos_orden = {
        solicitud_id: datos.solicitud_id,
        atencion_id:  datos.atencion_id,
        causa_id: 2,
        usuario_modificador: this.usuario.siglado,
        nombre_modificador: this.usuario.nombre

      }

      this.tituloDialogo = "Causa";
      this.displayDialog = true;
  }

  cancelarOrden() {

    this.datos_orden.causa_id = this.causa_id;

    //console.log(this.datos_orden);

    this.blocked = true;
    this.atencionService.cancelarOrden(this.datos_orden)
    .toPromise()
    .then(results => {
      if (results){
        //this.ordenes = results;
        this.consultar();
        this.blocked = false;
      }
    })
    .catch(err => {
      console.log(err) ;
      this.blocked = false;
    });

    this.causa_id = null;
    this.close();
  }


  procesarOrden(datos: any) {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea colocar en estado procesada la orden de servicio?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let data = {
          solicitud_id: datos.solicitud_id,
          atencion_id:  datos.atencion_id,
          usuario_modificador: this.usuario.siglado,
          nombre_modificador: this.usuario.nombre
        }

        this.blocked = true;
        this.atencionService.procesarOrden(data)
        .toPromise()
        .then(results => {
          if (results){
            //this.ordenes = results;
            this.consultar();
            this.blocked = false;
          }
        })
        .catch(err => {
          console.log(err);
          this.blocked = false;
        });

      }
    });
  }

  close() {
    this.displayDialog   = false;
    this.submitted = false;
   }


  set() {
    this.solicitud.beneficiario_id = this.beneficiarioId;
    this.solicitud.origen_id = 1; //Llamamda telefónica
    if (!this.solicitud.solicitud_id){
      this.solicitud.estado_solicitud_id = 1;
    }
    this.solicitud.tipo_cobertura_id = this.tipoCobertura.tipo_cobertura_id;
    this.solicitud.tipo_solicitud_id = this.tipoSolicitud.tipo_solicitud_id;
    //this.solicitud.estado_solicitud_id= this.estadoSolicitud.value;

    this.solicitud.email= this.beneficiario.email;
    this.solicitud.telefono1= this.beneficiario.telefono;
    this.solicitud.telefono2= this.beneficiario.telefono2;
    this.solicitud.cedula_hcm= this.beneficiario.cedula_hcm;

    //this.solicitud.especialidad_id= this.especialidad.especialidad_id;
  }

  dropdownRecaudo(){
    this.recaudoService.getAllCombo()
      .toPromise()
      .then((results) => {
        this.recaudos = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Consultar ordenes de atencion de una solicitud
  consultarRecaudosPorSolicitud(){
    if (this.solicitud.solicitud_id){
        this.solicitudRecaudoService
        .getRecaudoBySolicitud(this.solicitud.solicitud_id)
        .toPromise()
        .then((results) => {
          this.recaudosEntregados = results;
        })
        .catch((err) => {
          console.log(err);
        });

    }
  }

  agregarRecaudo(){
    console.log("recaudo",this.recaudo);

    if (this.recaudo) {
      let data={
          solicitud_id: this.solicitud.solicitud_id,
          recaudo_id:   this.recaudo
      };
     // console.log("registro",data);

      this.solicitudRecaudoService
      .create(data)
      .toPromise()
      .then(results => {
        let aux;
        aux = results;
        if (results){
          this.showSuccess(aux.details);
          this.consultarRecaudosPorSolicitud();
        }
      })
      .catch(err => {
        console.log(err) ;
      });
    }else{
      this.showError('Seleccione recaudo a agregar.');
    }

  }

  eliminarRecaudo(data: any){
    this.solicitudRecaudoService
    .delete(data.solicitud_recaudo_id)
    .toPromise()
    .then(results => {
      //let aux;
      //aux = results;
      if (results){
        //this.showSuccess(aux.details);
        this.consultarRecaudosPorSolicitud();
      }
    })
    .catch(err => {
      console.log(err) ;
    });
  }

  calculateAge() {
    let format = 'yyy-MM-dd';
    const locale = 'en-ES';

    this.fecha_nacimiento = formatDate(this.beneficiario.fecha_nacimiento, format, locale);

    var today = new Date();
    var birthDate = new Date(this.fecha_nacimiento );
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
    {
        age--;
    }
    this.edad= age;

  }


  clone(c: Solicitud): Solicitud {
    let registro = {};
    for (let prop in c) {
      registro[prop] = c[prop];
    }
    return registro;
  }

  private showError(errMsg: string) {
    this.messageService.clear();
    this.messageService.add({ key: 'tc', severity: 'error', summary: errMsg });
  }

  private showInfo(errMsg: string) {
    this.messageService.clear();
    this.messageService.add({ key: 'tc', severity: 'info', summary: errMsg });
  }

  private showSuccess(successMsg: string) {
    this.messageService.clear();
    this.messageService.add({
      key: 'tc',
      severity: 'success',
      summary: successMsg,
    });
  }

  /** Manejador del dialog Almacén */

  displayHWChange(value: boolean) {
    this.displayHelpW = value;

    /** Si luego de cerrar el diálogo, el componente principal tiene que volver a consultar
        Añadir aquí validación. Si !displayHelpW entonces consult()
    */
  }


  regresar(){
    this.router.navigate(['solicitud-beneficiario/' + '1' + '/' + this.beneficiario.cedula_titular]);
  }


  listado(){
    this.router.navigate(['solicitud-modificar']);
  }

}
