import { Component, OnInit } from '@angular/core';

import {
  MenuService,
  AuthService,
  GlobalService,
  PerfilesService,
  UserRolesService
}
from 'src/app/services';

import {
  Trabajador
}
from 'src/app/models';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.component.html',
  styleUrls: ['./menu-principal.component.scss']
})
export class MenuPrincipalComponent implements OnInit {

    
  user: Trabajador;
  asset: any;

  perfiles: any[] = [];

  codPerfilAdmSiss: string;
  codPerfilAnalistaTaquilla: string;

  codPerfilAdmCitas: string;
  codPerfilAnalistaCitas: string;

  codPerfilAdmTriaje: string;
  codPerfilAnalistaEstudios: string;

  codPerfilAnalistaImagen: string;
  codPerfilAnalistaLab: string;

  codPerfilAdmElectivas: string;
  codPerfilAnalistaQuirurgico: string;
  codPerfilAnalistaOncologico: string;


  perfilAdmSiss: boolean;
  perfilAnalistaTaquilla: boolean;


  perfilAdmCitas: boolean;
  perfilAnalistaCitas: boolean;

  perfilAdmTriaje: boolean;
  perfilAnalistaEstudios: boolean;
  perfilAnalistaImagen: boolean;
  perfilAnalistaLab: boolean;

  perfilAdmElectivas: boolean; 

  perfilAnalistaQuirurgico: boolean; 
  perfilAnalistaOncologico: boolean; 

  constructor(
    
    private menuService:  MenuService,
    private authService: AuthService,
    public globalService: GlobalService,
    private srvRolesByUser: UserRolesService,
    private perfilesService:  PerfilesService,

  ) { }

  ngOnInit() {
      let currentUser = this.authService.getCurrentUser();
      this.user = JSON.parse(currentUser);
      this.asset = this.globalService.urlAssets;

      this.permissionsByUser();
  }

  

  permissionsByUser() {

    this.codPerfilAdmSiss           = this.perfilesService.getCodPerfilAdmSiss();
    this.codPerfilAnalistaTaquilla  = this.perfilesService.getCodPerfilAnalistaTaquilla();

    this.codPerfilAdmCitas          = this.perfilesService.getCodPerfilAdmCitas();
    this.codPerfilAnalistaCitas     = this.perfilesService.getCodPerfilAnalistaCitas();

    this.codPerfilAdmTriaje         = this.perfilesService.getCodPerfilAdmTriaje();
    this.codPerfilAnalistaEstudios  = this.perfilesService.getCodPerfilAnalistaEstudios();
    this.codPerfilAnalistaImagen    = this.perfilesService.getCodPerfilAnalistaImagen();
    this.codPerfilAnalistaLab       = this.perfilesService.getCodPerfilAnalistaLab();

    this.codPerfilAdmElectivas         = this.perfilesService.getCodPerfilAdmElectivas();
    this.codPerfilAnalistaQuirurgico  = this.perfilesService.getCodPerfilAnalistaQuirurgico();
    this.codPerfilAnalistaOncologico    = this.perfilesService.getCodPerfilAnalistaOncologico();

    this.perfilAdmSiss          = this.srvRolesByUser.buscarPerfilPorNombre(this.codPerfilAdmSiss).length > 0 ? true : false;
    this.perfilAnalistaTaquilla = this.srvRolesByUser.buscarPerfilPorNombre(this.codPerfilAnalistaTaquilla).length > 0 ? true : false;
    
    this.perfilAdmCitas         = this.srvRolesByUser.buscarPerfilPorNombre(this.codPerfilAdmCitas).length > 0 ? true : false;
    this.perfilAnalistaCitas    = this.srvRolesByUser.buscarPerfilPorNombre(this.codPerfilAnalistaCitas).length > 0 ? true : false;

    this.perfilAdmTriaje        = this.srvRolesByUser.buscarPerfilPorNombre(this.codPerfilAdmTriaje).length > 0 ? true : false;
    this.perfilAnalistaEstudios = this.srvRolesByUser.buscarPerfilPorNombre(this.codPerfilAnalistaEstudios).length > 0 ? true : false;
    this.perfilAnalistaImagen   = this.srvRolesByUser.buscarPerfilPorNombre(this.codPerfilAnalistaImagen).length > 0 ? true : false;
    this.perfilAnalistaLab      = this.srvRolesByUser.buscarPerfilPorNombre(this.codPerfilAnalistaLab).length > 0 ? true : false;
  
    this.perfilAdmElectivas       = this.srvRolesByUser.buscarPerfilPorNombre(this.codPerfilAdmElectivas).length > 0 ? true : false;
    this.perfilAnalistaQuirurgico = this.srvRolesByUser.buscarPerfilPorNombre(this.codPerfilAnalistaQuirurgico).length > 0 ? true : false;
    this.perfilAnalistaOncologico   = this.srvRolesByUser.buscarPerfilPorNombre(this.codPerfilAnalistaOncologico).length > 0 ? true : false;

  
  }

  menu(menu: any){
    this.menuService.setTipoSolicitud(menu);
    //console.log("TIPO SOLICITUD menu principal::::::: " , this.menuService.getTipoSolicitud());
  }

}
