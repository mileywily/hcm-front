import { Component, OnInit } from '@angular/core';
import { GrupoDiagnostico, Respuesta } from '../../../../models';
import { GrupoDiagnosticoService } from '../../../../services';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-grupo-diagnostico',
  templateUrl: './grupo-diagnostico.component.html',
  styleUrls: ['./grupo-diagnostico.component.scss'], 
  providers: [MessageService,ConfirmationService] 
}) 

export class GrupoDiagnosticoComponent implements OnInit {

 
  displayDialog: boolean;
  tituloDialogo: string = "";

  nuevoRegistro: boolean;
  submitted: boolean;
  form: FormGroup;

  grupoDiagnosticos: GrupoDiagnostico[];

  grupoDiagnostico: GrupoDiagnostico;

  selectedRegistros: GrupoDiagnostico[];

  cols: any[]; // Para manejo de las columnas de la tabla

  constructor(
    private fb: FormBuilder,
    private grupoDiagnosticoService: GrupoDiagnosticoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { 
    this.createForm();

    }

  ngOnInit() { 
    this.consultar();
    this.nuevoRegistro=false;

    this.cols = [
      { field: 'grupo_diagnostico_id', header: 'Id',  width: '10%' },
      { field: 'nombre', header: 'nombre',  width: '90%' },

    ];
  }

  handleChange(e, registro: GrupoDiagnostico) {
    //registro.activo= (e.checked == true ? 1 : 0)
  }

  createForm() {

    this.form = this.fb.group({
      //codigo:  ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      //descripcion: ['', [Validators.required]],
      //activo: ['', [Validators.required]],
 
    });
  }

   
  consultar(){

    this.grupoDiagnosticoService.getAllCombo()
    .toPromise()
    .then(
      results => { 
        this.grupoDiagnosticos = results; 
      }
    )
    .catch(err => { console.log(err) });
  }

  openNew() {
    this.nuevoRegistro = true;
    this.tituloDialogo = "Nuevo Grupo de Diagnosticos";
    this.grupoDiagnostico = {};
    this.displayDialog = true;
    //this.grupoDiagnostico.activo=1;
  }

  deleteSelectedItems() {
    this.confirmationService.confirm({
        message: '¿Está seguro que desea borrar el registro?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          
          this.grupoDiagnosticos= this.grupoDiagnosticos.filter(val => !this.selectedRegistros.includes(val));
          let index = -1;
          /*for (let i = 0; i < this.selectedEstados.length; i++) {
            this.remove(this.selectedEstados[i]);         
          }*/
          this.grupoDiagnosticoService.deleteByLote(this.selectedRegistros) //eliminar en un ciclo desde el backend
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

  editar(registroActual: GrupoDiagnostico) {
    this.nuevoRegistro = false;
    this.grupoDiagnostico = this.clone(registroActual);
    this.displayDialog = true;
    this.tituloDialogo = "Editar registro: " + this.grupoDiagnostico.grupo_diagnostico_id;
   //this.tipoSolicitud.activo=1;

  }

  eliminar(registro: GrupoDiagnostico) {
    this.confirmationService.confirm({
        message: '¿Está seguro que desea borar el registro: ' + registro.nombre + '?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.grupoDiagnosticos = this.grupoDiagnosticos.filter(val => val.grupo_diagnostico_id !== registro.grupo_diagnostico_id);
            this.remove(registro); 
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Registro Borrado', life: 3000});
        }
    });
  }

  
  remove(registroActual: GrupoDiagnostico) {

    this.grupoDiagnosticoService.delete(registroActual.grupo_diagnostico_id)
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

      this.grupoDiagnosticoService.create(this.grupoDiagnostico)
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

      this.grupoDiagnosticoService.update(this.grupoDiagnostico)
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

    this.grupoDiagnostico  = null;
    this.displayDialog   = false;
    this.submitted = false;
    this.nuevoRegistro = false;
   }

  clone(c:GrupoDiagnostico):GrupoDiagnostico {
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
