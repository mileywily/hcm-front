import { Component, OnInit } from '@angular/core';
import { Medico, Respuesta } from '../../../../models';
import { MedicoService } from '../../../../services';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.scss'], 
  providers: [MessageService,ConfirmationService] 
}) 

export class MedicoComponent implements OnInit {

 
  displayDialog: boolean;
  tituloDialogo: string = "";

  nuevoRegistro: boolean;
  submitted: boolean;
  form: FormGroup;

  medicos: Medico[];

  medico: Medico;

  selectedRegistros: Medico[];

  cols: any[]; // Para manejo de las columnas de la tabla

  constructor(
    private fb: FormBuilder,
    private medicoService: MedicoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { 
    this.createForm();

    }

  ngOnInit() { 
    this.consultar();
    this.nuevoRegistro=false;

    this.cols = [
      { field: 'medico_id',   header: 'Id',  width: '10%' },
      { field: 'nombres',     header: 'Nombres', width: '30%' },
      { field: 'apellidos',   header: 'Apellidos', width: '30%' },
      { field: 'cedula',      header: 'Cédula', width: '20%' },
      //{ field: 'msds',        header: 'Msds', width: '10%' },
      //{ field: 'telefono',    header: 'Teléfono', width: '10%' },
      //{ field: 'email',       header: 'Email', width: '10%' },
      { field: 'activo',      header: 'Activo',  width: '10%' },

    ];
  }

  handleChange(e, registro: Medico) {
    registro.activo= (e.checked == true ? 1 : 0)
  }

  createForm() {

    this.form = this.fb.group({
      //codigo:  ['', [Validators.required]],
      nombres: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      cedula: ['', [Validators.required]],
      msds: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required]],
      activo: ['', [Validators.required]],
      horario: ['', [Validators.required]],
      parroquia: ['', [Validators.required]],
      direccion_consultorio: ['', [Validators.required]],
 
    });
  }

   
  consultar(){

    this.medicoService.getAllCombo()
    .toPromise()
    .then(
      results => { 
        this.medicos = results; 
      }
    )
    .catch(err => { console.log(err) });
  }

  openNew() {
    this.nuevoRegistro = true;
    this.tituloDialogo = "Nuevo Médico";
    this.medico = {};
    //this.tipoAtencion = null;
    this.displayDialog = true;
    this.medico.activo=1;
  }

  deleteSelectedItems() {
    this.confirmationService.confirm({
        message: '¿Está seguro que desea borrar el registro?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          
          this.medicos = this.medicos.filter(val => !this.selectedRegistros.includes(val));
          let index = -1;
          /*for (let i = 0; i < this.selectedEstados.length; i++) {
            this.remove(this.selectedEstados[i]);         
          }*/
          this.medicoService.deleteByLote(this.selectedRegistros) //eliminar en un ciclo desde el backend
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

  editar(registroActual: Medico) {
    this.nuevoRegistro = false;
    this.medico = this.clone(registroActual);
    this.displayDialog = true;
    this.tituloDialogo = "Editar registro: " + this.medico.medico_id;
    this.medico.activo=1;

  }

  eliminar(resgistro: Medico) {
    this.confirmationService.confirm({
        message: '¿Está seguro que desea borar el registro: ' + resgistro.nombres + '?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.medicos = this.medicos.filter(val => val.medico_id !== resgistro.medico_id);
            this.remove(resgistro); 
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Registro Borrado', life: 3000});
        }
    });
  }

  
  remove(registroActual: Medico) {

    this.medicoService.delete(registroActual.medico_id)
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

        this.medicoService.create(this.medico)
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

        this.medicoService.update(this.medico)
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

    this.medico  = null;
    this.displayDialog   = false;
    this.submitted = false;
    this.nuevoRegistro = false;
   }

  clone(c:Medico):Medico {
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
