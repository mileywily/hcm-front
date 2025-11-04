import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  @Input() displayHelp: boolean;
  @Input() draggable: boolean;
  @Input() maximizable: boolean;
  @Input() modal: boolean;
  @Input() resizable: boolean;
  @Input() closable: boolean;
  @Input() height: any;
  @Input() header: any;
  @Input() overflow: any;
  @Input() width: any;

  constructor() {
    this.width = '50vw';
  }

  ngOnInit(): void {}
}
