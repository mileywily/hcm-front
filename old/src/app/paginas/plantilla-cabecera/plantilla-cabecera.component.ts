import { Component, EventEmitter, Input, OnInit } from '@angular/core';
@Component({
  selector: 'app-plantilla-cabecera',
  templateUrl: './plantilla-cabecera.component.html',
  styleUrls: ['./plantilla-cabecera.component.scss']
})
export class PlantillaCabeceraComponent implements OnInit 
{
  @Input() rowGroupMetadata ={};
  @Input() dumies =[];
  @Input() virtualDummies =[];
  @Input() cols = [];
  @Input() isLoading = false;
  @Input() totalRecords = 0;
  @Input() rowCount = 20;
  @Input() mostrarHeaderGroup = false;

  constructor() { }

  ngOnInit(): void 
  {
  
  }



}
