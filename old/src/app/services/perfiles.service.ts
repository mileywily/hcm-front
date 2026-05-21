import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PerfilesService {
  /* Codigo de los PERFILES*/

  codPerfilAdmSiss            ='ADMIN_SISS';
  codPerfilAnalistaTaquilla   ='ANA_SISS_TAQUILLA';

  codPerfilAdmCitas           ='ADMIN_SISS_CITAS';
  codPerfilAdmTriaje          ='ADMIN_SISS_TRIAJE';
  codPerfilAdmEmergencia      ='ADMIN_SISS_EMERGENCIA';
  codPerfilAdmElectivas       ='ADMIN_SISS_ELECTIVAS';
  codPerfilAdmFunerarios      ='ADMIN_SISS_FUNERARIOS';

  codPerfilAnalistaCitas      ='ANA_SISS_CONSULTAS';
  codPerfilAnalistaEstudios   ='ANA_SISS_TRIAJE_EE';
  codPerfilAnalistaImagen     ='ANA_SISS_TRIAJE_IMAGEN';
  codPerfilAnalistaLab        ='ANA_SISS_TRIAJE_LABORATORIO';

  codPerfilAnalistaElectiva       ='ANA_SISS_ELEC';
  codPerfilAnalistaQuirurgico ='ANA_SISS_ELEC_QUI';
  codPerfilAnalistaOncologico ='ANA_SISS_ELEC_ON';




  constructor() { }

  getCodPerfilAdmSiss(): string{
    return this.codPerfilAdmSiss;
  }

  getCodPerfilAnalistaTaquilla(): string{
    return this.codPerfilAnalistaTaquilla;
  }

  getCodPerfilAdmCitas(): string{
    return this.codPerfilAdmCitas;
  } 

  getCodPerfilAdmTriaje(): string{
    return this.codPerfilAdmTriaje;
  } 
  getCodPerfilAnalistaElectiva(): string{
    return this.codPerfilAnalistaElectiva;
  } 

  
  getCodPerfilAnalistaQuirurgico(): string{
    return this.codPerfilAnalistaQuirurgico;
  } 

  getCodPerfilAnalistaOncologico(): string{
    return this.codPerfilAnalistaOncologico;
  } 



  getCodPerfilAnalistaCitas(): string{
    return this.codPerfilAnalistaCitas;
  } 

  getCodPerfilAnalistaEstudios(): string{
    return this.codPerfilAnalistaEstudios;
  } 

  getCodPerfilAnalistaImagen(): string{
    return this.codPerfilAnalistaImagen;
  } 

  getCodPerfilAnalistaLab(): string{
    return this.codPerfilAnalistaLab;
  }

  
  getCodPerfilAdmEmergencia(): string{
    return this.codPerfilAdmEmergencia;
  }

  getCodPerfilAdmElectivas(): string{
    return this.codPerfilAdmElectivas;
  }

  getCodPerfilAdmFunerarios(): string{
    return this.codPerfilAdmFunerarios;
  }

}
