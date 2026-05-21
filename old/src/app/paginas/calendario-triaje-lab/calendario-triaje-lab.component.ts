import { OrdenServicioService } from '../../services/orden-servicio.service';
import { CuposService } from '../../services/cupos.service';
import { CalendarioService } from '../../services/calendario.service';
import { Component, OnInit } from '@angular/core';
import { 
  TurnoService,
  MenuService,
  TipoAtencionService,
  ProveedorService,
  GrupoService,
  GrupoServicioService,
  ServicioTipoAtencionService
} from 'src/app/services';
import { FormGroup, FormBuilder } from '@angular/forms';
import {
  CalendarOptions
} from '@fullcalendar/angular';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-calendario-triaje-lab',
  templateUrl: './calendario-triaje-lab.component.html',
  styleUrls: ['./calendario-triaje-lab.component.scss']
})
export class CalendarioTriajeLabComponent implements OnInit {

  title: string;
  form: FormGroup;

  turnos: any[];
  servicios: any[];

  datos: any = {};

  flag: boolean = true;
  selected: any = {};
  displayHelp: boolean = false;

  disabledFlag: boolean = true;

  tipoAtencionId: any;
  tipoAtencion: any;

  proveedores: any[];
  grupos: any[];
  tipoGrupo: any;
  tipoProveedor: any;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    eventClick: this.handleEventClick.bind(this),
    views: {
      today: {
        buttonText: 'Hoy',
      },
      dayGridMonth: {
        buttonText: 'Mes',
      },
      timeGridWeek: {
        buttonText: 'Semana',
      },
      timeGridDay: {
        buttonText: 'Día',
      },
    },
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth',
    },
    editable: false,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    locale: 've',
  };

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private cuposService: CuposService,
    private turnoService: TurnoService,
    private activatedRoute: ActivatedRoute,
    private ordenService: OrdenServicioService,
    private calendarioService: CalendarioService,
    private menuService: MenuService,
    private tipoAtencionService: TipoAtencionService, 
    private proveedorService: ProveedorService, 
    private grupoService: GrupoService,
    private grupoServicioService: GrupoServicioService,
    private servicioTipoAtencionService: ServicioTipoAtencionService
  ) 
  {
    this.tipoAtencionId  = this.menuService.getTipoAtencion();


      // cupos de LABORATORIO
        this.tipoGrupo = 2;
        this.tipoProveedor = 3;
    

    this.tipoAtencionService
    .getById(this.tipoAtencionId)
    .toPromise()
    .then((results) => {
      this.tipoAtencion = results;
      this.title = 'Calendario ' +  this.tipoAtencion.nombre;
    })
    .catch((err) => {
      console.log(err);
    });



   }

  ngOnInit(): void 
  {

    let action = this.activatedRoute.snapshot.params.action;
    this.flag = action == 'A' ? true : false;

    if (this.flag) {
      this.datos = this.calendarioService.getParams();
      this.disabledFlag = false;
      this.datos.turno_id = null;
    }

    this.createForm();
     console.log("calendario-lab");
    this.dropdownProveedor();
    this.dropdownGrupo();
    this.dropdownServicios();
    this.dropdownT();
    this.consult();

  }

  ngOnDestroy() {
    this.calendarioService.setParams({});
  }
  
  dropdownT() {
    this.turnoService
      .getAll()
      .toPromise()
      .then((results) => {
        this.turnos = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  dropdownProveedor() {
    this.proveedorService
      .getProveedorByTipo(this.tipoProveedor)
      .toPromise()
      .then((results) => {
        this.proveedores = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  dropdownGrupo() {

      this.grupos = [];


  }

  dropdownServicios() {

      this.servicioTipoAtencionService
      .getAllByAtencion(this.tipoAtencionId)
      .toPromise()
      .then((results) => {
        this.servicios = results;
        this.datos.servicio_id = this.servicios[0].value;
      })
      .catch((err) => {
        console.log(err);
      });
    

  }


  createForm() {
    this.form = this.fb.group({
      proveedor: [''],
      grupo: [''],
      turno: [''],
      telefono: [''],
      servicio: [''],
    });
  }

 grupoChange() {
    if (!this.datos.servicio_id) {
      this.calendarOptions.events = [];
     }

  }


  change()
   {
      this.consult();
   }

  consult() {

    this.datos.asignar = this.flag;
    this.datos.tipo_atencion_id = this.tipoAtencionId;

    this.cuposService
      .getCalendarioLab(this.datos)
      .toPromise()
      .then((results) => {
        this.calendarOptions.events = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleEventClick(arg) {
    this.selected = { ...arg.event.extendedProps };
    this.displayChange(true);
  }

  /** Manejadores del dialog  */

  displayChange(value: boolean) {
    this.displayHelp = value;
  }

  selectedC(value) {
    this.ordenService.setCupo(value);
    this.back();
  }

  back() {
    this.location.back();
  }
}
