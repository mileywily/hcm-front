import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TipoAtencion } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TipoAtencionService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + 'tipoatenciones';
  }

  getAll(): Observable<TipoAtencion[]> {

    let apiURL = this.url; 
    return this.http.get<TipoAtencion[]>(apiURL);
  }

  getAllCombo(): Observable<TipoAtencion[]> {

    let apiURL = this.url+'/listar'; 
    return this.http.get<TipoAtencion[]>(apiURL);
  }

  getAllActivos(): Observable<TipoAtencion[]> {

    let apiURL = this.url+'/listaractivos'; 
    return this.http.get<TipoAtencion[]>(apiURL);
  }
  
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  getAllByTipoSolicitud(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/tiposolicitud/${id}`);
  }

  getByIdRequestType(id: number): Observable<any> {

    let apiURL = this.url+'/tipoatenciones/'+id; 
    return this.http.get<any>(apiURL);
  }

  create(registro: TipoAtencion) {

    const url = `${this.url}`;
    this.log(url);

    return this.http.post(url, registro).pipe(
      tap(result => {
      }),
      // catchError(this.handleError('Error registrando Causas', []))
    );
  }

  update(registro: TipoAtencion) {
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

  deleteByLote(registros: TipoAtencion[]) {
    const url = `${this.url+'/eliminarLote'}`; 

    return this.http.post(url, registros);
  } 

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log('TipoAtencionService: ' + message);
  }
  
}
  