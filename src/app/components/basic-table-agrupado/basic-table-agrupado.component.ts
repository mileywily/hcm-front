import { Component, OnInit, Input } from '@angular/core';
import { PdfService } from 'src/app/services/pdf.service';

@Component({
  selector: 'app-basic-table-agrupado',
  templateUrl: './basic-table-agrupado.component.html',
  styleUrls: ['./basic-table-agrupado.component.scss']
})
export class BasicTableAgrupadoComponent implements OnInit {

  @Input() registros: any[];
  @Input() cols: any[];
  @Input() columnas_agrupado: any[];
  @Input() resizable: boolean;
  @Input() summary: boolean;
  @Input() footer: boolean;
  @Input() cantidad: number;
  @Input() totales: any = {};
  @Input() loading: boolean;
  @Input() exportarExcel: boolean; //indica si se muestra en el encabezado de la tabla el ícono para exportar a excel
  @Input() exportarPdf: boolean; //indica si se muestra en el encabezado de la tabla el ícono para exportar a  pdf
  @Input() pdfPropiedades: any = {}; //indica las propiedades del archivo pdf a exportar
  @Input() autoLayout: Boolean;
  @Input() mostrar_enc : Boolean;
  @Input() agrupado : Boolean;
  @Input() texto_encabezado : string;
  @Input() columna_agrupado : any;
  @Input() cantidad_columnas : number;
  @Input() mostrar_buscar: Boolean; //Indica si se muestra el filtro buscar
  @Input() rowGroupMetadata ={};
  @Input() dumies =[];
  @Input() virtualDummies =[];
  @Input() isPagination = false;
  @Input() mostrarHeaderGroup = false;


  constructor(private pdfService: PdfService) 
  { 

  }

  ngOnInit(): void 
  {
    this.totales = this.registros.pop();
  }


  

  exportPdf() {
    if (this.pdfPropiedades != null) {
      this.pdfService.exportPdf(
        this.registros,
        this.pdfPropiedades.exportColumns,
        this.pdfPropiedades.nombre,
        this.pdfPropiedades.orientacion,
        this.pdfPropiedades.tamaño,
        this.pdfPropiedades.fuente,
        this.pdfPropiedades.encabezado,
        this.pdfPropiedades.totales
      );
    } else {
      this.pdfService.exportPdf(
        this.registros,
        null,
        'reporte',
        'l',
        'a4',
        11,
        null,
        null
      );
    }
  }

  exportExcel() {
    import('xlsx').then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.virtualDummies);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xls',
        type: 'array'
      });
      this.saveAsExcelFile(excelBuffer, 'reporte');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import('file-saver').then(FileSaver => {
      let EXCEL_TYPE =
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xls';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(
        data,
        fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION
      );
    });
  }

}
