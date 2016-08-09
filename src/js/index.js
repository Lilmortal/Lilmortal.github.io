"use strict";

(function() {
	var IS_NUMERIC = new RegExp(/^\d+$/);

  	var isVisible = function(display) {  
    	if (display !== 'none' && display !== 'undefined') {
      		return true;
    	} else {
      		return false;
    	}
  	}
	var togglePanel =  function(element) {
	    var display = window.getComputedStyle(element,null).getPropertyValue("display");
	    if (isVisible(display)) {
	      	element.style.display = 'none';
	    } else {
	      	element.style.display = 'flex';
	    }
	}

  	var checkIfUserInputIsValid = function(element) {
  		if (element.classList.contains('shake_textfield')) {
  			element.classList.remove('shake_textfield');
  			// weird hack rule - https://css-tricks.com/restart-css-animation/
  			void element.offsetWidth;
  		}
		var value = element.value;
		if (IS_NUMERIC.test(value)) {
			return true;
		} else {
			element.classList.add('shake_textfield');
			return false;
  		}
  	}
  
  	var start_button = document.getElementById('start_button');
  	start_button.onclick = function() {
    	togglePanel(start_button.parentElement);
  	}

  	var submit_textfield = document.getElementById('submit_user_input');
  	var submit_button = document.getElementById('submit_button');
  	submit_button.onclick = function() {
  		checkIfUserInputIsValid(submit_textfield);
  	}
})();