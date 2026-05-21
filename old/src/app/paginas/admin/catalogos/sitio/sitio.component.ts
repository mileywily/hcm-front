import { Component, OnInit } from '@angular/core';
import { Sitio, Respuesta } from '../../../../models';
import { SitioService } from '../../../../services';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-sitio',
  templateUrl: './sitio.component.html',
  styleUrls: ['./sitio.component.scss'], 
  providers: [MessageService,ConfirmationService] 
}) 

export class SitioComponent implements OnInit {

 
  displayDialog: boolean;
  tituloDialogo: string = "";

  nuevoRegistro: boolean;
  submitted: boolean;
  form: FormGroup;

  sitios: Sitio[];

  sitio: Sitio;

  selectedRegistros: Sitio[];

  cols: any[]; // Para manejo de las columnas de la tabla

  constructor(
    private fb: FormBuilder,
    private sitioService: SitioService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { 
    this.createForm();

    }

  ngOnInit() { 
    this.consultar();
    this.nuevoRegistro=false;

    this.cols = [
      { field: 'sitio_id',   header: 'Id',  width: '10%' },
      { field: 'nombre',     header: 'Nombre', width: '30%' },
      { field: 'direccion',  header: 'Dirección', width: '30%' },
      { field: 'telefono',   header: 'Teléfono', width: '20%' },
      { field: 'activo',     header: 'Activo',  width: '10%' },

    ];
  }

  handleChange(e, registro: Sitio) {
    registro.activo= (e.checked == true ? 1 : 0)
  }

  createForm() {

    this.form = this.fb.group({
      //codigo:  ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      activo: [''],
 
    });
  }

   
  consultar(){

    this.sitioService.getAllCombo()
    .toPromise()
    .then(
      results => { 
        this.sitios = results; 
      }
    )
    .catch(err => { console.log(err) });
  }

  openNew() {
    this.nuevoRegistro = true;
    this.tituloDialogo = "Nuevo Sitio";
    this.sitio = {};
    //this.tipoAtencion = null;
    this.displayDialog = true;
    this.sitio.activo=1;
  }

  deleteSelectedItems() {
    this.confirmationService.confirm({
        message: '¿Está seguro que desea borrar el registro?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          
          this.sitios = this.sitios.filter(val => !this.selectedRegistros.includes(val));
          let index = -1;
          /*for (let i = 0; i < this.selectedEstados.length; i++) {
            this.remove(this.selectedEstados[i]);         
          }*/
          this.sitioService.deleteByLote(this.selectedRegistros) //eliminar en un ciclo desde el backend
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

  editar(registroActual: Sitio) {
    this.nuevoRegistro = false;
    this.sitio = this.clone(registroActual);
    this.displayDialog = true;
    this.tituloDialogo = "Editar registro: " + this.sitio.sitio_id;
    this.sitio.activo=1;

  }

  eliminar(resgistro: Sitio) {
    this.confirmationService.confirm({
        message: '¿Está seguro que desea borar el registro: ' + resgistro.nombre + '?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.sitios = this.sitios.filter(val => val.sitio_id !== resgistro.sitio_id);
            this.remove(resgistro); 
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Registro Borrado', life: 3000});
        }
    });
  }

  
  remove(registroActual: Sitio) {

    this.sitioService.delete(registroActual.sitio_id)
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

      this.sitioService.create(this.sitio)
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

      this.sitioService.update(this.sitio)
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

    this.sitio  = null;
    this.displayDialog   = false;
    this.submitted = false;
    this.nuevoRegistro = false;
   }

  clone(c:Sitio):Sitio {
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
