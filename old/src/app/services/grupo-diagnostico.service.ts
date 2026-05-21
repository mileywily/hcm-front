import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { GrupoDiagnostico } from '../models';

@Injectable({
  providedIn: 'root'
})
export class GrupoDiagnosticoService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + 'grupodiagnosticos';
  }

  getAll(): Observable<GrupoDiagnostico[]> {

    let apiURL = this.url; 
    return this.http.get<GrupoDiagnostico[]>(apiURL);
  }

  getAllByGrupo(grupo_id): Observable<any[]> {
    let apiURL = this.url + '/grupo/'+grupo_id;
  
    return this.http.get<any[]>(apiURL);
  }

  getAllCombo(): Observable<GrupoDiagnostico[]> {

    let apiURL = this.url+'/listar'; 
    return this.http.get<GrupoDiagnostico[]>(apiURL);
  }
  
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  getByIdRequestType(id: number): Observable<any> {

    let apiURL = this.url+'/grupodiagnosticos/'+id; 
    return this.http.get<any>(apiURL);
  }

  create(registro: GrupoDiagnostico) {

    const url = `${this.url}`;
    this.log(url);

    return this.http.post(url, registro).pipe(
      tap(result => {
      }),
      // catchError(this.handleError('Error registrando Causas', []))
    );
  }

  update(registro: GrupoDiagnostico) {
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

  deleteByLote(registros: GrupoDiagnostico[]) {
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
    console.log('GrupoDiagnosticoService: ' + message);
  }
  
}
  