/**
 * This is the countdown panel; it will countdown until it reaches 0 before it displays the slider panel.
 */
module.exports = (function() {
	"use strict";
	
	const Helper = require('../helper.js');
	
	function countdownPanel(id) {
		this.countdownPanel = document.getElementById(id);
	}

	/**
	 * Start the countdown; it will countdown the number displayed on the screen until it reaches 0, which by then it will display the slider panel.
	 * @param  {Integer} the countdown number, e.g. if 3, it will start the countdown from 3.
	 * @param  {Function} The callback that will be called once the countdown reaches 0.
	 */
	countdownPanel.prototype.startCountdownTimer = function(countdownNumber, callback) {
		const self = this;
		Helper.showElement(this.countdownPanel);
		this.countdownPanel.innerHTML = "";
		const countDownTimer = setInterval(function() {
      		if (countdownNumber === 0) {
        		clearInterval(countDownTimer);
        		Helper.hideElement(self.countdownPanel);
        		callback();
        	}
        	self.countdownPanel.innerHTML = countdownNumber--;
    	}, 1000);
	}

	return countdownPanel;
})();