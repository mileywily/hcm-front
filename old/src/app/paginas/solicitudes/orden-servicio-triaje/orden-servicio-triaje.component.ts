import { Component, OnInit,Output,EventEmitter, Input, OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { formatDate } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MessageService, ConfirmationService } from 'primeng/api';

import {
          Solicitud,
          TipoAtencion,
          EstadoAtencion,
          Especialidad,
          Medico,
          Sitio,
          Prioridad,
          Trabajador,
          RolModelo
          
        }
from 'src/app/models';
import {
          SolicitudService,
          AtencionService,
          BeneficiarioService,
          TipoAtencionService,
          EstadoAtencionService,
          EspecialidadService,
          MedicoService,
          SitioService,
          CalendarioService,
          OrdenServicioService,
          PrioridadService,
          MedicoEspecialidadService,
          ServicioEspecialidadService,
          TipoConsultaService,
          AuthService,
          UserRolesService,
          RolesService,
          MenuService, 
          SolicitudServicioService,
          GrupoService,
          GrupoServicioService,
          ProveedorService,
          SolicitudExamenService,

        }
from 'src/app/services';
import { exit } from 'process';

@Component({
  selector: 'app-orden-servicio-triaje',
  templateUrl: './orden-servicio-triaje.component.html',
  styleUrls: ['./orden-servicio-triaje.component.scss'],
  providers: [MessageService]
})
export class OrdenServicioTriajeComponent implements OnInit, OnDestroy {
/*
  @Input() displayHelp: boolean;
  @Output() displayEvent = new EventEmitter<boolean>();
  @Output() saveEvent = new EventEmitter<any>();*/

  /** Cuando reciba la entrada, llamar a consultar */
  /*@Input()
  set params(val) {
    this.results = val;
    this.consult();
  }
  */
  es: any;
  form: FormGroup;
  submitted: boolean;
  new: boolean;
  blocked: boolean = false;

  results: any = {};

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

  solicitudId: any;
  especialidadId: any;
  tipoSolicitudId: any;
  orden_id: any;

  solicitud: Solicitud = {};
  orden: any = {};

  datosCupos: any;
  beneficiario: any = {};
  titular: any = {};
  age: number;

  //combos
  tipoOrden: TipoAtencion;
  tipoOrdenes: TipoAtencion[];

  tipoConsulta: TipoAtencion;
  tipoConsultas: TipoAtencion[];

  servicio: ServicioEspecialidadService;
  servicios: ServicioEspecialidadService[];

  servicioAutomatico: ServicioEspecialidadService;
  servicioAutomaticos: ServicioEspecialidadService[];
  servicioAutomaticosSel: any[];

  estadoOrden: EstadoAtencion;
  estadoOrdenes: EstadoAtencion[];

  especialidad: Especialidad;
  especialidades: Especialidad[];

  medico: Medico;
  medicos: Medico[];

  sitio:  Sitio;
  sitios: Sitio[];

  prioridad:  Prioridad;
  prioridades: Prioridad[];

  usuario: any;

  user: Trabajador;
  asset: any;

  roles: RolModelo[] = [];
  /* Codigo de los roles */
  //codRolEstudiosEspeciales: string;

  /* Habilitar los items del menu según rol */
  //itemRolEstudiosEspeciales: boolean = false;
  sol: any;
  sols: any[];

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private calendarioService: CalendarioService,
    private especialidadService: EspecialidadService,
    private medicoService: MedicoService,
    private tipoOrdenService: TipoAtencionService,
    private estadoOrdenService: EstadoAtencionService,
    private ordenService: OrdenServicioService,
    private prioridadService: PrioridadService,
    private solicitudService: SolicitudService,
    private beneficiarioService: BeneficiarioService,
    private sitioService: SitioService,
    private medicoEspecialidadService: MedicoEspecialidadService,
    private servicioEspecialidadService: ServicioEspecialidadService,
    private atencionService: AtencionService,
    private tipoConsultaService: TipoConsultaService,
    private authService: AuthService,
    private rolesService: RolesService,
    private srvRolesByUser: UserRolesService,
    private solicitudServicioService: SolicitudServicioService,
    private menuService: MenuService,
    private messageService: MessageService
  )
  {
    this.createForm();
    //this.codRolEstudiosEspeciales   =  this.rolesService.getCodRolEstudiosEspeciales();

    this.solicitudId = this._route.snapshot.paramMap.get('solicitud_id');
    //this.especialidadId = this._route.snapshot.paramMap.get('especialidad_id');

  }

  ngOnInit() {
    //this.tipoSolicitudId = this._route.snapshot.paramMap.get('tipo');

    //preparar nuevo registro
    this.openNew();

    this.orden =  this.ordenService.getParams();

    let datosCupo = this.ordenService.getCupo();

    /*
    if (this.especialidadId){
       this.orden.especialidad_id = this.especialidadId;
    };
   
    if(datosCupo){
      this.orden.fecha_cita = new Date(datosCupo.fecha.split('/').reverse().join('/'));
      this.orden.sitio_id = datosCupo.sitio_id;
      this.orden.especialidad_id = datosCupo.especialidad_id;
      this.orden.servicio_id = datosCupo.servicio_id;
      this.orden.medico_id = datosCupo.medico_id;
      this.orden.turno_id = datosCupo.turno_id;
      this.datosCupos = datosCupo;
    };*/


    /* Inicialmente la especialidad y el medico se toman de la solicitud, pero si se modifica 
       antes de buscar el cupo, al viajar al calendario y volver, la especialidad y el medico de la orden deben
       cambiar segun los datos del cupo.
    */ 

    this.consultar(datosCupo);

    if (!this.orden.prioridad_id){
      this.orden.prioridad_id= 1;  //Por defecto es 1. NORMAL
    }

    if (!this.orden.tipo_consulta_id){
      this.orden.tipo_consulta_id= 1;  //Por defecto es 1. CONSULTORIO
    }

    this.fullDropdownEspecialidades();
    this.fullDropdownTipoOrden();
    this.fullDropdownPrioridades();
    this.fullDropdownSitios();
    this.fullDropdownTipoConsultas();

    //this.fullDropdownMedicos();
    //this.fullDropdownEstadoOrden();

    this.estadoOrdenes = [
      { label: 'POR ASIGNAR', value: 1 }
    ];

    this.orden.estado_atencion_id = this.estadoOrdenes[0];


    let currentUser = this.authService.getCurrentUser();
    this.usuario  = JSON.parse(currentUser);

    if(datosCupo){
      this.orden.servicio_id = datosCupo.servicio_id;
    };

    this.getRolIdUserBySir();
  }

  ngOnDestroy(){
    this.ordenService.setCupo(null);
  }

  createForm() {

    this.form = this.fb.group({
      tipoOrden:          [''],
      servicio:           [''],
      estadoOrden:        [''],
      especialidad:       ['', [Validators.required]],
      medico:             ['', [Validators.required]],
      sitio:              ['', [Validators.required]],
      motivo:             [''],
      observaciones:      [''],
      prioridad:          [''],
      tipoConsulta:       [''],
      //fecha_cita:         ['', [Validators.required]],
      fecha_cita:         [''],
      servicioAutomaticosSel: ['']
    })
  }

  openNew() {
    this.new = true;
    this.submitted = false;
  }


  cambioOrden(){
    this.tipoConsulta={};
    this.tipoConsultas=[];
    this.fullDropdownTipoConsultas();

    this.orden.servicio_id = null;

  }

  getRolIdUserBySir() {

    this.srvRolesByUser.getIdUserBySir(this.usuario.siglado)
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
      })
      .catch(err => { console.log(err); });
  }


  dropdownMedicos(){
    this.medicoEspecialidadService
      .getMedicoByEspecialidad(this.orden.especialidad_id)
      .toPromise()
      .then((results) => {
        this.medicos = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }


  imprimirValor(){
     //console.log(this.orden.tipo_consulta_id);
  }


  dropdownServicios(){
    if (this.orden.especialidad_id && this.orden.tipo_atencion_id){
      this.servicioEspecialidadService
        .getAllByEspecialidad(Number(this.orden.especialidad_id))
        .toPromise()
        .then((results) => {
          this.servicios = results;

          //Filtro por tipo atención
          if (results){
            let aux=[];
            aux=results;
            this.servicios = aux.filter(x => x.tipo_atencion_id == this.orden.tipo_atencion_id);

            if( this.orden.servicio_id == 'undefined' || !this.orden.servicio_id){
              if (this.servicios){
                  this.orden.servicio_id = this.servicios[0]['servicio_id'];
              }
            }



          }
        })
        .catch((err) => {
          console.log(err);
        });

      }
  }

  dropdownServicioAutomatico(){
    if (this.orden.especialidad_id){
      this.servicioEspecialidadService
        .getAutomaticosByEspecialidad(Number(this.orden.especialidad_id))
        .toPromise()
        .then((results) => {
          this.servicioAutomaticos = results;
          
          //Filtro por tipo atención
          if (results){
            let aux=[];
            aux=results;
            this.servicioAutomaticos = aux.filter(x => x.tipo_atencion_id != this.orden.tipo_atencion_id);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      }
  }

  fullDropdownTipoOrden() {
    this.tipoOrdenService.getAllByTipoSolicitud(this.menuService.getTipoSolicitud())
      .toPromise()
      .then((results) => {

        let aux=[];
        aux=results;
        this.tipoOrdenes = aux.filter(x => x.tipo_atencion_id == this.menuService.getTipoAtencion());
      })
      .catch((err) => {
        console.log(err);
      });
  }

  fullDropdownTipoConsultas() {
    this.tipoConsultaService.getAllCombo()
      .toPromise()
      .then((results) => {
        this.tipoConsultas = results;
        if (this.tipoConsultas){
          this.tipoConsulta = this.tipoConsultas[0];

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

  fullDropdownMedicos() {
    this.medicoService.getAllCombo()
      .toPromise()
      .then((results) => {
        this.medicos = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  fullDropdownSitios() {
    this.sitioService.getAllCombo()
      .toPromise()
      .then((results) => {
        this.sitios = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  fullDropdownEstadoOrden() {
    this.estadoOrdenService.getAllCombo()
      .toPromise()
      .then((results) => {
        this.estadoOrdenes = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  fullDropdownPrioridades() {
    this.prioridadService.getAllCombo()
      .toPromise()
      .then((results) => {
        this.prioridades = results;
        if (this.prioridades){
          this.prioridad = this.prioridades[0];
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }


  consultar(datosCupo: any){
    if (this.solicitudId){
      this.solicitudService.getById(this.solicitudId)
      .toPromise()
      .then(results => {
        this.solicitud = results;
        if (this.solicitud){
          this.orden.solicitud_id = this.solicitud.solicitud_id;
          this.orden.motivo = this.solicitud.motivo;
          this.orden.tipo_atencion_id =this.solicitud.tipo_atencion_id;

          if (!this.orden.medico_id){
              this.orden.medico_id =this.solicitud.medico_id;
          };

          if (!this.orden.especialidad_id){
            this.orden.especialidad_id =this.solicitud.especialidad_id;
          };
          
          
          if(datosCupo){
            this.orden.fecha_cita = new Date(datosCupo.fecha.split('/').reverse().join('/'));
            this.orden.sitio_id = datosCupo.sitio_id;
            this.orden.especialidad_id = datosCupo.especialidad_id;
            this.orden.servicio_id = datosCupo.servicio_id;
            this.orden.medico_id = datosCupo.medico_id;
            this.orden.turno_id = datosCupo.turno_id;
            this.datosCupos = datosCupo;
          };

          if (this.orden.servicios){
            this.servicioAutomaticosSel = this.orden.servicios;
          }else{
            this.solicitudServicioService.getAllAutomaticosBySolicitud(this.solicitud.solicitud_id)
            .toPromise()
            .then(results => {
              if (results){
                //this.servicioAutomaticosSel = results;  
              }
            })
            .catch(err => { console.log(err) });

          }

          this.dropdownMedicos();
          this.dropdownServicios();
          this.dropdownServicioAutomatico();

          this.beneficiarioService.getById(this.solicitud.beneficiario_id)
          .toPromise()
          .then(results => {

            this.beneficiario = results;

            this.calculateAge();

            if (this.beneficiario){

              this.orden.beneficiario_id = this.beneficiario.beneficiario_id;
              let data = {
                cedula_titular: this.beneficiario.cedula_titular
              }
              this.beneficiarioService.getTitularByBeneficiario(data)
              .toPromise()
              .then(results => {
                if (results){
                  this.titular = results[0];
                }
              })
              .catch(err => { console.log(err) });
            }
          })
          .catch(err => { console.log(err) });
        }
      })
      .catch(err => { console.log(err) });
    }

  }

  disponibilidad(){
    this.orden.servicios = this.servicioAutomaticosSel;

    this.ordenService.setParams(this.orden);

    this.calendarioService.setParams({
      especialidad_id: this.orden.especialidad_id,
      medico_id: this.orden.medico_id,
      servicio_id: this.orden.servicio_id
    });

    this.router.navigate(['calendario-triaje', 'A'] , { relativeTo: this.activatedRoute });
  }

  guardar(){

    this.submitted = true;
    this.set();

    if (this.form.valid) {
      this.blocked = true;

      if (this.orden.solicitud_id){

        if (!this.orden.atencion_id) {

          let format = 'yyyy-MM-dd HH:mm:ss';
          const locale = 'en-ES';
          let date: Date = new Date();

          let fecha_atencion;
          let fecha_cita;

          fecha_atencion = formatDate(date, format, locale);

          fecha_cita = formatDate(this.orden.fecha_cita,format, locale);

          this.orden.fecha_atencion = fecha_atencion;
          this.orden.fecha_cita = fecha_cita;
          this.orden.usuario_creador= this.usuario.siglado; // login usuario conectado
          this.orden.nombre_creador= this.usuario.nombre; // nombre usuario conecta
          this.orden.cupo_id = this.datosCupos.cupo_id;
          this.orden.servicios = this.servicioAutomaticosSel;

          if (this.orden.tipo_atencion_id != 2){
              this.orden.servicios = [];
          }

          //***verificar si aun esta disponible el cupo y descontar antes de guardar orden
          //**Guardar la orden y si corresponde, guardar las ordenes automáticas */

          console.log("orden",this.orden);
          this.atencionService
          .crearOrdenesServicio(this.orden)
          .toPromise()
          .then((results) => {

                  this.router.navigate(["solicitud-beneficiario/-1/-1/solicitudes/"
                +  this.solicitud.beneficiario_id + "/"
                +  this.solicitud.solicitud_id +
                "/solicitud-servicio-triaje", this.solicitud.beneficiario_id,  this.solicitud.solicitud_id]);
                this.blocked = false;

          })
          .catch((err) => {
            //console.log(err);
            this.showError(err);
            this.blocked = false;
          });

        }

      }else{
        this.showError('Sin número de solicitud !!!!.');
        this.blocked = false;
      }

    }


  }

  set() {
    this.orden.solicitud_id = this.solicitud.solicitud_id;
    this.orden.estado_atencion_id = 2;
    this.orden.is_cita = 1;
    //this.orden.beneficiario_id = this.beneficiario.beneficiario_id;
  }

  cerrar(){
    this.router.navigate(["solicitud-beneficiario/-1/-1/solicitudes/"
    +  this.solicitud.beneficiario_id + "/"
    +  this.solicitud.solicitud_id +
    "/solicitud-servicio-triaje", this.solicitud.beneficiario_id,  this.solicitud.solicitud_id]);


    
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

  /** Puente comunicación*/

  /** Si close es llamado por el evento displayEvent de Ayuda*/
  /** Cambia valor del display y emite un evento de salida a su propio evento displayEvent */
  close() {
    //this.displayHelp = false;
    //this.displayEvent.emit(this.displayHelp);
  }


}
