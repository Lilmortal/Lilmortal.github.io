"use strict";

(function() {
	function whichTransitionEvent(){
	  var t,
	      el = document.createElement("fakeelement");

	  var transitions = {
	    "transition"      : "transitionend",
	    "OTransition"     : "oTransitionEnd",
	    "MozTransition"   : "transitionend",
	    "WebkitTransition": "webkitTransitionEnd"
	  }

	  for (t in transitions){
	    if (el.style[t] !== undefined){
	      return transitions[t];
	    }
	  }
	}

	var IS_NUMERIC = new RegExp(/^\d+$/);

	var enableElement = function(element) {
		element.style.display = 'flex';
	}

	var disableElement = function(element) {
		element.style.display = 'none';
	}

	var toggleClass = function(element, className) {
		if (element.classList.contains(className)) {
  			element.classList.remove(className);
  			// weird hack rule - https://css-tricks.com/restart-css-animation/
  			void element.offsetWidth;
  		}
  		element.classList.add(className);
	}

  	var startCountdown = function(element, value, callback) {
  		element.innerHTML = "";
    	var countDownTimer = setInterval(function() {
      		if (value === 0) {
        		clearInterval(countDownTimer);
        		disableElement(element);
        		callback();
      		}
      		element.innerHTML = value--;
    	}, 1000);
  	}

  	var checkIfUserInputIsValid = function(element) {
		var value = element.value;
		if (IS_NUMERIC.test(value)) {
			return true;
		} else {
			toggleClass(element, 'shake_textfield');
			return false;
  		}
  	}

  	var restartPanel = function(element) {
  		element.style.marginLeft = '100%';
  		element.style.transition = '0s';
  	}

  	var restartImages = function(element) {
  		console.log("ELement: " + element);
  		for (var i = 0; i < element.length; i++) {
  			console.log(element[i]);
  			element[i].style.display = 'block';
  		}
  	}

  	var restartSlider = function(element, image) {
  		restartPanel(element);
  		restartImages(image);
  	}

  	var slider = function(element) {
  	    element.style.marginLeft = '0';
	    element.style.transition = '3s linear';
  	}

  	var transitionEnd = function(element, callback) {
	    var transitionEvent = whichTransitionEvent();
	    element.addEventListener(transitionEvent, callback);
  	}

  	// =======================================================

    var countdown_panel = document.getElementById('countdown_panel');
	var image = document.getElementsByClassName('image');
  	var submit_textfield = document.getElementById('submit_user_input');
  	var instruction_panel = document.getElementsByClassName('instruction')[0];
	var images = document.getElementsByClassName('images')[0];
	var points = document.getElementsByClassName('points')[0];
	var failPanel = document.getElementsByClassName('failBackground')[0];
	
	var wrapper = document.getElementsByClassName('wrapper')[0];

  	var start_button = document.getElementById('start_button');
  	start_button.onclick = function() {
  		toggleClass(wrapper, 'grayscale_background');
    	disableElement(instruction_panel);
    	enableElement(countdown_panel);
  		startCountdown(countdown_panel, 3, function() {
  			slider(images);
  			transitionEnd(images, function() {
  				enableElement(failPanel);
  			})
  		});
  	}

  	var tryAgainButton = document.getElementById('tryAgainButton');
  	tryAgainButton.onclick = function() {
  		toggleClass(wrapper, 'grayscale_background');
  		disableElement(failPanel);
  		enableElement(countdown_panel);
  		restartSlider(images, image);
  		startCountdown(countdown_panel, 3, function() {
			slider(images);
  			transitionEnd(images, function() {
  				enableElement(failPanel);
  			});
  		});
  	}

	var imageIteration = 0;
  	var submit_button = document.getElementById('submit_button');
  	submit_button.onclick = function() {
  		if (!checkIfUserInputIsValid(submit_textfield)) {
  			disableElement(image[imageIteration]);
  			imageIteration++;
  		}
  	}

  	var how_to_play_link = document.getElementById('how_to_play_link');
  	how_to_play_link.onclick = function() {
		enableElement(instruction_panel);
  	};

  	var hide = function() {
	  	countdown_panel.style.display = 'none';
	  	var instruction = document.getElementsByClassName('instruction')[0];
	  	instruction.style.display = 'none';		
  	}

  	//hide();
  	//disableElement(failPanel);
  	//enableElement(failPanel);
})();