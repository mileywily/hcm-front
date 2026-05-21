import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { GlobalService } from '../../services/global.service';
import { CalendarOptions } from '@fullcalendar/angular';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import {
  CuposService,
  TurnoService,
  ProveedorService,
  AuthService, 
  MenuService,
  TipoAtencionService,
  GrupoService,
  GrupoServicioService,
  ServicioTipoAtencionService
 
} from 'src/app/services';

@Component({
  selector: 'app-registrar-cupos-triaje',
  templateUrl: './registrar-cupos-triaje.component.html',
  styleUrls: ['./registrar-cupos-triaje.component.scss'],
  providers: [DatePipe, MessageService, ConfirmationService],
})
export class RegistrarCuposTriajeComponent implements OnInit {
  title: string;
  es: any;
  submitted: boolean;
  blocked: boolean = false;

  //especialidades: any[];
  grupos: any[];
  //medicos: any[];
  turnos: any[];
  //sitios: any[];
  servicios: any[];
 

  datos: any = {};
  myForm: FormGroup;

  //Usadas por save y edit
  rangeDates: Date[];
  dates: any[];

  //Usada para eliminar
  rangeDatesToDelete: Date[];
  dateToDelete: Date[];

  flag: boolean = true;

  usuario: any;

  tipoAtencionId: any;

  tipoAtencion: any;
  tipoGrupo: any;
  tipoProveedor: any;

  proveedores: any[];

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

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private authService: AuthService,
    private cuposService: CuposService,
    private turnoService: TurnoService,
    private proveedorService: ProveedorService,
    private globalService: GlobalService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private menuService: MenuService,
    private tipoAtencionService: TipoAtencionService,
    private grupoService: GrupoService, 
    private grupoServicioService: GrupoServicioService,
    private servicioTipoAtencionService: ServicioTipoAtencionService

  ) {
    this.es = this.globalService.es;
    //this.title = 'Registro de Calendario';
    this.createForm();

    
    this.tipoAtencionId  = this.menuService.getTipoAtencion();

    if (this.tipoAtencionId == 3){  // cupos de IMAGEN
        this.tipoGrupo = 1;
        this.tipoProveedor =1;
    }

    if (this.tipoAtencionId == 4){  // cupos de LABORATORIO
        this.tipoGrupo = 2;
        this.tipoProveedor =3;
    }


    this.tipoAtencionService
    .getById(this.tipoAtencionId)
    .toPromise()
    .then((results) => {
      this.tipoAtencion = results;
      this.title = 'Registro de Calendario   ' +  this.tipoAtencion.nombre;
    })
    .catch((err) => {
      console.log(err);
    });
  }

  ngOnInit() {
    //this.dropdownM();
    this.dropdownGrupo();
    this.dropdownT();
    //this.dropdownS();
    this.dropdownProveedor();

    let currentUser = this.authService.getCurrentUser();
    this.usuario  = JSON.parse(currentUser);
  }

  createForm() {
    this.myForm = this.fb.group({
      proveedor_id: ['', [Validators.required]],
      //grupo_id: ['', [Validators.required]],
      grupo_id: [''],
      turno_id: ['', [Validators.required]],
      servicio_id: [''],
      cupos: ['', [Validators.required]],
      horario: [''],
      cupos_asignados: [''],
      fecha: ['', [Validators.required]],
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


  dropdownGrupo() {

    if (this.tipoAtencionId == 4){
      this.grupos = [];
      this.dropdownServicios();

    }else{
      this.datos.servicio_id = "";
      this.servicios = [];
  
      this.grupoService
        .getGruposByTipo(this.tipoGrupo)
        .toPromise()
        .then((results) => {
          this.grupos = results;
        })
        .catch((err) => {
          console.log(err);
        });
    }

  }

  dropdownServicios() {
    if (this.tipoAtencionId == 4){
      this.servicioTipoAtencionService
      .getAllByAtencion(this.tipoAtencionId)
      .toPromise()
      .then((results) => {
        this.servicios = results;
        console.log(this.servicios );
      })
      .catch((err) => {
        console.log(err);
      });
    }else{
      this.grupoServicioService
      .getAllByGrupo(this.datos.grupo_id)
      .toPromise()
      .then((results) => {
        this.servicios = results;
      })
      .catch((err) => {
        console.log(err);
      });
    }

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


  consult() {
    this.cuposService
      .getCalendarioTriaje({
        grupo_id: this.datos.grupo_id,
        servicio_id: this.datos.servicio_id,
        proveedor_id: this.datos.proveedor_id,
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

  cathError(err) {
    console.log(err);
    this.blocked = false;
    this.showError('Ha ocurrido un error.');
  }

  save() {
    this.submitted = true;

    if (this.myForm.valid) {
      this.blocked = true;
      let map = this.dates.map((e) => this.datePipe.transform(e, 'yyyy-MM-dd'));

      this.datos.usuario_creador= this.usuario.siglado; // login usuario conectado
      this.datos.nombre_creador= this.usuario.nombre; // nombre usuario conecta
      this.datos.tipo_atencion_id = this.tipoAtencionId;
      this.datos.sitio_id = null;
      this.datos.servicio_id =null;

      this.cuposService
        .createByLote({
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
        });
    }
  }

  edit() {
    this.submitted = true;

    if (this.myForm.valid) {
      this.blocked = true;
      this.datos.fecha = this.datePipe.transform(
        this.rangeDates[0],
        'yyyy-MM-dd'
      );

      this.datos.usuario_modificador= this.usuario.siglado; // login usuario conectado
      this.datos.nombre_modificador= this.usuario.nombre; // nombre usuario conecta
      
      this.cuposService
        .update(this.datos)
        .toPromise()
        .then((results) => {
          let aux: any = results;

          if ((aux.status = '304')) {
            this.blocked = false;
            this.showSuccess(aux.details);
            this.registerForm();
            this.consult();
          }
        })
        .catch((err) => {
          this.cathError(err);
        });
    }
  }

  delete(start, end) {
    this.cuposService
      .deleteByLoteTriaje({
        grupo_id: this.datos.grupo_id,
        servicio_id: this.datos.servicio_id,
        proveedor_id: this.datos.proveedor_id,
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

  register() {
 
    this.registerForm();
    //!!añadido por petición Sr Rodrigo
    this.datos = {};
    this.calendarOptions.events = [];
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
    this.submitted = false;
    this.rangeDatesToDelete = [];
  }

  clearAll() {
    this.datos = {};
    this.createForm();
    this.submitted = false;
    this.calendarOptions.events = [];
    this.rangeDatesToDelete = null;
    this.dateToDelete = null;
   // this.grupos = [];
   // this.servicios = [];
   // this.proveedores = [];
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
