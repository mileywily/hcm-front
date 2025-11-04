import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Beneficiario } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BeneficiarioSissService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrlSiss + 'beneficiariossiss';
  }

  /* Consulta Beneficiarios por cedula */
  /*                                   */
  getBeneficiarioByCedulaTitular(cedula_titular: any): Observable<Beneficiario[]> {

    let apiURL = this.url;
    let data = { "cedula_titular": cedula_titular };

    return this.http
      .post<Beneficiario[]>(apiURL, data)
      .pipe(tap((result) => {}));
  }

  getBeneficiarioByCedula(cedula_beneficiario: any): Observable<Beneficiario[]> {

    let apiURL = this.url;
    let data = { "cedula_beneficiario": cedula_beneficiario };

    return this.http
      .post<Beneficiario[]>(apiURL, data)
      .pipe(tap((result) => {}));
  }

  updateCargaFamiliarFromSiss(data: any): Observable<Beneficiario[]> {

    let apiURL = this.url + '/actualizarfromsiss';

    return this.http.post<Beneficiario[]>(apiURL, data ).pipe(
      tap(result => {
      }),
    );
  }

}
