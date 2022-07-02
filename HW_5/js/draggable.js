// File: draggable.js
// GUI Assignment: Recreating Scrabble
// Jack Holden, UMass Lowell Computer Science, John_Holden@student.uml.edu
// Copyright (c) 2021 by Jack. All rights reserved. 

// tile structure includes the points associated with each letter and how many
// of each letter are left
import tileStructure from "../json/tileStructure.json" assert { type: "json" };

// constants used to position the letter tile draggables.
const leftPoint = 400;
const letterWidth = 59.5;
const spacingBetween = 10;

var lettersLeft = 100;
var draggableArr = [];

// used to restore the json values after a reset
var saveOGTileNums = [];
var draggableOpts = {
    revert:  function(dropZone) {
        var validDropZone = dropZone && dropZone[0].className.indexOf("scrabbleTile") !== -1;
        return !validDropZone;
    }
}

function initializeLetterSpaces() {
    const largerScreenSizePadding = screen.width > 1280 ? (screen.width - 1280) / 2 : 0;
    var playerRack = $("#playerRack")[0];
    for (let i = 0; i < 7; i++) {
        // positioning, initialization
        var newLetter = document.createElement('div');
        newLetter.classList.add("rackLetter");
        newLetter.id = "letter" + i;
        newLetter.style.left = String(leftPoint + i * (spacingBetween + letterWidth) + largerScreenSizePadding) + "px";

        getRandomLetter(newLetter);

        playerRack.appendChild(newLetter);
        draggableArr.push(newLetter);
    }
    $(".rackLetter").draggable(draggableOpts);
}

function getRandomLetter(letter) {
    // if there are no more letters left, make them inactive and invisible
    if (lettersLeft <= 0) {
        letter.style.backgroundImage = null;
        $(letter.id).draggable("disable");
        draggableArr[Number(letter.id.substring(6))].classList.add("invisible");
        return;
    }
    var tileArr = tileStructure.tiles;
    // an index (initially 0 to 99) that represents the index of the JSON object
    // that we use to retrieve a random letter
    var selectedLetterIndex = Math.round(Math.random() * (lettersLeft - 1));
    // represents a letter: 0: A, 1: B...
    var correlatedLetterIndex = 0;
    // this algorithm parses through the JSON object like an aray in order to find the letter
    // associated with the randomly selected index
    var currentIndex = tileArr[correlatedLetterIndex].numLeft - 1;
    while (currentIndex < selectedLetterIndex || tileArr[correlatedLetterIndex].numLeft <= 0) {
        correlatedLetterIndex++;
        currentIndex += tileArr[correlatedLetterIndex].numLeft;
    }

    const selectedLetter = tileArr[correlatedLetterIndex].letter;
    const imgURL = "url(./imgs/letters/Scrabble_Tile_" + selectedLetter + ".jpg)";
    letter.style.backgroundImage = imgURL;
    letter.points = tileArr[correlatedLetterIndex].points;

    lettersLeft--;
    // modifys JSON
    tileArr[correlatedLetterIndex].numLeft--;
}

function addButtonListeners() {
    $("#playWord")[0].addEventListener('click', () => {
        if (checkForClass($("#playWord")[0].classList, "enabled")) {
            scoringHandler();
            rackLetterHandler();
            resetDraggableElements();
            resetDroppableElements();

            // update letters left
            $("#lettersLeftVal").html(lettersLeft);
        }
    });

    $("#restart")[0].addEventListener('click', () => {
        lettersLeft = 100;
        resetJSON();
        // the 'true' argument in these function calls bypasses some conditionals
        // that are not relevant when completely resetting the game
        rackLetterHandler(true);
        resetDraggableElements(true);
        resetDroppableElements();
        // reset score and letters left
        $("#score").html(0);
        $("#lettersLeftVal").html(lettersLeft);
    });

    $("#resetWord")[0].addEventListener('click', () => {
        resetDraggableElements();
        resetDroppableElements();
        const largerScreenSizePadding = screen.width > 1280 ? (screen.width - 1280) / 2 : 0;
        for (let i = 0; i < draggableArr.length; i++) {
            draggableArr[i].style.inset = null;
            draggableArr[i].style.left = String(leftPoint + i * (spacingBetween + letterWidth) + largerScreenSizePadding) + "px";
            draggableArr[i].style.top = "430px";
        }
    })
}

// increases score based on the score of the submitted word and updates high score
// accordingly
function scoringHandler() {
    var score = calculateScore();
    $("#score").html(Number($("#score").html()) + score);
    if (Number($("#score").html()) > Number($("#highScore").html())) {
        $("#highScore").html($("#score").html());
    }
}

// sends all played letter tiles back to their correct spot on the player rack
// and resets their states
function rackLetterHandler(reset = false) {
    const largerScreenSizePadding = screen.width > 1280 ? (screen.width - 1280) / 2 : 0;
    for (let i = 0; i < draggableArr.length; i++) {
        if ($("#letter" + i).draggable("option", "disabled") || reset) {
            draggableArr[i].style.opacity = 0;
            // this line resets the css change made by the animate function in the
            // droppableOpts drop function
            draggableArr[i].style.inset = null;
            draggableArr[i].style.left = String(leftPoint + i * (spacingBetween + letterWidth) + largerScreenSizePadding) + "px";
            draggableArr[i].style.top = "430px";
            getRandomLetter(draggableArr[i]);
            draggableArr[i].style.opacity = 1;
        }
    }
}

// resets button states and the class of draggable elements
function resetDraggableElements(restartGame = false) {
    $("#playWord")[0].classList.remove("enabled");
    $("#playWord")[0].style.opacity = 0.5;
    $("#resetWord")[0].classList.remove("enabled");
    $("#resetWord")[0].style.opacity = 0.5;
    for (let i = 0; i < draggableArr.length; i++) {
        if (!checkForClass($("#letter" + i)[0].classList, "invisible") || restartGame) {
            $("#letter" + i).draggable("enable");
        }
    }
}

// reverts JSON structure back to original state using saved deep copy after a restart
function resetJSON() {
    for (let i = 0; i < tileStructure.tiles.length; i++) {
        const letterObj = {...saveOGTileNums[i]};
        tileStructure.tiles[i].numLeft = letterObj.numLeft;
    }
}

// stores a deep copy of the json into saveOGTileNums
function saveJSON() {
    for (let i = 0; i < tileStructure.tiles.length; i++) {
        const letterObj = tileStructure.tiles[i];
        saveOGTileNums[i] = {...letterObj};
    }
}

// called on load
$(function() {
    saveJSON();
    initializeLetterSpaces();
    addButtonListeners();
})