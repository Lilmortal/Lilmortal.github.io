/**
 * This is a generic button, which has a multitude of generic to specific functions for all possible scenarios.
 * @param {Object} Button
 */
window.Button = (function() {
	var COUNTDOWN_NUMBER = 3;
	var imageIteration = 0;
	var submitTextfield = document.getElementById('submitTextfield');
	var failBackground = document.getElementsByClassName('failBackground')[0];
	var images = document.getElementsByClassName('images')[0];
	var image = document.getElementsByClassName('image');
	var instructionPanel = document.getElementsByClassName('instructionPanel')[0];
	var addPoints = document.getElementsByClassName('addPoints')[0];
	var wrapper = document.getElementsByClassName('wrapper')[0];
	var sliderPanel = document.getElementsByClassName('sliderPanel')[0];

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
	Button.prototype.startCountdownForSlider = function(countdownNumber, callback) {
		var self = this;
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
		var callback = function() {
			Helper.hideElement(instructionPanel);
		}
		this.startCountdownForSlider(COUNTDOWN_NUMBER, callback);
	}

	/**
	 * Constructor for when the fail button is clicked.
	 * @param  {Integer} countdown number.
	 */
	Button.prototype.initFail = function(countdownNumber) {
		var callback = function() {
			Helper.hideElement(failBackground, sliderPanel);
			// reset the images
			images.style.marginLeft = '100%';
  			images.style.transition = '0s';
  		  	for (let i = 0; i < image.length; i++) {
  				image[i].style.display = 'block';
  			}
  			//find out how to remove error border
  			//submitTextfield.style.border = '4x solid #3F3835';
		}
		//Helper.showElement(instructionPanel);
		this.startCountdownForSlider(COUNTDOWN_NUMBER, callback);
	}

	return Button;
})();