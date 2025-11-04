import { ServicioEspecialidadService } from './../../../../services/servicio-especialidad.service';
import { Component, OnInit } from '@angular/core';
import { EspecialidadService, ServicioService } from '../../../../services';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Respuesta, Servicio } from 'src/app/models';

@Component({
  selector: 'app-servicio-especialidad',
  templateUrl: './servicio-especialidad.component.html',
  styleUrls: ['./servicio-especialidad.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ServicioEspecialidadComponent implements OnInit {
  displayDialog: boolean;
  tituloDialogo: string = '';

  nuevoRegistro: boolean;
  submitted: boolean;
  form: FormGroup;

  servicioEspecialidades: any = [];
  reporte : any = [];
  servicioEspecialidad: any = {};
  selectedRegistros: any[];
  especialidades: any[];
  especialidadSelected: any;
  cols: any[];
  servicios: Servicio[];

  constructor(
    private fb: FormBuilder,
    private servicioEspecialidadService: ServicioEspecialidadService,
    private especialidadService: EspecialidadService,
    private servicioService: ServicioService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.nuevoRegistro = false;
    this.fullDropdownEspecialidades();
    this.fullDropdownServicios();

    this.cols = [
      { field: 'especialidad_id', header: 'Id', width: '10%' },
      { field: 'especialidad', header: 'Especialidad', width: '20%' },
      { field: 'servicio', header: 'Servicio', width: '70%' },
      
    ];
  }

  createForm() {
    this.form = this.fb.group({
      servicio: ['', [Validators.required]],
      especialidad: ['', [Validators.required]],
      is_estandar: [''],
      is_procedimiento: [''],
    });
  }

  fullDropdownEspecialidades() {
    this.especialidadService
      .getAllCombo()
      .toPromise()
      .then((results) => {
        this.especialidades = results;
        this.especialidadSelected=null;
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
    this.servicioEspecialidadService
      .getAllByEspecialidad(this.especialidadSelected)
      .toPromise()
      .then((results) => {
        this.servicioEspecialidades = results.map((p, i) => {
          p['is_estandar'] = p.is_estandar == '1' ? true : false;
          p['is_procedimiento'] = p.is_procedimiento == '1' ? true : false;
          return p;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  openNew() {
    this.nuevoRegistro = true;
    this.tituloDialogo = 'Nuevo Registro';
    this.servicioEspecialidad = {};
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
        this.servicioEspecialidadService
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
    this.servicioEspecialidad = { ...registroActual };
    this.displayDialog = true;
    this.tituloDialogo = 'Editar: ' + this.servicioEspecialidad.servicio;
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
    this.servicioEspecialidadService
      .delete(registroActual.servicio_especialidad_id)
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
    let aux = { ...this.servicioEspecialidad };
    aux.is_estandar = this.servicioEspecialidad.is_estandar ? '1' : '0';
    aux.is_procedimiento = this.servicioEspecialidad.is_procedimiento
      ? '1'
      : '0';

    if (this.form.valid) {
      if (this.nuevoRegistro) {
        this.servicioEspecialidadService
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
        this.servicioEspecialidadService
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
    this.servicioEspecialidad = null;
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

    this.reporte = this.servicioEspecialidades.map(col => ({
      id: col.especialidad_id,
      especialidad: col.especialidad,
      servicio: col.servicio
  
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
