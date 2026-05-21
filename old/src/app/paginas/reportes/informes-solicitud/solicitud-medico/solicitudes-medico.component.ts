
import { GlobalService, ServicioService, MedicoService } from 'src/app/services';
import { Component, OnInit } from '@angular/core';
import { Servicio } from 'src/app/models';
import { formatDate } from '@angular/common';
import { MessageService } from 'primeng/api';
import { exit } from 'process';


@Component({
  selector: 'app-solicitudes-medico',
  templateUrl: './solicitudes-medico.component.html',
  styleUrls: ['./solicitudes-medico.component.scss'],
  providers: [MessageService]
})
export class SolicitudesResumenComponent implements OnInit {

  es: any;
  title: any;
  cols: any[];
  reporte: any[] = [];
  fecha: Date;
  servicioSelected: Servicio;
  servicios: Servicio[];

  servicioAux: Servicio[] = [];

  total: number;
  totales: any={};     //totales de la tabla

  exportColumns: any[];

 //Variables para el manejo del reporte
  encabezado: any[];  //encabezado del reporte
  pdfPropiedades: any= {};
  arrayTotales: any[];

  loading: boolean;

  constructor(
    private config: GlobalService,
    private messageService: MessageService,
    private servicioService: ServicioService,
    private servicioActual: ServicioService,
    private detalleSolicitudService: MedicoService
  ) {

    this.cols = [
      { field: 'nombre', header: 'Nombre', width: '50%' },
      { field: 'cantidad', header: 'Cantidad', width: '50%' },
    ];

    this.title = "Solicitudes Resumen General";
    this.es = this.config.es;

  }

  ngOnInit(): void {
    this.total = 0;
    this.fullDropdown();
    this.fecha = new Date();
    this.getCurrentService();

    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }))
  }


  getCurrentService() {

    this.servicioActual.getAllCombo()
      .toPromise()
      .then(results => {
        this.servicioAux = results;
       
      })
      .then(results => {
        if (this.servicioAux.length > 0) {
          this.servicioSelected = this.servicioAux[0];
          this.fullDropdown();
        }
      })
      .catch(err => { console.log(err) });
  }

  fullDropdown() {

    this.servicioService.getAllCombo()
      .toPromise()
      .then(results => {
        this.servicios = results;
      })
      .catch(err => { console.log(err) });

  }

  consult() {

    this.loading = true;
    let servicio = this.servicios.filter(x => x.servicio_id == this.servicioSelected);

    this.total = 0;
    if (this.fecha != null) {

      let format = 'yyyy-MM-dd';
      const locale = 'en-ES';
      let date: Date = new Date();

      let data = {
        fecha: formatDate(this.fecha, format, locale),
        servicio_id: servicio[0].servicio_id
      }

      this.detalleSolicitudService.getByIdRequestType(1)
        .toPromise()
        .then(results => {

          this.reporte = results;
          let total: number = 0;

          this.reporte.forEach(element => {
            total += parseInt(element.cantidad);
          });

          this.loading = false;
          return total;
        })
        .then(total => {
          this.total = total;
          this.exportConfiguracion(servicio[0].nombre, formatDate(this.fecha, format, locale),  formatDate(date, format, locale), total);

        }
        
        )
        .catch(err => { console.log(err) });
    } 

  }

  exportConfiguracion(servicio: string, fecha:any, date:any, total:number){

    //ESPECIFICACIONES DE REPORTE para la propiedad "export" del componente app-basic-table
    
    //Encabezado para reporte 

    this.encabezado =[
                        ['Sidor C.A.', 15,20],
                        ['SERVICIOS ALIMENTARIOS', 100, 20],
                        ['Fecha de impresión: ' + date ,200, 20],
                        ['Servicio: ' + servicio, 15, 28],
                        ['SOLICITUDES RESUMEN GENERAL',95,28],
                        ['Fecha de consulta: ' + fecha,200, 28]
                      ];
    //Totales pie de reporte

    this.arrayTotales = [['TOTAL GENERAL: ', total]];

    //PROPIEDADES DEL REPORTE pdf que se deben definir si se usa la propiedad "export" 
    //del componente app-basic-table 
    
    this.pdfPropiedades = { nombre: this.title, 
                            exportColumns: this.exportColumns, 
                            encabezado: this.encabezado,
                            orientacion: 'l',
                            tamaño: 'a4',
                            fuente: 11,
                            totales: this.arrayTotales 
                          }; 

     var auxReporte =    [{nombre: 'Normal', cantidad:0},
                          {nombre: 'Manual', cantidad:0},
                          {nombre: 'Notas a terceros', cantidad:0}
                         ];
        
                         
      //Dar forma a la tabla resultante para mostrar los tipos 
      //que la consulta no devuelve por ser de cantidad 0               
      let sw=false;                   
      auxReporte.forEach(element => {
        
        for (let i = 0; i < this.reporte.length; i++) {
          let rowData = this.reporte[i];
            if (rowData.nombre == element.nombre){
                sw=true;
                break;
            }
        };

        if (sw==false){
            this.reporte.push(element);
        };
        
        sw=false; 
         
      });




  }

  private showWarning(warnMsg: string) {
    this.messageService.clear();
    this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Información', detail: warnMsg });
  }

}
