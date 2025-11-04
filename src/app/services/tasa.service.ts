
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Tasas_Cambio } from '../models';

@Injectable({
    providedIn: 'root'
  })
  export class TasaService 
  {

    private url: string;

  constructor(private http: HttpClient) 
  {
    this.url = environment.apiUrl + 'tasas';
  }

getAll(): Observable<Tasas_Cambio[]> {

    let apiURL = this.url; 
    console.log("validar",apiURL);
    return this.http.get<Tasas_Cambio[]>(apiURL);
  }

  getAllCombo(): Observable<Tasas_Cambio[]> {

    let apiURL = this.url+'/listar'; 
    return this.http.get<Tasas_Cambio[]>(apiURL);
  }
  
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  getByIdRequestType(id: number): Observable<any> {

    let apiURL = this.url+'/tasas/'+id; 
    return this.http.get<any>(apiURL);
  }

  create(registro: Tasas_Cambio) {

    const url = `${this.url}`;
    this.log(url);
    console.log("link",url);
    console.log("registro",registro);

    return this.http.post(url, registro).pipe(
      tap(result => {
      }),
    );
  }

  update(registro: Tasas_Cambio) {
    const url = `${this.url}`;

    return this.http.put(url, registro).pipe(
      tap(result => {
      }),
    );
  }

  delete(id: number) {

    const url = `${this.url}/${id}`;
    this.log(url);
    return this.http.delete(url);
  }

  deleteByLote(registros: Tasas_Cambio[]) {
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
    console.log('TasasService: ' + message);
  }
  
}