
import { GrupoServicioService } from '../../../../services/grupo-servicio.service';
import { Component, OnInit } from '@angular/core';
import { GrupoService, ServicioService } from '../../../../services';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Respuesta, Servicio } from 'src/app/models';

@Component({
  selector: 'app-grupo-servicio',
  templateUrl: './grupo-servicio.component.html',
  styleUrls: ['./grupo-servicio.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class GrupoServicioComponent implements OnInit {
  displayDialog: boolean;
  tituloDialogo: string = '';

  nuevoRegistro: boolean;
  submitted: boolean;
  form: FormGroup;

  serviciosGrupos: any = [];
  reporte: any = [];
  servicioGrupo: any = {};
  selectedRegistros: any[];
  grupos: any[];
  grupoSelected: any;
  cols: any[];
  servicios: Servicio[];

  constructor(
    private fb: FormBuilder,
    private grupoServicioService: GrupoServicioService,
    private grupoService: GrupoService,
    private servicioService: ServicioService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.nuevoRegistro = false;
    this.fullDropdownGrupos();
    this.fullDropdownServicios();

    this.cols = [
      { field: 'grupo_id', header: 'Id', width: '10%' },
      { field: 'grupo', header: 'Grupo', width: '20%' },
      { field: 'servicio', header: 'Servicio', width: '50%' },
    ];
  }

  createForm() {
    this.form = this.fb.group({
      servicio: ['', [Validators.required]],
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
         //No tomar los grupos de laboratorio porque estos no se relacionan con servicios sino con examenes
        this.grupos = aux.filter(x => x.tipo_grupo_id != 2);
        this.grupoSelected=null;
        this.consult();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  fullDropdownServicios() {
    this.servicioService
      .getAllCombo()
      .toPromise()
      .then((results) => {
        this.servicios = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }


  consult() {
    this.grupoServicioService
      .getAllByGrupo(this.grupoSelected)
      .toPromise()
      .then((results) => {
        this.serviciosGrupos = results;

        //console.log("prueba    ", this.serviciosGrupos);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  openNew() {
    this.nuevoRegistro = true;
    this.tituloDialogo = 'Nuevo Registro';
    this.servicioGrupo = {};
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
        this.grupoServicioService
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
    this.servicioGrupo = { ...registroActual };
    this.displayDialog = true;
    this.tituloDialogo = 'Editar: ' + this.servicioGrupo.servicio;
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
    this.grupoServicioService
      .delete(registroActual.grupo_servicio_id)
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
    let aux = { ...this.servicioGrupo };

    if (this.form.valid) {
      if (this.nuevoRegistro) {
        this.grupoServicioService
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
        this.grupoServicioService
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
      this.consult();
    }
  }

  close() {
    this.servicioGrupo = null;
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

  exportExcel() {

    this.reporte = this.serviciosGrupos.map(col => ({
      id: col.grupo_id,
      grupo: col.grupo,
      servicio: col.servicio
  
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

