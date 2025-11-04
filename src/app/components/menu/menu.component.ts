import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
import {
  MenuService,
  AuthService,
  GlobalService,
  RolesService,
  PerfilesService,
  UserRolesService
}
from 'src/app/services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Output() 
  enviar: EventEmitter<any> = new EventEmitter<any>();


  codPerfilAdmSiss: string;
  codPerfilAnalistaTaquilla: string;

  codPerfilAdmCitas: string; 
  codPerfilAnalistaCitas: string;

  codPerfilAdmTriaje: string;
  codPerfilAnalistaEstudios: string;
  codPerfilAnalistaImagen: string;
  codPerfilAnalistaLab: string;

  codPerfilAdmEmergencia: string; 
  codPerfilAnalistaEmergencias: string;

  codPerfilAdmElectivas: string; 
  codPerfilAnalistaQuirurgico: string;
  codPerfilAnalistaOncologico: string;
  codPerfilAnalistaElectiva: string;

  codPerfilAdmFunerarios: string; 
  codPerfilAnalistaFunerarios: string;

  perfilAdmSiss: boolean;
  perfilAnalistaTaquilla: boolean;

  perfilAdmCitas: boolean;
  perfilAnalistaCitas: boolean;

  perfilAdmTriaje: boolean;
  perfilAnalistaEstudios: boolean;
  perfilAnalistaImagen: boolean;
  perfilAnalistaLab: boolean;

  perfilAnalistaElectiva: boolean;
  perfilAdmEmergencia: boolean; 
  perfilAnalistaEmergencias: boolean;

  perfilAdmElectivas: boolean; 
  perfilAnalistaQuirurgico : boolean; 
  perfilAnalistaOncologico : boolean; 


  perfilAdmFunerarios: boolean; 
  perfilAnalistaFunerarios: boolean;

  activarCitas: boolean;
  activarTriaje:boolean;
  activarEmergencia: boolean;
  activarElectivas: boolean;
  activarFunerarios: boolean;

  constructor(

    private router: Router,
    private menuService: MenuService,
    public globalService: GlobalService,
    private perfilesService:  PerfilesService,
    private srvRolesByUser: UserRolesService

  ) 
  { 
     this.codPerfilAdmSiss              =  this.perfilesService.getCodPerfilAdmSiss();   
     this.codPerfilAnalistaTaquilla     =  this.perfilesService.getCodPerfilAnalistaTaquilla();   
  
     this.codPerfilAdmCitas             =  this.perfilesService.getCodPerfilAdmCitas();   
     this.codPerfilAnalistaCitas        =  this.perfilesService.getCodPerfilAnalistaCitas();  

     this.codPerfilAdmTriaje            =  this.perfilesService.getCodPerfilAdmTriaje(); 
     this.codPerfilAnalistaEstudios     =  this.perfilesService.getCodPerfilAnalistaEstudios();   
     this.codPerfilAnalistaImagen       =  this.perfilesService.getCodPerfilAnalistaImagen();   
     this.codPerfilAnalistaLab          =  this.perfilesService.getCodPerfilAnalistaLab();
    
     this.codPerfilAnalistaElectiva     =  this.perfilesService.getCodPerfilAnalistaElectiva();
     this.codPerfilAdmElectivas        =  this.perfilesService.getCodPerfilAdmElectivas();
     this.codPerfilAnalistaQuirurgico   =  this.perfilesService.getCodPerfilAnalistaQuirurgico();
     this.codPerfilAnalistaOncologico    =  this.perfilesService.getCodPerfilAnalistaOncologico();


     this.perfilAdmSiss                 = this.srvRolesByUser.buscarPerfilPorNombre(this.codPerfilAdmSiss).length > 0 ? true : false;
     this.perfilAnalistaTaquilla        = this.srvRolesByUser.buscarPerfilPorNombre(this.codPerfilAnalistaTaquilla).length > 0 ? true : false;

     this.perfilAdmCitas                = this.srvRolesByUser.buscarPerfilPorNombre(this.codPerfilAdmCitas).length > 0 ? true : false;
     this.perfilAnalistaCitas           = this.srvRolesByUser.buscarPerfilPorNombre(this.codPerfilAnalistaCitas).length > 0 ? true : false;

     this.perfilAdmTriaje               = this.srvRolesByUser.buscarPerfilPorNombre(this.codPerfilAdmTriaje).length > 0 ? true : false;
     this.perfilAnalistaEstudios        = this.srvRolesByUser.buscarPerfilPorNombre(this.codPerfilAnalistaEstudios).length > 0 ? true : false;
     this.perfilAnalistaImagen          = this.srvRolesByUser.buscarPerfilPorNombre(this.codPerfilAnalistaImagen).length > 0 ? true : false;
     this.perfilAnalistaLab             = this.srvRolesByUser.buscarPerfilPorNombre(this.codPerfilAnalistaLab).length > 0 ? true : false;
     
     
     this.perfilAdmEmergencia         = this.srvRolesByUser.buscarPerfilPorNombre(this.codPerfilAdmEmergencia).length > 0 ? true : false;
     this.perfilAnalistaEmergencias   = this.srvRolesByUser.buscarPerfilPorNombre(this.codPerfilAnalistaEmergencias).length > 0 ? true : false;

     this.perfilAnalistaElectiva        = this.srvRolesByUser.buscarPerfilPorNombre(this.codPerfilAnalistaElectiva).length > 0 ? true : false;
     this.perfilAdmElectivas          = this.srvRolesByUser.buscarPerfilPorNombre(this.codPerfilAdmElectivas).length > 0 ? true : false;
     this.perfilAnalistaQuirurgico = this.srvRolesByUser.buscarPerfilPorNombre(this.codPerfilAnalistaQuirurgico).length > 0 ? true : false;
     this.perfilAnalistaOncologico   = this.srvRolesByUser.buscarPerfilPorNombre(this.codPerfilAnalistaOncologico).length > 0 ? true : false;
 
    /*console.log('this.perfilAnalistaElectiva 1', this.perfilAnalistaElectiva);
    console.log('this.perfilAnalistaElectivaon 1', this.perfilAnalistaOncologico);
    console.log('this.perfilAnalistaElectivaqui 1', this.perfilAnalistaQuirurgico);
    console.log('this.perfilAdminElectivaqui 1', this.perfilAdmElectivas);*/

     this.perfilAdmFunerarios         = this.srvRolesByUser.buscarPerfilPorNombre(this.codPerfilAdmFunerarios).length > 0 ? true : false;
     this.perfilAnalistaFunerarios    = this.srvRolesByUser.buscarPerfilPorNombre(this.codPerfilAnalistaFunerarios).length > 0 ? true : false;
  }

  ngOnInit() { 
    this.activarCitas   = true;
    this.activarTriaje  = true;
    this.activarEmergencia  = true;
    this.activarElectivas  = true;
    this.activarFunerarios  = true;

    this.activarMenuCitas();
    this.activarMenuTriaje();
    this.activarMenuEmergencias();
    this.activarMenuElectivas();
    this.activarMenuFunerarios();

    /* console.log('this.perfilAnalistaElectiva ', this.perfilAnalistaElectiva);
    console.log('this.perfilAnalistaElectivaon ', this.perfilAnalistaOncologico);
    console.log('this.perfilAnalistaElectivaqui ', this.perfilAnalistaQuirurgico);
    console.log('this.perfilAdminElectivaqui ', this.perfilAdmElectivas);
   console.log('this.perfilAdmCitas ', this.perfilAdmCitas);
    console.log('this.perfilAnalistaCitas', this.perfilAnalistaCitas);

    console.log('this.perfilAnalistaTaquilla ', this.perfilAnalistaTaquilla);
    
    console.log('this.perfilAdmTriaje ', this.perfilAdmTriaje);
    console.log('this.perfilAnalistaEstudios ', this.perfilAnalistaEstudios);
    console.log('this.perfilAnalistaImagen ', this.perfilAnalistaImagen);
    console.log('this.perfilAnalistaLab ', this.perfilAnalistaLab);*/

  }

  ngOnDestroy(){

  }

  activarMenuCitas(){

    if (this.perfilAdmSiss || this.perfilAdmCitas ||  this.perfilAnalistaCitas ){
        this.activarCitas = false;
    }

  }

  activarMenuTriaje(){
    if (this.perfilAdmSiss || this.perfilAnalistaTaquilla || this.perfilAdmTriaje || 
        this.perfilAnalistaEstudios || this.perfilAnalistaImagen || this.perfilAnalistaLab){
        this.activarTriaje = false;
    }

  }

  activarMenuEmergencias(){

    if (this.perfilAdmSiss || this.perfilAdmEmergencia || this.perfilAnalistaEmergencias){
        this.activarEmergencia = false;
    }

  }

  activarMenuElectivas(){



    if (this.perfilAdmSiss || this.perfilAdmElectivas || this.perfilAnalistaQuirurgico || this.perfilAnalistaOncologico || this.perfilAnalistaElectiva)
    {
          this.activarElectivas = false;
    }

  }

  
  activarMenuFunerarios(){

    if (this.perfilAdmSiss || this.perfilAdmFunerarios || this.perfilAnalistaFunerarios){
        this.activarFunerarios = false;
    }

  }

  salir(){
    this.menuService.salir();
    this.router.navigate(["login"]);
  }

  vermenu(menu: any){
   
    this.enviar.emit(menu);
    if (menu==1){
      this.menuService.setTipoAtencion(2);
      this.router.navigate(['solicitud-beneficiario', -1,-1], { });
    }else{
      this.router.navigate(['']);
    }
  }


}
