import { Component, OnInit } from '@angular/core';
import { Proveedor, Respuesta } from '../../../../models';
import { ProveedorService, TipoProveedorService,TipoCentroService } from '../../../../services';
import { MessageService, ConfirmationService } from 'primeng/api';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.scss'], 
  providers: [MessageService,ConfirmationService] 
}) 

export class ProveedorComponent implements OnInit {

 
  displayDialog: boolean;
  tituloDialogo: string = "";

  nuevoRegistro: boolean;
  submitted: boolean;
  form: FormGroup;

  proveedores: any[];

  proveedor: any;

  selectedRegistros: Proveedor[];

  cols: any[]; // Para manejo de las columnas de la tabla

  tiposproveedor: any[];
  tipoProveedor: any;

  tiposCentroproveedor: any[];
  tipoCentroProveedor: any;

  constructor(
    private fb: FormBuilder,
    private proveedorService: ProveedorService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private tipoProveedorService: TipoProveedorService,
    private tipoCentroService: TipoCentroService,
  ) { 
    this.createForm();

    }

  ngOnInit() { 
    this.consultar();
    this.nuevoRegistro=false;

    this.dropdownTipos();
    this.dropdownTiposCentro();

    this.cols = [
      { field: 'proveedor_id',   header: 'Id',  width: '10%' },
      { field: 'codigo',   header: 'Codigo',  width: '15%' },
      { field: 'nombre',     header: 'Nombre', width: '20%' },
      //{ field: 'nemonico',     header: 'Nemonico', width: '15%' },
      //{ field: 'rif',     header: 'Rif', width: '10%' },
      //{ field: 'representante',     header: 'Representante', width: '20%' },
      //{ field: 'direccion',  header: 'Dirección', width: '20%' },
      //{ field: 'telefono',   header: 'Teléfono', width: '15%' },
      { field: 'email',   header: 'Email', width: '15%' },
      //{ field: 'nit',   header: 'Nit', width: '10%' },
      { field: 'tipo_proveedor_nombre',   header: 'Tipo', width: '15%' },
      { field: 'tipo_centro_nombre',   header: 'Tipo Centro', width: '15%' },
      { field: 'activo',     header: 'Activo',  width: '15%' },

    
    ];
  }

  handleChange(e, registro: Proveedor) {
    registro.activo= (e.checked == true ? 1 : 0)
  }

  createForm() {

    this.form = this.fb.group({
      codigo:  ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      nemonico: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      rif: ['', [Validators.required]],
      representante: [''],
      email: [''],
      nit: [''],
      activo: [''],
      tipoProveedor: ['', [Validators.required]],
      tipoCentroProveedor: ['', [Validators.required]]

 
    });
  }

   
  consultar(){

    this.proveedorService.getAllCombo()
    .toPromise()
    .then(
      results => { 
        this.proveedores = results; 
      }
    )
    .catch(err => { console.log(err) });
  }

  dropdownTipos(){
    this.tipoProveedorService.getAllCombo()
    .toPromise()
    .then(
      results => { 
        this.tiposproveedor = results; 

       /// console.log('tipos: ', this.tiposproveedor);
      }
    )
    .catch(err => { console.log(err) });
  }

  dropdownTiposCentro(){
    this.tipoCentroService.getAllCombo()
    .toPromise()
    .then(
      results => { 
        this.tiposCentroproveedor = results; 

       // console.log('tipos: ', this.tiposCentroproveedor);
      }
    )
    .catch(err => { console.log(err) });
  }

  openNew() {
    this.nuevoRegistro = true;
    this.tituloDialogo = "Nuevo Proveedor";
    this.proveedor = {};
    //this.tipoAtencion = null;
    this.displayDialog = true;
    this.proveedor.activo=1;
  }

  deleteSelectedItems() {
    this.confirmationService.confirm({
        message: '¿Está seguro que desea borrar el registro?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          
          this.proveedores = this.proveedores.filter(val => !this.selectedRegistros.includes(val));
          let index = -1;
          /*for (let i = 0; i < this.selectedEstados.length; i++) {
            this.remove(this.selectedEstados[i]);         
          }*/
          this.proveedorService.deleteByLote(this.selectedRegistros) //eliminar en un ciclo desde el backend
            .toPromise()
            .then(results => { 
            this.consultar(); 
            let aux: Respuesta = results;   
            if (aux){
              this.showSuccess(aux.details);   // mensaje
            } 
            else 
            {
              this.showError(aux.details);     // mensaje
            }
          })
        .catch(err => {console.log(err); })
  
          this.selectedRegistros = null;
          this.messageService.add({severity:'success', summary: 'Successful', detail: 'Registros Borrados', life: 3000});
        }
    });
  }

  editar(registroActual: Proveedor) {
    this.nuevoRegistro = false;
    this.proveedor = this.clone(registroActual);
    this.displayDialog = true;
    this.tituloDialogo = "Editar registro: " + this.proveedor.proveedor_id;
    this.proveedor.activo=1;

  }

  eliminar(resgistro: Proveedor) {
    this.confirmationService.confirm({
        message: '¿Está seguro que desea borar el registro: ' + resgistro.nombre + '?',
        header: 'Confirmación',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.proveedores = this.proveedores.filter(val => val.proveedor_id !== resgistro.proveedor_id);
            this.remove(resgistro); 
            this.messageService.add({severity:'success', summary: 'Successful', detail: 'Registro Borrado', life: 3000});
        }
    });
  }

  
  remove(registroActual: Proveedor) {

    this.proveedorService.delete(registroActual.proveedor_id)
    .toPromise()
    .then(results => {
      this.consultar();
      //this.showSuccess('El registro se ha eliminado satisfactoriamente');
      let aux: Respuesta = results;   
      if (aux){
        this.showSuccess(aux.details);   // mensaje
      } 
      else 
      {
        this.showError(aux.details);     // mensaje
      }      
    })
    .catch(err => { console.log(err) });
    
  }

  
  guardar() {  

    this.submitted = true;
    if (this.form.valid) {
    if (this.nuevoRegistro) {
      //console.log('Proveedor: ', this.proveedor);
      this.proveedorService.create(this.proveedor)
      .toPromise()
      .then(results => { 
        this.consultar(); 
        //this.showSuccess('El registro se ha creado satisfactoriamente');
        let aux: Respuesta = results;   

        if (aux){
          this.showSuccess(aux.details);   // mensaje
        } 
        else 
        {
          this.showError(aux.details);     // mensaje
        } 
        this.close();
      })
      .catch(err => { console.log(err) });

    }
    else {

      this.proveedorService.update(this.proveedor)
      .toPromise()
      .then(results => { 
        this.close();
        this.consultar(); 
        //this.showSuccess('El registro se ha actualizado satisfactoriamente');
        let aux: Respuesta = results;   
        if (aux){
          this.showSuccess(aux.details);   // mensaje
        } 
        else 
        {
          this.showError(aux.details);     // mensaje
        } 
      })
      .catch(err => { console.log(err) });


    }
   
    
  }
}

  close() {

    this.proveedor  = null;
    this.displayDialog   = false;
    this.submitted = false;
    this.nuevoRegistro = false;
   }

  clone(c:Proveedor):Proveedor {
    let registro = {};
    for (let prop in c) {
      registro[prop] = c[prop];
    }
    return registro;
  }


  private showError(errMsg: string) {
    this.messageService.clear();
    this.messageService.add({ key: 'tc', severity: 'error', summary: errMsg });
  }

  private showSuccess(successMsg: string) {
    this.messageService.clear();
    this.messageService.add({ key: 'tc', severity: 'success', summary: successMsg });
  }


}
