import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CuposService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + 'cupos';
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}`);
  }

  getCalendario(data): Observable<any[]> {
    let apiURL = this.url + '/calendario';
    console.log("URL:", apiURL);
    
    return this.http.post<any[]>(apiURL, data);
  }

  getCalendarioTriaje(data): Observable<any[]> {
    let apiURL = this.url + '/calendario/triaje';
    console.log("apiUrl",apiURL);
    console.log("datos",data);
    return this.http.post<any[]>(apiURL, data);
  }


  getCalendarioLab(data): Observable<any[]> 
  {
    let apiURL = this.url + '/calendario/laboratorio';
    return this.http.post<any[]>(apiURL, data);
  }

  createByLote(data): Observable<any[]> {
    let apiURL = this.url + '/lotes';
    return this.http.post<any[]>(apiURL, data);
  }

  updateByLote(data): Observable<any[]> {
    console.log("datos",data);
    let apiURL = this.url + '/updatebylotes';
    return this.http.post<any[]>(apiURL, data);
  }

  update(data) {
    return this.http.put(this.url, data);
  }

  deleteByLote(data) {
    let apiURL = this.url + '/eliminarRango';
    console.log('url:', apiURL);
    console.log("data",data);

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data
    };

    //console.log('envio options:', options);

    return this.http.delete(apiURL, options);
  }

  deleteByLoteTriaje(data) {
    let apiURL = this.url + '/eliminarRangoTriaje';
    console.log('url:', apiURL);

    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: data
    };

    //console.log('envio options:', options);

    return this.http.delete(apiURL, options);
  }
}
