/* File: tableCreator.js
GUI Assignment: Adding jQuery to Dynamic Multiplication Table
Jack Holden, UMass Lowell Computer Science, John_Holden@student.uml.edu
Copyright (c) 2021 by Jack. All rights reserved.  */

var multiplierMin = document.getElementById('multiplierMin');
var multiplierMax = document.getElementById('multiplierMax');
var multiplicandMin = document.getElementById('multiplicandMin');
var multiplicandMax = document.getElementById('multiplicandMax');

// This global variable is used in the create table function to signal
// whether another table needs to be removed from the scrollableTable div
var tableCreated = false;

// createTable uses the values entered by the user to dynamically create
// the multiplication table
function createTable(topMin, topMax, leftMin, leftMax) {
    var table = document.createElement('table');
    var tbody = document.createElement('tbody');

    // +2 here to add the extra blank row in the top left
    for (let r = 0; r < leftMax - leftMin + 2; r++) {
        let row = document.createElement('tr');
        for (let c = 0; c < topMax - topMin + 2; c++) {
            let data = document.createElement('td');

            // these turnaries create the alternating purple white cells
            data.style.backgroundColor = (r + c) % 2 === 0 ? 'white' : 'rgb(186, 48, 186)';
            data.style.color = (r + c) % 2 === 0 ? 'rgb(186, 48, 186)' : 'white';
            // all top row and left column cells should have a different background colors
            // to signify that they are the headers for the table. They all have the sticky
            // attribute added to them so that the are fixed when the table is scrolled.
            if (r === 0 && c === 0) {
                data.innerHTML = '';
                data.style.backgroundColor = 'pink';
                data.style.position = 'sticky';
                data.style.top = 0;
            } else if (r === 0) {
                data.innerHTML = topMin + c - 1;
                data.style.backgroundColor = 'pink';
                data.style.color = 'black';
                data.style.position = 'sticky';
                data.style.top = 0;
            } else if (c === 0) {
                data.innerHTML = leftMin + r - 1;
                data.style.backgroundColor = 'pink';
                data.style.color = 'black';
                data.style.position = 'sticky';
                data.style.left = 0;
            } else {
                data.innerHTML = (topMin + c - 1) * (leftMin + r - 1);
            }

            row.appendChild(data);
        }
        tbody.appendChild(row);
    }

    table.appendChild(tbody);

    var tableArea = document.getElementById('scrollableTable');

    // removes the previous table if another one is submitted
    if (tableCreated) {
        tableArea.removeChild(tableArea.firstChild);
    }
    tableCreated = true;

    tableArea.appendChild(table);
}

var form = document.forms['numberForm'];
form.onsubmit = function(e) {
    // uses jQuery plugin to validate form before we proceed
  if ($("#numberForm").valid()) {
    // we do not want the page to refresh before adding our table
    e.preventDefault();
    const multiplierMin = Number($("#multiplierMin").val());
    const multiplierMax = Number($("#multiplierMax").val());
    const multiplicandMin = Number($("#multiplicandMin").val());
    const multiplicandMax = Number($("#multiplicandMax").val());
    // adds the table using the values submitted in the form
    createTable(multiplierMin, multiplierMax, multiplicandMin, multiplicandMax);
  }
}





