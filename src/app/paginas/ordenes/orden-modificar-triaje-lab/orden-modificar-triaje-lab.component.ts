import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import {
  GlobalService,
  AtencionService,
  DetalleRepSolicitudService,
  AuthService,
  TipoAtencionService,
  EspecialidadService,
  MedicoService,
  ServicioService,
  MedicoEspecialidadService,
  CausaService,
  ServicioEspecialidadService,
  UserRolesService,
  RolesService,
  MenuService,
  ProveedorService,
  GrupoService,
  GrupoServicioService
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
  selector: 'app-orden-modificar-triaje-lab',
  templateUrl: './orden-modificar-triaje-lab.component.html',
  styleUrls: ['./orden-modificar-triaje-lab.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class OrdenModificarTriajeLabComponent implements OnInit {

  displayDialog: boolean;
  displayDialogLote: boolean;
  tituloDialogo: string = '';
  es: any;
  nuevoRegistro: boolean;
  submitted: boolean;
  form: FormGroup;
  options: any;
  option: any;
  Atenciones: Atencion[];
  Atencion: Atencion = {};

  
  tituloDialogoConfirmar: string = '';
  displayDialogConfirmarLote: boolean;

  Atenciones_cancelar: Atencion[];

  grupos: GrupoService[];
  grupoSelected: GrupoService;

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

  proveedorSelected: any;
  proveedores: any[];

  causas: any[];
  causa: any;
  causa_id: any;
  datos_orden: any;
  flagservice: boolean = false;

  roles: RolModelo[] = [];
  /* Codigo de los roles */

  codRolLaboratorioModificarOrden: string;
  codRolLaboratorioCancelarOrden: string;


  /* Habilitar los items del menu según rol */

  activarBotonModificarOrdenLaboratorio: boolean = false;
  activarBotonCancelarOrdenLaboratorio: boolean = false;

  flagAcciones: boolean = false;
  
  title: any;
  tipoAtencion: any;
  tipoGrupo: any;

  //Servicios asociados a estudios especiales
  servicioSolicitado: ServicioEspecialidadService;
  serviciosSolicitados: ServicioEspecialidadService[];
  serviciosSolicitadosSel: any[];

  loading: boolean;


  constructor(
    private fb: FormBuilder,
    private atencionService: AtencionService,
    private messageService: MessageService,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private config: GlobalService,
    private tipoOrdenService:  TipoAtencionService,
    private requerimientoService:  TipoAtencionService,
    private especialidadService : EspecialidadService,
    private medicoService: MedicoService,
    private detalleSolicitudService: DetalleRepSolicitudService,
    private medicoEspecialidadService: MedicoEspecialidadService,
    private servicioService: ServicioService,
    private servicioEspecialidadService: ServicioEspecialidadService,
    private causaService:  CausaService,
    private rolesService: RolesService,
    private srvRolesByUser: UserRolesService,
    private menuService:  MenuService,
    private proveedorService: ProveedorService,
    private grupoService: GrupoService,
    private grupoServicioService: GrupoServicioService

  )
   {

   
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
      { field: 'nombres', header: 'Beneficiario', width: '7%' },
      { field: 'tipo_atencion_solicitud', header: 'Requerimiento', width: '5%' },
      { field: 'servicio_nom', header: 'Servicio', width: '2%' },
      { field: 'proveedor_id', header: 'Proveedor', width: '5%' },
      { field: 'tipo_atencion_nombre', header: 'Tipo Orden', width: '5%' },
      { field: 'especialidad_nombre', header: 'Especialidad', width: '7%' },
      { field: 'medico_nombre', header: 'Medico', width: '7%' },
      { field: 'fecha_cita', header: 'Cita', width: '5%' },
      { field: 'nombre_prioridad', header: 'Prioridad', width: '5%' },
      { field: 'nombre_tipo_consulta', header: 'Tipo Consulta', width: '5%' },
      { field: 'usuario_creador', header: 'Usuario', width: '5%' },
      { field: 'nombre_creador', header: 'Nombre', width: '7%' }
      
    ];

    if (this.menuService.getTipoAtencion() == 3){
      this.tipoGrupo = 1;   //Grupos de imagenes

    };

    if (this.menuService.getTipoAtencion() == 4){
        this.tipoGrupo  = 2;   //Servicio de laboratorio
    };

   
  
   }

  ngOnInit(): void 
  {
    let currentUser = this.authService.getCurrentUser();
    this.usuario  = JSON.parse(currentUser);

    this.codRolLaboratorioModificarOrden   =  this.rolesService.getCodRolLaboratorioModificarOrden();
    this.codRolLaboratorioCancelarOrden = this.rolesService.getCodRolLaboratorioCancelarOrden();
       
    this.activarBotonModificarOrdenLaboratorio = this.srvRolesByUser.buscarRolPorCodigo(this.codRolLaboratorioModificarOrden).length > 0 ? true : false;
    this.activarBotonCancelarOrdenLaboratorio = this.srvRolesByUser.buscarRolPorCodigo(this.codRolLaboratorioCancelarOrden).length > 0 ? true : false;
    


    this.option = this.options[0];
    this.change();
    this.es = this.config.es;
    this.fullDropdownEspecialidades();
    this.fullDropdownTipoOrden();
    this.fullDropdownRequerimiento();
    this.dropdownProveedor();
    this.fullDropdownMedicos();
    this.fullDropdownUser();

    this.fullDropdownCausas();
    this.fecha_cita=null;
    this.flagservice=false;
    this.dropdownGrupo();
    this.dropdownServicios();
    this.loading = false;

  }

  private showError(errMsg: string)
  {
    this.messageService.clear();
    this.messageService.add({ key: 'tc', severity: 'error', summary: errMsg });
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
  if (this.grupoSelected){
    this.grupoServicioService
      .getAllByGrupo(this.tipoGrupo)
      .toPromise()
      .then((results) => {
        this.serviciosSolicitados = results;
      })
      .catch((err) => {
        console.log(err);
      });

    }
}


dialogoConfirmarLote() {

  this.tituloDialogoConfirmar = "Confirmar";
  this.displayDialogConfirmarLote = true;
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
        //console.log("datos"+ data);
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
    this.proveedorSelected =null;
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
    delete this.parametros.proveedor_id;

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
                  this.loading = false;
                  return;
            }

           if (formatDate( this.fecha_inicio, format, locale) > formatDate( this.fecha_fin, format, locale))
           {
               this.showError("La fecha desde de la consulta debe ser mayor o igual a la fecha hasta");
               this.Atenciones  = [];
               this.loading = false;
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

            if ( this.proveedorSelected !=undefined)
            {
              this.parametros.proveedor_id=this.proveedorSelected;
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
      this.loading = true;
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

      //console.log(this.parametros);

     this.detalleSolicitudService.Rep_orden_modificar_triaje_lab(this.parametros)
      .toPromise()
      .then(results => 
        {
            this.Atenciones = results;
            let total: number = 0;
            this.Atenciones.forEach(element => 
              {
                  total += 1;  
              });

              this.loading = false;
              return total;
        }).catch((err) => 
        {
           console.log(err);
           this.loading = false;
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
