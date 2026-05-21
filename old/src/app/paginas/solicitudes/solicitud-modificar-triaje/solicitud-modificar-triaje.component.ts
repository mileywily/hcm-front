import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import {
  GlobalService,
  DetalleRepSolicitudService,
  AuthService,
  TipoSolicitudService,
  EspecialidadService,
  CausaService,
  ServicioEspecialidadService,
  SolicitudService,
  SolicitudModificarService,
  RolesService,
  UserRolesService,
  MenuService,
  TipoAtencionService
  }
from 'src/app/services';
import {
  TipoAtencion,
  Especialidad,
  Medico,
  Respuesta,
  UserAtencion,
  RepSolicitud,
  Solicitud,
  RolModelo
 }
from 'src/app/models';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-solicitud-modificar-triaje',
  templateUrl: './solicitud-modificar-triaje.component.html',
  styleUrls: ['./solicitud-modificar-triaje.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class SolicitudModificarTriajeComponent implements OnInit {

  displayDialog: boolean;
  displayDialogLote: boolean;
  tituloDialogo: string = '';
  es: any;
  nuevoRegistro: boolean;
  submitted: boolean;
  form: FormGroup;
  options: any;
  option: any;
  Solicitudes: RepSolicitud[];
  Solicitud: RepSolicitud = {"id":-1};

  selectedRegistros: Solicitud[];
  parametros:RepSolicitud={id:-1};
  parametrosCancelar:Solicitud={};
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
  tiposSolicitud: TipoSolicitudService[];
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
  causa_solicitud_id: any;
  datos_solicitud: any;
  flagservice: boolean = false;

  filtro: any;

  roles: RolModelo[] = [];
  /* Codigo de los roles */
  codRolImagenModificarSolicitud: string;
  codRolImagenCancelarSolicitud : string;

  /* Habilitar los items del menu según rol */
  activarBotonModificarSolicitudImagen: boolean = false;
  activarBotonCancelarSolicitudImagen: boolean = false;


  title: any;
  tipoAtencion: any;

  loading: boolean;
  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private authService: AuthService,
    private config: GlobalService,
    private tipoSolicitudService:  TipoSolicitudService,
    private especialidadService : EspecialidadService,
    private detalleSolicitudService: DetalleRepSolicitudService,
    private causaSolicitudService:  CausaService,
    private solicitudService: SolicitudService,
    private solicitudModificarService: SolicitudModificarService,
    private rolesService: RolesService,
    private srvRolesByUser: UserRolesService,
    private menuService:  MenuService,
    private tipoAtencionService: TipoAtencionService
  ) 
  {

    this.options = [
      { label: 'Solicitud', value: 'Id' },
      { label: 'Cédula', value: 'Ci' }

    ];

    this.cols = [
      { field: 'solicitud_id', header: 'Solicitud', width: '5%' },
      { field: 'fecha_solicitud', header: 'Fecha', width: '5%' },
      { field: 'tipo_solicitud_nombre', header: 'Tipo', width: '10%' },
      { field: 'estado_nombre', header: 'Estado', width: '5%' },
      { field: 'nombre_tipo_atencion', header: 'Requerimiento', width: '5%' },
      { field: 'especialidad_nombre', header: 'Especialidad', width: '10%' },
      { field: 'cedula_beneficiario', header: 'Cédula', width: '10%' },
      { field: 'nombre_beneficiario', header: 'Beneficiario', width: '10%' },
      { field: 'telefono', header: 'Télefono', width: '5%' },
      { field: 'telefono2', header: 'Télefono', width: '5%' },
      { field: 'observacion', header: 'Observación', width: '3%' },
      { field: 'usuario_creador', header: 'Usuario', width: '5%' },
      { field: 'nombre_creador', header: 'Nombre', width: '10%' },
      { field: 'fecha_recepcion', header: 'Fecha Recepción', width: '2%' },



    
    ];


    this.tipoAtencionService
    .getById(this.menuService.getTipoAtencion())
    .toPromise()
    .then((results) => {
      this.tipoAtencion = results;
      this.title = 'Modificar Solicitud: ' + this.tipoAtencion.nombre;
    })
    .catch((err) => {
      console.log(err);
    });

    

    


  }

  ngOnInit(): void 
  {

    this.filtro= this.solicitudModificarService.getParametros();

    let currentUser = this.authService.getCurrentUser();
    this.usuario  = JSON.parse(currentUser);

    this.codRolImagenModificarSolicitud   =  this.rolesService.getCodRolImagenModificarSolicitud();
    this.codRolImagenCancelarSolicitud = this.rolesService.getCodRolImagenCancelarSolicitud();
       
    this.activarBotonModificarSolicitudImagen = this.srvRolesByUser.buscarRolPorCodigo(this.codRolImagenModificarSolicitud).length > 0 ? true : false;
    this.activarBotonCancelarSolicitudImagen = this.srvRolesByUser.buscarRolPorCodigo(this.codRolImagenCancelarSolicitud).length > 0 ? true : false;
    


    this.es = this.config.es;
    this.fullDropdownEspecialidades();
    this.fullDropdownUser();
    this.fullDropdownCausas();
    this.fecha_cita=null;
    this.flagservice=false;
    this.limpiar_parametros_back();
    if (this.filtro == null){
      this.option = this.options[0];
    }else{
      if (this.filtro.tipo_filtro=='Ci' ){
        this.option = this.options[1];
      }else{
        this.option = this.options[0];
      }
    }
    this.change();

    this.getFiltros();  


  }

 

  private showError(errMsg: string)
  {
    this.messageService.clear();
    this.messageService.add({ key: 'tc', severity: 'error', summary: errMsg });
  }



  fullDropdownCausas() {
    this.causaSolicitudService
      .getAllCombo()
      .toPromise()
      .then((results) => {
        this.causas = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getFiltros(){
    if (this.filtro != null){


      if (this.filtro.solicitud_id  || this.filtro.solicitud_id != null || this.filtro.solicitud_id != undefined ){
        this.request_id = this.filtro.solicitud_id;

      }

      if (this.filtro.cedula_beneficiario != null || this.filtro.cedula_beneficiario != undefined )
      {
        this.cedula = this.filtro.cedula_beneficiario;
      }

      if(this.filtro.fecha_inicio || this.filtro.fecha_inicio != null || this.filtro.fecha_inicio !=undefined )
      {
          this.fecha_inicio = this.filtro.fecha_inicio;
      }

      if(this.filtro.fecha_fin || this.filtro.fecha_fin != null || this.filtro.fecha_fin !=undefined)
      {
        this.fecha_fin = this.filtro.fecha_fin;
      }

      if (this.filtro.especialidad_id  || this.filtro.especialidad_id != null || this.filtro.especialidad_id != undefined )
      {
        this.especialidadSelected = this.filtro.especialidad_id;
      }

      if (this.filtro.tipo_solicitud_id || this.filtro.tipo_solicitud_id != null || this.filtro.tipo_solicitud_id != undefined )
      {
        this.orden.tipo_solicitud_id= this.filtro.tipo_solicitud_id;
      }

      if (this.filtro.usuario_creador || this.filtro.usuario_creador != null || this.filtro.usuario_creador != undefined )
      {
        this.orden.usuario_creador = this.filtro.usuario_creador;
      }
 
      this.consultar();
    }

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

  fullDropdownTipoSolicitudes() {
    this.tipoSolicitudService.getAllActivos()
      .toPromise()
      .then((results) => {
        this.tipoOrdenes = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }



  close() {
    this.displayDialog   = false;
    this.displayDialogLote   = false;
    this.submitted = false;
   }


    //Crear orden
    verSolicitud(rowData) {
      //El selected en este caso corresponde al elemento seleccionado en la tabla de la vista

      this.router.navigate(["solicitud-beneficiario/-1/-1/solicitudes/" + rowData.beneficiario_id + "/"  + rowData.solicitud_id + "/solicitud-servicio", rowData.beneficiario_id,  rowData.solicitud_id]);

       }

  navigate(route, value1) {
      //En este caso, la ruta detalle recibe un parámetro, por ello el valor de value
      //En caso de no recibir parámetro, omitir el value en el arreglo
      this.router.navigate([route, value1], { relativeTo: this.activatedRoute });
  }

  dialogoCausa(datos: any) {

    this.datos_solicitud = 
    {
      solicitud_id: datos.solicitud_id,
      causa_solicitud_id: 2,
      usuario_modificador: this.usuario.siglado,
      nombre_modificador: this.usuario.nombre

    }

    this.tituloDialogo = "Causa";
    this.displayDialog = true;
}

cancelarSolicitud() {

  this.datos_solicitud.causa_solicitud_id = this.causa_solicitud_id;
  console.log("parametro",this.datos_solicitud);

  this.solicitudService.cancelarSolicitud(this.datos_solicitud)
  .toPromise()
  .then(results => {
    if (results){
      this.showSuccess('Registro Cancelado Exitosamente');
      this.consultar();
    }
  })
  .catch(err => {
    console.log(err) ;
  });

  this.causa_solicitud_id = null;
  this.close();

}


dialogoCausaLote() {

  this.tituloDialogo = "Causa";
  this.displayDialogLote = true;
}



deleteSelectedItems() {

         for (let i = 0; i < this.selectedRegistros.length; i++)
         {

           this.parametrosCancelar.solicitud_id =this.selectedRegistros[i].solicitud_id;
           this.parametrosCancelar.usuario_modificador = this.usuario.siglado;
           this.parametrosCancelar.nombre_modificador = this.usuario.nombre;
           this.parametrosCancelar.causa_solicitud_id = this.causa_solicitud_id;
           this.solicitudService.cancelarSolicitud(this.parametrosCancelar)
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
        this.showSuccess('Registros Cancelados Exitosamente');
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Registros Cancelados', life: 3000});
  }



  limpiar_variables_combos()
  {
    this.orden.tipo_atencion_id=null;
    this.especialidadSelected=null;
    this.orden.medico_id=null;
    this.orden.servicio_id=null;
    this.orden.turno_id=null;
    this.orden.tipo_solicitud_id=null;
    this.orden.usuario_creador=null;
    
   
    this.fecha_inicio=null;
    this.fecha_fin=null;
    this.fecha_cita=null;
    this.cedula=null;
    this.request_id = null;
    this.orden_id = null;
    this.Solicitudes = [];
  }

  limpiar_parametros_back()
  {
    delete this.parametros.fecha_fin;
    delete this.parametros.fecha_inicio;
    delete this.parametros.cedula_beneficiario;
    delete this.parametros.especialidad_id;
    delete this.parametros.tipo_solicitud_id;
    delete this.parametros.solicitud_id;
    delete this.parametros.usuario_creador;
    delete this.parametros.tipo_atencion_id;
    delete this.parametros.grupo_id;
    delete this.parametros.servicio_id;

    this.Solicitudes  = [];
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
                  return;
            }

           if (formatDate( this.fecha_inicio, format, locale) > formatDate( this.fecha_fin, format, locale))
           {
               this.showError("La fecha desde de la consulta debe ser mayor o igual a la fecha hasta");
               this.Solicitudes  = [];
           }
           else
           {
            if(! this.cedula ||  this.cedula != null ||  this.cedula !=undefined )
            {
              this.parametros.cedula_beneficiario= this.cedula;
            }

            this.parametros.fecha_inicio=formatDate(this.fecha_inicio, format, locale);
            this.parametros.fecha_fin=formatDate(this.fecha_fin, format, locale);

            if ( this.especialidadSelected !=undefined)
            {
              this.parametros.especialidad_id=this.especialidadSelected;
            }

     
            
           //}            


            if (  this.orden.tipo_solicitud_id !=undefined)
            {
              this.parametros.tipo_solicitud_id = this.orden.tipo_solicitud_id;
            }

            if (  this.orden.usuario_creador !=undefined)
            {
              this.parametros.usuario_creador = this.orden.usuario_creador;
            }

            this.parametros.tipo_atencion_id=this.menuService.getTipoAtencion();


           }

 }

setFiltros(){

  this.filtro = this.parametros;
  this.filtro.tipo_filtro = this.option.value;
  this.filtro.fecha_inicio = this.fecha_inicio;
  this.filtro.fecha_fin = this.fecha_fin;
  this.filtro.flag = this.flag;
  this.filtro.flagsolicitud  =  this.flagsolicitud;
  this.solicitudModificarService.setParametros(this.filtro);
 }


  consultar()
  {
      this.loading=true;
      this.limpiar_parametros_back();
      this.parametros.tipo_atencion_id=this.menuService.getTipoAtencion();
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


      }

      

      this.setFiltros();

      let format = 'yyyy-MM-dd';
      const locale = 'en-ES';
      let date: Date = new Date();
      console.log("parametros",this.parametros);
     this.detalleSolicitudService.Rep_solicitud_modificar_triaje(this.parametros)
      .toPromise()
      .then(results =>
        {
            this.Solicitudes = results;
            let total: number = 0;
            this.Solicitudes.forEach(element =>
              {
                  total += 1;
              });

              this.loading=false;
              return total;
        }).catch((err) =>
        {
           //console.log(err);
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
     }
     else {

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
