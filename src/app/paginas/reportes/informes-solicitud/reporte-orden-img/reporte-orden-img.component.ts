import {
  SitioService,
  TipoAtencionService,
  EstadoAtencionService,
  GlobalService
  ,EspecialidadService,
  DetalleRepSolicitudService,
  PrioridadService,
  MedicoService,
  ServicioService,
  MedicoEspecialidadService,
  ServicioEspecialidadService,
  MenuService,
  GrupoServicioService,
  GrupoService,
  ProveedorService
}
from 'src/app/services';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import {
  Sitio,
  TipoAtencion,
  EstadoSolicitud,
  Especialidad,
  Prioridad,
  ReporteOrden,
  Medico,
  EstadoAtencion,
  UserAtencion
 }
from 'src/app/models';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-reporte-orden-img',
  templateUrl: './reporte-orden-img.component.html',
  styleUrls: ['./reporte-orden-img.component.scss'],
  providers: [MessageService]
})
export class ReporteOrdenImgComponent implements OnInit {

  es: any;
  title: any;
  cols: any[];
  options: any;
  option: any;
  valor: any="none";
  reporte: any[] = [];
  rangeDates: Date[];
  total: number;
  request_id: any = null;
  orden_id: any = null;

  cedula: any = null;
  autoLayout: Boolean;
  sitioSelected: any;
  sitios: Sitio[];
  
  grupoSelected: any;

  tipoOrden: TipoAtencion;
  tipoOrdenes: TipoAtencion[];

  requerimiento: TipoAtencion;
  requerimientos: TipoAtencion[];

  prioridad:  Prioridad;
  prioridades: Prioridad[];

  tipoAtencionSelected:any;
  tiposAtencion: TipoAtencion[];

  estadoOrden: EstadoAtencion;
  estadoOrdenes: EstadoAtencion[];

  serviciosSolicitados: any[];

  estadoSolicitudSelected:any;
  estadosSolicitud: EstadoSolicitud[];

  proveedorSelected: any;
  proveedores: any[];

  especialidadSelected:any;
  especialidades: Especialidad[];
  serviciosSolicitadosSel: any[];
  //Grupos solicitados para imagenes
  grupos: GrupoService[];

  medico: Medico;
  medicos: Medico[];

  servicio: any;
  servicios: any[];

  orden: any = {};
  
  tipoGrupo: any;

  parametros:ReporteOrden={id:-1};
  usuarios: UserAtencion[];

  loading: boolean;

  fecha_inicio: any = new Date();
  fecha_fin: any = new Date();
  fecha_inicio_solicitud: any = new Date();
  fecha_fin_solicitud: any = new Date();
  fecha_cita: any = new Date();
  flag: boolean = true;
  flagorden: boolean = false;
  flagsolicitud: boolean = false;
  flagservice: boolean = false;
  fecha: Date;
  titles: any;
  tipoAtencion: any;

  //Variables para el manejo del reporte
  exportColumns: any[];
  encabezado: any[];  //encabezado del reporte
  pdfPropiedades: any = {};
  arrayTotales: any[];
  nombre: any;


  constructor(
    private config: GlobalService,
    private sitioService: SitioService,
    private tipoOrdenService:  TipoAtencionService,
    private especialidadService : EspecialidadService,
    private prioridadService: PrioridadService,
    private medicoService: MedicoService,
    private messageService: MessageService,
    private estadoOrdenService: EstadoAtencionService,
    private detalleSolicitudService: DetalleRepSolicitudService,
    private medicoEspecialidadService: MedicoEspecialidadService,
    private servicioService: ServicioService,
    private servicioEspecialidadService: ServicioEspecialidadService,
    private requerimientoService:  TipoAtencionService,
     private menuService:  MenuService,
     private grupoServicioService: GrupoServicioService,
     private grupoService: GrupoService,
     private proveedorService: ProveedorService
  ) 
  { 
    this.options = [
      { label: 'Solicitud', value: 'Id' },
      { label: 'Orden', value: 'IdOrden' },
      { label: 'Cédula', value: 'Ci' }
    ];

    this.cols = [
      { field: 'mes_solicitud', header: 'mes_solicitud', width: '5%' },
      { field: 'fecha_solicitud', header: 'F.Solicitud', width: '5%' },
      { field: 'solicitud_id', header: 'Solicitud', width: '5%' },
      { field: 'atencion_id', header: 'Orden', width: '5%' },
      { field: 'mes_atencion', header: 'mes_orden', width: '5%' },
      { field: 'fecha_atencion', header: 'F.Orden', width: '5%' },
      { field: 'estado_nombre', header: 'Estado', width: '5%' },
      { field: 'nombre_causa', header: 'Causa', width: '5%' },
      { field: 'tipo_atencion_solicitud', header: 'Requerimiento', width: '5%' },
      { field: 'tipo_atencion_orden', header: 'Tipo Orden', width: '5%' },
      { field: 'nombre_grupo', header: 'Grupo', width: '5%' },
      { field: 'servicio_nombre', header: 'Servicio', width: '5%' },
      { field: 'especialidad_nombre', header: 'Especialidad', width: '5%' },
      { field: 'nombre_proveedor', header: 'Proveedor', width: '5%' },
      { field: 'medico_nombre', header: 'Medico', width: '5%' },
      { field: 'cedula_titular', header: 'Titular', width: '5%' },
      { field: 'cedula_beneficiario', header: 'Beneficiario', width: '5%' },
      { field: 'nombre_beneficiario', header: 'Nombre Beneficiario', width: '5%' },
      { field: 'fecha_cita', header: 'Cita', width: '5%' },
      { field: 'telefono', header: 'Telefono', width: '5%' },
      { field: 'telefono2', header: 'Telefono', width: '5%' },
      { field: 'nombre_prioridad', header: 'Prioridad', width: '5%' },
      { field: 'nombre_tipo_consulta', header: 'Tipo Consulta', width: '5%' },
      { field: 'usuario_creador', header: 'Usuario', width: '5%' },
      { field: 'nombre_creador', header: 'Analista', width: '5%' },
      { field: 'tipo_proceso', header: 'Tipo Proceso', width: '5%' },
      { field: 'OBSERVACION_SOLICITUD', header: 'Observación Solicitud', width: '5%' },
      { field: 'OBSERVACION_ORDEN', header: 'Observación Orden', width: '5%' }
      


    ];

    this.title = "Ordenes";
    this.es = this.config.es;
    this.autoLayout=true;
    if (this.menuService.getTipoAtencion() == 3){
      this.tipoGrupo = 1;   //Grupos de imagenes

    };

    if (this.menuService.getTipoAtencion() == 4){
        this.tipoGrupo  = 2;   //Servicio de laboratorio
    };

  }

  ngOnInit(): void 
  {
    this.total = 0; 
    this.flag = false;
    this.orden.tipo_atencion_solicitud_id=this.menuService.getTipoAtencion();
    this.dropdownProveedor();
    this.fullDropdownEspecialidades();
    this.fullDropdownTipoOrden();
    this.fullDropdownRequerimiento();
    this.fullDropdownPrioridades();
    this.fullDropdownMedicos();
    this.fullDropdownEstadoOrden();
    this.fullDropdownSitios();
    this.fullDropdownUser();
    this.dropdownGrupo();
    this.dropdownServiciosPorGrupo();
    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
    this.fecha = new Date();
    this.option = this.options[0];
    this. change();
    this.flagservice=false;

   // this.fullDropdownServicios();
   this.requerimientoService
   .getById(this.menuService.getTipoAtencion())
   .toPromise()
   .then((results) => {
     this.tipoAtencion = results;
     this.titles = 'Ordenes de : ' + this.tipoAtencion.nombre;
   })
   .catch((err) => {
     console.log(err);
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

  dropdownProveedor(){
    this.proveedorService
      .getAllCombo()
      .toPromise()
      .then((results) => {
        let aux_prov=[];
        aux_prov=  results;

        this.proveedores = aux_prov.filter(x => x.tipo_proveedor_nombre != "Laboratorios");
        

        //this.proveedores = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }


  editar(registroActual: any) {
    console.log("solicitud"+ registroActual.solicitud_id);
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

  dropdownMedicos(){
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

    this.orden.servicio_id = null;
    this.servicios=null;

    if (this.orden.tipo_atencion_id==2)
    {
      this.flagservice=true;
    }
    else
    {
      this.flagservice=false;
    }


    if (this.especialidadSelected){

      this.servicioEspecialidadService
        .getAllByEspecialidad(Number(this.especialidadSelected))
        .toPromise()
        .then((results) => {
          this.servicios = results;
        })
        .catch((err) => {
          console.log(err);
        });

      }
  }

  dropdownServiciosPorGrupo(){
    if (this.grupoSelected){
      this.grupoServicioService
        .getAllByGrupo(this.grupoSelected)
        .toPromise()
        .then((results) => {
          this.serviciosSolicitados = results;
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
    this.fecha_inicio_solicitud=null;
    this.fecha_fin_solicitud=null;
    this.grupoSelected = null;
    this.fecha_cita=null;
    this.cedula=null;
    this.request_id = null;
    this.orden_id = null;
    this.reporte = [];
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
    delete this.parametros.grupo_id;
    this.reporte  = [];
  }

  setear_parametros()
  {

    let format = 'yyyy-MM-dd';
    let desde = this.fecha_inicio;
    let hasta = this.fecha_fin;
    const locale = 'en-ES';
    this.parametros.por_fecha_solicitud=1;

    if((!this.fecha_inicio || this.fecha_inicio == null || this.fecha_inicio ==undefined || !this.fecha_fin || this.fecha_fin == null || this.fecha_fin ==undefined) && (!this.fecha_inicio_solicitud || this.fecha_inicio_solicitud == null || this.fecha_inicio_solicitud ==undefined || !this.fecha_fin_solicitud || this.fecha_fin_solicitud == null || this.fecha_fin_solicitud ==undefined))
    {
            this.loading = false;
            return;
    }

    if (formatDate( this.fecha_inicio_solicitud, format, locale) > formatDate( this.fecha_fin_solicitud, format, locale))
    {
         
         this.showError("La fecha desde de la consulta debe ser mayor o igual a la fecha hasta");
         this.reporte  = [];
         this.total = 0;
         this.loading = false;

    }
    else
    {
        if(!this.cedula ||  this.cedula != null ||  this.cedula !=undefined || this.cedula !=" ")
        {
          this.parametros.cedula_beneficiario= this.cedula;
        }

        this.parametros.fecha_inicio_solicitud=formatDate(this.fecha_inicio_solicitud, format, locale);
        this.parametros.fecha_fin_solicitud=formatDate(this.fecha_fin_solicitud, format, locale);

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

        if (  this.orden.estado_atencion_id !=undefined)
        {
          this.parametros.estado_atencion_id = this.orden.estado_atencion_id;
        }

        if (  this.orden.tipo_atencion_id !=undefined)
        {
          this.parametros.tipo_atencion_id = this.orden.tipo_atencion_id;
        }

        if (  this.orden.tipo_atencion_solicitud_id !=undefined)
        {
          this.parametros.tipo_atencion_solicitud_id = this.orden.tipo_atencion_solicitud_id;
        }


        if (  this.orden.usuario_creador !=undefined)
        {
          this.parametros.usuario_creador = this.orden.usuario_creador;
        }

        if (this.grupoSelected || this.grupoSelected != null || this.grupoSelected != undefined )
        {
          this.parametros.grupo_id=this.grupoSelected;
        }
 
        if (this.serviciosSolicitadosSel || this.serviciosSolicitadosSel != null || this.serviciosSolicitadosSel != undefined )
        {
          this.parametros.servicio_id=this.serviciosSolicitadosSel;
        } 

        if (this.fecha_inicio || this.fecha_inicio != null || this.fecha_inicio !=undefined ||
          this.fecha_fin || this.fecha_fin != null || this.fecha_fin !=undefined)
        {

          if (formatDate( this.fecha_inicio, format, locale) > formatDate( this.fecha_fin, format, locale))
          {
              this.showError("La fecha desde de la consulta debe ser mayor o igual a la fecha hasta"); 
              this.reporte  = [];
              this.total = 0;
              this.loading = false;
            
          }
          else
          {
            this.parametros.fecha_inicio=formatDate(this.fecha_inicio, format, locale); 
            this.parametros.fecha_fin=formatDate(this.fecha_fin, format, locale); 
          }
          if (this.grupoSelected || this.grupoSelected != null || this.grupoSelected != undefined )
          {
            this.parametros.grupo_id=this.grupoSelected;
          }
   
          if (this.serviciosSolicitadosSel || this.serviciosSolicitadosSel != null || this.serviciosSolicitadosSel != undefined )
          {
            this.parametros.servicio_id=this.serviciosSolicitadosSel;
          } 
        }
        else
        {
          this.parametros.fecha_inicio=null; 
          this.parametros.fecha_fin=null; 
          this.parametros.por_fecha_solicitud=0;
        }


     }

  }

  consult()
  {

    this.loading = true;
    this.limpiar_parametros_back();
    this.parametros.tipo_atencion_solicitud_id=this.menuService.getTipoAtencion();

    if (this.option.value == 'Ci')
      {
        this.setear_parametros();
      }
    else
    {

      if (this.option.value == 'Id') {
        delete this.parametros.atencion_id;
        this.parametros.solicitud_id= this.request_id;
        //console.log(this.parametros) ;
      }
      else
      {
        delete this.parametros.solicitud_id;
        this.parametros.atencion_id= this.orden_id;
        //console.log(this.parametros) ;
      }

   }

  let format = 'yyyy-MM-dd';
  const locale = 'en-ES';
  let date: Date = new Date();
  console.log("parametros ",this.parametros);

  this.detalleSolicitudService.Reporte_Orden_Imagen(this.parametros)
  .toPromise()
  .then(results => {
    this.reporte = results;
    let total: number = 0;
    this.reporte.forEach(element => {
      total += 1;
    });
    this.loading = false;
    return total;
  })
  .then(total => {
    this.total = total;
    this.exportConfiguracion('Reporte Orden', formatDate(this.fecha, format, locale), formatDate(this.fecha, format, locale), this.total);
  }).catch((err) => {
    console.log(err);
    this.loading = false;
    this.showError('Ha ocurrido un error');
  });
}



  change() 
  {
    
    this.limpiar_parametros_back();
    this.limpiar_variables_combos();

    if (this.option.value == 'Ci') {
      this.flag = false;
      this.flagorden=true;
      this.flagsolicitud=true;
      this.request_id = null;
      this.orden_id = null;
      this.reporte  = [];
      this.total = 0;
     } else 
     {

      if (this.option.value == 'Id') 
      {
          this.flag = true;
          this.flagorden=true;
          this.flagsolicitud=false;
          this.cedula = null;
          this.fecha_inicio = null;
          this.fecha_fin = null;
          this.fecha_cita = null;
          this.reporte  = [];
          this.total = 0;
      }
      else
      {
        this.flag = true;
        this.flagorden=false;
        this.flagsolicitud=true;
        this.request_id = null;
        this.cedula = null;
        this.fecha_inicio = null;
        this.fecha_fin = null;
        this.fecha_cita = null;
        this.reporte  = [];
        this.total = 0;
      }
    }
  }


  exportConfiguracion(servicio: string, fecha: any, date: any, total: number) {
    //ESPECIFICACIONES DE REPORTE para la propiedad "export" del componente app-basic-table

    //Encabezado para reporte
    let format = 'dd-MM-yyyy';
    const locale = 'en-ES';


    this.encabezado =
          [
              ['Sidor C.A.',15,20],
              ['REPORTE DE ORDENES',100, 20],
              ['Fecha de impresión: ' + formatDate(this.fecha, format, locale), 200, 20],
              ['REPORTE DE ORDENES', 105,28],
              ['Fecha: ' + formatDate(fecha, format, locale)  + ' a '+ formatDate(date, format, locale), 200,28]

          ];

    //Totales pie de reporte

    this.arrayTotales = [['', '', 'TOTAL GENERAL: ', total]];

    //Propiedades del reporte pdf que se deben definir si se usa la propiedad "export" del componente app-basic-table

    this.pdfPropiedades = {
      nombre: this.nombre,
      exportColumns: this.exportColumns,
      encabezado: this.encabezado,
      orientacion: 'l',
      tamaño: 'a4',
      fuente: 11,
      totales: this.arrayTotales
    };

  }

  private showError(errMsg: string) 
  {
    this.messageService.clear();
    this.messageService.add({ key: 'tc', severity: 'error', summary: errMsg });
  }

}


