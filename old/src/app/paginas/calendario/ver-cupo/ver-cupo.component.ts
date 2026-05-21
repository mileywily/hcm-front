import { ServicioService } from './../../../services/servicio.service';
import { SitioService } from './../../../services/sitio.service';
import { TurnoService } from './../../../services/turno.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { GlobalService } from 'src/app/services';

@Component({
  selector: 'app-ver-cupo',
  templateUrl: './ver-cupo.component.html',
  styleUrls: ['./ver-cupo.component.scss'],
})
export class VerCupoComponent implements OnInit {
  @Input() displayHelp: boolean;
  @Input() disabledFlag: boolean;
  @Output() displayEvent = new EventEmitter<boolean>();
  @Output() selectEvent = new EventEmitter<any>();

  turnos: any[];
  sitios: any[];
  servicios: any[];
  es: any;

  @Input()
  set params(val) {
    this.results = val;
    //console.log('ver cupo:', this.results);
    this.validate();
  }

  results: any;
  form: FormGroup;
  selectFlag: boolean = false;

  constructor(
    private fb: FormBuilder,
    private sitioService: SitioService,
    private turnoService: TurnoService,
    private globalService: GlobalService,
    private servicioService: ServicioService
  ) {
    this.createForm();
    this.es = this.globalService.es;
  }

  ngOnInit() {

    
    this.dropdownT();
    this.dropdownS();
    this.dropdownSV();
  }

  validate() {
    
    if(this.disabledFlag){
      this.selectFlag = false;
    }else{
      this.selectFlag = this.results.is_disponible == '1' ? true : false;
    }
  }

  createForm() {
    this.form = this.fb.group({
      turno: [''],
      sitio: [''],
      fecha: [''],
      horario: [''],
      cupos: [''],
      cupos_asignados: [''],
      servicio: [''],
    });
  }

  dropdownT() {
    this.turnoService
      .getAll()
      .toPromise()
      .then((results) => {
        this.turnos = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  dropdownSV() {
    this.servicioService
      .getAllCombo()
      .toPromise()
      .then((results) => {
        this.servicios = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  dropdownS() {
    this.sitioService
      .getAllCombo()
      .toPromise()
      .then((results) => {
        this.sitios = results;
      })
      .catch((err) => {
        console.log(err);
      });
  }


  /** Puente comunicación*/
  close() {
    this.displayHelp = false;
    this.displayEvent.emit(this.displayHelp);
  }

  select() {
    this.selectEvent.emit(this.results);
    this.close();
  }
}
