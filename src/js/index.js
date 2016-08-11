"use strict";

(function() {
	var IS_NUMERIC = new RegExp(/^\d+$/);

	var modifyElementDisplay = function(element, display) {
		element.style.display = display;
	}

  	var startCountdown = function(element, value, callback) {
  		var body = document.getElementsByTagName('body')[0];
  		//body.style.webkitFilter = 'grayscale(100%) blur(3px)';
  		//element.style.webkitFilter = 'grayscale(0%) blur(0px)';
    	var countDownTimer = setInterval(function() {
      		if (value === 0) {
        		clearInterval(countDownTimer);
        		modifyElementDisplay(element, 'none');
        		element.innerHTML = "";
        		callback();
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

	var togglePanel = function(element) {
	    var display = element.style.display;
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

  	var slider = function(element) {
  		console.log(element.style);
  	    element.style.transform = 'translate(-100%)';
	    element.style.transition = 'transform 5s linear';
	    //element.style.marginRight = '100%';
	    //element.style.transition = '3s';
  	}

  	var destroy = function(image) {
  		image.classList.add('destroy');
  	}

  	// =======================================================

    var countdown_panel = document.getElementById('countdown_panel');
	var image = document.getElementsByClassName('image');
  	var submit_textfield = document.getElementById('submit_user_input');
  	var instruction_panel = document.getElementsByClassName('instruction')[0];
	var images = document.getElementsByClassName('images')[0];
	var points = document.getElementsByClassName('points')[0];

  	var start_button = document.getElementById('start_button');
  	start_button.onclick = function() {
    	togglePanel(instruction_panel);
    	modifyElementDisplay(countdown_panel, 'flex');
  		startCountdown(countdown_panel, 3, function() {
  			slider(images);
  			//destroy(points);
  		});
  	}

	//slider(images);

	var imageIteration = 0;
  	var submit_button = document.getElementById('submit_button');
  	submit_button.onclick = function() {
  		if (!checkIfUserInputIsValid(submit_textfield)) {
  			destroy(image[imageIteration]);
  			imageIteration++;
  		}
  	}

  	var how_to_play_link = document.getElementById('how_to_play_link');
  	how_to_play_link.onclick = function() {
		togglePanel(instruction_panel);
  	};

  	var hide = function() {
	  	countdown_panel.style.display = 'none';
	  	var instruction = document.getElementsByClassName('instruction')[0];
	  	instruction.style.display = 'none';		
  	}

  	var hideFailPanel = function() {
  		var failPanel = document.getElementsByClassName('failPanel')[0];
  		failPanel.style.display = 'none';
  	}

  	hide();
  	hideFailPanel();
})();