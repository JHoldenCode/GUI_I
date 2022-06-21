/* File: validateForm.js
GUI Assignment: Adding jQuery to Dynamic Multiplication Table Part 2
Jack Holden, UMass Lowell Computer Science, John_Holden@student.uml.edu
Copyright (c) 2021 by Jack. All rights reserved.  */

// Once the entire document has loaded we can start to validate the form
$().ready(function() {
    $("#numberForm").validate({
        // every field is required and must be a number
        // the minimum and maximum values depend on the values enetered in
        // their opposing entry boxes
        rules: {
            multiplierMin: {
                required: true,
                number: true,
                min: -50,
                // each function for min and max in this file is the same with the
                // exception of which entry box they are checking against and whether
                // the default value should be -50 or 50
                max: function() {
                    const opposingVal = Number($("#multiplierMax").val());
                    return opposingVal && opposingVal <= 50 && opposingVal >= -50 ? opposingVal : 50;
                },
            },
            multiplierMax: {
                required: true,
                number: true,
                // if the opposing entry box has a value that is in the valid range [-50,50],
                // set the opposing entry boxes bound to be that values, else use the default val
                min: function() {
                    const opposingVal = Number($("#multiplierMin").val());
                    return opposingVal && opposingVal >= -50 && opposingVal <= 50 ? opposingVal : -50;
                },
                max: 50
            },
            multiplicandMin: {
                required: true,
                number: true,
                min: -50,
                max: function() {
                    const opposingVal = Number($("#multiplicandMax").val());
                    return opposingVal && opposingVal <= 50 && opposingVal >= -50 ? opposingVal : 50;
                },
            },
            multiplicandMax: {
                required: true,
                number: true,
                min: function() {
                    const opposingVal = Number($("#multiplicandMin").val());
                    return opposingVal && opposingVal >= -50 && opposingVal <= 50 ? opposingVal : -50;
                },
                max: 50
            }
        },
        // the errors are ordered in such a way so that the user will solve the most "dire"
        // issues first. The severity of the issue was determined by me, but it starts off with
        // notifying the user that every field is required, then ensuring that a number was entered,
        // then lastly, making sure the number is in the correct range. Each error check is a 
        // prerequisite for the next
        messages: {
            multiplierMin: {
                required: "<br/>&#9888; A minimum multiplier value is required",
                number: "<br/>&#9888; Please enter a whole number",
                min: "<br/>&#9888; Your minimum value must at least -50",
                max: "<br/>&#9888; Your minimum value must be less than your multiplier max and 50"
            },
            multiplierMax: {
                required: "<br/>&#9888; A maximum multiplier value is required",
                number: "<br/>&#9888; Please enter a whole number",
                min: "<br/>&#9888; Your maximum value must be greater than -50 and your multiplier min",
                max: "<br/>&#9888; Your maximum value must be at most 50"
            },
            multiplicandMin: {
                required: "<br/>&#9888; A minimum multiplicand value is required",
                number: "<br/>&#9888; Please enter a whole number",
                min: "<br/>&#9888; Your minimum value must be at least -50",
                max: "<br/>&#9888; Your minimum value must be less than your multiplicand max and 50"
            },
            multiplicandMax: {
                required: "<br/>&#9888; A maximum multiplicand value is required",
                number: "<br/>&#9888; Please enter a whole number",
                min: "<br/>&#9888; Your maximum value must be greater than -50 and your multiplicand min",
                max: "<br/>&#9888; Your maximum value must be at most 50"
            }
        }
    })

    // This function allows a pair of entry boxes to update their errors together instead of having
    // to move the focus back on the original entry box to update it
    function updateSibling(jqueryElement) {
        jqueryElement.focus();
        jqueryElement.blur();
    }

    // binds the slider value to a change in the form fields
    function updateSlider(slider, val) {
        slider.slider("value", val);
    }

    // binds each slider to the entry box values and dynamically creates the table
    // based off changes in the entry boxes
    $("#multiplierMin").change(function() {
        updateSibling($("#multiplierMax"));
        updateSlider($("#multiplierMinSlider"), $("#multiplierMin").val());
        createTableIfValid();
    });

    $("#multiplierMax").change(function() {
        updateSibling($("#multiplierMin"));
        updateSlider($("#multiplierMaxSlider"), $("#multiplierMax").val());
        createTableIfValid();
    });

    $("#multiplicandMin").change(function() {
        updateSibling($("#multiplicandMax"));
        updateSlider($("#multiplicandMinSlider"), $("#multiplicandMin").val());
        createTableIfValid();
    });

    $("#multiplicandMax").change(function() {
        updateSibling($("#multiplicandMin"));
        updateSlider($("#multiplicandMaxSlider"), $("#multiplicandMax").val());
        createTableIfValid();
    });
});