"use strict";

/**
 * This is a generic button, which has a multitude of generic to specific functions for all possible scenarios.
 * @param {Object} Button
 */
var Button = (function() {
	var COUNTDOWN_NUMBER = 3;

	function button(id) {
		this.imageIteration = 0;
		this.button = document.getElementById(id);
		this.countdownPanel = new CountdownPanel('countdownPanel');
		this.slider = new Slider();
		this.submitTextfield = document.getElementById('submitTextfield');
		this.failBackground = document.getElementsByClassName('failBackground')[0];
		this.images = document.getElementsByClassName('images')[0];
		this.image = document.getElementsByClassName('image');
		this.instructionPanel = document.getElementsByClassName('instructionPanel')[0];
		this.addPoints = document.getElementsByClassName('addPoints')[0];
		this.wrapper = document.getElementsByClassName('wrapper')[0];
	};

	/**
	 * When clicked, start the countdown panel.
	 * @param  {Integer} Countdown number
	 * @param  {Function} The function that will be called when the countdown number reaches 0.
	 * @return {[type]}
	 */
	button.prototype.startCountdownForSlider = function(countdownNumber, callback) {
		var self = this;
		this.button.addEventListener('click', function() {
			callback();
			Helper.toggleClass(self.wrapper, 'grayscaleBackgroundAnimation');
			console.log(countdownNumber);
			self.countdownPanel.startCountdownTimer(countdownNumber, self.slider.startSlider.bind(self.slider));
		});
	}

	/**
	 * When clicked, check if the user input is valid; if it is valid, it will remove an image and add some points, else display a fail animation.
	 */
	button.prototype.submit = function() {
		var self = this;
		this.button.addEventListener('click', function() {
	  		if (!Helper.validateIfUserInputIsValid(self.submitTextfield)) {
	  			Helper.hideElement(self.image[self.imageIteration]);
	  			self.imageIteration++;
	  			self.addPoints.innerHTML = "+200";
	  			Helper.toggleClass(self.addPoints, 'addPointsAnimation');
	  		}
		});
	}

	/**
	 * Constructor for when the start button is clicked.
	 * @param  {Integer} countdown number.
	 */
	button.prototype.initStart = function(countdownNumber) {
		var self = this;
		var callback = function() {
			Helper.hideElement(self.instructionPanel);
		}
		this.startCountdownForSlider(COUNTDOWN_NUMBER, callback);
	}

	/**
	 * Constructor for when the fail button is clicked.
	 * @param  {Integer} countdown number.
	 */
	button.prototype.initFail = function(countdownNumber) {
		var self = this;
		var callback = function() {
			Helper.hideElement(self.failBackground);

			// reset the images
			self.images.style.marginLeft = '100%';
  			self.images.style.transition = '0s';
  		  	for (var i = 0; i < self.image.length; i++) {
  				self.image[i].style.display = 'block';
  			}
		}
		this.startCountdownForSlider(COUNTDOWN_NUMBER, callback);
	}

	return button;
})();