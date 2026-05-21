// Home
export * from './login/login.component';
export * from './dashboard/dashboard.component';

export * from './menu-principal/menu-principal.component';

// Administrador
export * from './admin/catalogos/catalogos.component';
export * from './solicitudes/solicitudes.component';

//Catalogos

export * from './admin/catalogos/estado-atencion/estado-atencion.component';
export * from './admin/catalogos/estado-solicitud/estado-solicitud.component';
export * from './admin/catalogos/tipo-atencion/tipo-atencion.component';
export * from './admin/catalogos/tipo-solicitud/tipo-solicitud.component';
export * from './admin/catalogos/tipo-proveedor/tipo-proveedor.component';
export * from './admin/catalogos/tipo-diagnostico/tipo-diagnostico.component';
export * from './admin/catalogos/servicio/servicio.component';
export * from './admin/catalogos/especialidad/especialidad.component';
export * from './admin/catalogos/grupo-diagnostico/grupo-diagnostico.component';
export * from './admin/catalogos/medico/medico.component';
export * from './admin/catalogos/medico-especialidad/medico-especialidad.component';
export * from './admin/catalogos/sitio/sitio.component';
export * from './admin/catalogos/proveedor/proveedor.component';
export * from './admin/catalogos/diagnostico/diagnostico.component';
export * from './admin/catalogos/causa/causa.component';
export * from './admin/catalogos/servicio-especialidad/servicio-especialidad.component';
export * from './admin/catalogos/prioridad/prioridad.component';
export * from './admin/catalogos/servicio-tipo-atencion/servicio-tipo-atencion.component';
export * from './admin/catalogos/recaudo/recaudo.component';
export * from './admin/catalogos/grupo/grupo.component';
export * from './admin/catalogos/ente/ente.component';
export * from './admin/catalogos/examen/examen.component';
export * from './admin/catalogos/grupo-servicio/grupo-servicio.component';
export * from './admin/catalogos/grupo-examen/grupo-examen.component';
export * from './admin/catalogos/domicilio/domicilio.component';
export * from './admin/catalogos/tasa/tasa.component';
export * from './admin/catalogos/servicio-medico/servicio-medico.component';
export * from './admin/catalogos/servicio-proveedor/servicio-proveedor.component';


//Solicitudes y órdenes
export * from './solicitudes/solicitudes.component';
export * from './solicitudes/solicitud-beneficiario/solicitud-beneficiario.component';
export * from './solicitudes/orden-servicio/orden-servicio.component';
export * from './solicitudes/orden-servicio-triaje-img/orden-servicio-triaje-img.component';
export * from './solicitudes/orden-servicio-triaje-lab/orden-servicio-triaje-lab.component';
export * from './solicitudes/orden-servicio-triaje/orden-servicio-triaje.component';
export * from './solicitudes/orden-servicio-elec-onc/orden-servicio-elec-onc.component';
export * from './solicitudes/orden-servicio-elec-quir/orden-servicio-elec-quir.component';
export * from './solicitudes/solicitud-servicio/solicitud-servicio.component';

export * from './solicitudes/solicitud-servicio-triaje/solicitud-servicio-triaje.component';
export * from './solicitudes/solicitud-servicio-triaje-img/solicitud-servicio-triaje-img.component';
export * from './solicitudes/solicitud-servicio-triaje-lab/solicitud-servicio-triaje-lab.component';
//ELECTIVAS
//solicitud
export * from './solicitudes/solicitud-servicio-electiva-quir/solicitud-servicio-electiva-quir.component';
export * from './solicitudes/solicitud-servicio-elec-onc/solicitud-servicio-elec-onc.component';
export * from './solicitudes/solicitud-servicio-elec-med/solicitud-servicio-elec-med.component';

export * from './solicitudes/solicitud-listar/solicitud-listar.component';
export * from './solicitudes/solicitud-listar-titular/solicitud-listar-titular.component';
export * from './solicitudes/solicitud-modificar/solicitud-modificar.component';
export * from './solicitudes/solicitud-modificar-triaje/solicitud-modificar-triaje.component';
export * from './solicitudes/solicitud-modificar-triaje-lab/solicitud-modificar-triaje-lab.component';
export * from './solicitudes/solicitud-modificar-elect-onc/solicitud-modificar-elect-onc.component';
export * from './solicitudes/solicitud-modificar-elect-qui/solicitud-modificar-elect-qui.component';



//Consultas
export * from './consultas/beneficiario/consultar-beneficiario.component';

//Calendario
export * from './calendario/calendario.component';
export * from './calendario/ver-cupo/ver-cupo.component';
export * from './calendario-triaje/calendario-triaje.component';
export * from './calendario-triaje-img/calendario-triaje-img.component';
export * from './calendario-triaje-lab/calendario-triaje-lab.component';
export * from './calendario-triaje/ver-cupo-triaje/ver-cupo-triaje.component';
export * from './calendario-electiva-onc/calendario-electiva-onc.component';
export * from './calendario-electiva-quir/calendario-electiva-quir.component';
export * from './modificar-cupos/modificar-cupos.component';
export * from './registrar-cupos/registrar-cupos.component';
export * from './registrar-cupos-triaje/registrar-cupos-triaje.component';
export *  from './registrar-cupos-lab/registrar-cupos-lab.component';
export * from './plantilla-reporte/plantilla-reporte.component';
export * from './plantilla-cabecera/plantilla-cabecera.component';


// Reportes

export * from './reportes/reportes.component';
export * from './reportes/informes-solicitud/servicios-solicitud/servicios-solicitud.component';
export * from './reportes/informes-solicitud/servicios-solicitud-electivas/servicios-solicitud-electivas.component';
export * from './reportes/informes-solicitud/servicios-solicitud-abiertas/servicios-solicitud-abiertas.component';
export * from './reportes/informes-solicitud/servicios-solicitud-abiertas-lab/servicios-solicitud-abiertas-lab.component';
export * from './reportes/informes-solicitud/servicios-solicitud-abiertas-img/servicios-solicitud-abiertas-img.component';
export * from './reportes/informes-solicitud/servicios-solicitud-abiertas-qui/servicios-solicitud-abiertas-qui.component';
export * from './reportes/informes-solicitud/servicios-solicitud-abiertas-on/servicios-solicitud-abiertas-on.component';

export * from './reportes/informes-solicitud/servicios-orden/reporte-orden.component';
export * from './reportes/informes-solicitud/reporte-orden-lab/reporte-orden-lab.component';
export * from './reportes/informes-solicitud/reporte-orden-img/reporte-orden-img.component';
export * from './reportes/informes-solicitud/reporte-orden-qui/reporte-orden-qui.component';
export * from './reportes/informes-solicitud/reporte-orden-on/reporte-orden-on.component';

export * from './reportes/informes-solicitud/reporte-medico/reporte-medico.component';
export * from './reportes/informes-solicitud/reporte-cupos-lab/reporte-cupos-lab.component';
export * from './reportes/informes-solicitud/reporte-cupos-triaje/reporte-cupos-triaje.component';
export * from './reportes/informes-solicitud/reporte-cupos-elec-oncologico/reporte-cupos-elec-oncologico.component';
export * from './reportes/informes-solicitud/reporte-cupos-elec-quirurgico/reporte-cupos-elec-quirurgico.component';
export * from './reportes/informes-solicitud/reporte-cupos/reporte-cupos.component';
export * from './reportes/informes-solicitud/auditorias-solicitud/auditorias-solicitud.component';

export * from './ordenes/orden-modificar/orden-modificar.component';
export * from './ordenes/orden-modificar-triaje/orden-modificar-triaje.component';
export * from './ordenes/orden-modificar-triaje-lab/orden-modificar-triaje-lab.component';
export * from './ordenes/orden-modificar-elec-onc/orden-modificar-elec-onc.component';
export * from './ordenes/orden-modificar-elec-quir/orden-modificar-elec-quir.component';

