/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	(function () {
		"use strict";
	
		var Button = __webpack_require__(2);
		var Textfield = __webpack_require__(7);
	
		//document.getElementById().initStart better? use "this"?
		// OR TRY USE FACTORY PATTERN ON THIS? 
		var start_button = Button.create_button('start_button');
		start_button.if_clicked('start');
	
		var fail_button = Button.create_button('fail_button');
		fail_button.if_clicked('fail');
	
		var submit_button = Button.create_button('submit_button');
		submit_button.if_clicked('submit');
	
		var submit_textfield = Textfield.create_textfield('submit_textfield');
		submit_textfield.submit();
	})();

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * This is a generic button, which has a multitude of generic to specific functions for all possible scenarios.
	 * @param {Object} Button
	 */
	module.exports = function () {
		"use strict";
	
		var COUNTDOWN_NUMBER = 3;
		var Countdown_panel = __webpack_require__(3);
		var Slider = __webpack_require__(6);
		var Helper = __webpack_require__(4);
		var Config = __webpack_require__(5);
		//TODO - document.querySelector is better or nah? Heard performance is worse but how bad is it? why queryselector over getelement?
		// THIS IS TOO SHIT, ITS TOO DEPENDENT ON HARD CODED VARIABLES; CAN ANGULAR 2 DEPENDENCY INJECTION HELP? I KNOW
		// REACT CAN WITH ITS COMPONENT BASED LIBRARY; WHAT ABOUT EMBER? WHY ARE PEOPLE DITCHING EMBER? TOO OLD? KNOCKOUT MVVM HELPS?? EQUIVALENT FOR VANILLA JS?
		var config = Config.elements;
		var image_iteration = 0;
		var Button = {
			create_button: function create_button(type) {
				return Object.create(this.button[type]);
			},
	
	
			button: {
				start_button: {
					if_clicked: function if_clicked(callback) {
						var self = this;
						document.getElementById('start_button').addEventListener('click', function () {
							self[callback]();
						});
					},
					start: function start() {
						var self = this;
						Helper.toggle_class_for_animation(config.wrapper, 'grayscale_background_animation');
						Helper.hide_element(config.instruction_panel);
						self.start_slider_countdown(COUNTDOWN_NUMBER).then(function (response) {
							self.start_slider().then(function (response) {
								self.display_fail_panel(response);
							});
						});
					},
					start_slider_countdown: function start_slider_countdown(countdownNumber) {
						var countdown_panel = Countdown_panel.create_countdown_panel();
						return countdown_panel.start_countdown_timer(countdownNumber);
					},
					start_slider: function start_slider() {
						var slider = Slider.create_slider();
						return slider.start_slider();
					},
					display_fail_panel: function display_fail_panel(images) {
						Helper.transition_end(images, function () {
							document.getElementsByClassName('result_text')[0].innerHTML = 'You lose...';
							Helper.show_element(config.fail_background);
						});
					}
				},
				fail_button: {
					if_clicked: function if_clicked(callback) {
						var self = this;
						document.getElementById('fail_button').addEventListener('click', function () {
							self[callback]();
						});
					},
					fail: function fail() {
						var self = this;
						Helper.hide_element(config.fail_background, config.slider_panel);
						// reset the images
						config.images.style.marginLeft = '100%';
						config.images.style.transition = '0s';
						for (var i = 0; i < config.image.length; i++) {
							config.image[i].style.display = 'block';
						}
						image_iteration = 0;
						for (var _i = 0; _i < config.high_score.length; _i++) {
							config.high_score[_i].innerHTML = 0;
						}
						config.submit_textfield.value = '';
						Helper.remove_class(config.submit_textfield, 'shake_textfield_animation');
						Helper.remove_class(config.add_points, 'add_points_animation');
						config.add_points.style.opacity = 0;
	
						Helper.toggle_class_for_animation(config.wrapper, 'grayscale_background_animation');
						self.start_slider_countdown(COUNTDOWN_NUMBER).then(function (response) {
							self.start_slider().then(function (response) {
								self.display_fail_panel(response);
							});
						});
					},
					start_slider_countdown: function start_slider_countdown(countdownNumber) {
						var countdown_panel = Countdown_panel.create_countdown_panel();
						return countdown_panel.start_countdown_timer(countdownNumber);
					},
					start_slider: function start_slider() {
						var slider = Slider.create_slider();
						return slider.start_slider();
					},
					display_fail_panel: function display_fail_panel(images) {
						Helper.transition_end(images, function () {
							document.getElementsByClassName('result_text')[0].innerHTML = 'You lose...';
							Helper.show_element(config.fail_background);
						});
					}
				},
				submit_button: {
					if_clicked: function if_clicked(callback) {
						var self = this;
						document.getElementById('submit_button').addEventListener('click', function () {
							self[callback]();
						});
					},
					submit: function submit() {
						if (Helper.validate_if_input_is_dota_hero_name(config.image[image_iteration], config.submit_textfield)) {
							Helper.hide_element(config.image[image_iteration]);
							image_iteration++;
							config.add_points.innerHTML = "+100";
							for (var i = 0; i < config.high_score.length; i++) {
								config.high_score[i].innerHTML = parseInt(config.high_score[i].innerHTML) + 100;
							}
							Helper.toggle_class_for_animation(config.add_points, 'add_points_animation');
							Helper.remove_class(config.submit_textfield, 'shake_textfield_animation');
						} else {
							Helper.toggle_class_for_animation(config.submit_textfield, 'shake_textfield_animation');
						}
						config.submit_textfield.value = '';
						if (typeof config.image[image_iteration] === 'undefined') {
							document.getElementsByClassName('result_text')[0].innerHTML = 'Ez Win!';
							Helper.show_element(config.fail_background);
						}
					}
				}
			}
		};
		return Button;
	}();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * This is the countdown panel; it will countdown until it reaches 0 before it displays the slider panel.
	 */
	module.exports = function () {
		"use strict";
	
		var Helper = __webpack_require__(4);
		var Config = __webpack_require__(5);
		var config = Config.elements;
		var Countdown_panel = {
			create_countdown_panel: function create_countdown_panel() {
				return Object.create(this.countdown_panel);
			},
	
			countdown_panel: {
				start_countdown_timer: function start_countdown_timer(countdown_number) {
					var self = this;
					var countdown_panel = document.getElementById('countdown_panel');
					var countdown_promise = new Promise(function (resolve, reject) {
						Helper.show_element(countdown_panel);
						countdown_panel.innerHTML = "";
						var countdown_timer = setInterval(function () {
							if (countdown_number === 0) {
								clearInterval(countdown_timer);
								Helper.hide_element(countdown_panel);
								resolve("Success");
							}
							countdown_panel.innerHTML = countdown_number--;
						}, 1000);
					});
					return countdown_promise;
				}
			}
		};
		return Countdown_panel;
	}();

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	// is it really the best way??? look up CommonJS/AMD/ES6 import/export (<-- I guess this is OK so far)
	// What about instead of Helper.method(), use Object.create? Does this help?
	// http://requirejs.org/docs/node.html#1
	// By using RequireJS on the server, you can use one format for all your modules, whether they are running server side or in the browser. (hmm...)
	module.exports = function () {
		"use strict";
	
		var ILLEGAL_CHARACTERS = new RegExp(/[\-\s]+/);
	
		/**
	  * Convert string to lower case and remove illegal characters.
	  */
		String.prototype.toLowerCaseAndRemoveIllegalCharacters = function () {
			var lowerCaseValue = this.toLowerCase();
			return lowerCaseValue.replace(ILLEGAL_CHARACTERS, '');
		};
	
		/**
	  * Find which CSS transition events end.
	  * https://jonsuh.com/blog/detect-the-end-of-css-animations-and-transitions-with-javascript/
	  */
		function which_transition_event() {
			var t,
			    el = document.createElement("fakeelement");
	
			var transitions = {
				"transition": "transitionend",
				"OTransition": "oTransitionEnd",
				"MozTransition": "transitionend",
				"WebkitTransition": "webkitTransitionEnd"
			};
	
			for (t in transitions) {
				if (el.style[t] !== undefined) {
					return transitions[t];
				}
			}
		}
	
		/**
	  * @param {Object} el - The element that we want to find the current position is relative to the window.
	  * https://www.kirupa.com/html5/get_element_position_using_javascript.htm
	  */
		function get_position(el) {
			var xPos = 0;
			var yPos = 0;
	
			while (el) {
				if (el.tagName == "BODY") {
					// deal with browser quirks with body/window/document and page scroll
					var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
					var yScroll = el.scrollTop || document.documentElement.scrollTop;
	
					xPos += el.offsetLeft - xScroll + el.clientLeft;
					yPos += el.offsetTop - yScroll + el.clientTop;
				} else {
					// for all other non-BODY elements
					xPos += el.offsetLeft - el.scrollLeft + el.clientLeft;
					yPos += el.offsetTop - el.scrollTop + el.clientTop;
				}
				el = el.offsetParent;
			}
	
			return {
				x: xPos,
				y: yPos
			};
		}
	
		/**
	  * Bind the focused element; it will call the callback when transition ends.
	  * @param  {Object} the object which will be binded by a transition end listener
	  * @param  {Function} the callback that will be called when transition end
	  */
		function transition_end(element, callback) {
			var transition_event = which_transition_event();
			element.addEventListener(transition_event, callback);
		}
	
		/**
	  * Display the element.
	  * @param  {Object} The element that will be displayed.
	  */
		function show_element(element, display) {
			if (typeof display !== 'undefined' && display !== '') {
				element.style.display = display;
			} else {
				element.style.display = 'flex';
			}
		}
	
		/**
	  * Hide the element.
	  * @param  {Object} The element that will be hidden.
	  */
		function hide_element(element) {
			for (var i = 0; i < arguments.length; i++) {
				arguments[i].style.display = 'none';
			}
		}
	
		/**
	  * Add a CSS class to an element.
	  * @param  {Object} The element that will have the added CSS class.
	  * @param  {String} className - The CSS class name
	  */
		function add_class(element, className) {
			if (!element.classList.contains(className)) {
				element.classList.add(className);
			}
		}
	
		/**
	  * Remove a CSS class from an element.
	  * @param  {Object} The element that will have the specified CSS class removed.
	  * @param  {String} className - The CSS class name
	  */
		function remove_class(element, className) {
			if (element.classList.contains(className)) {
				element.classList.remove(className);
			}
			// weird hack rule - https://css-tricks.com/restart-css-animation/
			void element.offsetWidth;
		}
	
		/**
	  * Toggle whether to add or remove CSS class.
	  * @param  {Object} The element that will add or remove the CSS class.
	  * @param  {String} className - The CSS class name
	  */
		function toggle_class(element, className) {
			if (element.classList.contains(className)) {
				remove_class(element, className);
			} else {
				add_class(element, className);
			}
		}
	
		/**
	  * Toggle whether to add or remove CSS class.
	  * @param  {Object} The element that will add or remove the CSS class.
	  * @param  {String} className - The CSS class name
	  */
		function toggle_class_for_animation(element, className) {
			if (element.classList.contains(className)) {
				remove_class(element, className);
			}
			add_class(element, className);
		}
	
		/**
	  * Validate if user input is a string.
	  * @param  {Object} The textfield that will be validated.
	  */
		function validate_if_input_is_dota_hero_name(image, textfield) {
			if (image.name.toLowerCaseAndRemoveIllegalCharacters() === textfield.value.toLowerCaseAndRemoveIllegalCharacters()) {
				return true;
			}
			return false;
		}
	
		return {
			transition_end: transition_end,
			get_position: get_position,
			show_element: show_element,
			hide_element: hide_element,
			add_class: add_class,
			remove_class: remove_class,
			toggle_class: toggle_class,
			toggle_class_for_animation: toggle_class_for_animation,
			validate_if_input_is_dota_hero_name: validate_if_input_is_dota_hero_name
		};
	}();

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	module.exports = function () {
		var _elements;
	
		var config = {
			elements: (_elements = {
				images: document.getElementsByClassName('images')[0],
				images_panel: document.getElementsByClassName('images_panel')[0],
				fail_background: document.getElementsByClassName('fail_background')[0],
				submit_textfield: document.getElementById('submit_textfield')
			}, _defineProperty(_elements, 'fail_background', document.getElementsByClassName('fail_background')[0]), _defineProperty(_elements, 'images', document.getElementsByClassName('images')[0]), _defineProperty(_elements, 'image', document.getElementsByClassName('image')), _defineProperty(_elements, 'instruction_panel', document.getElementsByClassName('instruction_panel')[0]), _defineProperty(_elements, 'add_points', document.getElementsByClassName('add_points')[0]), _defineProperty(_elements, 'wrapper', document.getElementsByClassName('wrapper')[0]), _defineProperty(_elements, 'slider_panel', document.getElementsByClassName('slider_panel')[0]), _defineProperty(_elements, 'high_score', document.getElementsByClassName('high_score')), _elements)
		};
		return config;
	}();

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * This is the slider that will be displayed after the countdown. It will display an endless stream of dota images that are retrieved via Dota API.
	 * It will constantly transition to the left until it reaches to the starting position of the panel that holds the images, which in that case the game
	 * lose. 
	 */
	module.exports = function () {
		"use strict";
	
		var Helper = __webpack_require__(4);
		var Config = __webpack_require__(5);
		var config = Config.elements;
		var SLIDE_DURATION = 10;
		var WARNING_THRESHOLD = 30;
		var url = 'http://lilmortal-test.apigee.net/getdotaheroes?key=6C1CF76C90768388618F348BB73EE015&language=en_us&format=JSON';
		var Slider = {
			create_slider: function create_slider() {
				return Object.create(this.slider_panel);
			},
	
	
			slider_panel: {
				get_status: function get_status(response) {
					if (response.status !== 200) {
						return Promise.reject(new Error(response.statusText));
					} else {
						return Promise.resolve(response);
					}
				},
				get_json: function get_json(response) {
					return response.json();
				},
				load_images: function load_images() {
					var self = this;
					fetch(url).then(this.get_status).then(this.get_json).then(function (response) {
						var heroes = response.result.heroes;
						var fragment = document.createDocumentFragment();
	
						for (var i = 0; i < heroes.length; i++) {
							var image = document.createElement('img');
							image.className = 'image';
							image.src = 'http://cdn.dota2.com/apps/dota2/images/heroes/' + heroes[i].name.replace('npc_dota_hero_', '') + '_lg.png';
							//It should be Tuskar, not Tusk!
							if (heroes[i].localized_name === 'Tusk') {
								heroes[i].localized_name = 'Tuskar';
							}
							image.name = heroes[i].localized_name;
							fragment.appendChild(image);
						}
						config.images.appendChild(fragment);
					});
				},
				slide: function slide() {
					var self = this;
					var screen_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
					var default_width = screen_width - config.images_panel.offsetWidth / 2 + config.images_panel.offsetWidth;
					var warning_width = default_width * WARNING_THRESHOLD / 100;
					var timer = void 0;
					config.images.style.marginLeft = '0';
					config.images.style.transition = SLIDE_DURATION + 's linear';
					Helper.remove_class(config.images_panel, 'warning_animation');
	
					timer = setInterval(function () {
						if (Helper.get_position(config.images).x <= warning_width) {
							Helper.add_class(config.images_panel, 'warning_animation');
							clearInterval(timer);
						}
					}, 1000);
				},
				start_slider: function start_slider() {
					var self = this;
					var slider = document.getElementsByClassName('slider_panel')[0];
					var slider_promise = new Promise(function (resolve, reject) {
						if (config.images.children.length === 0) {
							self.load_images();
						}
						Helper.show_element(slider);
						self.slide();
						resolve(config.images);
					});
					return slider_promise;
				}
			}
		};
		return Slider;
	}();

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	module.exports = function () {
		"use strict";
	
		var Button = __webpack_require__(2);
		var Textfield = {
			create_textfield: function create_textfield(callback) {
				return Object.create(this.textfield[callback]);
			},
	
	
			textfield: {
				submit_textfield: {
					submit: function submit() {
						var text = document.getElementById('submit_textfield');
						var submit_button = Button.create_button('submit_button');
	
						text.addEventListener('keyup', function (event) {
							if (event.keyCode === 13) {
								submit_button.submit();
							}
						});
					}
				}
			}
		};
		return Textfield;
	}();

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZDE2ODg3ZmU3OTA0ZmFhYzhlOWMiLCJ3ZWJwYWNrOi8vLy4vanMvaW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2J1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2NvdW50ZG93bl9wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29uZmlnLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvc2xpZGVyLmpzIiwid2VicGFjazovLy8uL2pzL2NvbXBvbmVudHMvdGV4dGZpZWxkLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDdENBLEVBQUMsWUFBVztBQUNYOztBQUVBLE1BQU0sU0FBUyxvQkFBUSxDQUFSLENBQWY7QUFDQSxNQUFNLFlBQVksb0JBQVEsQ0FBUixDQUFsQjs7QUFFQTtBQUNBO0FBQ0EsTUFBTSxlQUFlLE9BQU8sYUFBUCxDQUFxQixjQUFyQixDQUFyQjtBQUNBLGVBQWEsVUFBYixDQUF3QixPQUF4Qjs7QUFFQSxNQUFNLGNBQWMsT0FBTyxhQUFQLENBQXFCLGFBQXJCLENBQXBCO0FBQ0EsY0FBWSxVQUFaLENBQXVCLE1BQXZCOztBQUVBLE1BQU0sZ0JBQWdCLE9BQU8sYUFBUCxDQUFxQixlQUFyQixDQUF0QjtBQUNBLGdCQUFjLFVBQWQsQ0FBeUIsUUFBekI7O0FBRUEsTUFBTSxtQkFBbUIsVUFBVSxnQkFBVixDQUEyQixrQkFBM0IsQ0FBekI7QUFDQSxtQkFBaUIsTUFBakI7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WUFBVztBQUM1Qjs7QUFDQSxNQUFNLFNBQVMsb0JBQVEsQ0FBUixDQUFmO0FBQ0EsTUFBTSxZQUFZO0FBQ2pCLG1CQURpQiw0QkFDQSxRQURBLEVBQ1U7QUFDMUIsV0FBTyxPQUFPLE1BQVAsQ0FBYyxLQUFLLFNBQUwsQ0FBZSxRQUFmLENBQWQsQ0FBUDtBQUNBLElBSGdCOzs7QUFLakIsY0FBVztBQUNWLHNCQUFrQjtBQUNqQixXQURpQixvQkFDUjtBQUNSLFVBQU0sT0FBTyxTQUFTLGNBQVQsQ0FBd0Isa0JBQXhCLENBQWI7QUFDQSxVQUFNLGdCQUFnQixPQUFPLGFBQVAsQ0FBcUIsZUFBckIsQ0FBdEI7O0FBRUEsV0FBSyxnQkFBTCxDQUFzQixPQUF0QixFQUErQixVQUFTLEtBQVQsRUFBZ0I7QUFDOUMsV0FBSSxNQUFNLE9BQU4sS0FBa0IsRUFBdEIsRUFBMEI7QUFDekIsc0JBQWMsTUFBZDtBQUNBO0FBQ0QsT0FKRDtBQUtBO0FBVmdCO0FBRFI7QUFMTSxHQUFsQjtBQW9CQSxTQUFPLFNBQVA7QUFDQSxFQXhCZ0IsRUFBakIsQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGQxNjg4N2ZlNzkwNGZhYWM4ZTljXG4gKiovIiwiKGZ1bmN0aW9uKCkge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRjb25zdCBCdXR0b24gPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvYnV0dG9uLmpzJyk7XHJcblx0Y29uc3QgVGV4dGZpZWxkID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3RleHRmaWVsZC5qcycpO1xyXG5cclxuXHQvL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCkuaW5pdFN0YXJ0IGJldHRlcj8gdXNlIFwidGhpc1wiP1xyXG5cdC8vIE9SIFRSWSBVU0UgRkFDVE9SWSBQQVRURVJOIE9OIFRISVM/IFxyXG5cdGNvbnN0IHN0YXJ0X2J1dHRvbiA9IEJ1dHRvbi5jcmVhdGVfYnV0dG9uKCdzdGFydF9idXR0b24nKTtcclxuXHRzdGFydF9idXR0b24uaWZfY2xpY2tlZCgnc3RhcnQnKTtcclxuXHJcblx0Y29uc3QgZmFpbF9idXR0b24gPSBCdXR0b24uY3JlYXRlX2J1dHRvbignZmFpbF9idXR0b24nKTtcclxuXHRmYWlsX2J1dHRvbi5pZl9jbGlja2VkKCdmYWlsJyk7XHJcblxyXG5cdGNvbnN0IHN1Ym1pdF9idXR0b24gPSBCdXR0b24uY3JlYXRlX2J1dHRvbignc3VibWl0X2J1dHRvbicpO1xyXG5cdHN1Ym1pdF9idXR0b24uaWZfY2xpY2tlZCgnc3VibWl0Jyk7XHJcblxyXG5cdGNvbnN0IHN1Ym1pdF90ZXh0ZmllbGQgPSBUZXh0ZmllbGQuY3JlYXRlX3RleHRmaWVsZCgnc3VibWl0X3RleHRmaWVsZCcpO1xyXG5cdHN1Ym1pdF90ZXh0ZmllbGQuc3VibWl0KCk7XHJcbn0pKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9pbml0LmpzXG4gKiovIiwiLyoqXHJcbiAqIFRoaXMgaXMgYSBnZW5lcmljIGJ1dHRvbiwgd2hpY2ggaGFzIGEgbXVsdGl0dWRlIG9mIGdlbmVyaWMgdG8gc3BlY2lmaWMgZnVuY3Rpb25zIGZvciBhbGwgcG9zc2libGUgc2NlbmFyaW9zLlxyXG4gKiBAcGFyYW0ge09iamVjdH0gQnV0dG9uXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0Y29uc3QgQ09VTlRET1dOX05VTUJFUiA9IDM7XHJcblx0Y29uc3QgQ291bnRkb3duX3BhbmVsID0gcmVxdWlyZSgnLi9jb3VudGRvd25fcGFuZWwuanMnKTtcclxuXHRjb25zdCBTbGlkZXIgPSByZXF1aXJlKCcuL3NsaWRlci5qcycpO1xyXG5cdGNvbnN0IEhlbHBlciA9IHJlcXVpcmUoJy4uL2hlbHBlci5qcycpO1xyXG5cdGNvbnN0IENvbmZpZyA9IHJlcXVpcmUoJy4uL2NvbmZpZy5qcycpO1xyXG5cdC8vVE9ETyAtIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgaXMgYmV0dGVyIG9yIG5haD8gSGVhcmQgcGVyZm9ybWFuY2UgaXMgd29yc2UgYnV0IGhvdyBiYWQgaXMgaXQ/IHdoeSBxdWVyeXNlbGVjdG9yIG92ZXIgZ2V0ZWxlbWVudD9cclxuXHQvLyBUSElTIElTIFRPTyBTSElULCBJVFMgVE9PIERFUEVOREVOVCBPTiBIQVJEIENPREVEIFZBUklBQkxFUzsgQ0FOIEFOR1VMQVIgMiBERVBFTkRFTkNZIElOSkVDVElPTiBIRUxQPyBJIEtOT1dcclxuXHQvLyBSRUFDVCBDQU4gV0lUSCBJVFMgQ09NUE9ORU5UIEJBU0VEIExJQlJBUlk7IFdIQVQgQUJPVVQgRU1CRVI/IFdIWSBBUkUgUEVPUExFIERJVENISU5HIEVNQkVSPyBUT08gT0xEPyBLTk9DS09VVCBNVlZNIEhFTFBTPz8gRVFVSVZBTEVOVCBGT1IgVkFOSUxMQSBKUz9cclxuXHRjb25zdCBjb25maWcgPSBDb25maWcuZWxlbWVudHM7XHJcblx0bGV0IGltYWdlX2l0ZXJhdGlvbiA9IDA7XHJcblx0Y29uc3QgQnV0dG9uID0ge1xyXG5cdFx0Y3JlYXRlX2J1dHRvbih0eXBlKSB7XHJcblx0XHRcdHJldHVybiBPYmplY3QuY3JlYXRlKHRoaXMuYnV0dG9uW3R5cGVdKTtcclxuXHRcdH0sXHJcblxyXG5cdFx0YnV0dG9uOiB7XHJcblx0XHRcdHN0YXJ0X2J1dHRvbjoge1x0XHJcblx0XHRcdFx0aWZfY2xpY2tlZChjYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0X2J1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdHNlbGZbY2FsbGJhY2tdKCk7XHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHN0YXJ0KCkge1xyXG5cdFx0XHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0XHRcdFx0SGVscGVyLnRvZ2dsZV9jbGFzc19mb3JfYW5pbWF0aW9uKGNvbmZpZy53cmFwcGVyLCAnZ3JheXNjYWxlX2JhY2tncm91bmRfYW5pbWF0aW9uJyk7XHJcblx0XHRcdFx0XHRIZWxwZXIuaGlkZV9lbGVtZW50KGNvbmZpZy5pbnN0cnVjdGlvbl9wYW5lbCk7XHJcblx0XHRcdFx0XHRzZWxmLnN0YXJ0X3NsaWRlcl9jb3VudGRvd24oQ09VTlRET1dOX05VTUJFUikudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHRcdFx0XHRzZWxmLnN0YXJ0X3NsaWRlcigpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcclxuXHRcdFx0XHRcdFx0XHRzZWxmLmRpc3BsYXlfZmFpbF9wYW5lbChyZXNwb25zZSk7XHJcblx0XHRcdFx0XHRcdH0pXHJcblx0XHRcdFx0XHR9KTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHN0YXJ0X3NsaWRlcl9jb3VudGRvd24oY291bnRkb3duTnVtYmVyKSB7XHJcblx0XHRcdFx0XHRjb25zdCBjb3VudGRvd25fcGFuZWwgPSBDb3VudGRvd25fcGFuZWwuY3JlYXRlX2NvdW50ZG93bl9wYW5lbCgpO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGNvdW50ZG93bl9wYW5lbC5zdGFydF9jb3VudGRvd25fdGltZXIoY291bnRkb3duTnVtYmVyKTtcclxuXHRcdFx0XHR9LFxyXG5cdFx0XHRcdHN0YXJ0X3NsaWRlcigpIHtcclxuXHRcdFx0XHRcdGNvbnN0IHNsaWRlciA9IFNsaWRlci5jcmVhdGVfc2xpZGVyKCk7XHJcblx0XHRcdFx0XHRyZXR1cm4gc2xpZGVyLnN0YXJ0X3NsaWRlcigpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZGlzcGxheV9mYWlsX3BhbmVsKGltYWdlcykge1xyXG5cdFx0XHRcdFx0SGVscGVyLnRyYW5zaXRpb25fZW5kKGltYWdlcywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Jlc3VsdF90ZXh0JylbMF0uaW5uZXJIVE1MID0gJ1lvdSBsb3NlLi4uJztcclxuXHRcdFx0XHRcdFx0SGVscGVyLnNob3dfZWxlbWVudChjb25maWcuZmFpbF9iYWNrZ3JvdW5kKTtcclxuXHRcdFx0XHRcdH0pO1x0XHRcdFx0XHRcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sXHJcblx0XHRcdGZhaWxfYnV0dG9uOiB7XHJcblx0XHRcdFx0aWZfY2xpY2tlZChjYWxsYmFjaykge1xyXG5cdFx0XHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZhaWxfYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0c2VsZltjYWxsYmFja10oKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0ZmFpbCgpIHtcclxuXHRcdFx0XHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdFx0XHRcdEhlbHBlci5oaWRlX2VsZW1lbnQoY29uZmlnLmZhaWxfYmFja2dyb3VuZCwgY29uZmlnLnNsaWRlcl9wYW5lbCk7XHJcblx0XHRcdFx0XHQvLyByZXNldCB0aGUgaW1hZ2VzXHJcblx0XHRcdFx0XHRjb25maWcuaW1hZ2VzLnN0eWxlLm1hcmdpbkxlZnQgPSAnMTAwJSc7XHJcblx0XHQgIFx0XHRcdGNvbmZpZy5pbWFnZXMuc3R5bGUudHJhbnNpdGlvbiA9ICcwcyc7XHJcblx0XHQgIFx0XHQgIFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBjb25maWcuaW1hZ2UubGVuZ3RoOyBpKyspIHtcclxuXHRcdCAgXHRcdFx0XHRjb25maWcuaW1hZ2VbaV0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcblx0XHQgIFx0XHRcdH1cclxuXHRcdCAgXHRcdFx0aW1hZ2VfaXRlcmF0aW9uID0gMDtcclxuXHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgY29uZmlnLmhpZ2hfc2NvcmUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRcdFx0Y29uZmlnLmhpZ2hfc2NvcmVbaV0uaW5uZXJIVE1MID0gMDtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGNvbmZpZy5zdWJtaXRfdGV4dGZpZWxkLnZhbHVlID0gJyc7XHJcblx0XHRcdFx0XHRIZWxwZXIucmVtb3ZlX2NsYXNzKGNvbmZpZy5zdWJtaXRfdGV4dGZpZWxkLCAnc2hha2VfdGV4dGZpZWxkX2FuaW1hdGlvbicpO1xyXG5cdFx0XHRcdFx0SGVscGVyLnJlbW92ZV9jbGFzcyhjb25maWcuYWRkX3BvaW50cywgJ2FkZF9wb2ludHNfYW5pbWF0aW9uJyk7XHJcblx0XHRcdFx0XHRjb25maWcuYWRkX3BvaW50cy5zdHlsZS5vcGFjaXR5ID0gMDtcclxuXHJcblx0XHRcdFx0XHRIZWxwZXIudG9nZ2xlX2NsYXNzX2Zvcl9hbmltYXRpb24oY29uZmlnLndyYXBwZXIsICdncmF5c2NhbGVfYmFja2dyb3VuZF9hbmltYXRpb24nKTtcclxuXHRcdFx0XHRcdHNlbGYuc3RhcnRfc2xpZGVyX2NvdW50ZG93bihDT1VOVERPV05fTlVNQkVSKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0XHRcdHNlbGYuc3RhcnRfc2xpZGVyKCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xyXG5cdFx0XHRcdFx0XHRcdHNlbGYuZGlzcGxheV9mYWlsX3BhbmVsKHJlc3BvbnNlKTtcclxuXHRcdFx0XHRcdFx0fSlcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0c3RhcnRfc2xpZGVyX2NvdW50ZG93bihjb3VudGRvd25OdW1iZXIpIHtcclxuXHRcdFx0XHRcdGNvbnN0IGNvdW50ZG93bl9wYW5lbCA9IENvdW50ZG93bl9wYW5lbC5jcmVhdGVfY291bnRkb3duX3BhbmVsKCk7XHJcblx0XHRcdFx0XHRyZXR1cm4gY291bnRkb3duX3BhbmVsLnN0YXJ0X2NvdW50ZG93bl90aW1lcihjb3VudGRvd25OdW1iZXIpO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0c3RhcnRfc2xpZGVyKCkge1xyXG5cdFx0XHRcdFx0Y29uc3Qgc2xpZGVyID0gU2xpZGVyLmNyZWF0ZV9zbGlkZXIoKTtcclxuXHRcdFx0XHRcdHJldHVybiBzbGlkZXIuc3RhcnRfc2xpZGVyKCk7XHJcblx0XHRcdFx0fSxcclxuXHRcdFx0XHRkaXNwbGF5X2ZhaWxfcGFuZWwoaW1hZ2VzKSB7XHJcblx0XHRcdFx0XHRIZWxwZXIudHJhbnNpdGlvbl9lbmQoaW1hZ2VzLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncmVzdWx0X3RleHQnKVswXS5pbm5lckhUTUwgPSAnWW91IGxvc2UuLi4nO1xyXG5cdFx0XHRcdFx0XHRIZWxwZXIuc2hvd19lbGVtZW50KGNvbmZpZy5mYWlsX2JhY2tncm91bmQpO1xyXG5cdFx0XHRcdFx0fSk7XHRcdFx0XHRcdFxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSxcclxuXHRcdFx0c3VibWl0X2J1dHRvbjoge1xyXG5cdFx0XHRcdGlmX2NsaWNrZWQoY2FsbGJhY2spIHtcclxuXHRcdFx0XHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXRfYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdFx0c2VsZltjYWxsYmFja10oKTtcclxuXHRcdFx0XHRcdH0pO1xyXG5cdFx0XHRcdH0sXHJcblx0XHRcdFx0c3VibWl0KCkge1xyXG5cdFx0XHQgIFx0XHRpZiAoSGVscGVyLnZhbGlkYXRlX2lmX2lucHV0X2lzX2RvdGFfaGVyb19uYW1lKGNvbmZpZy5pbWFnZVtpbWFnZV9pdGVyYXRpb25dLCBjb25maWcuc3VibWl0X3RleHRmaWVsZCkpIHtcclxuXHRcdFx0ICBcdFx0XHRIZWxwZXIuaGlkZV9lbGVtZW50KGNvbmZpZy5pbWFnZVtpbWFnZV9pdGVyYXRpb25dKTtcclxuXHRcdFx0ICBcdFx0XHRpbWFnZV9pdGVyYXRpb24rKztcclxuXHRcdFx0ICBcdFx0XHRjb25maWcuYWRkX3BvaW50cy5pbm5lckhUTUwgPSBcIisxMDBcIjtcclxuXHRcdFx0ICBcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGNvbmZpZy5oaWdoX3Njb3JlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdCAgXHRcdFx0XHRjb25maWcuaGlnaF9zY29yZVtpXS5pbm5lckhUTUwgPSBwYXJzZUludChjb25maWcuaGlnaF9zY29yZVtpXS5pbm5lckhUTUwpICsgMTAwO1xyXG5cdFx0XHQgIFx0XHRcdH1cclxuXHRcdFx0ICBcdFx0XHRIZWxwZXIudG9nZ2xlX2NsYXNzX2Zvcl9hbmltYXRpb24oY29uZmlnLmFkZF9wb2ludHMsICdhZGRfcG9pbnRzX2FuaW1hdGlvbicpO1xyXG5cdFx0XHQgIFx0XHRcdEhlbHBlci5yZW1vdmVfY2xhc3MoY29uZmlnLnN1Ym1pdF90ZXh0ZmllbGQsICdzaGFrZV90ZXh0ZmllbGRfYW5pbWF0aW9uJyk7XHJcblx0XHRcdCAgXHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdEhlbHBlci50b2dnbGVfY2xhc3NfZm9yX2FuaW1hdGlvbihjb25maWcuc3VibWl0X3RleHRmaWVsZCwgJ3NoYWtlX3RleHRmaWVsZF9hbmltYXRpb24nKTtcclxuXHRcdFx0ICBcdFx0fVxyXG5cdFx0XHQgIFx0XHRjb25maWcuc3VibWl0X3RleHRmaWVsZC52YWx1ZSA9ICcnO1xyXG5cdFx0XHQgIFx0XHRpZiAodHlwZW9mIGNvbmZpZy5pbWFnZVtpbWFnZV9pdGVyYXRpb25dID09PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHQgIFx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Jlc3VsdF90ZXh0JylbMF0uaW5uZXJIVE1MID0gJ0V6IFdpbiEnO1xyXG5cdFx0XHQgIFx0XHRcdEhlbHBlci5zaG93X2VsZW1lbnQoY29uZmlnLmZhaWxfYmFja2dyb3VuZCk7XHJcblx0XHRcdCAgXHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIEJ1dHRvbjtcclxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2NvbXBvbmVudHMvYnV0dG9uLmpzXG4gKiovIiwiLyoqXHJcbiAqIFRoaXMgaXMgdGhlIGNvdW50ZG93biBwYW5lbDsgaXQgd2lsbCBjb3VudGRvd24gdW50aWwgaXQgcmVhY2hlcyAwIGJlZm9yZSBpdCBkaXNwbGF5cyB0aGUgc2xpZGVyIHBhbmVsLlxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblx0XHJcblx0Y29uc3QgSGVscGVyID0gcmVxdWlyZSgnLi4vaGVscGVyLmpzJyk7XHJcblx0Y29uc3QgQ29uZmlnID0gcmVxdWlyZSgnLi4vY29uZmlnLmpzJyk7XHJcblx0Y29uc3QgY29uZmlnID0gQ29uZmlnLmVsZW1lbnRzO1xyXG5cdGNvbnN0IENvdW50ZG93bl9wYW5lbCA9IHtcclxuXHRcdGNyZWF0ZV9jb3VudGRvd25fcGFuZWwoKSB7XHJcblx0XHRcdHJldHVybiBPYmplY3QuY3JlYXRlKHRoaXMuY291bnRkb3duX3BhbmVsKTtcclxuXHRcdH0sXHJcblx0XHRjb3VudGRvd25fcGFuZWw6IHtcclxuXHRcdFx0c3RhcnRfY291bnRkb3duX3RpbWVyKGNvdW50ZG93bl9udW1iZXIpIHtcclxuXHRcdFx0XHRjb25zdCBzZWxmID0gdGhpcztcclxuXHRcdFx0XHRjb25zdCBjb3VudGRvd25fcGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY291bnRkb3duX3BhbmVsJyk7XHJcblx0XHRcdFx0Y29uc3QgY291bnRkb3duX3Byb21pc2UgPSBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcclxuXHRcdFx0XHRcdEhlbHBlci5zaG93X2VsZW1lbnQoY291bnRkb3duX3BhbmVsKTtcclxuXHRcdFx0XHRcdGNvdW50ZG93bl9wYW5lbC5pbm5lckhUTUwgPSBcIlwiO1xyXG5cdFx0XHRcdFx0Y29uc3QgY291bnRkb3duX3RpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcblx0XHRcdCAgICAgIFx0XHRpZiAoY291bnRkb3duX251bWJlciA9PT0gMCkge1xyXG5cdFx0XHQgICAgICAgIFx0XHRjbGVhckludGVydmFsKGNvdW50ZG93bl90aW1lcik7XHJcblx0XHRcdCAgICAgICAgXHRcdEhlbHBlci5oaWRlX2VsZW1lbnQoY291bnRkb3duX3BhbmVsKTtcclxuXHRcdFx0ICAgICAgICBcdFx0cmVzb2x2ZShcIlN1Y2Nlc3NcIik7XHJcblx0XHRcdCAgICAgICAgXHR9XHJcblx0XHRcdCAgICAgICAgXHRjb3VudGRvd25fcGFuZWwuaW5uZXJIVE1MID0gY291bnRkb3duX251bWJlci0tO1xyXG5cdFx0XHQgICAgXHR9LCAxMDAwKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0XHRyZXR1cm4gY291bnRkb3duX3Byb21pc2U7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcblx0cmV0dXJuIENvdW50ZG93bl9wYW5lbDtcclxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2NvbXBvbmVudHMvY291bnRkb3duX3BhbmVsLmpzXG4gKiovIiwiLy8gaXMgaXQgcmVhbGx5IHRoZSBiZXN0IHdheT8/PyBsb29rIHVwIENvbW1vbkpTL0FNRC9FUzYgaW1wb3J0L2V4cG9ydCAoPC0tIEkgZ3Vlc3MgdGhpcyBpcyBPSyBzbyBmYXIpXHJcbi8vIFdoYXQgYWJvdXQgaW5zdGVhZCBvZiBIZWxwZXIubWV0aG9kKCksIHVzZSBPYmplY3QuY3JlYXRlPyBEb2VzIHRoaXMgaGVscD9cclxuLy8gaHR0cDovL3JlcXVpcmVqcy5vcmcvZG9jcy9ub2RlLmh0bWwjMVxyXG4vLyBCeSB1c2luZyBSZXF1aXJlSlMgb24gdGhlIHNlcnZlciwgeW91IGNhbiB1c2Ugb25lIGZvcm1hdCBmb3IgYWxsIHlvdXIgbW9kdWxlcywgd2hldGhlciB0aGV5IGFyZSBydW5uaW5nIHNlcnZlciBzaWRlIG9yIGluIHRoZSBicm93c2VyLiAoaG1tLi4uKVxyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHRcclxuXHRjb25zdCBJTExFR0FMX0NIQVJBQ1RFUlMgPSBuZXcgUmVnRXhwKC9bXFwtXFxzXSsvKTtcclxuXHJcbiAgXHQvKipcclxuICBcdCAqIENvbnZlcnQgc3RyaW5nIHRvIGxvd2VyIGNhc2UgYW5kIHJlbW92ZSBpbGxlZ2FsIGNoYXJhY3RlcnMuXHJcbiAgXHQgKi9cclxuICBcdFN0cmluZy5wcm90b3R5cGUudG9Mb3dlckNhc2VBbmRSZW1vdmVJbGxlZ2FsQ2hhcmFjdGVycyA9IGZ1bmN0aW9uKCkge1xyXG4gIFx0XHRsZXQgbG93ZXJDYXNlVmFsdWUgPSB0aGlzLnRvTG93ZXJDYXNlKCk7XHJcbiAgXHRcdHJldHVybiBsb3dlckNhc2VWYWx1ZS5yZXBsYWNlKElMTEVHQUxfQ0hBUkFDVEVSUywgJycpO1xyXG4gIFx0fVxyXG4gIFx0XHJcblx0LyoqXHJcblx0ICogRmluZCB3aGljaCBDU1MgdHJhbnNpdGlvbiBldmVudHMgZW5kLlxyXG5cdCAqIGh0dHBzOi8vam9uc3VoLmNvbS9ibG9nL2RldGVjdC10aGUtZW5kLW9mLWNzcy1hbmltYXRpb25zLWFuZC10cmFuc2l0aW9ucy13aXRoLWphdmFzY3JpcHQvXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gd2hpY2hfdHJhbnNpdGlvbl9ldmVudCgpe1xyXG5cdCAgdmFyIHQsXHJcblx0ICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmFrZWVsZW1lbnRcIik7XHJcblxyXG5cdCAgdmFyIHRyYW5zaXRpb25zID0ge1xyXG5cdCAgICBcInRyYW5zaXRpb25cIiAgICAgIDogXCJ0cmFuc2l0aW9uZW5kXCIsXHJcblx0ICAgIFwiT1RyYW5zaXRpb25cIiAgICAgOiBcIm9UcmFuc2l0aW9uRW5kXCIsXHJcblx0ICAgIFwiTW96VHJhbnNpdGlvblwiICAgOiBcInRyYW5zaXRpb25lbmRcIixcclxuXHQgICAgXCJXZWJraXRUcmFuc2l0aW9uXCI6IFwid2Via2l0VHJhbnNpdGlvbkVuZFwiXHJcblx0ICB9XHJcblxyXG5cdCAgZm9yICh0IGluIHRyYW5zaXRpb25zKXtcclxuXHQgICAgaWYgKGVsLnN0eWxlW3RdICE9PSB1bmRlZmluZWQpe1xyXG5cdCAgICAgIHJldHVybiB0cmFuc2l0aW9uc1t0XTtcclxuXHQgICAgfVxyXG5cdCAgfVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IGVsIC0gVGhlIGVsZW1lbnQgdGhhdCB3ZSB3YW50IHRvIGZpbmQgdGhlIGN1cnJlbnQgcG9zaXRpb24gaXMgcmVsYXRpdmUgdG8gdGhlIHdpbmRvdy5cclxuXHQgKiBodHRwczovL3d3dy5raXJ1cGEuY29tL2h0bWw1L2dldF9lbGVtZW50X3Bvc2l0aW9uX3VzaW5nX2phdmFzY3JpcHQuaHRtXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gZ2V0X3Bvc2l0aW9uKGVsKSB7XHJcblx0XHR2YXIgeFBvcyA9IDA7XHJcblx0XHR2YXIgeVBvcyA9IDA7XHJcblxyXG5cdFx0d2hpbGUgKGVsKSB7XHJcblx0XHRcdGlmIChlbC50YWdOYW1lID09IFwiQk9EWVwiKSB7XHJcblx0XHRcdFx0Ly8gZGVhbCB3aXRoIGJyb3dzZXIgcXVpcmtzIHdpdGggYm9keS93aW5kb3cvZG9jdW1lbnQgYW5kIHBhZ2Ugc2Nyb2xsXHJcblx0XHRcdFx0dmFyIHhTY3JvbGwgPSBlbC5zY3JvbGxMZWZ0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0O1xyXG5cdFx0XHRcdHZhciB5U2Nyb2xsID0gZWwuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XHJcblxyXG5cdFx0XHRcdHhQb3MgKz0gKGVsLm9mZnNldExlZnQgLSB4U2Nyb2xsICsgZWwuY2xpZW50TGVmdCk7XHJcblx0XHRcdFx0eVBvcyArPSAoZWwub2Zmc2V0VG9wIC0geVNjcm9sbCArIGVsLmNsaWVudFRvcCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8gZm9yIGFsbCBvdGhlciBub24tQk9EWSBlbGVtZW50c1xyXG5cdFx0XHRcdHhQb3MgKz0gKGVsLm9mZnNldExlZnQgLSBlbC5zY3JvbGxMZWZ0ICsgZWwuY2xpZW50TGVmdCk7XHJcblx0XHRcdFx0eVBvcyArPSAoZWwub2Zmc2V0VG9wIC0gZWwuc2Nyb2xsVG9wICsgZWwuY2xpZW50VG9wKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbCA9IGVsLm9mZnNldFBhcmVudDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR4OiB4UG9zLFxyXG5cdFx0XHR5OiB5UG9zXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZCB0aGUgZm9jdXNlZCBlbGVtZW50OyBpdCB3aWxsIGNhbGwgdGhlIGNhbGxiYWNrIHdoZW4gdHJhbnNpdGlvbiBlbmRzLlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gdGhlIG9iamVjdCB3aGljaCB3aWxsIGJlIGJpbmRlZCBieSBhIHRyYW5zaXRpb24gZW5kIGxpc3RlbmVyXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IHRoZSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW4gdHJhbnNpdGlvbiBlbmRcclxuXHQgKi9cclxuICBcdGZ1bmN0aW9uIHRyYW5zaXRpb25fZW5kKGVsZW1lbnQsIGNhbGxiYWNrKSB7XHJcblx0ICAgIGNvbnN0IHRyYW5zaXRpb25fZXZlbnQgPSB3aGljaF90cmFuc2l0aW9uX2V2ZW50KCk7XHJcblx0ICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0cmFuc2l0aW9uX2V2ZW50LCBjYWxsYmFjayk7XHJcbiAgXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERpc3BsYXkgdGhlIGVsZW1lbnQuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgZGlzcGxheWVkLlxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHNob3dfZWxlbWVudChlbGVtZW50LCBkaXNwbGF5KSB7XHJcblx0XHRpZiAodHlwZW9mIGRpc3BsYXkgIT09ICd1bmRlZmluZWQnICYmIGRpc3BsYXkgIT09ICcnKSB7XHJcblx0XHRcdGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBIaWRlIHRoZSBlbGVtZW50LlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIGhpZGRlbi5cclxuXHQgKi9cclxuXHRmdW5jdGlvbiBoaWRlX2VsZW1lbnQoZWxlbWVudCkge1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0YXJndW1lbnRzW2ldLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgYSBDU1MgY2xhc3MgdG8gYW4gZWxlbWVudC5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBoYXZlIHRoZSBhZGRlZCBDU1MgY2xhc3MuXHJcblx0ICogQHBhcmFtICB7U3RyaW5nfSBjbGFzc05hbWUgLSBUaGUgQ1NTIGNsYXNzIG5hbWVcclxuXHQgKi9cclxuXHRmdW5jdGlvbiBhZGRfY2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XHJcblx0XHRpZiAoIWVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmUgYSBDU1MgY2xhc3MgZnJvbSBhbiBlbGVtZW50LlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGhhdmUgdGhlIHNwZWNpZmllZCBDU1MgY2xhc3MgcmVtb3ZlZC5cclxuXHQgKiBAcGFyYW0gIHtTdHJpbmd9IGNsYXNzTmFtZSAtIFRoZSBDU1MgY2xhc3MgbmFtZVxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHJlbW92ZV9jbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIHtcclxuXHRcdGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xyXG5cdFx0fVxyXG5cdFx0Ly8gd2VpcmQgaGFjayBydWxlIC0gaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9yZXN0YXJ0LWNzcy1hbmltYXRpb24vXHJcblx0XHR2b2lkIGVsZW1lbnQub2Zmc2V0V2lkdGg7XHRcdFxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVG9nZ2xlIHdoZXRoZXIgdG8gYWRkIG9yIHJlbW92ZSBDU1MgY2xhc3MuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYWRkIG9yIHJlbW92ZSB0aGUgQ1NTIGNsYXNzLlxyXG5cdCAqIEBwYXJhbSAge1N0cmluZ30gY2xhc3NOYW1lIC0gVGhlIENTUyBjbGFzcyBuYW1lXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gdG9nZ2xlX2NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xyXG5cdFx0aWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcclxuXHRcdFx0cmVtb3ZlX2NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcbiAgXHRcdH0gZWxzZSB7XHJcbiAgXHRcdFx0YWRkX2NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHRcdFx0XHJcbiAgXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRvZ2dsZSB3aGV0aGVyIHRvIGFkZCBvciByZW1vdmUgQ1NTIGNsYXNzLlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGFkZCBvciByZW1vdmUgdGhlIENTUyBjbGFzcy5cclxuXHQgKiBAcGFyYW0gIHtTdHJpbmd9IGNsYXNzTmFtZSAtIFRoZSBDU1MgY2xhc3MgbmFtZVxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHRvZ2dsZV9jbGFzc19mb3JfYW5pbWF0aW9uKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xyXG5cdFx0aWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcclxuXHRcdFx0cmVtb3ZlX2NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcbiAgXHRcdH1cclxuICBcdFx0YWRkX2NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBWYWxpZGF0ZSBpZiB1c2VyIGlucHV0IGlzIGEgc3RyaW5nLlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIHRleHRmaWVsZCB0aGF0IHdpbGwgYmUgdmFsaWRhdGVkLlxyXG5cdCAqL1xyXG4gIFx0ZnVuY3Rpb24gdmFsaWRhdGVfaWZfaW5wdXRfaXNfZG90YV9oZXJvX25hbWUoaW1hZ2UsIHRleHRmaWVsZCkge1xyXG5cdFx0aWYgKGltYWdlLm5hbWUudG9Mb3dlckNhc2VBbmRSZW1vdmVJbGxlZ2FsQ2hhcmFjdGVycygpID09PSB0ZXh0ZmllbGQudmFsdWUudG9Mb3dlckNhc2VBbmRSZW1vdmVJbGxlZ2FsQ2hhcmFjdGVycygpKSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG4gIFx0fVxyXG5cclxuICBcdHJldHVybiB7XHJcbiAgXHRcdHRyYW5zaXRpb25fZW5kLFxyXG4gIFx0XHRnZXRfcG9zaXRpb24sXHJcbiAgXHRcdHNob3dfZWxlbWVudCxcclxuICBcdFx0aGlkZV9lbGVtZW50LFxyXG4gIFx0XHRhZGRfY2xhc3MsXHJcbiAgXHRcdHJlbW92ZV9jbGFzcyxcclxuICBcdFx0dG9nZ2xlX2NsYXNzLFxyXG4gIFx0XHR0b2dnbGVfY2xhc3NfZm9yX2FuaW1hdGlvbixcclxuICBcdFx0dmFsaWRhdGVfaWZfaW5wdXRfaXNfZG90YV9oZXJvX25hbWVcclxuICBcdH1cclxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2hlbHBlci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xyXG5cdGNvbnN0IGNvbmZpZyA9IHtcclxuXHRcdGVsZW1lbnRzOiB7XHJcblx0XHRcdGltYWdlczogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VzJylbMF0sXHJcblx0XHRcdGltYWdlc19wYW5lbDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VzX3BhbmVsJylbMF0sXHJcblx0XHRcdGZhaWxfYmFja2dyb3VuZDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZmFpbF9iYWNrZ3JvdW5kJylbMF0sXHJcblx0XHRcdHN1Ym1pdF90ZXh0ZmllbGQ6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXRfdGV4dGZpZWxkJyksXHJcblx0XHRcdGZhaWxfYmFja2dyb3VuZDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZmFpbF9iYWNrZ3JvdW5kJylbMF0sXHJcblx0XHRcdGltYWdlczogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VzJylbMF0sXHJcblx0XHRcdGltYWdlOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZScpLFxyXG5cdFx0XHRpbnN0cnVjdGlvbl9wYW5lbDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW5zdHJ1Y3Rpb25fcGFuZWwnKVswXSxcclxuXHRcdFx0YWRkX3BvaW50czogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWRkX3BvaW50cycpWzBdLFxyXG5cdFx0XHR3cmFwcGVyOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd3cmFwcGVyJylbMF0sXHJcblx0XHRcdHNsaWRlcl9wYW5lbDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGVyX3BhbmVsJylbMF0sXHJcblx0XHRcdGhpZ2hfc2NvcmU6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2hpZ2hfc2NvcmUnKVxyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gY29uZmlnO1xyXG59KSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvY29uZmlnLmpzXG4gKiovIiwiLyoqXHJcbiAqIFRoaXMgaXMgdGhlIHNsaWRlciB0aGF0IHdpbGwgYmUgZGlzcGxheWVkIGFmdGVyIHRoZSBjb3VudGRvd24uIEl0IHdpbGwgZGlzcGxheSBhbiBlbmRsZXNzIHN0cmVhbSBvZiBkb3RhIGltYWdlcyB0aGF0IGFyZSByZXRyaWV2ZWQgdmlhIERvdGEgQVBJLlxyXG4gKiBJdCB3aWxsIGNvbnN0YW50bHkgdHJhbnNpdGlvbiB0byB0aGUgbGVmdCB1bnRpbCBpdCByZWFjaGVzIHRvIHRoZSBzdGFydGluZyBwb3NpdGlvbiBvZiB0aGUgcGFuZWwgdGhhdCBob2xkcyB0aGUgaW1hZ2VzLCB3aGljaCBpbiB0aGF0IGNhc2UgdGhlIGdhbWVcclxuICogbG9zZS4gXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHRcclxuXHRjb25zdCBIZWxwZXIgPSByZXF1aXJlKCcuLi9oZWxwZXIuanMnKTtcclxuXHRjb25zdCBDb25maWcgPSByZXF1aXJlKCcuLi9jb25maWcuanMnKTtcclxuXHRjb25zdCBjb25maWcgPSBDb25maWcuZWxlbWVudHM7XHJcblx0Y29uc3QgU0xJREVfRFVSQVRJT04gPSAxMDtcclxuXHRjb25zdCBXQVJOSU5HX1RIUkVTSE9MRCA9IDMwO1xyXG5cdGNvbnN0IHVybCA9ICdodHRwOi8vbGlsbW9ydGFsLXRlc3QuYXBpZ2VlLm5ldC9nZXRkb3RhaGVyb2VzP2tleT02QzFDRjc2QzkwNzY4Mzg4NjE4RjM0OEJCNzNFRTAxNSZsYW5ndWFnZT1lbl91cyZmb3JtYXQ9SlNPTic7XHJcblx0Y29uc3QgU2xpZGVyID0ge1xyXG5cdFx0XHJcblx0XHRjcmVhdGVfc2xpZGVyKCkge1xyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmNyZWF0ZSh0aGlzLnNsaWRlcl9wYW5lbCk7XHJcblx0XHR9LFxyXG5cclxuXHRcdHNsaWRlcl9wYW5lbDoge1xyXG5cdFx0XHRnZXRfc3RhdHVzKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0aWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKHJlc3BvbnNlLnN0YXR1c1RleHQpKTtcclxuXHRcdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRnZXRfanNvbihyZXNwb25zZSkge1xyXG5cdFx0XHRcdHJldHVybiByZXNwb25zZS5qc29uKCk7XHJcblx0XHRcdH0sXHJcblx0XHRcdGxvYWRfaW1hZ2VzKCkge1xyXG5cdFx0XHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdFx0XHRmZXRjaCh1cmwpXHJcblx0XHRcdFx0LnRoZW4odGhpcy5nZXRfc3RhdHVzKVxyXG5cdFx0XHRcdC50aGVuKHRoaXMuZ2V0X2pzb24pXHJcblx0XHRcdFx0LnRoZW4oZnVuY3Rpb24gKHJlc3BvbnNlKSB7XHJcblx0XHRcdFx0XHRjb25zdCBoZXJvZXMgPSByZXNwb25zZS5yZXN1bHQuaGVyb2VzO1xyXG5cdFx0XHQgICAgICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuXHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgaGVyb2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0XHRcdGNvbnN0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcblx0XHRcdFx0XHRcdGltYWdlLmNsYXNzTmFtZSA9ICdpbWFnZSc7XHJcblx0XHRcdFx0XHRcdGltYWdlLnNyYyA9ICdodHRwOi8vY2RuLmRvdGEyLmNvbS9hcHBzL2RvdGEyL2ltYWdlcy9oZXJvZXMvJyArIGhlcm9lc1tpXS5uYW1lLnJlcGxhY2UoJ25wY19kb3RhX2hlcm9fJywgJycpICsgJ19sZy5wbmcnO1xyXG5cdFx0XHRcdFx0XHQvL0l0IHNob3VsZCBiZSBUdXNrYXIsIG5vdCBUdXNrIVxyXG5cdFx0XHRcdFx0XHRpZiAoaGVyb2VzW2ldLmxvY2FsaXplZF9uYW1lID09PSAnVHVzaycpIHtcclxuXHRcdFx0XHRcdFx0XHRoZXJvZXNbaV0ubG9jYWxpemVkX25hbWUgPSAnVHVza2FyJztcclxuXHRcdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0XHRpbWFnZS5uYW1lID0gaGVyb2VzW2ldLmxvY2FsaXplZF9uYW1lO1xyXG5cdFx0XHRcdFx0XHRmcmFnbWVudC5hcHBlbmRDaGlsZChpbWFnZSk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRjb25maWcuaW1hZ2VzLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxuXHRcdFx0XHR9KVxyXG5cdFx0XHR9LFxyXG5cdFx0XHRzbGlkZSgpIHtcclxuXHRcdFx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHRcdFx0Y29uc3Qgc2NyZWVuX3dpZHRoID0gd2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIHx8IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGg7XHJcblx0XHRcdCAgICBjb25zdCBkZWZhdWx0X3dpZHRoID0gKHNjcmVlbl93aWR0aCAtIGNvbmZpZy5pbWFnZXNfcGFuZWwub2Zmc2V0V2lkdGgvIDIpICsgY29uZmlnLmltYWdlc19wYW5lbC5vZmZzZXRXaWR0aDtcclxuXHRcdFx0ICAgIGNvbnN0IHdhcm5pbmdfd2lkdGggPSBkZWZhdWx0X3dpZHRoICogV0FSTklOR19USFJFU0hPTEQgLyAxMDA7XHJcblx0XHRcdCAgICBsZXQgdGltZXI7XHJcblx0XHRcdFx0Y29uZmlnLmltYWdlcy5zdHlsZS5tYXJnaW5MZWZ0ID0gJzAnO1xyXG5cdFx0XHQgICAgY29uZmlnLmltYWdlcy5zdHlsZS50cmFuc2l0aW9uID0gU0xJREVfRFVSQVRJT04gKyAncyBsaW5lYXInO1xyXG5cdFx0XHRcdEhlbHBlci5yZW1vdmVfY2xhc3MoY29uZmlnLmltYWdlc19wYW5lbCwgJ3dhcm5pbmdfYW5pbWF0aW9uJyk7XHJcblxyXG5cdFx0XHQgICAgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuXHRcdFx0ICAgIFx0aWYgKEhlbHBlci5nZXRfcG9zaXRpb24oY29uZmlnLmltYWdlcykueCA8PSB3YXJuaW5nX3dpZHRoKSB7XHJcblx0XHRcdFx0XHRcdEhlbHBlci5hZGRfY2xhc3MoY29uZmlnLmltYWdlc19wYW5lbCwgJ3dhcm5pbmdfYW5pbWF0aW9uJyk7XHJcblx0XHRcdFx0XHRcdGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG5cdFx0XHQgICAgXHR9XHJcblx0XHRcdCAgICB9LCAxMDAwKTtcclxuXHRcdFx0fSxcclxuXHRcdFx0c3RhcnRfc2xpZGVyKCkge1xyXG5cdFx0XHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdFx0XHRjb25zdCBzbGlkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdzbGlkZXJfcGFuZWwnKVswXTtcclxuXHRcdFx0XHRjb25zdCBzbGlkZXJfcHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xyXG5cdFx0XHRcdFx0aWYgKGNvbmZpZy5pbWFnZXMuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XHJcblx0XHRcdFx0XHRcdHNlbGYubG9hZF9pbWFnZXMoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdEhlbHBlci5zaG93X2VsZW1lbnQoc2xpZGVyKTtcclxuXHRcdFx0XHRcdHNlbGYuc2xpZGUoKTtcclxuXHRcdFx0XHRcdHJlc29sdmUoY29uZmlnLmltYWdlcyk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdFx0cmV0dXJuIHNsaWRlcl9wcm9taXNlO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiBTbGlkZXI7XHJcbn0pKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9jb21wb25lbnRzL3NsaWRlci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cdGNvbnN0IEJ1dHRvbiA9IHJlcXVpcmUoJy4vYnV0dG9uLmpzJyk7XHJcblx0Y29uc3QgVGV4dGZpZWxkID0ge1xyXG5cdFx0Y3JlYXRlX3RleHRmaWVsZChjYWxsYmFjaykge1xyXG5cdFx0XHRyZXR1cm4gT2JqZWN0LmNyZWF0ZSh0aGlzLnRleHRmaWVsZFtjYWxsYmFja10pO1xyXG5cdFx0fSxcclxuXHJcblx0XHR0ZXh0ZmllbGQ6IHtcclxuXHRcdFx0c3VibWl0X3RleHRmaWVsZDoge1xyXG5cdFx0XHRcdHN1Ym1pdCgpIHtcclxuXHRcdFx0XHRcdGNvbnN0IHRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3VibWl0X3RleHRmaWVsZCcpO1xyXG5cdFx0XHRcdFx0Y29uc3Qgc3VibWl0X2J1dHRvbiA9IEJ1dHRvbi5jcmVhdGVfYnV0dG9uKCdzdWJtaXRfYnV0dG9uJyk7XHJcblxyXG5cdFx0XHRcdFx0dGV4dC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdFx0XHRcdGlmIChldmVudC5rZXlDb2RlID09PSAxMykge1xyXG5cdFx0XHRcdFx0XHRcdHN1Ym1pdF9idXR0b24uc3VibWl0KCk7XHJcblx0XHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdH0pO1x0XHRcdFx0XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cdHJldHVybiBUZXh0ZmllbGQ7XHJcbn0pKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9jb21wb25lbnRzL3RleHRmaWVsZC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=