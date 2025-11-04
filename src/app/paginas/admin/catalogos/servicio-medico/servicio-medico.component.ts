import { Component, OnInit } from '@angular/core';
import { MedicoService, ServicioService,ServicioMedicoService } from '../../../../services';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Respuesta, Servicio,Medico } from 'src/app/models';

@Component({
  selector: 'app-servicio-medico',
  templateUrl: './servicio-medico.component.html',
  styleUrls: ['./servicio-medico.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ServicioMedicoComponent implements OnInit {

  displayDialog: boolean;
  tituloDialogo: string = '';

  nuevoRegistro: boolean;
  submitted: boolean;
  form: FormGroup;

  serviciosMedicos: any = [];
  reporte : any = [];
  servicioMedico: any = {};
  selectedRegistros: any[];

  medicos: Medico[];
  medicoSelected: Medico;

  cols: any[];
  servicios: Servicio[];
  servicioSelected: Servicio;

  constructor(
    private fb: FormBuilder,
    private servicioService: ServicioService,
    private medicoService: MedicoService,
    private ServicioMedicoService:ServicioMedicoService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) 
  {
    this.createForm();
  }

  ngOnInit(): void 
  {
    this.nuevoRegistro = false;
    this.fullDropdownMedicos();
    this.fullDropdownServicios();

    this.cols = [
      { field: 'medico_id', header: 'Id', width: '10%' },
      { field: 'medico_nombre', header: 'Médico', width: '10%' },
      { field: 'label', header: 'Servicio', width: '60%' },
      { field: 'precio', header: 'Precio', width: '20%' },
      { field: 'nombre_tipo_atencion', header: 'Tipo Atención', width: '20%' }
    ];
  }

  createForm() {
    this.form = this.fb.group({
      medico: ['', [Validators.required]],
      servicio: ['', [Validators.required]],
      precio: ['',[Validators.required] ],
     });
  }

  

  openNew() {
    this.nuevoRegistro = true;
    this.tituloDialogo = 'Nuevo Registro';
    this.servicioMedico = {};
    this.displayDialog = true;
    this.submitted = false;

  }

  edit(registroActual: any) {
    this.nuevoRegistro = false;
    this.servicioMedico = { ...registroActual };
    console.log("servivio", this.servicioMedico );
    this.displayDialog = true;
    this.tituloDialogo = 'Editar: ' + this.servicioMedico.medico_nombre;
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
        this.ServicioMedicoService
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

  consult() {
    this.ServicioMedicoService
    .getAllByMedico(this.medicoSelected)
      .toPromise()
      .then((results) => {
        this.serviciosMedicos = results;
        //console.log("servicios",this.serviciosMedicos);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  fullDropdownMedicos()
  {
    this.medicoService
      .getAllCombo()
      .toPromise()
      .then((results) => {
        this.medicos = results;
       // console.log("medicos",this.medicos);
        this.medicoSelected=null;
        this.consult();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  fullDropdownServicios() 
  {
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

  save() {
    this.submitted = true;
    let aux = { ...this.servicioMedico };
  

    if (this.form.valid) {
      if (this.nuevoRegistro) {
        this.ServicioMedicoService
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
        this.ServicioMedicoService
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
    this.servicioMedico = null;
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

    this.reporte = this.serviciosMedicos.map(col => ({
      id: col.medico_id,
      Medico: col.medico_nombre,
      servicio: col.label,
      tipo_atencion: col.nombre_tipo_atencion
  
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
