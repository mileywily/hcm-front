import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common'; 

import {  
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


import {  
  BeneficiarioService,
  SolicitudService,
  TipoCoberturaService,
  TipoSolicitudService,
  EspecialidadService,
  EstadoSolicitudService,
  AtencionService,
  AuthService,
  UserRolesService,
  RolesService,
  TipoAtencionService,
  ServicioTipoAtencionService,
  MenuService,
  MedicoEspecialidadService,
  GrupoService,
  DomicilioService,
  TipoDiagnosticoService,
  SolicitudDiagnosticoService,
  EnteService,
  SolicitudPresupuestoService,
  ProveedorService,
  ServicioProveedorService,
  PrioridadService
}
from 'src/app/services';

import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-solicitud-servicio-elec-med',
  templateUrl: './solicitud-servicio-elec-med.component.html',
  styleUrls: ['./solicitud-servicio-elec-med.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class SolicitudServicioElecMedComponent implements OnInit 
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
  tipoSolicitudes: TipoSolicitud[];
  tipoSolicitud: TipoSolicitud;
  especialidades: Especialidad[];
  especialidad: Especialidad;
  estadoSolicitudes: any[];
  estadoSolicitud: any;
  causas: any[];
  causa: any;

  
  serviciosPresupuesto: any = [];
  servicioPresupuesto: any = {};

  currentUser: any;
  formattedFechaSolicitud: any;

  usuario: any;
  datos_orden: any;
  causa_id: any;

  user: Trabajador;
  asset: any;

  roles: RolModelo[] = [];
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
  

  reporteServicios: any[];
  reporteExamenes: any[];
  medicos:any[];
  gruposdiagnostico: GrupoDiagnostico[];
  grupodiagnostico: GrupoDiagnostico;

  tipoGrupo: any;
  
  reporteDiagnosticos :any[];
  
  domicilios:any[];

  serviciosSeleccionadosSel: any[];
  serviciosAgregados: any[];

  recaudos: any[];
  recaudo: any;
  recaudosEntregados: any[];

  displayDialogExamen: boolean;

  diagnosticosAgregados: any[];
  diagnosticosSolicitados: any[];
  diagnosticosSel: any[];
  Prioridades: Prioridad[];
  Prioridad: Prioridad;

  Entes: Ente[];
  Ente: Ente;

  proveedores: Proveedor[];
  proveedorSelected: Proveedor;
  selectedRegistros: any[];


  constructor(
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
    private rolesService: RolesService,
    private srvRolesByUser: UserRolesService,
    private tipoOrdenService: TipoAtencionService,
     private menuService: MenuService,
    private medicoEspecialidadService: MedicoEspecialidadService,
    private solicitudDiagnosticoService : SolicitudDiagnosticoService,
    private grupoService: GrupoService,
    private domicilioService : DomicilioService,
    private grupoDiagnosticoService : TipoDiagnosticoService,
    private enteService: EnteService,
    private solicitudpresupuestoService:SolicitudPresupuestoService,
    private proveedorService:ProveedorService,
    private prioridadService: PrioridadService,
    private ServicioTipoAtencionService: ServicioTipoAtencionService,
  ) 
  { 

    this.createForm();
    this.createFormPresupuesto();
    this.title = "Solicitud de Servicio";
    this.setearRolesyPermisos();
    this.tipoSolicitudId  = this.menuService.getTipoSolicitud();
   // this.tipoAtencionId  = this.menuService.getTipoAtencion();

 }

 

  ngOnInit(): void 
  {

   
    this.inicializarVariables();
    this.inicializarArreglos();
    this.inicializarDropdowns();
    this.consultar();
    this.consultarSolicitudesActivas();
    this.configurarDeshabilitaciones();

    this.cols = [
      { field: 'solicitud_presupuesto_id', header: 'Id', width: '10%' },
      { field: 'proveedor_nombre', header: 'Proveedor', width: '25%' },
      { field: 'nombre', header: 'Procedimiento', width: '35%' },
      { field: 'precio', header: 'Precio Dolar', width: '10%' },
      { field: 'precio_bs', header: 'Precio Bs', width: '10%' },
      { field: 'precio_tasa', header: 'tasa', width: '10%' }

    ];


 }

 private inicializarDropdowns(): void 
  {
        this.fullDropdownGrupo();

        this.fullDropdownEstado();
        this.fullDropdownTipoCobertura();
        this.fullDropdownTipoSolicitud();
        this.fullDropdownEspecialidades();
        this.fullDropdownTipoOrden();
        this.fullDropdownServiciosPorGrupo();
        this.fullDropdownDiagnosticos();
        this.fullDropdownDomicilios();
        this.fullDropdownDiagnosticoPorGrupo();
        this.fullDropdownPrioridad();
        this.fullDropdownProveedor();
        this.fullDropdownEntes();
        this.fullDropdownMedicos();
 }

private setearRolesyPermisos()
{
    //Cargar Roles 
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

}

public buscarNombreTipoAtencion()
{

  this.title = "Solicitud de Servicio"; 
  this.title = this.title + ' ' + "Procedimientos Electivas ";

  let variable: string | undefined;
  let valorPorDefecto =this.tipoOrden;

  this.solicitud.tipo_atencion_id = this.solicitud.tipo_atencion_id ?? valorPorDefecto;


  this.tipoOrdenService
    .getById(this.solicitud.tipo_atencion_id)
    .toPromise()
    .then((results) => {
      this.tipoAtencion = results;
      this.title = this.title + ' ' + this.tipoAtencion.nombre;
    })
    .catch((err) => {
      this.manejarError(err); //console.log(err);
    });
    

}


private configurarDeshabilitaciones(): void 
{
  this.deshabilitarBotonGuardar();
  this.deshabilitarAgregar();
  this.deshabilitarBotonCrearOrden();
  this.deshabilitarAccionCancelar();
  this.deshabilitarAccionConfirmar();
}

 private inicializarVariables(): void 
 {
    // Inicialización de propiedades
    this.procedimiento_id = null;
    this.deshabilitarGuardar = false;
    this.deshabilitarCrearOrden = false;
    this.deshabilitarAcciones = false;
    this.deshabilitarAgregarItem = false;
    this.solicitudpresupuesto_id = 1000;
    this.openNew();

    // Obtención del usuario actual
    this.currentUser = JSON.parse(this.authService.getCurrentUser());
    this.usuario = this.currentUser;
    // Obtención de parámetros de la ruta
    this.beneficiarioId = this.activatedRoute.snapshot.params.beneficiario_id;
    this.solicitudId = this.activatedRoute.snapshot.params.solicitud_id;

    // Inicialización de fecha
    const format = 'yyyy-MM-dd';
    const locale = 'en-ES';
    this.fecha_recepcion = new Date();

 }

 private inicializarArreglos(): void 
 {
    // Inicialización de arreglos
    this.serviciosSolicitados = [];
    this.reporteServicios = [];
    this.reporteExamenes = [];
    this.diagnosticosAgregados = [];
    this.diagnosticosSolicitados = [];
    this.diagnosticosSel = [];
    this.reporteDiagnosticos = [];
    this.examenesProgramados = [];
    this.examenesProgramadosSel = [];
    this.serviciosAgregados = [];
    this.examenesAgregados = [];
    this.serviciosPresupuesto = [];

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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //Funcion   consultarSolicitudesActivas() permite validar si el beneficiario tiene solicitudes activas
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  consultarSolicitudesActivas()
  {
        //Colsultar si el beneficiario tiene solicitudes abiertas o asignadas
        //Para dar mensaje de advertencia al analista

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
              this.manejarError('El beneficiario tiene solicitudes ABIERTAS. Verificar.');
          }

        })
        .catch(err => { 
          this.manejarError(err); //console.log(err) 
        });
    }

  }

 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //Funcion   fullDropdownProveedor() permite listar los proveedores
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  fullDropdownProveedor()
  {
    this.proveedorService
      .getAllCombo()
      .toPromise()
      .then((results) => {
        let aux_prov=[];
        aux_prov=  results;
        this.proveedores = aux_prov.filter(x => x.tipo_proveedor_nombre != "Laboratorios");
        this.proveedorSelected = null;
      })
      .catch((err) => {
        this.manejarError(err);
      });
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //Funcion   fullDropdownServiciosPorGrupo() permite listar los procedimientos /servicios por tipo de atencion
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  fullDropdownServiciosPorGrupo()
  {
        this.ServicioTipoAtencionService
        .getAllByAtencion(this.solicitud.tipo_atencion_id)
        .toPromise()
        .then((results) => {
          this.serviciosSolicitados = results;
         })
        .catch((err) => {
          this.manejarError(err); //console.log(err);
        });
    
      
  }



  
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //Funcion   fullDropdownEstado() permite listar los estados
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  fullDropdownEstado() {
    this.estadoSolicitudService.getAllCombo()
      .toPromise()
      .then((results) => {
        this.estadoSolicitudes = results;
      })
      .catch((err) => {
        this.manejarError(err); //console.log(err);
      });
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //Funcion   fullDropdownTipoSolicitud() permite listar los tipos de solicitudes
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
        this.manejarError(err); //console.log(err);
      });
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //Funcion   fullDropdownTipoCobertura() permite listar los tipos de cobertura
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  fullDropdownTipoCobertura() {
    this.tipoCoberturaService.getAllComboActivas()
      .toPromise()
      .then((results) => {
        this.tipoCoberturas= results;
        if (this.tipoCoberturas)
          {
             this.tipoCobertura = this.tipoCoberturas[0];
          }
      })
      .catch((err) => {
        this.manejarError(err); 
      });
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //Funcion   fullDropdownEspecialidades() permite listar las especialidades
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  fullDropdownEspecialidades() 
  {
    this.especialidadService.getAllCombo()
      .toPromise()
      .then((results) => {
        this.especialidades = results;
      })
      .catch((err) => {
        this.manejarError(err); //console.log(err);
      });
  }

 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //Funcion   fullDropdownPrioridad() permite listar las prioridades
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
        this.manejarError(err); //console.log(err);
      });

  }
  
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //Funcion   fullDropdownTipoOrden() permite listar los tipos de ordenes por tipo solicitud
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  fullDropdownMedicos() 
  {
      this.medicoEspecialidadService
        .getMedicoByEspecialidad(this.solicitud.especialidad_id)
        .toPromise()
        .then((results) => {
          this.medicos = results;
        })
        .catch((err) => {
          this.manejarError(err); //console.log(err);
        });
  }


 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //Funcion   fullDropdownTipoOrden() permite listar los tipos de ordenes por tipo solicitud
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  fullDropdownTipoOrden() {
    this.tipoOrdenService.getAllByTipoSolicitud(this.menuService.getTipoSolicitud())
      .toPromise()
      .then((results) => {

        let aux=[];
        aux=results;
        //visualizar los tipoOrdenes que comiencen con el nombre MEDICAMENTOS
        this.tipoOrdenes = aux.filter(x => x.nombre.startsWith('MEDICAMENTOS'));

        //Modificar para nuevos roles !!!
       // console.log("valor",this.tipoOrdenes[0]);
        this.solicitud.tipo_atencion_id =  this.tipoOrdenes[0].tipo_atencion_id;
        this.tipoOrden = this.tipoOrdenes[0].tipo_atencion_id;
        //console.log("tipoate",this.tipoOrdenes[0].tipo_atencion_id);
        //console.log("soli",   this.solicitud.tipo_atencion_id);
        this.buscarNombreTipoAtencion();
        this.configurarDeshabilitaciones();

      })
      .catch((err) => {
        this.manejarError(err); //console.log(err);
      });

      
  }


  
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Funcion   dropdownDiagnosticoPorGrupo() Obtiene la lista de Diagnosticos por grupo   
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  fullDropdownDiagnosticoPorGrupo(){
    if (this.grupodiagnostico){
   this.grupoDiagnosticoService
     .getAllByGrupo(this.grupodiagnostico)
     .toPromise()
     .then((results) => {
       this.diagnosticosSolicitados = results;
      
     })
     .catch((err) => {
       this.manejarError(err); //console.log(err);
     });

   }
}

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Funcion   dropdownDiagnosticos() Obtiene la lista de Diagnosticos   
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  fullDropdownDiagnosticos() {
    this.grupoDiagnosticoService.getAllCombo()
      .toPromise()
      .then((results) => {
        this.gruposdiagnostico = results;
      })
      .catch((err) => {
        this.manejarError(err); //console.log(err);
      });
  }

 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //Funcion   fullDropdownDomicilios() permite listar los domicilios
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  fullDropdownDomicilios() 
  {
    this.domicilioService
      .getAllCombo()
      .toPromise()
      .then((results) => {
        this.domicilios = results;
      })
      .catch((err) => {
        this.manejarError(err);
      });
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //Funcion   fullDropdownGrupo() permite listar los grupos
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  
  fullDropdownGrupo()
  {
    this.grupoService.getGruposByTipo(this.solicitud.tipo_atencion_id)
      .toPromise()
      .then((results) => {
        this.grupos = results;
      })
      .catch((err) => {
        this.manejarError(err); //console.log(err);
      });
  }




  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //Funcion   fullDropdownEntes() permite listar los entes
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  fullDropdownEntes() 
  {
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
        this.manejarError(err);
      });
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //Funcion   openNewPresupuesto() permite habilitar la ventana emergente para agregar un Procedimiento con presupuesto
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  
  openNewPresupuesto() {
    this.nuevoRegistro = true;
    this.tituloDialogo = 'Nuevo Registro';
    this.servicioPresupuesto = {};
    this.displayDialog = true;
    this.submitted = false;
    this.fullDropdownServiciosPorGrupo();
  }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //Funcion   showSuccess() permite visualizar mensaje satisfactorio
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  private showSuccess(successMsg: string) {
    this.messageService.clear();
    this.messageService.add({
      key: 'tc',
      severity: 'success',
      summary: successMsg,
    });
  }

 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //Funcion   createForm() Configuracion del formulario principal
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //Funcion   deshabilitarAgregar() permite deshabilitar el boton  Guardar
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  deshabilitarAgregar(){
    //Solicitudes CERRADAS o CANCELADAS

            this.deshabilitarGuardar = false;
          if (this.solicitud.estado_solicitud_id == 2 || this.solicitud.estado_solicitud_id == 3 || (!this.rolElectOnCrearSolicitud ) )
            {
                 this.deshabilitarGuardar = true;
            }
  
 }

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //Funcion   set() permite setear los datos de  una solicitud 
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 set() 
 {
      this.solicitud.beneficiario_id = this.beneficiarioId;
      this.solicitud.origen_id = 1; //Llamamda telefónica
      if (!this.solicitud.solicitud_id){
        this.solicitud.estado_solicitud_id = 1;
      }
      this.solicitud.tipo_cobertura_id = this.tipoCobertura.tipo_cobertura_id;
      this.solicitud.tipo_solicitud_id = this.tipoSolicitud.tipo_solicitud_id;
      this.solicitud.email= this.beneficiario.email;
      this.solicitud.telefono1= this.beneficiario.telefono;
      this.solicitud.telefono2= this.beneficiario.telefono2;
      this.solicitud.cedula_hcm= this.beneficiario.cedula_hcm;
        // Configurar fechas y datos de la solicitud
        const format = 'yyyy-MM-dd HH:mm:ss';
        const locale = 'en-ES';
        const fechaActual = this.formatDate(new Date(), format, locale);

        this.solicitud.fecha_recepcion = this.fecha_recepcion
            ? this.formatDate(this.fecha_recepcion, format, locale)
            : fechaActual;

        this.solicitud.fecha_solicitud = this.solicitud.fecha_recepcion;
        this.solicitud.procedimientos = this.serviciosPresupuesto;
        this.solicitud.diagnosticos = this.diagnosticosAgregados;
  
        if (this.solicitud.solicitud_id)
          {
             this.solicitud.modified = fechaActual;
          }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //Funcion   guardar() permite guardar  una solicitud 
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

guardar()
{
  this.deshabilitarAgregar();
  this.submitted = true;
  this.set();

  // Validaciones tempranas
  if (!this.form.valid) {
      this.manejarError('Ingrese la información de todos los campos obligatorios.');
      return;
  }

  if (this.diagnosticosAgregados.length === 0) 
    {
      this.manejarError('Ingrese la información de los diagnósticos.');
      return;
    }

  this.blocked = true;



  if (!this.solicitud.solicitud_id) {
      // Crear nueva solicitud
      this.solicitud.usuario_creador = this.usuario.siglado;
      this.solicitud.nombre_creador = this.usuario.nombre;

      this.crearSolicitud();
  } else {
      // Actualizar solicitud existente
      this.solicitud.usuario_modificador = this.usuario.siglado;
      this.solicitud.nombre_modificador = this.usuario.nombre;
      this.actualizarSolicitud();

    }

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //Funcion   crearSolicitud() permite crear una solicitud 
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

private crearSolicitud(): void {
  this.solicitudService.create(this.solicitud)
      .toPromise()
      .then((results: Respuesta) => this.procesarRespuesta(results))
      .catch((err) => this.manejarError(err));
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //Funcion   actualizarSolicitud() permite actualizar una solicitud 
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


private actualizarSolicitud(): void {
  this.solicitudService.update(this.solicitud)
      .toPromise()
      .then((results: Respuesta) => this.procesarRespuesta(results))
      .catch((err) => this.manejarError(err));
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //Funcion   procesarRespuesta() en caso satisfactorio del proceso de solicitud
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


private procesarRespuesta(respuesta: Respuesta): void {
this.blocked = false;
  if (respuesta.status === 500) {
      this.showSuccess(respuesta.details);
      return;
  }

  this.showSuccess(respuesta.details);
  if (respuesta.result) 
  {
      this.solicitud = respuesta.result;
      this.solicitud_id = respuesta.result.solicitud_id;
      this.solicitudId = respuesta.result.solicitud_id;
      this.buscarRelacionadosSolicitud();
      this.actualizarBeneficiario();
  }


}

 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //Funcion   actualizarBeneficiario() permite actualizar los datos del beneficiario
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


private actualizarBeneficiario(): void {
  this.beneficiarioService.update(this.beneficiario)
      .toPromise()
      .then(() => {
          this.blocked = false;
      })
      .catch((err) => { this.manejarError(err); });
}
 
 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 //Funcion   manejarError() funcion para el manejo de errores
 ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

private manejarError(err: any): void {
  this.blocked = false;
  this.showError(err);
}

 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Funcion   formatDate() formatea la fecha 
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


private formatDate(date: Date, format: string, locale: string): string {
  return formatDate(date, format, locale);
}

 ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Funcion   pushpresupuesto() anexa los procedimientos relacionados a los arreglos 
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  pushpresupuesto(data: any) 
  {
  
    this.serviciosPresupuesto.push(data);
    this.serviciosAgregados.push(data);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Funcion   addProcedimientosPrevio() anexa los procedimientos relacionados
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  addProcedimientosPrevio()
   {
      if (this.reporteServicios.length > 0) 
      {
        for (let i = 0; i < this.reporteServicios.length; i++)
        {
          this.agregarProcedimientosSiNoExiste(this.reporteServicios[i].solicitud_presupuesto_id,this.reporteServicios[i],  this.reporteServicios[i].proveedor_id, this.reporteServicios[i].nombre_proveedor, this.reporteServicios[i].nombre_servicio, this.reporteServicios[i].precio_dolar, this.reporteServicios[i].precio_bs, this.reporteServicios[i].precio_tasa);
        }

      }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Funcion   deshabilitarBotonCrearOrden() activa el boton   CrearOrden
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  deshabilitarBotonCrearOrden(){

    //Si no tiene el rol no puede crear ordenes
    if (!this.rolElectOnCrearSolicitud || (this.solicitud.estado_solicitud_id == 2)  ||  (this.solicitud.estado_solicitud_id == 3))
      {      
          this.deshabilitarCrearOrden = true;
      }
   
  }

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Funcion   consultarProcedimientosRequeridos() obtiene los procedimientos relacionados   
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 
  consultarProcedimientosRequeridos() 
  {
    //console.log("lodddd");
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
        this.manejarError(err);
      });
  }

 
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Funcion   close() setea variables para cerrar ventana  
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  close() {
  //  this.servicioPresupuesto = null;
    this.displayDialog = false;
    this.submitted = false;
    this.nuevoRegistro = false;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Funcion   deshabilitarAccionCancelar() activa el botonCancelar  
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  deshabilitarAccionCancelar()
  {
    if (this.rolElectOnCancelarOrden==false )
      {  
          this.deshabilitarBotonCancelar= true;
      }

  };  

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Funcion deshabilitarAccionConfirmar activa el botonConfirmar 
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  deshabilitarAccionConfirmar()
  {
    if (!this.rolElectOnConfirmarOrden )
      {  
        this.deshabilitarBotonConfirmar= true;
      }
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Funcion deshabilitarBotonGuardar activa el botonGuardar y AgregarItem 
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  deshabilitarBotonGuardar()
  {
     //Solicitudes CERRADAS o CANCELADAS
    if (this.solicitud.estado_solicitud_id == 2 || this.solicitud.estado_solicitud_id == 3 || (!this.rolElectOnCrearSolicitud ) )
      {
          this.deshabilitarGuardar = true;
          this.deshabilitarAgregarItem=true;
       };
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Funcion consultar Obtiene todos los datos de una solicitud Existente 
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  consultar()
  {
    
    if (!this.beneficiarioId) 
      {        return;      };

    if (this.solicitudId != -1)
      {
          this.solicitudService.getById(this.solicitudId)
          .toPromise()
          .then(results => 
            {
            if (results){
              this.solicitud = results;
              this.solicitud_id = this.solicitud.solicitud_id
              this.fecha_recepcion = this.solicitud.fecha_recepcion;
              this.tipoAtencionId= this.solicitud.atencion_id;
              this.buscarRelacionadosSolicitud();

            }
          })
          .catch(err => 
            { 
                this.manejarError(err); //console.log(err);
                          
            });

    }
    //this.loading = true;
    this.buscarBeneficiarioById();

  }

///////////////////////////////////////////////////////////////////////////////////////////////
  //Funcion buscarBeneficiarioById  Buscar y Setear valores del Beneficiario
  //////////////////////////////////////////////////////////////////////////////////////////////
 private buscarRelacionadosSolicitud()
 {
  this.fullDropdownMedicos();
  this.consultarDiagnosticosSolicitud();
  this.consultarProcedimientosRequeridos();
  this.consultarOrdenes();
 }

  ///////////////////////////////////////////////////////////////////////////////////////////////
  //Funcion buscarBeneficiarioById  Buscar y Setear valores del Beneficiario
  //////////////////////////////////////////////////////////////////////////////////////////////
 
  buscarBeneficiarioById()
  {
    this.beneficiarioService.getById(this.beneficiarioId)
    .toPromise()
    .then(results => 
      {

            this.beneficiario = results;
            this.calculateAge();

      if (this.beneficiario)
        {
            let data = 
            {
              cedula_titular: this.beneficiario.cedula_titular
            }

            this.beneficiarioService.getTitularByBeneficiario(data)
            .toPromise()
            .then(results => 
              {

                    if (results)
                      {
                          this.titular = results[0];

                          if (!this.beneficiario.cedula_hcm)
                            {
                                this.beneficiario.cedula_hcm = this.beneficiario.cedula_beneficiario;
                            }

                      }
                    //this.loading = false;
               })
              .catch(err => { 
                  this.manejarError(err); //console.log(err) 
              });
            }

    })
    .catch(err => { 
                  this.manejarError(err);//console.log(err) 
            });
  }

  ///////////////////////////////////////////////////////////////////////////////////////////
  //Funcion Save Para guardar en un arreglo los procedimientos relacionados a una solicitud 
  //////////////////////////////////////////////////////////////////////////////////////////
  save() 
  {
    this.submitted = true;

    if (!this.form1.valid) 
      {
          this.manejarError('Ingrese la información de todos los campos obligatorios.');
          return;
      }
    //Asignación de Variables 
    let Servicio = { ...this.servicioPresupuesto };
    let ServicioSolicitado = this.serviciosSolicitados.find(x => x.servicio_id ==  Servicio.servicio_id);
    let Proveedor_01 = this.proveedores.find(x => x.proveedor_id ==  Servicio.proveedor_id);
    let Proveedor_02 = this.proveedores.find(x => x.proveedor_id ==  Servicio.proveedor_id1);
  
        if (this.nuevoRegistro) 
          {
            this.agregarProcedimientosSiNoExiste(this.solicitudpresupuesto_id += 1,Servicio, Servicio.proveedor_id, Proveedor_01.label, ServicioSolicitado.label, Servicio.precio, Servicio.precio_bs, Servicio.precio_tasa);
            this.agregarProcedimientosSiNoExiste(this.solicitudpresupuesto_id += 1,Servicio, Servicio.proveedor_id1, Proveedor_02.label, ServicioSolicitado.label, Servicio.precio1, Servicio.precio_bs1, Servicio.precio_tasa1);
            this.showSuccess("Presupuesto(s) añadido(s) correctamente");
            this.close();
          }
          else
          {
             this.update(this.servicioPresupuesto);  
             this.close();
          }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Funcion agregarPresupuestoSiNoExiste Para armar la data de los procedimientos relacionados a una solicitud 
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  private agregarProcedimientosSiNoExiste(solicitudpresupuesto_id: number ,servicio: any, proveedorId: number, proveedor: any,  servicioSolicitado: any,
    precio: number,    precioBs: number,    precioTasa: number)
    {
        const existePresupuesto = this.serviciosPresupuesto.some(
            x => x.servicio_id === servicio.servicio_id && x.proveedor_id === proveedorId
        );

        if (!existePresupuesto) {
            
            const data = {
                solicitud_presupuesto_id: solicitudpresupuesto_id,
                servicio_id: servicio.servicio_id,
                proveedor_id: proveedorId,
                proveedor_nombre: proveedor,
                nombre: servicioSolicitado,
                precio: precio,
                precio_bs: precioBs,
                precio_tasa: precioTasa
            };
            this.pushpresupuesto(data);
        }
   }


   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Funcion calculateAge funcion para calcular la edad 
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


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
          this.manejarError(err); //console.log(err);
        });

    }
  }

  
  pushDiagnostico(data: any) 
  {
    this.diagnosticosAgregados.push(data);
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
                      this.manejarError(err);//console.log(err); 
                  });

      this.configurarDeshabilitaciones();
     }
  }

  clone(c: Ente): Ente {
    let registro = {};
    for (let prop in c) {
      registro[prop] = c[prop];
    }
    return registro;
  }
 

  edit(registroActual: any) 
  {
    this.nuevoRegistro = false;
    this.displayDialog = true;
    this.tituloDialogo = 'Editar: ' ;
    this.submitted = false;
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

 
      calcular_preciobs(): void {
        // Validar si la tasa está definida
        if (!this.servicioPresupuesto.precio_tasa) {
            this.manejarError("Debe ingresar la tasa");
            return; // Salir de la función si no hay tasa
        }
    
        // Validar si el precio está definido
        if (!this.servicioPresupuesto.precio) {
            this.manejarError("Debe ingresar el precio del servicio");
            return; // Salir de la función si no hay precio
        }
    
        // Calcular el precio en bolívares
        this.servicioPresupuesto.precio_bs = this.servicioPresupuesto.precio_tasa * this.servicioPresupuesto.precio;
    }

  calcular_preciobs2()
  {

     // Validar si la tasa está definida
     if (!this.servicioPresupuesto.precio_tasa1) 
      {
          this.manejarError("Debe ingresar la tasa");
          return; // Salir de la función si no hay tasa
      }

      // Validar si el precio está definido
      if (!this.servicioPresupuesto.precio1) 
        {
          this.manejarError("Debe ingresar el precio del servicio");
          return; // Salir de la función si no hay precio
        }

        this.servicioPresupuesto.precio_bs1 = this.servicioPresupuesto.precio_tasa1 * this.servicioPresupuesto.precio1;

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



  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Funcion para agregar los diagnosticos que no existan  
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  addDiagnosticos() 
  {
    if (this.diagnosticosSel.length > 0) {
      this.diagnosticosSel.forEach(diagnostico => {
        const existe = this.diagnosticosAgregados.some(agregado => agregado.diagnostico_id === diagnostico.diagnostico_id);
        
        if (!existe) {
          const data = {
            diagnostico_id: diagnostico.diagnostico_id,
            nombre_grupo: diagnostico.grupo,
            nombre: diagnostico.name,
          };
          
          this.pushDiagnostico(data);
        }
      });
  
      this.showSuccess("Diagnosticos añadidos. Presione el botón 'Guardar' para guardar la solicitud.");
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //addDiagnosticosPrevio Funcion para agregar los diagnosticos registrados
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  addDiagnosticosPrevio() {
    if (this.reporteDiagnosticos.length > 0) {
      this.diagnosticosAgregados = this.reporteDiagnosticos.map(diagnostico => ({
        diagnostico_id: diagnostico.diagnostico_id,
        nombre_grupo: diagnostico.grupo,
        nombre: diagnostico.name,
      }));
    } else {
      this.diagnosticosAgregados = []; // Reiniciar el arreglo si no hay datos
    }
  }



  regresar(){
    this.router.navigate(['solicitud-beneficiario/' + '1' + '/' + this.beneficiario.cedula_titular]);
  }
  listado(){
    this.router.navigate(['solicitud-modificar']);
  }

}
