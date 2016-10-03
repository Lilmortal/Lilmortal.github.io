/**
 * This is a generic button, which has a multitude of generic to specific functions for all possible scenarios.
 * @param {Object} Button
 */
import {Countdown_panel} from './countdown_panel.js';
import {Slider} from './slider.js';
import {Helper} from '../helper.js';
import {Config} from '../config.js';

const {elements, constants, text} = Config;
const {toggle_class_for_animation, hide_element, validate_if_input_is_hero_name, show_element, add_class, remove_class, transition_end} = Helper;

let image_iteration = 0;

export const Button = {
	create_button(type) {
		return Object.create(this.button[type]);
	},

	button: {
		start_button: {	
			click(callback) {
				elements.start_button.addEventListener('click', () => {
					this[callback]();
				});
			},
			start_game() {
				// Would be cool to make this elements.wrapper.toggle_class_for_animation() instead like JQuery
				toggle_class_for_animation(elements.wrapper, 'grayscale_background_animation');
				hide_element(elements.instruction_panel);
				Start_slider_countdown().then((response) => {
					Start_slider().then((response) => {
						Display_fail_panel(response);
					})
				});
			}
		},
		fail_button: {
			click(callback) {
				elements.fail_button.addEventListener('click', () => {
					this[callback]();
				});
			},
			restart_game() {
				hide_element(elements.fail_background, elements.slider_panel);
				Reset_images();
				show_element(elements.instruction_panel);
			}
		},
		submit_button: {
			click(callback) {
				elements.submit_button.addEventListener('click', () => {
					this[callback]();
				});
			},
			submit() {
				if (validate_if_input_is_hero_name(elements.image[image_iteration], elements.submit_textfield)) {
					hide_element(elements.image[image_iteration]);
					image_iteration++;
					elements.add_points.innerHTML = '+' + constants.POINTS_ADDED;
					for (let high_score of elements.high_score) {
						high_score.innerHTML = parseInt(high_score.innerHTML) + parseInt(constants.POINTS_ADDED);
					}
					toggle_class_for_animation(elements.add_points, 'add_points_animation');
					remove_class(elements.submit_textfield, 'shake_textfield_animation');
					} else {
						toggle_class_for_animation(elements.submit_textfield, 'shake_textfield_animation');
					}
					elements.submit_textfield.value = '';
					if (typeof elements.image[image_iteration] === 'undefined') {
						elements.result_text.innerHTML = text.success_message;
						show_element(elements.fail_background);
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
	transition_end(elements.images, () => {
		elements.result_text.innerHTML = text.fail_message;
		show_element(elements.fail_background);
	});					
}

function Reset_images() {
	elements.images.style.marginLeft = '100%';
	elements.images.style.transition = '0s';
	for (let i = 0; i < elements.image.length; i++) {
		elements.image[i].style.display = 'block';
	}
	image_iteration = 0;
	for (let i = 0; i < elements.high_score.length; i++) {
		elements.high_score[i].innerHTML = 0;
	}
	elements.submit_textfield.value = '';
	remove_class(elements.submit_textfield, 'shake_textfield_animation');
	remove_class(elements.add_points, 'add_points_animation');
	elements.add_points.style.opacity = 0;
}