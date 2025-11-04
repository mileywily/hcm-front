import {
  GlobalService,
  BeneficiarioService,
  BeneficiarioSissService,
} from 'src/app/services';
import { Component, OnInit } from '@angular/core';
import { Beneficiario } from 'src/app/models';
import { MessageService, ConfirmationService } from 'primeng/api';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-consultar-beneficiario',
  templateUrl: './consultar-beneficiario.component.html',
  styleUrls: ['./consultar-beneficiario.component.scss'],
  styles: [
    `
      .outofstock {
        font-weight: 700;
        color: #ff5252;
        text-decoration: line-through;
      }

      .lowstock {
        font-weight: 700;
        color: #ffa726;
      }

      .instock {
        font-weight: 700;
        color: #66bb6a;
      }

      :host ::ng-deep .row-accessories {
        background-color: rgba(0, 0, 0, 0.15) !important;
      }
    `,
  ],
  providers: [MessageService, ConfirmationService],
})
export class ConsultarBeneficiarioComponent implements OnInit {
  es: any;
  title: any;
  cols: any[];
  reporte: any[] = [];
  fecha: any = new Date();
  ListaBeneficiarioSiss: any[] = [];

  // Tipo de consulta
  tiposConsultas: any[];
  tipoConsultaSelected: any;

  parametro: any;

  total: number;
  totales: any = {};

  totalgral: number;
  totalresumen: number;

  exportColumns: any[];
  exportColumnsgral: any[];
  loading: boolean;
  //currentService: Servicio[] = [];
  blocked: boolean = false;

  constructor(
    private config: GlobalService,
    private messageService: MessageService,
    private beneficiarioService: BeneficiarioService,
    private beneficiarioSissService: BeneficiarioSissService //private servicioActual: ServicioService, //private detalleSolicitudService: DetalleSolicitudService
  ) {
    this.tiposConsultas = [
      { label: 'Cédula Titular', value: '1' },
      { label: 'Cédula Beneficiario', value: '2' },
      { label: 'Apellido Beneficiario', value: '3' },
    ];

    this.cols = [
      { field: 'cedula_titular', header: 'Cédula Titular', width: '10%' },
      { field: 'beneficiario', header: 'Titular - Beneficiario', width: '35%' },
      { field: 'parentesco', header: 'Parentesco', width: '20%' },
      { field: 'cedula_beneficiario',header: 'Cédula Beneficiario',width: '20%'},
      { field: 'discapacidad', header: 'Disc.', width: '5%' },
      { field: 'd_estado', header: 'Estado', width: '10%' },
    ];

    this.title = 'Titulares / Beneficiarios';
    //this.nombre = "SOLICITUDES POR SERVICIO ";
    this.es = this.config.es;
  }

  ngOnInit(): void {
    this.total = 0;
    this.fecha = new Date();

    this.exportColumns = this.cols.map((col) => ({
      title: col.header,
      dataKey: col.field,
    }));
    //this.exportColumnsgral = this.colsgral.map(col => ({ title: col.header, dataKey: col.field }));
  }

  consult() {
    this.blocked = true;

    if (
      !this.tipoConsultaSelected ||
      this.tipoConsultaSelected[0] == undefined
    ) {
      return;
    }

    this.loading = true;

    this.total = 0;

    let cedula_titular = '';
    let cedula_beneficiario = '';
    let apellido = '';

    if (this.tipoConsultaSelected == 1) {
      cedula_titular = this.parametro;
    }

    if (this.tipoConsultaSelected == 2) {
      cedula_beneficiario = this.parametro;
    }

    if (this.tipoConsultaSelected == 3) {
      apellido = this.parametro;
    }

    let data = {
      cedula_titular: cedula_titular,
      cedula_beneficiario: cedula_beneficiario,
      apellidos: apellido,
    };

    if (this.tipoConsultaSelected == 1) {
      //Actualizar datos de beneficiarios del titular

      this.beneficiarioService
      .updateCargaFamiliarFromSiss(data)
      .toPromise()
      .then((results) => {
        this.reporte = results;
        let total: number = 0;

        if (this.reporte) {
          this.reporte.forEach((element) => {
            total += parseInt(element.cantidad);
          });
        } else {
          this.reporte = [];
        }

        this.loading = false;
        this.blocked = false;
        return total;
      })
      .then((total) => {
        this.total = total;
      })
      .catch((err) => {
        console.log(err);
        this.blocked = false;
        this.loading = false;
      });

    }

    if (this.tipoConsultaSelected == 2) {
      //Actualizar datos de beneficiarios del titular

      this.beneficiarioService
      .updateCargaFamiliarFromSiss(data)
      .toPromise()
      .then((results) => {
        this.reporte = results;
        let total: number = 0;

        if (this.reporte) {
          this.reporte.forEach((element) => {
            total += parseInt(element.cantidad);
          });
        } else {
          this.reporte = [];
        }

        this.loading = false;
        this.blocked = false;
        return total;
      })
      .then((total) => {
        this.total = total;
      })
      .catch((err) => {
        console.log(err);
        this.blocked = false;
        this.loading = false;
      });

    }

    if (this.tipoConsultaSelected == 3) {
      this.beneficiarioService
        .getBeneficiarioByParametros(data)
        .toPromise()
        .then((results) => {
          this.reporte = results;
          let total: number = 0;

          this.reporte.forEach((element) => {
            total += parseInt(element.cantidad);
          });

          this.loading = false;
          this.blocked = false;
          return total;
        })
        .then((total) => {
          this.total = total;
        })
        .catch((err) => {
          console.log(err);
          this.blocked = false;
          this.loading = false;
        });
    }
  }

  private showWarning(warnMsg: string) {
    this.messageService.clear();
    this.messageService.add({
      key: 'tc',
      severity: 'warn',
      summary: 'Información',
      detail: warnMsg,
    });
  }
}
