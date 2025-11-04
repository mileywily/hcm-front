import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { of } from "rxjs";
import { RolModelo } from '../models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRolesService {

  private url: string;
  private roles: RolModelo[] = [];
  private perfiles: any[] = [];

  constructor(private http: HttpClient) {
    this.url = environment.apiUrlSeguridad;
  }

  setRolesLocalStorage(roles: RolModelo[]) {
    this.deleteRolesLocalStorage();
    try {
      localStorage.setItem("rolesSC", JSON.stringify(roles));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  setPerfilesLocalStorage(perfiles: any[]) {
    this.deletePerfilesLocalStorage();
    try {
      localStorage.setItem("perfilesSC", JSON.stringify(perfiles));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  public getRolesLocalStorage(): RolModelo[]{

    this.roles = JSON.parse(localStorage.getItem("rolesSC"));

    return this.roles;

  }

  public deleteRolesLocalStorage() {

    if (localStorage.getItem("rolesSC"))
      localStorage.removeItem("rolesSC");
  }

  public deletePerfilesLocalStorage() {

    if (localStorage.getItem("perfilesSC"))
      localStorage.removeItem("perfilesSC");
  }

  public getPerfiles(id: any): Observable<any[]> {

    const url = `${this.url}perfiles/lista/${id}`;

    return this.http.get<any[]>(url)
      .pipe(
        tap(result => this.log(`fetched perfiles`)),
        catchError(this.handleError('getPerfiles', []))
      );
  }

  public getRoles(id: any): Observable<RolModelo[]> {

    const url = `${this.url}userLocalStorage/obtenerRoles/${id}`;

    return this.http.get<RolModelo[]>(url)
      .pipe(
        tap(result => this.log(`fetched roles`)),
        catchError(this.handleError('getRoles', []))
      );
  }

  public getIdUserBySir(username: any): Observable<any> {

    const url = `${this.url}usuarios/byUser/${username}`;
    return this.http.get<any>(url)
      .pipe(
        tap(result => this.log(`fetched userid`)),
        catchError(this.handleError('getRoles', []))
      );
  }

  public buscarRolPorCodigo(codigo: string): RolModelo[] {
    this.roles = JSON.parse(localStorage.getItem("rolesSC"));
    let result = this.roles.filter(e => e.codigo.indexOf(codigo) >= 0);
    return result;
  }

  public buscarPerfilPorNombre(nombre: string): any[] {
    this.perfiles = JSON.parse(localStorage.getItem("perfilesSC"));
    let result = this.perfiles.filter(e => e.nombre.indexOf(nombre) >= 0);
    return result;
  }

  public buscarRolPorId(id: number): RolModelo[] {
    this.roles = JSON.parse(localStorage.getItem("rolesSC"));
    let result = this.roles.filter(e => e.idSegRol == id);
    return result;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log("Roles-service: "+ message);
  }

}
