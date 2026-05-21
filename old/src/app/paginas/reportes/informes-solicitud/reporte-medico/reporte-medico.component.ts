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
  MenuService
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
  selector: 'app-reporte-medico',
  templateUrl: './reporte-medico.component.html',
  styleUrls: ['./reporte-medico.component.scss'],
  providers: [MessageService]
})
export class ReporteMedicoComponent implements OnInit {

  es: any;
  title: any;
  cols: any[];
  columna_agrupado: any[];
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

  reporteMedico: ReporteMedico[];
  tipoAtencion: any;
  texto_encabezado : any;

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
    private menuService:  MenuService
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
      { field: 'nombre_beneficiario', header: 'Beneficiario', width: '10%' },
      { field: 'cedula_titular', header: 'Cédula Titular', width: '8%' },
      { field: 'nombre_titular', header: 'Nombre Titular', width: '8%' },
      { field: 'atencion_id', header: 'Orden', width: '6%' },
      { field: 'especialidad_nombre', header: 'Especialidad', width: '10%' },
      { field: 'medico_nombre', header: 'Medico', width: '10%' },
      { field: 'servicio_nombre', header: 'Servicio', width: '8%' },
      { field: 'telefono', header: 'Telefono', width: '10%' },
      { field: 'fecha_atencion', header: 'Fecha Solicitud', width: '8%' },
      { field: 'turno', header: 'Turno', width: '8%' },
      { field: 'fecha_cita', header: 'Cita', width: '8%' },

      
    ];

    this.columna_agrupado = [
      { field: 'atencion_id', header: 'Orden', width: '6%' },
      { field: 'servicio_nombre', header: 'Servicio', width: '8%' },
      { field: 'telefono', header: 'Telefono', width: '10%' },
      { field: 'fecha_atencion', header: 'Fecha Solicitud', width: '8%' },
      { field: 'fecha_cita', header: 'Cita', width: '8%' },
      { field: 'turno', header: 'Turno', width: '8%' },
    ];

    //this.title = "Reporte Medico";
    this.es = this.config.es;
    this.autoLayout=true;

    this.tipoOrdenService
    .getById(this.menuService.getTipoAtencion())
    .toPromise()
    .then((results) => {
      this.tipoAtencion = results;
      this.title = 'Reporte Médico: ' + this.tipoAtencion.nombre;
    })
    .catch((err) => {
      console.log(err);
    });
    

  }

  ngOnInit(): void
  {

    this.medicos=[];
    this.total = 0;
    this.fullDropdownTipoOrden();
    this.fullDropdownEspecialidades();
    this.fullDropdownSitios();
    this.fullDropdownTurno();
    this.fecha = new Date();
    this.option = this.options[2];
    this.change();
    this.flag = false;
    this.flagorden=false;

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
            this.servicios = aux.filter(x => x.tipo_atencion_id == this.menuService.getTipoAtencion());
          }
        })
        .catch((err) => {
          console.log(err);
        });

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
        this.texto_encabezado ="Especialidad:  "+ this.nombre_especialidad + " - Medico:" +this.nombre_medico;
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
         this.loading = true;
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
            
            //console.log("parametros",this.parametros);

  this.detalleSolicitudService.getRequestsReportmedicoByParametros(this.parametros)
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

    this.reporteMedico = this.reporte.map(col => ({
      especialidad: col.especialidad_nombre,
      medico: col.medico_nombre,
      id: col.id,
      cedula_beneficiario: col.cedula_beneficiario,
      nombres: col.nombre_beneficiario,
      orden:col.atencion_id,
      servicio_nombre: col.servicio_nombre,
      telefono: col.telefono,
      fecha_solicitud: col.fecha_atencion,
      fecha_cita: col.fecha_cita,
      turno: col.turno,
      cedula_titular: col.cedula_titular,
      nombre_titular: col.nombre_titular
    }));


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
    //this.exportConfiguracion('Reporte Medico', formatDate(this.fecha, format, locale), formatDate(this.fecha, format, locale), this.total);
  }).catch((err) => {
    console.log(err);
    this.loading = false;
    this.showError('Ha ocurrido un error');
  });
}




change() {

      this.flag = false;
      this.flagorden=true;
      this.flagsolicitud=true;
      this.limpiar_variables_combos();
      this.limpiar_parametros_back();
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



