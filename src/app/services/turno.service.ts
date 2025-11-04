import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + 'turnos';
  }

  getAll(): Observable<any[]> {

    let apiURL = this.url; 
    return this.http.get<any[]>(apiURL);
  }
}
