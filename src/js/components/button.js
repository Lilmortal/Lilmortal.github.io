/**
 * This is a generic button, which has a multitude of generic to specific functions for all possible scenarios.
 * @param {Object} Button
 */
import { Countdown_panel } from './countdown_panel';
import { Slider } from './slider';
import { Helper } from '../helper';
import { Config } from '../config';

const { start_button, wrapper, instruction_panel, fail_button, fail_background, slider_panel, submit_button, image, submit_textfield,
		add_points, high_score, result_text, images } = Config.elements;
const { POINTS_ADDED } = Config.constants;
const { success_message, fail_message } = Config.text;
const { transition_end } = Helper;

let image_iteration = 0;

export const Button = {
	create_button(type) {
		return Object.create(this.button[type]);
	},

	button: {
		start_button: {	
			click(callback) {
				start_button.addEventListener('click', () => {
					this[callback]();
				});
			},
			start_game() {
				wrapper.toggle_class_for_animation('grayscale_background_animation');
				instruction_panel.hide();
				Start_slider_countdown().then((response) => {
					Start_slider().then((response) => {
						Display_fail_panel(response);
					})
				});
			}
		},
		fail_button: {
			click(callback) {
				fail_button.addEventListener('click', () => {
					this[callback]();
				});
			},
			restart_game() {
				fail_background.hide();
				slider_panel.hide();
				instruction_panel.show();
				Reset_images();
			}
		},
		submit_button: {
			click(callback) {
				submit_button.addEventListener('click', () => {
					this[callback]();
				});
			},
			submit() {
				if (Validate_if_input_is_hero_name(image[image_iteration], submit_textfield)) {
					image[image_iteration].hide();
					image_iteration++;
					add_points.innerHTML = '+' + POINTS_ADDED;
					for (let score of high_score) {
						score.innerHTML = parseInt(score.innerHTML) + parseInt(POINTS_ADDED);
					}
					add_points.toggle_class_for_animation('add_points_animation');
					submit_textfield.remove_class('shake_textfield_animation');
					} else {
						submit_textfield.toggle_class_for_animation('shake_textfield_animation');
					}
					submit_textfield.value = '';
					if (typeof image[image_iteration] == 'undefined') {
						result_text.innerHTML = success_message;
						fail_background.show();
					}
				}
			}
	}
}

function Start_slider_countdown() {
	const countdown_panel = Countdown_panel.create_countdown_panel();
	return countdown_panel.start_countdown_timer();
}

function Start_slider() {
	const slider = Slider.create_slider();
	return slider.start_slider();
}

function Display_fail_panel() {
	images.transition_end(() => {
		result_text.innerHTML = fail_message;
		fail_background.show();
	});					
}

function Reset_images() {
	images.style.marginLeft = '100%';
	images.style.transition = '0s';
	Array.from(image).map((img) => {
		img.show('block')
	})

	image_iteration = 0;
	Array.from(high_score).map((score) => {
		score.innerHTML = 0;
	})
	
	submit_textfield.value = '';
	submit_textfield.remove_class('shake_textfield_animation');
	add_points.remove_class('add_points_animation');
	add_points.style.opacity = 0;
}

/**
 * Validate if user input is a string.
 * @param {Object} image - The image that is being validated.
 * @param  {Object} textfield - The textfield that has the user input.
 */
function Validate_if_input_is_hero_name(hero_image, textfield) {
	if (hero_image.name.toLowerCaseAndRemoveIllegalCharacters() === textfield.value.toLowerCaseAndRemoveIllegalCharacters()) {
		return true;
	}
	return false;
}