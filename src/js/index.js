"use strict";

(function() {
	var IS_NUMERIC = new RegExp(/^\d+$/);
	var COUNTDOWN_NUMBER = 3;

	// https://jonsuh.com/blog/detect-the-end-of-css-animations-and-transitions-with-javascript/
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

	// https://www.kirupa.com/html5/get_element_position_using_javascript.htm
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

  	function transitionEnd(element, callback) {
	    var transitionEvent = whichTransitionEvent();
	    element.addEventListener(transitionEvent, callback);
  	}

	function showElement(element) {
		element.style.display = 'flex';
	}

	function hideElement(element) {
		element.style.display = 'none';
	}

	function addClass(element, className) {
		element.classList.add(className);
	}

	function removeClass(element, className) {
		element.classList.remove(className);
		// weird hack rule - https://css-tricks.com/restart-css-animation/
		void element.offsetWidth;		
	}

	function toggleClass(element, className) {
		if (element.classList.contains(className)) {
			removeClass(element, className);
  		}
  		addClass(element, className);
	}

  	function checkIfUserInputIsValid(element) {
		if (IS_NUMERIC.test(element.value)) {
			return true;
		} else {
			toggleClass(element, 'shake_textfield_animation');
			return false;
  		}
  	}

	var Slider = function() {
		this.element = document.getElementsByClassName('images')[0];
		this.panel = document.getElementsByClassName('images_area')[0];
		this.failPanel = document.getElementsByClassName('failBackground')[0];
	}

	Slider.prototype.slide = function() {
  	    this.element.style.marginLeft = '0';
	    this.element.style.transition = '3s linear';
  	    
	    // this animation is not working for some reason
  	    //toggleClass(element, 'slider_animation');

	    /*var points = document.getElementsByClassName('points')[0];
		var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	    var defaultWidth = (screenWidth - this.panel.offsetWidth/ 2) + this.panel.offsetWidth;
	    var warningWidth = defaultWidth * 45 / 100;
	    var errorWidth = defaultWidth * 30 / 100;
	    var timer;
	    var startWarningAnimation = false;
	    var startErrorAnimation = false;
	    
    	this.panel.style.border = '5px double gold';
  		removeClass(points, 'red_text_animation');
  		addClass(this.panel, 'normal_animation');

	    timer = setInterval(function() {
	    	if (getPosition(this.element).x <= warningWidth) {
	    		if (!startWarningAnimation) {
	    			removeClass(this.panel, 'normal_animation');
	    			addClass(this.panel, 'warning_animation');
	    			startWarningAnimation = true;
	    		}
	    	}
	    	if (getPosition(this.element).x <= errorWidth) {
	    		if (!startErrorAnimation) {
	    			this.panel.style.border = '5px double #8B0000';
	    			removeClass(this.panel, 'warning_animation');
	    			addClass(this.points, 'red_text_animation');
	    			addClass(this.panel, 'error_animation');
	    			startErrorAnimation = true;
	    		}
	    	}
	    }, 1000);*/
	}

	Slider.prototype.startSlider = function() {
		var self = this;
		this.slide();
		transitionEnd(this.element, function() {
			showElement(self.failPanel);
		});		
	}

	var CountdownPanel = function(countdownPanel) {
		this.countdownPanel = document.getElementById(countdownPanel);
	};

	CountdownPanel.prototype.startCountdownTimer = function(countdownNumber, callback) {
		var self = this;
		showElement(this.countdownPanel);
		this.countdownPanel.innerHTML = "";
		var countDownTimer = setInterval(function() {
      		if (countdownNumber === 0) {
        		clearInterval(countDownTimer);
        		hideElement(self.countdownPanel);
        		callback();
        	}
        	self.countdownPanel.innerHTML = countdownNumber--;
    	}, 1000);
	}

	var Button = function(button) {
		this.imageIteration = 0;
		this.button = document.getElementById(button);
		this.countdownPanel = new CountdownPanel('countdown_panel');
		this.slider = new Slider();
		this.submitTextfield = document.getElementById('submit_user_input');
		this.failPanel = document.getElementsByClassName('failBackground')[0];
		this.images = document.getElementsByClassName('images')[0];
		this.image = document.getElementsByClassName('image');
		this.instruction_panel = document.getElementsByClassName('instruction')[0];
		this.addPoints = document.getElementsByClassName('addPoints')[0];
		this.wrapper = document.getElementsByClassName('wrapper')[0];
	};

	Button.prototype.startCountdownForSlider = function(countdownNumber, callback) {
		var self = this;
		this.button.addEventListener('click', function() {
			callback();
			toggleClass(self.wrapper, 'grayscale_background_animation');
			self.countdownPanel.startCountdownTimer(countdownNumber, self.slider.startSlider.bind(self.slider));
		});
	}

	Button.prototype.submit = function() {
		var self = this;
		this.button.addEventListener('click', function() {
	  		if (!checkIfUserInputIsValid(self.submitTextfield)) {
	  			hideElement(self.image[self.imageIteration]);
	  			self.imageIteration++;
	  			self.addPoints.innerHTML = "+200";
	  			toggleClass(self.addPoints, 'add_points_animation');
	  		}
		});
	}

	Button.prototype.initStart = function(countdownNumber) {
		var self = this;
		var callback = function() {
			hideElement(self.instruction_panel);
		}
		this.startCountdownForSlider(COUNTDOWN_NUMBER, callback);
	}

	Button.prototype.initFail = function(countdownNumber) {
		var self = this;
		var callback = function() {
			hideElement(self.failPanel);

			// reset the images
			self.images.style.marginLeft = '100%';
  			self.images.style.transition = '0s';
  		  	for (var i = 0; i < self.image.length; i++) {
  				self.image[i].style.display = 'block';
  			}
		}
		this.startCountdownForSlider(COUNTDOWN_NUMBER, callback);
	}

	var startButton = new Button('start_button');
	startButton.initStart();

	var failButton = new Button('failButton');
	failButton.initFail();

  	var submitButton = new Button('submit_button');
  	submitButton.submit();

  	// For testing purposes
  	var hideInstructionAndCountdownPanel = function() {
	  	countdown_panel.style.display = 'none';
	  	var instruction = document.getElementsByClassName('instruction')[0];
	  	instruction.style.display = 'none';		
  	}

  	//hideInstructionAndCountdownPanel();
  	//showElement(failPanel);
})();