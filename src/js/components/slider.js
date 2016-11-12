/**
 * This is the slider that will be displayed after the countdown. It will display an endless stream of dota images that are retrieved via Dota API.
 * It will constantly transition to the left until it reaches to the starting position of the panel that holds the images, which in that case the game
 * lose. 
 */
import { Helper } from'../helper';
import { Config } from'../config';

const { images, images_panel, slider_panel } = Config.elements;
const { WARNING_THRESHOLD, SLIDE_DURATION } = Config.constants;

export const Slider = {	
	create_slider() {
		return Object.create(this.slider_panel);
	},

	slider_panel: {
		// USE REQUESTANIMATIONFRAME, NEED TO FIND OUT HOW TO CHECK WHEN ANIMATION FRAME ENDS
		slide() {
			const screen_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			const images_panel_width = (screen_width - images_panel.offsetWidth / 2) + images_panel.offsetWidth;
			const warning_width_threshold = images_panel_width * WARNING_THRESHOLD / 100;
			let timer;
			images.style.marginLeft = '0';
			images.style.transition = SLIDE_DURATION + 's linear';
			images_panel.remove_class('warning_animation');

			timer = setInterval(() => {
				if (images.get_position().x <= warning_width_threshold) {
					images_panel.add_class('warning_animation');
					clearInterval(timer);
				}
			}, 1000);
		},
		start_slider() {
			const slider_promise = new Promise((resolve, reject) => {
				slider_panel.show();
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