import { Injectable } from '@angular/core';
import { Solicitud } from '../models';

@Injectable({
  providedIn: 'root',
})
export class SolicitudModificarService {
  private params: any;
  private parametros: any;

  constructor() {}

  /** GETS Y SETS 
  getParams(): any {
    return this.params ? this.params : {};
  }

  setParams(params: any) {
    this.params = params;
  }*/

  getParametros(): any {
    return this.parametros ? this.parametros : null;
  }

  setParametros(params: any) {
    this.parametros = params;
  }
}
