import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AtencionExamenService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + 'atencionexamenes';
  }

  getAll(): Observable<any[]> {
    let apiURL = this.url; 
    return this.http.get<any[]>(apiURL);
  }

  getAllCombo(): Observable<any[]> {
    let apiURL = this.url+'/listar'; 
    return this.http.get<any[]>(apiURL);
  }
  
  getExamenesByAtencion(atencion_id): Observable<any[]> {
    let apiURL = this.url + '/grupoexamen/atencion/'+atencion_id;
    return this.http.get<any[]>(apiURL);
  }

  create(registro: any) {

    const url = `${this.url}`;
    //console.log("URL:", url);
    
    return this.http.post(url, registro);
  }

  update(registro: any) {
    const url = `${this.url}`;

    return this.http.put(url, registro);
  } 

  updateLote(registros: any) {
    const url = `${this.url+'/updatelote'}`; 

    return this.http.post(url, registros);
  } 

  delete(id: number) {

    const url = `${this.url}/${id}`;
    return this.http.delete(url);
  }

  deleteByLote(registros: any[]) {
    const url = `${this.url+'/eliminarLote'}`; 

    return this.http.post(url, registros);
  } 


}
