import { Component, OnInit } from '@angular/core';
import { TipoDiagnostico, Respuesta } from '../../../../models';
import { TipoDiagnosticoService } from '../../../../services';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-tipo-diagnostico',
  templateUrl: './tipo-diagnostico.component.html',
  styleUrls: ['./tipo-diagnostico.component.scss'], 
  providers: [MessageService,ConfirmationService] 
}) 

export class TipoDiagnosticoComponent implements OnInit {

 
  displayDialog: boolean;
  tituloDialogo: string = "";

  nuevoRegistro: boolean;
  submitted: boolean;
  form: FormGroup;

  tipoDiagnosticos: TipoDiagnostico[];

  tipoDiagnostico: TipoDiagnostico;

  selectedRegistros: TipoDiagnostico[];

  cols: any[]; // Para manejo de las columnas de la tabla

  constructor(
    private fb: FormBuilder,
    private tipoDiagnosticoService: TipoDiagnosticoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { 
    this.createForm();

    }

  ngOnInit() { 
    this.consultar();
    this.nuevoRegistro=false;

    this.cols = [
      { field: 'tipo_diagnostico_id', header: 'Id',  width: '10%' },
      { field: 'codigo', header: 'codigo', width: '30%' },
      { field: 'nombre', header: 'nombre',  width: '60%' },

    ];
  }

  handleChange(e, registro: TipoDiagnostico) {
    //registro.activo= (e.checked == true ? 1 : 0)
  }

  createForm() {

    this.form = this.fb.group({
      //codigo:  ['', [Validators.required]],
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      //activo: ['', [Validators.required]],
 
    });
  }

   
  consultar(){

    this.tipoDiagnosticoService.getAllCombo()
    .toPromise()
    .then(
      results => { 
        this.tipoDiagnosticos = results; 
      }
    )
    .catch(err => { console.log(err) });
  }

  openNew() {
    this.nuevoRegistro = true;
    this.tituloDialogo = "Nuevo Tipo de Diagnosticos";
    this.tipoDiagnostico = {};
    this.displayDialog = true;
    //this.tipoSolicitud.activo=1;
  }

  deleteSelectedItems() {
    this.confirmationService.confirm({
        message: '¿Está seguro que desea borrar el registro?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          
          this.tipoDiagnosticos= this.tipoDiagnosticos.filter(val => !this.selectedRegistros.includes(val));
          let index = -1;
          /*for (let i = 0; i < this.selectedEstados.length; i++) {
            this.remove(this.selectedEstados[i]);         
          }*/
          this.tipoDiagnosticoService.deleteByLote(this.selectedRegistros) //eliminar en un ciclo desde el backend
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

  editar(registroActual: TipoDiagnostico) {
    this.nuevoRegistro = false;
    this.tipoDiagnostico = this.clone(registroActual);
    this.displayDialog = true;
    this.tituloDialogo = "Editar registro: " + this.tipoDiagnostico.tipo_diagnostico_id;
   //this.tipoSolicitud.activo=1;

  }

  eliminar(registro: TipoDiagnostico) {
    this.confirmationService.confirm({
        message: '¿Está seguro que desea borar el registro: ' + registro.nombre + '?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.tipoDiagnosticos = this.tipoDiagnosticos.filter(val => val.tipo_diagnostico_id !== registro.tipo_diagnostico_id);
            this.remove(registro); 
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Registro Borrado', life: 3000});
        }
    });
  }

  
  remove(registroActual: TipoDiagnostico) {

    this.tipoDiagnosticoService.delete(registroActual.tipo_diagnostico_id)
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

      this.tipoDiagnosticoService.create(this.tipoDiagnostico)
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

      this.tipoDiagnosticoService.update(this.tipoDiagnostico)
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

    this.tipoDiagnostico  = null;
    this.displayDialog   = false;
    this.submitted = false;
    this.nuevoRegistro = false;
   }

  clone(c:TipoDiagnostico):TipoDiagnostico {
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
