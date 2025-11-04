import { Component, OnInit } from '@angular/core';
import { Causa, EstadoAtencion, Respuesta } from '../../../../models';
import { CausaService, EstadoAtencionService} from '../../../../services';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { threadId } from 'worker_threads';

@Component({
  selector: 'app-causa',
  templateUrl: './causa.component.html',
  styleUrls: ['./causa.component.scss'], 
  providers: [MessageService,ConfirmationService] 
}) 

export class CausaComponent implements OnInit {
  
  displayDialog: boolean;
  tituloDialogo: string = '';

  nuevoRegistro: boolean;
  submitted: boolean;
  form: FormGroup;
  
  causas: Causa[];
  causa: Causa = {};
  selectedRegistros: Causa[];

  estadoAtenciones: EstadoAtencion[];
  estadoAtencion: EstadoAtencion;
  estadoSelected: EstadoAtencion;
  
  cols: any[];

  constructor(
    private fb: FormBuilder,
    private estadoService: EstadoAtencionService,
    private causaService: CausaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
       this.createForm();
  }

  ngOnInit() {
    this.consultar();
    this.nuevoRegistro = false;
    this.fullDropdownEstados();

    this.cols = [
      { field: 'causa_id',          header: 'Id', width: '10%' },
      { field: 'nombre_estado',     header: 'Estado Atención', width: '20%' },
      { field: 'motivo',            header: 'Motivo', width: '20%' },
      { field: 'descripcion',       header: 'Descripción', width: '30%' },
    ];
  }

  createForm() {
    this.form = this.fb.group({
      motivo: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      estadoAtencion: ['', [Validators.required]]
    });
  }

  fullDropdownEstados() {
    this.estadoService
      .getAllCombo()
      .toPromise()
      .then((results) => {
        this.estadoAtenciones = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  consultar() {
    this.causaService
      .getAllCombo()
      .toPromise()
      .then((results) => {

        //console.log(results);
        this.causas = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }



  openNew() {
    this.nuevoRegistro = true;
    this.tituloDialogo = 'Nuevo Registro';
    this.causa = {};
    this.displayDialog = true;
    this.submitted = false;
  }

  deleteSelectedItems() {
    this.confirmationService.confirm({
        message: '¿Está seguro que desea borrar el registro?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          
          this.causas= this.causas.filter(val => !this.selectedRegistros.includes(val));
          let index = -1;
          /*for (let i = 0; i < this.selectedEstados.length; i++) {
            this.remove(this.selectedEstados[i]);         
          }*/
          this.causaService.deleteByLote(this.selectedRegistros) //eliminar en un ciclo desde el backend
            .toPromise()
            .then(results => { 
            this.consultar(); 
            let aux: Respuesta = results;   
            if (aux){
              this.showSuccess(aux.details);   // mensaje
            } 
            else 
            {
              this.showError(aux.details);     // mensaje
            }
          })
        .catch(err => {console.log(err); })
  
          this.selectedRegistros = null;
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Registros Borrados', life: 3000});
        }
    });
  }

  editar(registroActual: Causa) {
    this.nuevoRegistro = false;
    this.causa = this.clone(registroActual);
    this.displayDialog = true;
    this.tituloDialogo = 'Editar: ' + this.causa.causa_id;
    this.submitted = false;
  }

  eliminar(causa: Causa) {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea borrar : ' + causa.causa_id + '?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.causas = this.causas.filter(
          (val) => val.causa_id !== causa.causa_id
        );
        this.remove(causa);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Registro Borrado',
          life: 3000,
        });
      },
    });
  }

  remove(registroActual: Causa) {
    this.causaService
      .delete(registroActual.causa_id)
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

  guardar() {
    this.submitted = true;

    if (this.form.valid) {
      if (this.nuevoRegistro) {
        this.causaService
          .create(this.causa)
          .toPromise()
          .then((results) => {
            let aux: Respuesta = results;
            if (aux) {
              this.showSuccess(aux.details);
              this.consultar();
            } else {
              this.showError(aux.details); 
            }
            this.close();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.causaService
          .update(this.causa)
          .toPromise()
          .then((results) => {
            let aux: Respuesta = results;
            if (aux) {
              this.showSuccess(aux.details);
              this.consultar(); 
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
    this.causa = null;
    this.displayDialog = false;
    this.submitted = false;
    this.nuevoRegistro = false;
  }

  clone(c: Causa): Causa {
    let registro = {};
    for (let prop in c) {
      registro[prop] = c[prop];
    }
    return registro;
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
