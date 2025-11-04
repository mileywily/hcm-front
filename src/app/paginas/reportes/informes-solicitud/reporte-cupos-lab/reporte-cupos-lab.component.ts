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
  GrupoServicioService,
  ServicioTipoAtencionService
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
  selector: 'app-reporte-cupos-lab',
  templateUrl: './reporte-cupos-lab.component.html',
  styleUrls: ['./reporte-cupos-lab.component.scss'],
  providers: [MessageService]
})
export class ReporteCuposLabComponent implements OnInit {

  
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
  texto_encabezado : any;


  nombre_medico: any;
  nombre_especialidad: any;
  nombre_proveedor:any;
  nombre_servicio : any;

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
    private grupoServicioService: GrupoServicioService,
    private serviciotipoatencion: ServicioTipoAtencionService
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
      { field: 'grupo', header: 'Grupo', width: '8%' },
      { field: 'examen', header: 'Examen', width: '8%' },
      { field: 'telefono', header: 'Telefono', width: '10%' },
      { field: 'fecha_atencion', header: 'Fecha Solicitud', width: '8%' },
      { field: 'fecha_cita', header: 'Cita', width: '8%' },
      { field: 'turno', header: 'Turno', width: '10%' },
      { field: 'prioridad_id', header: 'Prioridad', width: '8%' }

    ];

    this.columna_agrupado = [
      { field: 'atencion_id', header: 'Orden', width: '6%' },
      { field: 'grupo', header: 'Grupo', width: '8%' },
      { field: 'examen', header: 'Examen', width: '8%' },
      { field: 'telefono', header: 'Telefono', width: '10%' },
      { field: 'fecha_atencion', header: 'Fecha Solicitud', width: '8%' },
      { field: 'fecha_cita', header: 'Cita', width: '8%' },
      { field: 'turno', header: 'Turno', width: '10%' },
      { field: 'prioridad_id', header: 'Prioridad', width: '8%' },

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
    this.nombre_servicio="";
    this.nombre_proveedor="";
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
        let aux_prov=[];
        aux_prov=  results;

        this.proveedores = aux_prov.filter(x => x.tipo_proveedor_nombre == "Laboratorios");
        

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

    this.serviciotipoatencion
    .getAllByAtencion(this.menuService.getTipoAtencion())
    .toPromise()
    .then((results) => {
      this.servicios = results;

        if (results){
         let aux=[];
        aux=results;
        this.nombre_servicio = aux[0]['nombre_servicio'];
        this.texto_encabezado ="Servicio:  "+ this.nombre_servicio + " - Proveedor:" +this.nombre_proveedor;

      }
    })
    .catch((err) => {
      console.log(err);
    });


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
        this.texto_encabezado ="Servicio:  "+ this.nombre_servicio + " - Proveedor:" +this.nombre_proveedor;
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
            if (  this.proveedorSelected !=undefined)
            {
              this.parametros.proveedor_id = this.proveedorSelected;
            }
            if (  this.grupoSelected !=undefined)
            {
              this.parametros.servicio_id = this.grupoSelected;
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

    this.reporteMedico = this.reporte.map(col => ({
      id: col.id,
      cedula_beneficiario: col.cedula_beneficiario,
      nombres: col.nombre_beneficiario,
      servicio_nombre: col.servicio_nombre,
      orden: col.atencion_id,
      grupo : col.grupo,
      examen : col.examen,
      fecha_solicitud: col.fecha_atencion,
      fecha_cita: col.fecha_cita,
      telefono: col.telefono,
      turno: col.turno,
      prioridad: col.prioridad_id,
      cedula_titular: col.cedula_titular,
      nombre_titular: col.nombre_titular
  
    }));
    let total: number = 0;
    this.reporte.forEach(element => {
      total += 1;
    });
    this.loading = false;
    return total;
  })
  .then(total => {
    this.total = total;
  //  this.exportConfiguracion('Reporte Cupos', formatDate(this.fecha, format, locale), formatDate(this.fecha, format, locale), this.total);
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
