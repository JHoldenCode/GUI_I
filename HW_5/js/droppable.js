// File: droppable.js
// GUI Assignment: Recreating Scrabble
// Jack Holden, UMass Lowell Computer Science, John_Holden@student.uml.edu
// Copyright (c) 2021 by Jack. All rights reserved. 

// array to store the droppables of all board tiles for easy access
var droppableArr = [];
var letterAdded = false;
var droppableOpts = {
    // got this centering function from https://stackoverflow.com/questions/26589508/centering-draggable-elements-inside-droppable-using-jquery-ui
    drop: function(event, ui) {
        var drop_el = $(this).offset();
        var drag_el = ui.draggable.offset();
        var left_end = (drop_el.left + ($(this).width() / 2)) - (drag_el.left + (ui.draggable.width() / 2));
        var top_end = (drop_el.top + ($(this).height() / 2)) - (drag_el.top + (ui.draggable.height() / 2)) + 0.5;
        ui.draggable.animate({
          top: '+=' + top_end,
          left: '+=' + left_end
        });

        // on drop we want to change the states of the droppable and draggable so that
        // they cannot be moved or dropped on again
        $(this).addClass("full");
        newLetterAdded(Number(this.id.substring(4)), ui.draggable[0].points);
        ui.draggable.draggable("disable");
    },
    accept: function(draggable) {
        return !$(this).hasClass("full") && !$(this).hasClass("closed");
    }
}

function initializeDropZones() {
    // pixel measuring constants used to place droppables
    const midPointIndex = 7;
    const midPoint = 612.5;
    const spacingBetween = 59.7;
    const largerScreenSizePadding = screen.width > 1280 ? (screen.width - 1280) / 2 : 0;

    var scrabbleBoard = $("#scrabbleBoard")[0];
    for (let i = 0; i < 15; i++) {
        var newZone = document.createElement('div');

        // all dropzones start off as 'open' because the user can
        // place their first letter tile anywhere
        // add the special class distinctions for the double word and
        // double letter tiles
        newZone.classList.add("scrabbleTile", "open");
        if (i === 2 || i === 12) {
            newZone.classList.add("DW");
        } else if (i === 6 || i === 8) {
            newZone.classList.add("DL");
        } else {
            newZone.classList.add("NONE");
        }

        newZone.id = "tile" + i;
        newZone.style.left = String((i - midPointIndex) * spacingBetween + midPoint + largerScreenSizePadding) + "px";
        scrabbleBoard.appendChild(newZone);
        droppableArr.push(newZone);
    }
    $(".scrabbleTile").droppable(droppableOpts);
}

function toggleDroppableState(toClosed, index) {
    const removeClass = toClosed ? "open" : "closed";
    const addClass = toClosed ? "closed" : "open";
    // if the droppable is not full with a letter tile, its state
    // may be changed
    if (droppableArr[index] && !checkForClass(droppableArr[index].classList, "full")) {
        droppableArr[index].classList.remove(removeClass);
        droppableArr[index].classList.add(addClass);
    }
}

// when a new letter is added  for the first time all droppables are set to closed
// for the first time and every subsequent time after, the droppable at the index
// before and after the dropped index has their state toggled to open
function newLetterAdded(index, points) {
    if (!letterAdded) {
        for (let i = 0; i < droppableArr.length; i++) {
            toggleDroppableState(true, i);
        }
        $("#playWord")[0].style.opacity = 1;
        $("#playWord")[0].classList.add("enabled");
        $("#resetWord")[0].style.opacity = 1;
        $("#resetWord")[0].classList.add("enabled");
    }
    droppableArr[index].points = points;
    letterAdded = true;
    toggleDroppableState(false, index - 1);
    toggleDroppableState(false, index + 1);
}

// checks if a droppable has a class
function checkForClass(arr, className) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === className) {
            return true;
        }
    }
    return false;
}

function calculateScore() {
    var wordMultiplier = 1;
    var sum = 0
    for (let i = 0; i < droppableArr.length; i++) {
        if (checkForClass(droppableArr[i].classList, "full")) {
            // each double word multiplier the player covers with their word increases
            // the word multiplier by 2x. So a player covering 2 DW multipliers gets
            // their score quadrupled
            if (checkForClass(droppableArr[i].classList, "DW")) {
                wordMultiplier *= 2;
            }
            const letterMultiplier = checkForClass(droppableArr[i].classList, "DL") ? 2 : 1;
            sum += droppableArr[i].points * letterMultiplier;
        }
    }
    return sum * wordMultiplier;
}

// sets all droppables back to their initial state
function resetDroppableElements() {
    letterAdded = false;
    for (let i = 0; i < droppableArr.length; i++) {
        droppableArr[i].classList.remove("closed", "full");
        droppableArr[i].classList.add("open");
    }
}

// called on load
$(function() {
    initializeDropZones();
})