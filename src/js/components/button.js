/**
 * This is a generic button, which has a multitude of generic to specific functions for all possible scenarios.
 * @param {Object} Button
 */
module.exports = (function() {
	"use strict";

	const Countdown_panel = require('./countdown_panel.js');
	const Slider = require('./slider.js');
	const Helper = require('../helper.js');
	const Config = require('../config.js');

	const config = Config.elements;
	const constants = Config.constants;
	const text = Config.text;
	
	let image_iteration = 0;

	const Button = {
		create_button(type) {
			return Object.create(this.button[type]);
		},

		button: {
			start_button: {	
				if_clicked(callback) {
					config.start_button.addEventListener('click', () => {
						this[callback]();
					});
				},
				start() {
					Helper.toggle_class_for_animation(config.wrapper, 'grayscale_background_animation');
					Helper.hide_element(config.instruction_panel);
					this.start_slider_countdown().then((response) => {
						this.start_slider().then((response) => {
							this.display_fail_panel(response);
						})
					});
				},
				start_slider_countdown() {
					const countdown_panel = Countdown_panel.create_countdown_panel();
					return countdown_panel.start_countdown_timer();
				},
				start_slider() {
					const slider = Slider.create_slider();
					return slider.start_slider();
				},
				display_fail_panel(images) {
					Helper.transition_end(images, () => {
						config.result_text.innerHTML = 'You lose...';
						Helper.show_element(config.fail_background);
					});					
				}
			},
			fail_button: {
				if_clicked(callback) {
					config.fail_button.addEventListener('click', () => {
						this[callback]();
					});
				},
				fail() {
					Helper.hide_element(config.fail_background, config.slider_panel);
					// reset the images
					config.images.style.marginLeft = '100%';
		  			config.images.style.transition = '0s';
		  		  	for (let i = 0; i < config.image.length; i++) {
		  				config.image[i].style.display = 'block';
		  			}
		  			image_iteration = 0;
					for (let i = 0; i < config.high_score.length; i++) {
						config.high_score[i].innerHTML = 0;
					}
					config.submit_textfield.value = '';
					Helper.remove_class(config.submit_textfield, 'shake_textfield_animation');
					Helper.remove_class(config.add_points, 'add_points_animation');
					config.add_points.style.opacity = 0;

					Helper.toggle_class_for_animation(config.wrapper, 'grayscale_background_animation');
					this.start_slider_countdown().then((response) => {
						this.start_slider().then((response) => {
							this.display_fail_panel(response);
						})
					});
				},
				start_slider_countdown(countdownNumber) {
					const countdown_panel = Countdown_panel.create_countdown_panel();
					return countdown_panel.start_countdown_timer(countdownNumber);
				},
				start_slider() {
					const slider = Slider.create_slider();
					return slider.start_slider();
				},
				display_fail_panel(images) {
					Helper.transition_end(images, () => {
						config.result_text.innerHTML = text.fail_message;
						Helper.show_element(config.fail_background);
					});					
				}
			},
			submit_button: {
				if_clicked(callback) {
					config.submit_button.addEventListener('click', () => {
						this[callback]();
					});
				},
				submit() {
			  		if (Helper.validate_if_input_is_dota_hero_name(config.image[image_iteration], config.submit_textfield)) {
			  			Helper.hide_element(config.image[image_iteration]);
			  			image_iteration++;
			  			config.add_points.innerHTML = '+' + constants.POINTS_ADDED;
			  			for (let i = 0; i < config.high_score.length; i++) {
			  				config.high_score[i].innerHTML = parseInt(config.high_score[i].innerHTML) + parseInt(constants.POINTS_ADDED);
			  			}
			  			Helper.toggle_class_for_animation(config.add_points, 'add_points_animation');
			  			Helper.remove_class(config.submit_textfield, 'shake_textfield_animation');
			  		} else {
						Helper.toggle_class_for_animation(config.submit_textfield, 'shake_textfield_animation');
			  		}
			  		config.submit_textfield.value = '';
			  		if (typeof config.image[image_iteration] === 'undefined') {
			  			config.result_text.innerHTML = text.success_message;
			  			Helper.show_element(config.fail_background);
			  		}
				}
			}
		}
	}
	return Button;
})();