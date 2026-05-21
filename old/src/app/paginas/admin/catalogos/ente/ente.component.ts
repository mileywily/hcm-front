import { Component, OnInit } from '@angular/core';
import { Ente, EstadoAtencion, Respuesta } from '../../../../models';
import { EnteService} from '../../../../services';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-ente',
  templateUrl: './ente.component.html',
  styleUrls: ['./ente.component.scss'], 
  providers: [MessageService,ConfirmationService] 
})
export class EnteComponent implements OnInit {

  displayDialog: boolean;
  tituloDialogo: string = '';

  nuevoRegistro: boolean;
  submitted: boolean;
  form: FormGroup;
  
  entes: Ente[];
  ente: Ente = {};
  selectedRegistros: Ente[];

  cols: any[];

  constructor(
    private fb: FormBuilder,
    private enteService: EnteService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) 
  {
     this.createForm();
  }

  ngOnInit(): void 
  {
    this.consultar();
    this.nuevoRegistro = false;
   

    this.cols = [
      { field: 'ente_id',          header: 'Id', width: '10%' },
      { field: 'nombre',     header: 'Nombre', width: '20%' },
      { field: 'descripcion',       header: 'Descripción', width: '30%' },
    ];

  }

  createForm() {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]]
      
    });
  }

  consultar() 
  {
    this.enteService
      .getAllCombo()
      .toPromise()
      .then((results) => {

        //console.log(results);
        this.entes = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }


  openNew() {
    this.nuevoRegistro = true;
    this.tituloDialogo = 'Nuevo Registro';
    this.ente = {};
    this.displayDialog = true;
    this.submitted = false;
  }


  deleteSelectedItems() {
    this.confirmationService.confirm({
        message: '¿Está seguro que desea borrar el registro?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          
          this.entes= this.entes.filter(val => !this.selectedRegistros.includes(val));
          let index = -1;
          
          this.enteService.deleteByLote(this.selectedRegistros) //eliminar en un ciclo desde el backend
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


  editar(registroActual: Ente) {
    this.nuevoRegistro = false;
    this.ente = this.clone(registroActual);
    this.displayDialog = true;
    this.tituloDialogo = 'Editar: ' + this.ente.ente_id;
    this.submitted = false;
  }

  eliminar(ente: Ente) {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea borrar : ' + ente.ente_id + '?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.entes = this.entes.filter(
          (val) => val.ente_id !== ente.ente_id
        );
        this.remove(ente);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Registro Borrado',
          life: 3000,
        });
      },
    });
  }


  remove(registroActual: Ente) {
    this.enteService
      .delete(registroActual.ente_id)
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
        this.enteService
          .create(this.ente)
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
        this.enteService
          .update(this.ente)
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
    this.ente = null;
    this.displayDialog = false;
    this.submitted = false;
    this.nuevoRegistro = false;
  }

  clone(c: Ente): Ente {
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
