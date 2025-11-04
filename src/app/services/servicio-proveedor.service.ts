import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicioProveedorService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl + 'servicioproveedores';
  }

  getAllByProveedor(proveedor_id): Observable<any[]> {
    let apiURL = this.url + '/id_prov/'+proveedor_id;
  
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

  delete(id: number) {

    const url = `${this.url}/${id}`;
    return this.http.delete(url);
  }

  deleteByLote(registros: any[]) {
    const url = `${this.url+'/eliminarLote'}`; 

    return this.http.post(url, registros);
  } 



}
