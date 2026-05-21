import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ReporteAuditoria, UserAtencion } from '../models';
@Injectable({
    providedIn: 'root'
  })
  export class AuditoriaReporteService
  {
        private url: string;

        constructor(private http: HttpClient)
        {
        this.url = environment.apiUrl + 'reportes_audi_solicitud';
        }


        Reporte_auditoria_solicitud(data: ReporteAuditoria): Observable<ReporteAuditoria[]>
        {
            let apiURL = this.url + '/auditoria';
            return this.http.post<any>(apiURL, data);
        }

        getRequestsUser(): Observable<UserAtencion[]>
        {
            let apiURL = this.url + '/listar_user';
            return this.http.get<UserAtencion[]>(apiURL);
        }

  }
