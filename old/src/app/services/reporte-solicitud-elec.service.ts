import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { RepSolicitudElec, UserAtencion } from '../models';
@Injectable({
    providedIn: 'root'
  })
  export class DetalleRepSolicitudElecElecService
  {
    private url: string;

    constructor(private http: HttpClient)
    {
      this.url = environment.apiUrl + 'reportes_sol_elec';
    }


    ReportByParametrosSolicitud_Servicio(data: RepSolicitudElec): Observable<RepSolicitudElec[]>
    {
      let apiURL = this.url + '/repor_sol';
      console.log("log",apiURL);
      console.log("datos",data);
       return this.http.post<any>(apiURL, data);
    }

    

    ReportByParametrosSolicitudesAbiertas(data: RepSolicitudElec): Observable<RepSolicitudElec[]>
    {
      let apiURL = this.url + '/repor_sol_abierta';
      //console.log(apiURL);
       //console.log("data" + data);
       return this.http.post<any>(apiURL, data);
    }

    ReportByParametrosSolicitudesAbiertasImagen(data: RepSolicitudElec): Observable<RepSolicitudElec[]>
    {
      let apiURL = this.url + '/repor_sol_abierta_imagen';
      //console.log(apiURL);
       //console.log("data" + data);
       return this.http.post<any>(apiURL, data);
    }

    ReportByParametrosSolicitudesAbiertasLab(data: RepSolicitudElec): Observable<RepSolicitudElec[]>
    {
      let apiURL = this.url + '/repor_sol_abierta_lab';
      //console.log(apiURL);
       //console.log("data" + data);
       return this.http.post<any>(apiURL, data);
    }


    Reporte_OrdenByParametros(data: RepSolicitudElec): Observable<RepSolicitudElec[]>
    {
      let apiURL = this.url + '/reporte_orden';
     // console.log(apiURL);
       //console.log("data" + data);
       return this.http.post<any>(apiURL, data);
    }


    Reporte_Orden_Laboratorio(data: RepSolicitudElec): Observable<RepSolicitudElec[]>
    {
      let apiURL = this.url + '/reporte_orden_lab';
     // console.log(apiURL);
       //console.log("data" + data);
       return this.http.post<any>(apiURL, data);
    }

    Reporte_Orden_Imagen(data: RepSolicitudElec): Observable<RepSolicitudElec[]>
    {
      let apiURL = this.url + '/reporte_orden_img';
     // console.log(apiURL);
       //console.log("data" + data);
       return this.http.post<any>(apiURL, data);
    }

    getRequestsReportOrdenByParametros_modificar(data: RepSolicitudElec): Observable<RepSolicitudElec[]>
    {
      let apiURL = this.url + '/orden_modificar';
      //console.log(apiURL);
       //console.log("data" + data);
       return this.http.post<any>(apiURL, data);
    }

    getReporte_Orden_By_Atencionmodificar(data: RepSolicitudElec): Observable<RepSolicitudElec[]>
    {
      let apiURL = this.url + '/ordenbyatencion_modificar';
      //console.log(apiURL);
       //console.log("data" + data);
       return this.http.post<any>(apiURL, data);
    }

    getRequestsReportSolicitudByParametros_modificar(data: RepSolicitudElec): Observable<RepSolicitudElec[]>
    {
      let apiURL = this.url + '/solicitud_modificar';
      console.log(apiURL);
       return this.http.post<any>(apiURL, data);
    }

    getReportSolicitudByAtencionParametros_modificar(data: RepSolicitudElec): Observable<RepSolicitudElec[]>
    {
      let apiURL = this.url + '/solicitudbyatencion_modificar';
      console.log(apiURL);
      console.log("data",data);
       return this.http.post<any>(apiURL, data);
    }


   Rep_SolTriajeByAtencionParametros_modificar(data: RepSolicitudElec): Observable<RepSolicitudElec[]>
    {
      let apiURL = this.url + '/sol_tribyatencion_modificar';
     // console.log(apiURL);
       return this.http.post<any>(apiURL, data);
    }

    Rep_solicitud_modificar_triaje_lab(data: RepSolicitudElec): Observable<RepSolicitudElec[]>
    {
      let apiURL = this.url + '/rep_solicitud_modificar_triajeLab';
     // console.log(apiURL);
       return this.http.post<any>(apiURL, data);
    }

    Rep_solicitud_modificar_triaje(data: RepSolicitudElec): Observable<RepSolicitudElec[]>
    {
      let apiURL = this.url + '/rep_solicitud_modificar_triaje';
     // console.log(apiURL);
       return this.http.post<any>(apiURL, data);
    }

    Rep_orden_modificar_triaje(data: RepSolicitudElec): Observable<RepSolicitudElec[]>
    {
      let apiURL = this.url + '/rep_orden_modificar_triaje';
      //console.log(apiURL);
      // console.log("data" + data);
       return this.http.post<any>(apiURL, data);
    }

    Rep_orden_modificar_triaje_lab(data: RepSolicitudElec): Observable<RepSolicitudElec[]>
    {
      let apiURL = this.url + '/rep_orden_modificar_triaje_lab';
    //  console.log(apiURL);
      // console.log("data" + data);
       return this.http.post<any>(apiURL, data);
    }

    ReportCuposLaboratorio(data: RepSolicitudElec): Observable<RepSolicitudElec[]>
    {
      let apiURL = this.url + '/repor_cupos_lab';
      // console.log(apiURL);
       return this.http.post<any>(apiURL, data);
    }

    ReportCuposTriaje(data: RepSolicitudElec): Observable<RepSolicitudElec[]>
    {
      let apiURL = this.url + '/repor_cupos_triaje';
      // console.log(apiURL);
      // console.log("datos",data);
       return this.http.post<any>(apiURL, data);
    }


    getRequestsReportmedicoByParametros(data: RepSolicitudElec): Observable<RepSolicitudElec[]>
    {
      let apiURL = this.url + '/repor_medico';
       return this.http.post<any>(apiURL, data);
    }


    getRequestsReportCuposByParametros(data: RepSolicitudElec): Observable<RepSolicitudElec[]>
    {
      let apiURL = this.url + '/repor_cupos';
      // console.log(apiURL);
       return this.http.post<any>(apiURL, data);
    }

    getRequestsUser(): Observable<UserAtencion[]>
    {
      let apiURL = this.url + '/listar_user';

       return this.http.get<UserAtencion[]>(apiURL);
    }

  }
