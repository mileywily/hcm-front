import { Injectable } from '@angular/core';
import { Usuario } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + 'usuario';
  }

  
  login(username: string, password: string): Observable<Usuario> {

    const url = `${this.url}/login`;
    // const md5Pass = String(Md5.hashStr(password));

    console.log("LLAMANDO A: ", url);

    return this.http.post<Usuario>(url, { usuario: username, clave: password })
  }

}
