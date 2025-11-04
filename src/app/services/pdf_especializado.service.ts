import { Injectable } from '@angular/core';
import 'jspdf-autotable';
//import { jsPDF } from 'jspdf';

import * as jsPDF from 'jspdf';
//import autoTable from 'jspdf-autotable';
import { formatDate } from '@angular/common';
import {Solicitud } from '../models';
import { range } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PdfespecializadoService {

  //company: Company = {};

  listProductByType: any[];

  fecha: any;

  constructor() { }

  exportPdfAdvanced(
    data: Solicitud[],
    exportColumns: any[],
    nombre: string,
    orientacion: string,
    size: string,
    font_size: number,
    encabezado: any[],
    totales: any[],
    rangeDates: any[]) {

      

    this.printBalance(data, rangeDates);

  }

  getdatetime(dt: any) {

    var res = "";
    res += this.formatdigits(dt.getDate());
    res += "/";
    res += this.formatdigits(dt.getMonth() + 1);
    res += "/";
    res += this.formatdigits(dt.getFullYear());
    res += " ";
    res += this.formatdigits(dt.getHours() > 12 ? dt.getHours() - 12 : dt.getHours());
    res += ":";
    res += this.formatdigits(dt.getMinutes());
    res += ":";
    res += this.formatdigits(dt.getSeconds());
    res += " " + (dt.getHours() > 11 ? "PM" : "AM");
    return res;
  }

  formatdigits(val) {
    val = val.toString();
    return val.length == 1 ? "0" + val : val;
  }

  formatFecha(){
    let format = 'dd-MM-yyyy';
    const locale = 'en-ES';

    let fecha = formatDate(this.fecha, format, locale);
    return fecha;

  }

  private addHeader(document) {

    var doc = document[0];

    let pageWith = doc.internal.pageSize.getWidth();
    let middleWith = pageWith / 2;

    var y: number = 18;


   // this.company.nombre_empresa = "Comited de Comercialización";
    //this.company.logo = "data:image/png;base64,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";

    //doc.addImage(this.company.logo, 'PNG', 10, 1, 30, 30);

    doc.setFont("helvetica");
    doc.setFontSize(20);
    doc.setFontStyle("bold");
    doc.text(middleWith, y, "COMITE DE COMERCIALIZACIÓN", { align: 'center' });

    y = y + 10;
    doc.setFontSize(9);
    doc.setFontStyle("normal");

    console.log(this.fecha);

    doc.text(pageWith-10, y-3, this.fecha, {align: 'right'});

    doc.line(10, y, pageWith - 10, y);

  }


  private reportePDF() {

    let doc = new jsPDF();

    let cols = [
      { "nombre": "Columna1", "posX": 10 },
      { "nombre": "Columna2", "posX": 30 },
      { "nombre": "Columna3", "posX": 60 },
      { "nombre": "Columna4", "posX": 90 }
    ]

    let document = [doc];
    this.addHeader(document);

    for (let col of cols) {
      this.addWrappedText(
        col.nombre, // Put a really long string here
        col.nombre.length,
        doc,
        12,
        "normal",
        4,     // Space between lines
        col.posX,    // Text offset from left of document
        40,    // Initial offset from top of document; set based on prior objects in document
        10     // Initial offset from top of document when page-wrapping
      );
    }

    var blob = doc.output("blob");
    window.open(URL.createObjectURL(blob));
  }

  private addWrappedText(
    text,
    textWidth,
    doc,
    fontSize,
    fontType,
    lineSpacing,
    xPosition,
    initialYPosition = 10,
    pageWrapInitialYPosition = 10) {
    doc.setFontType(fontType);
    doc.setFontSize(fontSize);
    var textLines = doc.splitTextToSize(text, textWidth); // Split the text into lines
    var pageHeight = doc.internal.pageSize.height;        // Get page height, we'll use this for auto-paging. TRANSLATE this line if using units other than `pt`
    var cursorY = initialYPosition;

    textLines.forEach(lineText => {
      if (cursorY > pageHeight) { // Auto-paging
        doc.addPage();
        cursorY = pageWrapInitialYPosition;
      }
      doc.text(xPosition, cursorY, lineText);
      cursorY += lineSpacing;
    })
  }


  private printBalance(results: any[], rangeDates: any[]) {

   

    let format = 'dd-MM-yyyy';
    const locale = 'en-ES';

    this.fecha = formatDate(rangeDates[0], format, locale) + " - " + formatDate(rangeDates[1], format, locale);

    if(formatDate(rangeDates[0], format, locale) == formatDate(rangeDates[1], format, locale))
        this.fecha = formatDate(rangeDates[0], format, locale);

    let max;
    let min;
    let prom: number;
    let x;
    let y;
    let sum: number;
    let precios: any[];

    let cols = [
      { header: 'Producto' },
      { header: 'Referencia' },
      { header: 'Condición' },
      { header: 'Precio' }
    ];

    let doc = new jsPDF();

    /*let pageWith = doc.internal.pageSize.getWidth();
    let pageHeight = doc.internal.pageSize.getHeight();*/

    let pageWith = 215.9;
    let pageHeight = 279.4;

    doc.setProperties({
      orientation: 'portrait',
      unit: 'mm',
      format: 'letter',
      title: 'Gestión de Comited CVG',
      subject: 'Gestión de Comited CVG',
      author: "CVG",
      creator: "CVG"
    });


    let firstPage: boolean = true;

    x = 10;
    y = 40;

    let listaSectores = [...new Set(results.map(it => it.sector))]; // lista de sectores

    for (let sectorName of listaSectores) {

      if (!firstPage && y >= (pageHeight - 10)) {
        y = 40;
        doc.addPage('letter', 'portrait');
        this.addHeader(document);
        doc = document[0];
      } else if (firstPage) {
        firstPage = false;
        var document = [doc];
        this.addHeader(document);
        doc = document[0];
      }
      document = [doc];
      doc = document[0];

      doc.setFontSize(13);
      doc.setFontStyle("bold");
      doc.text(x, y, sectorName);

      y += 10;

      let datosTiposProductos = results.filter(it => (it.sector == sectorName));
      let listTypeName = [...new Set(datosTiposProductos.map(it => it.tipo_producto))];

      for (let typeName of listTypeName) {

        if (!firstPage && y >= (pageHeight - 10)) {
          y = 40;
          doc.addPage('letter', 'portrait');
          this.addHeader(document);
          doc = document[0];
        } else if (firstPage) {
          firstPage = false;
          var document = [doc];
          this.addHeader(document);
          doc = document[0];
        }
        document = [doc];
        doc = document[0];

        doc.setFontSize(12);
        doc.setFontStyle("bold");
        doc.text(x, y, typeName);

        y += 10;

        doc.setFontSize(10);

        let datosProductos = results.filter(it => (it.tipo_producto == typeName));
        let listOfProductName = [...new Set(datosProductos.map(it => it.producto))];


        for (let productoName of listOfProductName) {

          if (!firstPage && y >= (pageHeight - 10)) {
            y = 40;
            doc.addPage('letter', 'portrait');
            this.addHeader(document);
            doc.setFontSize(10);
            doc = document[0];
          } else if (firstPage) {
            firstPage = false;
            var document = [doc];
            this.addHeader(document);
            doc.setFontSize(10);
            doc = document[0];
          }
          document = [doc];
          doc = document[0];

          this.listProductByType = results.filter(it => (it.producto == productoName));

          doc.setFontStyle("bold");
          doc.text(10, y, "Producto");
          doc.text(75, y, "Referencia");
          doc.text(145, y, "Fuente");
          doc.text(166, y, "Condición");
          doc.text(186, y, "Precio");

          y += 5;

          doc.setFontStyle("normal");

          precios = [];
          sum = 0;

          for (let producto of this.listProductByType) {

            if (!firstPage && y >= (pageHeight - 10)) {
              y = 40;
              doc.addPage('letter', 'portrait');
              this.addHeader(document);
              doc.setFontSize(10);
              doc = document[0];
            } else if (firstPage) {
              firstPage = false;
              var document = [doc];
              this.addHeader(document);
              doc.setFontSize(10);
              doc = document[0];
            }
            document = [doc];
            doc = document[0];

            doc.text(10, y, producto.producto);

            let splitTitle = doc.splitTextToSize(producto.referencia, 60);
            doc.text(75, y, splitTitle);


            //doc.text(75, y, producto.referencia);
            doc.text(145, y, producto.fuente);
            doc.text(166, y, producto.condicion);
            doc.text(186, y, producto.precio_total.toString());

            y += (splitTitle.length * 5);

            precios.push(producto.precio_total);

            max = Math.max(...precios);
            min = Math.min(...precios);
            sum += Number(producto.precio_total);

            y += 5;
          }

          if (!firstPage && y >= (pageHeight - 10)) {
            y = 40;
            doc.addPage('letter', 'portrait');
            this.addHeader(document);
            doc.setFontSize(10);
            doc = document[0];
          } else if (firstPage) {
            firstPage = false;
            var document = [doc];
            this.addHeader(document);
            doc.setFontSize(10);
            doc = document[0];
          }
          document = [doc];
          doc = document[0];



          prom = sum / precios.length;

          doc.text(10, y, "Minimo: " + min);
          doc.text(45, y, "Maximo: " + max);
          doc.text(75, y, "Promedio: " + this.numberFormat(prom, true));
          doc.text(120, y, "Precio Comite:");

          y += 5;

          doc.line(10, y, pageWith - 10, y);

          y += 10;



        }
      }
    }
    var blob = doc.output("blob");
    window.open(URL.createObjectURL(blob));
  }

  numberFormat(x, whitDecimal: boolean = false) {
    if (whitDecimal) {
      x = x.toFixed(2);
    }
    x = x.toString();
    x = x.replace(".", ",");
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
      x = x.replace(pattern, "$1.$2");
    return x;
  }
}
