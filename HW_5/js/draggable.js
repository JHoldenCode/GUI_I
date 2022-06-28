import tileStructure from "../json/tileStructure.json" assert { type: "json" };

const leftPoint = 820;
const letterWidth = 59.5;
const spacingBetween = 10;

var lettersLeft = 100;
var draggableArr = [];
var saveOGTileNums = [];
var draggableOpts = {
    revert:  function(dropZone) {
        var validDropZone = dropZone && dropZone[0].className.indexOf("scrabbleTile") !== -1;
        return !validDropZone;
    }
}

function initializeLetterSpaces() {
    var playerRack = $("#playerRack")[0];
    for (let i = 0; i < 7; i++) {
        // positioning, initialization
        var newLetter = document.createElement('div');
        newLetter.classList.add("rackLetter");
        newLetter.id = "letter" + i;
        newLetter.style.right = String(leftPoint - i * (spacingBetween + letterWidth)) + "px";

        getRandomLetter(newLetter);

        playerRack.appendChild(newLetter);
        draggableArr.push(newLetter);
    }
    $(".rackLetter").draggable(draggableOpts);
}

function sumJS(arr) {
    let sum = 0;
    for (let i = 0; i < tileStructure.tiles.length; i++) {
        sum += tileStructure.tiles[i].numLeft;
    }
    return sum;
}

function getRandomLetter(letter) {
    if (lettersLeft <= 0) {
        letter.style.backgroundImage = null;
        return;
    }
    var tileArr = tileStructure.tiles;
    var selectedLetterIndex = Math.round(Math.random() * (lettersLeft - 1));
    var correlatedLetterIndex = 0;
    var currentIndex = tileArr[correlatedLetterIndex].numLeft - 1;
    while (currentIndex < selectedLetterIndex || tileArr[correlatedLetterIndex].numLeft <= 0) {
        correlatedLetterIndex++;
        currentIndex += tileArr[correlatedLetterIndex].numLeft;
    }

    const selectedLetter = tileArr[correlatedLetterIndex].letter;
    const imgURL = "url(HW_5/imgs/letters/Scrabble_Tile_" + selectedLetter + ".jpg)";
    letter.style.backgroundImage = imgURL;
    letter.points = tileArr[correlatedLetterIndex].points;

    lettersLeft--;
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
        rackLetterHandler(true);
        resetDraggableElements();
        resetDroppableElements();
        $("#score").html(0);
        $("#lettersLeftVal").html(lettersLeft);
    });

    $("#resetWord")[0].addEventListener('click', () => {
        resetDraggableElements();
        resetDroppableElements();
        for (let i = 0; i < draggableArr.length; i++) {
            draggableArr[i].style.inset = null;
            draggableArr[i].style.right = String(leftPoint - i * (spacingBetween + letterWidth)) + "px";
            draggableArr[i].style.bottom = "95px";
        }
    })
}

function scoringHandler() {
    var score = calculateScore();
    $("#score").html(Number($("#score").html()) + score);
    if (Number($("#score").html()) > Number($("#highScore").html())) {
        $("#highScore").html($("#score").html());
    }
}

function rackLetterHandler(reset = false) {
    for (let i = 0; i < draggableArr.length; i++) {
        if ($("#letter" + i).draggable("option", "disabled") || reset) {
            draggableArr[i].style.opacity = 0;
            draggableArr[i].style.inset = null;
            draggableArr[i].style.right = String(leftPoint - i * (spacingBetween + letterWidth)) + "px";
            draggableArr[i].style.bottom = "95px";
            getRandomLetter(draggableArr[i]);
            draggableArr[i].style.opacity = 1;
        }
    }
}

function resetDraggableElements() {
    $("#playWord")[0].classList.remove("enabled");
    $("#playWord")[0].style.opacity = 0.5;
    $("#resetWord")[0].classList.remove("enabled");
    $("#resetWord")[0].style.opacity = 0.5;
    for (let i = 0; i < draggableArr.length; i++) {
        $("#letter" + i).draggable("enable");
    }
}

function resetJSON() {
    for (let i = 0; i < tileStructure.tiles.length; i++) {
        const letterObj = {...saveOGTileNums[i]};
        tileStructure.tiles[i].numLeft = letterObj.numLeft;
    }
}

function saveJSON() {
    for (let i = 0; i < tileStructure.tiles.length; i++) {
        const letterObj = tileStructure.tiles[i];
        saveOGTileNums[i] = {...letterObj};
    }
}

$(function() {
    saveJSON();
    initializeLetterSpaces();
    addButtonListeners();
})