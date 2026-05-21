import { Component, OnInit } from '@angular/core';
import {
  SolicitudService,
  MenuService
}
from 'src/app/services';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-solicitud-listar-titular',
  templateUrl: './solicitud-listar-titular.component.html',
  styleUrls: ['./solicitud-listar-titular.component.scss']
})
export class SolicitudListarTitularComponent implements OnInit {

  beneficiarioId: any;
  tipoAtencionId: any;
  cols: any[];
  reporte: any[]=[];
  total: number;
  totales: any = {};

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private solicitudService: SolicitudService,
    private menuService: MenuService,

  ) {
    this.cols = [
      { field: 'solicitud_id', header: 'N°', width: '10%' },
      { field: 'cedula_titular', header: 'Cédula', width: '10%' },
      { field: 'nombre_titular', header: 'Titular', width: '17%' },
      { field: 'nombre_beneficiario', header: 'Beneficiario', width: '17%' },
      { field: 'fecha_solicitud', header: 'Fecha', width: '10%' },
      { field: 'nombre_especialidad', header: 'Especialidad', width: '10%' },
      { field: 'nombre_tipo_atencion', header: 'Requerimiento', width: '10%' },
      { field: 'nombre_estado_solicitud', header: 'Estado Solicitud', width: '10%' },
      { field: '', header: 'Ver', width: '6%' }
    ];

  }

  ngOnInit() {
    //console.log(this._route.snapshot);
    this.beneficiarioId = this._route.snapshot.paramMap.get('beneficiario_id');
    //this.tipoAtencionId = this._route.snapshot.paramMap.get('tipo_atencion_id');

    this.tipoAtencionId = this.menuService.getTipoAtencion();

    this.consultar();
  }

  //Crear orden
  verSolicitud(rowData) {

   

    //En caso de que sean solicitudes de CITAS
    if (rowData.tipo_solicitud_id == 1 || (rowData.nombre_tipo_atencion  == "CONSULTA"  ) )
      {
        this.menuService.setTipoAtencion(2);
        this.router.navigate(["solicitud-beneficiario/-1/-1/solicitudes/" + rowData.beneficiario_id + "/"  + rowData.solicitud_id + "/solicitud-servicio", rowData.beneficiario_id,  rowData.solicitud_id]);
      }
    //En caso de que sean solicitudes de  ESTUDIOS ESPECIALES
    if (rowData.tipo_solicitud_id == 7 && (rowData.nombre_tipo_atencion  =="ESTUDIOS ESPECIALES"))
      {
        this.menuService.setTipoAtencion(5);
        this.router.navigate(["solicitud-beneficiario/-1/-1/solicitudes/" + rowData.beneficiario_id + "/"  + rowData.solicitud_id + "/solicitud-servicio-triaje", rowData.beneficiario_id,  rowData.solicitud_id]);
      }


    //En caso de que sean solicitudes de IMAGEN 
    if (rowData.tipo_solicitud_id == 7 && (rowData.nombre_tipo_atencion  == "IMAGEN"  ) ){
      this.menuService.setTipoAtencion(3);
      this.router.navigate(["solicitud-beneficiario/-1/-1/solicitudes/" + rowData.beneficiario_id + "/"  + rowData.solicitud_id + "/solicitud-servicio-triaje-img", rowData.beneficiario_id,  rowData.solicitud_id]);
    }
    
     //En caso de que sean solicitudes de  LABORATORIO
     if (rowData.tipo_solicitud_id == 7 && (rowData.nombre_tipo_atencion  =="LABORATORIO"))
      {
        this.menuService.setTipoAtencion(4);
         this.router.navigate(["solicitud-beneficiario/-1/-1/solicitudes/" + rowData.beneficiario_id + "/"  + rowData.solicitud_id + "/solicitud-servicio-triaje-lab", rowData.beneficiario_id,  rowData.solicitud_id]);
      }

             //En caso de que sean solicitudes de MEDICAMENTOS 
      if (rowData.tipo_solicitud_id == 3 && (rowData.nombre_tipo_atencion.startsWith('MEDICAMENTOS')  ))
      {
              this.router.navigate(["solicitud-beneficiario/-1/-1/solicitudes/" + rowData.beneficiario_id + "/"  + rowData.solicitud_id + "/solicitud-servicio-elec-med", rowData.beneficiario_id,  rowData.solicitud_id]);
     
      }
      else
      {

          //En caso de que sean solicitudes de  QUIRURGICO
          if (rowData.tipo_solicitud_id == 3 && ((rowData.nombre_tipo_atencion.indexOf("MEDICAMENTOS") === -1)))
          {
              this.router.navigate(["solicitud-beneficiario/-1/-1/solicitudes/" + rowData.beneficiario_id + "/"  + rowData.solicitud_id + "/solicitud-servicio-electiva-quir", rowData.beneficiario_id,  rowData.solicitud_id]);
          }
  
      }

   

 
    

    //this.router.navigate(['solicitud-servicio', rowData.beneficiario_id,  rowData.solicitud_id], { relativeTo: this.activatedRoute });
    //this.router.navigate(["solicitudes", rowData.beneficiario_id,  rowData.solicitud_id]);
  }

  navigate(route, value1) {
    //En este caso, la ruta detalle recibe un parámetro, por ello el valor de value
    //En caso de no recibir parámetro, omitir el value en el arreglo
    this.router.navigate([route, value1], { relativeTo: this.activatedRoute });
}

  consultar(){
      //console.log(this.beneficiarioId);

    if (this.beneficiarioId){

     if  (this.tipoAtencionId=11)
     {
      let data = {
        beneficiario_id: this.beneficiarioId,
        tipo_atencion_id: this.menuService.getTipoAtencion(),
        tipo_solicitud_id: this.menuService.getTipoSolicitud(),
      }
      console.log("qui",data);
      this.solicitudService.getSolicitudesByTitular(data)
        .toPromise()
        .then(results => {

          this.reporte = results;
          let total: number = 0;


          this.reporte.forEach(element => {
            total += parseInt(element.cantidad);
          });

          //this.loading = false;
          return total;
        })
        .then(total => {
          //this.total = total;
      })
      .catch(err => { console.log(err) });
    } else
    {
        let data = {
          beneficiario_id: this.beneficiarioId,
          tipo_atencion_id: this.menuService.getTipoAtencion()
        }
        console.log("ther",data);  
        this.solicitudService.getSolicitudesByTitular(data)
        .toPromise()
        .then(results => {

          this.reporte = results;
          let total: number = 0;


          this.reporte.forEach(element => {
            total += parseInt(element.cantidad);
          });

          //this.loading = false;
          return total;
        })
        .then(total => {
          //this.total = total;
      })
      .catch(err => { console.log(err) });
     }

      

        

    }

  }

}
