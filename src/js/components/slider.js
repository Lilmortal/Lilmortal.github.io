/**
 * This is the slider that will be displayed after the countdown. It will display an endless stream of dota images that are retrieved via Dota API.
 * It will constantly transition to the left until it reaches to the starting position of the panel that holds the images, which in that case the game
 * lose. 
 */
module.exports = (function() {
	"use strict";
	
	const Helper = require('../helper.js');
	const SLIDE_DURATION = 10;
	const WARNING_THRESHOLD = 30;
	const images = document.getElementsByClassName('images')[0];
	const imagesPanel = document.getElementsByClassName('imagesPanel')[0];
	const failBackground = document.getElementsByClassName('failBackground')[0];

	function slider(slider) {
		this.slider = document.getElementsByClassName(slider)[0];
	}

	slider.prototype.getImages = function() {
		// TODO - Get list of dota images using AJAX, look up Promises and Generators
		// Promises - asychronous calls, do this, then do this
		// Generators - something about waiting indefinitely until it gets it (uses the keyword 'yield')
		// APPARENTLY GENERATORS IS A HACK, ES7 'ASYNC' KEYWORD IS THE LEGIT WAY OR SOME SHIT; I THINK? 
	}

	/**
	 * Transition effect on the images.
	 */
	slider.prototype.slide = function() {
		const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	    const defaultWidth = (screenWidth - imagesPanel.offsetWidth/ 2) + imagesPanel.offsetWidth;
	    const warningWidth = defaultWidth * WARNING_THRESHOLD / 100;
	    let timer;

		images.style.marginLeft = '0';
	    images.style.transition = SLIDE_DURATION + 's linear';
		Helper.removeClass(imagesPanel, 'warningAnimation');

	    timer = setInterval(function() {
	    	if (Helper.getPosition(images).x <= warningWidth) {
				Helper.addClass(imagesPanel, 'warningAnimation');
				clearInterval(timer);
	    	}
	    }, 1000);
	}

	/**
	 * Start the slider transition, display the fail panel when the transition ends.
	 */
	slider.prototype.startSlider = function() {
		Helper.showElement(this.slider);
		this.slide();
		Helper.transitionEnd(images, function() {
			Helper.showElement(failBackground);
		});		
	}

	return slider;
})();