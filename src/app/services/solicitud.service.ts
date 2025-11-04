import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Solicitud } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  private url: string;
  
  private params: any;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + 'solicitudes';
  }

  getAll(): Observable<Solicitud[]> {

    let apiURL = this.url; 
    return this.http.get<Solicitud[]>(apiURL);
  }

  getAllCombo(): Observable<Solicitud[]> {

    let apiURL = this.url+'/listar'; 
    return this.http.get<Solicitud[]>(apiURL);
  }
  
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  getByIdRequestType(id: number): Observable<any> {

    let apiURL = this.url+'/solicitudes/'+id; 
    return this.http.get<any>(apiURL);
  }

  
  /* Consulta todas las solicitudes de un beneficiario*/
  getSolicitudesByBeneficiario(data: any): Observable<Solicitud[]> {

    let apiURL = this.url + '/beneficiario';

    return this.http.post<Solicitud[]>(apiURL, data).pipe(
      tap(result => {
      }),
    );
  }

  /* Consulta todas las solicitudes de un beneficiario*/
  getSolicitudesActivasByBeneficiario(data: any): Observable<Solicitud[]> {

    let apiURL = this.url + '/beneficiarioactivas';

    
    return this.http.post<Solicitud[]>(apiURL, data).pipe(
      tap(result => {
      }),
    );
  }

    /* Consulta todas las solicitudes de un titular y de su carga familiar*/
  getSolicitudesByTitular(data: any): Observable<Solicitud[]> {

      let apiURL = this.url + '/titular';
  
      return this.http.post<Solicitud[]>(apiURL, data).pipe(
        tap(result => {
        }),
      );
    }

     /* Consulta todas las solicitudes de un titular y de su carga familiar*/
  getSolicitudesByTitularCantidad(data: any): Observable<Solicitud[]> {

    let apiURL = this.url + '/titularCantidad';

    return this.http.post<Solicitud[]>(apiURL, data).pipe(
      tap(result => {
      }),
    );
  }

  cancelarSolicitud(data: any): Observable<Solicitud[]> 
  {

    let apiURL = this.url + '/cancelarsolicitud';
    console.log("datosCanc",data);
     return this.http.post<Solicitud[]>(apiURL, data).pipe(
      tap(result => {
      }),
    );
  }

  enviarSolicitud(data: any): Observable<Solicitud[]> 
  {

    let apiURL = this.url + '/enviarsolicitud';
    console.log("datosCanc",data);
     return this.http.post<Solicitud[]>(apiURL, data).pipe(
      tap(result => {
      }),
    );
  }



  create(registro: Solicitud) {

    const url = `${this.url}`; 
    this.log(url);
    console.log(registro)

    return this.http.post(url, registro).pipe(
      tap(result => {
      }),
      // catchError(this.handleError('Error registrando Causas', []))
    );
  }

  update(registro: Solicitud) {
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

  deleteByLote(registros: Solicitud[]) {
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
    console.log('SolicitudService: ' + message);
  }

  /** GETS Y SETS */
  getParams(): any {
    return this.params ? this.params : {};
  }

  setParams(params: any) {
    this.params = params;
  }

  
}
  