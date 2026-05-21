import { Component, OnInit } from '@angular/core';
import { Examen, Respuesta } from '../../../../models';
import { ExamenService} from '../../../../services';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-examen',
  templateUrl: './examen.component.html',
  styleUrls: ['./examen.component.scss'], 
  providers: [MessageService,ConfirmationService] 
}) 

export class ExamenComponent implements OnInit {

 
  displayDialog: boolean;
  tituloDialogo: string = "";

  nuevoRegistro: boolean;
  submitted: boolean;
  form: FormGroup;

  examenes: Examen[];

  examen: Examen;

  selectedRegistros: Examen[];

  cols: any[]; // Para manejo de las columnas de la tabla

  constructor(
    private fb: FormBuilder,
    private examenService: ExamenService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { 
    this.createForm();

    }

  ngOnInit() { 
    this.consultar();
    this.nuevoRegistro=false;

    this.cols = [
      { field: 'examen_id', header: 'Id',  width: '10%' },
      { field: 'nombre', header: 'Nombre', width: '70%' },
      { field: 'is_interno', header: 'Interno', width: '10%' },
      

    ];
  }

  handleChange(e, registro: Examen) {
    registro.is_interno= (e.checked == true ? 1 : 0)
  }

  createForm() {

    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      is_interno: [''],
 
    });
  }

   
  consultar(){

    this.examenService.getAllCombo()
    .toPromise()
    .then(
      results => { 
        this.examenes = results; 
      }
    )
    .catch(err => { console.log(err) });
  }

  openNew() {
    this.nuevoRegistro = true;
    this.tituloDialogo = "Nuevo Servicio";
    this.examen = {};
    //this.tipoAtencion = null;
    this.displayDialog = true;
    this.examen.is_interno=0;
  }

  deleteSelectedItems() {
    this.confirmationService.confirm({
        message: '¿Está seguro que desea borrar el registro?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          
          this.examenes = this.examenes.filter(val => !this.selectedRegistros.includes(val));
          let index = -1;
          /*for (let i = 0; i < this.selectedEstados.length; i++) {
            this.remove(this.selectedEstados[i]);         
          }*/
          this.examenService.deleteByLote(this.selectedRegistros) //eliminar en un ciclo desde el backend
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

  editar(registroActual: Examen) {
    this.nuevoRegistro = false;
    this.examen = this.clone(registroActual);
    this.displayDialog = true;
    this.tituloDialogo = "Editar registro: " + this.examen.examen_id;
    //this.examen.is_interno=1;

  }

  eliminar(resgistro: Examen) {
    this.confirmationService.confirm({
        message: '¿Está seguro que desea borar el registro: ' + resgistro.nombre + '?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.examenes = this.examenes.filter(val => val.examen_id !== resgistro.examen_id);
            this.remove(resgistro); 
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Registro Borrado', life: 3000});
        }
    });
  }

  
  remove(registroActual: Examen) {

    this.examenService.delete(registroActual.examen_id)
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


      console.log('EXAMEN: ', this.examen);
      this.examenService.create(this.examen)
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

      this.examenService.update(this.examen)
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

    this.examen  = null;
    this.displayDialog   = false;
    this.submitted = false;
    this.nuevoRegistro = false;
   }

  clone(c:Examen):Examen {
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
