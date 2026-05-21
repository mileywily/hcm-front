import { Component, OnInit } from '@angular/core';
import { Diagnostico, TipoDiagnostico, GrupoDiagnostico, Respuesta } from '../../../../models';
import { DiagnosticoService,TipoDiagnosticoService, GrupoDiagnosticoService } from '../../../../services';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-diagnostico',
  templateUrl: './diagnostico.component.html',
  styleUrls: ['./diagnostico.component.scss'], 
  providers: [MessageService,ConfirmationService] 
}) 

export class DiagnosticoComponent implements OnInit {

 
  displayDialog: boolean;
  tituloDialogo: string = "";

  nuevoRegistro: boolean;
  submitted: boolean;
  form: FormGroup;

  diagnosticos: Diagnostico[];

  diagnostico: Diagnostico;

  grupoDiagnosticos: Diagnostico[];

  grupoDiagnostico: Diagnostico;

  tipoDiagnosticos: Diagnostico[];

  tipoDiagnostico: Diagnostico;

  selectedRegistros: Diagnostico[];

  cols: any[]; // Para manejo de las columnas de la tabla

  constructor(
    private fb: FormBuilder,
    private diagnosticoService: DiagnosticoService,
    private tipoDiagnosticoService: TipoDiagnosticoService,
    private grupoDiagnosticoService: GrupoDiagnosticoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { 
    this.createForm();

    }

  ngOnInit() { 
    this.consultar();
    this.nuevoRegistro=false;
    this.fullDropdownTipos();
    this.fullDropdownGrupos();

    this.cols = [
      { field: 'diagnostico_id', header: 'Id',  width: '10%' },
      { field: 'nombre', header: 'Nombre', width: '30%' },
      { field: 'nombre_tipo', header: 'Clase diagnostico',  width: '25%' },
      { field: 'nombre_grupo', header: 'Grupo Diagnostico',  width: '25%' },
      { field: 'activo', header: 'Activo',  width: '10%' },

    ];
  }

  handleChange(e, registro: Diagnostico) {
    registro.activo= (e.checked == true ? 1 : 0)
  }

  createForm() {

    this.form = this.fb.group({
      codigo:  ['', [Validators.required]],
      nombre: ['', [Validators.required]],
     /* descripcion: ['', [Validators.required]],*/
      tipoDiagnostico: ['', [Validators.required]],
      grupoDiagnostico: ['', [Validators.required]],
      activo: ['', [Validators.required]],
 
    });
  }

  fullDropdownTipos() {
    this.tipoDiagnosticoService
      .getAllCombo()
      .toPromise()
      .then((results) => {
        this.tipoDiagnosticos = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  fullDropdownGrupos() {
    this.grupoDiagnosticoService
      .getAllCombo()
      .toPromise()
      .then((results) => {
        this.grupoDiagnosticos = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }
   
  consultar(){

    this.diagnosticoService.getAllCombo()
    .toPromise()
    .then(
      results => { 
        this.diagnosticos = results; 
      }
    )
    .catch(err => { console.log(err) });
  }

  openNew() {
    this.nuevoRegistro = true;
    this.tituloDialogo = "Nuevo Servicio";
    this.diagnostico = {};
    //this.tipoAtencion = null;
    this.displayDialog = true;
    //this.tipoAtencion.activo=1;
  }

  deleteSelectedItems() {
    this.confirmationService.confirm({
        message: '¿Está seguro que desea borrar el registro?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          
          this.diagnosticos = this.diagnosticos.filter(val => !this.selectedRegistros.includes(val));
          let index = -1;
          /*for (let i = 0; i < this.selectedEstados.length; i++) {
            this.remove(this.selectedEstados[i]);         
          }*/
          this.diagnosticoService.deleteByLote(this.selectedRegistros) //eliminar en un ciclo desde el backend
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

  editar(registroActual: Diagnostico) {
    this.nuevoRegistro = false;
    this.diagnostico = this.clone(registroActual);
    this.displayDialog = true;
    this.tituloDialogo = "Editar registro: " + this.diagnostico.diagnostico_id;
   //this.tipoAtencion.activo=1;

  }

  eliminar(resgistro: Diagnostico) {
    this.confirmationService.confirm({
        message: '¿Está seguro que desea borar el registro: ' + resgistro.nombre + '?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.diagnosticos = this.diagnosticos.filter(val => val.diagnostico_id !== resgistro.diagnostico_id);
            this.remove(resgistro); 
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Registro Borrado', life: 3000});
        }
    });
  }

  
  remove(registroActual: Diagnostico) {

    this.diagnosticoService.delete(registroActual.diagnostico_id)
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

      this.diagnosticoService.create(this.diagnostico)
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

      this.diagnosticoService.update(this.diagnostico)
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
  else
  {
    this.showError("Error en datos");
  }
}

  close() {

    this.diagnostico  = null;
    this.displayDialog   = false;
    this.submitted = false;
    this.nuevoRegistro = false;
   }

  clone(c:Diagnostico):Diagnostico {
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
