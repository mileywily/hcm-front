import { Component, OnInit } from '@angular/core';
import { TipoSolicitud, Respuesta } from '../../../../models';
import { TipoSolicitudService } from '../../../../services';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-tipo-solicitud',
  templateUrl: './tipo-solicitud.component.html',
  styleUrls: ['./tipo-solicitud.component.scss'], 
  providers: [MessageService,ConfirmationService] 
}) 

export class TipoSolicitudComponent implements OnInit {

 
  displayDialog: boolean;
  tituloDialogo: string = "";

  nuevoRegistro: boolean;
  submitted: boolean;
  form: FormGroup;

  tipoSolicitudes: TipoSolicitud[];

  tipoSolicitud: TipoSolicitud;

  selectedRegistros: TipoSolicitud[];

  cols: any[]; // Para manejo de las columnas de la tabla

  constructor(
    private fb: FormBuilder,
    private tipoSolicitudService: TipoSolicitudService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { 
    this.createForm();

    }

  ngOnInit() { 
    this.consultar();
    this.nuevoRegistro=false;

    this.cols = [
      { field: 'tipo_solicitud_id', header: 'Id',  width: '10%' },
      { field: 'nombre', header: 'Nombre', width: '30%' },
      { field: 'descripcion', header: 'Descripción',  width: '50%' },
      { field: 'activo', header: 'Activo',  width: '10%' },

    ];
  }

  handleChange(e, tipoSolicitud: TipoSolicitud) {
      tipoSolicitud.activo= (e.checked == true ? 1 : 0)
  }

  createForm() {

    this.form = this.fb.group({
      //codigo:  ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      activo: ['', [Validators.required]]
 
    });
  }

   
  consultar(){

    this.tipoSolicitudService.getAllCombo()
    .toPromise()
    .then(
      results => { 
        this.tipoSolicitudes = results; 
      }
    )
    .catch(err => { console.log(err) });
  }

  openNew() {
    this.nuevoRegistro = true;
    this.tituloDialogo = "Nuevo Tipo de Solicitud";
    this.tipoSolicitud = {};
    this.displayDialog = true;
    this.tipoSolicitud.activo=1;
  }

  deleteSelectedItems() {
    this.confirmationService.confirm({
        message: '¿Está seguro que desea borrar el registro?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          
          this.tipoSolicitudes= this.tipoSolicitudes.filter(val => !this.selectedRegistros.includes(val));
          let index = -1;

          this.tipoSolicitudService.deleteByLote(this.selectedRegistros) //eliminar en un ciclo desde el backend
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

  editar(registroActual: TipoSolicitud) {
    this.nuevoRegistro = false;
    this.tipoSolicitud = this.clone(registroActual);
    this.displayDialog = true;
    this.tituloDialogo = "Editar registro: " + this.tipoSolicitud.tipo_solicitud_id;
    //this.tipoSolicitud.activo=1;
    this.tipoSolicitud.activo= (this.tipoSolicitud.activo == true ? 1 : 0);

  }

  eliminar(registro: TipoSolicitud) {
    this.confirmationService.confirm({
        message: '¿Está seguro que desea borar el registro: ' + registro.nombre + '?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.tipoSolicitudes = this.tipoSolicitudes.filter(val => val.tipo_solicitud_id !== registro.tipo_solicitud_id);
            this.remove(registro); 
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Registro Borrado', life: 3000});
        }
    });
  }

  
  remove(registroActual: TipoSolicitud) {

    this.tipoSolicitudService.delete(registroActual.tipo_solicitud_id)
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

      this.tipoSolicitudService.create(this.tipoSolicitud)
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

      this.tipoSolicitudService.update(this.tipoSolicitud)
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

    this.tipoSolicitud  = null;
    this.displayDialog   = false;
    this.submitted = false;
    this.nuevoRegistro = false;
   }

  clone(c:TipoSolicitud):TipoSolicitud {
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
