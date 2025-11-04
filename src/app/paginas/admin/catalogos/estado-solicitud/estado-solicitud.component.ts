import { Component, OnInit } from '@angular/core';
import { EstadoSolicitud, Respuesta } from '../../../../models';
import { EstadoSolicitudService } from '../../../../services';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-estado-solicitud',
  templateUrl: './estado-solicitud.component.html',
  styleUrls: ['./estado-solicitud.component.scss'], 
  providers: [MessageService,ConfirmationService] 
}) 

export class EstadoSolicitudComponent implements OnInit {

 
  displayDialog: boolean;
  tituloDialogo: string = "";

  nuevoRegistro: boolean;
  submitted: boolean;
  form: FormGroup;

  estadoSolicitudes: EstadoSolicitud[];

  estadoSolicitud: EstadoSolicitud;

  selectedRegistros: EstadoSolicitud[];

  cols: any[]; // Para manejo de las columnas de la tabla

  constructor(
    private fb: FormBuilder,
    private estadoSolicitudService: EstadoSolicitudService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { 
    this.createForm();

    }

  ngOnInit() { 
    this.consultar();
    this.nuevoRegistro=false;

    this.cols = [
      { field: 'estado_solicitud_id', header: 'Id',  width: '10%' },
      { field: 'nombre', header: 'Nombre', width: '30%' },
      { field: 'descripcion', header: 'Descripción',  width: '60%' },

    ];
  }

  handleChange(e, registro: EstadoSolicitud) {
    //registro.activo= (e.checked == true ? 1 : 0)
  }

  createForm() {

    this.form = this.fb.group({
      //codigo:  ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      //activo: ['', [Validators.required]],
 
    });
  }

   
  consultar(){

    this.estadoSolicitudService.getAllCombo()
    .toPromise()
    .then(
      results => { 
        this.estadoSolicitudes = results; 
      }
    )
    .catch(err => { console.log(err) });
  }

  openNew() {
    this.nuevoRegistro = true;
    this.tituloDialogo = "Nuevo Estado de Solicitud";
    this.estadoSolicitud = {};
    this.displayDialog = true;
    //this.estadoSolicitud.activo=1;
  }

  deleteSelectedItems() {
    this.confirmationService.confirm({
        message: '¿Está seguro que desea borrar el registro?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          
          this.estadoSolicitudes= this.estadoSolicitudes.filter(val => !this.selectedRegistros.includes(val));
          let index = -1;
          /*for (let i = 0; i < this.selectedEstados.length; i++) {
            this.remove(this.selectedEstados[i]);         
          }*/
          this.estadoSolicitudService.deleteByLote(this.selectedRegistros) //eliminar en un ciclo desde el backend
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

  editar(registroActual: EstadoSolicitud) {
    this.nuevoRegistro = false;
    this.estadoSolicitud = this.clone(registroActual);
    this.displayDialog = true;
    this.tituloDialogo = "Editar estado: " + this.estadoSolicitud.estado_solicitud_id;
   //this.estadoSolicitud.activo=1;

  }

  eliminar(registro: EstadoSolicitud) {
    this.confirmationService.confirm({
        message: '¿Está seguro que desea borar el registro: ' + registro.nombre + '?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.estadoSolicitudes = this.estadoSolicitudes.filter(val => val.estado_solicitud_id !== registro.estado_solicitud_id);
            this.remove(registro); 
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Registro Borrado', life: 3000});
        }
    });
  }

  
  remove(registroActual: EstadoSolicitud) {

    this.estadoSolicitudService.delete(registroActual.estado_solicitud_id)
    .toPromise()
    .then(results => {
      this.consultar();
      //this.showSuccess('El registro se ha eliminado satisfactoriamente');
      let aux: Respuesta = results;   
      if (aux){
        this.showSuccess(aux.details);   // mensaje
      } 
      else 
      {
        this.showError(aux.details);     // mensaje
      }      
    })
    .catch(err => { console.log(err) });
    
  }

  
  guardar() {  

    this.submitted = true;
    if (this.form.valid) {
      if (this.nuevoRegistro) {

        this.estadoSolicitudService.create(this.estadoSolicitud)
        .toPromise()
        .then(results => { 
          this.consultar(); 
          //this.showSuccess('El registro se ha creado satisfactoriamente');
          let aux: Respuesta = results;   

          if (aux){
            this.showSuccess(aux.details);   // mensaje
          } 
          else 
          {
            this.showError(aux.details);     // mensaje
          } 
          this.close();
        })
        .catch(err => { console.log(err) });

      }
      else {

        this.estadoSolicitudService.update(this.estadoSolicitud)
        .toPromise()
        .then(results => { 
          this.close();
          this.consultar(); 
          //this.showSuccess('El registro se ha actualizado satisfactoriamente');
          let aux: Respuesta = results;   
          if (aux){
            this.showSuccess(aux.details);   // mensaje
          } 
          else 
          {
            this.showError(aux.details);     // mensaje
          } 
        })
        .catch(err => { console.log(err) });


      }
   
    
    }
  }

  close() {

    this.estadoSolicitud  = null;
    this.displayDialog   = false;
    this.submitted = false;
    this.nuevoRegistro = false;
   }

  clone(c:EstadoSolicitud):EstadoSolicitud {
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
    this.messageService.add({ key: 'tc', severity: 'success', summary: successMsg });
  }


}
