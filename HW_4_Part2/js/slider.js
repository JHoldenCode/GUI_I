// File: slider.js
// GUI Assignment: Adding jQuery to Dynamic Multiplication Table Part 2
// Jack Holden, UMass Lowell Computer Science, John_Holden@student.uml.edu
// Copyright (c) 2021 by Jack. All rights reserved. 

// returns the correct slider options based on the id of the corresponding form field
// the slide functions links each slider to its corresponding entry box and updates
// that box when the slider moves
function getSliderOpts(formId) {
    return {
        animate: true,
        min: -50,
        max: 50,
        slide: function() {
            document.forms['numberForm'].elements[formId].value = $("#" + formId + "Slider").slider("option", "value");
            createTableIfValid();
        }
    }
}

(function($){
    $("#multiplierMinSlider").slider(getSliderOpts('multiplierMin'));
    $("#multiplierMaxSlider").slider(getSliderOpts('multiplierMax'));
    $("#multiplicandMinSlider").slider(getSliderOpts('multiplicandMin'));
    $("#multiplicandMaxSlider").slider(getSliderOpts('multiplicandMax'));
})(jQuery);