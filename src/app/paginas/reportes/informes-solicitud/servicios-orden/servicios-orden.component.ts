import { SitioService,TipoSolicitudService,EstadoSolicitudService, GlobalService
  , SolicitudService,EspecialidadService,DetalleRepSolicitudService, TipoAtencionService } from 'src/app/services';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { Sitio,TipoAtencion,EstadoSolicitud,Especialidad,Solicitud,RepSolicitud } from 'src/app/models';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-servicios-orden',
  templateUrl: './servicios-orden.component.html',
  styleUrls: ['./servicios-orden.component.scss'],
  providers: [MessageService]
})
export class ServicioOrdenComponent implements OnInit {

  es: any;
  title: any;
  cols: any[];
  options: any;
  option: any;
  reporte: any[] = [];
  rangeDates: Date[];
  total: number;
  request_id: any = null;
  orden_id: any = null; 

  cedula: any = null;
  sitioSelected: any;
  sitios: Sitio[];
  tipoAtencionSelected:any;
  tiposAtencion: TipoAtencion[];
  estadoSolicitudSelected:any;
  estadosSolicitud: EstadoSolicitud[];
  especialidadSelected:any;
  especialidades: Especialidad[];
  parametros:RepSolicitud={id:-1};

  loading: boolean;

  fecha_inicio: any = new Date();
  fecha_fin: any = new Date();
  fecha_inicio_solicitud: any = new Date();
  fecha_fin_solicitud: any = new Date();
  flag: boolean = false;
  fecha: Date;

  //Variables para el manejo del reporte
  exportColumns: any[];
  encabezado: any[];  //encabezado del reporte
  pdfPropiedades: any = {};
  arrayTotales: any[];
  nombre: any;

  constructor(
    private config: GlobalService,
    private sitioService: SitioService,
    private tipoOrdenService: TipoSolicitudService,
    private estadoSolService: EstadoSolicitudService,
    private especialidadService : EspecialidadService,
    private messageService: MessageService,
    private requerimientoService:  TipoAtencionService,
    private detalleSolicitudService: DetalleRepSolicitudService
  ) {

    this.options = [
      { label: 'Solicitud', value: 'Id' },
      { label: 'Cédula', value: 'Ci' },
      { label: 'Orden', value: 'IdOrden' }
    ];

    this.cols = [
      { field: 'nombre_tipo_solicitud', header: 'Tipo de Solicitud', width: '25%' },
      { field: 'nombre_servicio', header: 'Servicio', width: '25%' },
      { field: 'codigo_horario', header: 'Codigo Horario', width: '25%' },
      { field: 'cantidad', header: 'Cantidad', width: '25%' },
    ];

    this.title = "Reporte de Ordenes";
    this.es = this.config.es;

  }

  ngOnInit(): void {
    this.total = 0;
    this.flag = false;
 
    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
    this.fecha = new Date();

  }


  

  consult()
  {

     
    
      if (this.option.value == 'Ci') 
       {

          let format = 'yyyy-MM-dd';
          let desde = this.fecha_inicio;
          let hasta = this.fecha_fin;
          const locale = 'en-ES';

         if((!this.fecha_inicio || this.fecha_inicio == null || this.fecha_inicio ==undefined ||
            !this.fecha_fin || this.fecha_fin == null || this.fecha_fin ==undefined)
            || (!this.fecha_inicio_solicitud || this.fecha_inicio_solicitud == null || this.fecha_inicio_solicitud ==undefined ||
              !this.fecha_fin_solicitud || this.fecha_fin_solicitud == null || this.fecha_fin_solicitud ==undefined)
            )
            { 
                  return;
            }

           if (formatDate( this.fecha_inicio_solicitud, format, locale) > formatDate( this.fecha_fin_solicitud, format, locale))
           {
               this.loading = true;
               this.showError("La fecha desde de la consulta debe ser mayor o igual a la fecha hasta"); 
               this.reporte  = [];
               this.total = 0;
               this.loading = false;
             
           }
           else
           {
            this.parametros.cedula_beneficiario= this.cedula; 
            
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
                this.parametros.por_fecha_solicitud=0;
              }
               
            }
            else
            {
               this.parametros.por_fecha_solicitud=1;
            }
    
           }
  }
  else
  {
    this.parametros.solicitud_id= this.request_id;              
    console.log(this.parametros) ;             

  }

  this.detalleSolicitudService.getRequestsReportByParametros(this.parametros)
  .toPromise()
  .then(results => {
    this.reporte = results;
  }).catch((err) => {
    console.log(err);
    this.showError('Ha ocurrido un error');
  });  
}


  change() {
    if (this.option.value == 'Ci') 
    {
      this.flag = true;
      this.request_id = null;
     } else {
      this.flag = false;
      this.cedula = null;
      this.fecha_inicio = null;
      this.fecha_fin = null;
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
              ['REPORTE DE SOLICITUDES',100, 20],
              ['Fecha de impresión: ' + formatDate(this.fecha, format, locale), 200, 20], 
              ['Servicio: ' + servicio, 15,28],
              [this.title, 105,28],
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

  private showError(errMsg: string) {
    this.messageService.clear();
    this.messageService.add({ key: 'tc', severity: 'error', summary: errMsg });
  }

}


