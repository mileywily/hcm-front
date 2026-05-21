import { OrdenServicioService } from '../../services/orden-servicio.service';
import { CuposService } from '../../services/cupos.service';
import { CalendarioService } from '../../services/calendario.service';
import { MedicoEspecialidadService } from 'src/app/services/medico-especialidad.service';
import { EspecialidadService } from 'src/app/services/especialidad.service';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { 
  ServicioEspecialidadService, 
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
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
  EventApi,
  Dictionary,
} from '@fullcalendar/angular';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-calendario-triaje',
  templateUrl: './calendario-triaje.component.html',
  styleUrls: ['./calendario-triaje.component.scss'],
})
export class CalendarioTriajeComponent implements OnInit, OnDestroy {
  title: string;
  form: FormGroup;

  especialidades: any[];
  medicos: any[];
  turnos: any[];
  servicios: any[];

  datos: any = {};
  medico: any = {};

  flag: boolean = true;
  selected: any = {};
  displayHelp: boolean = false;

  disabledFlag: boolean = true;

  tipoAtencionId: any;
  tipoAtencion: any;

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
    private medicoService: MedicoEspecialidadService,
    private especialidadService: EspecialidadService,
    private servicioEspecialidad: ServicioEspecialidadService,
    private menuService: MenuService,
    private tipoAtencionService:  TipoAtencionService

  ) {

    this.tipoAtencionId  = this.menuService.getTipoAtencion();

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

  ngOnInit() {
    let action = this.activatedRoute.snapshot.params.action;
    this.flag = action == 'A' ? true : false;

    // //ESTO ES SOLO POR PRUEBAS
    // this.calendarioService.setParams({
    //   especialidad_id: '1',
    //   medico_id: '43',
    //   servicio_id: '2'
    // });

    if (this.flag) {
      this.datos = this.calendarioService.getParams();
      this.disabledFlag = false;

    }

    //console.log('DATOS EN EL ONINIT DEL CALENDARIO: ', this.datos);


    this.createForm();
    this.dropdownE();
    this.dropdownM();
    this.dropdownT();
    this.dropdownS();
    this.consult();
  }

  ngOnDestroy() {
    this.calendarioService.setParams({});
  }

  dropdownS() {
    this.servicioEspecialidad
      .getAllByEspecialidadTipo(this.datos.especialidad_id, this.tipoAtencionId)
      .toPromise()
      .then((results) => {
        this.servicios = results;
        // console.log('servicios: ', this.servicios);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  
  dropdownT() {
    this.turnoService
      .getAll()
      .toPromise()
      .then((results) => {
        this.turnos = results;
        // console.log('turnos: ', this.turnos);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  dropdownM() {
    this.medicoService
      .getMedicoByEspecialidad(this.datos.especialidad_id)
      .toPromise()
      .then((results) => {
        this.medicos = results;
        // console.log('medicos: ', this.medicos);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  dropdownE() {
    this.especialidadService
      .getAllCombo()
      .toPromise()
      .then((results) => {
        this.especialidades = results;
        // console.log('especialidades: ', this.especialidades);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createForm() {
    this.form = this.fb.group({
      especialidad: [''],
      medico: [''],
      turno: [''],
      telefono: [''],
      servicio: [''],
    });
  }

  medicoChange() {
    if (this.datos.medico_id) {
      let x = this.medicos.filter((x) => (x.medico_id = this.datos.medico_id));
      if (x) this.medico = x[0];

      // if (this.datos.medico_id && this.datos.especialidad_id) {
      //   this.consult();
      //   // this.dropdownS();
      // }

      this.change();
    } else {
      this.calendarOptions.events = [];
      this.medico = {};
    }
  }

  change() {
    if (this.datos.servicio_id && this.datos.medico_id ) this.consult();
  }

  consult() {
    
    this.datos.asignar = this.flag;
    this.datos.tipo_atencion_id = this.tipoAtencionId;

    //console.log("datos en calendario al consultar:", this.datos);
    

    this.cuposService
      .getCalendario(this.datos)
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
    // console.log('Seleccione cupo:', value);
    this.ordenService.setCupo(value);
    this.back();
  }

  back() {
    this.location.back();
  }
}
