
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCuTCXOYw--m1mg6F2q2zCp1gvf2uw6PYI",
    authDomain: "simple-633fa.firebaseapp.com",
    databaseURL: "https://simple-633fa-default-rtdb.firebaseio.com",
    projectId: "simple-633fa",
    storageBucket: "simple-633fa.appspot.com",
    messagingSenderId: "616105900248",
    appId: "1:616105900248:web:728ee133191dfba3f97fad",
    measurementId: "G-LVEZE5P5F4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

const adsContainer = document.getElementById('form');


function Getform() {
    const dbref = ref(db);
    get(child(dbref, 'educationalform')).then((snapshot) => {
      let tableHtml = '<table id="dataTable" ><tr><th>Name</th><th>Reason</th><th>Email</th>';
      snapshot.forEach((childSnapshot) => {
        const data = childSnapshot.val();
        tableHtml += `<tr>
          <td>${data.firstName}</td>
          <td>${data.reason}</td>
          <td>${data.email}</td>
        </tr>`;
      });
      tableHtml += '</table>';
      adsContainer.innerHTML = tableHtml;
      class TableCSVExporter {
        constructor(table, includeHeaders = true) {
          this.table = table;
          this.rows = Array.from(table.querySelectorAll("tr"));
      
          if (!includeHeaders && this.rows[0].querySelectorAll("th").length) {
            this.rows.shift();
          }
        }
      
        convertToCSV() {
          const lines = [];
          const numCols = this._findLongestRowLength();
      
          for (const row of this.rows) {
            let line = "";
      
            for (let i = 0; i < numCols; i++) {
              if (row.children[i] !== undefined) {
                line += TableCSVExporter.parseCell(row.children[i]);
              }
      
              line += (i !== (numCols - 1)) ? "," : "";
            }
      
            lines.push(line);
          }
      
          return lines.join("\n");
        }
      
        _findLongestRowLength() {
          return this.rows.reduce((l, row) => row.childElementCount > l ? row.childElementCount : l, 0);
        }
      
        static parseCell(tableCell) {
          let parsedValue = tableCell.textContent;
      
          // Replace all double quotes with two double quotes
          parsedValue = parsedValue.replace(/"/g, `""`);
      
          // If value contains comma, new-line or double-quote, enclose in double quotes
          parsedValue = /[",\n]/.test(parsedValue) ? `"${parsedValue}"` : parsedValue;
      
          return parsedValue;
        }
      }
      
      // Rest of the code...
      const dataTable = document.getElementById("dataTable");
      const btnExportToCsv = document.getElementById("btnExportToCsv");
  
      btnExportToCsv.addEventListener("click", () => {
        const exporter = new TableCSVExporter(dataTable);
        const csvOutput = exporter.convertToCSV();
        const csvBlob = new Blob([csvOutput], { type: "text/csv" });
        const blobUrl = URL.createObjectURL(csvBlob);
        const anchorElement = document.createElement("a");
  
        anchorElement.href = blobUrl;
        anchorElement.download = "table-export.csv";
        anchorElement.click();
  
        setTimeout(() => {
          URL.revokeObjectURL(blobUrl);
        }, 500);
      });
    });
  }
  
  window.addEventListener('load', Getform);