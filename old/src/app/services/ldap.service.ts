import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LdapService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrlLDAP + 'ldap/login';
  }

  login(data: any) {
    return this.http.post(this.url, data).pipe(tap(result => { }));
  }

}
