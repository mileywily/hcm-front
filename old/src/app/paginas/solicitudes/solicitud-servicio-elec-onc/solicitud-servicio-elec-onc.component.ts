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
  TipoAtencion,
  GrupoDiagnostico,
  Prioridad,
  Proveedor,
  Ente
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
  PrioridadService,
  MenuService,
  MedicoEspecialidadService,
  ServicioTipoAtencionService,
  GrupoService,
  GrupoServicioService,
  DomicilioService,
  TipoDiagnosticoService,
  SolicitudDiagnosticoService,
  EnteService,
  SolicitudPresupuestoService,
  ProveedorService,
  ServicioProveedorService
}
from 'src/app/services';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';




@Component({
  selector: 'app-solicitud-servicio-elec-onc',
  templateUrl: './solicitud-servicio-elec-onc.component.html',
  styleUrls: ['./solicitud-servicio-elec-onc.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class SolicitudServicioElecOncComponent implements OnInit 
{


   
  nuevoRegistro: boolean;
  submitted: boolean;
  form: FormGroup;
  form1: FormGroup;
  myForm: FormGroup;
  new: boolean;
  blocked: boolean = false;

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
  solicitudpresupuesto_id :number;
  procedimiento_id :number;

  //Transacciones
  solicitud: any = {};

  reporte: any[];
  ordenes: any[]=[];
  sol_activas: any[];

  //combos
  tipoCoberturas: TipoCobertura[];
  tipoCobertura: TipoCobertura;

  proveedores: Proveedor[];
  proveedorSelected: Proveedor;

  Prioridades: Prioridad[];
  Prioridad: Prioridad;

  Entes: Ente[];
  Ente: Ente;

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

  

  /* Codigo de los roles  ELECTIVAS*/
  codRolElectOnCrearOrden: string;
  codRolElectOnCrearSolicitud: string;
  codRolElectOnModificarSolicitud: string;
  codRolElectOnCancelarOrden: string;
  codRolElectOnConfirmarOrden: string;
  /* Habilitar los items del menu según rol */
  rolElectOnCrearOrden: boolean = false;
  rolElectOnCrearSolicitud: boolean = false;
  rolElectOnModificarSolicitud: boolean = false;
  rolElectOnCancelarOrden: boolean = false;
  rolElectOnConfirmarOrden: boolean = false;
  
  fecha_recepcion: any;

  //combos
  tipoOrden: TipoAtencion;
  tipoOrdenes: TipoAtencion[];

  tipoAtencionId: any;
  tipoSolicitudId: any;

  tipoAtencion: any;

  //Grupos solicitados para imagenes
  grupos: GrupoService[];
  grupo: GrupoService;
  grupoId:any;

  //Servicios asociados a estudios especiales
  servicioSolicitado: ServicioTipoAtencionService;
  serviciosSolicitados: any[];
  serviciosSolicitadosSel: any[];

  examenesSolicitados: any[];
  examenesSolicitadosSel: any[];
  examenesAgregados: any[];

  examenesProgramados: any[];
  examenesProgramadosSel: any[];
  deshabilitarAgregarItem:boolean;

  deshabilitarGuardar: boolean;
  
  deshabilitarCrearOrden: boolean;
  deshabilitarAcciones: boolean;

  deshabilitarBotonCancelar: boolean;
  deshabilitarBotonConfirmar: boolean;

  serviciosPresupuesto: any = [];
  servicioPresupuesto: any = {};

  reporteServicios: any[];
  reporteExamenes: any[];
  medicos:any[];
  gruposdiagnostico: GrupoDiagnostico[];
  grupodiagnostico: GrupoDiagnostico;

  tipoGrupo: any;
  
  reporteDiagnosticos :any[];
  
  domicilios:any[];

//  entes:any[];

  serviciosSeleccionadosSel: any[];
  serviciosAgregados: any[];

  serviciosPresupuestosAgregados: any[];

  recaudos: any[];
  recaudo: any;
  recaudosEntregados: any[];

  displayDialogExamen: boolean;

  diagnosticosAgregados: any[];
  diagnosticosSolicitados: any[];
  diagnosticosSel: any[];

  selectedRegistros: any[];


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
    private prioridadService: PrioridadService,
    private estadoSolicitudService: EstadoSolicitudService,
    private solicitudService: SolicitudService,
    private atencionService: AtencionService,
    private messageService: MessageService,
    private ordenService:  OrdenServicioService,
    private causaService:  CausaService,
    private rolesService: RolesService,
    private srvRolesByUser: UserRolesService,
    private tipoOrdenService: TipoAtencionService,
    private solicitudServiciosService: SolicitudServicioService,
    private menuService: MenuService,
    private medicoEspecialidadService: MedicoEspecialidadService,
    private solicitudDiagnosticoService : SolicitudDiagnosticoService,
    private grupoService: GrupoService,
    private ServicioTipoAtencionService: ServicioTipoAtencionService,
    private domicilioService : DomicilioService,
    private grupoDiagnosticoService : TipoDiagnosticoService,
    private enteService: EnteService,
    private solicitudpresupuestoService:SolicitudPresupuestoService,
    private proveedorService:ProveedorService,
    private ServicioProveedorService:ServicioProveedorService,

  ) { 

    this.createForm();
    this.createFormPresupuesto();
    this.title = "Solicitud de Servicio";

       
    //Cargar Roles LABORATOTIO
    this.codRolElectOnCrearOrden          = this.rolesService.getCodRolElectivaQUICrearOrden();
    this.codRolElectOnCrearSolicitud      =  this.rolesService.getCodRolElectivaQUICrearSolicitud();
    this.codRolElectOnModificarSolicitud  =  this.rolesService.getCodRolElectivaQUIModificarSolicitud();
    this.codRolElectOnCancelarOrden       =  this.rolesService.getCodRolElectivaQUICancelarOrden();
    this.codRolElectOnConfirmarOrden      =  this.rolesService.getCodRolElectivaQUIConfirmarOrden();
  
    this.rolElectOnCrearOrden           = this.srvRolesByUser.buscarRolPorCodigo(this.codRolElectOnCrearOrden).length > 0 ? true : true;
    this.rolElectOnCrearSolicitud       = this.srvRolesByUser.buscarRolPorCodigo(this.codRolElectOnCrearSolicitud).length > 0 ? true : true;
    this.rolElectOnModificarSolicitud   = this.srvRolesByUser.buscarRolPorCodigo(this.codRolElectOnModificarSolicitud).length > 0 ? true : true;
    this.rolElectOnCancelarOrden        = this.srvRolesByUser.buscarRolPorCodigo(this.codRolElectOnCancelarOrden).length > 0 ? true : true;
    this.rolElectOnConfirmarOrden       = this.srvRolesByUser.buscarRolPorCodigo(this.codRolElectOnConfirmarOrden).length > 0 ? true : true;
    

    
    
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
      this.showError(err); //console.log(err);
    });


    if (this.tipoAtencionId == 12){
      this.tipoGrupo =12;   //Electiva Oncologico
    };


  }

  ngOnInit(): void 
  {
    
    this.procedimiento_id=null;
    this.deshabilitarGuardar=false;
    this.deshabilitarCrearOrden=false;
    this.deshabilitarAcciones= false;
    this.deshabilitarAgregarItem=false;

    this.serviciosSolicitados=[];
    this.reporteServicios=[];
    this.reporteExamenes=[];
    this.diagnosticosAgregados=[];
    this.diagnosticosSolicitados=[];
    this.diagnosticosSel=[];
    this.reporteDiagnosticos=[];
    this.examenesProgramados=[];
    this.examenesProgramadosSel=[];


    this.beneficiarioId = this.activatedRoute.snapshot.params.beneficiario_id;
    this.solicitudId = this.activatedRoute.snapshot.params.solicitud_id;
    this.serviciosAgregados=[];
    this.examenesAgregados=[];
    this.serviciosPresupuesto=[];

    let format = 'yyyy-MM-dd';
    const locale = 'en-ES';
    let date: Date = new Date();
    this.fecha_recepcion= date;
    this.solicitudpresupuesto_id = 1000;

    this.consultar();

this.dropdownGrupo();
//this.dropdownRecaudo();
this.dropdownServiciosPorGrupo();
// this.dropdownExamenesPorGrupo();

this.fullDropdownEstado();
this.fullDropdownTipoCobertura();
this.fullDropdownTipoSolicitud();
this.fullDropdownEspecialidades();
//  this.fullDropdownCausas();
this.fullDropdownTipoOrden();
this.dropdownDiagnosticos();
this.dropdownDomicilios();
this.dropdownDiagnosticoPorGrupo();
this.fullDropdownPrioridad();
this.dropdownProveedor()
this.dropdownEntes();
this.openNew();

this.currentUser = JSON.parse(this.authService.getCurrentUser());
//this.parametros = {nombre:"prueba"};
let currentUser = this.authService.getCurrentUser();
this.usuario  = JSON.parse(currentUser);

  //Colsultar si el beneficiario tiene solicitudes abiertas o asignadas
//Para dar mensaje de advertencia al analista

this.consultarSolicitudesActivas();

this.deshabilitarBotonGuardar();
this.deshabilitarAgregar();
this.deshabilitarBotonCrearOrden();
this.deshabilitarAccionCancelar();
this.deshabilitarAccionConfirmar();
this.cols = [
  { field: 'solicitud_presupuesto_id', header: 'Id', width: '10%' },
  /*{ field: 'proveedor_id', header: 'Cod Proveedor', width: '5%' },*/
  { field: 'proveedor_nombre', header: 'Proveedor', width: '25%' },
 /* { field: 'servicio_id', header: 'Cod Procedimiento', width: '5%' },*/
  { field: 'nombre', header: 'Procedimiento', width: '30%' },
  { field: 'precio', header: 'Precio Dolar', width: '10%' },
  { field: 'precio_bs', header: 'Precio Bs', width: '10%' },
  { field: 'precio_tasa', header: 'tasa', width: '10%' }

];

  }


dropdownServiciosPorGrupo(){
    if (this.tipoGrupo){
      this.ServicioTipoAtencionService
        .getAllByAtencion(this.tipoAtencion)
        .toPromise()
        .then((results) => {
          this.serviciosSolicitados = results;
        })
        .catch((err) => {
          this.showError(err); //console.log(err);
        });

      }
  }


  openNew() {
    this.new = true;
    this.solicitud = {};
    this.submitted = false;
  }

  private showError(errMsg: string) {
    this.messageService.clear();
    this.messageService.add({ key: 'tc', severity: 'error', summary: errMsg });
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
        .catch(err => { 
          this.showError(err); //console.log(err) 
        });
    }

  }

  dropdownProveedor()
  {
    this.proveedorService
      .getAllCombo()
      .toPromise()
      .then((results) => {
        let aux_prov=[];
        aux_prov=  results;
      //  this.proveedores =results;
        
        this.proveedores = aux_prov.filter(x => x.tipo_proveedor_nombre != "Laboratorios");
        this.proveedorSelected = null;

        

      })
      .catch((err) => {
        console.log(err);
      });
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


  createForm() {
    this.form = this.fb.group({
      motivo:               ['', [Validators.required]],
      telefono:             ['', [Validators.required]],
      telefono2:            ['', [Validators.required]],
      email:                [''],
      cedula_hcm:           [''],
      tipoCobertura:        [''],
      tipoSolicitud:        [''],
      especialidad:         ['', [Validators.required]],
      medico:               [''],
      domicilio:            ['', [Validators.required]],
      prioridad:            ['', [Validators.required]],
      ente:            ['', [Validators.required]],
      diagnosticosSel:  [''],
      diagnosticosAgregados:  [''],
      estadoSolicitud:      [''],
      fecha_recepcion:      [''],
      observacion:          [''],
      tipoOrden:            [''],
      grupo:  [''],
      grupodiagnostico:  ['']

    });

    this.myForm = this.fb.group({
      recaudo: ['']

    });
  }


  

  fullDropdownEstado() {
    this.estadoSolicitudService.getAllCombo()
      .toPromise()
      .then((results) => {
        this.estadoSolicitudes = results;
      })
      .catch((err) => {
        this.showError(err); //console.log(err);
      });
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
        this.showError(err); //console.log(err);
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
        this.showError(err); console.log(err);
      });
  }

  fullDropdownEspecialidades() {
    this.especialidadService.getAllCombo()
      .toPromise()
      .then((results) => {
        this.especialidades = results;
      })
      .catch((err) => {
        this.showError(err); //console.log(err);
      });
  }

  fullDropdownPrioridad()
  { 
    this.prioridadService.getAllCombo()
      .toPromise()
      .then((results) => {
        this.Prioridades = results;
        if (this.Prioridades){
          this.Prioridad = this.Prioridades[0];

          if (!this.solicitud.prioridad_id){
            this.solicitud.prioridad_id = this.Prioridad.value;
          }

        }
      })
      .catch((err) => {
        this.showError(err); //console.log(err);
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
        this.showError(err); //console.log(err);
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
        this.showError(err); //console.log(err);
      });

      
  }


  deshabilitarAgregar(){
    //Solicitudes CERRADAS o CANCELADAS
   if (this.tipoAtencionId == 12)
   {
            this.deshabilitarGuardar = false;
          if (this.solicitud.estado_solicitud_id == 2 || this.solicitud.estado_solicitud_id == 3 ){
            this.deshabilitarGuardar = true;
          };

          //Si no tiene el rol no puede guardar
          if (!this.rolElectOnCrearSolicitud ){    
            this.deshabilitarGuardar = true;
          }
    }
  
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


  guardar()
  {
     //console.log(this.serviciosSolicitadosSel);
    //this.addDiagnosticos();
    //this.addServicio();
    this.deshabilitarAgregar();
    this.submitted = true;
    this.set();

    if (this.form.valid) {
         // console.log("valor",this.diagnosticosAgregados.length);
          if (this.diagnosticosAgregados.length > 0)
            {

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

                    this.solicitud.fecha_solicitud = this.solicitud.fecha_recepcion;
                    this.solicitud.usuario_creador= this.usuario.siglado; // login usuario conectado
                    this.solicitud.nombre_creador= this.usuario.nombre;   // nombre usuario conecta
                   // this.solicitud.servicios = this.serviciosAgregados;
                   this.solicitud.procedimientos = this.serviciosPresupuesto;
                  //  this.solicitud.examenes = this.examenesAgregados;
                    this.solicitud.diagnosticos = this.diagnosticosAgregados;

                    //console.log('SOLICITUD: ', this.serviciosSolicitadosSel);


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
                            this.consultarProcedimientosRequeridos();
                          //
                          

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
                    this.solicitud.fecha_solicitud = this.solicitud.fecha_recepcion;
                    this.solicitud.usuario_modificador= this.usuario.siglado; // login usuario conectado
                    this.solicitud.nombre_modificador= this.usuario.nombre; // nombre usuario conecta
                    this.solicitud.modified = fecha_modificacion ; // nombre usuario conecta
                    this.solicitud.procedimientos = this.serviciosPresupuesto;
                    this.solicitud.diagnosticos = this.diagnosticosAgregados;

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
                            this.consultarProcedimientosRequeridos();
              
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
                  this.consultarProcedimientosRequeridos();

                  this.submitted = true;
        }
        else
        {
          this.showError('Ingrese la información de los diagnosticos.');
          this.blocked = false;
        }
    }else{
      this.showError('Ingrese la información de todos los campos obligatorios.');
      this.blocked = false;
    }

  }

 

  pushpresupuesto(data: any) 
  {
  
    this.serviciosPresupuesto.push(data);
    this.serviciosAgregados.push(data);
  }


  

  addProcedimientosPrevio() {
    if (this.reporteServicios.length > 0) {
      for (let i = 0; i < this.reporteServicios.length; i++)
      {
        let aux3=[];
        aux3 = this.serviciosPresupuesto.filter(x => x.servicio_id == this.reporteServicios[i].servicio_id && x.proveedor_id == this.reporteServicios[i].proveedor_id);
        if(aux3.length <= 0)
        { 
                      
          let data = {
            solicitud_presupuesto_id : this.reporteServicios[i].solicitud_presupuesto_id,
            servicio_id: this.reporteServicios[i].servicio_id,
            proveedor_id:  this.reporteServicios[i].proveedor_id,
            proveedor_nombre: this.reporteServicios[i].nombre_proveedor,
            nombre:this.reporteServicios[i].nombre_servicio,
            precio :this.reporteServicios[i].precio_dolar,
            precio_bs : this.reporteServicios[i].precio_bs,
            precio_tasa: this.reporteServicios[i].precio_tasa
          };


            
            this.pushpresupuesto(data);
        }    
    }

    ///  this.showSuccess("Examenes añadidos. Presione el botón 'Guardar' para guardar la solicitud.");
    }
  }

  

   

  
  deshabilitarBotonCrearOrden(){

    //Si no tiene el rol no puede crear ordenes
    if (!this.rolElectOnCrearSolicitud ){      
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
      //Permite crear ordenes despues de que la solicitud este asignada 
      //Aplica para imagen y laboratorio sin restricciones
      /*
      if (!this.itemRolCitasCrearOrdenesAdm){    
        this.deshabilitarCrearOrden = true;
      }
      */
    };
  }

  consultarProcedimientosRequeridos() 
  {
  
    this.solicitudpresupuestoService
    .getAllBySolicitud(this.solicitudId)
      .toPromise()
      .then((results) => {
        let aux_serv=[];
        aux_serv=  results;
        this.reporteServicios = results;
        this.serviciosPresupuesto=[];
        this.serviciosAgregados=[];
        this.addProcedimientosPrevio();
         
      })
      .catch((err) => {
        console.log(err);
      });
  }

  

  openNewPresupuesto() {
    this.nuevoRegistro = true;
    this.tituloDialogo = 'Nuevo Registro';
    this.servicioPresupuesto = {};
    this.displayDialog = true;
    this.submitted = false;


  }

  close() {
    this.servicioPresupuesto = null;
    this.displayDialog = false;
    this.submitted = false;
    this.nuevoRegistro = false;
  }

  

  dropdownDiagnosticoPorGrupo(){
    if (this.grupodiagnostico){
   this.grupoDiagnosticoService
     .getAllByGrupo(this.grupodiagnostico)
     .toPromise()
     .then((results) => {
       this.diagnosticosSolicitados = results;
      
     })
     .catch((err) => {
       this.showError(err); //console.log(err);
     });

   }
}

  dropdownDiagnosticos() {
    this.grupoDiagnosticoService.getAllCombo()
      .toPromise()
      .then((results) => {
        this.gruposdiagnostico = results;
      })
      .catch((err) => {
        this.showError(err); //console.log(err);
      });
  }


  deshabilitarAccionCancelar(){
    if (this.rolElectOnCancelarOrden==false ){  
          this.deshabilitarBotonCancelar= true;
    }

  };  

  deshabilitarAccionConfirmar(){
    if (!this.rolElectOnConfirmarOrden ){  
        this.deshabilitarBotonConfirmar= true;
    }
  };



  deshabilitarBotonGuardar()
  {
     //Solicitudes CERRADAS o CANCELADAS
    if (this.solicitud.estado_solicitud_id == 2 || this.solicitud.estado_solicitud_id == 3  ){
      this.deshabilitarGuardar = true;
      this.deshabilitarAgregarItem=true;
      


    };

    //Si no tiene el rol no puede guardar
    if (!this.rolElectOnCrearSolicitud ){    
      this.deshabilitarGuardar = true;
      this.deshabilitarAgregarItem=true;
    }

   
  }

  consultar()
  {
    
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
         this.tipoAtencionId= this.solicitud.atencion_id;
         this.dropdownM();
         this.consultarOrdenes();
         this.consultarDiagnosticosSolicitud();
         this.consultarProcedimientosRequeridos();
        // this.consult_presupuesto();
        

       }
     })
     .catch(err => { 
                        this.showError(err); //console.log(err);
                    
                    });

    }else{
      this.consultarOrdenes();
         
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
          .catch(err => { 
              this.showError(err); //console.log(err) 
          });
        }
        //this.loading = false;
      })
      .catch(err => { 
                    this.showError(err);//console.log(err) 
              });
    //this.loading = false;

  }

  save() {
    this.submitted = true;
    let aux = { ...this.servicioPresupuesto };
    console.log("dddd",aux);
    let new_aux = this.serviciosSolicitados.filter(x => x.servicio_id ==  aux.servicio_id);
    let new_prov = this.proveedores.filter(x => x.proveedor_id ==  aux.proveedor_id);
    let new_prov2 = this.proveedores.filter(x => x.proveedor_id ==  aux.proveedor_id1);
  

    if (this.form1.valid)
     {
        if (this.nuevoRegistro) 
          {

            let aux3=[];
            aux3 = this.serviciosPresupuesto.filter(x => x.servicio_id == aux.servicio_id && x.proveedor_id == aux.proveedor_id);
            if(aux3.length <= 0){ 
              this.solicitudpresupuesto_id = this.solicitudpresupuesto_id + 1;
              let data = {
                solicitud_presupuesto_id : this.solicitudpresupuesto_id,
                servicio_id: aux.servicio_id,
                proveedor_id:aux.proveedor_id,
                proveedor_nombre: new_prov[0].label,
                nombre: new_aux[0].label,
                precio : aux.precio,
                precio_bs : aux.precio_bs,
                precio_tasa: aux.precio_tasa
              };
              this.pushpresupuesto(data);
            }

            let aux4=[];
            aux4 = this.serviciosPresupuesto.filter(x => x.servicio_id == aux.servicio_id && x.proveedor_id == aux.proveedor_id1);
            if(aux4.length <= 0){ 
              this.solicitudpresupuesto_id = this.solicitudpresupuesto_id + 1;
              let data = {
                solicitud_presupuesto_id : this.solicitudpresupuesto_id,
                servicio_id: aux.servicio_id,
                proveedor_id:aux.proveedor_id1,
                proveedor_nombre: new_prov2[0].label,
                nombre: new_aux[0].label,
                precio : aux.precio1,
                precio_bs : aux.precio_bs1,
                precio_tasa: aux.precio_tasa1
              };
              this.pushpresupuesto(data);
            }

            this.showSuccess("Presupuesto(s) añadido(s) correctamente");
            this.close();

          }
          else
          {
        
             this.update(this.servicioPresupuesto);  
             this.close();
          }
     }
     else
     {
      this.showError('Ingrese la información de todos los campos obligatorios.');
      //this.submitted = false;
     }
  }

  calculateAge() 
  {
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

  removeDiagnostico(actual: any) {
    for (var i = 0; i < this.diagnosticosAgregados.length; i++) {
       if (this.diagnosticosAgregados[i].diagnostico_id === actual.diagnostico_id) 
       {
              this.diagnosticosAgregados.splice(i, 1);
       }
     }
}


  consultarDiagnosticosSolicitud(){
    this.reporteDiagnosticos = [];
    if (this.solicitud.solicitud_id){
        this.solicitudDiagnosticoService
        .getDiagnosticosAsignadosBySolicitud(this.solicitud.solicitud_id)
        .toPromise()
        .then((results) => {
          this.reporteDiagnosticos = results;
          this.addDiagnosticosPrevio();
        })
        .catch((err) => {
          this.showError(err); //console.log(err);
        });

    }
  }

  
  pushDiagnostico(data: any) 
  {
    this.diagnosticosAgregados.push(data);
  }

  addDiagnosticosPrevio() {
    this.diagnosticosAgregados = [];
    if (this.reporteDiagnosticos.length > 0) {

      for (let i = 0; i < this.reporteDiagnosticos.length; i++)
      {
            let data = {
              diagnostico_id: this.reporteDiagnosticos[i].diagnostico_id,
              nombre_grupo: this.reporteDiagnosticos[i].grupo,
              nombre: this.reporteDiagnosticos[i].name,
            };
            
            this.pushDiagnostico(data);
      }

  
    }
  }


  dropdownGrupo(){
    this.grupoService.getGruposByTipo(this.tipoGrupo)
      .toPromise()
      .then((results) => {
        this.grupos = results;
      })
      .catch((err) => {
        this.showError(err); //console.log(err);
      });
}






  
  //Consultar ordenes de atencion de una solicitud
  consultarOrdenes()
  {
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
      .catch(err => { 
                      this.showError(err);//console.log(err); 
                  });

      this.deshabilitarBotonGuardar();
      this.deshabilitarBotonCrearOrden();
      this.deshabilitarAccionCancelar();
      this.deshabilitarAccionConfirmar();
     }
  }

  clone(c: Ente): Ente {
    let registro = {};
    for (let prop in c) {
      registro[prop] = c[prop];
    }
    return registro;
  }
 

  edit(registroActual: any) {
    this.nuevoRegistro = false;
   /* this.servicioPresupuesto = { ...registroActual };
    
    this.displayDialog = true;
    this.tituloDialogo = 'Editar: ' ;
    this.submitted = false;*/


    this.servicioPresupuesto = this.clone(registroActual);
    this.displayDialog = true;
    this.tituloDialogo = 'Editar: ' + this.servicioPresupuesto.solicitud_presupuesto_id;
    this.submitted = false;
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

  dropdownEntes() {
    this.enteService
      .getAllCombo()
      .toPromise()
      .then((results) => {
        this.Entes = results;
        if (this.Entes){
          this.Ente = this.Entes[0];

          if (!this.solicitud.ente_id){
            this.solicitud.ente_id = this.Ente.value;
          }

        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createFormPresupuesto() {
    this.form1 = this.fb.group({
      proveedor: ['', [Validators.required]],
      servicio: ['', [Validators.required]],
      precio: ['',[Validators.required] ],
      precio_tasa: ['',[Validators.required] ],
      precio_bs: [''],
      proveedor1: [''],
      precio1: [''],
      precio_tasa1: [''],
      precio_bs1: [''],

     });
  }

  calcular_preciobs()
  {

    if (this.servicioPresupuesto.precio_tasa)
    {
      if(this.servicioPresupuesto.precio)
      {
        this.servicioPresupuesto.precio_bs = this.servicioPresupuesto.precio_tasa * this.servicioPresupuesto.precio;  
      }
      else
      {
        this.showError("Debe ingresar el precio del servicio");
      }
    }
    else
      {
        if (!this.servicioPresupuesto.precio_tasa1)
        {
            this.showError("Debe ingresar la tasa");
        }
      }

  }

  calcular_preciobs2()
  {

    if (this.servicioPresupuesto.precio_tasa1)
    {
      if(this.servicioPresupuesto.precio1)
      {
        this.servicioPresupuesto.precio_bs1 = this.servicioPresupuesto.precio_tasa1 * this.servicioPresupuesto.precio1;  
      }
      else
      {
        this.showError("Debe ingresar el precio del servicio");
      }
    }
    else
      {
        if (!this.servicioPresupuesto.precio_tasa1)
        {
            this.showError("Debe ingresar la tasa");
        }
      }

  }

 
  confirmDelete(solicitud_presupuesto: any) {
    this.confirmationService.confirm({
      message:
        '¿Está seguro que desea borrar el presupuesto : ' +
        solicitud_presupuesto.solicitud_presupuesto_id +
        '?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.remove(solicitud_presupuesto);
      },
    });
  }

  remove(registroActual: any) {
    this.solicitudpresupuestoService
      .delete(registroActual.solicitud_presupuesto_id)
      .toPromise()
      .then((results) => {
        let aux: Respuesta = results;
        if (aux) {
          this.consultarProcedimientosRequeridos();
          this.showSuccess(aux.details);
        } else {
          this.showError(aux.details);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  update(registroActual: any) {
    console.log("entre aqui",registroActual);
    this.solicitudpresupuestoService
      .update(registroActual)
      .toPromise()
      .then((results) => {
        let aux: Respuesta = results;
        if (aux) {
          this.consultarProcedimientosRequeridos();
          this.showSuccess(aux.details);
        } else {
          this.showError(aux.details);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }


  consult_servicios() 
  {
    this.ServicioProveedorService
    .getAllByProveedor(this.servicioPresupuesto.proveedor_id)
      .toPromise()
      .then((results) => {
        let aux_serv=[];
        aux_serv=  results;
        this.servicioPresupuesto.nameproveedor=aux_serv[0].proveedor_nombre;
        this.serviciosSolicitados = aux_serv.filter(x => x.tipo_atencion_id == "12");
       // console.log("servicio_pro", this.serviciosPresupuesto);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addDiagnosticos() {
    if (this.diagnosticosSel.length > 0) {
        
      for (let i = 0; i < this.diagnosticosSel.length; i++)
      {
       
          let aux=[];
          aux = this.diagnosticosAgregados.filter(x => x.diagnostico_id == this.diagnosticosSel[i].diagnostico_id);
          if(aux.length <= 0){
            let data = {
              diagnostico_id: this.diagnosticosSel[i].diagnostico_id,
              nombre_grupo: this.diagnosticosSel[i].grupo,
              nombre: this.diagnosticosSel[i].name,
            };
            
            this.pushDiagnostico(data);
          }
      }

      this.showSuccess("Diagnosticos añadidos. Presione el botón 'Guardar' para guardar la solicitud.");
    }
  }


  regresar(){
    this.router.navigate(['solicitud-beneficiario/' + '1' + '/' + this.beneficiario.cedula_titular]);
  }
  listado(){
    this.router.navigate(['solicitud-modificar']);
  }

}
