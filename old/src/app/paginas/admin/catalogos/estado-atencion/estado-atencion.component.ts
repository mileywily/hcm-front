import { Component, OnInit } from '@angular/core';
import { EstadoAtencion, Respuesta } from '../../../../models';
import { EstadoAtencionService } from '../../../../services';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-estado-atencion',
  templateUrl: './estado-atencion.component.html',
  styleUrls: ['./estado-atencion.component.scss'], 
  providers: [MessageService,ConfirmationService] 
}) 

export class EstadoAtencionComponent implements OnInit {

 
  displayDialog: boolean;
  tituloDialogo: string = "";

  nuevoRegistro: boolean;
  submitted: boolean;
  form: FormGroup;

  estadoAtenciones: EstadoAtencion[];

  estadoAtencion: EstadoAtencion;

  selectedRegistros: EstadoAtencion[];

  cols: any[]; // Para manejo de las columnas de la tabla

  constructor(
    private fb: FormBuilder,
    private estadoAtencionService: EstadoAtencionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { 
    this.createForm();

    }

  ngOnInit() { 
    this.consultar();
    this.nuevoRegistro=false;

    this.cols = [
      { field: 'estado_atencion_id', header: 'Id',  width: '10%' },
      { field: 'nombre', header: 'Nombre', width: '30%' },
      { field: 'descripcion', header: 'Descripción',  width: '60%' },

    ];
  }

  handleChange(e, registro: EstadoAtencion) {
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

    this.estadoAtencionService.getAllCombo()
    .toPromise()
    .then(
      results => { 
        this.estadoAtenciones = results; 
      }
    )
    .catch(err => { console.log(err) });
  }

  openNew() {
    this.nuevoRegistro = true;
    this.tituloDialogo = "Nuevo Estado de Atención";
    this.estadoAtencion = {};
    //this.estadoAtencion = null;
    this.displayDialog = true;
    //this.estadoAtencion.activo=1;
  }

  deleteSelectedItems() {
    this.confirmationService.confirm({
        message: '¿Está seguro que desea borrar el registro?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          
          this.estadoAtenciones = this.estadoAtenciones.filter(val => !this.selectedRegistros.includes(val));
          let index = -1;
          /*for (let i = 0; i < this.selectedEstados.length; i++) {
            this.remove(this.selectedEstados[i]);         
          }*/
          this.estadoAtencionService.deleteByLote(this.selectedRegistros) //eliminar en un ciclo desde el backend
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

  editar(registroActual: EstadoAtencion) {
    this.nuevoRegistro = false;
    this.estadoAtencion = this.clone(registroActual);
    this.displayDialog = true;
    this.tituloDialogo = "Editar estado: " + this.estadoAtencion.estado_atencion_id;
   //this.estadoSolicitud.activo=1;

  }

  eliminar(registro: EstadoAtencion) {
    this.confirmationService.confirm({
        message: '¿Está seguro que desea borar el registro: ' + registro.nombre + '?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.estadoAtenciones = this.estadoAtenciones.filter(val => val.estado_atencion_id !== registro.estado_atencion_id);
            this.remove(registro); 
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Registro Borrado', life: 3000});
        }
    });
  }

  
  remove(registroActual: EstadoAtencion) {

    this.estadoAtencionService.delete(registroActual.estado_atencion_id)
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

      this.estadoAtencionService.create(this.estadoAtencion)
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

      this.estadoAtencionService.update(this.estadoAtencion)
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

    this.estadoAtencion  = null;
    this.displayDialog   = false;
    this.submitted = false;
    this.nuevoRegistro = false;
   }

  clone(c:EstadoAtencion):EstadoAtencion {
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
