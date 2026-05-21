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
  ServicioService,
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
  selector: 'app-solicitud-servicio-electiva-quir',
  templateUrl: './solicitud-servicio-electiva-quir.component.html',
  styleUrls: ['./solicitud-servicio-electiva-quir.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class SolicitudServicioElectivaQuirComponent implements OnInit {

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
  codRolElectQuirCrearOrden: string;
  codRolElectQuirCrearSolicitud: string;
  codRolElectQuirModificarSolicitud: string;
  codRolElectQuirCancelarOrden: string;
  codRolElectQuirConfirmarOrden: string;
  /* Habilitar los items del menu según rol */
  rolElectQuirCrearOrden: boolean = false;
  rolElectQuirCrearSolicitud: boolean = false;
  rolElectQuirModificarSolicitud: boolean = false;
  rolElectQuirCancelarOrden: boolean = false;
  rolElectQuirConfirmarOrden: boolean = false;
  
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
  servicioSolicitado: ServicioEspecialidadService;
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
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
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

  )
   { 
        this.createForm();
        this.createFormPresupuesto();
        this.setearRolesyPermisos();
        this.fullDropdownTipoOrden();
   }

   public buscarNombreTipoAtencion()
   {

    this.tipoSolicitudId  = this.menuService.getTipoSolicitud();
    this.title = ""; 
    //console.log(this.title );

    //si this.solicitud.tipo_atencion_id es indefinido colocar 11

    let variable: string | undefined;
    let valorPorDefecto =this.tipoOrden;

    this.solicitud.tipo_atencion_id = this.solicitud.tipo_atencion_id ?? valorPorDefecto;

    this.tipoOrdenService
    .getById(this.solicitud.tipo_atencion_id)
    .toPromise()
    .then((results) => {
      this.tipoAtencion = results;
      this.title = "";
      this.title = this.title + ' ' + this.tipoAtencion.nombre;

    })
    .catch((err) => {
      this.manejarError(err); //console.log(err);
    });
    
    



        if (this.tipoAtencionId == 11){
          this.tipoGrupo =11;   //Electiva Quirurgico
        };
    }

   ngOnInit(): void 
   {
      
        this.inicializarVariables();
        this.inicializarArreglos();
        this.inicializarDropdowns();
        // Consultas adicionales
        this.consultar();
        this.consultarSolicitudesActivas();
        this.configurarDeshabilitaciones();
    
        // Configuración de columnas
        this.cols = [
          { field: 'solicitud_presupuesto_id', header: 'Id', width: '10%' },
          { field: 'proveedor_nombre', header: 'Proveedor', width: '25%' },
          { field: 'nombre', header: 'Procedimiento', width: '30%' },
          { field: 'precio', header: 'Precio Dolar', width: '10%' },
          { field: 'precio_bs', header: 'Precio Bs', width: '10%' },
          { field: 'precio_tasa', header: 'tasa', width: '10%' }
        ];
  }

  private setearRolesyPermisos()
{
    //Cargar Roles 
       //Cargar Roles 
       this.codRolElectQuirCrearOrden          = this.rolesService.getCodRolElectivaQUICrearOrden();
       this.codRolElectQuirCrearSolicitud      =  this.rolesService.getCodRolElectivaQUICrearSolicitud();
       this.codRolElectQuirModificarSolicitud  =  this.rolesService.getCodRolElectivaQUIModificarSolicitud();
       this.codRolElectQuirCancelarOrden       =  this.rolesService.getCodRolElectivaQUICancelarOrden();
       this.codRolElectQuirConfirmarOrden      =  this.rolesService.getCodRolElectivaQUIConfirmarOrden();
     
       this.rolElectQuirCrearOrden           = this.srvRolesByUser.buscarRolPorCodigo(this.codRolElectQuirCrearOrden).length > 0 ? true : true;
       this.rolElectQuirCrearSolicitud       = this.srvRolesByUser.buscarRolPorCodigo(this.codRolElectQuirCrearSolicitud).length > 0 ? true : true;
       this.rolElectQuirModificarSolicitud   = this.srvRolesByUser.buscarRolPorCodigo(this.codRolElectQuirModificarSolicitud).length > 0 ? true : true;
       this.rolElectQuirCancelarOrden        = this.srvRolesByUser.buscarRolPorCodigo(this.codRolElectQuirCancelarOrden).length > 0 ? true : true;
       this.rolElectQuirConfirmarOrden       = this.srvRolesByUser.buscarRolPorCodigo(this.codRolElectQuirConfirmarOrden).length > 0 ? true : true;
  
}
  
 //Inciailizar variables y arreglos
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

  private inicializarDropdowns(): void {
  //  this.fullDropdownGrupo();

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
  }
  
  private configurarDeshabilitaciones(): void 
  {
    this.deshabilitarBotonGuardar();
    this.deshabilitarAgregar();
    this.deshabilitarBotonCrearOrden();
    this.deshabilitarAccionCancelar();
    this.deshabilitarAccionConfirmar();
  }

  

  fullDropdownServiciosPorGrupo()
  {
    
      this.ServicioTipoAtencionService
        .getAllByAtencion(this.solicitud.tipo_atencion_id)
        .toPromise()
        .then((results) => {
          this.serviciosSolicitados = results;
        })
        .catch((err) => {
          this.showError(err); //console.log(err);
        });
      
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


  consultarSolicitudesActivas()
  {
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

  fullDropdownProveedor()
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
  

  fullDropdownMedicos() {
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
        this.tipoOrdenes = aux.filter(x => (x.nombre.indexOf("MEDICAMENTOS") === -1) ); 

        //si this.solicitud.tipo_atencion_id
        console.log("solicitud",this.solicitud.solicitud_id);
        console.log("tipo",this.solicitud.tipo_atencion_id);

        if (!this.solicitud.solicitud_id ) 
          {
             this.tipoOrden = this.tipoOrdenes[0].tipo_atencion_id;
             this.solicitud.tipo_atencion_id= this.tipoOrdenes[0].tipo_atencion_id;
             this.tipoAtencion= this.solicitud.tipo_atencion_id;
             this.tipoOrdenes = aux.filter(x => (x.nombre.indexOf("MEDICAMENTOS") === -1) ); 
          }
          else
          {
            this.tipoOrden = this.solicitud.tipo_atencion_id;
            this.tipoAtencion=this.solicitud.tipo_atencion_id;
            this.tipoOrdenes = aux.filter(x => x.tipo_atencion_id == this.solicitud.tipo_atencion_id);

          }
        this.buscarNombreTipoAtencion();
        this.configurarDeshabilitaciones();

      })
      .catch((err) => {
        this.showError(err); //console.log(err);
      });

      
  }


  deshabilitarAgregar()
  {
    //Solicitudes CERRADAS o CANCELADAS

            this.deshabilitarGuardar = false;
          if (this.solicitud.estado_solicitud_id == 2 || this.solicitud.estado_solicitud_id == 3 || (!this.rolElectQuirCrearSolicitud ) ){
            this.deshabilitarGuardar = true;
          };
   }


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
}


  guardar()
  {
    this.deshabilitarAgregar();
    this.submitted = true;
    this.set();

    // Validaciones tempranas
    if (!this.form.valid)
    {
        this.showError('Ingrese la información de todos los campos obligatorios.');
        this.blocked = false;
        return;
    }

    if (this.diagnosticosAgregados.length === 0) {
        this.showError('Ingrese la información de los diagnósticos.');
        this.blocked = false;
        return;
    }

    this.blocked = true;

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

    if (!this.solicitud.solicitud_id) {
        // Crear nueva solicitud
        this.solicitud.usuario_creador = this.usuario.siglado;
        this.solicitud.nombre_creador = this.usuario.nombre;

        this.crearSolicitud();
    } else {
        // Actualizar solicitud existente
        this.solicitud.usuario_modificador = this.usuario.siglado;
        this.solicitud.nombre_modificador = this.usuario.nombre;
        this.solicitud.modified = fechaActual;

        this.actualizarSolicitud();

      }

}

private crearSolicitud(): void {
    this.solicitudService.create(this.solicitud)
        .toPromise()
        .then((results: Respuesta) => this.procesarRespuesta(results))
        .catch((err) => this.manejarError(err));
}

private actualizarSolicitud(): void {
    this.solicitudService.update(this.solicitud)
        .toPromise()
        .then((results: Respuesta) => this.procesarRespuesta(results))
        .catch((err) => this.manejarError(err));
}

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

private actualizarBeneficiario(): void {
    this.beneficiarioService.update(this.beneficiario)
        .toPromise()
        .then(() => {
            this.blocked = false;
        })
        .catch((err) => {
            this.manejarError(err);
        });
}

private manejarError(err: any): void {
    this.blocked = false;
    this.showError(err);
}

private formatDate(date: Date, format: string, locale: string): string {
    return formatDate(date, format, locale);
}

  pushpresupuesto(data: any) 
  {
  
    this.serviciosPresupuesto.push(data);
    this.serviciosAgregados.push(data);
  }


  

  addProcedimientosPrevio()
   {
      if (this.reporteServicios.length > 0) 
      {
        for (let i = 0; i < this.reporteServicios.length; i++)
        {
          this.agregarPresupuestoSiNoExiste(this.reporteServicios[i].solicitud_presupuesto_id,this.reporteServicios[i],  this.reporteServicios[i].proveedor_id, this.reporteServicios[i].nombre_proveedor, this.reporteServicios[i].nombre_servicio, this.reporteServicios[i].precio_dolar, this.reporteServicios[i].precio_bs, this.reporteServicios[i].precio_tasa);
        }
      }
  }

    
  deshabilitarBotonCrearOrden(){

    //Si no tiene el rol no puede crear ordenes
    if (!this.rolElectQuirCrearSolicitud ){      
      this.deshabilitarCrearOrden = true;
    }

    //Solicitudes CERRADAS 
    if (this.solicitud.estado_solicitud_id == 2 || this.solicitud.estado_solicitud_id == 3 ){
          this.deshabilitarCrearOrden = true;
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
    this.fullDropdownServiciosPorGrupo();
  }

  close() 
  {
    this.servicioPresupuesto = null;
    this.displayDialog = false;
    this.submitted = false;
    this.nuevoRegistro = false;
  }

  

  fullDropdownDiagnosticoPorGrupo(){
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

  fullDropdownDiagnosticos() {
    this.grupoDiagnosticoService.getAllCombo()
      .toPromise()
      .then((results) => {
        this.gruposdiagnostico = results;
      })
      .catch((err) => {
        this.showError(err); //console.log(err);
      });
  }


  deshabilitarAccionCancelar()
  {
    if (this.rolElectQuirCancelarOrden==false ){  
          this.deshabilitarBotonCancelar= true;
    }

  };  

  deshabilitarAccionConfirmar()
  {
    if (!this.rolElectQuirConfirmarOrden )
      {  
        this.deshabilitarBotonConfirmar= true;
      }
  };



  deshabilitarBotonGuardar()
  {
     //Solicitudes CERRADAS o CANCELADAS
    if (this.solicitud.estado_solicitud_id == 2 || this.solicitud.estado_solicitud_id == 3 ||  !this.rolElectQuirCrearSolicitud )
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
             // this.tipoOrden= this.solicitud.atencion_id;
              this.tipoAtencion= this.solicitud.atencion_id;
              this.fullDropdownTipoOrden();
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

  save() 
  {
    this.submitted = true;

    if (!this.form1.valid) 
      {
          this.showError('Ingrese la información de todos los campos obligatorios.');
          return;
      }
    //Asignación de Variables 
    let Servicio = { ...this.servicioPresupuesto };
    let ServicioSolicitado = this.serviciosSolicitados.find(x => x.servicio_id ==  Servicio.servicio_id);
    let Proveedor_01 = this.proveedores.find(x => x.proveedor_id ==  Servicio.proveedor_id);
    let Proveedor_02 = this.proveedores.find(x => x.proveedor_id ==  Servicio.proveedor_id1);
  
        if (this.nuevoRegistro) 
          {
            //this.solicitudpresupuesto_id += 1;
            this.agregarPresupuestoSiNoExiste(this.solicitudpresupuesto_id += 1,Servicio, Servicio.proveedor_id, Proveedor_01.label, ServicioSolicitado.label, Servicio.precio, Servicio.precio_bs, Servicio.precio_tasa);
            this.agregarPresupuestoSiNoExiste(this.solicitudpresupuesto_id += 1,Servicio, Servicio.proveedor_id1, Proveedor_02.label, ServicioSolicitado.label, Servicio.precio1, Servicio.precio_bs1, Servicio.precio_tasa1);
            this.showSuccess("Presupuesto(s) añadido(s) correctamente");
            this.close();
          }
          else
          {
             this.update(this.servicioPresupuesto);  
             this.close();
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

  private agregarPresupuestoSiNoExiste(solicitudpresupuesto_id: number ,servicio: any, proveedorId: number, proveedor: any,  servicioSolicitado: any,
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

  fullDropdownDomicilios() {
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

  fullDropdownEntes() {
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

  createFormPresupuesto() 
  {
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
        this.showError("Debe ingresar la tasa");
        return; // Salir de la función si no hay tasa
    }

    // Validar si el precio está definido
    if (!this.servicioPresupuesto.precio) {
        this.showError("Debe ingresar el precio del servicio");
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
      this.showError("Debe ingresar la tasa");
      return; // Salir de la función si no hay tasa
  }

  // Validar si el precio está definido
  if (!this.servicioPresupuesto.precio1) 
    {
      this.showError("Debe ingresar el precio del servicio");
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


  consult_servicios() 
  {
      this.ServicioProveedorService
      .getAllByProveedor(this.servicioPresupuesto.proveedor_id)
        .toPromise()
        .then((results) => {
          let aux_serv=[];
          aux_serv=  results;
          this.servicioPresupuesto.nameproveedor=aux_serv[0].proveedor_nombre;
          this.serviciosSolicitados = aux_serv;
        // console.log("servicio_pro", this.serviciosPresupuesto);
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


  addDiagnosticosPrevio() 
  {
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


  regresar()
  {
      this.router.navigate(['solicitud-beneficiario/' + '1' + '/' + this.beneficiario.cedula_titular]);
  }
  listado()
  {
       this.router.navigate(['solicitud-modificar']);
  }

}
