import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DatePipe} from '@angular/common';

import {DropdownModule} from 'primeng/dropdown';
import {CalendarModule} from 'primeng/calendar';
import {ButtonModule} from 'primeng/button';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {TableModule} from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {PanelModule} from 'primeng/panel';
import {KeyFilterModule} from 'primeng/keyfilter';
import {ToastModule} from 'primeng/toast'
import {PaginatorModule} from 'primeng/paginator';
import {TabMenuModule} from 'primeng/tabmenu';
import {TreeModule} from 'primeng/tree';
import {SplitButtonModule} from 'primeng/splitbutton';
import {CheckboxModule} from 'primeng/checkbox';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ListboxModule} from 'primeng/listbox';
import {CardModule} from 'primeng/card';
import {DialogModule} from 'primeng/dialog';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ToolbarModule} from 'primeng/toolbar';
import {MultiSelectModule } from 'primeng/multiselect';
import {FileUploadModule} from 'primeng/fileupload';
import {MenubarModule} from 'primeng/menubar';
import {BlockUIModule} from 'primeng/blockui';
import {DataViewModule} from 'primeng/dataview';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {TooltipModule} from 'primeng/tooltip';
import {InputSwitchModule} from 'primeng/inputswitch';
import {TabViewModule} from 'primeng/tabview';
import {InputNumberModule} from 'primeng/inputnumber';
import {RadioButtonModule} from 'primeng/radiobutton';
import {SelectButtonModule} from 'primeng/selectbutton';
import {InputMaskModule} from 'primeng/inputmask';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

import {FullCalendarModule} from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import {GalleriaModule} from 'primeng/galleria';
import {PanelMenuModule} from 'primeng/panelmenu';

import { UppercaseDirective} from './directives/uppercase.directive';



FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);

// Components
import {
  FooterComponent,
  NavbarComponent,
  SidebarComponent,
  TitleComponent,
  ToastComponent,
  ConfirmDialogComponent,
  BasicTableComponent,
  BlockUiComponent,
  UploadFilesComponent,
  AyudaComponent,
  DialogComponent,

  MenuComponent,
  PanelmenuComponent

} from './components/index';

import {
  DashboardComponent,
  CatalogosComponent,
  ReportesComponent,
  LoginComponent,
  ServicioEspecialidadComponent,
  EstadoAtencionComponent,
  EstadoSolicitudComponent,
  TipoAtencionComponent,
  TipoSolicitudComponent,
  TipoProveedorComponent,
  TipoDiagnosticoComponent,
  ServicioComponent,
  ServiciosSolComponent,
  EspecialidadComponent,
  GrupoDiagnosticoComponent,
  MedicoComponent,
  MedicoEspecialidadComponent,
  ConsultarBeneficiarioComponent,
  SitioComponent,
  ProveedorComponent,
  DiagnosticoComponent,
  CausaComponent,
  SolicitudesComponent,
  OrdenServicioComponent,
  SolicitudServicioComponent,
  SolicitudBeneficiarioComponent,
  CalendarioComponent,
  VerCupoComponent,
  RegistrarCuposComponent,
  SolicitudListarComponent,
  SolicitudListarTitularComponent,
  ReporteOrdenComponent,
  PrioridadComponent,
  SolicitudModificarComponent,
  ReporteMedicoComponent,
  OrdenModificarComponent,
  ServicioTipoAtencionComponent,
  ServiciosSolicitudAbiertasComponent,

  MenuPrincipalComponent,
  RecaudoComponent,
  GrupoComponent,
  ExamenComponent,  
  RegistrarCuposTriajeComponent,
  CalendarioTriajeComponent,
  VerCupoTriajeComponent,
  ReporteCuposComponent,
  OrdenServicioTriajeComponent,
  SolicitudServicioTriajeComponent,
  SolicitudModificarTriajeComponent,
  OrdenModificarTriajeComponent,
  SolicitudModificarTriajeLabComponent,
  ReporteCuposLabComponent,
  ReporteCuposTriajeComponent,
  GrupoServicioComponent,
  GrupoExamenComponent,
  PlantillaReporteComponent,
  PlantillaCabeceraComponent,
  OrdenModificarTriajeLabComponent,
  ServiciosSolicitudAbiertasLabComponent,
  ServiciosSolicitudAbiertasImgComponent,
  ReporteOrdenLabComponent,
  ReporteOrdenImgComponent,
  ModificarCuposComponent,
  RegistrarCuposLabComponent,
  SolicitudServicioTriajeImgComponent,
  SolicitudServicioTriajeLabComponent,
  OrdenServicioTriajeLabComponent,
  OrdenServicioTriajeImgComponent,
  CalendarioTriajeImgComponent,
  CalendarioTriajeLabComponent,
} from './paginas/index';
import { ListaSolicitudesComponent } from './paginas/lista-solicitudes/lista-solicitudes.component';
import { BasicTableAgrupadoComponent } from './components/basic-table-agrupado/basic-table-agrupado.component';
import { DomicilioComponent } from './paginas/admin/catalogos/domicilio/domicilio.component';
import { SolicitudServicioElectivaQuirComponent } from './paginas/solicitudes/solicitud-servicio-electiva-quir/solicitud-servicio-electiva-quir.component';
import { TasaComponent } from './paginas/admin/catalogos/tasa/tasa.component';
import { ServicioMedicoComponent } from './paginas/admin/catalogos/servicio-medico/servicio-medico.component';
import { ServicioProveedorComponent } from './paginas/admin/catalogos/servicio-proveedor/servicio-proveedor.component';
import { SolicitudServicioElecOncComponent } from './paginas/solicitudes/solicitud-servicio-elec-onc/solicitud-servicio-elec-onc.component';
import { ReporteCuposElecQuirurgicoComponent } from './paginas/reportes/informes-solicitud/reporte-cupos-elec-quirurgico/reporte-cupos-elec-quirurgico.component';
import { ReporteCuposElecOncologicoComponent } from './paginas/reportes/informes-solicitud/reporte-cupos-elec-oncologico/reporte-cupos-elec-oncologico.component';
import { SolicitudModificarElectQuiComponent } from './paginas/solicitudes/solicitud-modificar-elect-qui/solicitud-modificar-elect-qui.component';
import { SolicitudModificarElectOncComponent } from './paginas/solicitudes/solicitud-modificar-elect-onc/solicitud-modificar-elect-onc.component';
import { CalendarioElectivaQuirComponent } from './paginas/calendario-electiva-quir/calendario-electiva-quir.component';
import { CalendarioElectivaOncComponent } from './paginas/calendario-electiva-onc/calendario-electiva-onc.component';
import { OrdenModificarElecQuirComponent } from './paginas/ordenes/orden-modificar-elec-quir/orden-modificar-elec-quir.component';
import { OrdenModificarElecOncComponent } from './paginas/ordenes/orden-modificar-elec-onc/orden-modificar-elec-onc.component';
import { OrdenServicioElecQuirComponent } from './paginas/solicitudes/orden-servicio-elec-quir/orden-servicio-elec-quir.component';
import { OrdenServicioElecOncComponent } from './paginas/solicitudes/orden-servicio-elec-onc/orden-servicio-elec-onc.component';
import { ServiciosSolicitudAbiertasQuiComponent } from './paginas/reportes/informes-solicitud/servicios-solicitud-abiertas-qui/servicios-solicitud-abiertas-qui.component';
import { ServiciosSolicitudAbiertasOnComponent } from './paginas/reportes/informes-solicitud/servicios-solicitud-abiertas-on/servicios-solicitud-abiertas-on.component';
import { ServiciosSolicitudElectivasComponent } from './paginas/reportes/informes-solicitud/servicios-solicitud-electivas/servicios-solicitud-electivas.component';
import { ReporteOrdenQuiComponent } from './paginas/reportes/informes-solicitud/reporte-orden-qui/reporte-orden-qui.component';
import { ReporteOrdenOnComponent } from './paginas/reportes/informes-solicitud/reporte-orden-on/reporte-orden-on.component';
import { EnteComponent } from './paginas/admin/catalogos/ente/ente.component';
import { TipoCentroComponent } from './paginas/admin/catalogos/tipo-centro/tipo-centro.component';
import { SolicitudServicioElecMedComponent } from './paginas/solicitudes/solicitud-servicio-elec-med/solicitud-servicio-elec-med.component';
import { AuditoriasSolicitudComponent } from './paginas/reportes/informes-solicitud/auditorias-solicitud/auditorias-solicitud.component';




@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    CatalogosComponent,
    ReportesComponent,
    ServiciosSolComponent,
    ReporteOrdenComponent,
    CalendarioComponent,
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
    ProveedorComponent,
    DiagnosticoComponent,
    CausaComponent,
    SolicitudesComponent,
    OrdenServicioComponent,
    SolicitudServicioComponent,
    SolicitudBeneficiarioComponent,
    VerCupoComponent,
    SolicitudListarComponent,
    SolicitudListarTitularComponent,
    ToastComponent,
    ConfirmDialogComponent,
    BasicTableComponent,
    BlockUiComponent,
    UploadFilesComponent,
    TitleComponent,
    LoginComponent,
    AyudaComponent,
    DialogComponent,
    RegistrarCuposComponent,
    UppercaseDirective,
    ServicioEspecialidadComponent,
    SolicitudModificarComponent,
    ListaSolicitudesComponent,
    PrioridadComponent,
    SolicitudModificarComponent,
    ReporteMedicoComponent,
    OrdenModificarComponent,
    ServicioTipoAtencionComponent,
    ServiciosSolicitudAbiertasComponent,

    MenuComponent,
    MenuPrincipalComponent,
    PanelmenuComponent,

    ExamenComponent,
    RecaudoComponent,
    GrupoComponent,
    RegistrarCuposTriajeComponent,
    CalendarioTriajeComponent,
    VerCupoTriajeComponent,
    ReporteCuposComponent,
    OrdenServicioTriajeComponent,
    SolicitudServicioTriajeComponent,
    SolicitudModificarTriajeComponent,
    OrdenModificarTriajeComponent,
    SolicitudModificarTriajeLabComponent,
    ReporteCuposLabComponent,
    ReporteCuposTriajeComponent,
    PlantillaReporteComponent,
    PlantillaCabeceraComponent,
    BasicTableAgrupadoComponent,
    OrdenModificarTriajeLabComponent,
    ServiciosSolicitudAbiertasLabComponent,
    ServiciosSolicitudAbiertasImgComponent,
    ReporteOrdenLabComponent,
    ReporteOrdenImgComponent,
    GrupoServicioComponent,
    GrupoExamenComponent,
    ModificarCuposComponent,
    RegistrarCuposLabComponent,
    SolicitudServicioTriajeImgComponent,
    SolicitudServicioTriajeLabComponent,
    OrdenServicioTriajeLabComponent,
    OrdenServicioTriajeImgComponent,
    CalendarioTriajeImgComponent,
    CalendarioTriajeLabComponent,
    DomicilioComponent,
    SolicitudServicioElectivaQuirComponent,
    TasaComponent,
    ServicioMedicoComponent,
    ServicioProveedorComponent,
    SolicitudServicioElecOncComponent,
    ReporteCuposElecQuirurgicoComponent,
    ReporteCuposElecOncologicoComponent,
    SolicitudModificarElectQuiComponent,
    SolicitudModificarElectOncComponent,
    CalendarioElectivaQuirComponent,
    CalendarioElectivaOncComponent,
    OrdenModificarElecQuirComponent,
    OrdenModificarElecOncComponent,
    OrdenServicioElecQuirComponent,
    OrdenServicioElecOncComponent,
    ServiciosSolicitudAbiertasQuiComponent,
    ServiciosSolicitudAbiertasOnComponent,
    ServiciosSolicitudElectivasComponent,
    ReporteOrdenQuiComponent,
    ReporteOrdenOnComponent,
    EnteComponent,
    TipoCentroComponent,
    SolicitudServicioElecMedComponent,
    AuditoriasSolicitudComponent

  ],
  imports: [
    TableModule,
    ButtonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    CalendarModule,
    ButtonModule,
    MessagesModule,
    MessageModule,
    TableModule,
    InputTextModule,
    PanelModule,
    BlockUIModule,
    ContextMenuModule,
    KeyFilterModule,
    ToastModule,
    DataViewModule,
    ConfirmDialogModule,
    InputSwitchModule,
    PaginatorModule,
    TabMenuModule,
    TreeModule,
    SplitButtonModule,
    MenubarModule,
    CardModule,
    MultiSelectModule,
    FileUploadModule,
    TooltipModule,
    CheckboxModule,
    TabViewModule,
    ListboxModule,
    DialogModule,
    ScrollPanelModule,
    ToolbarModule,
    InputNumberModule,
    RadioButtonModule,
    SelectButtonModule,
    InputMaskModule,
    ProgressSpinnerModule,
    FullCalendarModule,

    GalleriaModule,
    PanelMenuModule,
  ],
  providers: [DatePipe, ],
  bootstrap: [AppComponent],

  entryComponents: [
    ConsultarBeneficiarioComponent
  ]
})
export class AppModule { }
