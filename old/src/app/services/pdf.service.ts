import { Injectable } from '@angular/core';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatDate } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  // https://github.com/simonbengtsson/jsPDF-AutoTable/issues/357
  // https://stackoverrun.com/es/q/8340648
  // https://www.rotisedapsales.com/snr/cloud2/website/jsPDF-master/docs/jspdf.js.html
  // https://micropyramid.com/blog/export-html-web-page-to-pdf-using-jspdf/https://micropyramid.com/blog/export-html-web-page-to-pdf-using-jspdf/

  constructor() { }

  exportPdf(data: any[], exportColumns: any[], nombre: string, orientacion: string,
    size: string, font_size: number, encabezado: any[], totales: any[]) {


    if (data.length > 0) {
      if (orientacion = 'l') {     //orientation?: "p" | "portrait" | "l" | "landscape"
        var doc = new jsPDF("l", "mm", size);
      } else {
        var doc = new jsPDF("p", "mm", size);
      }

      doc.setFontSize(font_size);

      if (encabezado != null) {
        encabezado.forEach(item => {
          doc.text(item[0], item[1], item[2]); //0: texto, 1: coordenada x, 2: coordenada y
        });

      }

      if (totales == null) {
        totales = [['']];
      }


      doc.setProperties({
        //orientation:'p',
        //unit: 'mm',
        //format: 'letter',
        title:  'Reporte',
        subject: 'SIDOR',
        author: "SIDOR",
        creator: "SIDOR"
      });

      /* Ajuste de tabla de datos */
      autoTable(doc, {
        columns: exportColumns,
        body: data,
        foot: totales,
        theme: 'plain',        //striped|'grid'|'plain'|'css' = 'striped'
        margin: { top: 40 },
        showHead: 'everyPage',   //'everyPage'|'firstPage'|'never' = 'everyPage''
        showFoot: 'everyPage',   //'everyPage'|'lastPage'|'never' = 'everyPage'
        rowPageBreak: 'avoid',   //'auto'|'avoid' = 'auto' If set to avoid
        styles: { fontSize: 9},

      })



      /* Numero de páginas a mostrar en el documento */
      var pageCount = doc.getNumberOfPages(); //Total Page Number
      for (let i = 0; i < pageCount; i++) {
        doc.setPage(i);
        let pageCurrent = doc.setPage(i).getCurrentPageInfo().pageNumber; //Current Page
        doc.setFontSize(10);
        doc.text('Pag. ' + pageCurrent + '/' + pageCount, 260, 10);
      }


      var blob = doc.output("blob");
      window.open(URL.createObjectURL(blob));
    };

    doc.close;

  }

}
