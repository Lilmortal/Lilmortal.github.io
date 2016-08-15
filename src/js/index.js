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

	function getPosition(el) {
		var xPos = 0;
		var yPos = 0;

		while (el) {
			if (el.tagName == "BODY") {
				// deal with browser quirks with body/window/document and page scroll
				var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
				var yScroll = el.scrollTop || document.documentElement.scrollTop;

				xPos += (el.offsetLeft - xScroll + el.clientLeft);
				yPos += (el.offsetTop - yScroll + el.clientTop);
			} else {
				// for all other non-BODY elements
				xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
				yPos += (el.offsetTop - el.scrollTop + el.clientTop);
			}
			el = el.offsetParent;
		}

		return {
			x: xPos,
			y: yPos
		};
	}

	var IS_NUMERIC = new RegExp(/^\d+$/);

	var enableElement = function(element) {
		element.style.display = 'flex';
	}

	var disableElement = function(element) {
		element.style.display = 'none';
	}

	var addClass = function(element, className) {
		element.classList.add(className);
	}

	var removeClass = function(element, className) {
  			element.classList.remove(className);
  			// weird hack rule - https://css-tricks.com/restart-css-animation/
  			void element.offsetWidth;		
	}

	var toggleClass = function(element, className) {
		if (element.classList.contains(className)) {
			removeClass(element, className);
  		}
  		addClass(element, className);
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
  		for (var i = 0; i < element.length; i++) {
  			element[i].style.display = 'block';
  		}
  	}

  	var restartSlider = function(element, image) {
  		restartPanel(element);
  		restartImages(image);
  	}

  	var slider = function(element, panel) {
  	    element.style.marginLeft = '0';
	    element.style.transition = '10s linear';
  	    
	    // this animation is not working for some reason
  	    //toggleClass(element, 'slider_animation');

	    var points = document.getElementsByClassName('points')[0];
		var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	    var defaultWidth = (screenWidth - panel.offsetWidth/ 2) + panel.offsetWidth;
	    var warningWidth = defaultWidth * 45 / 100;
	    var errorWidth = defaultWidth * 30 / 100;
	    var timer;
	    var startWarningAnimation = false;
	    var startErrorAnimation = false;
	    
    	panel.style.border = '5px double gold';
  		removeClass(points, 'red_text_animation');
  		addClass(panel, 'normal_animation');

	    timer = setInterval(function() {
	    	if (getPosition(element).x <= warningWidth) {
	    		if (!startWarningAnimation) {
	    			removeClass(panel, 'normal_animation');
	    			addClass(panel, 'warning_animation');
	    			startWarningAnimation = true;
	    		}
	    	}
	    	if (getPosition(element).x <= errorWidth) {
	    		if (!startErrorAnimation) {
	    			panel.style.border = '5px double #8B0000';
	    			removeClass(panel, 'warning_animation');
	    			addClass(points, 'red_text_animation');
	    			addClass(panel, 'error_animation');
	    			startErrorAnimation = true;
	    		}
	    	}
	    }, 1000);
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
	var sliderParent = document.getElementsByClassName('images_area')[0];
	var wrapper = document.getElementsByClassName('wrapper')[0];
	var addPoints = document.getElementsByClassName('addPoints')[0];

  	var start_button = document.getElementById('start_button');
  	start_button.onclick = function() {
  		toggleClass(wrapper, 'grayscale_background_animation');
    	disableElement(instruction_panel);
    	enableElement(countdown_panel);
  		startCountdown(countdown_panel, 3, function() {
  			slider(images, sliderParent);
  			transitionEnd(images, function() {
  				enableElement(failPanel);
  			})
  		});
  	}

  	var tryAgainButton = document.getElementById('tryAgainButton');
  	tryAgainButton.onclick = function() {
  		toggleClass(wrapper, 'grayscale_background_animation');
  		disableElement(failPanel);
  		enableElement(countdown_panel);
  		restartSlider(images, image);
  		startCountdown(countdown_panel, 3, function() {
			slider(images, sliderParent);
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
  			addPoints.innerHTML = "+200";
  			toggleClass(addPoints, 'add_points_animation');
  		}
  	}

  	var how_to_play_link = document.getElementById('how_to_play_link');
  	how_to_play_link.onclick = function() {
		enableElement(instruction_panel);
  	};

  	// For testing purposes
  	var hideInstructionAndCountdownPanel = function() {
	  	countdown_panel.style.display = 'none';
	  	var instruction = document.getElementsByClassName('instruction')[0];
	  	instruction.style.display = 'none';		
  	}

  	//hideInstructionAndCountdownPanel();
  	//enableElement(failPanel);
})();