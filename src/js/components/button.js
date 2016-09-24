/**
 * This is a generic button, which has a multitude of generic to specific functions for all possible scenarios.
 * @param {Object} Button
 */
module.exports = (function() {
	"use strict";

	const COUNTDOWN_NUMBER = 3;
	const Countdown_panel = require('./countdown_panel.js');
	const Slider = require('./slider.js');
	const Helper = require('../helper.js');
	//TODO - document.querySelector is better or nah? Heard performance is worse but how bad is it? why queryselector over getelement?
	// THIS IS TOO SHIT, ITS TOO DEPENDENT ON HARD CODED VARIABLES; CAN ANGULAR 2 DEPENDENCY INJECTION HELP? I KNOW
	// REACT CAN WITH ITS COMPONENT BASED LIBRARY; WHAT ABOUT EMBER? WHY ARE PEOPLE DITCHING EMBER? TOO OLD? KNOCKOUT MVVM HELPS?? EQUIVALENT FOR VANILLA JS?
	const submit_textfield = document.getElementById('submit_textfield');
	const fail_background = document.getElementsByClassName('fail_background')[0];
	const images = document.getElementsByClassName('images')[0];
	const image = document.getElementsByClassName('image');
	const instruction_panel = document.getElementsByClassName('instruction_panel')[0];
	const add_points = document.getElementsByClassName('add_points')[0];
	const wrapper = document.getElementsByClassName('wrapper')[0];
	const slider_panel = document.getElementsByClassName('slider_panel')[0];
	const high_score = document.getElementsByClassName('high_score');
	let image_iteration = 0;
	const Button = {
		create_button(type) {
			return Object.create(this.button[type]);
		},

		button: {
			start_button: {	
				if_clicked(callback) {
					var self = this;
					document.getElementById('start_button').addEventListener('click', function() {
						self[callback]();
					});
				},
				start() {
					var self = this;
					Helper.toggle_class_for_animation(wrapper, 'grayscale_background_animation');
					Helper.hide_element(instruction_panel);
					self.start_slider_countdown(COUNTDOWN_NUMBER).then(function(response) {
						self.start_slider().then(function(response) {
							self.display_fail_panel(response);
						})
					});
				},
				start_slider_countdown(countdownNumber) {
					const countdownPanel = Countdown_panel.create_countdown_panel();
					return countdownPanel.start_countdown_timer(countdownNumber);
				},
				start_slider() {
					const slider = Slider.create_slider();
					return slider.start_slider();
				},
				display_fail_panel(images) {
					Helper.transition_end(images, function() {
						document.getElementsByClassName('result_text')[0].innerHTML = 'You lose...';
						Helper.show_element(fail_background);
					});					
				}
			},
			fail_button: {
				if_clicked(callback) {
					var self = this;
					document.getElementById('fail_button').addEventListener('click', function() {
						self[callback]();
					});
				},
				fail() {
					var self = this;
					Helper.hide_element(fail_background, slider_panel);
					// reset the images
					images.style.marginLeft = '100%';
		  			images.style.transition = '0s';
		  		  	for (let i = 0; i < image.length; i++) {
		  				image[i].style.display = 'block';
		  			}
		  			image_iteration = 0;
					for (let i = 0; i < high_score.length; i++) {
						high_score[i].innerHTML = 0;
					}
					submit_textfield.value = '';
					Helper.remove_class(submit_textfield, 'shake_textfield_animation');
					Helper.remove_class(add_points, 'add_points_animation');
					add_points.style.opacity = 0;

					Helper.toggle_class_for_animation(wrapper, 'grayscale_background_animation');
					self.start_slider_countdown(COUNTDOWN_NUMBER).then(function(response) {
						self.start_slider().then(function(response) {
							self.display_fail_panel(response);
						})
					});
				},
				start_slider_countdown(countdownNumber) {
					const countdownPanel = Countdown_panel.create_countdown_panel();
					return countdownPanel.start_countdown_timer(countdownNumber);
				},
				start_slider() {
					const slider = Slider.create_slider();
					return slider.start_slider();
				},
				display_fail_panel(images) {
					Helper.transition_end(images, function() {
						document.getElementsByClassName('result_text')[0].innerHTML = 'You lose...';
						Helper.show_element(fail_background);
					});					
				}
			},
			submit_button: {
				if_clicked(callback) {
					var self = this;
					document.getElementById('submit_button').addEventListener('click', function() {
						self[callback]();
					});
				},
				submit() {
			  		if (Helper.validate_if_input_is_dota_hero_name(image[image_iteration], submit_textfield)) {
			  			Helper.hide_element(image[image_iteration]);
			  			image_iteration++;
			  			add_points.innerHTML = "+100";
			  			for (let i = 0; i < high_score.length; i++) {
			  				high_score[i].innerHTML = parseInt(high_score[i].innerHTML) + 100;
			  			}
			  			Helper.toggle_class_for_animation(add_points, 'add_points_animation');
			  			Helper.remove_class(submit_textfield, 'shake_textfield_animation');
			  		} else {
						Helper.toggle_class_for_animation(submit_textfield, 'shake_textfield_animation');
			  		}
			  		submit_textfield.value = '';
			  		if (typeof image[image_iteration] === 'undefined') {
			  			document.getElementsByClassName('result_text')[0].innerHTML = 'Ez Win!';
			  			Helper.show_element(fail_background);
			  		}
				}
			}
		}
	}
	return Button;
})();