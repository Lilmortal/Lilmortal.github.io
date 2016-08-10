"use strict";

(function() {
	var IS_NUMERIC = new RegExp(/^\d+$/);

	var modifyElementDisplay = function(element, display) {
		element.style.display = display;
	}

  	var startCountdown = function(element, value) {
    	var countDownTimer = setInterval(function() {
      		if (value === 0) {
        		clearInterval(countDownTimer);
        		modifyElementDisplay(element, 'none');
      		}
      		element.innerHTML = value--;
    	}, 1000);
  	}

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
	      	modifyElementDisplay(element, 'none');
	    } else {
	      	modifyElementDisplay(element, 'flex');
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
  
  	// =======================================================

    var countdown_panel = document.getElementById('countdown_panel');

  	var start_button = document.getElementById('start_button');
  	start_button.onclick = function() {
    	togglePanel(start_button.parentElement);
    	modifyElementDisplay(countdown_panel, 'flex');
  		startCountdown(countdown_panel, 3);
  	}

  	var submit_textfield = document.getElementById('submit_user_input');
  	var submit_button = document.getElementById('submit_button');
  	submit_button.onclick = function() {
  		checkIfUserInputIsValid(submit_textfield);
  	}


})();