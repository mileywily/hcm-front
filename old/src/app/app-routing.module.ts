import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  DashboardComponent,
  ServiciosSolComponent,
  CatalogosComponent,
  ReportesComponent,
  LoginComponent,
  EstadoAtencionComponent,
  EstadoSolicitudComponent,
  TipoAtencionComponent,
  TipoSolicitudComponent,
  TipoProveedorComponent,
  TipoDiagnosticoComponent,
  ServicioComponent,
  EspecialidadComponent,
  GrupoDiagnosticoComponent,
  MedicoComponent,
  MedicoEspecialidadComponent,
  ConsultarBeneficiarioComponent,
  SitioComponent,
  DiagnosticoComponent,
  CausaComponent,
  SolicitudBeneficiarioComponent,
  SolicitudServicioComponent,
  OrdenServicioComponent,
  CalendarioComponent,
  RegistrarCuposComponent,
  SolicitudListarComponent,
  SolicitudListarTitularComponent,
  SolicitudesComponent,
  ReporteOrdenComponent,
  ReporteOrdenLabComponent,
  ReporteOrdenImgComponent,
  ServicioEspecialidadComponent,
  PrioridadComponent,
  SolicitudModificarComponent,
  ReporteMedicoComponent,
  OrdenModificarComponent,
  ServicioTipoAtencionComponent,
  ServiciosSolicitudAbiertasComponent,
  ServiciosSolicitudAbiertasLabComponent,
  ServiciosSolicitudAbiertasImgComponent,
  ServiciosSolicitudAbiertasQuiComponent,
  ServiciosSolicitudAbiertasOnComponent,
  ServiciosSolicitudElectivasComponent,
  MenuPrincipalComponent,
  RecaudoComponent,
  GrupoComponent,
  ExamenComponent,
  ProveedorComponent,
  RegistrarCuposTriajeComponent,
  ModificarCuposComponent,
  CalendarioTriajeComponent,
  ReporteCuposComponent,
  OrdenServicioTriajeComponent,
  SolicitudServicioTriajeComponent,
  SolicitudModificarTriajeComponent,
  OrdenModificarTriajeComponent,
  OrdenModificarTriajeLabComponent,
  SolicitudModificarTriajeLabComponent,
  ReporteCuposLabComponent,
  PlantillaReporteComponent,
  ReporteCuposTriajeComponent,
  GrupoServicioComponent,
  GrupoExamenComponent,
  RegistrarCuposLabComponent,
  SolicitudServicioTriajeImgComponent,
  SolicitudServicioTriajeLabComponent,
  OrdenServicioTriajeImgComponent,
  OrdenServicioTriajeLabComponent,
  CalendarioTriajeImgComponent,
  CalendarioTriajeLabComponent,
  DomicilioComponent,
  TasaComponent,
  ServicioMedicoComponent,
  ServicioProveedorComponent,
  SolicitudServicioElecOncComponent,
  SolicitudServicioElectivaQuirComponent,
  SolicitudServicioElecMedComponent,
  OrdenModificarElecOncComponent,
  OrdenModificarElecQuirComponent,
  SolicitudModificarElectOncComponent,
  SolicitudModificarElectQuiComponent,
  OrdenServicioElecOncComponent,
  OrdenServicioElecQuirComponent,
  CalendarioElectivaOncComponent,
  CalendarioElectivaQuirComponent,
  ReporteCuposElecOncologicoComponent,
  ReporteCuposElecQuirurgicoComponent,
  EnteComponent,
  AuditoriasSolicitudComponent
  
} from './paginas/index';



import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'menu-principal',
      component: MenuPrincipalComponent,
    },
    {
    path: '',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    children: [
      {
        path: 'catalogos',
        component: CatalogosComponent,
        children: [
          {
            path: 'estado-atencion',
            component:EstadoAtencionComponent,
          },
          {
            path: 'causa',
            component: CausaComponent,
          },
          {
            path: 'tipo-atencion',
            component: TipoAtencionComponent,
          },
         {
            path: 'estado-solicitud',
            component: EstadoSolicitudComponent,
          },
          {
            path: 'tipo-solicitud',
            component: TipoSolicitudComponent,
          },
          {
            path: 'tipo-proveedor',
            component: TipoProveedorComponent,
          },
          {
            path: 'tipo-diagnostico',
            component: TipoDiagnosticoComponent,
          },
          {
            path: 'grupo-diagnostico',
            component: GrupoDiagnosticoComponent,
          },
          {
            path: 'diagnostico',
            component: DiagnosticoComponent,
          },
          {
            path: 'domicilio',
            component: DomicilioComponent,
          }
          ,

          {
            path: 'sitio',
            component: SitioComponent,
          },
          {
            path: 'servicio',
            component: ServicioComponent,
          }
          ,
          {
            path: 'servicio-tipo-atencion',
            component: ServicioTipoAtencionComponent,
          },
          {
            path: 'servicio-proveedor',
            component:ServicioProveedorComponent,
          }
          ,
          {
            path: 'servicio-medico',
            component: ServicioMedicoComponent,
          }         
          ,

          {
            path: 'especialidad',
            component: EspecialidadComponent,
          },
          {
            path: 'medico',
            component: MedicoComponent,
          },
          {
            path: 'medico-especialidad',
            component: MedicoEspecialidadComponent,
          },
          {
            path: 'servicio-especialidad',
            component: ServicioEspecialidadComponent,
          },
          {
            path: 'prioridad',
            component: PrioridadComponent,
          }
          ,
          {
            path: 'recaudo',
            component: RecaudoComponent,
          },

          {
            path: 'examen',
            component: ExamenComponent,
          },

          {
            path: 'grupo',
            component: GrupoComponent,
          },

          {
            path: 'proveedor',
            component: ProveedorComponent,
          },

          {
            path: 'grupo-servicio',
            component: GrupoServicioComponent,
          },

          {
            path: 'grupo-examen',
            component: GrupoExamenComponent,
          },

          {
            path: 'tasa',
            component: TasaComponent,
          },

          {
            path: 'ente',
            component: EnteComponent,
          }

        ]
      },
      {
        path: 'registrar-cupos',
        component: RegistrarCuposComponent
      },
      {
        path: 'modificar-cupos',
        component: ModificarCuposComponent
      }
      ,
      {
        path: 'registrar-cupos-triaje',
        component: RegistrarCuposTriajeComponent
      },
      {
        path: 'registrar-cupos-lab',
        component: RegistrarCuposLabComponent
      }
      ,
      {
        path: 'consultar-beneficiario',
        component: ConsultarBeneficiarioComponent,
      },
      {
        path: 'orden-servicio/:solicitud_id',
        component: OrdenServicioComponent,
      },

      {
        path: 'solicitud-listar/:beneficiario_id',
        component: SolicitudListarComponent,
      },

      {
        path: 'solicitud-listar-titular/:beneficiario_id',
        component: SolicitudListarTitularComponent,
      },

      {
        path: 'solicitud-beneficiario/:param1/:param2',
          children: [
          {
              path: '',
              component: SolicitudBeneficiarioComponent,
          },

          //CITAS MEDICAS
          {
            path: 'solicitudes/:beneficiario_id/:solicitud_id',
            component: SolicitudesComponent,
            children: [

              {
                path: 'solicitud-servicio/:beneficiario_id/:solicitud_id',

                children: [

                  {
                      path: '',
                      component: SolicitudServicioComponent,
                  },
                  {
                    path: 'orden-servicio/:solicitud_id/:tipo/:especialidad_id',
                    children:[
                      {
                        path: '',
                        component: OrdenServicioComponent
                      },
                      {
                        path: 'calendario/:action',
                        component: CalendarioComponent
                      },
                    ]
                  }

                ]
              },

              //TRIAJE ESTUDIOS ESPECIALES 
              {
                path: 'solicitud-servicio-triaje/:beneficiario_id/:solicitud_id',

                children: [

                  {
                      path: '',
                      component: SolicitudServicioTriajeComponent,
                  },
                  {
                    path: 'orden-servicio-triaje/:solicitud_id/:tipo/:especialidad_id',
                    children:[
                      {
                        path: '',
                        component: OrdenServicioTriajeComponent
                      },
                      {
                        path: 'calendario-triaje/:action',
                        component: CalendarioTriajeComponent
                      },
                    ]
                  }

                ]
              },
              {
                path: 'solicitud-servicio-elec-onc/:beneficiario_id/:solicitud_id',
                children: 
                [
                  {
                    path: '',
                    component: SolicitudServicioElecOncComponent,
                  },
                  {
                    path: 'orden-servicio-elec-onc/:solicitud_id/:tipo/:especialidad_id',
                    children:[
                      {
                        path: '',
                        component: OrdenServicioElecOncComponent
                      },
                      {
                        path: 'calendario-electiva-onc/:action',
                        component: CalendarioElectivaOncComponent
                      },
                    ]
                  }
                ]

              }
              ,
              {
                path: 'solicitud-servicio-electiva-quir/:beneficiario_id/:solicitud_id',
                children: 
                [
                  {
                    path: '',
                    component: SolicitudServicioElectivaQuirComponent,
                  }
                ]

              },
              {
                path: 'solicitud-servicio-elec-med/:beneficiario_id/:solicitud_id',
                children: 
                [
                  {
                    path: '',
                    component: SolicitudServicioElecMedComponent,
                  }
                ]

              }
              ,
              {
                path: 'solicitud-servicio-triaje-img/:beneficiario_id/:solicitud_id',

                children: [

                  {
                      path: '',
                      component: SolicitudServicioTriajeImgComponent,
                  },
                  {
                    path: 'orden-servicio-triaje-img/:solicitud_id/:tipo/:especialidad_id',
                    children:[
                      {
                        path: '',
                        component: OrdenServicioTriajeImgComponent
                      },
                      {
                        path: 'calendario-triaje-img/:action',
                        component: CalendarioTriajeImgComponent
                      },
                    ]
                  }

                ]
              }
              ,
               //TRIAJE LAB
               {
                path: 'solicitud-servicio-triaje-lab/:beneficiario_id/:solicitud_id',

                children: [

                  {
                      path: '',
                      component: SolicitudServicioTriajeLabComponent,
                  },
                  {
                    path: 'orden-servicio-triaje-lab/:solicitud_id/:tipo/:especialidad_id',
                    children:[
                      {
                        path: '',
                        component: OrdenServicioTriajeLabComponent
                      },
                      {
                        path: 'calendario-triaje-lab/:action',
                        component: CalendarioTriajeLabComponent
                      },
                    ]
                  }

                ]
              }
              ,

              {
                path: 'solicitud-listar/:beneficiario_id',
                component: SolicitudListarComponent,
              },
              {
                path: 'solicitud-listar-titular/:beneficiario_id',
                component: SolicitudListarTitularComponent,
              }
            ]
          },


        ]
      },
      {
        path: 'orden-modificar',
        component: OrdenModificarComponent
      },
      {
        path: 'solicitud-modificar',
        component: SolicitudModificarComponent
      }
      ,
      {
        path: 'orden-modificar-triaje',
        component: OrdenModificarTriajeComponent
      },
      {
        path: 'orden-modificar-triaje-lab',
        component: OrdenModificarTriajeLabComponent
      } ,
      {
        path: 'orden-modificar-elec-onc',
        component: OrdenModificarElecOncComponent
      } ,
      {
        path: 'orden-modificar-elec-quir',
        component: OrdenModificarElecQuirComponent
      }
      ,
      {
        path: 'solicitud-modificar-triaje',
        component: SolicitudModificarTriajeComponent
      },
      {
        path: 'solicitud-modificar-triaje-lab',
        component: SolicitudModificarTriajeLabComponent
      },
      {
        path: 'solicitud-modificar-elect-onc',
        component: SolicitudModificarElectOncComponent
      },
      {
        path: 'solicitud-modificar-elect-quir',
        component: SolicitudModificarElectQuiComponent
      }
      ,
      {
        path: 'reporte-medico',
        component: ReporteMedicoComponent
      } 
      ,
      {
        path: 'reporte-cupos-triaje',
        component: ReporteCuposTriajeComponent
      }   
      ,
      {
        path: 'reporte-cupos-lab',
        component: ReporteCuposLabComponent
      },
      {
        path: 'reporte-cupos-elec-oncologico',
        component: ReporteCuposElecOncologicoComponent
      } 
      ,
      {
        path: 'reporte-cupos-elec-quirurgico',
        component: ReporteCuposElecQuirurgicoComponent
      } 
      ,
      {
        path: 'reporte-cupos',
        component: ReporteCuposComponent
      } 
      ,
      {
        path: 'calendario/:action',
        component: CalendarioComponent
      },

      {
        path: 'calendario-triaje/:action',
        component: CalendarioTriajeComponent
      },
      {
        path: 'calendario-triaje-lab/:action',
        component: CalendarioTriajeLabComponent
      },
      {
        path: 'calendario-triaje-img/:action',
        component: CalendarioTriajeImgComponent
      }
      ,
      {
        path: 'servicios-solicitud',
        component: ServiciosSolComponent,
      },
      {
        path: 'servicios-solicitud-electivas',
        component: ServiciosSolicitudElectivasComponent,
      },
      {
        path: 'servicios-solicitud-abiertas',
        component: ServiciosSolicitudAbiertasComponent,
      },
      {
        path: 'servicios-solicitud-abiertas-lab',
        component: ServiciosSolicitudAbiertasLabComponent,
      },
        {
 
          path: 'servicios-solicitud-abiertas-img',
          component: ServiciosSolicitudAbiertasImgComponent,
        }
        ,
        {
          path: 'servicios-solicitud-abiertas-qui',
          component: ServiciosSolicitudAbiertasQuiComponent,
        },
          {
   
            path: 'servicios-solicitud-abiertas-on',
            component: ServiciosSolicitudAbiertasOnComponent,
          }

      ,
      {
        path: 'servicios-orden',
        component: ReporteOrdenComponent,
      },
      {
        path : 'auditorias-solicitud',
        component : AuditoriasSolicitudComponent
      }
      ,
      {
        path: 'reporte-orden-lab',
        component:ReporteOrdenLabComponent,
      },
      {
        path: 'reporte-orden-img',
        component:ReporteOrdenImgComponent,
      }
      ,
      {
        path: 'reporte',
        component: ReportesComponent,

      },
      {
        path: 'plantilla-reporte',
        component: PlantillaReporteComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppRoutingModule { }
