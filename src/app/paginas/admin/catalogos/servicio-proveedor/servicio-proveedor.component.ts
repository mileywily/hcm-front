import { Component, OnInit } from '@angular/core';
import { 
   MedicoService,
   ServicioService,
   ServicioProveedorService,
   ProveedorService 
  } from '../../../../services';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Respuesta, Servicio,Proveedor } from 'src/app/models';

@Component({
  selector: 'app-servicio-proveedor',
  templateUrl: './servicio-proveedor.component.html',
  styleUrls: ['./servicio-proveedor.component.scss'],
  providers: [MessageService, ConfirmationService],
})
export class ServicioProveedorComponent implements OnInit {

  displayDialog: boolean;
  tituloDialogo: string = '';

  nuevoRegistro: boolean;
  submitted: boolean;
  form: FormGroup;

  serviciosProveedores: any = [];
  reporte : any = [];
  servicioProveedor: any = {};
  selectedRegistros: any[];

  proveedores: Proveedor[];
  proveedorSelected: Proveedor;

  cols: any[];
  servicios: Servicio[];
  servicioSelected: Servicio;
  

  constructor(
    private fb: FormBuilder,
    private servicioService: ServicioService,
    private medicoService: MedicoService,
    private ServicioProveedorService:ServicioProveedorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private proveedorService: ProveedorService
  ) 
  { 
    this.createForm();
  }

  ngOnInit(): void
  {
    this.nuevoRegistro = false;
    this.dropdownProveedor();
    this.fullDropdownServicios();

    this.cols = [
      { field: 'proveedor_id', header: 'Id', width: '10%' },
      { field: 'proveedor_nombre', header: 'Proveedor', width: '10%' },
      { field: 'label', header: 'Servicio', width: '60%' },
      { field: 'precio', header: 'Precio', width: '20%' },
      { field: 'nombre_tipo_atencion', header: 'Tipo Atención', width: '20%' }
    ];

  
  }

  save() {
    this.submitted = true;
    let aux = { ...this.servicioProveedor };
  

    if (this.form.valid) {
      if (this.nuevoRegistro) {
      //  console.log("registro",aux);
        this.ServicioProveedorService
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
        this.ServicioProveedorService
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


  createForm() {
    this.form = this.fb.group({
      proveedor: ['', [Validators.required]],
      servicio: ['', [Validators.required]],
      precio: ['',[Validators.required] ],
     });
  }

  fullDropdownServicios() 
  {
    this.servicioService
      .getAllCombo()
      .toPromise()
      .then((results) => {
        this.servicios = results;
       //console.log("servicios", this.servicios);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  dropdownProveedor()
  {
    this.proveedorService
      .getAllCombo()
      .toPromise()
      .then((results) => {
        let aux_prov=[];
        aux_prov=  results;
       // this.proveedores =results;
        
        this.proveedores = aux_prov.filter(x => x.tipo_proveedor_nombre != "Laboratorios");

        this.proveedorSelected = null;
        this.consult();
        

      })
      .catch((err) => {
        console.log(err);
      });
  }

  openNew() {
    this.nuevoRegistro = true;
    this.tituloDialogo = 'Nuevo Registro';
    this.servicioProveedor = {};
    this.displayDialog = true;
    this.submitted = false;

  }

  edit(registroActual: any) {
    this.nuevoRegistro = false;
    this.servicioProveedor = { ...registroActual };
    console.log("servivio", this.servicioProveedor );
    this.displayDialog = true;
    this.tituloDialogo = 'Editar: ' + this.servicioProveedor.proveedor_nombre;
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
        this.ServicioProveedorService
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

  close() {
    this.servicioProveedor = null;
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


  consult() 
  {
    this.ServicioProveedorService
    .getAllByProveedor(this.proveedorSelected)
      .toPromise()
      .then((results) => {
        let aux_serv=[];
        aux_serv=  results;
        this.serviciosProveedores = aux_serv.filter(x => x.tipo_atencion_id == "5");
    //    console.log("servicio_pro", this.serviciosProveedores);
      })
      .catch((err) => {
        console.log(err);
      });
  }



  exportExcel() {

    this.reporte = this.serviciosProveedores.map(col => ({
      id: col.proveedor_id,
      Proveedor: col.proveedor_nombre,
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