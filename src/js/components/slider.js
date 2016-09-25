/**
 * This is the slider that will be displayed after the countdown. It will display an endless stream of dota images that are retrieved via Dota API.
 * It will constantly transition to the left until it reaches to the starting position of the panel that holds the images, which in that case the game
 * lose. 
 */
module.exports = (function() {
	"use strict";
	
	const Helper = require('../helper.js');
	const Config = require('../config.js');

	const config = Config.elements;
	const constants = Config.constants;
	const text = Config.text;

	const Slider = {	
		create_slider() {
			return Object.create(this.slider_panel);
		},

		slider_panel: {
			slide() {
				const screen_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			    const default_width = (screen_width - config.images_panel.offsetWidth/ 2) + config.images_panel.offsetWidth;
			    const warning_width = default_width * constants.WARNING_THRESHOLD / 100;
			    let timer;
				config.images.style.marginLeft = '0';
			    config.images.style.transition = constants.SLIDE_DURATION + 's linear';
				Helper.remove_class(config.images_panel, 'warning_animation');

			    timer = setInterval(() => {
			    	if (Helper.get_position(config.images).x <= warning_width) {
						Helper.add_class(config.images_panel, 'warning_animation');
						clearInterval(timer);
			    	}
			    }, 1000);
			},
			start_slider() {
				const slider_promise = new Promise((resolve, reject) => {
					Helper.show_element(config.slider_panel);
					this.slide();
					resolve(config.images);
				});
				return slider_promise;
			}
		}
	}
	return Slider;
})();