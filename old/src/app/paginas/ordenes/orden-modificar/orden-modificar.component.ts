import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import {
  GlobalService,
  AtencionService,
  DetalleRepSolicitudService,
  AuthService,
  SitioService,
  TipoAtencionService,
  EstadoAtencionService,
  EspecialidadService,
  PrioridadService,
  MedicoService,
  ServicioService,
  ServicioMedicoService,
  MedicoEspecialidadService,
  CausaService,
  ServicioEspecialidadService,
  UserRolesService,
  RolesService,
  MenuService
  }
from 'src/app/services';
import {
  Atencion,
  ReporteOrden,
  TipoAtencion,
  Especialidad,
  Medico,
  Respuesta,
  UserAtencion,
  RolModelo 
 }
from 'src/app/models';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-orden-modificar',
  templateUrl: './orden-modificar.component.html',
  styleUrls: ['./orden-modificar.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class OrdenModificarComponent implements OnInit {
  displayDialog: boolean;
  displayDialogLote: boolean;

  tituloDialogo: string = '';
  tituloDialogoConfirmar: string = '';
  displayDialogConfirmarLote: boolean;
  es: any;
  nuevoRegistro: boolean;
  submitted: boolean;
  form: FormGroup;
  options: any;
  option: any;
  Atenciones: Atencion[];
  Atencion: Atencion = {};

  Atenciones_cancelar: Atencion[];

  selectedRegistros: Atencion[];
  parametros:ReporteOrden={id:-1};
  parametrosCancelar:Atencion={};
  request_id: any = null;
  orden_id: any = null;
  cols: any[];
  fecha_inicio: any = new Date();
  fecha_fin: any = new Date();
  fecha_cita: any = new Date();
  cedula: any = null;

  flag: boolean = true;
  flagorden: boolean = false;
  flagsolicitud: boolean = false;

  currentUser: any;
  formattedFechaSolicitud: any;

  usuario: any;

  tipoOrden: TipoAtencion;
  tipoOrdenes: TipoAtencion[];

  requerimiento: TipoAtencion;
  requerimientos: TipoAtencion[];


  tipoAtencionSelected:any;
  tiposAtencion: TipoAtencion[];


  estadoSolicitudSelected:any;
  usuarios: UserAtencion[];

  especialidadSelected:any;
  especialidades: Especialidad[];

  medico: Medico;
  medicos: Medico[];

  servicio: any;
  servicios: any[];

  orden: any = {};
  aux: Respuesta;

  causas: any[];
  causa: any;
  causa_id: any;
  datos_orden: any;
  flagservice: boolean = false;

  roles: RolModelo[] = [];
  /* Codigo de los roles */
  codRolCitasModificarOrden: string;
  codRolCitasCancelarOrden: string;
  codRolEstudiosEspecialesModificarOrden: string;
  codRolEstudiosEspecialesCancelarOrden: string;



  /* Habilitar los items del menu según rol */
  activarBotonModificarOrdenConsulta: boolean = false;
  activarBotonCancelarOrdenConsulta: boolean = false;
  activarBotonModificarOrdenEstudio: boolean = false;
  activarBotonCancelarOrdenEstudio: boolean = false;

  flagAcciones: boolean = false;
  
  title: any;
  tipoAtencion: any;

  loading: boolean = false;
  

  constructor(
    private fb: FormBuilder,
    private atencionService: AtencionService,
    private messageService: MessageService,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private config: GlobalService,
    private sitioService: SitioService,
    private tipoOrdenService:  TipoAtencionService,
    private requerimientoService:  TipoAtencionService,
    private especialidadService : EspecialidadService,
    private prioridadService: PrioridadService,
    private medicoService: MedicoService,
    private estadoOrdenService: EstadoAtencionService,
    private detalleSolicitudService: DetalleRepSolicitudService,
    private medicoEspecialidadService: MedicoEspecialidadService,
    private servicioService: ServicioService,
    private servicioEspecialidadService: ServicioEspecialidadService,
    private causaService:  CausaService,
    private rolesService: RolesService,
    private srvRolesByUser: UserRolesService,
    private menuService:  MenuService

  ) { 

  
    this.tipoOrdenService
    .getById(this.menuService.getTipoAtencion())
    .toPromise()
    .then((results) => {
      this.tipoAtencion = results;
      this.title = 'Modificar Orden: ' + this.tipoAtencion.nombre;
    })
    .catch((err) => {
      console.log(err);
    });

    this.options = [
      { label: 'Solicitud', value: 'Id' },
      { label: 'Orden', value: 'IdOrden' },
      { label: 'Cédula', value: 'Ci' }

    ];

    this.cols = [
      { field: 'atencion_id', header: 'Orden', width: '5%' },
      { field: 'solicitud_id', header: 'Solicitud', width: '5%' },
      { field: 'fecha_atencion', header: 'Fecha', width: '5%' },
      { field: 'estado_nombre', header: 'Estado', width: '5%' },
      { field: 'cedula_beneficiario', header: 'Cédula', width: '5%' },
      { field: 'nombre_beneficiario', header: 'Beneficiario', width: '7%' },
      { field: 'tipo_atencion_solicitud', header: 'Requerimiento', width: '5%' },
      { field: 'tipo_atencion_nombre', header: 'Tipo Orden', width: '5%' },
      { field: 'especialidad_nombre', header: 'Especialidad', width: '7%' },
      { field: 'servicio_nombre', header: 'Servicio', width: '6%' },
      { field: 'medico_nombre', header: 'Medico', width: '7%' },
      { field: 'fecha_cita', header: 'Cita', width: '5%' },
      { field: 'nombre_prioridad', header: 'Prioridad', width: '5%' },
      { field: 'nombre_tipo_consulta', header: 'Tipo Consulta', width: '5%' },
      { field: 'tipo_proceso', header: 'Tipo Proceso', width: '6%' },
      { field: 'usuario_creador', header: 'Usuario', width: '5%' },
      { field: 'nombre_creador', header: 'Nombre', width: '7%' }
      
    ];


  }

  ngOnInit(): void 
  {
    let currentUser = this.authService.getCurrentUser();
    this.usuario  = JSON.parse(currentUser);

    this.codRolCitasModificarOrden   =  this.rolesService.getCodRolCitasModificarOrden();
    this.codRolCitasCancelarOrden = this.rolesService.getCodRolCitasCancelarOrden();
    this.codRolEstudiosEspecialesModificarOrden   =  this.rolesService.getCodRolEstudiosEspecialesModificarOrden();
    this.codRolEstudiosEspecialesCancelarOrden = this.rolesService.getCodRolEstudiosEspecialesCancelarOrden();
    
    this.activarBotonModificarOrdenConsulta = this.srvRolesByUser.buscarRolPorCodigo(this.codRolCitasModificarOrden).length > 0 ? true : false;
    this.activarBotonCancelarOrdenConsulta = this.srvRolesByUser.buscarRolPorCodigo(this.codRolCitasCancelarOrden).length > 0 ? true : false;
    this.activarBotonModificarOrdenEstudio = this.srvRolesByUser.buscarRolPorCodigo(this.codRolEstudiosEspecialesModificarOrden).length > 0 ? true : false;
    this.activarBotonCancelarOrdenEstudio = this.srvRolesByUser.buscarRolPorCodigo(this.codRolEstudiosEspecialesCancelarOrden).length > 0 ? true : false;

    console.log("roles",this.srvRolesByUser.getRolesLocalStorage());
    console.log("rol",this.codRolCitasModificarOrden);
    console.log("permitir",this.activarBotonModificarOrdenConsulta);

    this.option = this.options[0];
    this. change();
    this.es = this.config.es;
    this.fullDropdownEspecialidades();
    this.fullDropdownTipoOrden();
    this.fullDropdownRequerimiento();
    this.fullDropdownMedicos();
    this.fullDropdownUser();
    this.dropdownServicios();
    this.fullDropdownCausas();
    this.fecha_cita=null;
    this.flagservice=false;

   
  }

  private showError(errMsg: string)
  {
    this.messageService.clear();
    this.messageService.add({ key: 'tc', severity: 'error', summary: errMsg });
  }







  deshabilitarAcciones(data){

   
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


  private showSuccess(successMsg: string)
  {
    this.messageService.clear();
    this.messageService.add({
      key: 'tc',
      severity: 'success',
      summary: successMsg,
    });
  }

  fullDropdownUser() {
    this.detalleSolicitudService.getRequestsUser()
      .toPromise()
      .then((results) => {
        this.usuarios = results;
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

  fullDropdownTipoOrden() {
    this.tipoOrdenService.getAllActivos()
      .toPromise()
      .then((results) => {
        this.tipoOrdenes = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  fullDropdownRequerimiento() {
    this.requerimientoService.getAllActivos()
      .toPromise()
      .then((results) => {
        this.requerimientos = results;
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

  dropdownMedicos()
  {
  
    this.medicoEspecialidadService
      .getMedicoByEspecialidad(this.especialidadSelected)
      .toPromise()
      .then((results) => {
        this.medicos = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  dropdownServicios()
  {

     if (this.especialidadSelected)
     {

      this.servicioEspecialidadService
        .getAllByEspecialidad(Number(this.especialidadSelected))
        .toPromise()
        .then((results) => {
          this.servicios = results;

            if (results){
             let aux=[];
            aux=results;
            this.servicios = aux.filter(x => x.tipo_atencion_id == this.orden.tipo_atencion_solicitud_id);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      }

  }


  fullDropdownServicios()
  {
      this.servicioService
        .getAllCombo()
        .toPromise()
        .then((results) => {
          this.servicios = results;
        })
        .catch((err) => {
          console.log(err);
        });


  }




  procesarOrden(datos: any) 
  {
  
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
        this.atencionService.procesarOrden(data)
        .toPromise()
        .then(results => {
          if (results){
            this.Atenciones = results;
            this.consultar();
          }
        })
        .catch(err => { console.log(err) });

      }
    });
  }


  

  close() {
    this.displayDialog   = false;
    this.displayDialogLote = false;
    this.displayDialogConfirmarLote=false;
    this.submitted = false;
   }


  cancelarOrden() {

    this.datos_orden.causa_id = this.causa_id;
    this.atencionService.cancelarOrden(this.datos_orden)
    .toPromise()
    .then(results => {
      if (results){
        this.consultar();
      }
    })
    .catch(err => { console.log(err) });

    this.causa_id = null;
    this.close();

  }


  dialogoCausa(datos: any) {

    this.datos_orden = 
    {
      solicitud_id: datos.solicitud_id,
      atencion_id:  datos.atencion_id,
      causa_id: 2,
      usuario_modificador: this.usuario.siglado,
      nombre_modificador: this.usuario.nombre

    }

    this.tituloDialogo = "Causa";
    this.displayDialog = true;
}

dialogoCausaLote() {

  this.tituloDialogo = "Causa";
  this.displayDialogLote = true;
}

dialogoConfirmarLote() {

  this.tituloDialogoConfirmar = "Confirmar";
  this.displayDialogConfirmarLote = true;
}

deleteSelectedItems() {

         for (let i = 0; i < this.selectedRegistros.length; i++)
         {
           this.parametrosCancelar.atencion_id = this.selectedRegistros[i].atencion_id;
           this.parametrosCancelar.solicitud_id =this.selectedRegistros[i].solicitud_id;
           this.parametrosCancelar.causa_id =  this.causa_id;;
           this.parametrosCancelar.usuario_modificador = this.usuario.siglado;
           this.parametrosCancelar.nombre_modificador = this.usuario.nombre;
           this.atencionService.cancelarOrden(this.parametrosCancelar)
           .toPromise()
           .then(results => {
                this.consultar();
           }).catch(err => {
            console.log(err);
            this.displayDialogLote = false;
          })
        }

        this.selectedRegistros = null;
        this.displayDialogLote = false;
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Registros Borrados', life: 3000});
  }

  confirmarSelectedItems()
  {
    for (let i = 0; i < this.selectedRegistros.length; i++)
         {
           this.parametrosCancelar.atencion_id = this.selectedRegistros[i].atencion_id;
           this.parametrosCancelar.solicitud_id =this.selectedRegistros[i].solicitud_id;
           this.parametrosCancelar.usuario_modificador = this.usuario.siglado;
           this.parametrosCancelar.nombre_modificador = this.usuario.nombre;
           this.atencionService.procesarOrden(this.parametrosCancelar)
           .toPromise()
           .then(results => {
                this.consultar();
           }).catch(err => {
            console.log(err);
           this.displayDialogConfirmarLote = false;
          })
        }

        this.selectedRegistros = null;
        this.displayDialogConfirmarLote = false;
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Registros Confirmados', life: 3000});

  }


  limpiar_variables_combos()
  {
    this.orden.tipo_atencion_id=null;
    this.especialidadSelected=null;
    this.orden.medico_id=null;
    this.orden.servicio_id=null;
    this.orden.turno_id=null;
    this.orden.tipo_atencion_solicitud_id=null;
    this.orden.usuario_creador=null;
    this.fecha_inicio=null;
    this.fecha_fin=null;
    this.fecha_cita=null;
    this.cedula=null;
    this.request_id = null;
    this.orden_id = null;
    this.Atenciones = [];
  }

  limpiar_parametros_back()
  {
    delete this.parametros.fecha_fin;
    delete this.parametros.fecha_inicio;
    delete this.parametros.cedula_beneficiario;
    delete this.parametros.especialidad_id;
    delete this.parametros.medico_id;
    delete this.parametros.servicio_id;
    delete this.parametros.estado_atencion_id;
    delete this.parametros.tipo_atencion_id;
    delete this.parametros.tipo_atencion_solicitud_id;
    delete this.parametros.fecha_cita;
    delete this.parametros.turno_id;
    delete this.parametros.is_automatica;
    delete this.parametros.atencion_id;    
    delete this.parametros.solicitud_id;
    delete this.parametros.usuario_creador;

    this.Atenciones  = [];
  }

 setear_parametros()
 {

  let format = 'yyyy-MM-dd';
          let desde = this.fecha_inicio;
          let hasta = this.fecha_fin;
          const locale = 'en-ES';

         if(!this.fecha_inicio || this.fecha_inicio == null || this.fecha_inicio ==undefined ||
            !this.fecha_fin || this.fecha_fin == null || this.fecha_fin ==undefined)
            {
                  this.loading=false;
                  return;
            }

           if (formatDate( this.fecha_inicio, format, locale) > formatDate( this.fecha_fin, format, locale))
           {
               this.showError("La fecha desde de la consulta debe ser mayor o igual a la fecha hasta");
               this.Atenciones  = [];
               this.loading=false;
           }
           else
           {
            if(! this.cedula ||  this.cedula != null ||  this.cedula !=undefined )
            {
              this.parametros.cedula_beneficiario= this.cedula;
            }

            this.parametros.fecha_inicio=formatDate(this.fecha_inicio, format, locale);
            this.parametros.fecha_fin=formatDate(this.fecha_fin, format, locale);

            if(this.fecha_cita && this.fecha_cita != null && this.fecha_cita !=undefined )

              {
                this.parametros.fecha_cita=formatDate(this.fecha_cita, format, locale);
              }

            if ( this.especialidadSelected !=undefined)
            {
              this.parametros.especialidad_id=this.especialidadSelected;
            }
            if (  this.orden.medico_id !=undefined)
            {
              this.parametros.medico_id = this.orden.medico_id;
            }
            if (  this.orden.servicio_id !=undefined)
            {
              this.parametros.servicio_id = this.orden.servicio_id;
            }

            if (  this.orden.estado_atencion_id !=undefined)
            {
              this.parametros.estado_atencion_id = this.orden.estado_atencion_id;
            }

            if (  this.orden.tipo_atencion_id !=undefined)
            {
              this.parametros.tipo_atencion_id = this.orden.tipo_atencion_id;
            }

          /*  if (  this.orden.tipo_atencion_solicitud_id !=undefined)
            {
              this.parametros.tipo_atencion_solicitud_id = this.orden.tipo_atencion_solicitud_id;
            }*/

            if (  this.orden.usuario_creador !=undefined)
            {
              this.parametros.usuario_creador = this.orden.usuario_creador;
            }
            //this.parametros.tipo_atencion_id=this.menuService.getTipoAtencion();

           }
  
 }


  consultar()
  {
      //console.log( 'ROL: ', this.itemRolEstudiosEspeciales);
      this.loading=true;
      this.limpiar_parametros_back();
      this.parametros.tipo_atencion_solicitud_id=this.menuService.getTipoAtencion();
      if (this.option.value == 'Ci')
      {
         this.setear_parametros();
      }
      else
      {

          if (this.option.value == 'Id') 
          {

            this.parametros.solicitud_id= this.request_id;
          }
          else
          {
              this.parametros.atencion_id= this.orden_id;

          }
  
      }

      let format = 'yyyy-MM-dd';
      const locale = 'en-ES';
      let date: Date = new Date();

      console.log(this.parametros);

    //  this.detalleSolicitudService.getRequestsReportOrdenByParametros_modificar(this.parametros)
    this.detalleSolicitudService.getReporte_Orden_By_Atencionmodificar(this.parametros)
      .toPromise()
      .then(results => 
        {
            this.Atenciones = results;
            let total: number = 0;
            this.Atenciones.forEach(element => 
              {
                  total += 1;  
              });

              this.loading=false;
              return total;
        }).catch((err) => 
        {
           console.log(err);
           this.loading=false;
           this.showError('Ha ocurrido un error');
        });
}

  change()
  {
    this.limpiar_parametros_back();
    this.limpiar_variables_combos();

    if (this.option.value == 'Ci') 
    {
      this.flag = false;
      this.flagorden=true;
      this.flagsolicitud=true;
      this.request_id = null;
      this.orden_id = null;

     } else {

      if (this.option.value == 'Id') 
      {
          this.flag = true;
          this.flagorden=true;
          this.flagsolicitud=false;

      }
      else
      {
        this.flag = true;
        this.flagorden=false;
        this.flagsolicitud=true;
        this.request_id = null;

      }
    }
  }
}
