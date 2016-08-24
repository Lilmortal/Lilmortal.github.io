"use strict";

/**
 * This is the slider that will be displayed after the countdown. It will display an endless stream of dota images that were retrieved via Dota API.
 * It will constantly transition to the left until it reaches the starting position of the panel that holds the images, which in that case the game
 * lose. 
 */
var Slider = (function() {
	var SLIDE_DURATION = 10;
	var WARNING_THRESHOLD = 30;

	function slider() {
		this.images = document.getElementsByClassName('images')[0];
		this.imagesPanel = document.getElementsByClassName('imagesPanel')[0];
		this.failBackground = document.getElementsByClassName('failBackground')[0];
	}

	/**
	 * Transition effect on the images.
	 */
	slider.prototype.slide = function() {
		var self = this;
		var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	    var defaultWidth = (screenWidth - this.imagesPanel.offsetWidth/ 2) + this.imagesPanel.offsetWidth;
	    var warningWidth = defaultWidth * WARNING_THRESHOLD / 100;
	    var startWarningAnimation = false;
	    var timer;

		this.images.style.marginLeft = '0';
	    this.images.style.transition = SLIDE_DURATION + 's linear';
		Helper.removeClass(self.imagesPanel, 'warningAnimation');

	    timer = setInterval(function() {
	    	if (Helper.getPosition(self.images).x <= warningWidth) {
				Helper.addClass(self.imagesPanel, 'warningAnimation');
				clearInterval(timer);
	    	}
	    }, 1000);
	}

	/**
	 * Start the slider transition, display the fail panel when the transition ends.
	 */
	slider.prototype.startSlider = function() {
		var self = this;
		this.slide();
		Helper.transitionEnd(this.images, function() {
			Helper.showElement(self.failBackground);
		});		
	}

	return slider;
})();