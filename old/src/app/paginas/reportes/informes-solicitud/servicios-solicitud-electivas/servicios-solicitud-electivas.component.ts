
import {
  TipoSolicitudService,
  EstadoSolicitudService,
  GlobalService,
  TipoCoberturaService,
  EspecialidadService,
  DetalleRepSolicitudElecElecService,
  MenuService,
  TipoAtencionService,
  TipoDiagnosticoService,
  DomicilioService,
  PrioridadService,
  EnteService


} from 'src/app/services';

import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import {
  TipoCobertura,
  TipoSolicitud,
  TipoDiagnostico,
  Prioridad,
  
  Especialidad,
  EstadoSolicitud,
  RepSolicitud,
  UserAtencion,
  Domicilio,
  Ente,
TipoAtencion
} from 'src/app/models';

import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-servicios-solicitud-electivas',
  templateUrl: './servicios-solicitud-electivas.component.html',
  styleUrls: ['./servicios-solicitud-electivas.component.scss'],
  providers: [DatePipe,MessageService]
})
export class ServiciosSolicitudElectivasComponent implements OnInit
 {


  es: any;
  title: any;
  cols: any[];
  options: any;
  option: any;
  reporte: any[] = [];
  rangeDates: Date[];
  total: number;
  request_id: any = null;
  cedula: any = null;

  user :UserAtencion;
  usuarios: UserAtencion[];

  tipoCoberturasSelected: TipoCobertura;
  tipoCoberturas: TipoCobertura[];

  tipoSolicitudSelected: TipoSolicitud;
  tipoSolicitudes: TipoSolicitud[];

  estadoSolicitudSelected:EstadoSolicitud;
  estadosSolicitudes: EstadoSolicitud[];

  especialidadSelected:Especialidad;
  especialidades: Especialidad[];

  domicilioSelected:Domicilio;
  domicilios: Domicilio[];

  parametros:RepSolicitud={"id":-1};
  tipoAtencion: any;
  tipoOrdenes: TipoAtencion[];
  loading: boolean;

  fecha_inicio: any = new Date();
  fecha_fin: any = new Date();
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
    private estadoSolService: EstadoSolicitudService,
    private especialidadService : EspecialidadService,
    private messageService: MessageService,
    private tipoSolicitudService: TipoSolicitudService,
    private tipoCoberturaService: TipoCoberturaService,
    private tipoOrdenService:  TipoAtencionService,
    private menuService: MenuService,
    private detalleSolicitudService: DetalleRepSolicitudElecElecService,
    private domicilioService : DomicilioService
  ) 
  {

    this.options = [
      { label: 'Código', value: 'Id' },
      { label: 'Cédula', value: 'Ci' },
    ];

    this.cols = [
      { field: 'FECHA_REGISTRO', header: 'Fecha Registro', width: '5%' },
      { field: 'MES_REGISTRO', header: 'Mes Registro', width: '5%' },
      { field: 'ANIO_REGISTRO', header: 'Año Registro', width: '5%' },
      { field: 'FECHA_RECEPCION', header: 'Fecha Recibido', width: '5%' },
      { field: 'MES_RECIBIDO', header: 'Mes Recibido', width: '5%' },
      { field: 'ANIO_REGISTRO', header: 'Año Recibido', width: '5%' },
      { field: 'CODIGO_REGISTRO', header: 'Código Registro', width: '8%' },
      { field: 'CEDULA_TITULAR', header: 'Cédula Titular', width: '10%' },
      { field: 'NOMBRE_TITULAR', header: 'Nombre Titular', width: '10%' },
      { field: 'CEDULA_PACIENTE', header: 'Cédula Paciente', width: '5%' },
      { field: 'NOMBRE_PACIENTE', header: 'Nombre Paciente', width: '10%' },
      { field: 'PARENTESCO', header: 'Parentesco', width: '5%' },   
      { field: 'EDAD', header: 'Edad', width: '5%' },  
      { field: 'TELEFONO', header: 'Télefono', width: '5%' },
      { field: 'TELEFONO2', header: 'Télefono', width: '5%' },
      { field: 'TIPO_SOLICITUD', header: 'Tipo Solicitud', width: '8%' },
      { field: 'TIPO_DE_SOLICITUD', header: 'Tipo de Solicitud', width: '5%' },
      { field: 'CLASE_DE_DIAGNOSTICO', header: 'Clase Diagnóstico', width: '5%' },
      { field: 'DIAGNOSTICO_GENERAL', header: 'Diagnóstico General', width: '5%' },
      { field: 'DIAGNOSTICO_ESPECIFICO', header: 'Diagnóstico Específico', width: '5%' },
      { field: 'PROCEDIMIENTO_GENERAL', header: 'Procedimiento General', width: '5%' },     
      { field: 'PROCEDIMIENTO_ESPECIFICO', header: 'Procedimiento Específico', width: '5%' },
      { field: 'MEDICO_TRATANTE', header: 'Médico Tratante', width: '8%' },
      { field: 'ESPECIALIDAD', header: 'Especialidad', width: '8%' }, 
      { field: 'PRIORIDAD', header: 'Prioridad', width: '5%' },  
      { field: 'PROVEEDOR1', header: 'Proveedor 1', width: '5%' }, 
      { field: 'DOLARES_1', header: 'Dolares 1', width: '5%' }, 
      { field: 'BOLIVARES_1', header: 'bolivares 1', width: '5%' },
      { field: 'TIPO_DE_CAMBIO_1', header: 'Tasa cambio 1', width: '5%' },
      { field: 'PROVEEDOR_2', header: 'Proveedor 2', width: '5%' },  
      { field: 'DOLARES_2', header: 'Dolar 2', width: '5%' }, 
      { field: 'BOLIVARES_2', header: 'bolivares 2', width: '5%' },
      { field: 'TIPO_DE_CAMBIO_2', header: 'Tasa cambio 2', width: '5%' }, 
      { field: 'UBICACION_GEOGRAFICA', header: 'Ubicación Geográfica', width: '5%' }, 
      { field: 'ENTE_RESPONSABLE', header: 'Ente', width: '5%' },
      { field: 'ESTATUS_DE_SOLICITUD', header: 'Estado', width: '8%' },
      { field: 'CAUSA_ESTADO_SOLICITUD', header: 'Causa', width: '8%' },
      { field: 'OBSERVACION', header: 'Observación', width: '8%' },
      { field: 'USUARIO_CREADOR', header: 'Usuario', width: '5%' },
      { field: 'NOMBRE_CREADOR', header: 'Nombre', width: '8%' },
    ];



    this.es = this.config.es;
    this.option = this.options[0];
 

  }

  ngOnInit(): void 
  {

    this.total = 0;
    this.fullEstadoDropdown();
    this.fullDropdownTipoCobertura();
    this.fullDropdownTipoSolicitud();
    this.fullDropdownTipoOrden();
    this.fullDropdownEspecialidades();
    this.fullDropdownUser();
    this.fullDropdownDomicilios();
    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
    this.fecha = new Date();
    this.option = this.options[0];
    this.title = 'Solicitudes de Servicio : ' + ' ' + "Procedimientos Electivas"
  

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


  fullDropdownTipoCobertura() {
    this.tipoCoberturaService.getAllCombo()
      .toPromise()
      .then((results) => {
        this.tipoCoberturas= results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  fullDropdownDomicilios() {
    this.domicilioService.getAllCombo()
      .toPromise()
      .then((results) => {
        this.domicilios = results;
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
        //this.tipoOrdenes = aux.filter(x => x.tipo_atencion_id == this.menuService.getTipoAtencion());
//        this.tipoOrdenes = aux.filter(x => (x.nombre != "MEDICAMENTOS") && (x.nombre != "ONCOLOGICOS"));
         this.tipoOrdenes = results;


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
        this.tipoSolicitudes = results;
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

  fullEstadoDropdown() {

    this.estadoSolService.getAllCombo()
      .toPromise()
      .then(results => {
        this.estadosSolicitudes = results;
        //console.log(results);
      })
      .catch(err => { console.log(err) });
  }


  limpiar_variables_combos()
  {
    this.especialidadSelected=null;
    this.tipoSolicitudSelected=null;
    this.fecha_inicio=null;
    this.fecha_fin=null;
    this.user=null;
    this.cedula=null;
    this.request_id = null;

    this.reporte = [];
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
    delete this.parametros.fecha_fin;
    delete this.parametros.fecha_inicio;
    delete this.parametros.cedula_beneficiario;
    delete this.parametros.especialidad_id;
    delete this.parametros.estado_solicitud_id;
    delete this.parametros.tipo_cobertura_id;
    delete this.parametros.tipo_solicitud_id;
    delete this.parametros.solicitud_id;
    delete this.parametros.tipo_atencion_id;
    delete this.parametros.domicilio_id;


    this.reporte  = [];
  }


  consult()
  {
    this.loading = true;
    this.limpiar_parametros_back();
    this.reporte  = [];
    this.total = 0;

      if (this.option.value == 'Ci')
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
               this.reporte  = [];
               this.total = 0;

           }
           else
           {

            this.parametros.cedula_beneficiario= this.cedula;
            this.parametros.fecha_inicio=formatDate(this.fecha_inicio, format, locale);
            this.parametros.fecha_fin=formatDate(this.fecha_fin, format, locale);
            if (this.tipoCoberturasSelected!=undefined)
            {
              this.parametros.tipo_cobertura_id=this.tipoCoberturasSelected;
            }
            if (this.especialidadSelected !=undefined)
            {
              this.parametros.especialidad_id=this.especialidadSelected;
            }
            if (this.estadoSolicitudSelected !=undefined)
            {
              this.parametros.estado_solicitud_id=this.estadoSolicitudSelected;
            }

            if (this.domicilioSelected !=undefined)
            {
              this.parametros.domicilio_id=this.domicilioSelected;
            }

              this.parametros.tipo_solicitud_id = this.menuService.getTipoSolicitud();
              this.parametros.tipo_atencion_id = this.tipoAtencion;

            if (  this.user !=undefined)
            {
              this.parametros.usuario_creador = this.user;
            }

        }
      }
      else
      {
        this.parametros.solicitud_id= this.request_id;
      }


    let format = 'yyyy-MM-dd';
    const locale = 'en-ES';
    let date: Date = new Date();


    this.detalleSolicitudService.ReportByParametrosSolicitud_Servicio(this.parametros)
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
      this.exportConfiguracion('Reporte Solicitud', formatDate(this.fecha, format, locale), formatDate(this.fecha, format, locale), this.total);
    }).catch((err) => {
      console.log(err);
      this.loading = false;
      this.showError('Ha ocurrido un error');
    });
}


  change() {
    this.limpiar_parametros_back();
    this.limpiar_variables_combos();
    if (this.option.value == 'Ci') {
      this.flag = true;
      this.request_id = null;
     } else {
      this.flag = false;
      this.cedula = null;
      this.fecha_inicio = null;
      this.fecha_fin = null;
    }
  }


  exportConfiguracion(servicio: string, fecha: any, date: any, total: number) 
  {
    //ESPECIFICACIONES DE REPORTE para la propiedad "export" del componente app-basic-table

    //Encabezado para reporte
    let format = 'dd-MM-yyyy';
    const locale = 'en-ES';


    this.encabezado =
          [
              ['Sidor C.A.',15,20],
              ['REPORTE DE SOLICITUDES',100, 20],
              ['Fecha de impresión: ' + formatDate(this.fecha, format, locale), 200, 20],
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
      totales: null
    };

  }

  private showError(errMsg: string) 
  {
    this.messageService.clear();
    this.messageService.add({ key: 'tc', severity: 'error', summary: errMsg });
  }




}
