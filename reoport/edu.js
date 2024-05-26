
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyB1bLJJAlJWzwcg4Dvku1KZM3cgR4TbONM",
  authDomain: "fundingjungle-1f03d.firebaseapp.com",
  databaseURL: "https://fundingjungle-1f03d-default-rtdb.firebaseio.com",
  projectId: "fundingjungle-1f03d",
  storageBucket: "fundingjungle-1f03d.appspot.com",
  messagingSenderId: "642664605739",
  appId: "1:642664605739:web:e2d4ae726c712f84c6226e",
  measurementId: "G-Q92887FDM2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

const adsContainer = document.getElementById('form');


function Getform() {
    const dbref = ref(db);
    get(child(dbref, 'educationalform')).then((snapshot) => {
      let tableHtml = '<table id="dataTable" ><tr><th>Name</th><th>Reason</th><th>email</th>';
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