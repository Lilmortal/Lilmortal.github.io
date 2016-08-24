"use strict";

/**
 * This is the slider that will be displayed after the countdown. It will display an endless stream of dota images that were retrieved via Dota API.
 * It will constantly transition to the left until it reaches the starting position of the panel that holds the images, which in that case the game
 * lose. 
 */
var Slider = (function() {
	var SLIDE_DURATION = 10;
	var WARNING_THRESHOLD = 30;

	var images = document.getElementsByClassName('images')[0];
	var imagesPanel = document.getElementsByClassName('imagesPanel')[0];
	var failBackground = document.getElementsByClassName('failBackground')[0];4

	function slider() {

	}

	/**
	 * Transition effect on the images.
	 */
	slider.prototype.slide = function() {
		var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	    var defaultWidth = (screenWidth - imagesPanel.offsetWidth/ 2) + imagesPanel.offsetWidth;
	    var warningWidth = defaultWidth * WARNING_THRESHOLD / 100;
	    var startWarningAnimation = false;
	    var timer;

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
		this.slide();
		Helper.transitionEnd(images, function() {
			Helper.showElement(failBackground);
		});		
	}

	return slider;
})();