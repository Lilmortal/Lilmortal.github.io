/**
 * This is the slider that will be displayed after the countdown. It will display an endless stream of dota images that are retrieved via Dota API.
 * It will constantly transition to the left until it reaches to the starting position of the panel that holds the images, which in that case the game
 * lose. 
 */
import {Helper} from'../helper.js';
import {Config} from'../config.js';

const {elements, constants} = Config;
const {remove_class, get_position, add_class, show_element} = Helper;

export const Slider = {	
	create_slider() {
		return Object.create(this.slider_panel);
	},

	slider_panel: {
		// USE REQUESTANIMATIONFRAME, NEED TO FIND OUT HOW TO CHECK WHEN ANIMATION FRAME ENDS
		slide() {
			const screen_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			const images_panel_width = (screen_width - elements.images_panel.offsetWidth / 2) + elements.images_panel.offsetWidth;
			const warning_width_threshold = images_panel_width * constants.WARNING_THRESHOLD / 100;
			let timer;
			elements.images.style.marginLeft = '0';
			elements.images.style.transition = constants.SLIDE_DURATION + 's linear';
			remove_class(elements.images_panel, 'warning_animation');

			timer = setInterval(() => {
				if (get_position(elements.images).x <= warning_width_threshold) {
					add_class(elements.images_panel, 'warning_animation');
					clearInterval(timer);
				}
			}, 1000);
		},
		start_slider() {
			const slider_promise = new Promise((resolve, reject) => {
				show_element(elements.slider_panel);
				this.slide();
				resolve();
			})
			.catch((e) => {
				console.log(e);
			});
			return slider_promise;
		}
	}
}