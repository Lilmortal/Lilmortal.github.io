/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./bin/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _button = __webpack_require__(1);

	var _textfield = __webpack_require__(6);

	var _images = __webpack_require__(7);

	__webpack_require__(8);
	__webpack_require__(11);

	_images.Images.load_images();

	var start_button = _button.Button.create_button('start_button');
	start_button.click('start_game');

	var fail_button = _button.Button.create_button('fail_button');
	fail_button.click('restart_game');

	var submit_button = _button.Button.create_button('submit_button');
	submit_button.click('submit');

	var submit_textfield = _textfield.Textfield.create_textfield('submit_textfield');
	submit_textfield.submit();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Button = undefined;

	var _countdown_panel = __webpack_require__(2);

	var _slider = __webpack_require__(5);

	var _helper = __webpack_require__(3);

	var _config = __webpack_require__(4);

	/**
	 * This is a generic button, which has a multitude of generic to specific functions for all possible scenarios.
	 * @param {Object} Button
	 */
	var elements = _config.Config.elements;
	var constants = _config.Config.constants;
	var text = _config.Config.text;
	var toggle_class_for_animation = _helper.Helper.toggle_class_for_animation;
	var hide_element = _helper.Helper.hide_element;
	var validate_if_input_is_hero_name = _helper.Helper.validate_if_input_is_hero_name;
	var show_element = _helper.Helper.show_element;
	var add_class = _helper.Helper.add_class;
	var remove_class = _helper.Helper.remove_class;
	var transition_end = _helper.Helper.transition_end;


	var image_iteration = 0;

	var Button = exports.Button = {
		create_button: function create_button(type) {
			return Object.create(this.button[type]);
		},


		button: {
			start_button: {
				click: function click(callback) {
					var _this = this;

					elements.start_button.addEventListener('click', function () {
						_this[callback]();
					});
				},
				start_game: function start_game() {
					// Would be cool to make this elements.wrapper.toggle_class_for_animation() instead like JQuery
					toggle_class_for_animation(elements.wrapper, 'grayscale_background_animation');
					hide_element(elements.instruction_panel);
					Start_slider_countdown().then(function (response) {
						Start_slider().then(function (response) {
							Display_fail_panel(response);
						});
					});
				}
			},
			fail_button: {
				click: function click(callback) {
					var _this2 = this;

					elements.fail_button.addEventListener('click', function () {
						_this2[callback]();
					});
				},
				restart_game: function restart_game() {
					hide_element(elements.fail_background, elements.slider_panel);
					Reset_images();
					show_element(elements.instruction_panel);
				}
			},
			submit_button: {
				click: function click(callback) {
					var _this3 = this;

					elements.submit_button.addEventListener('click', function () {
						_this3[callback]();
					});
				},
				submit: function submit() {
					if (validate_if_input_is_hero_name(elements.image[image_iteration], elements.submit_textfield)) {
						hide_element(elements.image[image_iteration]);
						image_iteration++;
						elements.add_points.innerHTML = '+' + constants.POINTS_ADDED;
						var _iteratorNormalCompletion = true;
						var _didIteratorError = false;
						var _iteratorError = undefined;

						try {
							for (var _iterator = elements.high_score[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
								var high_score = _step.value;

								high_score.innerHTML = parseInt(high_score.innerHTML) + parseInt(constants.POINTS_ADDED);
							}
						} catch (err) {
							_didIteratorError = true;
							_iteratorError = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion && _iterator.return) {
									_iterator.return();
								}
							} finally {
								if (_didIteratorError) {
									throw _iteratorError;
								}
							}
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
	};

	function Start_slider_countdown() {
		var countdown_panel = _countdown_panel.Countdown_panel.create_countdown_panel();
		return countdown_panel.start_countdown_timer();
	}

	function Start_slider() {
		var slider = _slider.Slider.create_slider();
		return slider.start_slider();
	}

	function Display_fail_panel() {
		transition_end(elements.images, function () {
			elements.result_text.innerHTML = text.fail_message;
			show_element(elements.fail_background);
		});
	}

	function Reset_images() {
		elements.images.style.marginLeft = '100%';
		elements.images.style.transition = '0s';
		for (var i = 0; i < elements.image.length; i++) {
			elements.image[i].style.display = 'block';
		}
		image_iteration = 0;
		for (var _i = 0; _i < elements.high_score.length; _i++) {
			elements.high_score[_i].innerHTML = 0;
		}
		elements.submit_textfield.value = '';
		remove_class(elements.submit_textfield, 'shake_textfield_animation');
		remove_class(elements.add_points, 'add_points_animation');
		elements.add_points.style.opacity = 0;
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Countdown_panel = undefined;

	var _helper = __webpack_require__(3);

	var _config = __webpack_require__(4);

	/**
	 * This is the countdown panel; it will countdown until it reaches 0 before it displays the slider panel.
	 */

	var elements = _config.Config.elements;
	var constants = _config.Config.constants;
	var show_element = _helper.Helper.show_element;
	var hide_element = _helper.Helper.hide_element;
	var Countdown_panel = exports.Countdown_panel = {
		create_countdown_panel: function create_countdown_panel() {
			return Object.create(this.countdown_panel);
		},

		countdown_panel: {
			start_countdown_timer: function start_countdown_timer() {
				var countdown_duration = constants.COUNTDOWN_DURATION;
				var countdown_promise = new Promise(function (resolve, reject) {
					show_element(elements.countdown_panel);
					elements.countdown_panel.innerHTML = "";
					var countdown_timer = setInterval(function () {
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
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// OKAY THIS HELPER THING SUCKS! FIND ALTERNATIVE (AND UPPER CASE ALL THIS FUNCTIONS)
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

	var Helper = exports.Helper = {
		/**
	  * Bind the focused element; it will call the callback when transition ends.
	  * @param  {Object} element - the object which will be binded by a transition end listener.
	  * @param  {Function} callback - the callback that will be called when transition end.
	  */
		transition_end: function transition_end(element, callback) {
			var transition_event = which_transition_event();
			element.addEventListener(transition_event, callback);
		},


		/**
	  * @param {Object} el - The element that we want to find the current position is relative to the window.
	  * https://www.kirupa.com/html5/get_element_position_using_javascript.htm
	  */
		get_position: function get_position(el) {
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
		},

		/**
	  * Display the element.
	  * @param  {Object} element - The element that will be displayed.
	  * @param  {String} display - The display type.
	  */
		show_element: function show_element(element, display) {
			if (typeof display !== 'undefined' && display !== '') {
				element.style.display = display;
			} else {
				element.style.display = 'flex';
			}
		},


		/**
	  * Hide the element.
	  * @param  {Object} element - The element that will be hidden.
	  */
		hide_element: function hide_element(element) {
			for (var i = 0; i < arguments.length; i++) {
				arguments[i].style.display = 'none';
			}
		},


		/**
	  * Add a CSS class to an element.
	  * @param  {Object} element - The element that will have the added CSS class.
	  * @param  {String} className - The CSS class name.
	  */
		add_class: function add_class(element, className) {
			if (!element.classList.contains(className)) {
				element.classList.add(className);
			}
		},


		/**
	  * Remove a CSS class from an element.
	  * @param  {Object} element - The element that will have the specified CSS class removed.
	  * @param  {String} className - The CSS class name.
	  */
		remove_class: function remove_class(element, className) {
			if (element.classList.contains(className)) {
				element.classList.remove(className);
			}
			// weird hack rule - https://css-tricks.com/restart-css-animation/
			void element.offsetWidth;
		},


		/**
	  * Toggle whether to add or remove CSS class.
	  * @param  {Object} element - The element that will add or remove the CSS class.
	  * @param  {String} className - The CSS class name.
	  */
		toggle_class: function toggle_class(element, className) {
			if (element.classList.contains(className)) {
				// find alternative to remove this Helper
				Helper.remove_class(element, className);
			} else {
				Helper.add_class(element, className);
			}
		},


		//IM TIRED, WHATS A GOOD NAME FOR THIS
		/**
	  * Toggle whether to add or remove CSS class.
	  * @param  {Object} element - The element that will add or remove the CSS class.
	  * @param  {String} className - The CSS class name.
	  */
		toggle_class_for_animation: function toggle_class_for_animation(element, className) {
			if (element.classList.contains(className)) {
				Helper.remove_class(element, className);
			}
			Helper.add_class(element, className);
		},


		/**
	  * Validate if user input is a string.
	  * @param {Object} image - The image that is being validated.
	  * @param  {Object} textfield - The textfield that has the user input.
	  */
		validate_if_input_is_hero_name: function validate_if_input_is_hero_name(image, textfield) {
			if (image.name.toLowerCaseAndRemoveIllegalCharacters() === textfield.value.toLowerCaseAndRemoveIllegalCharacters()) {
				return true;
			}
			return false;
		}
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
			value: true
	});
	var Config = exports.Config = {
			// HMMMM SHOULD ALL THE VARIABLES HERE HAVE UPPER CASE CHARACTERS?
			elements: {
					// images
					images: document.getElementsByClassName('images')[0],
					images_panel: document.getElementsByClassName('images_panel')[0],
					image: document.getElementsByClassName('image'),

					//fail
					fail_background: document.getElementsByClassName('fail_background')[0],
					fail_button: document.getElementById('fail_button'),

					//submit
					submit_textfield: document.getElementById('submit_textfield'),
					submit_button: document.getElementById('submit_button'),

					//instruction
					instruction_panel: document.getElementsByClassName('instruction_panel')[0],
					start_button: document.getElementById('start_button'),

					//countdown
					countdown_panel: document.getElementById('countdown_panel'),

					//slider
					add_points: document.getElementsByClassName('add_points')[0],
					slider_panel: document.getElementsByClassName('slider_panel')[0],
					high_score: document.getElementsByClassName('high_score'),
					result_text: document.getElementsByClassName('result_text')[0],

					//body
					wrapper: document.getElementsByClassName('wrapper')[0]
			},

			constants: {
					COUNTDOWN_DURATION: 3,
					SLIDE_DURATION: 10,
					WARNING_THRESHOLD: 30,
					POINTS_ADDED: 100
			},

			text: {
					//fail
					fail_message: 'You lose...',

					//win
					success_message: 'Ez Win!',

					images_json_url: 'https://lilmortal-test.apigee.net/getdotaheroes?key=6C1CF76C90768388618F348BB73EE015&language=en_us&format=JSON',
					image_url: 'http://cdn.dota2.com/apps/dota2/images/heroes/',
					image_size: '_lg.png'
			}
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Slider = undefined;

	var _helper = __webpack_require__(3);

	var _config = __webpack_require__(4);

	/**
	 * This is the slider that will be displayed after the countdown. It will display an endless stream of dota images that are retrieved via Dota API.
	 * It will constantly transition to the left until it reaches to the starting position of the panel that holds the images, which in that case the game
	 * lose. 
	 */
	var elements = _config.Config.elements;
	var constants = _config.Config.constants;
	var remove_class = _helper.Helper.remove_class;
	var get_position = _helper.Helper.get_position;
	var add_class = _helper.Helper.add_class;
	var show_element = _helper.Helper.show_element;
	var Slider = exports.Slider = {
		create_slider: function create_slider() {
			return Object.create(this.slider_panel);
		},


		slider_panel: {
			// USE REQUESTANIMATIONFRAME, NEED TO FIND OUT HOW TO CHECK WHEN ANIMATION FRAME ENDS
			slide: function slide() {
				var screen_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
				var images_panel_width = screen_width - elements.images_panel.offsetWidth / 2 + elements.images_panel.offsetWidth;
				var warning_width_threshold = images_panel_width * constants.WARNING_THRESHOLD / 100;
				var timer = void 0;
				elements.images.style.marginLeft = '0';
				elements.images.style.transition = constants.SLIDE_DURATION + 's linear';
				remove_class(elements.images_panel, 'warning_animation');

				timer = setInterval(function () {
					if (get_position(elements.images).x <= warning_width_threshold) {
						add_class(elements.images_panel, 'warning_animation');
						clearInterval(timer);
					}
				}, 1000);
			},
			start_slider: function start_slider() {
				var _this = this;

				var slider_promise = new Promise(function (resolve, reject) {
					show_element(elements.slider_panel);
					_this.slide();
					resolve();
				}).catch(function (e) {
					console.log(e);
				});
				return slider_promise;
			}
		}
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Textfield = undefined;

	var _button = __webpack_require__(1);

	var _config = __webpack_require__(4);

	var elements = _config.Config.elements;
	var Textfield = exports.Textfield = {
		create_textfield: function create_textfield(callback) {
			return Object.create(this.textfield[callback]);
		},


		textfield: {
			submit_textfield: {
				submit: function submit() {
					var submit_button = _button.Button.create_button('submit_button');

					elements.submit_textfield.addEventListener('keyup', function (event) {
						if (event.keyCode === 13) {
							submit_button.submit();
						}
					});
				}
			}
		}
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Images = undefined;

	var _config = __webpack_require__(4);

	var elements = _config.Config.elements;
	var text = _config.Config.text;
	var Images = exports.Images = {
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
			fetch(text.images_json_url).then(this.get_status).then(this.get_json).then(function (response) {
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
				elements.images.appendChild(fragment);
			});
		}
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(9);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(12)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./main.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/sass-loader/index.js!./main.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(10)();
	// imports


	// module
	exports.push([module.id, "/*@import 'reset';*/\n.button {\n  background: -webkit-linear-gradient(#9b9b9b, black);\n  background: -o-linear-gradient(#9b9b9b, black);\n  background: -moz-linear-gradient(#9b9b9b, black);\n  background: linear-gradient(#9b9b9b, black);\n  -webkit-border-radius: 10px;\n  -moz-border-radius: 10px;\n  -ms-border-radius: 10px;\n  border-radius: 10px;\n  border: 1px solid #191919;\n  outline: 0;\n  cursor: pointer;\n  color: white;\n  padding: 20px; }\n  .button:hover {\n    background: -webkit-linear-gradient(dimgray, black);\n    background: -o-linear-gradient(dimgray, black);\n    background: -moz-linear-gradient(dimgray, black);\n    background: linear-gradient(dimgray, black); }\n  .button:active {\n    background: -webkit-linear-gradient(#555555, black);\n    background: -o-linear-gradient(#555555, black);\n    background: -moz-linear-gradient(#555555, black);\n    background: linear-gradient(#555555, black); }\n\n#countdown_panel {\n  min-width: 100%;\n  min-height: 100%;\n  position: absolute;\n  align-items: center;\n  justify-content: center;\n  display: none;\n  font-size: 12em;\n  z-index: 1; }\n\n.grayscale_background_animation {\n  animation: GRAYSCALE_BACKGROUND_ANIMATION 4s; }\n\n@keyframes GRAYSCALE_BACKGROUND_ANIMATION {\n  20%, 100% {\n    -webkit-filter: grayscale(0.7) blur(3px);\n    -moz-filter: grayscale(0.7) blur(3px);\n    -ms-filter: grayscale(0.7) blur(3px);\n    filter: grayscale(0.7) blur(3px); } }\n\n.fail_background {\n  display: none;\n  align-items: center;\n  min-width: 100%;\n  min-height: 100%;\n  position: absolute;\n  background-color: black;\n  animation: FAIL_BACKGROUND_ANIMATION 1s;\n  animation-fill-mode: forwards;\n  z-index: 2; }\n\n.fail_panel {\n  width: 100%;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  background-color: #F0FFFF;\n  color: black;\n  animation: FAIL_PANEL_ANIMATION 1s;\n  animation-fill-mode: forwards;\n  padding: 20px 0 20px 0;\n  font-size: 0.67em; }\n  .fail_panel h1, .fail_panel h3 {\n    animation: FAIL_TEXT_ANIMATION 1s;\n    animation-fill-mode: forwards; }\n  @media (min-width: 340px) {\n    .fail_panel {\n      font-size: 1em; } }\n  @media (min-width: 500px) {\n    .fail_panel {\n      font-size: 1.2em; } }\n  @media (min-width: 650px) {\n    .fail_panel {\n      font-size: 1.5em; } }\n  @media (min-width: 825px) {\n    .fail_panel {\n      font-size: 2em; } }\n  .fail_panel button {\n    animation: FAIL_BUTTON_ANIMATION 1s;\n    animation-fill-mode: forwards; }\n\n@keyframes FAIL_BACKGROUND_ANIMATION {\n  0% {\n    background: transparent; }\n  100% {\n    background: rgba(0, 0, 0, 0.8);\n    transition: background 0.5s ease-in-out; } }\n\n@keyframes FAIL_PANEL_ANIMATION {\n  0% {\n    max-height: 0;\n    overflow: hidden; }\n  100% {\n    max-height: 400px;\n    transition: 1s ease-in-out; } }\n\n@keyframes FAIL_TEXT_ANIMATION {\n  0%, 30% {\n    opacity: 0; }\n  100% {\n    opacity: 1;\n    transition: 0.5s ease-in-out; } }\n\n@keyframes FAIL_BUTTON_ANIMATION {\n  0%, 80% {\n    opacity: 0; }\n  100% {\n    opacity: 1;\n    transition: 0.5s ease-in-out; } }\n\n.images_panel {\n  display: flex;\n  width: 99%;\n  border: 5px double gold;\n  -webkit-border-radius: 3px;\n  -moz-border-radius: 3px;\n  -ms-border-radius: 3px;\n  border-radius: 3px;\n  overflow: hidden;\n  background-color: black;\n  animation-iteration-count: infinite; }\n\n.images {\n  display: flex;\n  justify-content: flex-end;\n  margin-left: 100%;\n  border: 0; }\n\n.image {\n  width: 48px;\n  height: 27px;\n  border-left: 4px groove gold; }\n  @media (min-width: 400px) {\n    .image {\n      width: 64px;\n      height: 36px; } }\n  @media (min-width: 500px) {\n    .image {\n      width: 80px;\n      height: 45px; } }\n  @media (min-width: 600px) {\n    .image {\n      width: 96px;\n      height: 54px; } }\n  @media (min-width: 750px) {\n    .image {\n      width: 112px;\n      height: 63px; } }\n  @media (min-width: 1000px) {\n    .image {\n      width: 128px;\n      height: 72px; } }\n  @media (min-width: 1300px) {\n    .image {\n      width: 160px;\n      height: 90px; } }\n\n.warning_animation {\n  animation: WARNING_BOX_SHADOW_ANIMATION 3s;\n  animation-iteration-count: infinite;\n  border: 5px solid red;\n  transition: border 0.5s ease-in-out; }\n\n@keyframes WARNING_BOX_SHADOW_ANIMATION {\n  0% {\n    box-shadow: 0px 0px 50px #641E16; }\n  25% {\n    box-shadow: 0px 0px 50px #F1948A; }\n  50% {\n    box-shadow: 0px 0px 50px #641E16; }\n  75% {\n    box-shadow: 0px 0px 50px #F1948A; }\n  100% {\n    box-shadow: 0px 0px 50px #641E16; } }\n\n.instruction_panel {\n  border: 3px ridge gold;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  -ms-border-radius: 5px;\n  border-radius: 5px;\n  color: black;\n  background-color: white;\n  padding: 0 20px 20px 20px;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  box-shadow: 0px 0px 50px gold;\n  margin: auto;\n  font-size: 1.1em; }\n  @media (min-width: 720px) {\n    .instruction_panel {\n      padding: 0 100px 20px 100px; } }\n\n.slider_panel {\n  width: 100%;\n  display: none;\n  align-items: center;\n  justify-content: center;\n  flex-direction: column;\n  overflow: hidden; }\n\n.points {\n  font-size: 3em;\n  position: relative; }\n\n.add_points {\n  position: absolute;\n  left: 58%;\n  bottom: 30%; }\n\n.submit_panel {\n  margin-top: 3em; }\n\n.add_points_animation {\n  animation: ADD_POINTS_ANIMATION 1s;\n  animation-fill-mode: forwards; }\n\n@keyframes ADD_POINTS_ANIMATION {\n  0% {\n    opacity: 0; }\n  50% {\n    opacity: 1; }\n  100% {\n    opacity: 0;\n    bottom: 70%; } }\n\n.submit_panel {\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  width: 100%;\n  padding: 0 1em 0 1em; }\n  .submit_panel button {\n    width: 90%;\n    margin: 2em 5% 0 5%; }\n  @media (min-width: 630px) {\n    .submit_panel {\n      flex-direction: row;\n      width: initial; }\n      .submit_panel button {\n        margin: 0 0 0 2em; } }\n\n#submit_textfield {\n  border: 4px solid #3F3835;\n  -webkit-border-radius: 5px;\n  -moz-border-radius: 5px;\n  -ms-border-radius: 5px;\n  border-radius: 5px;\n  -webkit-transition: all 0.3s ease-in-out;\n  -moz-transition: all 0.3s ease-in-out;\n  -ms-transition: all 0.3s ease-in-out;\n  -o-transition: all 0.3s ease-in-out;\n  font-size: 200%;\n  margin: 0 5% 0 5%;\n  outline: 0;\n  padding-left: 20px; }\n  #submit_textfield:focus {\n    border: 4px solid black;\n    box-shadow: inset 0px 0px 20px black; }\n\n.shake_textfield_animation {\n  border: 4px solid red !important;\n  animation: SHAKE_TEXTFIELD_ANIMATION 0.5s; }\n\n@keyframes SHAKE_TEXTFIELD_ANIMATION {\n  10%, 90% {\n    transform: translate3d(-1px, 0, 0); }\n  20%, 80% {\n    transform: translate3d(2px, 0, 0); }\n  30%, 50%, 70% {\n    transform: translate3d(-4px, 0, 0); }\n  40%, 60% {\n    transform: translate3d(4px, 0, 0); }\n  100% {\n    display: none; } }\n\nheader {\n  background-color: black;\n  display: flex; }\n\n#logo {\n  opacity: 0.6;\n  -webkit-transition: all 0.3s ease-in-out;\n  -moz-transition: all 0.3s ease-in-out;\n  -ms-transition: all 0.3s ease-in-out;\n  -o-transition: all 0.3s ease-in-out;\n  max-width: 100%; }\n  #logo:hover {\n    opacity: 1; }\n\n#navigation_bar {\n  width: 100%;\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  padding-right: 20px; }\n\n.navigation_link {\n  display: none;\n  padding: 10px 20px 10px 20px;\n  border: 2px solid white;\n  justify-content: space-between;\n  flex-direction: row;\n  position: absolute;\n  z-index: 1;\n  right: 39px;\n  background-color: white; }\n  .navigation_link a {\n    color: black;\n    text-decoration: none;\n    cursor: pointer;\n    -webkit-transition: all 0.3s ease-in-out;\n    -moz-transition: all 0.3s ease-in-out;\n    -ms-transition: all 0.3s ease-in-out;\n    -o-transition: all 0.3s ease-in-out;\n    padding: 0 20px 0 20px; }\n    .navigation_link a:hover {\n      text-shadow: 4px 4px gray; }\n    .navigation_link a:first-child {\n      border: 0; }\n  @media (min-width: 470px) {\n    .navigation_link {\n      display: flex !important;\n      flex-direction: row;\n      padding: 0 !important;\n      border: 0 !important;\n      background: none; }\n      .navigation_link a {\n        color: gray;\n        border-left: 3px solid white;\n        padding: 20px; }\n        .navigation_link a:hover {\n          color: white; } }\n\n#navigation_icon {\n  display: none; }\n  #navigation_icon:not(:checked) ~ .navigation_link {\n    display: none; }\n  #navigation_icon:checked ~ .navigation_link {\n    display: flex; }\n\n#navigation_icon_label {\n  display: flex;\n  order: 1;\n  cursor: pointer; }\n  @media (min-width: 470px) {\n    #navigation_icon_label {\n      display: none; } }\n\nfooter {\n  background-color: black;\n  display: flex;\n  justify-content: center; }\n\n.hero_list_panel {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  font-size: 3em;\n  background-color: black; }\n\n.contact_panel {\n  background-color: white;\n  color: black;\n  padding: 3em 4em 3em 4em;\n  width: 100%;\n  margin: 0 auto;\n  overflow-y: auto; }\n  @media (min-width: 900px) {\n    .contact_panel {\n      width: 80%; } }\n\n.contact_pictures_panel {\n  padding: 1em 0 1em 0;\n  flex-flow: row wrap;\n  display: flex; }\n  .contact_pictures_panel img {\n    flex: auto;\n    margin: 1em 0 1em 0;\n    max-width: 250px;\n    width: 100%;\n    height: 100%; }\n    @media (min-width: 420px) {\n      .contact_pictures_panel img {\n        margin: 1em; } }\n\n.wrapper, body, html {\n  height: 100vh;\n  margin: 0;\n  overflow: hidden;\n  box-sizing: border-box;\n  font-family: \"Segoe UI\", sans-serif;\n  color: white; }\n\nq {\n  display: block;\n  font-style: italic;\n  margin: 1em 0 1em 0; }\n\n.wrapper {\n  display: flex;\n  flex-direction: column;\n  background-image: url(" + __webpack_require__(11) + ");\n  background-size: cover; }\n\n.main_panel {\n  display: flex;\n  flex: 1;\n  overflow-y: auto; }\n", ""]);

	// exports


/***/ },
/* 10 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "3168c21756d6453f1f6b2cb0b63c3b89.jpg";

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }
/******/ ]);