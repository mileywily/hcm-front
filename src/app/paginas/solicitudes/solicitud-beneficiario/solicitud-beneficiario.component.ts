import {  GlobalService,
          BeneficiarioService,
          MenuService,
          TipoAtencionService
      } from 'src/app/services';
import { Component, OnInit } from '@angular/core';
import { MessageService} from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-solicitud-beneficiario',
  templateUrl: './solicitud-beneficiario.component.html',
  styleUrls: ['./solicitud-beneficiario.component.scss'],
  styles: [ `
  .outofstock {
      font-weight: 700;
      color: #FF5252;
  }

  .lowstock {
      font-weight: 700;
      color: #FFA726;
  }

  .instock {
      font-weight: 700;
      color: #66BB6A;
  }

  :host ::ng-deep .row-accessories {
      background-color: rgba(0,0,0,.15) !important;
  }

`
],
  providers: [MessageService]
})
export class SolicitudBeneficiarioComponent implements OnInit {

  es: any;
  title: any;
  cols: any[];
  reporte: any[] = [];
  fecha: any = new Date();
  ListaBeneficiarioSiss: any[] = [];

  // Tipo de consulta
  tiposConsultas: any[];
  tipoConsultaSelected: any;

  parametro : any;

  total: number;
  totales: any = {};

  totalgral: number;
  totalresumen: number;

  exportColumns: any[];
  exportColumnsgral: any[];
  loading: boolean;


  tipo: any;
  valor: any;

  tipoAtencionId: any;
  tipoAtencion: any;

  blocked: boolean = false;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private config: GlobalService,
    private messageService: MessageService,
    private beneficiarioService: BeneficiarioService,
    private menuService:  MenuService,
    private tipoAtencionService:  TipoAtencionService

  ) {

    this.tiposConsultas = [
      { label: 'Cédula Titular', value: '1' },
      { label: 'Cédula Beneficiario', value: '2' },
      { label: 'Apellido Beneficiario', value: '3' }
    ];

    this.cols = [
      { field: 'cedula_titular', header: 'CI. Titular', width: '10%'},
      { field: 'beneficiario', header: 'Titular - Beneficiario', width: '35%' },
      { field: 'parentesco', header: 'Parentesco', width: '10%' },
      { field: 'cedula_beneficiario', header: 'CI. Beneficiario', width: '20%' },
      { field: 'discapacidad', header: 'Disc.', width: '5%' },
      { field: 'd_estado', header: 'Estado', width: '10%' }
    ];


    this.title = "Solicitudes de Servicio";

    this.tipoAtencionId  = this.menuService.getTipoAtencion();

    this.tipoAtencionService
    .getById(this.tipoAtencionId)
    .toPromise()
    .then((results) => {
      this.tipoAtencion = results;
      this.title = this.title  + ' ' +  this.tipoAtencion.nombre;
    })
    .catch((err) => {
      console.log(err);
    });

    this.es = this.config.es;
  }

  ngOnInit(): void {
    this.total = 0;
    this.fecha = new Date()
    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
    //this.exportColumnsgral = this.colsgral.map(col => ({ title: col.header, dataKey: col.field }));
    //this.solicitudesService.setParams({});
    this.tipo = this.activatedRoute.snapshot.params.param1;
    console.log("param1",this.tipo)
    
    this.valor = this.activatedRoute.snapshot.params.param2;
    console.log("valor",this.valor)
    

    if (this.tipo != -1){
      this.consult();
    }

  }


  ngOnDestroy(){

  }


   //Crear solicitud
  crearSolicitud(beneficiario_id: any) {
    //El selected en este caso corresponde al elemento seleccionado en la tabla de la vista
    //this.solicitudesService.setParams({beneficiario_id: beneficiario_id});
    //this.navigate('solicitudes');
    //this.router.navigate(["solicitudes", beneficiario_id, -1], { relativeTo: this.activatedRoute });

    this.router.navigate(["solicitud-beneficiario/" + this.tipoConsultaSelected  + "/" + this.parametro + "/"  + "/solicitudes/" + beneficiario_id + "/"  + -1 ]);
  

  }

  navigate(route) {
    //En este caso, la ruta detalle recibe un parámetro, por ello el valor de value
    //En caso de no recibir parámetro, omitir el value en el arreglo
    this.router.navigate([route], { relativeTo: this.activatedRoute });
    console.log("activatedRoute",this.activatedRoute);
    console.log("route ",route );
  }

  consult() {

    this.blocked = true;
    this.loading = true;

    if (!this.tipoConsultaSelected || this.tipoConsultaSelected[0] == undefined  ) {
      //return;
      if (this.tipo != -1){
        this.tipoConsultaSelected = this.tipo;
      }else{
        return;
      }

      if (this.valor != -1){
        this.parametro = this.valor;
      }
    };


    this.total = 0;

    let cedula_titular="";
    let cedula_beneficiario="";
    let apellido="";

    if (this.tipoConsultaSelected==1){
      cedula_titular = this.parametro;
    };

    if (this.tipoConsultaSelected==2){
      cedula_beneficiario = this.parametro;
    };

    if (this.tipoConsultaSelected==3){
      apellido = this.parametro;
    };


    let data = 
    {
      cedula_titular: cedula_titular,
      cedula_beneficiario: cedula_beneficiario,
      apellidos: apellido
    }



    if (this.tipoConsultaSelected == 1){

          //Actualizar datos de beneficiarios del titular

          this.beneficiarioService.updateCargaFamiliarFromSiss(data)
          .toPromise()
          .then(results => {
            this.reporte = results;
            let total: number = 0;

            if (this.reporte)
            {

              this.reporte.forEach(element => 
                {
                   total += parseInt(element.cantidad);
                });

            }else
            {
              this.reporte =[];
            }

            this.loading = false;
            this.blocked = false;
            return total;
          })
          .then(total => {
              this.total = total;
            })
          .catch(err => {
            console.log(err);
            this.blocked = false;
            this.loading = false;
          });
    }

    if (this.tipoConsultaSelected == 2){
        //Actualizar datos de beneficiarios del titular
        this.beneficiarioService.updateCargaFamiliarFromSiss(data)
        .toPromise()
        .then(results => {

          this.reporte = results;
          let total: number = 0;

          if (this.reporte){

            this.reporte.forEach(element => {
              total += parseInt(element.cantidad);
            });

          }else
          {
            this.reporte =[];
          }

          this.blocked = false;
          this.loading = false;
          return total;
        })
        .then(total => {
            this.total = total;
        })
        .catch(err => {
          console.log(err);
          this.blocked = false;
          this.loading = false;
        });
    }

    if (this.tipoConsultaSelected==3){
        this.beneficiarioService.getBeneficiarioByParametros(data)
          .toPromise()
          .then(results => {

            this.reporte = results;
            let total: number = 0;

            this.reporte.forEach(element => {
              total += parseInt(element.cantidad);
            });

            this.loading = false;
            this.blocked = false;
            return total;
          })
          .then(total => {
            this.total = total;
          })
        .catch(err => {
          console.log(err);
          this.blocked = false;
          this.loading = false;
        });
    }
  }


  private showWarning(warnMsg: string) {
    this.messageService.clear();
    this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Información', detail: warnMsg });
  }

}
