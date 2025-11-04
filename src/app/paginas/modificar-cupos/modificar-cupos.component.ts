import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CalendarOptions } from '@fullcalendar/angular';
import { GlobalService } from './../../services/global.service';
import { SitioService } from './../../services/sitio.service';
import { DatePipe } from '@angular/common';

import {
  CuposService,
  TurnoService,
  MedicoService,
  MedicoEspecialidadService,
  ServicioMedicoService,
  ServicioEspecialidadService,
  AuthService, 
  MenuService,
  TipoAtencionService
} from 'src/app/services';
@Component({
  selector: 'app-modificar-cupos',
  templateUrl: './modificar-cupos.component.html',
  styleUrls: ['./modificar-cupos.component.scss'],
  providers: [DatePipe, MessageService, ConfirmationService],
})
export class ModificarCuposComponent implements OnInit {
  title: string;
  es: any;
  submitted: boolean;
  blocked: boolean = false;

  especialidades: any[];
  medicos: any[];
  turnos: any[];
  
  turnoscambio: any[];
  sitios: any[];
  servicios: any[];

  datos: any = {};
  myForm: FormGroup;

  //Usadas por save y edit
  rangeDates: Date[];
  dates: any[];

    //Usadas por save y edit
    rangeDatesNew: Date[];
    datesNew: any[];

  //Usada para eliminar
  rangeDatesToDelete: Date[];
  dateToDelete: Date[];

  flag: boolean = true;

  usuario: any;

  tipoAtencionId: any;
  turno_new : any;

  tipoAtencion: any;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    eventClick: this.handleEventClick.bind(this),
    select: this.handleSelectedRange.bind(this),
    
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
    selectMirror: true,
    dayMaxEvents: true,
    selectable: true, //seleccionar varios dias
    unselectAuto: false, //click fuera del diálogo no borra la selección
    locale: 've',
  };

  constructor(private fb: FormBuilder,
    private datePipe: DatePipe,
    private authService: AuthService,
    private cuposService: CuposService,
    private turnoService: TurnoService,
    private sitioService: SitioService,
    private medicoService: MedicoService,
    private globalService: GlobalService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private especialidadService: MedicoEspecialidadService,
    private servicioEspecialidad: ServicioEspecialidadService,
    private menuService: MenuService,
    private tipoAtencionService: TipoAtencionService  )
     
    {
      this.es = this.globalService.es;
      //this.title = 'Registro de Calendario';
      this.createForm();
      this.tipoAtencionId  = this.menuService.getTipoAtencion();
      this.tipoAtencionService
    .getById(this.tipoAtencionId)
    .toPromise()
    .then((results) => {
      this.tipoAtencion = results;
      this.title = 'Modificar de Calendario   ' +  this.tipoAtencion.nombre;
    })
    .catch((err) => {
      console.log(err);
    });
     }

  ngOnInit() {

    this.dropdownM();
    this.dropdownT();
    this.dropdownS();

    let currentUser = this.authService.getCurrentUser();
    this.usuario  = JSON.parse(currentUser);
  }

  registerForm(){
    this.title = 'Registro de Calendario';
    this.clear();
    this.flag = true;
    this.rangeDates = null;
    this.dateToDelete = null;
  }

  clear() {
    this.datos.fecha = '';
    this.datos.cupos = '';
    this.datos.sitio_id = '';
    this.datos.turno_id = '';
    this.datos.horario = '';
    this.datos.turno_id2 ='';
    this.submitted = false;
    this.rangeDatesToDelete = [];
  }

  createForm() {
    this.myForm = this.fb.group({
      medico_id: ['', [Validators.required]],
      sitio_id: ['', [Validators.required]],
      especialidad_id: ['', [Validators.required]],
      turno_id: ['', [Validators.required]],
      servicio_id: ['', [Validators.required]],
      cupos: ['', [Validators.required]],
      horario: [''],
      cupos_asignados: [''],
      fecha: ['', [Validators.required]],
      turno_id_new: ['', [Validators.required]],
    });
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

  dropdownS() {
    this.sitioService
      .getAllCombo()
      .toPromise()
      .then((results) => {
        this.sitios = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  dropdownM() {
    this.medicoService
      .getAllCombo()
      .toPromise()
      .then((results) => {
        this.medicos = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  dropdownE() {

    this.datos.servicio_id = "";
    this.datos.especialidad_id = "";
    this.servicios = [];

    this.especialidadService
      .getEspecialidaByMedico(this.datos.medico_id)
      .toPromise()
      .then((results) => {
        this.especialidades = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  dropdownSV() {
    this.servicioEspecialidad
      .getAllByEspecialidadTipo(this.datos.especialidad_id, this.tipoAtencionId)
      .toPromise()
      .then((results) => {
        this.servicios = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  consult() {

    this.cuposService
      .getCalendario({
        medico_id: this.datos.medico_id,
        servicio_id: this.datos.servicio_id,
        especialidad_id: this.datos.especialidad_id,
        tipo_atencion_id: this.tipoAtencionId,
        asignar : false
      })
      .toPromise()
      .then((results) => {
        this.calendarOptions.events = results;
      })
      .catch((err) => {
        console.log(err);
        this.showError('Ha ocurrido un error.');
      });
  }

  //*** Para editar un evento y obtener la fecha para eliminar */

  handleEventClick(arg) {
    this.flag = true;
    this.title = 'Información del Cupo seleccionado';
    this.datos = { ...arg.event.extendedProps };

    let date = this.datos.fecha;
    let newDate = date.split('/').reverse().join('/');
    let x = new Date(newDate);
    this.rangeDates = [x, x];

    // Para eliminar un evento
    this.dateToDelete = [x, x];
    // console.log('FECHA DEL CUPO:', this.dateToDelete);
  }

  //*** Para obtener un rango de fecha del calendario */

  handleSelectedRange(arg) {
    let start = new Date(arg.startStr + 'T00:00:00');
    let end = new Date(arg.endStr);

    const getDatesBetweenDates = (start, end) => {
      let dates: any[] = [];
      const theDate = new Date(start);
      while (theDate < end) {
        dates = [...dates, new Date(theDate)];
        theDate.setDate(theDate.getDate() + 1);
      }
      dates = [...dates];
      return dates;
    };

    if (this.flag) {
      this.rangeDates = [start, end];
      this.dates = getDatesBetweenDates(start, end);
    }

    this.rangeDatesToDelete = [start, end];
    // console.log('RANGO A ELIMINAR: ', this.rangeDatesToDelete);
  }

  delete(start, end) {
    this.cuposService
      .deleteByLote({
        medico_id: this.datos.medico_id,
        servicio_id: this.datos.servicio_id,
        especialidad_id: this.datos.especialidad_id,
        tipo_atencion_id: this.tipoAtencionId,
        turno_id: this.datos.turno_id,
        fecha_inicio: start,
        fecha_fin: end,
      })
      .toPromise()
      .then((results) => {
        let aux: any = results;
        this.consult();
        this.blocked = false;

        if (aux.status == '305') {
          this.registerForm();
          this.showSuccess(aux.details);
        }

        if (aux.status == '204') {
          this.showError(aux.details);
          this.showWarning(
            'Los registros con cupos asignados no pueden ser eliminados.'
          );
        }
      })
      .catch((err) => {
        this.cathError(err);
      });
  }

  save() {
    this.submitted = true;

    if (this.myForm.valid) {
    //  this.blocked = true;
      console.log("aqui");
      let map = this.dates.map((e) => this.datePipe.transform(e, 'yyyy-MM-dd'));

      this.datos.usuario_creador= this.usuario.siglado; // login usuario conectado
      this.datos.nombre_creador= this.usuario.nombre; // nombre usuario conecta
      this.datos.tipo_atencion_id = this.tipoAtencionId;
      console.log("turno cambio",this.datos.turno_id_new);



      console.log('Datos: ', this.datos);


      this.cuposService
        .updateByLote({
          datos: this.datos,
          rangoFechas: map,
        })
        .toPromise()
        .then((results) => {
          let aux: any = results;

          if ((aux.status = '201')) {
            this.consult();
            // !! SE QUITA A PETICION SR RODRIGO 
            // !! this.clear()  
            this.blocked = false;
            this.showSuccess(aux.details);
          }
        })
        .catch((err) => {
          this.cathError(err);
          this.blocked = false;
        });
    }
    else
    {
      this.showWarning("Completar los datos solicitados");
    }
  }

  
  /**Eliminar por fechas sombreadas en el calendario */
  deleteRange() {
    let map = this.rangeDatesToDelete.map((e) =>
      this.datePipe.transform(e, 'yyyy-MM-dd')
    );

    this.delete(map[0], map[1]);
  }

  /**Eliminar evento seleccionado*/
  deleteReg() {
    let map = this.dateToDelete.map((e) =>
      this.datePipe.transform(e, 'yyyy-MM-dd')
    );

    this.delete(map[0], map[1]);
  }

  cathError(err) {
    console.log(err);
    this.blocked = false;
    this.showError('Ha ocurrido un error.');
  }
  confirm(mssg, flag) {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea ' + mssg + '?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      accept: () => {
        flag ? this.deleteRange() : this.deleteReg();
      },
    });
  }

  confirmDeleteRange() {
    this.confirm('limpiar el calendario en las fechas sombreadas', true);
  }

  confirmDeleteOne() {
    this.confirm('eliminar el registro seleccionado', false);
  }

  private showError(errMsg: string) {
    this.messageService.clear();
    this.messageService.add({ key: 'tc', severity: 'error', summary: errMsg });
  }

  private showSuccess(successMsg: string) {
    this.messageService.clear();
    this.messageService.add({
      key: 'tc',
      severity: 'success',
      summary: successMsg,
    });
  }

  private showWarning(warnMsg: string) {
    this.messageService.add({
      key: 'tc',
      severity: 'warn',
      summary: 'Información',
      detail: warnMsg,
    });
  }


}
