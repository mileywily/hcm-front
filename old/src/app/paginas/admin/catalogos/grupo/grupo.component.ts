import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Grupo, Respuesta, TipoGrupo } from '../../../../models';
import { GrupoService, TipoGrupoService } from '../../../../services';



@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.component.html',
  styleUrls: ['./grupo.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class GrupoComponent implements OnInit {
  displayDialog: boolean;
  tituloDialogo: string = '';

  nuevoRegistro: boolean;
  submitted: boolean;
  form: FormGroup;

  grupos: any[];
  grupo: any = {};
  selectedRegistros: any[];

  tipoGrupos: TipoGrupo[];
  tipoGrupo: TipoGrupo;
  tipoGrupoSelected: TipoGrupo;

  cols: any[];

  constructor(
    private fb: FormBuilder,
    private grupoService: GrupoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private tipoGrupoService: TipoGrupoService

  ) {
    this.createForm();
  }

  ngOnInit() {
    this.cols = [
      { field: 'grupo_id', header: 'Id', width: '10%' },
      { field: 'nombre_tipo_grupo', header: 'Tipo', width: '30%' },
      { field: 'nombre', header: 'Nombre', width: '30%' },
      { field: 'descripcion', header: 'Descripción', width: '30%' },
    ];

    this.consultar();
    this.nuevoRegistro = false;
    this.fullDropdownTipoGrupo();
  }

  fullDropdownTipoGrupo() {
    this.tipoGrupoService
      .getAllCombo()
      .toPromise()
      .then((results) => {
        this.tipoGrupos = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  createForm() {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      tipoGrupo: ['', [Validators.required]]
    });
  }

  consultar() {
    this.grupoService
      .getAllCombo()
      .toPromise()
      .then((results) => {
        //console.log('PRIORI: ', results);
        this.grupos = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  openNew() {
    this.nuevoRegistro = true;
    this.tituloDialogo = 'Nuevo Registro';
    this.grupo = {};
    this.displayDialog = true;
    this.submitted = false;
  }

  deleteByLote(){
    this.grupoService
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
    this.grupo = { ...registroActual };
    this.displayDialog = true;
    this.tituloDialogo = 'Editar: ' + this.grupo.grupo_id;
    this.submitted = false;
  }

  confirmDelete(grupo: any) {
    this.confirmationService.confirm({
      message:
        '¿Está seguro que desea borrar : ' + grupo.grupo_id + '?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {


        this.remove(grupo);
      },
    });
  }

  remove(registroActual: any) {
    this.grupoService
      .delete(registroActual.grupo_id)
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
        this.grupoService
          .create(this.grupo)
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
        this.grupoService
          .update(this.grupo)
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
    this.grupo = null;
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