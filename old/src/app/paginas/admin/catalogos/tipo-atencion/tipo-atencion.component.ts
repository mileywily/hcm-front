import { Component, OnInit } from '@angular/core';
import { TipoAtencion, Respuesta } from '../../../../models';
import { TipoAtencionService } from '../../../../services';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-tipo-atencion',
  templateUrl: './tipo-atencion.component.html',
  styleUrls: ['./tipo-atencion.component.scss'], 
  providers: [MessageService,ConfirmationService] 
}) 

export class TipoAtencionComponent implements OnInit {

 
  displayDialog: boolean;
  tituloDialogo: string = "";

  nuevoRegistro: boolean;
  submitted: boolean;
  form: FormGroup;

  tipoAtenciones: TipoAtencion[];

  tipoAtencion: TipoAtencion;

  selectedRegistros: TipoAtencion[];

  cols: any[]; // Para manejo de las columnas de la tabla

  constructor(
    private fb: FormBuilder,
    private tipoAtencionService: TipoAtencionService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { 
    this.createForm();

    }

  ngOnInit() { 
    this.consultar();
    this.nuevoRegistro=false;

    this.cols = [
      { field: 'tipo_atencion_id', header: 'Id',  width: '10%' },
      { field: 'nombre', header: 'Nombre', width: '30%' },
      { field: 'descripcion', header: 'Descripción',  width: '50%' },
      { field: 'activo', header: 'Activo',  width: '10%' }

    ];
  }

  handleChange(e, tipoAtencion: TipoAtencion) {
    tipoAtencion.activo= (e.checked == true ? 1 : 0)
  }

  createForm() {

    this.form = this.fb.group({
      //codigo:  ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      activo: ['', [Validators.required]],
 
    });
  }

   
  consultar(){

    this.tipoAtencionService.getAllCombo()
    .toPromise()
    .then(
      results => { 
        this.tipoAtenciones = results; 
      }
    )
    .catch(err => { console.log(err) });
  }

  openNew() {
    this.nuevoRegistro = true;
    this.tituloDialogo = "Nuevo Tipo de Atención";
    this.tipoAtencion = {};
    //this.tipoAtencion = null;
    this.displayDialog = true;
    this.tipoAtencion.activo=1;
  }

  deleteSelectedItems() {
    this.confirmationService.confirm({
        message: '¿Está seguro que desea borrar el tipo de atención?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          
          this.tipoAtenciones = this.tipoAtenciones.filter(val => !this.selectedRegistros.includes(val));
          let index = -1;
          /*for (let i = 0; i < this.selectedEstados.length; i++) {
            this.remove(this.selectedEstados[i]);         
          }*/
          this.tipoAtencionService.deleteByLote(this.selectedRegistros) //eliminar en un ciclo desde el backend
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

  editar(registroActual: TipoAtencion) {
    this.nuevoRegistro = false;
    this.tipoAtencion = this.clone(registroActual);
    this.displayDialog = true;
    this.tituloDialogo = "Editar registro: " + this.tipoAtencion.tipo_atencion_id;
    //this.tipoAtencion.activo=1;
    this.tipoAtencion.activo= (this.tipoAtencion.activo == true ? 1 : 0);

  }

  eliminar(resgistro: TipoAtencion) {
    this.confirmationService.confirm({
        message: '¿Está seguro que desea borar el registro: ' + resgistro.nombre + '?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.tipoAtenciones = this.tipoAtenciones.filter(val => val.tipo_atencion_id !== resgistro.tipo_atencion_id);
            this.remove(resgistro); 
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Registro Borrado', life: 3000});
        }
    });
  }

  
  remove(registroActual: TipoAtencion) {

    this.tipoAtencionService.delete(registroActual.tipo_atencion_id)
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

      this.tipoAtencionService.create(this.tipoAtencion)
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

      this.tipoAtencionService.update(this.tipoAtencion)
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

    this.tipoAtencion  = null;
    this.displayDialog   = false;
    this.submitted = false;
    this.nuevoRegistro = false;
   }

  clone(c:TipoAtencion):TipoAtencion {
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
