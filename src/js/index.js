"use strict";

/**
 * The main objective of this game is the users must quickly type in the exact value for the first dota item that is displayed amongst a list of dota
 * images; that value is the price of that item currently. If the user did not type the correct value in time before the images reaches the end, the
 * game loses.
 * @author Jack Tan
 */
(function() {
	var IS_NUMERIC = new RegExp(/^\d+$/);
	var COUNTDOWN_NUMBER = 3;

	/**
	 * Find which CSS transition events end.
	 * https://jonsuh.com/blog/detect-the-end-of-css-animations-and-transitions-with-javascript/
	 */
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

	/**
	 * @param {Object} el - The element that we want to find the current position is relative to the window.
	 * https://www.kirupa.com/html5/get_element_position_using_javascript.htm
	 */
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

	/**
	 * Bind the focused element; it will call the callback when transition ends.
	 * @param  {Object} the object which will be binded by a transition end listener
	 * @param  {Function} the callback that will be called when transition end
	 */
  	function transitionEnd(element, callback) {
	    var transitionEvent = whichTransitionEvent();
	    element.addEventListener(transitionEvent, callback);
  	}

	/**
	 * Display the element.
	 * @param  {Object} The element that will be displayed.
	 */
	function showElement(element) {
		element.style.display = 'flex';
	}

	/**
	 * Hide the element.
	 * @param  {Object} The element that will be hidden.
	 */
	function hideElement(element) {
		element.style.display = 'none';
	}

	/**
	 * Add a CSS class to an element.
	 * @param  {Object} The element that will have the added CSS class.
	 * @param  {String} className - The CSS class name
	 */
	function addClass(element, className) {
		element.classList.add(className);
	}

	/**
	 * Remove a CSS class from an element.
	 * @param  {Object} The element that will have the specified CSS class removed.
	 * @param  {String} className - The CSS class name
	 */
	function removeClass(element, className) {
		element.classList.remove(className);
		// weird hack rule - https://css-tricks.com/restart-css-animation/
		void element.offsetWidth;		
	}

	/**
	 * Toggle whether to add or remove CSS class.
	 * @param  {Object} The element that will add or remove the CSS class.
	 * @param  {String} className - The CSS class name
	 */
	function toggleClass(element, className) {
		if (element.classList.contains(className)) {
			removeClass(element, className);
  		}
  		addClass(element, className);
	}

	/**
	 * Validate if user input is an integer only.
	 * @param  {Object} The textfield that will be validated.
	 */
  	function checkIfUserInputIsValid(element) {
		if (IS_NUMERIC.test(element.value)) {
			return true;
		} else {
			toggleClass(element, 'shake_textfield_animation');
			return false;
  		}
  	}

	/**
	 * This is the slider that will be displayed after the countdown. It will display an endless stream of dota images that were retrieved via Dota API.
	 * It will constantly transition to the left until it reaches the starting position of the panel that holds the images, which in that case the game
	 * lose. 
	 */
	var Slider = function() {
		this.element = document.getElementsByClassName('images')[0];
		this.panel = document.getElementsByClassName('images_area')[0];
		this.failPanel = document.getElementsByClassName('failBackground')[0];
	}

	/**
	 * Transition effect on the images.
	 */
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

	/**
	 * Start the slider transition, display the fail panel when the transition ends.
	 */
	Slider.prototype.startSlider = function() {
		var self = this;
		this.slide();
		transitionEnd(this.element, function() {
			showElement(self.failPanel);
		});		
	}

	/**
	 * This is the countdown panel; it will countdown until it reaches 0 before it displays the slider panel.
	 */
	var CountdownPanel = function(countdownPanel) {
		this.countdownPanel = document.getElementById(countdownPanel);
	};

	/**
	 * Start the countdown; it will countdown the number displayed on the screen until it reaches 0, which by then it will display the slider panel.
	 * @param  {Integer} the countdown number, e.g. if 3, it will start the countdown from 3.
	 * @param  {Function} The callback that will be called once the countdown reaches 0.
	 */
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

	/**
	 * This is a generic button, which has a multitude of generic to specific functions for all possible scenarios.
	 * @param {Object} Button
	 */
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

	/**
	 * When clicked, start the countdown panel.
	 * @param  {Integer} Countdown number
	 * @param  {Function} The function that will be called when the countdown number reaches 0.
	 * @return {[type]}
	 */
	Button.prototype.startCountdownForSlider = function(countdownNumber, callback) {
		var self = this;
		this.button.addEventListener('click', function() {
			callback();
			toggleClass(self.wrapper, 'grayscale_background_animation');
			self.countdownPanel.startCountdownTimer(countdownNumber, self.slider.startSlider.bind(self.slider));
		});
	}

	/**
	 * When clicked, check if the user input is valid; if it is valid, it will remove an image and add some points, else display a fail animation.
	 */
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

	/**
	 * Constructor for when the start button is clicked.
	 * @param  {Integer} countdown number.
	 */
	Button.prototype.initStart = function(countdownNumber) {
		var self = this;
		var callback = function() {
			hideElement(self.instruction_panel);
		}
		this.startCountdownForSlider(COUNTDOWN_NUMBER, callback);
	}

	/**
	 * Constructor for when the fail button is clicked.
	 * @param  {Integer} countdown number.
	 */
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


// ========================================================================
  	// For testing purposes
  	var hideInstructionAndCountdownPanel = function() {
	  	countdown_panel.style.display = 'none';
	  	var instruction = document.getElementsByClassName('instruction')[0];
	  	instruction.style.display = 'none';		
  	}

  	//hideInstructionAndCountdownPanel();
  	//showElement(failPanel);
})();