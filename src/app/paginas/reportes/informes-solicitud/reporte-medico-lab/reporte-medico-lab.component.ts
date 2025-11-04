import { Component, OnInit } from '@angular/core';
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
  ServicioMedicoService,
  MedicoEspecialidadService,
  TurnoService,
  ServicioEspecialidadService,
  MenuService,
  ProveedorService,
  GrupoService,
  GrupoServicioService
}
from 'src/app/services';
import {
  Sitio,
  TipoAtencion,
  EstadoSolicitud,
  Especialidad,
  Prioridad,
  ReporteOrden,
  Medico,
  EstadoAtencion,
  Turno,
  ReporteMedico
 }
from 'src/app/models';
import { MessageService } from 'primeng/api';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-reporte-medico-lab',
  templateUrl: './reporte-medico-lab.component.html',
  styleUrls: ['./reporte-medico-lab.component.scss'],
  providers: [MessageService]
})
export class ReporteMedicoLabComponent implements OnInit {

  
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

  tipoOrden: TipoAtencion;
  tipoOrdenes: TipoAtencion[];

  prioridad:  Prioridad;
  prioridades: Prioridad[];

  tipoAtencionSelected:any;
  tiposAtencion: TipoAtencion[];

  estadoOrden: EstadoAtencion;
  estadoOrdenes: EstadoAtencion[];

  estadoSolicitudSelected:any;
  estadosSolicitud: EstadoSolicitud[];

  especialidadSelected:any;
  especialidades: Especialidad[];

  medico: Medico;
  medicos: Medico[];

  servicio: any;
  servicios: any[];

  turno: any;
  turnos: any[];

  orden: any = {};

  parametros:ReporteOrden={"id":-1};

  loading: boolean;

  habilitaExcel: boolean = true;

  fecha_inicio: any = new Date();
  fecha_fin: any = new Date();
  fecha_cita: any = new Date();
  flag: boolean = true;
  flagorden: boolean = false;
  flagsolicitud: boolean = false;
  fecha: Date;

  //Variables para el manejo del reporte
  exportColumns: any[];
  encabezado: any[];  //encabezado del reporte
  pdfPropiedades: any = {};
  arrayTotales: any[];
  nombre: any;
  rowGroupMetadata: any;
  rowGroupMetadata2: any;


  nombre_medico: any;
  nombre_especialidad: any;
  nombre_proveedor:any;

  reporteMedico: ReporteMedico[];
  tipoAtencion: any;

  proveedorSelected: any;
  proveedores: any[];
  tipoGrupo: any;

  grupos: GrupoService[];
  grupoSelected: GrupoService;

  servicioSolicitado: ServicioEspecialidadService;
  serviciosSolicitados: ServicioEspecialidadService[];
  serviciosSolicitadosSel: any[];

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
    private servicioMedicoService: ServicioMedicoService,
    private turnoService: TurnoService,
    private servicioEspecialidadService: ServicioEspecialidadService,
    private menuService:  MenuService,
    private proveedorService: ProveedorService,
    private grupoService: GrupoService,
    private grupoServicioService: GrupoServicioService
  ) 
  { 

    this.options = [
      { label: '', value: 'Id' },
      { label: '', value: 'IdOrden' },
      { label: '', value: 'Ci' }
    ];

    this.cols = [
      { field: 'id', header: 'Nro', width: '8%' },
      { field: 'cedula_beneficiario', header: 'Cédula', width: '8%' },
      { field: 'nombres', header: 'Beneficiario', width: '10%' },
      { field: 'telefono', header: 'Telefono', width: '10%' },
      { field: 'atencion_id', header: 'Orden', width: '6%' },
      { field: 'especialidad_nombre', header: 'Especialidad', width: '10%' },
      { field: 'medico_nombre', header: 'Medico', width: '10%' },
      { field: 'servicio_nombre', header: 'Servicio', width: '8%' },
      { field: 'fecha_cita', header: 'Cita', width: '8%' },
    ];

    //this.title = "Reporte Medico";
    this.es = this.config.es;
    this.autoLayout=true;

    this.tipoOrdenService
    .getById(this.menuService.getTipoAtencion())
    .toPromise()
    .then((results) => {
      this.tipoAtencion = results;
      this.title = 'Reporte Cupos: ' + this.tipoAtencion.nombre;
    })
    .catch((err) => {
      console.log(err);
    });
    
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
    this.dropdownProveedor();
    this.fullDropdownTipoOrden();
    this.fullDropdownEspecialidades();
    this.fullDropdownSitios();
    this.fullDropdownTurno();
    this.fecha = new Date();
    this.option = this.options[2];
    this.change();
    this.flag = false;
    this.flagorden=false;
    this.dropdownGrupo();
    this.dropdownServicios();

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

  fullDropdownTurno() {
    this.turnoService.getAll()
      .toPromise()
      .then((results) => {
        this.turnos = results;
        console.log("turno",this.turnos);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  editar(registroActual: any) {
    console.log("solicitud"+ registroActual.solicitud_id);
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

        if (this.especialidades){
          let aux=[];
          let especialidad;

          aux= this.especialidades;

          especialidad = aux.filter(x => x.especialidad_id == this.especialidadSelected);
          this.nombre_especialidad =  especialidad[0]['nombre'];
        }

        this.nombre_medico= null;

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
      this.flagorden=true;
    }
    else
    {
      this.flagorden=false;
    }


    if (this.especialidadSelected){

      this.servicioEspecialidadService
        .getAllByEspecialidad(Number(this.especialidadSelected))
        .toPromise()
        .then((results) => {
          this.servicios = results;

            if (results){
             let aux=[];
            aux=results;
            this.servicios = aux.filter(x => x.tipo_atencion_id == this.orden.tipo_atencion_id);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      }
  }

  proveedorOnchange()
  {
    if (this.proveedores)
    {
        let aux=[];
        let provedor;
        aux= this.proveedores;
        provedor = aux.filter(x => x.proveedor_id == this.proveedorSelected);
        this.nombre_proveedor =  provedor[0]['nombre'] ;
    }
  }

  medicoOnchange()
  {
    if (this.medicos)
    {
        let aux=[];
        let medico;
        aux= this.medicos;
        medico = aux.filter(x => x.medico_id == this.orden.medico_id);
        this.nombre_medico =  medico[0]['nombres'] + ' '  +  medico[0]['apellidos'];
    }
  }

  fullDropdownServicios()
  {
      this.servicioService
        .getAllCombo()
        .toPromise()
        .then((results) =>
        {
          this.servicios = results;
        })
        .catch((err) => {
          console.log(err);
        });
  }

  fullDropdownSitios()
  {
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
    this.fecha_cita=null;
    this.request_id = null;
    this.orden_id = null;
    this.reporte  = [];
    this.reporteMedico   = [];
    this.total = 0;
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
    delete this.parametros.fecha_cita;
    delete this.parametros.turno_id;
    delete this.parametros.is_automatica;
    this.reporte  = [];
    this.reporteMedico   = [];
    this.total = 0;
  }

  consult()
  {
         let format = 'yyyy-MM-dd';
         const locale = 'en-ES';
         let date: Date = new Date();
         this.limpiar_parametros_back();


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

            if (  this.orden.turno_id !=undefined)
            {
              this.parametros.turno_id = this.orden.turno_id;
            }

            this.orden.tipo_atencion_id=this.menuService.getTipoAtencion();

            if (  this.orden.tipo_atencion_id !=undefined)
            {
               this.parametros.tipo_atencion_id = this.orden.tipo_atencion_id;
               if (  this.orden.tipo_atencion_id ==2)
               {
                  this.parametros.is_automatica = 1;
               }
               else
               {
                this.parametros.is_automatica = 0;
               }

            }

            console.log("parametros",this.parametros);
  this.detalleSolicitudService.ReportCuposLaboratorio(this.parametros)
  .toPromise()
  .then(results => {

    let listaBeneficiarios = [...new Set(results.map(it => it.beneficiario_id))]; // lista de sectores
    let cont = 1;

    for (let idBeneficiario of listaBeneficiarios) {

      results.forEach((value) => {
        if (value.beneficiario_id === idBeneficiario) {

          value.id = cont;
        }

      });

          cont = cont + 1;
    }

    this.reporte = results;

    this.habilitaExcel = this.reporte.length>0 ? false : true;

    this.updateRowGroupMetaData();
    let total: number = 0;
    this.reporte.forEach(element => {
      total += 1;
    });
    this.loading = false;
    return total;
  })
  .then(total => {
    this.total = total;
    this.exportConfiguracion('Reporte Cupos', formatDate(this.fecha, format, locale), formatDate(this.fecha, format, locale), this.total);
  }).catch((err) => {
    console.log(err);
    this.showError('Ha ocurrido un error');
  });
}



exportExcel() {

  this.reporteMedico = this.reporte.map(col => ({
    id: col.id,
    cedula_beneficiario: col.cedula_beneficiario,
    nombres: col.nombres,
    servicio_nombre: col.servicio_nombre,
    sitio_nombre: col.sitio_nombre,
    fecha_cita: col.fecha_cita,
    telefono: col.telefono,
    turno: col.turno

  }));

  import('xlsx').then(xlsx => {
    const worksheet = xlsx.utils.json_to_sheet(this.reporteMedico);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = xlsx.write(workbook, {
      bookType: 'xls',
      type: 'array'
    });
    this.saveAsExcelFile(excelBuffer, 'reporte');
  });
}

saveAsExcelFile(buffer: any, fileName: string): void {
  import('file-saver').then(FileSaver => {
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xls';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(
      data,
      fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
    );
  });
}



change() {

      this.flag = false;
      this.flagorden=true;
      this.flagsolicitud=true;
      this.limpiar_variables_combos();
      this.limpiar_parametros_back();
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

  private showError(errMsg: string) {
    this.messageService.clear();
    this.messageService.add({ key: 'tc', severity: 'error', summary: errMsg });
  }

  updateRowGroupMetaData() {
    this.rowGroupMetadata = {};

    if (this.reporte) {
        for (let i = 0; i < this.reporte.length; i++) {
            let j =1;
            let rowData = this.reporte[i];
            let id = rowData.id;
            if (i == 0) {
              
                this.rowGroupMetadata[id] =
                { index: 0,
                  size: 1

                 };
            }
            else {
                let previousRowData = this.reporte[i - 1];
                let previousRowGroup = previousRowData.id;

                if (id === previousRowGroup)
                {
                    this.rowGroupMetadata[id].size++;
                    this.rowGroupMetadata[id].row++;
                }
                else
                {

                this.rowGroupMetadata[id] =
                    { index: i,
                      size: 1

                    };
            }
          }
        }
    }

}



}
