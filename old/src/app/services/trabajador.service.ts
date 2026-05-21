import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Trabajador, Objeto } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TrabajadorService {

  /**
  *   SERVICIO QUE HACE PETICIONES AL DE PERMANENCIAS 
  *   PARA CONSTRUIR LA DATA (Jerarquia y fichada)
  */

  private url: string;
  private url_P: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + 'trabajador';
    this.url_P = environment.apiUrlPermanencia + 'permanencias';
  }

  getAll(): Observable<Trabajador[]> {
    let apiURL = this.url;
    return this.http.get<Trabajador[]>(apiURL);
  }

  getByCi(ci: any): Observable<Trabajador> {

    const url = `${this.url}/${ci}`;

    return this.http.get<Trabajador>(url)
      .pipe(
        tap(result => {
        }),
      );
  }

  // Usado por solicitud
  getSupervised(datos: any): Observable<Trabajador[]> {

    const url = `${this.url}/supervisado`;
    console.log(url);

    return this.http.post<Trabajador[]>(url, datos).pipe(
      tap(result => {
      }),
    );
  }

  // Usado por planilla
  getEmployee(datos: Trabajador): Observable<Trabajador[]> {

    const url = `${this.url}/individual`;

    return this.http.post<Trabajador[]>(url, datos).pipe(
      tap(result => {
      }),
    );
  }

  // Obtener cedula dado el siglado
  getCiBySir(datos: any): Observable<Trabajador[]> {

    const url = `${this.url_P}/cedula`;

    return this.http.post<Trabajador[]>(url, datos).pipe(
      tap(result => {
      }),
    );
  }

  // Obtener cedula dado el siglado
  getData(datos: any): Observable<Trabajador[]> {

    const url = `${this.url_P}/sinfichada`;

    return this.http.post<Trabajador[]>(url, datos).pipe(
      tap(result => {
      }),
    );
  }


  /** */

  getEscuadra(datos: any) : Observable<Objeto[]>  {

    const url = `${this.url_P}/escuadras`;
    console.log(url);

    return this.http.post<Objeto[]>(url, datos).pipe(
      tap(result => {
      }),
    );
  }

  getPuestos(datos: any) : Observable<Objeto[]>  {

    const url = `${this.url_P}/puestos`;
    console.log(url);

    return this.http.post<Objeto[]>(url, datos).pipe(
      tap(result => {
      }),
    );
  }

}
