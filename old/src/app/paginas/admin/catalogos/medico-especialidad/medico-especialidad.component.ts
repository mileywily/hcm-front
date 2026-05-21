import { Component, OnInit } from '@angular/core';
import { MedicoEspecialidad, Medico, Especialidad, Respuesta } from '../../../../models';
import { MedicoEspecialidadService, MedicoService,  EspecialidadService} from '../../../../services';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
//import { threadId } from 'worker_threads';

@Component({
  selector: 'app-medico-especialidad',
  templateUrl: './medico-especialidad.component.html',
  styleUrls: ['./medico-especialidad.component.scss'], 
  providers: [MessageService,ConfirmationService] 
}) 

export class MedicoEspecialidadComponent implements OnInit {
  displayDialog: boolean;
  tituloDialogo: string = '';

  nuevoRegistro: boolean;
  submitted: boolean;
  form: FormGroup;
  
  medicoEspecialidades: MedicoEspecialidad[];
  medicoEspecialidad: MedicoEspecialidad = {};
  selectedRegistros: MedicoEspecialidad[];

  medicos: Medico[];
  medicoSelected: Medico;
  reporte: any = [];
  
  especialidades: Medico[];
  especialidadSelected: Medico;
  cols: any[];

  constructor(
    private fb: FormBuilder,
    private medicoEspecialidadService: MedicoEspecialidadService,
    private medicoService: MedicoService,
    private especialidadService: EspecialidadService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.createForm();
  }

  ngOnInit() {
    //this.medicoEspecialidadService.getEspecialidaByMedico(this.medicoSelected);
    this.medicoEspecialidadService.getMedicoByEspecialidad(this.especialidadSelected);
    this.nuevoRegistro = false;
    this.fullDropdownMedicos();
    this.fullDropdownEspecialidades();

    this.cols = [
      { field: 'especialidad_id', header: 'Id', width: '10%' },
      { field: 'especialidad', header: 'Especialidad', width: '20%' },
      { field: 'label', header: 'Médico', width: '70%' },
    ];
  }

  createForm() {
    this.form = this.fb.group({
      medico: ['', [Validators.required]],
      especialidad: ['', [Validators.required]],
    });
  }

  fullDropdownMedicos() {
    this.medicoService
      .getAllCombo()
      .toPromise()
      .then((results) => {
        this.medicos = results;
        this.especialidadSelected = null;
        this.consultarMedicoEspecialidad();

      })
      .catch((err) => {
        console.log(err);
      });
  }

  fullDropdownEspecialidades() {
    this.especialidadService
      .getAllCombo()
      .toPromise()
      .then((results) => {
        this.especialidades = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  consultar() {
    this.medicoEspecialidadService
      .getAll()
      .toPromise()
      .then((results) => {

        //console.log(results);
        this.medicoEspecialidades = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  consultarMedicoEspecialidad() {


    this.medicoEspecialidadService
      .getMedicoByEspecialidad(this.especialidadSelected)

      .toPromise()
      .then((results) => {


        this.medicoEspecialidades = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  openNew() {
    this.nuevoRegistro = true;
    this.tituloDialogo = 'Nuevo Registro';
    this.medicoEspecialidad = {};
    this.displayDialog = true;
    this.submitted = false;
  }

  deleteSelectedItems() {
    this.confirmationService.confirm({
        message: '¿Está seguro que desea borrar el registro?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          
          this.medicoEspecialidades= this.medicoEspecialidades.filter(val => !this.selectedRegistros.includes(val));
          let index = -1;
          /*for (let i = 0; i < this.selectedEstados.length; i++) {
            this.remove(this.selectedEstados[i]);         
          }*/
          this.medicoEspecialidadService.deleteByLote(this.selectedRegistros) //eliminar en un ciclo desde el backend
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

  editar(registroActual: MedicoEspecialidad) {
    this.nuevoRegistro = false;
    this.medicoEspecialidad = this.clone(registroActual);
    this.displayDialog = true;
    this.tituloDialogo = 'Editar: ' + this.medicoEspecialidad.especialidad;
    this.submitted = false;
  }

  eliminar(medicoEspecialidad: MedicoEspecialidad) {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea borrar : ' + medicoEspecialidad.especialidad + ' / ' +  medicoEspecialidad.medico  + '?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.medicoEspecialidades = this.medicoEspecialidades.filter(
          (val) => val.medico_especialidad_id !== medicoEspecialidad.medico_especialidad_id
        );
        this.remove(medicoEspecialidad);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Registro Borrado',
          life: 3000,
        });
      },
    });
  }

  remove(registroActual: MedicoEspecialidad) {
    this.medicoEspecialidadService
      .delete(registroActual.medico_especialidad_id)
      .toPromise()
      .then((results) => {
        let aux: Respuesta = results; 
        if (aux) {
          this.showSuccess(aux.details);
          this.consultarMedicoEspecialidad();
        } else {
          this.showError(aux.details);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  guardar() {
    this.submitted = true;

    if (this.form.valid) {
      if (this.nuevoRegistro) {
        this.medicoEspecialidadService
          .create(this.medicoEspecialidad)
          .toPromise()
          .then((results) => {
            let aux: Respuesta = results;
            if (aux) {
              if (aux.status == '500'){
                this.showError(aux.details);
              }else{
                this.showSuccess(aux.details);
              }
              this.consultarMedicoEspecialidad();
            } else {
              this.showError(aux.details); 
            }
            this.close();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.medicoEspecialidadService
          .update(this.medicoEspecialidad)
          .toPromise()
          .then((results) => {
            let aux: Respuesta = results;
            if (aux) {
              this.showSuccess(aux.details);
              this.consultarMedicoEspecialidad(); 
              this.close();

            } else {
              this.showError(aux.details); 
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }

  close() {
    this.medicoEspecialidad = null;
    this.displayDialog = false;
    this.submitted = false;
    this.nuevoRegistro = false;
  }

  clone(c: MedicoEspecialidad): MedicoEspecialidad {
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
    this.messageService.add({
      key: 'tc',
      severity: 'success',
      summary: successMsg,
    });
  }

  exportExcel() {

    this.reporte = this.medicoEspecialidades.map(col => ({
      id: col.especialidad_id,
      especialidad: col.especialidad,
      medico: col.label
  
    }));
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.reporte);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xls',
        type: 'array'
      });
      this.saveAsExcelFile(excelBuffer, 'reporte');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xls';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

}
