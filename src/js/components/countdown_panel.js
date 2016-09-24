/**
 * This is the countdown panel; it will countdown until it reaches 0 before it displays the slider panel.
 */
module.exports = (function() {
	"use strict";
	
	const Helper = require('../helper.js');
	
	const Countdown_panel = {
		create_countdown_panel() {
			return Object.create(this.countdown_panel);
		},
		countdown_panel: {
			start_countdown_timer(countdown_number) {
				const self = this;
				const countdown_panel = document.getElementById('countdown_panel');
				const countdown_promise = new Promise(function(resolve, reject) {
					Helper.show_element(countdown_panel);
					countdown_panel.innerHTML = "";
					const countdown_timer = setInterval(function() {
			      		if (countdown_number === 0) {
			        		clearInterval(countdown_timer);
			        		Helper.hide_element(countdown_panel);
			        		resolve("Success");
			        	}
			        	countdown_panel.innerHTML = countdown_number--;
			    	}, 1000);
				});
				return countdown_promise;
			}
		}
	}
	return Countdown_panel;
})();