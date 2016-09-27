/**
 * This is the slider that will be displayed after the countdown. It will display an endless stream of dota images that are retrieved via Dota API.
 * It will constantly transition to the left until it reaches to the starting position of the panel that holds the images, which in that case the game
 * lose. 
 */
module.exports = (function() {
	"use strict";
	
	const Helper = require('../helper.js');
	const Config = require('../config.js');

	const elements = Config.elements;
	const constants = Config.constants;
	const text = Config.text;

	const Slider = {	
		create_slider() {
			return Object.create(this.slider_panel);
		},

		slider_panel: {
			slide() {
				const screen_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
				const images_panel_width = (screen_width - elements.images_panel.offsetWidth / 2) + elements.images_panel.offsetWidth;
				const warning_width_threshold = images_panel_width * constants.WARNING_THRESHOLD / 100;
				let timer;
				elements.images.style.marginLeft = '0';
				elements.images.style.transition = constants.SLIDE_DURATION + 's linear';
				Helper.remove_class(elements.images_panel, 'warning_animation');

				timer = setInterval(() => {
					if (Helper.get_position(elements.images).x <= warning_width_threshold) {
						Helper.add_class(elements.images_panel, 'warning_animation');
						clearInterval(timer);
					}
				}, 1000);
			},
			start_slider() {
				const slider_promise = new Promise((resolve, reject) => {
					Helper.show_element(elements.slider_panel);
					this.slide();
					resolve();
				});
				return slider_promise;
			}
		}
	}
	return Slider;
})();