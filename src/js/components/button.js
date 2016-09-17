/**
 * This is a generic button, which has a multitude of generic to specific functions for all possible scenarios.
 * @param {Object} Button
 */
module.exports = (function() {
	"use strict";

	const COUNTDOWN_NUMBER = 3;
	const CountdownPanel = require('../components/countdown_panel.js');
	const Slider = require('../components/slider.js');
	const Helper = require('../helper.js');
	//TODO - document.querySelector is better or nah? Heard performance is worse but how bad is it? why queryselector over getelement?
	// THIS IS TOO SHIT, ITS TOO DEPENDENT ON HARD CODED VARIABLES; CAN ANGULAR 2 DEPENDENCY INJECTION HELP OR OTHER WAY VANILLA JS CAN HELP? I KNOW
	// REACT CAN WITH ITS COMPONENT BASED LIBRARY; WHAT ABOUT EMBER? WHY ARE PEOPLE DITCHING EMBER? TOO OLD? KNOCKOUT MVVM HELPS??
	const submitTextfield = document.getElementById('submitTextfield');
	const failBackground = document.getElementsByClassName('failBackground')[0];
	const images = document.getElementsByClassName('images')[0];
	const image = document.getElementsByClassName('image');
	const instructionPanel = document.getElementsByClassName('instructionPanel')[0];
	const addPoints = document.getElementsByClassName('addPoints')[0];
	const wrapper = document.getElementsByClassName('wrapper')[0];
	const sliderPanel = document.getElementsByClassName('sliderPanel')[0];

	function Button(id) {
		this.button = document.getElementById(id);
		this.countdownPanel = new CountdownPanel('countdownPanel');
		this.slider = new Slider('sliderPanel');
	};

	/**
	 * When clicked, start the countdown panel.
	 * @param  {Integer} Countdown number
	 * @param  {Function} The function that will be called when the countdown number reaches 0.
	 * @return {[type]}
	 */
	// THIS PROTOTYPE OR MODULE PATTERN IS BETTER??? WHAT ABOUT PUB/SUB IMPLEMENTATION?
	// IF HAVE TIME, SEE IF ES6 ARROW FUNCTION IS MORE READABLE OR NOT
	// AND ALL THIS METHODS...MAYBE SEPERATE IT INTO DIFFERENT COMPONENTS?
	Button.prototype.startCountdownForSlider = function(countdownNumber, callback) {
		// Is using self okay? Cause theres window.self...but will I ever use that???
		const self = this;
		this.button.addEventListener('click', function() {
			callback();
			Helper.toggleClass(wrapper, 'grayscaleBackgroundAnimation');
			self.countdownPanel.startCountdownTimer(countdownNumber, self.slider.startSlider.bind(self.slider));
		});
	}

	/**
	 * When clicked, check if the user input is valid; if it is valid, it will remove an image and add some points, else display a fail animation.
	 */
	Button.prototype.submit = function() {
		let imageIteration = 0;
		this.button.addEventListener('click', function() {
	  		if (!Helper.validateIfUserInputIsValid(self.submitTextfield)) {
	  			Helper.hideElement(image[imageIteration]);
	  			imageIteration++;
	  			addPoints.innerHTML = "+200";
	  			Helper.toggleClass(addPoints, 'addPointsAnimation');
	  		}
		});
	}

	/**
	 * Constructor for when the start button is clicked.
	 * @param  {Integer} countdown number.
	 */
	Button.prototype.initStart = function(countdownNumber) {
		const callback = function() {
			Helper.hideElement(instructionPanel);
		}
		this.startCountdownForSlider(COUNTDOWN_NUMBER, callback);
	}

	/**
	 * Constructor for when the fail button is clicked.
	 * @param  {Integer} countdown number.
	 */
	Button.prototype.initFail = function(countdownNumber) {
		const callback = function() {
			Helper.hideElement(failBackground, sliderPanel);
			// reset the images
			images.style.marginLeft = '100%';
  			images.style.transition = '0s';
  		  	for (let i = 0; i < image.length; i++) {
  				image[i].style.display = 'block';
  			}
		}
		this.startCountdownForSlider(COUNTDOWN_NUMBER, callback);
	}

	return Button;
})();