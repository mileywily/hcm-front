import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import {
  GlobalService,
  DetalleRepSolicitudElecElecService,
  AuthService,
  TipoSolicitudService,
  EspecialidadService,
  CausaService,
  SolicitudService,
  SolicitudModificarService,
  RolesService,
  UserRolesService,
  MenuService,
  TipoAtencionService,
  EnteService,
  EstadoSolicitudService
  }
from 'src/app/services';
import {
  TipoAtencion,
  Especialidad,
  Medico,
  Respuesta,
  UserAtencion,
  RepSolicitud,
  Solicitud,
  RolModelo,
  Ente,
  EstadoSolicitud
 }
from 'src/app/models';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-solicitud-modificar-elect-qui',
  templateUrl: './solicitud-modificar-elect-qui.component.html',
  styleUrls: ['./solicitud-modificar-elect-qui.component.scss'],
  providers: [MessageService,ConfirmationService]
})
export class SolicitudModificarElectQuiComponent implements OnInit 
{

  displayDialog: boolean;
  displayDialogLote: boolean;
  tituloDialogo: string = '';
  es: any;
  nuevoRegistro: boolean;
  submitted: boolean;
  form: FormGroup;
  options: any;
  option: any;
  Solicitudes: RepSolicitud[];
  Solicitud: RepSolicitud = {"id":-1};

  selectedRegistros: Solicitud[];
  parametros:RepSolicitud={id:-1};
  parametrosCancelar:Solicitud={};
  request_id: any = null;
  orden_id: any = null;
  cols: any[];
  fecha_inicio: any = new Date();
  fecha_fin: any = new Date();
  fecha_cita: any = new Date();
  cedula: any = null;

  flag: boolean = true;
  flagorden: boolean = false;
  flagsolicitud: boolean = false;

  currentUser: any;
  formattedFechaSolicitud: any;

  usuario: any;

  tipoOrden: TipoAtencion;
  tipoOrdenes: TipoAtencion[];
  tiposSolicitud: TipoSolicitudService[];
  estadoSolicitudes: EstadoSolicitud[];
  estadoSolicitudSelected:any;
  usuarios: UserAtencion[];
  especialidadSelected:any;
  especialidades: Especialidad[];

  enteSelected:any;
  entes: Ente[];

  medico: Medico;
  medicos: Medico[];

  servicio: any;
  servicios: any[];

  orden: any = {};
  aux: Respuesta;

  causas: any[];
  causa: any;
  causa_solicitud_id: any;
  datos_solicitud: any;
  flagservice: boolean = false;

  filtro: any;

  roles: RolModelo[] = [];
  
    /* Codigo de los roles */
  codRolCitasModificarSolicitudConsulta: string;
  codRolCitasCancelarSolicitudConsulta: string;
  codRolEstudiosEspecialesModificarSolicitud: string;
  codRolEstudiosEspecialesCancelarSolicitud: string;

    /* Habilitar los items del menu según rol */
  activarBotonModificarSolicitudConsulta: boolean = false;
  activarBotonCancelarSolicitudConsulta: boolean = false;
  activarBotonModificarSolicitudEstudio: boolean = false;
  activarBotonCancelarSolicitudEstudio: boolean = false;

  title: any;
  tipoAtencion: any;
  loading: boolean;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private authService: AuthService,
    private config: GlobalService,
    private estadoSolicitudService: EstadoSolicitudService,
    private tipoSolicitudService:  TipoSolicitudService,
    private especialidadService : EspecialidadService,
    private detalleSolicitudService: DetalleRepSolicitudElecElecService,
    private causaService:  CausaService,
    private solicitudService: SolicitudService,
    private solicitudModificarService: SolicitudModificarService,
    private rolesService: RolesService,
    private srvRolesByUser: UserRolesService,
    private menuService:  MenuService,
    private tipoAtencionService: TipoAtencionService,
    private enteService : EnteService
  ) { 

    this.options = [
      { label: 'Solicitud', value: 'Id' },
      { label: 'Cédula', value: 'Ci' }

    ];

    this.cols = [
      { field: 'solicitud_id', header: 'Solicitud', width: '5%' },
      { field: 'fecha_solicitud', header: 'Fecha', width: '5%' },
      { field: 'tipo_solicitud_nombre', header: 'Tipo', width: '10%' },
      { field: 'estado_nombre', header: 'Estado', width: '5%' },
      { field: 'nombre_tipo_atencion', header: 'Requerimiento', width: '5%' },
      { field: 'especialidad_nombre', header: 'Especialidad', width: '10%' },
      { field: 'cedula_beneficiario', header: 'Cédula', width: '10%' },
      { field: 'nombre_beneficiario', header: 'Beneficiario', width: '10%' },
      { field: 'telefono', header: 'Télefono', width: '5%' },
      { field: 'telefono2', header: 'Télefono', width: '5%' },
      { field: 'observacion', header: 'Observación', width: '5%' },
      { field: 'usuario_creador', header: 'Usuario', width: '5%' },
      { field: 'nombre_creador', header: 'Nombre', width: '10%' },
      { field: 'ENTE_RESPONSABLE', header: 'Ente', width: '5%' }

      /*,
      { field: 'fecha_recepcion', header: 'Fecha Recepción', width: '5%' }*/

    
    ];



    this.title = 'Modificar Solicitud: '  + ' ' + "Procedimientos Electivas";
   
  }

  ngOnInit(): void 
  {


    this.filtro= this.solicitudModificarService.getParametros();

    let currentUser = this.authService.getCurrentUser();
    this.usuario  = JSON.parse(currentUser);

  //  this.codRolCitasModificarSolicitudConsulta   =  this.rolesService.getCodRolCitasModificarSolicitudConsulta();
    //this.codRolCitasCancelarSolicitudConsulta = this.rolesService.getCodRolCitasCancelarSolicitudConsulta();
    this.codRolEstudiosEspecialesModificarSolicitud   =  this.rolesService.getCodRolEstudiosEspecialesModificarSolicitud();
    this.codRolEstudiosEspecialesCancelarSolicitud = this.rolesService.getCodRolEstudiosEspecialesCancelarSolicitud();
    
  
    this.codRolCitasModificarSolicitudConsulta   =  this.rolesService.getCodRolElectivaQUIModificarSolicitud();
    this.codRolCitasCancelarSolicitudConsulta = this.rolesService.getCodRolElectivaQUICancelarSolicitud();
    this.codRolEstudiosEspecialesModificarSolicitud   =  this.rolesService.getCodRolEstudiosEspecialesModificarSolicitud();
    this.codRolEstudiosEspecialesCancelarSolicitud = this.rolesService.getCodRolEstudiosEspecialesCancelarSolicitud();
    

    this.activarBotonModificarSolicitudConsulta = this.srvRolesByUser.buscarRolPorCodigo(this.codRolCitasModificarSolicitudConsulta).length > 0 ? true : false;
    this.activarBotonCancelarSolicitudConsulta = this.srvRolesByUser.buscarRolPorCodigo(this.codRolCitasCancelarSolicitudConsulta).length > 0 ? true : false;
    this.activarBotonModificarSolicitudEstudio = this.srvRolesByUser.buscarRolPorCodigo(this.codRolEstudiosEspecialesModificarSolicitud).length > 0 ? true : false;
    this.activarBotonCancelarSolicitudEstudio = this.srvRolesByUser.buscarRolPorCodigo(this.codRolEstudiosEspecialesCancelarSolicitud).length > 0 ? true : false;
    

    this.es = this.config.es;
    this.fullDropdownEspecialidades();
    this.fullDropdownEntes();
    this.fullDropdownTipoOrden();
    this.fullDropdownEstado();
    this.fullDropdownUser();
    this.fullDropdownCausas();
    this.fecha_cita=null;
    this.flagservice=false;
    this.limpiar_parametros_back();
    if (this.filtro == null){
      this.option = this.options[0];
    }else{
      if (this.filtro.tipo_filtro=='Ci' ){
        this.option = this.options[1];
      }else{
        this.option = this.options[0];
      }
    }
    this.change();

    this.getFiltros();

  
  }



  private showError(errMsg: string)
  {
    this.messageService.clear();
    this.messageService.add({ key: 'tc', severity: 'error', summary: errMsg });
  }

  fullDropdownEstado() {
    this.estadoSolicitudService.getAllCombo()
      .toPromise()
      .then((results) => {
        this.estadoSolicitudes = results;
        console.log("estados",results);
      })
      .catch((err) => {
        console.log(err);
      });
  }


  

  fullDropdownCausas() {
    this.causaService
      .getAllCombo()
      .toPromise()
      .then((results) => {
        this.causas = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getFiltros(){
    if (this.filtro != null){


      if (this.filtro.solicitud_id  || this.filtro.solicitud_id != null || this.filtro.solicitud_id != undefined ){
        this.request_id = this.filtro.solicitud_id;

      }

      if (this.filtro.cedula_beneficiario != null || this.filtro.cedula_beneficiario != undefined )
      {
        this.cedula = this.filtro.cedula_beneficiario;
      }

      if(this.filtro.fecha_inicio || this.filtro.fecha_inicio != null || this.filtro.fecha_inicio !=undefined )
      {
          this.fecha_inicio = this.filtro.fecha_inicio;
      }

      if(this.filtro.fecha_fin || this.filtro.fecha_fin != null || this.filtro.fecha_fin !=undefined)
      {
        this.fecha_fin = this.filtro.fecha_fin;
      }

      if (this.filtro.especialidad_id  || this.filtro.especialidad_id != null || this.filtro.especialidad_id != undefined )
      {
        this.especialidadSelected = this.filtro.especialidad_id;
      }

      if (this.filtro.ente_id  || this.filtro.ente_id != null || this.filtro.ente_id != undefined )
      {
        this.enteSelected = this.filtro.ente_id;
      }

      if (this.filtro.tipo_solicitud_id || this.filtro.tipo_solicitud_id != null || this.filtro.tipo_solicitud_id != undefined )
      {
        this.orden.tipo_solicitud_id= this.filtro.tipo_solicitud_id;
      }

      if (this.filtro.usuario_creador || this.filtro.usuario_creador != null || this.filtro.usuario_creador != undefined )
      {
        this.orden.usuario_creador = this.filtro.usuario_creador;
      }

     
      this.consultar();
    }

  }


  private showSuccess(successMsg: string)
  {
    this.messageService.clear();
    this.messageService.add({
      key: 'tc',
      severity: 'success',
      summary: successMsg,
    });
  }

  fullDropdownUser() {
    this.detalleSolicitudService.getRequestsUser()
      .toPromise()
      .then((results) => {
        this.usuarios = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  fullDropdownEspecialidades() {
    this.especialidadService.getAllCombo()
      .toPromise()
      .then((results) => {
        this.especialidades = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }


  fullDropdownEntes() {
    this.enteService.getAllCombo()
      .toPromise()
      .then((results) => {
        this.entes = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  fullDropdownTipoSolicitudes() {
    this.tipoSolicitudService.getAllActivos()
      .toPromise()
      .then((results) => {
        this.tipoOrdenes = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }






  close() {
    this.displayDialog   = false;
    this.displayDialogLote   = false;
    this.submitted = false;
   }


    //Crear orden
    verSolicitud(rowData) {

   

      //En caso de que sean solicitudes de CITAS
      if (rowData.tipo_solicitud_id == 1 || (rowData.nombre_tipo_atencion  == "CONSULTA"  ) )
        {
          this.menuService.setTipoAtencion(2);
          this.router.navigate(["solicitud-beneficiario/-1/-1/solicitudes/" + rowData.beneficiario_id + "/"  + rowData.solicitud_id + "/solicitud-servicio", rowData.beneficiario_id,  rowData.solicitud_id]);
        }
      //En caso de que sean solicitudes de  ESTUDIOS ESPECIALES
      if (rowData.tipo_solicitud_id == 7 && (rowData.nombre_tipo_atencion  =="ESTUDIOS ESPECIALES"))
        {
          this.menuService.setTipoAtencion(5);
          this.router.navigate(["solicitud-beneficiario/-1/-1/solicitudes/" + rowData.beneficiario_id + "/"  + rowData.solicitud_id + "/solicitud-servicio-triaje", rowData.beneficiario_id,  rowData.solicitud_id]);
        }
  
  
      //En caso de que sean solicitudes de IMAGEN 
      if (rowData.tipo_solicitud_id == 7 && (rowData.nombre_tipo_atencion  == "IMAGEN"  ) ){
        this.menuService.setTipoAtencion(3);
        this.router.navigate(["solicitud-beneficiario/-1/-1/solicitudes/" + rowData.beneficiario_id + "/"  + rowData.solicitud_id + "/solicitud-servicio-triaje-img", rowData.beneficiario_id,  rowData.solicitud_id]);
      }
      
       //En caso de que sean solicitudes de  LABORATORIO
       if (rowData.tipo_solicitud_id == 7 && (rowData.nombre_tipo_atencion  =="LABORATORIO"))
        {
          this.menuService.setTipoAtencion(4);
           this.router.navigate(["solicitud-beneficiario/-1/-1/solicitudes/" + rowData.beneficiario_id + "/"  + rowData.solicitud_id + "/solicitud-servicio-triaje-lab", rowData.beneficiario_id,  rowData.solicitud_id]);
        }

        console.log("validacion",rowData);
       
  
        if (rowData.tipo_atencion_id == "10" && (rowData.nombre_tipo_atencion  =="MEDICAMENTOS AGUDOS"))
          {
            this.menuService.setTipoAtencion(10);
            this.router.navigate(["solicitud-beneficiario/-1/-1/solicitudes/" + rowData.beneficiario_id + "/"  + rowData.solicitud_id + "/solicitud-servicio-elec-med", rowData.beneficiario_id,  rowData.solicitud_id]);
          }

          if (rowData.tipo_atencion_id == "19" && (rowData.nombre_tipo_atencion  =="MEDICAMENTOS ONCOLOGICOS"))
            {
              this.menuService.setTipoAtencion(19);
              this.router.navigate(["solicitud-beneficiario/-1/-1/solicitudes/" + rowData.beneficiario_id + "/"  + rowData.solicitud_id + "/solicitud-servicio-elec-med", rowData.beneficiario_id,  rowData.solicitud_id]);
            }
        
            if (rowData.tipo_atencion_id == "9")
              {
                this.menuService.setTipoAtencion(9);
                this.router.navigate(["solicitud-beneficiario/-1/-1/solicitudes/" + rowData.beneficiario_id + "/"  + rowData.solicitud_id + "/solicitud-servicio-electiva-quir", rowData.beneficiario_id,  rowData.solicitud_id]);
              }

              if (rowData.tipo_atencion_id == "11")
                {
                  this.menuService.setTipoAtencion(11);
                  this.router.navigate(["solicitud-beneficiario/-1/-1/solicitudes/" + rowData.beneficiario_id + "/"  + rowData.solicitud_id + "/solicitud-servicio-electiva-quir", rowData.beneficiario_id,  rowData.solicitud_id]);
                }

                
              if (rowData.tipo_atencion_id == "12")
                {
                  this.menuService.setTipoAtencion(12);
                  this.router.navigate(["solicitud-beneficiario/-1/-1/solicitudes/" + rowData.beneficiario_id + "/"  + rowData.solicitud_id + "/solicitud-servicio-electiva-quir", rowData.beneficiario_id,  rowData.solicitud_id]);
                }

                if (rowData.tipo_atencion_id == "20")
                  {
                    this.menuService.setTipoAtencion(20);
                    this.router.navigate(["solicitud-beneficiario/-1/-1/solicitudes/" + rowData.beneficiario_id + "/"  + rowData.solicitud_id + "/solicitud-servicio-electiva-quir", rowData.beneficiario_id,  rowData.solicitud_id]);
                  }

                  if (rowData.tipo_atencion_id == "8")
                    {
                      this.menuService.setTipoAtencion(8);
                      this.router.navigate(["solicitud-beneficiario/-1/-1/solicitudes/" + rowData.beneficiario_id + "/"  + rowData.solicitud_id + "/solicitud-servicio-electiva-quir", rowData.beneficiario_id,  rowData.solicitud_id]);
                    }

                    
                  if (rowData.tipo_atencion_id == "7")
                    {
                      this.menuService.setTipoAtencion(7);
                      this.router.navigate(["solicitud-beneficiario/-1/-1/solicitudes/" + rowData.beneficiario_id + "/"  + rowData.solicitud_id + "/solicitud-servicio-electiva-quir", rowData.beneficiario_id,  rowData.solicitud_id]);
                    }

                    
                    
                  if (rowData.tipo_atencion_id == "6")
                    {
                      this.menuService.setTipoAtencion(6);
                      this.router.navigate(["solicitud-beneficiario/-1/-1/solicitudes/" + rowData.beneficiario_id + "/"  + rowData.solicitud_id + "/solicitud-servicio-electiva-quir", rowData.beneficiario_id,  rowData.solicitud_id]);
                    }





  
        /*if ((rowData.nombre_tipo_atencion.startsWith('MEDICAMENTOS') ==true ))
        {
          console.log("cambie");
          this.router.navigate(["solicitud-beneficiario/-1/-1/solicitudes/" + rowData.beneficiario_id + "/"  + rowData.solicitud_id + "/solicitud-servicio-elec-med", rowData.beneficiario_id,  rowData.solicitud_id]);

        }
        else
        {
  
            //En caso de que sean solicitudes de  QUIRURGICO
            if ( ((rowData.nombre_tipo_atencion.indexOf("MEDICAMENTOS") === -1)))
            {
              console.log("nada")
                this.router.navigate(["solicitud-beneficiario/-1/-1/solicitudes/" + rowData.beneficiario_id + "/"  + rowData.solicitud_id + "/solicitud-servicio-electiva-quir", rowData.beneficiario_id,  rowData.solicitud_id]);
            }
    */
      //  }
  
     
  
   
      
  
      //this.router.navigate(['solicitud-servicio', rowData.beneficiario_id,  rowData.solicitud_id], { relativeTo: this.activatedRoute });
      //this.router.navigate(["solicitudes", rowData.beneficiario_id,  rowData.solicitud_id]);
    }
  

  navigate(route, value1) {
      //En este caso, la ruta detalle recibe un parámetro, por ello el valor de value
      //En caso de no recibir parámetro, omitir el value en el arreglo
      this.router.navigate([route, value1], { relativeTo: this.activatedRoute });
  }

  dialogoCausa(datos: any) {

    this.datos_solicitud = 
    {
      solicitud_id: datos.solicitud_id,
      causa_solicitud_id: 2,
      usuario_modificador: this.usuario.siglado,
      nombre_modificador: this.usuario.nombre

    }

    this.tituloDialogo = "Causa";
    this.displayDialog = true;
}

cancelarSolicitud() {

  this.datos_solicitud.causa_solicitud_id = this.causa_solicitud_id;
  this.solicitudService.cancelarSolicitud(this.datos_solicitud)
  .toPromise()
  .then(results => {
    if (results){
      this.showSuccess('Registro Cancelado Exitosamente');
      this.consultar();
    }
  })
  .catch(err => {
    console.log(err) ;
  });

  this.causa_solicitud_id = null;
  this.close();

}

fullDropdownTipoOrden() {
  this.tipoAtencionService.getAllByTipoSolicitud(this.menuService.getTipoSolicitud())
    .toPromise()
    .then((results) => {

      let aux=[];
      aux=results;
      //this.tipoOrdenes = aux.filter(x => x.tipo_atencion_id == this.menuService.getTipoAtencion());
      this.tipoOrdenes = aux.filter(x => (x.nombre != "MEDICAMENTOS") && (x.nombre != "ONCOLOGICOS"));
     // this.tipoOrdenes = results;

    })
    .catch((err) => {
      this.showError(err); //console.log(err);
    });

    
}


dialogoCausaLote() {

  this.tituloDialogo = "Causa";
  this.displayDialogLote = true;
}



deleteSelectedItems() {

         for (let i = 0; i < this.selectedRegistros.length; i++)
         {

           this.parametrosCancelar.solicitud_id =this.selectedRegistros[i].solicitud_id;
           this.parametrosCancelar.usuario_modificador = this.usuario.siglado;
           this.parametrosCancelar.nombre_modificador = this.usuario.nombre;
           this.parametrosCancelar.causa_solicitud_id = this.causa_solicitud_id;
           this.solicitudService.enviarSolicitud(this.parametrosCancelar)
           .toPromise()
           .then(results => {
                this.consultar();
           }).catch(err => {
            console.log(err);
            this.displayDialogLote = false;
          })
        }

        this.selectedRegistros = null;
        this.displayDialogLote = false;
        this.showSuccess('Registros Cancelados Exitosamente');
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Registros Cancelados', life: 3000});
  }

  enviar_siam() {

    for (let i = 0; i < this.selectedRegistros.length; i++)
    {

      this.parametrosCancelar.solicitud_id =this.selectedRegistros[i].solicitud_id;
      this.parametrosCancelar.usuario_modificador = this.usuario.siglado;
      this.parametrosCancelar.nombre_modificador = this.usuario.nombre;
      this.solicitudService.enviarSolicitud(this.parametrosCancelar)
      .toPromise()
      .then(results => {
           this.consultar();
      }).catch(err => {
       console.log(err);
       this.displayDialogLote = false;
     })
   }

   this.selectedRegistros = null;
   this.displayDialogLote = false;
   this.showSuccess('Registros Enviados Exitosamente');
   this.messageService.add({severity:'success', summary: 'Successful', detail: 'Registros Enviados', life: 3000});


  }



  limpiar_variables_combos()
  {
    this.orden.tipo_atencion_id=null;
    this.especialidadSelected=null;
    this.estadoSolicitudSelected=null;
    this.enteSelected=null;
    this.orden.medico_id=null;
    this.orden.servicio_id=null;
    this.orden.turno_id=null;
    this.orden.tipo_solicitud_id=null;
    this.orden.usuario_creador=null;
    this.fecha_inicio=null;
    this.fecha_fin=null;
    this.fecha_cita=null;
    this.cedula=null;
    this.request_id = null;
    this.orden_id = null;
    this.Solicitudes = [];
  }

  limpiar_parametros_back()
  {
    delete this.parametros.fecha_fin;
    delete this.parametros.fecha_inicio;
    delete this.parametros.cedula_beneficiario;
    delete this.parametros.especialidad_id;
    delete this.parametros.tipo_solicitud_id;
    delete this.parametros.solicitud_id;
    delete this.parametros.usuario_creador;
    delete this.parametros.tipo_atencion_id;
    delete this.parametros.ente_id;
    delete this.parametros.estado_solicitud_id;

    this.Solicitudes  = [];
  }

 setear_parametros()
 {

      let format = 'yyyy-MM-dd';
          let desde = this.fecha_inicio;
          let hasta = this.fecha_fin;
          const locale = 'en-ES';

         if(!this.fecha_inicio || this.fecha_inicio == null || this.fecha_inicio ==undefined ||
            !this.fecha_fin || this.fecha_fin == null || this.fecha_fin ==undefined)
            {
                  this.loading=false;
                  return;
            }

           if (formatDate( this.fecha_inicio, format, locale) > formatDate( this.fecha_fin, format, locale))
           {
               this.showError("La fecha desde de la consulta debe ser mayor o igual a la fecha hasta");
               this.Solicitudes  = [];
               this.loading=false;
           }
           else
           {
            if(! this.cedula ||  this.cedula != null ||  this.cedula !=undefined )
            {
              this.parametros.cedula_beneficiario= this.cedula;
            }

            this.parametros.fecha_inicio=formatDate(this.fecha_inicio, format, locale);
            this.parametros.fecha_fin=formatDate(this.fecha_fin, format, locale);

            if ( this.especialidadSelected !=undefined)
            {
              this.parametros.especialidad_id=this.especialidadSelected;
            }

            if ( this.enteSelected !=undefined)
            {
              this.parametros.ente_id=this.enteSelected;
            }

            if ( this.estadoSolicitudSelected !=undefined)
            {
              this.parametros.estado_solicitud_id=this.estadoSolicitudSelected;
            }
            else
            {
              this.parametros.estado_solicitud_id=1;
            }


            if (  this.orden.tipo_solicitud_id !=undefined)
            {
              this.parametros.tipo_solicitud_id = this.orden.tipo_solicitud_id;
            }

            if (  this.orden.usuario_creador !=undefined)
            {
              this.parametros.usuario_creador = this.orden.usuario_creador;
            }

            this.parametros.tipo_atencion_id=this.tipoAtencion;


           }

 }

setFiltros(){

  this.filtro = this.parametros;
  this.filtro.tipo_filtro = this.option.value;
  this.filtro.fecha_inicio = this.fecha_inicio;
  this.filtro.fecha_fin = this.fecha_fin;

  this.filtro.flag = this.flag;
  this.filtro.flagsolicitud  =  this.flagsolicitud;

  //console.log('OPCION setFiltros: ' , this.option.value);

  this.solicitudModificarService.setParametros(this.filtro);
 }


  consultar()
  {
      this.loading=true;
      this.limpiar_parametros_back();
      this.parametros.tipo_atencion_id=this.tipoAtencion;
      if (this.option.value == 'Ci')
      {
         this.setear_parametros();
      }
      else
      {

          if (this.option.value == 'Id')
          {
            this.parametros.solicitud_id= this.request_id;
          }


      }

      //console.log('OPCION consultar: ' , this.option.value);

      this.setFiltros();

      let format = 'yyyy-MM-dd';
      const locale = 'en-ES';
      let date: Date = new Date();
     // this.detalleSolicitudService.getRequestsReportSolicitudByParametros_modificar(this.parametros)
     // console.log("parametros",this.parametros);
     this.detalleSolicitudService.getReportSolicitudByAtencionParametros_modificar(this.parametros)
      .toPromise()
      .then(results =>
        {
          let aux_prov=[];
          aux_prov=  results; 
         // console.log("resul",results) ;
          this.Solicitudes = aux_prov.filter(x => (x.nombre_tipo_atencion != "MEDICAMENTOS") && (x.nombre_tipo_atencion != "ONCOLOGICOS"));
            let total: number = 0;
            this.Solicitudes.forEach(element =>
              {
                  total += 1;
              });

              this.loading=false;
              return total;
        }).catch((err) =>
        {
           console.log(err);
           this.showError('Ha ocurrido un error');
           this.loading=false;
        });
}

  change()
  {
    this.limpiar_parametros_back();
    this.limpiar_variables_combos();

    //console.log('OPCION: ' , this.option.value);

    if (this.option.value == 'Ci')
    {
      this.flag = false;
      this.flagorden=true;
      this.flagsolicitud=true;
      this.request_id = null;
      this.orden_id = null;
     }
     else {

      if (this.option.value == 'Id')
      {
          this.flag = true;
          this.flagorden=true;
          this.flagsolicitud=false;

      }
      else
      {
        this.flag = true;
        this.flagorden=false;
        this.flagsolicitud=true;
        this.request_id = null;

      }
    }
  }
}
