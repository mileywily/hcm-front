import { Component, OnInit } from '@angular/core';
import {
  SitioService,
  TipoSolicitudService,
  EstadoSolicitudService,
  GlobalService,
  TipoCoberturaService,
  SolicitudService,
  EspecialidadService,
  DetalleRepSolicitudService,
  TipoAtencionService,
  MenuService,
  GrupoServicioService,
  GrupoService,
  DomicilioService
} from 'src/app/services';
import { formatDate } from '@angular/common';
import {
  TipoCobertura,
  TipoSolicitud,
  TipoAtencion,
  Especialidad,
  EstadoSolicitud,
  RepSolicitud,
  UserAtencion,
  Domicilio
} from 'src/app/models';
import { MessageService } from 'primeng/api';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-servicios-solicitud-abiertas-img',
  templateUrl: './servicios-solicitud-abiertas-img.component.html',
  styleUrls: ['./servicios-solicitud-abiertas-img.component.scss'],
  providers: [DatePipe,MessageService]
})
export class ServiciosSolicitudAbiertasImgComponent implements OnInit {

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

  requerimientoSelected:TipoAtencion;
  requerimientos: TipoAtencion[];

  parametros:RepSolicitud={"id":-1};
    //Servicios asociados a estudios especiales
    servicioSolicitado: any;
    serviciosSolicitados: any[];
     //Grupos solicitados para imagenes
   grupos: GrupoService[];

   grupoId:any;

  grupoSelected: any;
  serviciosSolicitadosSel: any[];

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
  tipoGrupo: any;


  constructor
  (
    private config: GlobalService,
    private sitioService: SitioService,
    private tipoOrdenService: TipoSolicitudService,
    private estadoSolService: EstadoSolicitudService,
    private especialidadService : EspecialidadService,
    private messageService: MessageService,
    private menuService: MenuService,
    private tipoSolicitudService: TipoSolicitudService,
    private tipoCoberturaService: TipoCoberturaService,
    private requerimientoService: TipoAtencionService,
    private detalleSolicitudService: DetalleRepSolicitudService,
    private grupoServicioService: GrupoServicioService,
    private grupoService: GrupoService,
    private domicilioService : DomicilioService

  ) 
  {
    this.options = [
      { label: 'Código', value: 'Id' },
      { label: 'Cédula', value: 'Ci' },
    ];

    this.cols = [
      { field: 'mes_solicitud', header: 'Mes Solicitud', width: '5%' },
      { field: 'fecha_solicitud', header: 'Fecha', width: '5%' },
      { field: 'solicitud_id', header: 'Solicitud', width: '10%' },
      { field: 'tipo_solicitud', header: 'Tipo', width: '8%' },
      { field: 'estado_solicitud', header: 'Estado', width: '8%' },
      { field: 'nombre_tipo_atencion', header: 'Requerimiento', width: '5%' },
      { field: 'nombre_grupo', header: 'Grupo', width: '2%' },
      { field: 'servicio_nom', header: 'Servicio', width: '2%' },
      { field: 'especialidad', header: 'Especialidad', width: '10%' },
      { field: 'cedula_titular', header: 'Titular', width: '10%' },
      { field: 'cedula_beneficiario', header: 'Beneficiario', width: '5%' },
      { field: 'nombre_beneficiario', header: 'Nombre Beneficiario', width: '10%' },
      { field: 'telefono', header: 'Télefono', width: '5%' },
      { field: 'telefono2', header: 'Télefono', width: '5%' },
      { field: 'observacion', header: 'Observación', width: '10%' },
      { field: 'usuario_creador', header: 'Usuario', width: '5%' },
      { field: 'nombre_creador', header: 'Nombre', width: '10%' },
      { field: 'nombre_domicilio', header: 'Domicilio', width: '5%' },
    ];

    
  
    this.tipoSolicitudService
    .getById(this.menuService.getTipoSolicitud())
    .toPromise()
    .then((results) => {
      this.tipoSolicitudSelected = results;
    
    })
    .catch((err) => {
      console.log(err);
    });
    this.es = this.config.es;
    this.option = this.options[0];
    if (this.menuService.getTipoAtencion() == 3){
      this.tipoGrupo = 1;   //Grupos de imagenes

    };

    if (this.menuService.getTipoAtencion() == 4){
        this.tipoGrupo  = 2;   //Servicio de laboratorio
    };

   }

  ngOnInit(): void {
    this.total = 0;
    this.fullDropdownTipoCobertura();
    this.fullDropdownRequerimiento();
    this.fullDropdownEspecialidades();
    this.fullDropdownUser();
    this.fullDropdownDomicilios();
    this.dropdownGrupo();
    this.dropdownServiciosPorGrupo();
    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
    this.fecha = new Date();
    this.option = this.options[0];

    this.requerimientoService.getAllByTipoSolicitud(this.menuService.getTipoSolicitud())
    .toPromise()
    .then((results) => {
      let aux_req=[];
      let requerimiento;
      aux_req = results;
      requerimiento = aux_req.filter(x => x.tipo_atencion_id == this.menuService.getTipoAtencion());
      this.title = 'Solicitudes Abiertas de ' + requerimiento[0]['nombre'] +   '  por Servicio: ' ;
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

  

  fullDropdownRequerimiento() {
    //cambiar cuando se implementen los otros módulos !!!!!!!!!!!!!!!!!
    //sólo triaje por el momentto
    this.requerimientoService.getAllByTipoSolicitud(this.menuService.getTipoSolicitud())
      .toPromise()
      .then((results) => {
        let aux_req
        
        this.requerimientos = results;
        
        this.requerimientos = aux_req.filter(x => x.requerimiento_id == this.menuService.getTipoAtencion);
        
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
    this.grupoSelected = null;
    this.reporte = [];
    this.serviciosSolicitadosSel = null;
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
    delete this.parametros.grupo_id;
    delete this.parametros.servicio_id;
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
                  this.loading = false;
                  return;
            }

           if (formatDate( this.fecha_inicio, format, locale) > formatDate( this.fecha_fin, format, locale))
           {
               this.showError("La fecha desde de la consulta debe ser mayor o igual a la fecha hasta");
               this.reporte  = [];
               this.total = 0;
               this.loading = false;

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

            if (this.domicilioSelected !=undefined)
              {
                this.parametros.domicilio_id=this.domicilioSelected;
              }
              
            if (this.estadoSolicitudSelected !=undefined)
            {
              this.parametros.estado_solicitud_id=this.estadoSolicitudSelected;
            }

            this.parametros.tipo_solicitud_id = this.menuService.getTipoSolicitud();

           
            this.parametros.tipo_atencion_id = this.menuService.getTipoAtencion();

            if (  this.user !=undefined)
            {
              this.parametros.usuario_creador = this.user;
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
  }
  else
  {
    this.parametros.solicitud_id= this.request_id;


  }


  let format = 'yyyy-MM-dd';
  const locale = 'en-ES';
  let date: Date = new Date();
  console.log(this.parametros);
  this.detalleSolicitudService.ReportByParametrosSolicitudesAbiertasImagen(this.parametros)
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

  private showError(errMsg: string) {
    this.messageService.clear();
    this.messageService.add({ key: 'tc', severity: 'error', summary: errMsg });
  }

}

