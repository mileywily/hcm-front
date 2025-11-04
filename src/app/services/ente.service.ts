import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Ente } from '../models';

@Injectable({
  providedIn: 'root'
})
export class EnteService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + 'entes';
  }

  getAll(): Observable<Ente[]> {

    let apiURL = this.url; 
    return this.http.get<Ente[]>(apiURL);
  }

  getAllCombo(): Observable<Ente[]> {

    let apiURL = this.url+'/listar'; 
    return this.http.get<Ente[]>(apiURL);
  }
  
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  getByIdRequestType(id: number): Observable<any> {

    let apiURL = this.url+'/Entes/'+id; 
    return this.http.get<any>(apiURL);
  }

  create(registro: Ente) {

    const url = `${this.url}`;
    this.log(url);

    return this.http.post(url, registro).pipe(
      tap(result => {
      }),
      // catchError(this.handleError('Error registrando Causas', []))
    );
  }

  update(registro: Ente) {
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

  deleteByLote(registros: Ente[]) {
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
    console.log('EnteService: ' + message);
  }
  
}
  