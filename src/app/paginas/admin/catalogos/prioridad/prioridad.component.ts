import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrioridadService } from 'src/app/services';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Respuesta } from 'src/app/models/respuesta';

@Component({
  selector: 'app-prioridad',
  templateUrl: './prioridad.component.html',
  styleUrls: ['./prioridad.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class PrioridadComponent implements OnInit {
  displayDialog: boolean;
  tituloDialogo: string = '';

  nuevoRegistro: boolean;
  submitted: boolean;
  form: FormGroup;

  prioridades: any[];
  prioridad: any = {};
  selectedRegistros: any[];

  cols: any[];

  constructor(
    private fb: FormBuilder,
    private prioridadService: PrioridadService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.cols = [
      { field: 'prioridad_id', header: 'Id', width: '10%' },
      { field: 'nombre', header: 'Nombre', width: '30%' },
      { field: 'descripcion', header: 'Descripción', width: '30%' },
    ];

    this.consultar();
    this.nuevoRegistro = false;
  }

  createForm() {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
    });
  }

  consultar() {
    this.prioridadService
      .getAll()
      .toPromise()
      .then((results) => {
        //console.log('PRIORI: ', results);
        this.prioridades = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  openNew() {
    this.nuevoRegistro = true;
    this.tituloDialogo = 'Nuevo Registro';
    this.prioridad = {};
    this.displayDialog = true;
    this.submitted = false;
  }

  deleteByLote(){
    this.prioridadService
    .deleteByLote(this.selectedRegistros)
    .toPromise()
    .then((results) => {
      let aux: Respuesta = results;
      if (aux) {
        this.selectedRegistros = null;
        this.consultar();
        this.showSuccess(aux.details);
      } else {
        this.showError(aux.details);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  deleteSelectedItems() {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea borrar el/los registro/s?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.deleteByLote();
      },
    });
  }

  edit(registroActual: any) {
    this.nuevoRegistro = false;
    this.prioridad = { ...registroActual };
    this.displayDialog = true;
    this.tituloDialogo = 'Editar: ' + this.prioridad.prioridad_id;
    this.submitted = false;
  }

  confirmDelete(prioridad: any) {

    console.log
    this.confirmationService.confirm({
      message:
        '¿Está seguro que desea borrar : ' + prioridad.prioridad_id + '?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.remove(prioridad);
      },
    });
  }

  remove(registroActual: any) {
    this.prioridadService
      .delete(registroActual.prioridad_id)
      .toPromise()
      .then((results) => {
        let aux: Respuesta = results;
        if (aux) {
          this.showSuccess(aux.details);
          this.consultar();
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

    if (this.form.valid) {
      if (this.nuevoRegistro) {
        this.prioridadService
          .create(this.prioridad)
          .toPromise()
          .then((results) => {
            let aux: Respuesta = results;
            if (aux) {
              this.consultar();
              this.showSuccess(aux.details);
            } else {
              this.showError(aux.details);
            }
            this.close();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.prioridadService
          .update(this.prioridad)
          .toPromise()
          .then((results) => {
            let aux: Respuesta = results;
            if (aux) {
              this.consultar();
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
    this.prioridad = null;
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
}
