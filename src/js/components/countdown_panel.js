/**
 * This is the countdown panel; it will countdown until it reaches 0 before it displays the slider panel.
 */
module.exports = (function() {
	"use strict";
	
	const Helper = require('../helper.js');
	const Config = require('../config.js');

	const config = Config.elements;
	const constants = Config.constants;

	const Countdown_panel = {
		create_countdown_panel() {
			return Object.create(this.countdown_panel);
		},
		countdown_panel: {
			start_countdown_timer() {
				let countdown_duration = constants.COUNTDOWN_DURATION;
				const countdown_promise = new Promise(function(resolve, reject) {
					Helper.show_element(config.countdown_panel);
					config.countdown_panel.innerHTML = "";
					const countdown_timer = setInterval(function() {
			      		if (countdown_duration === 0) {
			        		clearInterval(countdown_timer);
			        		Helper.hide_element(config.countdown_panel);
			        		resolve("Success");
			        	}
			        	config.countdown_panel.innerHTML = countdown_duration--;
			    	}, 1000);
				});
				return countdown_promise;
			}
		}
	}
	return Countdown_panel;
})();