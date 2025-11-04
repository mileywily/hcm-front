import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Recaudo, Respuesta } from '../../../../models';
import { RecaudoService } from '../../../../services';

@Component({
  selector: 'app-recaudo',
  templateUrl: './recaudo.component.html',
  styleUrls: ['./recaudo.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class RecaudoComponent implements OnInit {
  displayDialog: boolean;
  tituloDialogo: string = '';

  nuevoRegistro: boolean;
  submitted: boolean;
  form: FormGroup;

  recaudos: any[];
  recaudo: any = {};
  selectedRegistros: any[];

  cols: any[];

  constructor(
    private fb: FormBuilder,
    private recaudoService: RecaudoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.cols = [
      { field: 'recaudo_id', header: 'Id', width: '10%' },
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
    this.recaudoService
      .getAll()
      .toPromise()
      .then((results) => {
        //console.log('PRIORI: ', results);
        this.recaudos = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  openNew() {
    this.nuevoRegistro = true;
    this.tituloDialogo = 'Nuevo Registro';
    this.recaudo = {};
    this.displayDialog = true;
    this.submitted = false;
  }

  deleteByLote(){
    this.recaudoService
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
    this.recaudo = { ...registroActual };
    this.displayDialog = true;
    this.tituloDialogo = 'Editar: ' + this.recaudo.recaudo_id;
    this.submitted = false;
  }

  confirmDelete(recaudo: any) {
    this.confirmationService.confirm({
      message:
        '¿Está seguro que desea borrar : ' + recaudo.recaudo_id + '?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {


        this.remove(recaudo);
      },
    });
  }

  remove(registroActual: any) {
    this.recaudoService
      .delete(registroActual.recaudo_id)
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
        this.recaudoService
          .create(this.recaudo)
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
        this.recaudoService
          .update(this.recaudo)
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
    this.recaudo = null;
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

