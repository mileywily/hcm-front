import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.scss'],
})
export class AyudaComponent implements OnInit {

  /** Nombre del Diálogo*/
  @Input() helpTitle: any;

  /** Variable que maneja la visibilidad del diálogo*/
  @Input() displayHelp: boolean;

  /** Evento de salida para la visibilidad del diálogo*/
  @Output() displayEvent = new EventEmitter<boolean>();
  @Output() selectEvent = new EventEmitter<any>();

  /** Evento de salida para indicar que dieron click al botón guardar*/
  @Output() saveEvent = new EventEmitter<any>();

  // Mostrar botón seleccionar
  @Input() selectFlag: boolean ;

  // Mostrar botón guardar
  @Input() saveFlag: boolean ;

  //Otros parámetros recibidos por el diálogo
  @Input() height: any;
  @Input() resizable: boolean;
  @Input() maximizable: boolean;
  @Input() draggable: boolean;
  @Input() modal: boolean;
  @Input() overflow: any;
  @Input() width: any;


  constructor() { 
    /** Por defecto estos serán los valores */
    /** Si son recibidos por parámetros los valores cambiaran */
    this.selectFlag = false;
    this.saveFlag = true;
    this.height = '600px';
    this.resizable = true;
    this.maximizable = true;
    this.draggable = true;
    this.modal = true;
  }

  ngOnInit(): void {}

  /** Puente comunicación*/

  displayChange(value: boolean) {
    this.displayEvent.emit(value);
  }

  /** Click al botón cerrar cambia valor del display y emite el cambio al evento de salida */
  close() {
    this.displayHelp = false;
    this.displayChange(this.displayHelp);
  }

  /** Click al botón guardar emite evento de salida para indicar que este fue presionado*/
  save() {
    this.saveEvent.emit(true);
  }

  select(){
    this.selectEvent.emit(true);
  }

}

