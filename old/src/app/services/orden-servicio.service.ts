import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrdenServicioService {
  private params: any;
  private cupo: any;
  private medico_solicitud_id: any;

  constructor() {}

  /** GETS Y SETS */
  getParams(): any {
    return this.params ? this.params : {};
  }

  setParams(params: any) {
    this.params = params;
  }

  getCupo(): any {
    return this.cupo ? this.cupo : null;
  }

  setCupo(params: any) {
    this.cupo = params;
  }

}
