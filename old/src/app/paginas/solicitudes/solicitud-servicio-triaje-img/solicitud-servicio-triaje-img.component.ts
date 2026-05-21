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
          TipoAtencion          ,
          GrupoDiagnostico
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
          SolicitudExamenService,
          DiagnosticoService,
          MenuService,
          MedicoEspecialidadService,
          GrupoService,
          GrupoServicioService,
          RecaudoService,
          SolicitudRecaudoService,
          GrupoExamenService,
          AtencionExamenService,
          DomicilioService,
          TipoDiagnosticoService,
          SolicitudDiagnosticoService,

       }
from 'src/app/services';


import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-solicitud-servicio-triaje-img',
  templateUrl: './solicitud-servicio-triaje-img.component.html',
  styleUrls: ['./solicitud-servicio-triaje-img.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class SolicitudServicioTriajeImgComponent implements OnInit {

  nuevoRegistro: boolean;
  submitted: boolean;
  form: FormGroup;
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

  currentUser: any;
  formattedFechaSolicitud: any;

  usuario: any;
  datos_orden: any;
  causa_id: any;

  user: Trabajador;
  asset: any;

  roles: RolModelo[] = [];

  diagnosticos:any[];

  domicilios:any[];

  /* Codigo de los roles  IMAGENES*/
  codRolImagenCrearOrden: string;
  codRolImagenCrearSolicitud: string;
  codRolImagenModificarSolicitud: string;
  codRolImagenCancelarOrden: string;
  codRolImagenConfirmarOrden: string;
  /* Habilitar los items del menu según rol */
  rolImagenCrearOrden: boolean = false;
  rolImagenCrearSolicitud: boolean = false;
  rolImagenModificarSolicitud: boolean = false;
  rolImagenCancelarOrden: boolean = false;
  rolImagenConfirmarOrden: boolean = false;

  
  /* Codigo de los roles LABORATORIO*/
  codRolLaboratorioCrearOrden: string;
  codRolLaboratorioCrearSolicitud: string;
  codRolLaboratorioModificarSolicitud: string;
  codRolLaboratorioCancelarOrden: string;
  codRolLaboratorioConfirmarOrden: string;
  /* Habilitar los items del menu según rol */
  rolLaboratorioCrearOrden: boolean = false;
  rolLaboratorioCrearSolicitud   : boolean = false;
  rolLaboratorioModificarSolicitud   : boolean = false;
  rolLaboratorioCancelarOrden   : boolean = false;
  rolLaboratorioConfirmarOrden   : boolean = false;


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

  gruposdiagnostico: GrupoDiagnostico[];
  grupodiagnostico: GrupoDiagnostico;
  grupoId:any;

  //Servicios asociados a estudios especiales
  servicioSolicitado: ServicioEspecialidadService;
  serviciosSolicitados: ServicioEspecialidadService[];
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

  reporteServicios: any[];
  reporteExamenes: any[];
  medicos:any[];

  reporteDiagnosticos :any[];

  tipoGrupo: any;

  serviciosSeleccionadosSel: any[];
  serviciosAgregados: any[];

  recaudos: any[];
  recaudo: any;
  recaudosEntregados: any[];

  displayDialogExamen: boolean;

  diagnosticosSolicitados: any[];
  diagnosticosSel: any[];
  diagnosticosAgregados: any[];


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
    private solicitudServiciosService: SolicitudServicioService,

    private menuService: MenuService,
    private medicoEspecialidadService: MedicoEspecialidadService,
    private diagnosticoService : DiagnosticoService,
    private grupoService: GrupoService,
    private grupoServicioService: GrupoServicioService,
    private recaudoService: RecaudoService,
    private solicitudRecaudoService: SolicitudRecaudoService,
    private solicitudExamenService: SolicitudExamenService,
    private grupoExamenService: GrupoExamenService,
    private atencionExamenService: AtencionExamenService,
    private domicilioService : DomicilioService,
    private grupoDiagnosticoService : TipoDiagnosticoService,
    private solicitudDiagnosticoService : SolicitudDiagnosticoService,
  ) { 

    this.createForm();

    this.cols = [
      { field: 'atencion_id', header: 'Nro. Orden', width: '20%'},
      { field: 'nombre_tipo_atencion', header: 'Tipo Atencion', width: '30%' },
      { field: 'nombre_servicio', header: 'Servicio', width: '30%' },
      { field: 'nombre_estado_atencion', header: 'Estado', width: '20%' }
    ];

    //Cargar Roles IMAGEN
    this.codRolImagenCrearOrden    = this.rolesService.getCodRolImagenCrearOrden();
    this.codRolImagenCrearSolicitud =  this.rolesService.getCodRolImagenCrearSolicitud();
    this.codRolImagenModificarSolicitud =  this.rolesService.getCodRolImagenModificarSolicitud();
    this.codRolImagenCancelarOrden =  this.rolesService.getCodRolImagenCancelarOrden();
    this.codRolImagenConfirmarOrden =  this.rolesService.getCodRolImagenConfirmarOrden();
    
    this.rolImagenCrearOrden          = this.srvRolesByUser.buscarRolPorCodigo(this.codRolImagenCrearOrden).length > 0 ? true : false;
    this.rolImagenCrearSolicitud      = this.srvRolesByUser.buscarRolPorCodigo(this.codRolImagenCrearSolicitud).length > 0 ? true : false;
    this.rolImagenModificarSolicitud  = this.srvRolesByUser.buscarRolPorCodigo(this.codRolImagenModificarSolicitud).length > 0 ? true : false;
    this.rolImagenCancelarOrden       = this.srvRolesByUser.buscarRolPorCodigo(this.codRolImagenCancelarOrden).length > 0 ? true : false;
    this.rolImagenConfirmarOrden      = this.srvRolesByUser.buscarRolPorCodigo(this.codRolImagenConfirmarOrden).length > 0 ? true : false;
    
    //Cargar Roles LABORATOTIO
    this.codRolLaboratorioCrearOrden          = this.rolesService.getCodRolLaboratorioCrearOrden();
    this.codRolLaboratorioCrearSolicitud      =  this.rolesService.getCodRolLaboratorioCrearSolicitud();
    this.codRolLaboratorioModificarSolicitud  =  this.rolesService.getCodRolLaboratorioModificarSolicitud();
    this.codRolLaboratorioCancelarOrden       =  this.rolesService.getCodRolLaboratorioCancelarOrden();
    this.codRolLaboratorioConfirmarOrden      =  this.rolesService.getCodRolLaboratorioConfirmarOrden();
  
    this.rolLaboratorioCrearOrden           = this.srvRolesByUser.buscarRolPorCodigo(this.codRolLaboratorioCrearOrden).length > 0 ? true : false;
    this.rolLaboratorioCrearSolicitud       = this.srvRolesByUser.buscarRolPorCodigo(this.codRolLaboratorioCrearSolicitud).length > 0 ? true : false;
    this.rolLaboratorioModificarSolicitud   = this.srvRolesByUser.buscarRolPorCodigo(this.codRolLaboratorioModificarSolicitud).length > 0 ? true : false;
    this.rolLaboratorioCancelarOrden        = this.srvRolesByUser.buscarRolPorCodigo(this.codRolLaboratorioCancelarOrden).length > 0 ? true : false;
    this.rolLaboratorioConfirmarOrden       = this.srvRolesByUser.buscarRolPorCodigo(this.codRolLaboratorioConfirmarOrden).length > 0 ? true : false;
    
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
      this.showError(err); //console.log(err);
    });


    if (this.tipoAtencionId == 3){
         this.tipoGrupo =1;   //Grupos de IMAGEN
    };

    if (this.tipoAtencionId == 4){
      this.tipoGrupo =2;   //Servicio de LABORATORIO
    };

    this.displayDialogExamen=false;
  }

  ngOnInit(): void {

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

    //this.beneficiarioId = this._route.snapshot.paramMap.get('beneficiario_id');
    //this.solicitudId = this.solicitudService.getParams().solicitudId;

    this.beneficiarioId = this.activatedRoute.snapshot.params.beneficiario_id;
    this.solicitudId = this.activatedRoute.snapshot.params.solicitud_id;
    this.serviciosAgregados=[];
    this.examenesAgregados=[];

    let format = 'yyyy-MM-dd';
    const locale = 'en-ES';
    let date: Date = new Date();
    this.fecha_recepcion= date;
 

    this.consultar();

    this.dropdownGrupo();
    this.dropdownRecaudo();
    this.dropdownServiciosPorGrupo();
    this.dropdownExamenesPorGrupo();

    this.fullDropdownEstado();
    this.fullDropdownTipoCobertura();
    this.fullDropdownTipoSolicitud();
    this.fullDropdownEspecialidades();
    this.fullDropdownCausas();
    this.fullDropdownTipoOrden();
    this.dropdownDiagnosticos();
    this.dropdownDomicilios();
    this.dropdownDiagnosticoPorGrupo();


    this.openNew();

    this.currentUser = JSON.parse(this.authService.getCurrentUser());
    //this.parametros = {nombre:"prueba"};
    let currentUser = this.authService.getCurrentUser();
    this.usuario  = JSON.parse(currentUser);


    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
    
    //Colsultar si el beneficiario tiene solicitudes abiertas o asignadas
    //Para dar mensaje de advertencia al analista

    this.consultarSolicitudesActivas();

    this.deshabilitarBotonGuardar();
    this.deshabilitarAgregar();
    this.deshabilitarBotonCrearOrden();
    this.deshabilitarAccionCancelar();
    this.deshabilitarAccionConfirmar();

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
      diagnosticosSel:  [''],
      diagnosticosAgregados:  [''],
      estadoSolicitud:      [''],
      fecha_recepcion:      [''],
      observacion:          [''],
      tipoOrden:            [''],
      serviciosSolicitadosSel:  [''],
      grupo:  [''],
      grupodiagnostico:  [''],
      serviciosAgregados: [''],
      examenesSolicitadosSel: [''],
      examenesAgregados: ['']

    });

    this.myForm = this.fb.group({
      recaudo: ['']

    });
  }

  consultarDiagnosticosSolicitud(){
    this.reporteDiagnosticos = [];
    if (this.solicitud.solicitud_id){
        this.solicitudDiagnosticoService
        .getDiagnosticosAsignadosBySolicitud(this.solicitud.solicitud_id)
        .toPromise()
        .then((results) => {
          console.log("diagnosticos",results);
          this.reporteDiagnosticos = results;
          this.addDiagnosticosPrevio();
        })
        .catch((err) => {
          this.showError(err); //console.log(err);
        });

    }
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

  addDiagnosticos() {
    if (this.diagnosticosSel.length > 0) {
        
      for (let i = 0; i < this.diagnosticosSel.length; i++)
      {
        console.log("diagnosticos",i,this.diagnosticosSel[i]);
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


  pushDiagnostico(data: any) {
    this.diagnosticosAgregados.push(data);
    
  }

  removeDiagnostico(actual: any) {
    for (var i = 0; i < this.diagnosticosAgregados.length; i++) {
       if (this.diagnosticosAgregados[i].diagnostico_id === actual.diagnostico_id) 
       {
              this.diagnosticosAgregados.splice(i, 1);
       }
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

  deshabilitarBotonGuardar(){
     //Solicitudes CERRADAS o CANCELADAS
    if (this.solicitud.estado_solicitud_id == 2 || this.solicitud.estado_solicitud_id == 3  ){
      this.deshabilitarGuardar = true;
      this.deshabilitarAgregarItem=true;
      


    };

    //Si no tiene el rol no puede guardar
    if (!this.rolImagenCrearSolicitud  && !this.rolLaboratorioCrearSolicitud ){    
      this.deshabilitarGuardar = true;
      this.deshabilitarAgregarItem=true;
    }

   
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



  deshabilitarAgregar(){
    //Solicitudes CERRADAS o CANCELADAS
   if (this.tipoAtencionId == 3)
   {
            this.deshabilitarGuardar = false;
          if (this.solicitud.estado_solicitud_id == 2 || this.solicitud.estado_solicitud_id == 3 ){
            this.deshabilitarGuardar = true;
          };

          //Si no tiene el rol no puede guardar
          if (!this.rolImagenCrearSolicitud  && !this.rolLaboratorioCrearSolicitud ){    
            this.deshabilitarGuardar = true;
          }
    }
  
 }

  deshabilitarBotonCrearOrden(){

    //Si no tiene el rol no puede crear ordenes
    if (!this.rolImagenCrearOrden && !this.rolLaboratorioCrearOrden){      
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

  deshabilitarAccionCancelar(){
    if (this.rolImagenCancelarOrden==false && this.rolLaboratorioCancelarOrden==false){  
          this.deshabilitarBotonCancelar= true;
    }

  };  

  deshabilitarAccionConfirmar(){
    if (!this.rolImagenConfirmarOrden && !this.rolLaboratorioConfirmarOrden){  
        this.deshabilitarBotonConfirmar= true;
    }
  };


  dropdownRecaudo(){
    this.recaudoService.getAllCombo()
      .toPromise()
      .then((results) => {
        this.recaudos = results;
      })
      .catch((err) => {
        this.showError(err);//console.log(err);
      });
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

  dropdownServiciosPorGrupo(){
    if (this.grupo){
      this.grupoServicioService
        .getAllByGrupo(this.grupo)
        .toPromise()
        .then((results) => {
          this.serviciosSolicitados = results;
        })
        .catch((err) => {
          this.showError(err); //console.log(err);
        });

      }
  }

  dropdownExamenesPorGrupo(){
    if (this.grupo){
      this.grupoExamenService
        .getAllByGrupo(this.grupo)
        .toPromise()
        .then((results) => {
          this.examenesSolicitados = results;
        })
        .catch((err) => {
          this.showError(err); //console.log(err);
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


  fullDropdownCausas() {
    this.causaService
      .getAllCombo()
      .toPromise()
      .then((results) => {
        this.causas = results;
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
         this.consultarDiagnosticosSolicitud();
         //this.addExamenesPrevio();

       }
     })
     .catch(err => { 
                        this.showError(err); //console.log(err);
                    
                    });

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
      .catch(err => { 
                      this.showError(err);//console.log(err); 
                  });

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
        .getGrupoServicioBySolicitud(this.solicitud.solicitud_id)
        .toPromise()
        .then((results) => {
          this.reporteServicios = results;
          this.addServiciosPrevio();
        })
        .catch((err) => {
          this.showError(err); //console.log(err);
        });

    }
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
            this.showError(err); //console.log(err);
        });

    }
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

                    this.solicitud.fecha_solicitud = fecha_solicitud;
                    this.solicitud.usuario_creador= this.usuario.siglado; // login usuario conectado
                    this.solicitud.nombre_creador= this.usuario.nombre;   // nombre usuario conecta
                    this.solicitud.servicios = this.serviciosAgregados;
                    this.solicitud.examenes = this.examenesAgregados;
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
                    this.solicitud.servicios = this.serviciosAgregados;
                    this.solicitud.examenes = this.examenesAgregados;
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
                            this.consultarServiciosRequeridos();
              
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

  //Crear orden
  crearOrden() {
    //El selected en este caso corresponde al elemento seleccionado en la tabla de la vista
      this.navigate('orden-servicio-triaje-img', this.solicitud.solicitud_id, this.tipoSolicitud.tipo_solicitud_id, this.solicitud.especialidad_id);
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

  addServicio() {
    if (this.serviciosSolicitadosSel.length > 0) {
      //this.serviciosAgregados = [];
      for (let i = 0; i < this.serviciosSolicitadosSel.length; i++)
      {

        let aux=[];
        aux = this.serviciosAgregados.filter(x => x.servicio_id == this.serviciosSolicitadosSel[i].servicio_id);
        if(aux.length <= 0){
          let data = {
            servicio_id: this.serviciosSolicitadosSel[i].servicio_id,
            nombre_grupo: this.serviciosSolicitadosSel[i].nombre_grupo,
            nombre: this.serviciosSolicitadosSel[i].name,
            asignado: 0,
          };
          this.push(data);
        }

      }
      this.showSuccess("Servicios añadidos. Presione el botón 'Guardar' para guardar la solicitud.");
    }
    this.deshabilitarAgregar()
  }

  addServiciosPrevio() {
    if (this.reporteServicios.length > 0) {
      this.serviciosAgregados = [];
      for (let i = 0; i < this.reporteServicios.length; i++)
      {
         // let aux=[];
         // aux = this.examenesAgregados.filter(x => x.examen_id == this.examenesSolicitadosSel[i].examen_id);
         // if(aux.length <= 0){
            let data = {
              servicio_id: this.reporteServicios[i].servicio_id,
              nombre_grupo: this.reporteServicios[i].nombre_grupo,
              nombre: this.reporteServicios[i].name,
              asignado: this.reporteServicios[i].asignado
            };
            
            this.push(data);
          //}
      }

    ///  this.showSuccess("Examenes añadidos. Presione el botón 'Guardar' para guardar la solicitud.");
    }
  }

  

  agregarRecaudo(){

    if (this.recaudo) {
      let data={
          solicitud_id: this.solicitud.solicitud_id,
          recaudo_id:   this.recaudo
      };

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
        this.showError(err); //console.log(err) ;
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
      this.showError(err); //console.log(err) ;
    });
  }

  push(data: any) {
    this.serviciosAgregados.push(data);
  }

  pushExamen(data: any) {
    this.examenesAgregados.push(data);
  }

  remove(actual: any) {
    for (var i = 0; i < this.serviciosAgregados.length; i++) {
      if (this.serviciosAgregados[i].servicio_id === actual.servicio_id) {
        this.serviciosAgregados.splice(i, 1);
      }
    }
  }

  removeExamen(actual: any) {
    for (var i = 0; i < this.examenesAgregados.length; i++) {
      if (this.examenesAgregados[i].examen_id === actual.examen_id) {
        this.examenesAgregados.splice(i, 1);
      }
    }
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
      this.showError(err); //console.log(err) ;
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
          this.showError(err); //console.log(err);
          this.blocked = false;
        });

      }
    });
  }

  dialogoExamen(data: any){
    this.examenesProgramados=[];
    this.atencionExamenService.getExamenesByAtencion(data.atencion_id)
    .toPromise()
    .then(results => {
      if (results){
        this.examenesProgramados = results;
        this.displayDialogExamen= true;

        this.examenesProgramadosSel = this.examenesProgramados.filter(x => x.is_confirmado == 1);
      }
    })
    .catch(err => {
      this.showError(err); //console.log(err);
    });
  }

  close() {
    this.displayDialog   = false;
    this.submitted = false;
   }

   closeDialog() {
    this.displayDialogExamen   = false;
   }

   confirmar(data: any){
    console.log(data);
   }

   chequear(){
      this.displayDialogExamen   = false;

      let data = { 
        atencion_id: this.examenesProgramados[0].atencion_id,
        examenes_confirmados: this.examenesProgramadosSel 
      };
 
      this.atencionExamenService
      .updateLote(data)
      .toPromise()
      .then(results => { 
        if (results){
          this.showInfo('Se actualizaron los registros.');
        }
      })
      .catch(err => { 
        this.showError(err);

      });

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
