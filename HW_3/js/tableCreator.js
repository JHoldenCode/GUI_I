/* File: style.css
GUI Assignment: Dynamic Multiplication Table
Jack Holden, UMass Lowell Computer Science, John_Holden@student.uml.edu
Copyright (c) 2021 by Jack. All rights reserved.  */

// tab index and style.pointerEvents are what enables or disables the user
// to click or tab to a button. We turn them off on load to match the opacity
// of the submit button
var submitBtn = document.getElementById('submitBtn');
submitBtn.tabIndex = -1;
submitBtn.style.pointerEvents = 'none';

var multiplierMin = document.getElementById('multiplierMin');
var multiplierMax = document.getElementById('multiplierMax');
var multiplicandMin = document.getElementById('multiplicandMin');
var multiplicandMax = document.getElementById('multiplicandMax');

// This global variable is used in the create table function to signal
// whether another table needs to be removed from the scrollableTable div
var tableCreated = false;

multiplierMin.addEventListener('input', function() {
    entryBoxListener(multiplierMin, multiplierMax, true);
});
multiplierMax.addEventListener('input', function() {
    entryBoxListener(multiplierMax, multiplierMin, false);
});
multiplicandMin.addEventListener('input', function() {
    entryBoxListener(multiplicandMin, multiplicandMax, true);
});
multiplicandMax.addEventListener('input', function() {
    entryBoxListener(multiplicandMax, multiplicandMin, false);
});

// This function handles any possible errors from entries into the form. It pops
// up warnings if necessary and also calls a function to toggle access to the
// submit button. The entryBox is the currently modified box and the opposing entryBox 
// is the counterpart to it (either the min or max).
function entryBoxListener(entryBox, opposingEntryBox, isMin) {
    var val = Number(entryBox.value);
    var warningObj = document.getElementById(entryBox.id + 'Warning');
    var opposingWarningObj = document.getElementById(opposingEntryBox.id + 'Warning');

    if (val) {
        if (val < -50 || val > 50) {
            // &#9888; is the hexcode for a warning sign
            warningObj.innerHTML = '&#9888; Please enter a value between -50 and 50.';
            warningObj.style.opacity = 1;
        } else if (val % 1 !== 0) {
            warningObj.innerHTML = '&#9888; Please enter a whole number.';
            warningObj.style.opacity = 1;
        } else if (opposingEntryBox.value) {
            // calling the Number() function here because the .value is a string and needs
            // to be an int to be compared accurately
            if (isMin && Number(opposingEntryBox.value) <= val) {
                warningObj.innerHTML = '&#9888; Please enter a number that is smaller than your maximum number.';
                warningObj.style.opacity = 1;
            } else if (!isMin && Number(opposingEntryBox.value) >= val) {
                warningObj.innerHTML = '&#9888; Please enter a number that is larger than your maximum number.';
                warningObj.style.opacity = 1;
            } else {
                warningObj.style.opacity = 0;
                // checking for the presence of 'than' in the opposing entry boxes warning tag
                // because if the code has reached here, it means that both entry boxes have
                // the correct smaller or greater values and both warnings can be removed.
                // The warnings telling the user to enter a smaller or greater value are the
                // only ones with 'than' in them.
                if (opposingWarningObj.innerHTML.indexOf('than') !== -1) {
                    opposingWarningObj.style.opacity = 0;
                }
            }
        } else {
            warningObj.style.opacity = 0;
        }
    } else if (warningObj.style.opacity) {
        warningObj.style.opacity = 0;
    }

    checkOpacityOfSubmit();
}

// function checks whether to enable or disable the submit button based on if all
// entryBoxes have values and if there are no warnings
function checkOpacityOfSubmit() {
    const allBoxesFull = multiplierMin.value && multiplierMax.value && multiplicandMin.value 
        && multiplicandMax.value;
    const noWarnings = !Number(document.getElementById('multiplierMinWarning').style.opacity) &&
        !Number(document.getElementById('multiplierMaxWarning').style.opacity) &&
        !Number(document.getElementById('multiplicandMinWarning').style.opacity) &&
        !Number(document.getElementById('multiplicandMaxWarning').style.opacity);
    submitBtn.style.opacity = allBoxesFull && noWarnings ? 1 : 0;
    submitBtn.tabIndex = allBoxesFull && noWarnings ? 0 : -1;
    submitBtn.style.pointerEvents = allBoxesFull && noWarnings ? 'auto' : 'none';
}

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

// When the submit button is clicked we want to hide it and completely disable it
// and also set all entry box values back to nothing
submitBtn.addEventListener('click', function() {
    createTable(Number(multiplierMin.value), Number(multiplierMax.value), 
        Number(multiplicandMin.value), Number(multiplicandMax.value));

    multiplierMin.value = '';
    multiplierMax.value = '';
    multiplicandMin.value = '';
    multiplicandMax.value = '';

    submitBtn.style.opacity = 0;
    submitBtn.tabIndex = -1;
    submitBtn.style.pointerEvents = 'none';
});




