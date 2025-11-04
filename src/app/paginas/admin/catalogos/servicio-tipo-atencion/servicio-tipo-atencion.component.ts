import { ServicioTipoAtencionService } from '../../../../services/servicio-tipo-atencion.service';
import { Component, OnInit } from '@angular/core';
import { TipoAtencionService, ServicioService } from '../../../../services';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Respuesta, Servicio } from 'src/app/models';

@Component({
  selector: 'app-servicio-tipo-atencion',
  templateUrl: './servicio-tipo-atencion.component.html',
  styleUrls: ['./servicio-tipo-atencion.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ServicioTipoAtencionComponent implements OnInit {
  displayDialog: boolean;
  tituloDialogo: string = '';

  nuevoRegistro: boolean;
  submitted: boolean;
  form: FormGroup;

  servicioTipoAtenciones: any = [];
  reporte : any = [];
  servicioTipoAtencion: any = {};
  selectedRegistros: any[];
  tipoatenciones: any[];
  tipoAtencionSelected: any;
  cols: any[];
  servicios: Servicio[];

  constructor(
    private fb: FormBuilder,
    private servicioTipoAtencionService: ServicioTipoAtencionService,
    private tipoAtencionService: TipoAtencionService,
    private servicioService: ServicioService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.nuevoRegistro = false;
    this.fullDropdownTipoAtencion();
    this.fullDropdownServicios();

    this.cols = [
      { field: 'tipo_atencion_id', header: 'Id', width: '10%' },
      { field: 'nombre_tipo_atencion', header: 'Tipo de Atención', width: '10%' },
      { field: 'nombre_servicio', header: 'Servicio', width: '70%' },
    ];
  }

  createForm() {
    this.form = this.fb.group({
      servicio: ['', [Validators.required]],
      tipoatencion: ['', [Validators.required]]
    });
  }

  fullDropdownTipoAtencion() {
    this.tipoAtencionService
      .getAllCombo()
      .toPromise()
      .then((results) => {
        this.tipoatenciones = results;
        this.tipoAtencionSelected= null;
        this.consult();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  fullDropdownServicios() {
    this.servicioService
      .getAllCombo()
      .toPromise()
      .then((results) => {
        this.servicios = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }


  consult() {
    this.servicioTipoAtencionService
      .getAllByAtencion(this.tipoAtencionSelected)
      .toPromise()
      .then((results) => {
        this.servicioTipoAtenciones = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  openNew() {
    this.nuevoRegistro = true;
    this.tituloDialogo = 'Nuevo Registro';
    this.servicioTipoAtencion = {};
    this.displayDialog = true;
    this.submitted = false;
  }

  deleteSelectedItems() {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea borrar el/los registro/s?',
      header: 'Confirmación',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.servicioTipoAtencionService
          .deleteByLote(this.selectedRegistros)
          .toPromise()
          .then((results) => {            
            let aux: Respuesta = results;
            if (aux) {
              this.consult();
              this.selectedRegistros = null;
              this.showSuccess(aux.details);
            } else {
              this.showError(aux.details);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });
  }

  edit(registroActual: any) {
    this.nuevoRegistro = false;
    this.servicioTipoAtencion = { ...registroActual };
    this.displayDialog = true;
    this.tituloDialogo = 'Editar: ' + this.servicioTipoAtencion.servicio;
    this.submitted = false;
  }

  confirmDelete(servicioEspecialidad: any) {
    this.confirmationService.confirm({
      message:
        '¿Está seguro que desea borrar : ' +
        servicioEspecialidad.servicio +
        '?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.remove(servicioEspecialidad);
      },
    });
  }

  remove(registroActual: any) {
    this.servicioTipoAtencionService
      .delete(registroActual.servicio_tipoatencion_id)
      .toPromise()
      .then((results) => {
        let aux: Respuesta = results;
        if (aux) {
          this.consult();
          this.showSuccess(aux.details);
        } else {
          this.showError(aux.details);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  save() {
    this.submitted = true;
    let aux = { ...this.servicioTipoAtencion };

    if (this.form.valid) {
      if (this.nuevoRegistro) {
        this.servicioTipoAtencionService
          .create(aux)
          .toPromise()
          .then((results) => {
            let aux: Respuesta = results;
            if (aux) {
              this.consult();

              if (aux.status == '500'){
                this.showError(aux.details);
              }else{
                this.showSuccess(aux.details);
              }
            } else {
              this.showError(aux.details);
            }
            this.close();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.servicioTipoAtencionService
          .update(aux)
          .toPromise()
          .then((results) => {
            let aux: Respuesta = results;
            if (aux) {
              this.consult();
              this.showSuccess(aux.details);
              this.close();
            } else {
              this.showError(aux.details);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  close() {
    this.servicioTipoAtencion = null;
    this.displayDialog = false;
    this.submitted = false;
    this.nuevoRegistro = false;
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

  exportExcel() {

    this.reporte = this.servicioTipoAtenciones.map(col => ({
      id: col.tipo_atencion_id,
      Atencion: col.nombre_tipo_atencion,
      servicio: col.nombre_servicio
  
    }));
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.reporte);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xls',
        type: 'array'
      });
      this.saveAsExcelFile(excelBuffer, 'reporte');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xls';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }
}
