import { Injectable } from '@angular/core';
import { Usuario } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public login(userInfo: Usuario){
    localStorage.setItem('currentUserR', JSON.stringify(userInfo));
  }

  public isLoggedIn(){
    return localStorage.getItem('currentUserR') !== null;
  }

  public logout(){
    localStorage.removeItem('currentUserR');
  }

  public getCurrentUser(){
    return localStorage.getItem('currentUserR');
  }

}
