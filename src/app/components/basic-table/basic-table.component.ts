import { Component, OnInit, Input } from '@angular/core';
import { PdfService } from 'src/app/services/pdf.service';

@Component({
  selector: 'app-basic-table',
  templateUrl: './basic-table.component.html',
  styleUrls: ['./basic-table.component.scss']
})
export class BasicTableComponent implements OnInit {
  @Input() registros: any[];
  @Input() cols: any[];
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

  constructor(private pdfService: PdfService) {}

  ngOnInit(): void {
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
      const worksheet = xlsx.utils.json_to_sheet(this.registros);
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
