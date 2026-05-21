import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Beneficiario } from '../models';

@Injectable({
  providedIn: 'root'
})
export class BeneficiarioService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + 'beneficiarios';
  }

  getAll(): Observable<Beneficiario[]> {

    let apiURL = this.url; 
    return this.http.get<Beneficiario[]>(apiURL);
  }

  getAllCombo(): Observable<Beneficiario[]> {

    let apiURL = this.url+'/listar'; 
    return this.http.get<Beneficiario[]>(apiURL);
  }
  
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  getByIdRequestType(id: number): Observable<any> {

    let apiURL = this.url+'/beneficiarios/'+id; 
    return this.http.get<any>(apiURL);
  }

  /* Consulta Solicitantes*/
  getBeneficiarioByParametros(data: any): Observable<Beneficiario[]> {

    let apiURL = this.url + '/consultar';

    return this.http.post<Beneficiario[]>(apiURL, data).pipe(
      tap(result => {
      }),
    );
  }

  /* O Consulta Titular de un beneficiario*/
  getTitularByBeneficiario(data: any): Observable<Beneficiario[]> {

    let apiURL = this.url + '/titular';

    return this.http.post<Beneficiario[]>(apiURL, data).pipe(
      tap(result => {
      }),
    );
  }


  updateCargaFamiliarFromSiss(data: any): Observable<Beneficiario[]> {

    let apiURL = this.url + '/actualizarfromsiss';

    return this.http.post<Beneficiario[]>(apiURL, data ).pipe(
      tap(result => {
      }),
    );
  }



  create(registro: Beneficiario) {

    const url = `${this.url}`;
    this.log(url);

    return this.http.post(url, registro).pipe(
      tap(result => {
      }),
      // catchError(this.handleError('Error registrando Causas', []))
    );
  }

  update(registro: Beneficiario) {
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

  deleteByLote(registros: Beneficiario[]) {
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
    console.log('BeneficiarioService: ' + message);
  }
  
}
  