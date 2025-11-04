import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TipoSolicitud } from '../models';

@Injectable({
  providedIn: 'root'
})
export class TipoSolicitudService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + 'tiposolicitudes';
  }

  getAll(): Observable<TipoSolicitud[]> {

    let apiURL = this.url; 
    return this.http.get<TipoSolicitud[]>(apiURL);
  }

  getAllCombo(): Observable<TipoSolicitud[]> {

    let apiURL = this.url+'/listar'; 
    return this.http.get<TipoSolicitud[]>(apiURL);
  }

  getAllActivos(): Observable<TipoSolicitud[]> {

    let apiURL = this.url+'/listaractivos'; 
    return this.http.get<TipoSolicitud[]>(apiURL);
  }
  
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  getByIdRequestType(id: number): Observable<any> {

    let apiURL = this.url+'/tiposolicitudes/'+id; 
    return this.http.get<any>(apiURL);
  }

  create(registro: TipoSolicitud) {

    const url = `${this.url}`;
    this.log(url);

    return this.http.post(url, registro).pipe(
      tap(result => {
      }),
      // catchError(this.handleError('Error registrando Causas', []))
    );
  }

  update(registro: TipoSolicitud) {
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

  deleteByLote(registros: TipoSolicitud[]) {
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
    console.log('TipoSolicitudService: ' + message);
  }
  
}
  