import {  
  AuditoriaReporteService,
  GlobalService , 
   MenuService, EstadoAtencionService
  } from 'src/app/services';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import {
  TipoAtencion,
  EstadoSolicitud,
  Solicitud,
  RepSolicitud,
  UserAtencion,
  EstadoAtencion,
  ReporteAuditoria } from 'src/app/models';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-auditorias-solicitud',
  templateUrl: './auditorias-solicitud.component.html',
  styleUrls: ['./auditorias-solicitud.component.scss'],
  providers: [MessageService]
})
export class AuditoriasSolicitudComponent implements OnInit 
{
  es: any;
  options: any;
  option: any;
  cols: any[];
  total: number;
  fecha_inicio: any = new Date();
  fecha_fin: any = new Date();
  fecha_inicio_solicitud: any = new Date();
  fecha_fin_solicitud: any = new Date();
  flag: boolean = true;
  flagorden: boolean = false;
  flagsolicitud: boolean = false;
  flagservice: boolean = false;
  fecha: Date;
  titles: any;
  title: any;
  tipoAtencion: any;
  cedula: any = null;
  request_id: any = null;
  orden_id: any = null;
  reporte: any[] = [];

  orden: any = {};
  usuarios: UserAtencion[];
  estadoOrdenes: EstadoAtencion[];
  
  parametros:ReporteAuditoria={id:-1};
  loading: boolean;

     //Variables para el manejo del reporte
  exportColumns: any[];
  encabezado: any[];  //encabezado del reporte
  pdfPropiedades: any = {};
  arrayTotales: any[];
  nombre: any;
  autoLayout: Boolean;

  constructor(   
      private config: GlobalService,
      private messageService: MessageService,
      private AuditoriaReporteService: AuditoriaReporteService,
      private estadoOrdenService: EstadoAtencionService,
      private menuService:  MenuService
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
      { field: 'usuario_creador_sol', header: 'Usuario Solicitud ', width: '5%' },
      { field: 'nombre_creador_sol', header: 'Analista Creador', width: '5%' },
      { field: 'usuario_modificador_sol', header: 'Usuario Modif ', width: '5%' },
      { field: 'nombre_modificador_sol', header: 'Analista ', width: '5%' },
      { field: 'modified_sol', header: 'Fecha Modificación', width: '5%' },
      { field: 'usuario_creador', header: 'Usuario Orden ', width: '5%' },
      { field: 'nombre_creador', header: 'Analista Creador', width: '5%' },
      { field: 'usuario_modificador', header: 'Usuario Modif Orden ', width: '5%' },
      { field: 'nombre_modificador', header: 'Analista Modif', width: '5%' },
      { field: 'modified', header: 'Fecha Modificación', width: '5%' }


    ];

  }

  ngOnInit(): void 
  {
      this.Inicializar_variables()
      this.Inicializar_Combos()
  }

  Inicializar_variables()
  {
    this.total = 0; 
    this.flag = false;
    this.orden.tipo_atencion_solicitud_id=this.menuService.getTipoAtencion();
    this.fecha = new Date();
    this.option = this.options[0];
    this. change();
    this.flagservice=false;
    this.title = "Ordenes";
    this.es = this.config.es;
    this.autoLayout=true;
  }

  Inicializar_Combos()
  {
    this.fullDropdownEstadoOrden();
    this.fullDropdownUser();
  }

  
  fullDropdownUser() 
  {
    this.AuditoriaReporteService.getRequestsUser()
      .toPromise()
      .then((results) => {
        this.usuarios = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  
  fullDropdownEstadoOrden() 
  {
    this.estadoOrdenService.getAllCombo()
      .toPromise()
      .then((results) => {
        this.estadoOrdenes = results;
      })
      .catch((err) => {
        console.log(err);
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
        this.reporte  = [];
        this.total = 0;
      }
    }
  }

  limpiar_variables_combos()
  {
    this.orden.tipo_atencion_id=null;
    this.orden.medico_id=null;
    this.orden.servicio_id=null;
    this.orden.turno_id=null;
    this.orden.tipo_atencion_solicitud_id=null;
    this.orden.usuario_creador=null;
    this.fecha_inicio=null;
    this.fecha_fin=null;
    this.fecha_inicio_solicitud=null;
    this.fecha_fin_solicitud=null;
    
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
    delete this.parametros.estado_atencion_id;
    delete this.parametros.tipo_atencion_id;
    delete this.parametros.tipo_atencion_solicitud_id;
    delete this.parametros.turno_id;
    delete this.parametros.is_automatica;
    delete this.parametros.atencion_id;    
    delete this.parametros.solicitud_id;
    delete this.parametros.usuario_creador;
    this.reporte  = [];
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
      console.log(this.parametros) ;
    }
    else
    {
      delete this.parametros.solicitud_id;
      this.parametros.atencion_id= this.orden_id;
      console.log(this.parametros) ;
    }

  }

  let format = 'yyyy-MM-dd';
  const locale = 'en-ES';
  let date: Date = new Date();
  this.AuditoriaReporteService.Reporte_auditoria_solicitud(this.parametros)
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
    this.exportConfiguracion('Reporte Auditoria', formatDate(this.fecha, format, locale), formatDate(this.fecha, format, locale), this.total);
  }).catch((err) => {
    console.log(err);
    this.loading = true;
    this.showError('Ha ocurrido un error');
  });
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

        if (  this.orden.tipo_atencion_solicitud_id !=undefined)
        {
          this.parametros.tipo_atencion_solicitud_id = this.orden.tipo_atencion_solicitud_id;
        }


        if (  this.orden.usuario_creador !=undefined)
        {
          this.parametros.usuario_creador = this.orden.usuario_creador;
        }



        if (this.fecha_inicio || this.fecha_inicio != null || this.fecha_inicio !=undefined ||
          this.fecha_fin || this.fecha_fin != null || this.fecha_fin !=undefined)
        {

          if (formatDate( this.fecha_inicio, format, locale) > formatDate( this.fecha_fin, format, locale))
          {
              this.loading = true;
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
        }
        else
        {
          this.parametros.fecha_inicio=null; 
          this.parametros.fecha_fin=null; 
          this.parametros.por_fecha_solicitud=0;
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
            ['REPORTE DE AUDITORIAS',100, 20],
            ['Fecha de impresión: ' + formatDate(this.fecha, format, locale), 200, 20],
            ['REPORTE DE AUDITORIAS', 105,28],
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
