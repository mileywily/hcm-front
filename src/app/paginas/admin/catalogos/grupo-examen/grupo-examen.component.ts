
import { GrupoExamenService } from '../../../../services/grupo-examen.service';
import { Component, OnInit } from '@angular/core';
import { ExamenService, GrupoService, ServicioService } from '../../../../services';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  Respuesta, Examen } from 'src/app/models';

@Component({
  selector: 'app-grupo-examen',
  templateUrl: './grupo-examen.component.html',
  styleUrls: ['./grupo-examen.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class GrupoExamenComponent implements OnInit {
  displayDialog: boolean;
  tituloDialogo: string = '';

  nuevoRegistro: boolean;
  submitted: boolean;
  form: FormGroup;

  gruposExamenes: any = [];
  
  reporte: any = [];
  grupoExamen: any = {};
  selectedRegistros: any[];
  grupos: any[];
  grupoSelected: any;
  cols: any[];
  examenes: Examen[];


  
  constructor(
    private fb: FormBuilder,
    private grupoExamenService: GrupoExamenService,
    private grupoService: GrupoService,
    private examenService: ExamenService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.nuevoRegistro = false;
    this.fullDropdownGrupos();
    this.fullDropdownExamenes();
    
    this.cols = [
      { field: 'grupo_id', header: 'Id', width: '10%' },
      { field: 'grupo', header: 'Grupo', width: '20%' },
      { field: 'name', header: 'Examen', width: '50%' },
    ];
  }

  createForm() {
    this.form = this.fb.group({
      examen: ['', [Validators.required]],
      grupo: ['', [Validators.required]]
    });
  }

  fullDropdownGrupos() {
    this.grupoService
      .getAllCombo()
      .toPromise()
      .then((results) => {
          let aux=[];
        aux=results;
         //Tomar los grupos de laboratorio porque estos solo se relacionan con examenes
        this.grupos = aux.filter(x => x.tipo_grupo_id == 2);
        this.grupoSelected=null;
        this.consult();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  exportExcel() {

    this.reporte = this.gruposExamenes.map(col => ({
      id: col.grupo_id,
      grupo: col.grupo,
      examen: col.name
  
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
 

  
  fullDropdownExamenes() {
    this.examenService
      .getAllCombo()
      .toPromise()
      .then((results) => {
        this.examenes = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }


  consult() {
    this.grupoExamenService
      .getAllByGrupo(this.grupoSelected)
      .toPromise()
      .then((results) => {
        this.gruposExamenes = results;
       })
      .catch((err) => {
        console.log(err);
      });
  }

  openNew() {
    this.nuevoRegistro = true;
    this.tituloDialogo = 'Nuevo Registro';
    this.grupoExamen = {};
    this.displayDialog = true;
    this.submitted = false;
  }

  deleteSelectedItems() {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea borrar el/los registro/s?',
      header: 'Confirmación',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.grupoExamenService
          .deleteByLote(this.selectedRegistros)
          .toPromise()
          .then((results) => {            
            let aux: Respuesta = results;
            if (aux) {
              this.consult();
              this.selectedRegistros = null;
              this.showSuccess(aux.details);
            } else {
              this.showError(aux.details);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      },
    });
  }

  edit(registroActual: any) {
    this.nuevoRegistro = false;
    this.grupoExamen = { ...registroActual };
    this.displayDialog = true;
    this.tituloDialogo = 'Editar: ' + this.grupoExamen.servicio;
    this.submitted = false;
  }

  confirmDelete(registro: any) {
    this.confirmationService.confirm({
      message:
        '¿Está seguro que desea borrar : ' +
        registro.servicio +
        '?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.remove(registro);
      },
    });
  }

  remove(registroActual: any) {
    this.grupoExamenService
      .delete(registroActual.grupo_examen_id)
      .toPromise()
      .then((results) => {
        let aux: Respuesta = results;
        if (aux) {
          this.consult();
          this.showSuccess(aux.details);
        } else {
          this.showError(aux.details);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  save() {
    this.submitted = true;
    let aux = { ...this.grupoExamen };

    if (this.form.valid) {
      if (this.nuevoRegistro) {
        this.grupoExamenService
          .create(aux)
          .toPromise()
          .then((results) => {
            let aux: Respuesta = results;
            if (aux) {
              this.consult();

              if (aux.status == '500'){
                this.showError(aux.details);
              }else{
                this.showSuccess(aux.details);
              }
            } else {
              this.showError(aux.details);
            }
            this.close();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.grupoExamenService
          .update(aux)
          .toPromise()
          .then((results) => {
            let aux: Respuesta = results;
            if (aux) {
              this.consult();
              this.showSuccess(aux.details);
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
    this.grupoExamen = null;
    this.displayDialog = false;
    this.submitted = false;
    this.nuevoRegistro = false;
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
}

