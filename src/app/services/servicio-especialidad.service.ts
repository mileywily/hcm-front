import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicioEspecialidadService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + 'servicioespecialidades';
  }

  getAll(): Observable<any[]> {
    let apiURL = this.url; 
    return this.http.get<any[]>(apiURL);
  }

  getAllByEspecialidad(especialidad_id): Observable<any[]> {
    let apiURL = this.url + '/especialidad/'+especialidad_id;
    return this.http.get<any[]>(apiURL);
  }

  getAllByEspecialidadTipo(especialidad_id, tipo_atencion_id): Observable<any[]> {
       let apiURL = this.url + '/especialidadtipo/'+ especialidad_id + '/' + tipo_atencion_id;
    return this.http.get<any[]>(apiURL);
  }

  getAutomaticosByEspecialidad(especialidad_id): Observable<any[]> {
    let apiURL = this.url + '/estandard/'+especialidad_id;
    return this.http.get<any[]>(apiURL);
  }

  create(registro: any) {

    const url = `${this.url}`;
    console.log("URL:", url);
    
    return this.http.post(url, registro);
  }

  update(registro: any) {
    const url = `${this.url}`;

    return this.http.put(url, registro);
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
