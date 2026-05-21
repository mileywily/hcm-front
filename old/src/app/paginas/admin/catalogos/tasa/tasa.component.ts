import { Component, OnInit, TRANSLATIONS } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TasaService } from '../../../../services';
import {  Respuesta,Tasas_Cambio } from '../../../../models';

@Component({
  selector: 'app-tasa',
  templateUrl: './tasa.component.html',
  styleUrls: ['./tasa.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class TasaComponent implements OnInit {

  displayDialog: boolean;
  tituloDialogo: string = '';

  nuevoRegistro: boolean;
  submitted: boolean;
  form: FormGroup;
  reporte : any = [];
  datos: Tasas_Cambio[];
  tasa_unic: Tasas_Cambio = {};
  selectedRegistros: any[];

  cols: any[];

  constructor(
    private fb: FormBuilder,
    private tasaService: TasaService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {
    this.createForm();
   }

  ngOnInit(): void 
  {

    this.cols = [
      { field: 'tasa_id', header: 'Id', width: '10%' },
      { field: 'nombre', header: 'Tasa', width: '30%' },
      { field: 'mes', header: 'mes', width: '30%' },
      { field: 'anio', header: 'anio', width: '30%' },
      { field: 'moneda', header: 'moneda', width: '30%' },
    ];

    this.consultar();
    this.nuevoRegistro = false;
  }

  createForm() {
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      mes: ['', [Validators.required]],
      anio: ['', [Validators.required]],
      moneda : ['',[Validators.required] ]
    });
  }

  remove(registroActual: any) {
    this.tasaService
      .delete(registroActual.tasa_id)
      .toPromise()
      .then((results) => {
        let aux: Respuesta = results;
        if (aux) {
          this.showSuccess(aux.details);
          this.consultar();
        } else {
          this.showError(aux.details);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  confirmDelete(tasa: any) {
    this.confirmationService.confirm({
      message:
        '¿Está seguro que desea borrar : ' + tasa.tasa_id + '?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {


        this.remove(tasa);
      },
    });
  }

  consultar() {
    this.tasaService
      .getAll()
      .toPromise()
      .then((results) => {
           this.datos = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  openNew() {
    this.nuevoRegistro = true;
    this.tituloDialogo = 'Nuevo Registro';
    this.tasa_unic = {};
    this.displayDialog = true;
    this.submitted = false;
  }

  deleteByLote(){
    this.tasaService
    .deleteByLote(this.selectedRegistros)
    .toPromise()
    .then((results) => {
      let aux: Respuesta = results;
      if (aux) {
        this.selectedRegistros = null;
        this.consultar();
        this.showSuccess(aux.details);
      } else {
        this.showError(aux.details);
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  deleteSelectedItems() {
    this.confirmationService.confirm({
      message: '¿Está seguro que desea borrar el/los registro/s?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Si',
      rejectLabel: 'No',
      accept: () => {
        this.deleteByLote();
      },
    });
  }

  edit(registroActual: any) {
    this.nuevoRegistro = false;
    this.tasa_unic = { ...registroActual };
    this.displayDialog = true;
    this.tituloDialogo = 'Editar: ' + this.tasa_unic.tasa_id;
    this.submitted = false;
  }

  exportExcel() {

    this.reporte = this.datos.map(col => ({
      id: col.tasa_id,
      Tasa: col.nombre,
      Mes: col.mes,
      Anio: col.anio,
      Moneda: col.moneda
  
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

  save() {
    this.submitted = true;
    console.log("formu",this.tasa_unic);

    if (this.form.valid) {
      if (this.nuevoRegistro) {
        this.tasaService
          .create(this.tasa_unic)
          .toPromise()
          .then((results) => {
            let aux: Respuesta = results;
            if (aux) {
              this.consultar();
              this.showSuccess(aux.details);
            } else {
              this.showError(aux.details);
            }
            this.close();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.tasaService
          .update(this.tasa_unic)
          .toPromise()
          .then((results) => {
            let aux: Respuesta = results;
            if (aux) {
              this.consultar();
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
    this.tasa_unic = null;
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