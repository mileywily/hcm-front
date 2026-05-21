import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Atencion } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AtencionService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + 'atenciones';
  }

  getAll(): Observable<Atencion[]> {

    let apiURL = this.url; 
    return this.http.get<Atencion[]>(apiURL);
  }

  getAllCombo(): Observable<Atencion[]> {

    let apiURL = this.url+'/listar'; 
    return this.http.get<Atencion[]>(apiURL);
  }
  
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  getByIdRequestType(id: number): Observable<any> {

    let apiURL = this.url+'/atenciones/'+id; 
    return this.http.get<any>(apiURL);
  }

  /* Consulta Atenciones u Ordenes de una solicitud*/
  getOrdenesBySolicitud(data: any): Observable<Atencion[]> {

    let apiURL = this.url + '/solicitud';
    console.log(apiURL);
    console.log(data);
    return this.http.post<Atencion[]>(apiURL, data).pipe(
      tap(result => {
      }),
    );
  }


    /* Consulta Atenciones u Ordenes de una solicitud*/
    getOrdenesBySolicitudEstatus(data: any): Observable<Atencion[]> {

      let apiURL = this.url + '/solicitudEstatus';
  
      return this.http.post<Atencion[]>(apiURL, data).pipe(
        tap(result => {
        }),
      );
    }

   /* Consulta Atenciones u Ordenes por numero*/
   getOrdenesByOrden(data: any): Observable<Atencion[]> {

    let apiURL = this.url + '/orden';

    return this.http.post<Atencion[]>(apiURL, data).pipe(
      tap(result => {
      }),
    );
  }

  create(registro: Atencion) {

    const url = `${this.url}`;
    this.log(url);

    return this.http.post(url, registro).pipe(
      tap(result => {
      }),
      // catchError(this.handleError('Error registrando Causas', []))
    );
  }


  update(registro: Atencion) {
    const url = `${this.url}`;

    return this.http.put(url, registro).pipe(
      tap(result => {
      }),
      // catchError(this.handleError('Error actualizando Causas', []))
    );
  }

  delete(id: number) {

    const url = `${this.url}/${id}`;
    this.log(url);
    return this.http.delete(url);
  }

  deleteByLote(registros: Atencion[]) {
    const url = `${this.url+'/eliminarLote'}`; 

    return this.http.post(url, registros);
  } 

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  crearOrdenesServicio(data: any): Observable<Atencion[]> {

    let apiURL = this.url + '/crearorden';

    return this.http.post<Atencion[]>(apiURL, data ).pipe(
      tap(result => {
      }),
    );
  }

  cancelarOrden(data: any): Observable<Atencion[]> {

    let apiURL = this.url + '/cancelarorden';
    console.log("datocanc",data);
    return this.http.post<Atencion[]>(apiURL, data).pipe(
      tap(result => {
      }),
    );
  }

  procesarOrden(data: any): Observable<Atencion[]> {

    let apiURL = this.url + '/procesarorden';
    console.log(apiURL);
    console.log("data",data);

    return this.http.post<Atencion[]>(apiURL, data).pipe(
      tap(result => {
      }),
    );
  }

  private log(message: string) {
    console.log('AtencionesService: ' + message);
  }
  
}
  