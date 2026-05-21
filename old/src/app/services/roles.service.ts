import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  /* Codigo de los roles  CATALOGOS (los catálogos deben ser manejador por perfil administrador)*/
  codRolCatalog               = 'ROL-CITAS-V-CATALOG'; //Rol para ver link  de catalogos
 
  /* Codigo de los roles  CONSULTA BENEFICIARIOS (Esta consulta deben manejarla todos los perfiles)*/
  codRolBeneficiarios         = 'ROL-CITAS-V-BENEF';    //Rol para ver link  de consulta beneficiarios
  
  /* =================================== */
  /* ======= MODULO CITAS MEDICAS ====== */
  /* =================================== */

  //---- Cupos ---- //
  codRolCitasVerLinkCrearCuposMedicos       = 'ROL-CITAS-V-CUP_MED';      //Rol para ver link  de crear cupos de citas médicas
  codRolCitasVerLinkCalendario              = 'ROL-CITAS-V-CAL';          //Rol para ver link  de calendario de cupos de citas médicas
  codRolCitasVerLinkReporteMedico           = 'ROL-CITAS-V-C-MED';        //=>Rol para ver link  de reporte médico de citas
  codRolCitasCrearCuposMedicos              = 'ROL-CITAS-CRE-CUP_MED';    //Rol para crear cupos de citas médicas

  /*codRolElectivaVerLinkCalendario         ='ROL-ELECT-V-CAL'              //Rol para ver link  de calendario de cupos de electivas
  codRolElectivaVerLinkReporteElectiva    ='ROL-ELECT-V-C-ELE'            //=>Rol para ver link  de reporte  de electivas
  codRolElectivaVerLinkNuevaSolicitud     ='ROL-ELECT-V-N-SOL'            //Rol para ver link  de nueva solicitud de electivas
  codRolElectivaVerLinkModificarSolicitud ='ROL-ELECT-V-M-SOL'            //Rol para ver link  de modificar solicitud de electivas
  codRolElectivaModificarSolicitudConsulta = 'ROL-ELECT-MOD-SOL-C';      //Rol para modificar solicitud de electivas
  codRolElectivaVerLinkConsultas          ='ROL-ELECT-V-C-SOL'            //=>Rol para ver link  de consultar solicitudes de electivas
  codRolElectivaVerLinkModificarOrdenes   ='ROL-ELECT-V-C-ORD'            //=>Rol para ver link de consultar ordenes de electivas
  codRolElectivaCrearCupos              = 'ROL-ELECT-CRE-CUP_ELE';    //Rol para crear cupos de electivas
  codRolElectivaVerLinkCrearCupos       = 'ROL-ELECT-V-CUP_ELE';      //Rol para ver link  de crear cupos de electivas
*/

  //---- Solicitud ---- //
  codRolCitasVerLinkNuevaSolicitud          = 'ROL-CITAS-V-N-SOL'    //Rol para ver link  de nueva solicitud de citas médicas
  codRolCitasVerLinkModificarSolicitud      = 'ROL-CITAS-V-M-SOL';   //Rol para ver link  de modificar solicitud de citas médicas
  codRolCitasVerLinkConsultas               = 'ROL-CITAS-V-C-SOL';   //=>Rol para ver link  de consultar solicitudes de citas médicas

  codRolCitasCrearSolicitudConsulta         = 'ROL-CITAS-CRE-SOL-C';  //Rol para crear nueva solicitud de citas médicas 
  codRolCitasModificarSolicitudConsulta     = 'ROL-CITAS-MOD-SOL-C';  //Rol para modificar solicitud de citas médicas
  codRolCitasVerSolicitudConsulta           = 'ROL-CITAS-VER-SOL-C';  //Rol para visualizar solicitud de citas médicas
  codRolCitasCancelarSolicitudConsulta      = 'ROL-CITAS-CAN-SOL-C';  //Rol para cancelar solicitud de citas médicas
    
  //---- Orden ---- //
  codRolCitasVerLinkModificarOrdenes        = 'ROL-CITAS-V-C-ORD';      //=>Rol para ver link de consultar ordenes de citas médicas
  codRolCitasCrearOrden                     = 'ROL-CITAS-CRE-ORD';      //Rol para crear ordenes de citas médicas
  codRolCitasModificarOrden                 = 'ROL-CITAS-MOD-ORD';      //Rol para modificar ordenes de citas médicas
  codRolCitasVerOrden                       = 'ROL-CITAS-VER-ORD';      //Rol para visualizar ordenes de citas médicas
  codRolCitasCancelarOrden                  = 'ROL-CITAS-CAN-ORD';      //Rol para cancelar ordenes de citas médicas
  codRolCitasConfirmarOrden                 = 'ROL-CITAS-CNF-ORD';      //Rol para confirmar ordenes de citas médicas
  codRolCitasCrearOrdenAdm                  = 'ROL-CITAS-CRE-ORD-ADM';  //Rol para crear ordenes en solicitudes que ya han sido asignadas (Solo ADM)


  /* ================================================= */
  /* ======= MODULO TRIAJE ESTUDIOS ESPECIALES  ====== */
  /* ================================================= */
   
  codRolEstudiosEspeciales                = 'ROL-CITAS-V-EST-ESP';   //Este rol solo para saber si puede ver estudios especiales en combo
  codRolCitasCrearSolicitudEstudiosEsp    = 'ROL-CITAS-CRE-SOL-EE';  //Rol para crear nueva solicitud de Estudios Especiales

  //---- Cupos ---- //
  codRolEstudiosEspecialesVerLinkCrearCupos     = 'ROL-TRIAJE-V-CUP-EE';        //Rol para ver link  de crear cupos de Estudios Especiales
  codRolEstudiosEspecialesCrearCupos            = 'ROL-TRIAJE-CRE-CUP-EE';      //Rol para crear cupos de Estudios Especiales
  codRolEstudiosEspecialesVerLinkCalendario     = 'ROL-TRIAJE-V-CAL-EE';        //Rol para consultar cupos de Estudios Especiales calendario
  codRolEstudiosEspecialesVerLinkReporteCupos   = 'ROL-TRIAJE-V-REP-CUP-EE';    //Rol_consultar_reporte_medico_estudios_especiales

  //---- Solicitud ---- //
  codRolEstudiosEspecialesCrearSolicitud      = 'ROL-TRIAJE-CRE-SOL-EE';  //Rol para crear nueva solicitud de estudios especiales 
  codRolEstudiosEspecialesModificarSolicitud  = 'ROL-TRIAJE-MOD-SOL-EE';  //Rol para modificar solicitud de estudios especiales 
  codRolEstudiosEspecialesVerSolicitud        = 'ROL-TRIAJE-VER-SOL-EE';  //Rol para ver solicitud de estudios especiales
  codRolEstudiosEspecialesCancelarSolicitud   = 'ROL-TRIAJE-CAN-SOL-EE';  //Rol para cancelar solicitud de estudios especiales
  codRolEstudiosEspecialesVerLinkConsultas    = 'ROL-TRIAJE-V-C-SOL-EE';  //Rol para ver link  de consultar solicitudes de estudios especiales
 
  //---- Orden ---- //
  codRolEstudiosEspecialesCrearOrden            = 'ROL-TRIAJE-CRE-ORD-EE';  //Rol para crear ordenes de estudios especiales
  codRolEstudiosEspecialesModificarOrden        = 'ROL-TRIAJE-MOD-ORD-EE';  //Rol para modificar ordenes de estudios especiales
  codRolEstudiosEspecialesVerOrden              = 'ROL-TRIAJE-VER-ORD-EE';  //Rol para ver ordenes de estudios especiales
  codRolEstudiosEspecialesCancelarOrden         = 'ROL-TRIAJE-CAN-ORD-EE';  //Rol para cancelar ordenes de estudios especiales
  codRolEstudiosEspecialesConfirmarOrden        = 'ROL-TRIAJE-CNF-ORD-EE';  //Rol para confirmar ordenes de estudios especiales
  codRolEstudiosEspecialesVerLinkModificarOrden  = 'ROL-TRIAJE-V-C-ORD-EE';  //Rol para ver link  de modificar ordenes de estudios especiales reporte
  
  /* ====================================== */
  /* ======= MODULO TRIAJE IMAGENES  ====== */
  /* ====================================== */

  //---- Cupos ---- //
  codRolImagenVerLinkCrearCupos          = 'ROL-TRIAJE-V-CUP-IMG';    //Rol para ver link  de crear cupos de imagen
  codRolImagenCrearCupos                 = 'ROL-TRIAJE-CRE-CUP-IMG';  //Rol para crear cupos de imagen
  codRolImagenVerLinkConsultaCalendario  = 'ROL-TRIAJE-V-CAL-IMG';    //Rol para consultar cupos de imagen calendario
  codRolImagenVerLinkReporteCupos        = 'ROL-TRIAJE-V-REP-CUP-IMG';      //Rol consultar reporte cupos imagen
  

  //---- Solicitud ---- //
  codRolImagenCrearSolicitud           = 'ROL-TRIAJE-CRE-SOL-IMG';   //Rol para crear nueva solicitud de imagen
  codRolImagenModificarSolicitud       = 'ROL-TRIAJE-MOD-SOL-IMG';   //Rol para modificar  solicitud de imagen
  codRolImagenVerSolicitud             = 'ROL-TRIAJE-VER-SOL-IMG';   //Rol para ver  solicitud de imagen
  codRolImagenCancelarSolicitud        = 'ROL-TRIAJE-CAN-SOL-IMG';   //Rol para cancelar  solicitud de imagen
  codRolImagenConsultasSolicitudes     = 'ROL-TRIAJE-V-C-SOL-IMG';   //Rol_consultar_solicitudes_triaje_imagen_reporte
   
  //---- Orden ---- //
  codRolImagenCrearOrden               = 'ROL-TRIAJE-CRE-ORD-IMG';    //Rol para crear ordenes de imagen
  codRolImagenModificarOrden            = 'ROL-TRIAJE-MOD-ORD-IMG';    //Rol para modificar ordenes de imagen
  codRolImagenVerOrden                  = 'ROL-TRIAJE-VER-ORD-IMG';    //Rol para ver ordenes de imagen
  codRolImagenCancelarOrden             = 'ROL-TRIAJE-CAN-ORD-IMG';    //Rol para cancelar ordenes de imagen
  codRolImagenConfirmarOrden           = 'ROL-TRIAJE-CNF-ORD-IMG';    //Rol para confirmar ordenes de imagen
  codRolImagenVerLinkModificarOrden    = 'ROL-TRIAJE-V-C-ORD-IMG';    //Rol_consultar_ordenes_imagen_reporte
    
  /* ========================================= */
  /* ======= MODULO TRIAJE LABORATORIO  ====== */
  /* ========================================= */

  //---- Cupos ---- //
  codRolLaboratorioVerLinkCrearCupos        = 'ROL-TRIAJE-V-CUP-LAB';     //Rol para ver link  de crear cupos de laboratorio
  codRolLaboratorioCrearCupos               = 'ROL-TRIAJE-CRE-CUP-LAB';   //Rol para crear cupos de  Laboratorio
  codRolLaboratorioVerLinkConsultaCalendario = 'ROL-TRIAJE-V-CAL-LAB';     //Rol para consultar cupos de laboratorio
  codRolLaboratorioVerLinkReporteCupos     = 'ROL-TRIAJE-V-REP-CUP-LAB';       //Rol_consultar_reporte_laboratorios
  

  //---- Solicitud ---- //
  codRolLaboratorioCrearSolicitud          = 'ROL-TRIAJE-CRE-SOL-LAB';   //Rol para crear nueva solicitud de laboratorio
  codRolLaboratorioModificarSolicitud       = 'ROL-TRIAJE-MOD-SOL-LAB';   //Rol para modificar  solicitud de laboratorio
  codRolLaboratorioVerSolicitud             = 'ROL-TRIAJE-VER-SOL-LAB';   //Rol para ver  solicitud de laboratorio
  codRolLaboratorioCancelarSolicitud        = 'ROL-TRIAJE-CAN-SOL-LAB';   //Rol para cancelar  solicitud de laboratorio
  codRolLaboratorioConsultaSolicitud       = 'ROL-TRIAJE-V-C-SOL-LAB';   //Rol_consultar_solicitudes_triaje_laboratorio_reporte
   
  //---- Orden ---- //
  codRolLaboratorioCrearOrden             = 'ROL-TRIAJE-CRE-ORD-LAB';   //Rol para crear ordenes de laboratorio
  codRolLaboratorioModificarOrden         = 'ROL-TRIAJE-MOD-ORD-LAB';   //Rol para modificar ordenes de laboratorio
  codRolLaboratorioVerOrden               = 'ROL-TRIAJE-VER-ORD-LAB';   //Rol para ver ordenes de laboratorio
  codRolLaboratorioCancelarOrden          = 'ROL-TRIAJE-CAN-ORD-LAB';   //Rol para cancelar ordenes de laboratorio
  codRolLaboratorioConfirmarOrden         = 'ROL-TRIAJE-CNF-ORD-LAB';   //Rol para confirmar ordenes de laboratorio
  codRolLaboratorioVerLinkModificarOrden  = 'ROL-TRIAJE-V-C-ORD-LAB';   //Rol_consultar_ordenes_laboratorio (reporte)

  //-----Rol para creación de solicitudes de taquilla---//
  
 /* ========================================= */
  /* ======= MODULO TRIAJE ELECTIVA ONCOLOGICO  ====== */
  /* ========================================= */

  //---- Cupos ---- //

  codRolElectivaONVerLinkCrearCupos         = 'ROL-ELEC-V-CUP-ON';     //Rol para ver link  de crear cupos de laboratorio
  codRolElectivaONCrearCupos                = 'ROL-ELEC-CRE-CUP-ON';   //Rol para crear cupos de  Laboratorio
  codRolElectivaONVerLinkConsultaCalendario = 'ROL-ELEC-V-CAL-ON';     //Rol para consultar cupos de laboratorio
  codRolElectivaONVerLinkReporteCupos ='ROL-ELEC-V-REP-CUP-ON'  //Rol_consultar_reporte_laboratorios
   


  //---- Solicitud ---- //
    codRolElectivaONCrearSolicitud            = 'ROL-ELEC-CRE-SOL-ON';   //Rol para crear nueva solicitud de laboratorio
    codRolElectivaONModificarSolicitud        = 'ROL-ELEC-MOD-SOL-ON';   //Rol para modificar  solicitud de laboratorio
    codRolElectivaONVerSolicitud              = 'ROL-ELEC-VER-SOL-ON';   //Rol para ver  solicitud de laboratorio
    codRolElectivaONCancelarSolicitud         = 'ROL-ELEC-CAN-SOL-ON';   //Rol para cancelar  solicitud de laboratorio
    codRolElectivaONConsultaSolicitud       = 'ROL-ELEC-V-C-SOL-ON';   //Rol_consultar_solicitudes_triaje_laboratorio_reporte

 

  //---- Orden ---- //
  codRolElectivaONCrearOrden               = 'ROL-ELEC-CRE-ORD-ON';   //Rol para crear ordenes de laboratorio
  codRolElectivaONVerLinkModificarOrden  =   'ROL-ELEC-V-C-ORD-ON';   //Rol para modificar ordenes de laboratorio
  codRolElectivaONVerOrden               = 'ROL-ELEC-VER-ORD-ON';   //Rol para ver ordenes de laboratorio
  codRolElectivaONCancelarOrden          = 'ROL-ELEC-CAN-ORD-ON';   //Rol para cancelar ordenes de laboratorio
  codRolElectivaONConfirmarOrden         = 'ROL-ELEC-CNF-ORD-ON';   //Rol para confirmar ordenes de laboratorio
 

  /* ========================================= */
  /* ======= MODULO TRIAJE ELECTIVA QUIRURGICO  ====== */
  /* ========================================= */

  //---- Cupos ---- //

  codRolElectivaQUIVerLinkCrearCupos         = 'ROL-ELEC-V-CUP-QUI';     //Rol para ver link  de crear cupos de laboratorio
  codRolElectivaQUICrearCupos                = 'ROL-ELEC-CRE-CUP-QUI';   //Rol para crear cupos de  Laboratorio
  codRolElectivaQUIVerLinkConsultaCalendario = 'ROL-ELEC-V-CAL-QUI';     //Rol para consultar cupos de laboratorio
  codRolElectivaQUIVerLinkReporteCupos ='ROL-ELEC-V-REP-CUP-QUI'  //Rol_consultar_reporte_laboratorios
   


  //---- Solicitud ---- //
    codRolElectivaQUICrearSolicitud            = 'ROL-ELEC-CRE-SOL-QUI';   //Rol para crear nueva solicitud de laboratorio
    codRolElectivaQUIModificarSolicitud        = 'ROL-ELEC-MOD-SOL-QUI';   //Rol para modificar  solicitud de laboratorio
    codRolElectivaQUIVerSolicitud              = 'ROL-ELEC-VER-SOL-QUI';   //Rol para ver  solicitud de laboratorio
    codRolElectivaQUICancelarSolicitud         = 'ROL-ELEC-CAN-SOL-QUI';   //Rol para cancelar  solicitud de laboratorio
    codRolElectivaQUIConsultaSolicitud       = 'ROL-ELEC-V-C-SOL-QUI';   //Rol_consultar_solicitudes_triaje_laboratorio_reporte

 

  //---- Orden ---- //
  codRolElectivaQUICrearOrden               = 'ROL-ELEC-CRE-ORD-QUI';   //Rol para crear ordenes de laboratorio
  codRolElectivaQUIVerLinkModificarOrden  =   'ROL-ELEC-V-C-ORD-QUI';   //Rol para modificar ordenes de laboratorio
  codRolElectivaQUIVerOrden               = 'ROL-ELEC-VER-ORD-QUI';   //Rol para ver ordenes de laboratorio
  codRolElectivaQUICancelarOrden          = 'ROL-ELEC-CAN-ORD-QUI';   //Rol para cancelar ordenes de laboratorio
  codRolElectivaQUIConfirmarOrden         = 'ROL-ELEC-CNF-ORD-QUI';   //Rol para confirmar ordenes de laboratorio



  constructor() { }

  getCodRolCatalog(): string{
    return this.codRolCatalog;
  }

  getCodRolBeneficiarios(): string{
    return this.codRolBeneficiarios;
  }


  getCodRolCitasVerLinkCrearCuposMedicos(): string{
    return this.codRolCitasVerLinkCrearCuposMedicos;
  }


  getCodRolCitasVerLinkNuevaSolicitud(): string{
    return this.codRolCitasVerLinkNuevaSolicitud;

  }

  
  getCodRolElectivaQUIVerLinkCrearCupos(): string{
    return this.codRolElectivaQUIVerLinkCrearCupos;
  }

  getCodRolElectivaQUIConfirmarOrden(): string{
    return this.codRolElectivaQUIConfirmarOrden;
  }

  
  getCodRolElectivaQUICrearCupos(): string{
    return this.codRolElectivaQUICrearCupos;
  }


 

  getCodRolElectivaQUICrearSolicitud(): string{
    return this. codRolElectivaQUICrearSolicitud;

  }


  getCodRolElectivaQUICrearOrden(): string{
    return this. codRolElectivaQUICrearOrden;

  }


  getCodRolElectivaQUIModificarSolicitud(): string{
    return this.codRolElectivaQUIModificarSolicitud;
  }

  
  getCodRolElectivaQUICancelarOrden(): string{
    return this.codRolElectivaQUICancelarOrden;
  }

  getCodRolElectivaQUIVerSolicitud(): string{
    return this.codRolElectivaQUIVerSolicitud;
  }

  getCodRolElectivaQUICancelarSolicitud(): string{
    return this.codRolElectivaQUICancelarSolicitud;
  }

  

  getCodRolElectivaQUIVerLinkModificarOrden(): string{
    return this.codRolElectivaQUIVerLinkModificarOrden;
  }

  getCodRolElectivaQUIVerOrden(): string{
    return this.codRolElectivaQUIVerOrden;
  }



  getCodRolElectivaQUIVerLinkConsultaCalendario(): string{
    return this.codRolElectivaQUIVerLinkConsultaCalendario;
  }

  getCodRolElectivaQUIVerLinkReporteCupos(): string{
    return this.codRolElectivaQUIVerLinkReporteCupos;
  }

  getCodRolElectivaQUIConsultaSolicitud(): string{
    return this.codRolElectivaQUIConsultaSolicitud;
  }
  
//ONCOLOGICO

getCodRolElectivaONVerLinkCrearCupos(): string{
  return this.codRolElectivaONVerLinkCrearCupos;
}

getCodRolElectivaONConfirmarOrden(): string{
  return this.codRolElectivaONConfirmarOrden;
}


getCodRolElectivaONCrearCupos(): string{
  return this.codRolElectivaONCrearCupos;
}




getCodRolElectivaONCrearSolicitud(): string{
  return this. codRolElectivaONCrearSolicitud;

}
getCodRolElectivaONModificarSolicitud(): string{
  return this.codRolElectivaONModificarSolicitud;
}


getCodRolElectivaONCancelarOrden(): string{
  return this.codRolElectivaONCancelarOrden;
}

getCodRolElectivaONVerSolicitud(): string{
  return this.codRolElectivaONVerSolicitud;
}

getCodRolElectivaONCancelarSolicitud(): string{
  return this.codRolElectivaONCancelarSolicitud;
}



getCodRolElectivaONVerLinkModificarOrden(): string{
  return this.codRolElectivaONVerLinkModificarOrden;
}

getCodRolElectivaONVerOrden(): string{
  return this.codRolElectivaONVerOrden;
}



getCodRolElectivaONVerLinkConsultaCalendario(): string{
  return this.codRolElectivaONVerLinkConsultaCalendario;
}

getCodRolElectivaONVerLinkReporteCupos(): string{
  return this.codRolElectivaONVerLinkReporteCupos;
}

getCodRolElectivaONConsultaSolicitud(): string{
  return this.codRolElectivaONConsultaSolicitud;
}


 
  getCodRolCitasVerLinkModificarSolicitud(): string{
    return this.codRolCitasVerLinkModificarSolicitud;
  }

  


  getCodRolCitasModificarSolicitudConsulta(): string{
    return this.codRolCitasModificarSolicitudConsulta;
  }




  getCodRolCitasVerLinkCalendario(): string{
    return this.codRolCitasVerLinkCalendario;
  }

  
 
  

  getCodRolCitasVerLinkConsultas(): string{
    return this.codRolCitasVerLinkConsultas;
  }


  getCodRolCitasVerLinkModificarOrdenes(): string{
    return this.codRolCitasVerLinkModificarOrdenes;
  }

 

  getCodRolCitasVerLinkReporteMedico(): string{
    return this.codRolCitasVerLinkReporteMedico;
  }



  getCodRolEstudiosEspeciales(): string{
    return this.codRolEstudiosEspeciales;
  }

  getCodRolCitasCrearOrden(): string{
    return this.codRolCitasCrearOrden;
  }

  getCodRolCitasCrearAdm(): string{
    return this.codRolCitasCrearOrdenAdm;
  }

  getCodRolCitasModificarOrden():string{
    return this.codRolCitasModificarOrden;
  }

  getCodRolCitasCancelarOrden(): string{
    return this.codRolCitasCancelarOrden;
  }

  getCodRolCitasConfirmarOrden(): string{
    return this.codRolCitasConfirmarOrden;
  }

  getCodRolCrearSolicitudConsulta(): string{
    return this.codRolCitasCrearSolicitudConsulta;
  }

  getCodRolCrearSolicitudEstudiosEsp(): string{
    return this.codRolCitasCrearSolicitudEstudiosEsp;
  }

  getCodRolCitasCrearCuposMedicos(): string{
    return this.codRolCitasCrearCuposMedicos;
  }

  getCodRolEstudiosEspecialesVerLinkCrearCupos(): string{
    return this.codRolEstudiosEspecialesVerLinkCrearCupos;
  } 

  getCodRolEstudiosEspecialesCrearCupos(): string{
    return this.codRolEstudiosEspecialesCrearCupos;
  } 

  getCodRolEstudiosEspecialesVerLinkCalendario(): string{
    return this.codRolEstudiosEspecialesVerLinkCalendario;
  } 

  getCodRolEstudiosEspecialesVerLinkReporteCupos(): string{
    return this.codRolEstudiosEspecialesVerLinkReporteCupos;
  }   
  
  getCodRolEstudiosEspecialesCrearSolicitud(): string{
    return this.codRolEstudiosEspecialesCrearSolicitud;
  } 

  getCodRolEstudiosEspecialesModificarSolicitud(): string{
    return this.codRolEstudiosEspecialesModificarSolicitud;
  } 

  getCodRolEstudiosEspecialesVerSolicitud(): string{
    return this.codRolEstudiosEspecialesVerSolicitud;
  } 

  getCodRolEstudiosEspecialesCancelarSolicitud(): string{
    return this.codRolEstudiosEspecialesCancelarSolicitud;
  } 

  getCodRolEstudiosEspecialesVerLinkConsultas(): string{
    return this.codRolEstudiosEspecialesVerLinkConsultas;
  } 

  getCodRolEstudiosEspecialesCrearOrden(): string{
    return this.codRolEstudiosEspecialesCrearOrden;
  } 

  getCodRolEstudiosEspecialesModificarOrden(): string{
    return this.codRolEstudiosEspecialesModificarOrden;
  } 

  getCodRolEstudiosEspecialesVerOrden(): string{
    return this.codRolEstudiosEspecialesVerOrden;
  } 

  getCodRolEstudiosEspecialesCancelarOrden(): string{
    return this.codRolEstudiosEspecialesCancelarOrden;
  } 

  getCodRolEstudiosEspecialesConfirmarOrden(): string{
    return this.codRolEstudiosEspecialesConfirmarOrden;
  } 

  getCodRolEstudiosEspecialesVerLinkModificarOrden(): string{
    return this.codRolEstudiosEspecialesVerLinkModificarOrden;
  } 

  getCodRolImagenVerLinkCrearCupos(): string{
    return this.codRolImagenVerLinkCrearCupos;
  } 

  getCodRolImagenCrearCupos(): string{
    return this.codRolImagenCrearCupos;
  } 

  getCodRolImagenVerLinkConsultaCalendario(): string{
    return this.codRolImagenVerLinkConsultaCalendario;
  } 

  getCodRolImagenVerLinkReporteCupos(): string{
    return this.codRolImagenVerLinkReporteCupos;
  } 

  getCodRolImagenCrearSolicitud(): string{
    return this.codRolImagenCrearSolicitud;
  } 

  getCodRolImagenModificarSolicitud(): string{
    return this.codRolImagenModificarSolicitud;
  } 

  getCodRolImagenVerSolicitud(): string{
    return this.codRolImagenVerSolicitud;
  } 

  getCodRolImagenCancelarSolicitud(): string{
    return this.codRolImagenCancelarSolicitud;
  } 


  getCodRolImagenConsultasSolicitudes(): string{
    return this.codRolImagenConsultasSolicitudes;
  } 

  getCodRolImagenCrearOrden(): string{
    return this.codRolImagenCrearOrden;
  } 

  getCodRolImagenModificarOrden(): string{
    return this.codRolImagenModificarOrden;
  } 

  getCodRolImagenVerOrden(): string{
    return this.codRolImagenVerOrden;
  } 

  getCodRolImagenCancelarOrden(): string{
    return this.codRolImagenCancelarOrden;
  } 

  getCodRolImagenConfirmarOrden(): string{
    return this.codRolImagenConfirmarOrden;
  } 

  getCodRolImagenVerLinkModificarOrden(): string{
    return this.codRolImagenVerLinkModificarOrden;
  } 

  getCodRolLaboratorioCrearCupos(): string{
    return this.codRolLaboratorioCrearCupos;
  } 

  getCodRolLaboratorioVerLinkConsultaCalendario(): string{
    return this.codRolLaboratorioVerLinkConsultaCalendario;
  } 

  getCodRolLaboratorioVerLinkReporteCupos(): string{
    return this.codRolLaboratorioVerLinkReporteCupos;
  } 

  getCodRolLaboratorioCrearSolicitud(): string{
    return this.codRolLaboratorioCrearSolicitud;
  } 

  getCodRolLaboratorioModificarSolicitud(): string{
    return this.codRolLaboratorioModificarSolicitud;
  } 

  getCodRolLaboratorioVerSolicitud(): string{
    return this.codRolLaboratorioVerSolicitud;
  } 
  
  getCodRolLaboratorioCancelarSolicitud(): string{
    return this.codRolLaboratorioCancelarSolicitud;
  } 

  getCodRolLaboratorioConsultaSolicitud(): string{
    return this.codRolLaboratorioConsultaSolicitud;
  } 

  getCodRolLaboratorioCrearOrden(): string{
    return this.codRolLaboratorioCrearOrden;
  } 

  getCodRolLaboratorioModificarOrden(): string{
    return this.codRolLaboratorioModificarOrden;
  } 

  getCodRolLaboratorioVerOrden(): string{
    return this.codRolLaboratorioVerOrden;
  } 

  getCodRolLaboratorioCancelarOrden(): string{
    return this.codRolLaboratorioCancelarOrden;
  } 

  getCodRolLaboratorioConfirmarOrden(): string{
    return this.codRolLaboratorioConfirmarOrden;
  } 

  getCodRolLaboratorioVerLinkCrearCupos(): string{
    return this.codRolLaboratorioVerLinkCrearCupos;
  } 

  getCodRolLaboratorioVerLinkModificarOrden(): string{
    return this.codRolLaboratorioVerLinkModificarOrden;
  } 


  getCodRolCitasCancelarSolicitudConsulta(): string{
    return this.codRolCitasCancelarSolicitudConsulta;
  } 








  
}
