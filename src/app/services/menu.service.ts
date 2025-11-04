import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  //private tipoSolicitud: any;        //Determina el tipo de solicitud
  //private tipoAtencion: any;        //Determina el tipo de atención

  constructor() {}

  /** GETS Y SETS */
  getTipoAtencion(): any {
    return localStorage.getItem('localTipoAtencion');
  }

  setTipoAtencion(params: any) {
    localStorage.setItem('localTipoAtencion', JSON.stringify(params));
  }

  getTipoSolicitud(): any {
    return localStorage.getItem('localTipoSolicitud');
  }

  setTipoSolicitud(params: any) {
    localStorage.setItem('localTipoSolicitud', JSON.stringify(params));
  }

  salir(){
    localStorage.removeItem('localTipoSolicitud');
    localStorage.removeItem('localTipoAtencion');
  }


}
