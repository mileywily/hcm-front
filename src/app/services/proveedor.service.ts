import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Proveedor } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + 'proveedores';
  }

  getAll(): Observable<Proveedor[]> {

    let apiURL = this.url; 
    return this.http.get<Proveedor[]>(apiURL);
  }

  getAllCombo(): Observable<Proveedor[]> {

    let apiURL = this.url+'/listar'; 
    return this.http.get<Proveedor[]>(apiURL);
  }
  
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  getByIdRequestType(id: number): Observable<any> {

    let apiURL = this.url+'/Proveedores/'+id; 
    return this.http.get<any>(apiURL);
  }

  getProveedorByTipo(id: any): Observable<any> {
    return this.http.get<any>(`${this.url}/listarportipo/${id}`);
  }

  create(registro: Proveedor) {

    const url = `${this.url}`;
    this.log(url);

    return this.http.post(url, registro).pipe(
      tap(result => {
      }),
      // catchError(this.handleError('Error registrando Causas', []))
    );
  }

  update(registro: Proveedor) {
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

  deleteByLote(registros: Proveedor[]) {
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
    console.log('ProveedorService: ' + message);
  }
  
}
  