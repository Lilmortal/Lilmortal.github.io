/**
 * This is the countdown panel; it will countdown until it reaches 0 before it displays the slider panel.
 */

import { Config } from '../config';

const { countdown_panel } = Config.elements;
const { COUNTDOWN_DURATION } = Config.constants;

export const Countdown_panel = {
	create_countdown_panel() {
		return Object.create(this.countdown_panel);
	},
	countdown_panel: {
		start_countdown_timer() {
			let countdown_duration = COUNTDOWN_DURATION;
			const countdown_promise = new Promise((resolve, reject) => {
				countdown_panel.show();
				countdown_panel.innerHTML = "";
				const countdown_timer = setInterval(() => {
					if (countdown_duration === 0) {
						clearInterval(countdown_timer);
						countdown_panel.hide();
						resolve(); 
					}
					countdown_panel.innerHTML = countdown_duration--;
				}, 1000);
			});
			return countdown_promise;
		}
	}
}