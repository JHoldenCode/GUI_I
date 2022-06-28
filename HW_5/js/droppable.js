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

        $(this).addClass("full");
        newLetterAdded(Number(this.id.substring(4)), ui.draggable[0].points);
        ui.draggable.draggable("disable");
    },
    accept: function(draggable) {
        return !$(this).hasClass("full") && !$(this).hasClass("closed");
    }
}

function initializeDropZones() {
    const midPointIndex = 7;
    const midPoint = 612.5;
    const spacingBetween = 59.7;
    var scrabbleBoard = $("#scrabbleBoard")[0];
    for (let i = 0; i < 15; i++) {
        var newZone = document.createElement('div');

        newZone.classList.add("scrabbleTile", "open");
        if (i === 2 || i === 12) {
            newZone.classList.add("DW");
        } else if (i === 6 || i === 8) {
            newZone.classList.add("DL");
        } else {
            newZone.classList.add("NONE");
        }

        newZone.id = "tile" + i;
        newZone.style.right = String((midPointIndex - i) * spacingBetween + midPoint) + "px";
        scrabbleBoard.appendChild(newZone);
        droppableArr.push(newZone);
    }
    $(".scrabbleTile").droppable(droppableOpts);
}

function toggleDroppableState(toClosed, index) {
    const removeClass = toClosed ? "open" : "closed";
    const addClass = toClosed ? "closed" : "open";
    if (droppableArr[index] && !checkForClass(droppableArr[index].classList, "full")) {
        droppableArr[index].classList.remove(removeClass);
        droppableArr[index].classList.add(addClass);
    }
}

function newLetterAdded(index, points) {
    if (!letterAdded) {
        for (let i = 0; i < droppableArr.length; i++) {
            toggleDroppableState(true, i);
        }
        $("#playWord")[0].style.opacity = 1;
        $("#playWord")[0].classList.add("enabled");
    }
    droppableArr[index].points = points;
    letterAdded = true;
    toggleDroppableState(false, index - 1);
    toggleDroppableState(false, index + 1);
}

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

function resetDroppableElements() {
    letterAdded = false;
    for (let i = 0; i < droppableArr.length; i++) {
        droppableArr[i].classList.remove("closed", "full");
        droppableArr[i].classList.add("open");
    }
}

$(function() {
    initializeDropZones();
})