import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalendarioService {

  private params: any;

  constructor() { }

  /** GETS Y SETS */
  getParams(): any {
    return this.params ? this.params : {};
  }

  setParams(params: any) {
    this.params = params;
  }


}
