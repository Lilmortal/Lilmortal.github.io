/**
 * This is the countdown panel; it will countdown until it reaches 0 before it displays the slider panel.
 */

import {Helper} from '../helper.js';
import {Config} from '../config.js';

const {elements, constants} = Config;
const {show_element, hide_element} = Helper;

export const Countdown_panel = {
	create_countdown_panel() {
		return Object.create(this.countdown_panel);
	},
	countdown_panel: {
		start_countdown_timer() {
			let countdown_duration = constants.COUNTDOWN_DURATION;
			const countdown_promise = new Promise((resolve, reject) => {
				show_element(elements.countdown_panel);
				elements.countdown_panel.innerHTML = "";
				const countdown_timer = setInterval(() => {
				if (countdown_duration === 0) {
					clearInterval(countdown_timer);
					hide_element(elements.countdown_panel);
					resolve(); 
				}
					elements.countdown_panel.innerHTML = countdown_duration--;
				}, 1000);
			});
			return countdown_promise;
		}
	}
}