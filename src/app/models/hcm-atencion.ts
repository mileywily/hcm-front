
export interface Atencion {
    atencion_id?,
    solicitud_id?,
    tipo_atencion_id?,
    prioridad_id?,
    tipo_consulta_id?,
    servicio_id?,
    motivo?,
    medico_id?,
    especialidad_id?,
    sitio_id?,
    proveedor_id?,
    estado_atencion_id?,
    is_cita?,
    fecha_cita?,
    fecha_ingreso?,
    fecha_egreso?,
    observaciones?,
    fecha_atencion?,
    diagnostico_id?,
    modified?,

    nombre_tipo_atencion?,
    nombre_prioridad?,
    nombre_servicio?,
    nombre_medico?,
    nombre_especialidad?,
    nombre_sitio?,
    nombre_proveedor?,
    nombre_estado_atencion?,
    nomnre_tipo_consulta?,

    usuario_creador?,
    nombre_creador?,
    usuario_modificador?,
    nombre_modificador?,
    nombre_causa?,

    beneficiario_id?,
    cupo_id?,
    causa_id?,
    estado?: boolean,
    is_automatica?,
    tipo_estudio?
   
}

