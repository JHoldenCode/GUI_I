// File: tabs.js
// GUI Assignment: Adding jQuery to Dynamic Multiplication Table Part 2
// Jack Holden, UMass Lowell Computer Science, John_Holden@student.uml.edu
// Copyright (c) 2021 by Jack. All rights reserved. 

// this function is called when the script is loaded and initializes the tab div
(function($){
    $("#myTabs").tabs();
})(jQuery);

// this function uses the data of the current table in the scrollable table div
// and stores it into a new tab
function addTableToTabs() {
    // get the current table
    var tableArea = document.getElementById('scrollableTable');
    var table = tableArea.firstChild;

    tableArea.removeChild(tableArea.firstChild);

    // use the id of the previous table to create the id of the new table
    // the substring function gets just the number at the end of the previous
    // If there are no previous tabs, the table id is just set to Table1
    const numTabs = $("#myTabs >ul >li").size();
    var tableID = numTabs > 0 ? "Table" + (Number($("#myTabs")[0].children[numTabs].id.substring(5)) + 1) : 'Table1';

    // creates the list item that is used to link the tab to the table
    var newLI = document.createElement('li');
    var newLink = document.createElement('a');
    newLink.href = "#" + tableID;
    newLink.innerHTML = tableID;
    newLI.appendChild(newLink);

    $("#myTabs")[0].children[0].appendChild(newLI);

    var tableContainer = document.createElement('div');
    tableContainer.id = tableID;

    // creates the label at the top of each tab that shows the ranges of each table
    var dimensionLabel = document.createElement('h3');
    dimensionLabel.innerHTML = '(' + $("#multiplierMin").val() + ' to ' + $("#multiplierMax").val() + ') x ('
                            + $("#multiplicandMin").val() + ' to ' + $("#multiplicandMax").val() + ')';
    tableContainer.appendChild(dimensionLabel);

    tableContainer.appendChild(table);
    $("#myTabs")[0].appendChild(tableContainer);

    // creates the button that, when clicked, signifies to delete a tab
    // every tab's delete button is initialized to be a 'KEEP' button
    // clicking it switches it's state
    var deleteBtn = document.createElement('button');
    deleteBtn.class = 'keepButton';
    deleteBtn.id = tableID + 'Button';
    deleteBtn.innerHTML = 'KEEP';
    deleteBtn.style.backgroundColor = 'lightGreen';
    deleteBtn.addEventListener('click', () => {
        if (deleteBtn.class === 'deleteButton') {
            deleteBtn.class = 'keepButton';
            deleteBtn.innerHTML = 'KEEP';
            deleteBtn.style.backgroundColor = 'lightGreen';
        } else {
            deleteBtn.class = 'deleteButton';
            deleteBtn.innerHTML = 'DELETE';
            deleteBtn.style.backgroundColor = 'red';
        }
    })
    tableContainer.appendChild(deleteBtn);

    // the dynamic way of adding tabs was not working for me, so I add
    // them manually and then call this function to add all necessary
    // classes to my list items and divs
    $('#myTabs').tabs('refresh');
}

// deletes tabs based off of the table id of the signified tabs
$("#deleteTabs")[0].addEventListener('click', () => {
    // start from the index of the greatest tab so that we don't accidentally
    // skip over any tabs if they are deleted
    // end at 1 so that we don't delete the ul element in #myTabs
    for (var i = $("#myTabs >ul >li").size(); i >= 1; i--) {
        if ($("#myTabs")[0].children[i].lastChild.innerHTML === 'DELETE') {
            // remove li item
            $("#myTabs")[0].removeChild($("#myTabs")[0].children[i]);
            // remove tab data (div item)
            $("#myTabs")[0].children[0].removeChild($("#myTabs")[0].children[0].children[i - 1]);
        }
    }
})