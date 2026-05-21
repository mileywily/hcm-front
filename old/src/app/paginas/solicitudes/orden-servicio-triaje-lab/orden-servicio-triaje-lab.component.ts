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
  selector: 'app-orden-servicio-triaje-lab',
  templateUrl: './orden-servicio-triaje-lab.component.html',
  styleUrls: ['./orden-servicio-triaje-lab.component.scss'],
  providers: [MessageService]
})
export class OrdenServicioTriajeLabComponent implements OnInit, OnDestroy {

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
  servicios: any[];

  servicioAutomatico: ServicioEspecialidadService;
  servicioAutomaticos: ServicioEspecialidadService[];
  servicioAutomaticosSel: any[];

  estadoOrden: EstadoAtencion;
  estadoOrdenes: EstadoAtencion[];

  especialidad: Especialidad;
  especialidades: Especialidad[];

  medico: Medico;
  medicos: Medico[];

  proveedor: any;
  proveedores: any[];

  sitio:  Sitio;
  sitios: Sitio[];

  prioridad:  Prioridad;
  prioridades: Prioridad[];

  usuario: any;

  user: Trabajador;
  asset: any;

  roles: RolModelo[] = [];

  totalAsignadas: any;

  grupos: GrupoService[];
  grupo: GrupoService;

  tipoAtencionId: any;
  tipoGrupo: any;

  solicitudExamenes: any[];
  examenesSel: any[];

  title: any;
  tipoAtencion: any;

  reporteServicios: any[];

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
    private atencionService: AtencionService,
    private tipoConsultaService: TipoConsultaService,
    private authService: AuthService,
    private rolesService: RolesService,
    private srvRolesByUser: UserRolesService,
    private solicitudExamenService: SolicitudExamenService,
    private grupoService: GrupoService, 
    private grupoServicioService: GrupoServicioService,
    private menuService: MenuService,
    private proveedorService: ProveedorService,
    private messageService: MessageService,
    private solicitudServiciosService: SolicitudServicioService
  ) 
  { 
    this.createForm();
    //this.codRolEstudiosEspeciales   =  this.rolesService.getCodRolEstudiosEspeciales();

    this.solicitudId = this._route.snapshot.paramMap.get('solicitud_id');
    //this.especialidadId = this._route.snapshot.paramMap.get('especialidad_id');

    this.tipoAtencionId = this.menuService.getTipoAtencion();

    this.title = "Crear Orden de ";

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

    
    if (this.tipoAtencionId == 3){
          this.tipoGrupo =1;   //Grupos de IMAGEN
    };

    if (this.tipoAtencionId == 4){
      this.tipoGrupo =2;   //Servicio de LABORATORIO
    };

    this.solicitudExamenes=[];
    this.examenesSel=[];


  }

  ngOnInit(): void 
  {

    this.reporteServicios=[];
    //this.tipoSolicitudId = this._route.snapshot.paramMap.get('tipo');
    //preparar nuevo registro
    this.openNew();

    this.orden =  this.ordenService.getParams();
    let datosCupo = this.ordenService.getCupo();

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
    this.dropdownProveedor();
    this.fullDropdownTipoConsultas();

    this.dropdownGrupo();

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
      tipoOrden:              [''],
      servicio:               [''],
      estadoOrden:            ['', [Validators.required]],
      especialidad:           ['', [Validators.required]],
      medico:                 ['', [Validators.required]],
      proveedor:              ['', [Validators.required]],
      motivo:                 [''],
      observaciones:          [''],
      prioridad:              [''],
      tipoConsulta:           [''],
      fecha_cita:             ['', [Validators.required]],
      servicioAutomaticosSel: [''],
      examenesSel:            [''],
      grupo:                  ['']
    })
  }

  openNew() {
    this.new = true;
    this.submitted = false;
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

  dropdownGrupo(){
    this.grupoService.getGruposByTipo(this.tipoGrupo)
      .toPromise()
      .then((results) => {
        this.grupos = results;
      })
      .catch((err) => {
        console.log(err);
      });
 }

 dropdownServiciosPorGrupo(){

    if (this.grupo){
      this.grupoServicioService
        .getAllByGrupo(this.grupo)
        .toPromise()
        .then((results) => {
          this.servicios = results;
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (this.tipoAtencionId == 4){
      this.servicios = [
        { label: 'EXAMENES DE LABORATORIO', value: 17 }
      ];
      this.orden.servicio_id = this.servicios[0].value;
    };

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

  dropdownProveedor(){
    this.proveedorService
      .getAllCombo()
      .toPromise()
      .then((results) => {
        this.proveedores = results;
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

    //Consultar servicios requeridos para IMAGENES
    consultarServiciosRequeridos(){
      if (this.solicitud.solicitud_id){
          this.solicitudServiciosService
          .getGrupoServicioBySolicitud(this.solicitud.solicitud_id)
          .toPromise()
          .then((results) => {
            this.reporteServicios = results;
          })
          .catch((err) => {
            this.showError(err); //console.log(err);
          });
  
      }
    }

  //Consultar examenes requeridos para LABORATORIO
  consultarExamenesSolicitud(){
    if (this.solicitud.solicitud_id){
        this.solicitudExamenService
        .getExamenesBySolicitud(this.solicitud.solicitud_id)
        .toPromise()
        .then((results) => {
          this.solicitudExamenes = results;
          this.totalAsignadas = 0;
          this.solicitudExamenes.forEach(element => {
            this.totalAsignadas += parseInt(element.asignado);
          });

        })
        .catch((err) => {
          console.log(err);
        });

    }
  }

  remove(actual: any) {
    
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
          this.grupo = this.orden.grupo_id;

          if (!this.orden.medico_id){
              this.orden.medico_id =this.solicitud.medico_id;
          };

          if (!this.orden.especialidad_id){
            this.orden.especialidad_id =this.solicitud.especialidad_id;
          };
          
          
          if(datosCupo){
            this.orden.fecha_cita = new Date(datosCupo.fecha.split('/').reverse().join('/'));
            this.orden.proveedor_id = datosCupo.proveedor_id;
            this.orden.grupo_id = datosCupo.grupo_id;
            this.grupo = datosCupo.grupo_id;
            this.orden.servicio_id = datosCupo.servicio_id;
            this.orden.turno_id = datosCupo.turno_id;
            this.datosCupos = datosCupo;
          };

          if (this.orden.examenes){
            this.examenesSel = this.orden.examenes;
          };

          this.dropdownMedicos();
          this.dropdownServiciosPorGrupo();
          this.consultarExamenesSolicitud();
          this.consultarServiciosRequeridos();

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
    this.orden.examenes  = this.examenesSel;
    this.orden.grupo_id = this.grupo;

    this.ordenService.setParams(this.orden);

    this.calendarioService.setParams({
      servicio_id: this.orden.servicio_id,
      proveedor_id: this.orden.proveedor_id,
      grupo_id: this.grupo
    });
    
    this.router.navigate(['calendario-triaje-lab', 'A'] , { relativeTo: this.activatedRoute });
  }

  guardar(){
    this.submitted = true;
    this.set();


    //Validar selección de examenes para LABORATORIO
    if (this.tipoAtencionId == 4 && this.examenesSel.length ==0){
      this.showError('Debe seleccionar el(los) examen(es) a programar.');
      this.blocked = false;
      return;
    }

    //Eliminar examenes asignados cuando se realiza de la selección de TODOS
    //Ya que todos marca todo los registros de la tabla

    if (this.examenesSel.length > 0){
      this.examenesSel = this.examenesSel.filter(x => x.asignado == 0);
    }

    if (this.form.valid) {
      this.blocked = true;

      if (this.orden.solicitud_id){

        if (!this.orden.atencion_id) {

          //console.log('Es nuevo');

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
          this.orden.examenes  = this.examenesSel;

          if (this.orden.tipo_atencion_id != 2){
              this.orden.servicios = [];
          }
          //verificar si aun esta disponible el cupo y descontar antes de guardar orden
          //Guardar la orden y si corresponde, guardar las ordenes automáticas 

          //console.log('this.orden.examenes:  ' , this.orden.examenes);

          this.atencionService
          .crearOrdenesServicio(this.orden)
          .toPromise()
          .then((results) => {

                  this.router.navigate(["solicitud-beneficiario/-1/-1/solicitudes/"
                +  this.solicitud.beneficiario_id + "/"
                +  this.solicitud.solicitud_id +
                "/solicitud-servicio-triaje-lab", this.solicitud.beneficiario_id,  this.solicitud.solicitud_id]);
                this.blocked = false;
          })
          .catch((err) => {
            console.log(err);
            this.showError(err);
            this.blocked = false;
          });          
        }

      }else{
        //console.log('Sin número de solicitud !!!!');
        this.showError('Sin número de solicitud !!!!.');
        this.blocked = false;
      }

    }else{
      //console.log('Formulario no valido.');
      this.showError('Ingrese la información de todos los campos obligatorios.');
      this.blocked = false;
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
    "/solicitud-servicio-triaje-lab", this.solicitud.beneficiario_id,  this.solicitud.solicitud_id]);
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
