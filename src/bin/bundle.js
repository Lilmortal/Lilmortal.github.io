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
/******/ 	__webpack_require__.p = "./bin/";
/******/
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
	
	var _config = __webpack_require__(3);
	
	var _helper = __webpack_require__(5);
	
	__webpack_require__(8);
	__webpack_require__(11);
	
	_images.Images.load_images();
	
	var start_button = _button.Button.create_button('start_button').click('start_game');
	
	var fail_button = _button.Button.create_button('fail_button').click('restart_game');
	
	var submit_button = _button.Button.create_button('submit_button').click('submit');
	
	var submit_textfield = _textfield.Textfield.create_textfield('submit_textfield').submit();
	
	// Add helper functions to each elements (e.g. so each element have methods like show(), hide() etc)
	
	Array.from(_config.Config.elements).map(function (element) {
		if (element instanceof HTMLCollection) {
			Array.from(element).map(function (htmlCollectionElement) {
				Object.assign(htmlCollectionElement, _helper.Helper);
			});
		} else {
			Object.assign(element, _helper.Helper);
		}
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Button = undefined;
	
	var _countdown_panel = __webpack_require__(2);
	
	var _slider = __webpack_require__(4);
	
	var _helper = __webpack_require__(5);
	
	var _config = __webpack_require__(3);
	
	/**
	 * This is a generic button, which has a multitude of generic to specific functions for all possible scenarios.
	 * @param {Object} Button
	 */
	var _Config$elements = _config.Config.elements;
	var start_button = _Config$elements.start_button;
	var wrapper = _Config$elements.wrapper;
	var instruction_panel = _Config$elements.instruction_panel;
	var fail_button = _Config$elements.fail_button;
	var fail_background = _Config$elements.fail_background;
	var slider_panel = _Config$elements.slider_panel;
	var submit_button = _Config$elements.submit_button;
	var image = _Config$elements.image;
	var submit_textfield = _Config$elements.submit_textfield;
	var add_points = _Config$elements.add_points;
	var high_score = _Config$elements.high_score;
	var result_text = _Config$elements.result_text;
	var images = _Config$elements.images;
	var POINTS_ADDED = _config.Config.constants.POINTS_ADDED;
	var _Config$text = _config.Config.text;
	var success_message = _Config$text.success_message;
	var fail_message = _Config$text.fail_message;
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
	
					start_button.addEventListener('click', function () {
						_this[callback]();
					});
				},
				start_game: function start_game() {
					wrapper.toggle_class_for_animation('grayscale_background_animation');
					instruction_panel.hide();
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
	
					fail_button.addEventListener('click', function () {
						_this2[callback]();
					});
				},
				restart_game: function restart_game() {
					fail_background.hide();
					slider_panel.hide();
					instruction_panel.show();
					Reset_images();
				}
			},
			submit_button: {
				click: function click(callback) {
					var _this3 = this;
	
					submit_button.addEventListener('click', function () {
						_this3[callback]();
					});
				},
				submit: function submit() {
					if (Validate_if_input_is_hero_name(image[image_iteration], submit_textfield)) {
						image[image_iteration].hide();
						image_iteration++;
						add_points.innerHTML = '+' + POINTS_ADDED;
						var _iteratorNormalCompletion = true;
						var _didIteratorError = false;
						var _iteratorError = undefined;
	
						try {
							for (var _iterator = high_score[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
								var score = _step.value;
	
								score.innerHTML = parseInt(score.innerHTML) + parseInt(POINTS_ADDED);
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
		images.transition_end(function () {
			result_text.innerHTML = fail_message;
			fail_background.show();
		});
	}
	
	function Reset_images() {
		images.style.marginLeft = '100%';
		images.style.transition = '0s';
		Array.from(image).map(function (img) {
			img.show('block');
		});
	
		image_iteration = 0;
		Array.from(high_score).map(function (score) {
			score.innerHTML = 0;
		});
	
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

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Countdown_panel = undefined;
	
	var _config = __webpack_require__(3);
	
	var countdown_panel = _config.Config.elements.countdown_panel; /**
	                                                                * This is the countdown panel; it will countdown until it reaches 0 before it displays the slider panel.
	                                                                */
	
	var COUNTDOWN_DURATION = _config.Config.constants.COUNTDOWN_DURATION;
	var Countdown_panel = exports.Countdown_panel = {
		create_countdown_panel: function create_countdown_panel() {
			return Object.create(this.countdown_panel);
		},
	
		countdown_panel: {
			start_countdown_timer: function start_countdown_timer() {
				var countdown_duration = COUNTDOWN_DURATION;
				var countdown_promise = new Promise(function (resolve, reject) {
					countdown_panel.show();
					countdown_panel.innerHTML = "";
					var countdown_timer = setInterval(function () {
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
	};

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var Config = exports.Config = {
		// HMMMM SHOULD ALL THE VARIABLES HERE HAVE UPPER CASE CHARACTERS?
		elements: _defineProperty({
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
	
		}, Symbol.iterator, function () {
			var self = this;
			var values = Object.keys(this);
			var i = 0;
			return {
				next: function next() {
					return {
						value: self[values[i++]],
						done: i > values.length
					};
				}
			};
		}),
	
		constants: _defineProperty({
			COUNTDOWN_DURATION: 3,
			SLIDE_DURATION: 10,
			WARNING_THRESHOLD: 30,
			POINTS_ADDED: 100
	
		}, Symbol.iterator, function () {
			var self = this;
			var values = Object.keys(this);
			var i = 0;
			return {
				next: function next() {
					return {
						value: self[values[i++]],
						done: i > values.length
					};
				}
			};
		}),
	
		text: _defineProperty({
			//fail
			fail_message: 'You lose...',
	
			//win
			success_message: 'Ez Win!',
	
			images_json_url: 'https://lilmortal-test.apigee.net/getdotaheroes?key=6C1CF76C90768388618F348BB73EE015&language=en_us&format=JSON',
			image_url: 'http://cdn.dota2.com/apps/dota2/images/heroes/',
			image_size: '_lg.png'
	
		}, Symbol.iterator, function () {
			var self = this;
			var values = Object.keys(this);
			var i = 0;
			return {
				next: function next() {
					return {
						value: self[values[i++]],
						done: i > values.length
					};
				}
			};
		})
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.Slider = undefined;
	
	var _helper = __webpack_require__(5);
	
	var _config = __webpack_require__(3);
	
	/**
	 * This is the slider that will be displayed after the countdown. It will display an endless stream of dota images that are retrieved via Dota API.
	 * It will constantly transition to the left until it reaches to the starting position of the panel that holds the images, which in that case the game
	 * lose. 
	 */
	var _Config$elements = _config.Config.elements;
	var images = _Config$elements.images;
	var images_panel = _Config$elements.images_panel;
	var slider_panel = _Config$elements.slider_panel;
	var _Config$constants = _config.Config.constants;
	var WARNING_THRESHOLD = _Config$constants.WARNING_THRESHOLD;
	var SLIDE_DURATION = _Config$constants.SLIDE_DURATION;
	var Slider = exports.Slider = {
		create_slider: function create_slider() {
			return Object.create(this.slider_panel);
		},
	
	
		slider_panel: {
			// USE REQUESTANIMATIONFRAME, NEED TO FIND OUT HOW TO CHECK WHEN ANIMATION FRAME ENDS
			slide: function slide() {
				var screen_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
				var images_panel_width = screen_width - images_panel.offsetWidth / 2 + images_panel.offsetWidth;
				var warning_width_threshold = images_panel_width * WARNING_THRESHOLD / 100;
				var timer = void 0;
				images.style.marginLeft = '0';
				images.style.transition = SLIDE_DURATION + 's linear';
				images_panel.remove_class('warning_animation');
	
				timer = setInterval(function () {
					if (images.get_position().x <= warning_width_threshold) {
						images_panel.add_class('warning_animation');
						clearInterval(timer);
					}
				}, 1000);
			},
			start_slider: function start_slider() {
				var _this = this;
	
				var slider_promise = new Promise(function (resolve, reject) {
					slider_panel.show();
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
/* 5 */
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
	if (!String.prototype.toLowerCaseAndRemoveIllegalCharacters) {
		String.prototype.toLowerCaseAndRemoveIllegalCharacters = function () {
			var lowerCaseValue = this.toLowerCase();
			return lowerCaseValue.replace(ILLEGAL_CHARACTERS, '');
		};
	}
	
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
	  * @param  {Function} callback - the callback that will be called when transition end.
	  */
		transition_end: function transition_end(callback) {
			var transition_event = which_transition_event();
			this.addEventListener(transition_event, callback);
		},
	
	
		/**
	  * @param {Object} el - The element that we want to find the current position is relative to the window.
	  * https://www.kirupa.com/html5/get_element_position_using_javascript.htm
	  */
		get_position: function get_position() {
			var xPos = 0;
			var yPos = 0;
	
			var element = this;
			while (element) {
				if (element.tagName == "BODY") {
					// deal with browser quirks with body/window/document and page scroll
					var xScroll = element.scrollLeft || document.documentElement.scrollLeft;
					var yScroll = element.scrollTop || document.documentElement.scrollTop;
	
					xPos += element.offsetLeft - xScroll + element.clientLeft;
					yPos += element.offsetTop - yScroll + element.clientTop;
				} else {
					// for all other non-BODY elements
					xPos += element.offsetLeft - element.scrollLeft + element.clientLeft;
					yPos += element.offsetTop - element.scrollTop + element.clientTop;
				}
				element = element.offsetParent;
			}
	
			return {
				x: xPos,
				y: yPos
			};
		},
	
		/**
	  * Display the element.
	  * @param  {String} display - The display type.
	  */
		show: function show(display) {
			if (typeof display !== 'undefined' && display !== '') {
				this.style.display = display;
			} else {
				this.style.display = 'flex';
			}
		},
	
	
		/**
	  * Hide the element.
	  */
		hide: function hide() {
			this.style.display = 'none';
		},
	
	
		/**
	  * Add a CSS class to an element.
	  * @param  {String} className - The CSS class name.
	  */
		add_class: function add_class(className) {
			if (!this.classList.contains(className)) {
				this.classList.add(className);
			}
		},
	
	
		/**
	  * Remove a CSS class from an element.
	  * @param  {String} className - The CSS class name.
	  */
		remove_class: function remove_class(className) {
			if (this.classList.contains(className)) {
				this.classList.remove(className);
			}
			// weird hack rule - https://css-tricks.com/restart-css-animation/
			void this.offsetWidth;
		},
	
	
		/**
	  * Toggle whether to add or remove CSS class.
	  * @param  {String} className - The CSS class name.
	  */
		toggle_class: function toggle_class(className) {
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
	  * @param  {String} className - The CSS class name.
	  */
		toggle_class_for_animation: function toggle_class_for_animation(className) {
			if (this.classList.contains(className)) {
				Helper.remove_class.call(this, className);
			}
			Helper.add_class.call(this, className);
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
	
	var _config = __webpack_require__(3);
	
	var submit_textfield = _config.Config.elements.submit_textfield;
	var Textfield = exports.Textfield = {
		create_textfield: function create_textfield(callback) {
			return Object.create(this.textfield[callback]);
		},
	
	
		textfield: {
			submit_textfield: {
				submit: function submit() {
					var submit_button = _button.Button.create_button('submit_button');
	
					submit_textfield.addEventListener('keyup', function (event) {
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
	
	var _config = __webpack_require__(3);
	
	var _helper = __webpack_require__(5);
	
	var images = _config.Config.elements.images;
	var images_json_url = _config.Config.text.images_json_url;
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
			fetch(images_json_url).then(this.get_status).then(this.get_json).then(function (response) {
				var heroes = response.result.heroes;
				var fragment = document.createDocumentFragment();
	
				Array.from(heroes).map(function (hero) {
					var image = document.createElement('img');
					image.className = 'image';
					image.src = 'http://cdn.dota2.com/apps/dota2/images/heroes/' + hero.name.replace('npc_dota_hero_', '') + '_lg.png';
					//It should be Tuskar, not Tusk!
					if (hero.localized_name === 'Tusk') {
						hero.localized_name = 'Tuskar';
					}
					image.name = hero.localized_name;
					Object.assign(image, _helper.Helper);
					fragment.appendChild(image);
				});
	
				images.appendChild(fragment);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOGE5M2FlYjI0OGFkYzZiZjExYjYiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2luaXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvYnV0dG9uLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL2NvdW50ZG93bl9wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL3NsaWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvaGVscGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL3RleHRmaWVsZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy9pbWFnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Nzcy9tYWluLnNjc3M/NTY4NyIsIndlYnBhY2s6Ly8vLi9zcmMvY3NzL21haW4uc2NzcyIsIndlYnBhY2s6Ly8vLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL3NyYy9pbWcvYmFja2dyb3VuZF9pbWFnZS5qcGciLCJ3ZWJwYWNrOi8vLy4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJsb2FkX2ltYWdlcyIsInN0YXJ0X2J1dHRvbiIsImNyZWF0ZV9idXR0b24iLCJjbGljayIsImZhaWxfYnV0dG9uIiwic3VibWl0X2J1dHRvbiIsInN1Ym1pdF90ZXh0ZmllbGQiLCJjcmVhdGVfdGV4dGZpZWxkIiwic3VibWl0IiwiQXJyYXkiLCJmcm9tIiwiZWxlbWVudHMiLCJtYXAiLCJlbGVtZW50IiwiSFRNTENvbGxlY3Rpb24iLCJodG1sQ29sbGVjdGlvbkVsZW1lbnQiLCJPYmplY3QiLCJhc3NpZ24iLCJ3cmFwcGVyIiwiaW5zdHJ1Y3Rpb25fcGFuZWwiLCJmYWlsX2JhY2tncm91bmQiLCJzbGlkZXJfcGFuZWwiLCJpbWFnZSIsImFkZF9wb2ludHMiLCJoaWdoX3Njb3JlIiwicmVzdWx0X3RleHQiLCJpbWFnZXMiLCJQT0lOVFNfQURERUQiLCJjb25zdGFudHMiLCJ0ZXh0Iiwic3VjY2Vzc19tZXNzYWdlIiwiZmFpbF9tZXNzYWdlIiwidHJhbnNpdGlvbl9lbmQiLCJpbWFnZV9pdGVyYXRpb24iLCJCdXR0b24iLCJ0eXBlIiwiY3JlYXRlIiwiYnV0dG9uIiwiY2FsbGJhY2siLCJhZGRFdmVudExpc3RlbmVyIiwic3RhcnRfZ2FtZSIsInRvZ2dsZV9jbGFzc19mb3JfYW5pbWF0aW9uIiwiaGlkZSIsIlN0YXJ0X3NsaWRlcl9jb3VudGRvd24iLCJ0aGVuIiwicmVzcG9uc2UiLCJTdGFydF9zbGlkZXIiLCJEaXNwbGF5X2ZhaWxfcGFuZWwiLCJyZXN0YXJ0X2dhbWUiLCJzaG93IiwiUmVzZXRfaW1hZ2VzIiwiVmFsaWRhdGVfaWZfaW5wdXRfaXNfaGVyb19uYW1lIiwiaW5uZXJIVE1MIiwic2NvcmUiLCJwYXJzZUludCIsInJlbW92ZV9jbGFzcyIsInZhbHVlIiwiY291bnRkb3duX3BhbmVsIiwiY3JlYXRlX2NvdW50ZG93bl9wYW5lbCIsInN0YXJ0X2NvdW50ZG93bl90aW1lciIsInNsaWRlciIsImNyZWF0ZV9zbGlkZXIiLCJzdGFydF9zbGlkZXIiLCJzdHlsZSIsIm1hcmdpbkxlZnQiLCJ0cmFuc2l0aW9uIiwiaW1nIiwib3BhY2l0eSIsImhlcm9faW1hZ2UiLCJ0ZXh0ZmllbGQiLCJuYW1lIiwidG9Mb3dlckNhc2VBbmRSZW1vdmVJbGxlZ2FsQ2hhcmFjdGVycyIsIkNPVU5URE9XTl9EVVJBVElPTiIsIkNvdW50ZG93bl9wYW5lbCIsImNvdW50ZG93bl9kdXJhdGlvbiIsImNvdW50ZG93bl9wcm9taXNlIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJjb3VudGRvd25fdGltZXIiLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJDb25maWciLCJkb2N1bWVudCIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJpbWFnZXNfcGFuZWwiLCJnZXRFbGVtZW50QnlJZCIsIlN5bWJvbCIsIml0ZXJhdG9yIiwic2VsZiIsInZhbHVlcyIsImtleXMiLCJpIiwibmV4dCIsImRvbmUiLCJsZW5ndGgiLCJTTElERV9EVVJBVElPTiIsIldBUk5JTkdfVEhSRVNIT0xEIiwiaW1hZ2VzX2pzb25fdXJsIiwiaW1hZ2VfdXJsIiwiaW1hZ2Vfc2l6ZSIsIlNsaWRlciIsInNsaWRlIiwic2NyZWVuX3dpZHRoIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImRvY3VtZW50RWxlbWVudCIsImNsaWVudFdpZHRoIiwiYm9keSIsImltYWdlc19wYW5lbF93aWR0aCIsIm9mZnNldFdpZHRoIiwid2FybmluZ193aWR0aF90aHJlc2hvbGQiLCJ0aW1lciIsImdldF9wb3NpdGlvbiIsIngiLCJhZGRfY2xhc3MiLCJzbGlkZXJfcHJvbWlzZSIsImNhdGNoIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJJTExFR0FMX0NIQVJBQ1RFUlMiLCJSZWdFeHAiLCJTdHJpbmciLCJwcm90b3R5cGUiLCJsb3dlckNhc2VWYWx1ZSIsInRvTG93ZXJDYXNlIiwicmVwbGFjZSIsIndoaWNoX3RyYW5zaXRpb25fZXZlbnQiLCJ0IiwiZWwiLCJjcmVhdGVFbGVtZW50IiwidHJhbnNpdGlvbnMiLCJ1bmRlZmluZWQiLCJIZWxwZXIiLCJ0cmFuc2l0aW9uX2V2ZW50IiwieFBvcyIsInlQb3MiLCJ0YWdOYW1lIiwieFNjcm9sbCIsInNjcm9sbExlZnQiLCJ5U2Nyb2xsIiwic2Nyb2xsVG9wIiwib2Zmc2V0TGVmdCIsImNsaWVudExlZnQiLCJvZmZzZXRUb3AiLCJjbGllbnRUb3AiLCJvZmZzZXRQYXJlbnQiLCJ5IiwiZGlzcGxheSIsImNsYXNzTmFtZSIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiYWRkIiwicmVtb3ZlIiwidG9nZ2xlX2NsYXNzIiwiY2FsbCIsIlRleHRmaWVsZCIsImV2ZW50Iiwia2V5Q29kZSIsIkltYWdlcyIsImdldF9zdGF0dXMiLCJzdGF0dXMiLCJFcnJvciIsInN0YXR1c1RleHQiLCJnZXRfanNvbiIsImpzb24iLCJmZXRjaCIsImhlcm9lcyIsInJlc3VsdCIsImZyYWdtZW50IiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsImhlcm8iLCJzcmMiLCJsb2NhbGl6ZWRfbmFtZSIsImFwcGVuZENoaWxkIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FDbkNBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOztBQVBBLG9CQUFBQSxDQUFRLENBQVI7QUFDQSxvQkFBQUEsQ0FBUSxFQUFSOztBQVFBLGdCQUFPQyxXQUFQOztBQUVBLEtBQU1DLGVBQWUsZUFBT0MsYUFBUCxDQUFxQixjQUFyQixFQUFxQ0MsS0FBckMsQ0FBMkMsWUFBM0MsQ0FBckI7O0FBRUEsS0FBTUMsY0FBYyxlQUFPRixhQUFQLENBQXFCLGFBQXJCLEVBQW9DQyxLQUFwQyxDQUEwQyxjQUExQyxDQUFwQjs7QUFFQSxLQUFNRSxnQkFBZ0IsZUFBT0gsYUFBUCxDQUFxQixlQUFyQixFQUFzQ0MsS0FBdEMsQ0FBNEMsUUFBNUMsQ0FBdEI7O0FBRUEsS0FBTUcsbUJBQW1CLHFCQUFVQyxnQkFBVixDQUEyQixrQkFBM0IsRUFBK0NDLE1BQS9DLEVBQXpCOztBQUVBOztBQUVBQyxPQUFNQyxJQUFOLENBQVcsZUFBT0MsUUFBbEIsRUFBNEJDLEdBQTVCLENBQWdDLFVBQUNDLE9BQUQsRUFBYTtBQUM1QyxNQUFJQSxtQkFBbUJDLGNBQXZCLEVBQXVDO0FBQ3RDTCxTQUFNQyxJQUFOLENBQVdHLE9BQVgsRUFBb0JELEdBQXBCLENBQXdCLFVBQUNHLHFCQUFELEVBQTJCO0FBQ2xEQyxXQUFPQyxN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QUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHdEQUF1RDtBQUN2RDs7QUFFQSw4QkFBNkIsbUJBQW1COztBQUVoRDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiLi9iaW4vXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCA4YTkzYWViMjQ4YWRjNmJmMTFiNlxuICoqLyIsInJlcXVpcmUoJy4uL2Nzcy9tYWluLnNjc3MnKTtcclxucmVxdWlyZSgnLi4vaW1nL2JhY2tncm91bmRfaW1hZ2UuanBnJyk7XHJcblxyXG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICcuL2NvbXBvbmVudHMvYnV0dG9uJztcclxuaW1wb3J0IHsgVGV4dGZpZWxkIH0gZnJvbSAnLi9jb21wb25lbnRzL3RleHRmaWVsZCc7XHJcbmltcG9ydCB7IEltYWdlcyB9IGZyb20gJy4vY29tcG9uZW50cy9pbWFnZXMnO1xyXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuL2NvbmZpZyc7XHJcbmltcG9ydCB7IEhlbHBlciB9IGZyb20gJy4vaGVscGVyJztcclxuXHJcbkltYWdlcy5sb2FkX2ltYWdlcygpO1xyXG5cclxuY29uc3Qgc3RhcnRfYnV0dG9uID0gQnV0dG9uLmNyZWF0ZV9idXR0b24oJ3N0YXJ0X2J1dHRvbicpLmNsaWNrKCdzdGFydF9nYW1lJyk7XHJcblxyXG5jb25zdCBmYWlsX2J1dHRvbiA9IEJ1dHRvbi5jcmVhdGVfYnV0dG9uKCdmYWlsX2J1dHRvbicpLmNsaWNrKCdyZXN0YXJ0X2dhbWUnKTtcclxuXHJcbmNvbnN0IHN1Ym1pdF9idXR0b24gPSBCdXR0b24uY3JlYXRlX2J1dHRvbignc3VibWl0X2J1dHRvbicpLmNsaWNrKCdzdWJtaXQnKTtcclxuXHJcbmNvbnN0IHN1Ym1pdF90ZXh0ZmllbGQgPSBUZXh0ZmllbGQuY3JlYXRlX3RleHRmaWVsZCgnc3VibWl0X3RleHRmaWVsZCcpLnN1Ym1pdCgpO1xyXG5cclxuLy8gQWRkIGhlbHBlciBmdW5jdGlvbnMgdG8gZWFjaCBlbGVtZW50cyAoZS5nLiBzbyBlYWNoIGVsZW1lbnQgaGF2ZSBtZXRob2RzIGxpa2Ugc2hvdygpLCBoaWRlKCkgZXRjKVxyXG5cclxuQXJyYXkuZnJvbShDb25maWcuZWxlbWVudHMpLm1hcCgoZWxlbWVudCkgPT4ge1xyXG5cdGlmIChlbGVtZW50IGluc3RhbmNlb2YgSFRNTENvbGxlY3Rpb24pIHtcclxuXHRcdEFycmF5LmZyb20oZWxlbWVudCkubWFwKChodG1sQ29sbGVjdGlvbkVsZW1lbnQpID0+IHtcclxuXHRcdFx0T2JqZWN0LmFzc2lnbihodG1sQ29sbGVjdGlvbkVsZW1lbnQsIEhlbHBlcik7XHJcblx0XHR9KVxyXG5cdH0gZWxzZSB7XHJcblx0XHRPYmplY3QuYXNzaWduKGVsZW1lbnQsIEhlbHBlcik7XHRcclxuXHR9XHJcbn0pXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvaW5pdC5qc1xuICoqLyIsIi8qKlxyXG4gKiBUaGlzIGlzIGEgZ2VuZXJpYyBidXR0b24sIHdoaWNoIGhhcyBhIG11bHRpdHVkZSBvZiBnZW5lcmljIHRvIHNwZWNpZmljIGZ1bmN0aW9ucyBmb3IgYWxsIHBvc3NpYmxlIHNjZW5hcmlvcy5cclxuICogQHBhcmFtIHtPYmplY3R9IEJ1dHRvblxyXG4gKi9cclxuaW1wb3J0IHsgQ291bnRkb3duX3BhbmVsIH0gZnJvbSAnLi9jb3VudGRvd25fcGFuZWwnO1xyXG5pbXBvcnQgeyBTbGlkZXIgfSBmcm9tICcuL3NsaWRlcic7XHJcbmltcG9ydCB7IEhlbHBlciB9IGZyb20gJy4uL2hlbHBlcic7XHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uL2NvbmZpZyc7XHJcblxyXG5jb25zdCB7IHN0YXJ0X2J1dHRvbiwgd3JhcHBlciwgaW5zdHJ1Y3Rpb25fcGFuZWwsIGZhaWxfYnV0dG9uLCBmYWlsX2JhY2tncm91bmQsIHNsaWRlcl9wYW5lbCwgc3VibWl0X2J1dHRvbiwgaW1hZ2UsIHN1Ym1pdF90ZXh0ZmllbGQsXHJcblx0XHRhZGRfcG9pbnRzLCBoaWdoX3Njb3JlLCByZXN1bHRfdGV4dCwgaW1hZ2VzIH0gPSBDb25maWcuZWxlbWVudHM7XHJcbmNvbnN0IHsgUE9JTlRTX0FEREVEIH0gPSBDb25maWcuY29uc3RhbnRzO1xyXG5jb25zdCB7IHN1Y2Nlc3NfbWVzc2FnZSwgZmFpbF9tZXNzYWdlIH0gPSBDb25maWcudGV4dDtcclxuY29uc3QgeyB0cmFuc2l0aW9uX2VuZCB9ID0gSGVscGVyO1xyXG5cclxubGV0IGltYWdlX2l0ZXJhdGlvbiA9IDA7XHJcblxyXG5leHBvcnQgY29uc3QgQnV0dG9uID0ge1xyXG5cdGNyZWF0ZV9idXR0b24odHlwZSkge1xyXG5cdFx0cmV0dXJuIE9iamVjdC5jcmVhdGUodGhpcy5idXR0b25bdHlwZV0pO1xyXG5cdH0sXHJcblxyXG5cdGJ1dHRvbjoge1xyXG5cdFx0c3RhcnRfYnV0dG9uOiB7XHRcclxuXHRcdFx0Y2xpY2soY2FsbGJhY2spIHtcclxuXHRcdFx0XHRzdGFydF9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzW2NhbGxiYWNrXSgpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRzdGFydF9nYW1lKCkge1xyXG5cdFx0XHRcdHdyYXBwZXIudG9nZ2xlX2NsYXNzX2Zvcl9hbmltYXRpb24oJ2dyYXlzY2FsZV9iYWNrZ3JvdW5kX2FuaW1hdGlvbicpO1xyXG5cdFx0XHRcdGluc3RydWN0aW9uX3BhbmVsLmhpZGUoKTtcclxuXHRcdFx0XHRTdGFydF9zbGlkZXJfY291bnRkb3duKCkudGhlbigocmVzcG9uc2UpID0+IHtcclxuXHRcdFx0XHRcdFN0YXJ0X3NsaWRlcigpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcblx0XHRcdFx0XHRcdERpc3BsYXlfZmFpbF9wYW5lbChyZXNwb25zZSk7XHJcblx0XHRcdFx0XHR9KVxyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0ZmFpbF9idXR0b246IHtcclxuXHRcdFx0Y2xpY2soY2FsbGJhY2spIHtcclxuXHRcdFx0XHRmYWlsX2J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuXHRcdFx0XHRcdHRoaXNbY2FsbGJhY2tdKCk7XHJcblx0XHRcdFx0fSk7XHJcblx0XHRcdH0sXHJcblx0XHRcdHJlc3RhcnRfZ2FtZSgpIHtcclxuXHRcdFx0XHRmYWlsX2JhY2tncm91bmQuaGlkZSgpO1xyXG5cdFx0XHRcdHNsaWRlcl9wYW5lbC5oaWRlKCk7XHJcblx0XHRcdFx0aW5zdHJ1Y3Rpb25fcGFuZWwuc2hvdygpO1xyXG5cdFx0XHRcdFJlc2V0X2ltYWdlcygpO1xyXG5cdFx0XHR9XHJcblx0XHR9LFxyXG5cdFx0c3VibWl0X2J1dHRvbjoge1xyXG5cdFx0XHRjbGljayhjYWxsYmFjaykge1xyXG5cdFx0XHRcdHN1Ym1pdF9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzW2NhbGxiYWNrXSgpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRzdWJtaXQoKSB7XHJcblx0XHRcdFx0aWYgKFZhbGlkYXRlX2lmX2lucHV0X2lzX2hlcm9fbmFtZShpbWFnZVtpbWFnZV9pdGVyYXRpb25dLCBzdWJtaXRfdGV4dGZpZWxkKSkge1xyXG5cdFx0XHRcdFx0aW1hZ2VbaW1hZ2VfaXRlcmF0aW9uXS5oaWRlKCk7XHJcblx0XHRcdFx0XHRpbWFnZV9pdGVyYXRpb24rKztcclxuXHRcdFx0XHRcdGFkZF9wb2ludHMuaW5uZXJIVE1MID0gJysnICsgUE9JTlRTX0FEREVEO1xyXG5cdFx0XHRcdFx0Zm9yIChsZXQgc2NvcmUgb2YgaGlnaF9zY29yZSkge1xyXG5cdFx0XHRcdFx0XHRzY29yZS5pbm5lckhUTUwgPSBwYXJzZUludChzY29yZS5pbm5lckhUTUwpICsgcGFyc2VJbnQoUE9JTlRTX0FEREVEKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdGFkZF9wb2ludHMudG9nZ2xlX2NsYXNzX2Zvcl9hbmltYXRpb24oJ2FkZF9wb2ludHNfYW5pbWF0aW9uJyk7XHJcblx0XHRcdFx0XHRzdWJtaXRfdGV4dGZpZWxkLnJlbW92ZV9jbGFzcygnc2hha2VfdGV4dGZpZWxkX2FuaW1hdGlvbicpO1xyXG5cdFx0XHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRcdFx0c3VibWl0X3RleHRmaWVsZC50b2dnbGVfY2xhc3NfZm9yX2FuaW1hdGlvbignc2hha2VfdGV4dGZpZWxkX2FuaW1hdGlvbicpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdFx0c3VibWl0X3RleHRmaWVsZC52YWx1ZSA9ICcnO1xyXG5cdFx0XHRcdFx0aWYgKHR5cGVvZiBpbWFnZVtpbWFnZV9pdGVyYXRpb25dID09ICd1bmRlZmluZWQnKSB7XHJcblx0XHRcdFx0XHRcdHJlc3VsdF90ZXh0LmlubmVySFRNTCA9IHN1Y2Nlc3NfbWVzc2FnZTtcclxuXHRcdFx0XHRcdFx0ZmFpbF9iYWNrZ3JvdW5kLnNob3coKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIFN0YXJ0X3NsaWRlcl9jb3VudGRvd24oKSB7XHJcblx0Y29uc3QgY291bnRkb3duX3BhbmVsID0gQ291bnRkb3duX3BhbmVsLmNyZWF0ZV9jb3VudGRvd25fcGFuZWwoKTtcclxuXHRyZXR1cm4gY291bnRkb3duX3BhbmVsLnN0YXJ0X2NvdW50ZG93bl90aW1lcigpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBTdGFydF9zbGlkZXIoKSB7XHJcblx0Y29uc3Qgc2xpZGVyID0gU2xpZGVyLmNyZWF0ZV9zbGlkZXIoKTtcclxuXHRyZXR1cm4gc2xpZGVyLnN0YXJ0X3NsaWRlcigpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBEaXNwbGF5X2ZhaWxfcGFuZWwoKSB7XHJcblx0aW1hZ2VzLnRyYW5zaXRpb25fZW5kKCgpID0+IHtcclxuXHRcdHJlc3VsdF90ZXh0LmlubmVySFRNTCA9IGZhaWxfbWVzc2FnZTtcclxuXHRcdGZhaWxfYmFja2dyb3VuZC5zaG93KCk7XHJcblx0fSk7XHRcdFx0XHRcdFxyXG59XHJcblxyXG5mdW5jdGlvbiBSZXNldF9pbWFnZXMoKSB7XHJcblx0aW1hZ2VzLnN0eWxlLm1hcmdpbkxlZnQgPSAnMTAwJSc7XHJcblx0aW1hZ2VzLnN0eWxlLnRyYW5zaXRpb24gPSAnMHMnO1xyXG5cdEFycmF5LmZyb20oaW1hZ2UpLm1hcCgoaW1nKSA9PiB7XHJcblx0XHRpbWcuc2hvdygnYmxvY2snKVxyXG5cdH0pXHJcblxyXG5cdGltYWdlX2l0ZXJhdGlvbiA9IDA7XHJcblx0QXJyYXkuZnJvbShoaWdoX3Njb3JlKS5tYXAoKHNjb3JlKSA9PiB7XHJcblx0XHRzY29yZS5pbm5lckhUTUwgPSAwO1xyXG5cdH0pXHJcblx0XHJcblx0c3VibWl0X3RleHRmaWVsZC52YWx1ZSA9ICcnO1xyXG5cdHN1Ym1pdF90ZXh0ZmllbGQucmVtb3ZlX2NsYXNzKCdzaGFrZV90ZXh0ZmllbGRfYW5pbWF0aW9uJyk7XHJcblx0YWRkX3BvaW50cy5yZW1vdmVfY2xhc3MoJ2FkZF9wb2ludHNfYW5pbWF0aW9uJyk7XHJcblx0YWRkX3BvaW50cy5zdHlsZS5vcGFjaXR5ID0gMDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFZhbGlkYXRlIGlmIHVzZXIgaW5wdXQgaXMgYSBzdHJpbmcuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbWFnZSAtIFRoZSBpbWFnZSB0aGF0IGlzIGJlaW5nIHZhbGlkYXRlZC5cclxuICogQHBhcmFtICB7T2JqZWN0fSB0ZXh0ZmllbGQgLSBUaGUgdGV4dGZpZWxkIHRoYXQgaGFzIHRoZSB1c2VyIGlucHV0LlxyXG4gKi9cclxuZnVuY3Rpb24gVmFsaWRhdGVfaWZfaW5wdXRfaXNfaGVyb19uYW1lKGhlcm9faW1hZ2UsIHRleHRmaWVsZCkge1xyXG5cdGlmIChoZXJvX2ltYWdlLm5hbWUudG9Mb3dlckNhc2VBbmRSZW1vdmVJbGxlZ2FsQ2hhcmFjdGVycygpID09PSB0ZXh0ZmllbGQudmFsdWUudG9Mb3dlckNhc2VBbmRSZW1vdmVJbGxlZ2FsQ2hhcmFjdGVycygpKSB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblx0cmV0dXJuIGZhbHNlO1xyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29tcG9uZW50cy9idXR0b24uanNcbiAqKi8iLCIvKipcclxuICogVGhpcyBpcyB0aGUgY291bnRkb3duIHBhbmVsOyBpdCB3aWxsIGNvdW50ZG93biB1bnRpbCBpdCByZWFjaGVzIDAgYmVmb3JlIGl0IGRpc3BsYXlzIHRoZSBzbGlkZXIgcGFuZWwuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnJztcclxuXHJcbmNvbnN0IHsgY291bnRkb3duX3BhbmVsIH0gPSBDb25maWcuZWxlbWVudHM7XHJcbmNvbnN0IHsgQ09VTlRET1dOX0RVUkFUSU9OIH0gPSBDb25maWcuY29uc3RhbnRzO1xyXG5cclxuZXhwb3J0IGNvbnN0IENvdW50ZG93bl9wYW5lbCA9IHtcclxuXHRjcmVhdGVfY291bnRkb3duX3BhbmVsKCkge1xyXG5cdFx0cmV0dXJuIE9iamVjdC5jcmVhdGUodGhpcy5jb3VudGRvd25fcGFuZWwpO1xyXG5cdH0sXHJcblx0Y291bnRkb3duX3BhbmVsOiB7XHJcblx0XHRzdGFydF9jb3VudGRvd25fdGltZXIoKSB7XHJcblx0XHRcdGxldCBjb3VudGRvd25fZHVyYXRpb24gPSBDT1VOVERPV05fRFVSQVRJT047XHJcblx0XHRcdGNvbnN0IGNvdW50ZG93bl9wcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRcdGNvdW50ZG93bl9wYW5lbC5zaG93KCk7XHJcblx0XHRcdFx0Y291bnRkb3duX3BhbmVsLmlubmVySFRNTCA9IFwiXCI7XHJcblx0XHRcdFx0Y29uc3QgY291bnRkb3duX3RpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG5cdFx0XHRcdFx0aWYgKGNvdW50ZG93bl9kdXJhdGlvbiA9PT0gMCkge1xyXG5cdFx0XHRcdFx0XHRjbGVhckludGVydmFsKGNvdW50ZG93bl90aW1lcik7XHJcblx0XHRcdFx0XHRcdGNvdW50ZG93bl9wYW5lbC5oaWRlKCk7XHJcblx0XHRcdFx0XHRcdHJlc29sdmUoKTsgXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRjb3VudGRvd25fcGFuZWwuaW5uZXJIVE1MID0gY291bnRkb3duX2R1cmF0aW9uLS07XHJcblx0XHRcdFx0fSwgMTAwMCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRyZXR1cm4gY291bnRkb3duX3Byb21pc2U7XHJcblx0XHR9XHJcblx0fVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29tcG9uZW50cy9jb3VudGRvd25fcGFuZWwuanNcbiAqKi8iLCJleHBvcnQgY29uc3QgQ29uZmlnID0ge1xyXG5cdC8vIEhNTU1NIFNIT1VMRCBBTEwgVEhFIFZBUklBQkxFUyBIRVJFIEhBVkUgVVBQRVIgQ0FTRSBDSEFSQUNURVJTP1xyXG5cdGVsZW1lbnRzOiB7XHJcblx0XHQvLyBpbWFnZXNcclxuXHRcdGltYWdlczogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VzJylbMF0sXHJcblx0XHRpbWFnZXNfcGFuZWw6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlc19wYW5lbCcpWzBdLFxyXG5cdFx0aW1hZ2U6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlJyksXHJcblx0XHQvL2ZhaWxcclxuXHRcdGZhaWxfYmFja2dyb3VuZDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZmFpbF9iYWNrZ3JvdW5kJylbMF0sXHJcblx0XHRmYWlsX2J1dHRvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZhaWxfYnV0dG9uJyksXHJcblx0XHQvL3N1Ym1pdFxyXG5cdFx0c3VibWl0X3RleHRmaWVsZDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdF90ZXh0ZmllbGQnKSxcclxuXHRcdHN1Ym1pdF9idXR0b246IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXRfYnV0dG9uJyksXHJcblx0XHQvL2luc3RydWN0aW9uXHJcblx0XHRpbnN0cnVjdGlvbl9wYW5lbDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW5zdHJ1Y3Rpb25fcGFuZWwnKVswXSxcclxuXHRcdHN0YXJ0X2J1dHRvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0X2J1dHRvbicpLFxyXG5cdFx0Ly9jb3VudGRvd25cclxuXHRcdGNvdW50ZG93bl9wYW5lbDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvdW50ZG93bl9wYW5lbCcpLFxyXG5cdFx0Ly9zbGlkZXJcclxuXHRcdGFkZF9wb2ludHM6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FkZF9wb2ludHMnKVswXSxcclxuXHRcdHNsaWRlcl9wYW5lbDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGVyX3BhbmVsJylbMF0sXHJcblx0XHRoaWdoX3Njb3JlOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdoaWdoX3Njb3JlJyksXHJcblx0XHRyZXN1bHRfdGV4dDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncmVzdWx0X3RleHQnKVswXSxcclxuXHRcdC8vYm9keVxyXG5cdFx0d3JhcHBlcjogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnd3JhcHBlcicpWzBdLFxyXG5cclxuXHRcdFtTeW1ib2wuaXRlcmF0b3JdKCkge1xyXG5cdFx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHRcdHZhciB2YWx1ZXMgPSBPYmplY3Qua2V5cyh0aGlzKTtcclxuXHRcdFx0dmFyIGkgPSAwO1xyXG5cdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdG5leHQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRcdFx0dmFsdWU6IHNlbGZbdmFsdWVzW2krK11dLFxyXG5cdFx0XHRcdFx0XHRkb25lOiBpID4gdmFsdWVzLmxlbmd0aFxyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdGNvbnN0YW50czoge1xyXG5cdFx0Q09VTlRET1dOX0RVUkFUSU9OOiAzLFxyXG5cdFx0U0xJREVfRFVSQVRJT046IDEwLFxyXG5cdFx0V0FSTklOR19USFJFU0hPTEQ6IDMwLFxyXG5cdFx0UE9JTlRTX0FEREVEOiAxMDAsXHJcblxyXG5cdFx0W1N5bWJvbC5pdGVyYXRvcl0oKSB7XHJcblx0XHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdFx0dmFyIHZhbHVlcyA9IE9iamVjdC5rZXlzKHRoaXMpO1xyXG5cdFx0XHR2YXIgaSA9IDA7XHJcblx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0bmV4dDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0XHRyZXR1cm4ge1xyXG5cdFx0XHRcdFx0XHR2YWx1ZTogc2VsZlt2YWx1ZXNbaSsrXV0sXHJcblx0XHRcdFx0XHRcdGRvbmU6IGkgPiB2YWx1ZXMubGVuZ3RoXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0dGV4dDoge1xyXG5cdFx0Ly9mYWlsXHJcblx0XHRmYWlsX21lc3NhZ2U6ICdZb3UgbG9zZS4uLicsXHJcblxyXG5cdFx0Ly93aW5cclxuXHRcdHN1Y2Nlc3NfbWVzc2FnZTogJ0V6IFdpbiEnLFxyXG5cclxuXHRcdGltYWdlc19qc29uX3VybDogJ2h0dHBzOi8vbGlsbW9ydGFsLXRlc3QuYXBpZ2VlLm5ldC9nZXRkb3RhaGVyb2VzP2tleT02QzFDRjc2QzkwNzY4Mzg4NjE4RjM0OEJCNzNFRTAxNSZsYW5ndWFnZT1lbl91cyZmb3JtYXQ9SlNPTicsXHJcblx0XHRpbWFnZV91cmw6ICdodHRwOi8vY2RuLmRvdGEyLmNvbS9hcHBzL2RvdGEyL2ltYWdlcy9oZXJvZXMvJyxcclxuXHRcdGltYWdlX3NpemU6ICdfbGcucG5nJyxcclxuXHJcblx0XHRbU3ltYm9sLml0ZXJhdG9yXSgpIHtcclxuXHRcdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0XHR2YXIgdmFsdWVzID0gT2JqZWN0LmtleXModGhpcyk7XHJcblx0XHRcdHZhciBpID0gMDtcclxuXHRcdFx0cmV0dXJuIHtcclxuXHRcdFx0XHRuZXh0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRcdHJldHVybiB7XHJcblx0XHRcdFx0XHRcdHZhbHVlOiBzZWxmW3ZhbHVlc1tpKytdXSxcclxuXHRcdFx0XHRcdFx0ZG9uZTogaSA+IHZhbHVlcy5sZW5ndGhcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9LFxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29uZmlnLmpzXG4gKiovIiwiLyoqXHJcbiAqIFRoaXMgaXMgdGhlIHNsaWRlciB0aGF0IHdpbGwgYmUgZGlzcGxheWVkIGFmdGVyIHRoZSBjb3VudGRvd24uIEl0IHdpbGwgZGlzcGxheSBhbiBlbmRsZXNzIHN0cmVhbSBvZiBkb3RhIGltYWdlcyB0aGF0IGFyZSByZXRyaWV2ZWQgdmlhIERvdGEgQVBJLlxyXG4gKiBJdCB3aWxsIGNvbnN0YW50bHkgdHJhbnNpdGlvbiB0byB0aGUgbGVmdCB1bnRpbCBpdCByZWFjaGVzIHRvIHRoZSBzdGFydGluZyBwb3NpdGlvbiBvZiB0aGUgcGFuZWwgdGhhdCBob2xkcyB0aGUgaW1hZ2VzLCB3aGljaCBpbiB0aGF0IGNhc2UgdGhlIGdhbWVcclxuICogbG9zZS4gXHJcbiAqL1xyXG5pbXBvcnQgeyBIZWxwZXIgfSBmcm9tJy4uL2hlbHBlcic7XHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20nLi4vY29uZmlnJztcclxuXHJcbmNvbnN0IHsgaW1hZ2VzLCBpbWFnZXNfcGFuZWwsIHNsaWRlcl9wYW5lbCB9ID0gQ29uZmlnLmVsZW1lbnRzO1xyXG5jb25zdCB7IFdBUk5JTkdfVEhSRVNIT0xELCBTTElERV9EVVJBVElPTiB9ID0gQ29uZmlnLmNvbnN0YW50cztcclxuXHJcbmV4cG9ydCBjb25zdCBTbGlkZXIgPSB7XHRcclxuXHRjcmVhdGVfc2xpZGVyKCkge1xyXG5cdFx0cmV0dXJuIE9iamVjdC5jcmVhdGUodGhpcy5zbGlkZXJfcGFuZWwpO1xyXG5cdH0sXHJcblxyXG5cdHNsaWRlcl9wYW5lbDoge1xyXG5cdFx0Ly8gVVNFIFJFUVVFU1RBTklNQVRJT05GUkFNRSwgTkVFRCBUTyBGSU5EIE9VVCBIT1cgVE8gQ0hFQ0sgV0hFTiBBTklNQVRJT04gRlJBTUUgRU5EU1xyXG5cdFx0c2xpZGUoKSB7XHJcblx0XHRcdGNvbnN0IHNjcmVlbl93aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xyXG5cdFx0XHRjb25zdCBpbWFnZXNfcGFuZWxfd2lkdGggPSAoc2NyZWVuX3dpZHRoIC0gaW1hZ2VzX3BhbmVsLm9mZnNldFdpZHRoIC8gMikgKyBpbWFnZXNfcGFuZWwub2Zmc2V0V2lkdGg7XHJcblx0XHRcdGNvbnN0IHdhcm5pbmdfd2lkdGhfdGhyZXNob2xkID0gaW1hZ2VzX3BhbmVsX3dpZHRoICogV0FSTklOR19USFJFU0hPTEQgLyAxMDA7XHJcblx0XHRcdGxldCB0aW1lcjtcclxuXHRcdFx0aW1hZ2VzLnN0eWxlLm1hcmdpbkxlZnQgPSAnMCc7XHJcblx0XHRcdGltYWdlcy5zdHlsZS50cmFuc2l0aW9uID0gU0xJREVfRFVSQVRJT04gKyAncyBsaW5lYXInO1xyXG5cdFx0XHRpbWFnZXNfcGFuZWwucmVtb3ZlX2NsYXNzKCd3YXJuaW5nX2FuaW1hdGlvbicpO1xyXG5cclxuXHRcdFx0dGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcblx0XHRcdFx0aWYgKGltYWdlcy5nZXRfcG9zaXRpb24oKS54IDw9IHdhcm5pbmdfd2lkdGhfdGhyZXNob2xkKSB7XHJcblx0XHRcdFx0XHRpbWFnZXNfcGFuZWwuYWRkX2NsYXNzKCd3YXJuaW5nX2FuaW1hdGlvbicpO1xyXG5cdFx0XHRcdFx0Y2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LCAxMDAwKTtcclxuXHRcdH0sXHJcblx0XHRzdGFydF9zbGlkZXIoKSB7XHJcblx0XHRcdGNvbnN0IHNsaWRlcl9wcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRcdHNsaWRlcl9wYW5lbC5zaG93KCk7XHJcblx0XHRcdFx0dGhpcy5zbGlkZSgpO1xyXG5cdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0fSlcclxuXHRcdFx0LmNhdGNoKChlKSA9PiB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRyZXR1cm4gc2xpZGVyX3Byb21pc2U7XHJcblx0XHR9XHJcblx0fVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29tcG9uZW50cy9zbGlkZXIuanNcbiAqKi8iLCIvLyBPS0FZIFRISVMgSEVMUEVSIFRISU5HIFNVQ0tTISBGSU5EIEFMVEVSTkFUSVZFIChBTkQgVVBQRVIgQ0FTRSBBTEwgVEhJUyBGVU5DVElPTlMpXHJcbmNvbnN0IElMTEVHQUxfQ0hBUkFDVEVSUyA9IG5ldyBSZWdFeHAoL1tcXC1cXHNdKy8pO1xyXG5cclxuLyoqXHJcbiogQ29udmVydCBzdHJpbmcgdG8gbG93ZXIgY2FzZSBhbmQgcmVtb3ZlIGlsbGVnYWwgY2hhcmFjdGVycy5cclxuKi9cclxuaWYgKCFTdHJpbmcucHJvdG90eXBlLnRvTG93ZXJDYXNlQW5kUmVtb3ZlSWxsZWdhbENoYXJhY3RlcnMpIHtcclxuXHRTdHJpbmcucHJvdG90eXBlLnRvTG93ZXJDYXNlQW5kUmVtb3ZlSWxsZWdhbENoYXJhY3RlcnMgPSBmdW5jdGlvbigpIHtcclxuXHRcdGxldCBsb3dlckNhc2VWYWx1ZSA9IHRoaXMudG9Mb3dlckNhc2UoKTtcclxuXHRcdHJldHVybiBsb3dlckNhc2VWYWx1ZS5yZXBsYWNlKElMTEVHQUxfQ0hBUkFDVEVSUywgJycpO1xyXG5cdH1cclxufVxyXG5cclxuLyoqXHJcbiogRmluZCB3aGljaCBDU1MgdHJhbnNpdGlvbiBldmVudHMgZW5kLlxyXG4qIGh0dHBzOi8vam9uc3VoLmNvbS9ibG9nL2RldGVjdC10aGUtZW5kLW9mLWNzcy1hbmltYXRpb25zLWFuZC10cmFuc2l0aW9ucy13aXRoLWphdmFzY3JpcHQvXHJcbiovXHJcbmZ1bmN0aW9uIHdoaWNoX3RyYW5zaXRpb25fZXZlbnQoKXtcclxuXHR2YXIgdCxcclxuXHRlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJmYWtlZWxlbWVudFwiKTtcclxuXHJcblx0dmFyIHRyYW5zaXRpb25zID0ge1xyXG5cdFx0XCJ0cmFuc2l0aW9uXCIgICAgICA6IFwidHJhbnNpdGlvbmVuZFwiLFxyXG5cdFx0XCJPVHJhbnNpdGlvblwiICAgICA6IFwib1RyYW5zaXRpb25FbmRcIixcclxuXHRcdFwiTW96VHJhbnNpdGlvblwiICAgOiBcInRyYW5zaXRpb25lbmRcIixcclxuXHRcdFwiV2Via2l0VHJhbnNpdGlvblwiOiBcIndlYmtpdFRyYW5zaXRpb25FbmRcIlxyXG5cdH1cclxuXHJcblx0Zm9yICh0IGluIHRyYW5zaXRpb25zKXtcclxuXHRcdGlmIChlbC5zdHlsZVt0XSAhPT0gdW5kZWZpbmVkKXtcclxuXHRcdFx0cmV0dXJuIHRyYW5zaXRpb25zW3RdO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IGNvbnN0IEhlbHBlciA9IHtcclxuXHQvKipcclxuXHQgKiBCaW5kIHRoZSBmb2N1c2VkIGVsZW1lbnQ7IGl0IHdpbGwgY2FsbCB0aGUgY2FsbGJhY2sgd2hlbiB0cmFuc2l0aW9uIGVuZHMuXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IGNhbGxiYWNrIC0gdGhlIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2hlbiB0cmFuc2l0aW9uIGVuZC5cclxuXHQgKi9cclxuXHR0cmFuc2l0aW9uX2VuZChjYWxsYmFjaykge1xyXG5cdFx0Y29uc3QgdHJhbnNpdGlvbl9ldmVudCA9IHdoaWNoX3RyYW5zaXRpb25fZXZlbnQoKTtcclxuXHRcdHRoaXMuYWRkRXZlbnRMaXN0ZW5lcih0cmFuc2l0aW9uX2V2ZW50LCBjYWxsYmFjayk7XHJcblx0fSxcclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IGVsIC0gVGhlIGVsZW1lbnQgdGhhdCB3ZSB3YW50IHRvIGZpbmQgdGhlIGN1cnJlbnQgcG9zaXRpb24gaXMgcmVsYXRpdmUgdG8gdGhlIHdpbmRvdy5cclxuXHQgKiBodHRwczovL3d3dy5raXJ1cGEuY29tL2h0bWw1L2dldF9lbGVtZW50X3Bvc2l0aW9uX3VzaW5nX2phdmFzY3JpcHQuaHRtXHJcblx0ICovXHJcblx0Z2V0X3Bvc2l0aW9uKCkge1xyXG5cdFx0bGV0IHhQb3MgPSAwO1xyXG5cdFx0bGV0IHlQb3MgPSAwO1xyXG5cclxuXHRcdGxldCBlbGVtZW50ID0gdGhpcztcclxuXHRcdHdoaWxlIChlbGVtZW50KSB7XHJcblx0XHRcdGlmIChlbGVtZW50LnRhZ05hbWUgPT0gXCJCT0RZXCIpIHtcclxuXHRcdFx0XHQvLyBkZWFsIHdpdGggYnJvd3NlciBxdWlya3Mgd2l0aCBib2R5L3dpbmRvdy9kb2N1bWVudCBhbmQgcGFnZSBzY3JvbGxcclxuXHRcdFx0XHR2YXIgeFNjcm9sbCA9IGVsZW1lbnQuc2Nyb2xsTGVmdCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdDtcclxuXHRcdFx0XHR2YXIgeVNjcm9sbCA9IGVsZW1lbnQuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XHJcblxyXG5cdFx0XHRcdHhQb3MgKz0gKGVsZW1lbnQub2Zmc2V0TGVmdCAtIHhTY3JvbGwgKyBlbGVtZW50LmNsaWVudExlZnQpO1xyXG5cdFx0XHRcdHlQb3MgKz0gKGVsZW1lbnQub2Zmc2V0VG9wIC0geVNjcm9sbCArIGVsZW1lbnQuY2xpZW50VG9wKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBmb3IgYWxsIG90aGVyIG5vbi1CT0RZIGVsZW1lbnRzXHJcblx0XHRcdFx0eFBvcyArPSAoZWxlbWVudC5vZmZzZXRMZWZ0IC0gZWxlbWVudC5zY3JvbGxMZWZ0ICsgZWxlbWVudC5jbGllbnRMZWZ0KTtcclxuXHRcdFx0XHR5UG9zICs9IChlbGVtZW50Lm9mZnNldFRvcCAtIGVsZW1lbnQuc2Nyb2xsVG9wICsgZWxlbWVudC5jbGllbnRUb3ApO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsZW1lbnQgPSBlbGVtZW50Lm9mZnNldFBhcmVudDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR4OiB4UG9zLFxyXG5cdFx0XHR5OiB5UG9zXHJcblx0XHR9O1xyXG5cdH0sXHJcblx0LyoqXHJcblx0ICogRGlzcGxheSB0aGUgZWxlbWVudC5cclxuXHQgKiBAcGFyYW0gIHtTdHJpbmd9IGRpc3BsYXkgLSBUaGUgZGlzcGxheSB0eXBlLlxyXG5cdCAqL1xyXG5cdHNob3coZGlzcGxheSkge1xyXG5cdFx0aWYgKHR5cGVvZiBkaXNwbGF5ICE9PSAndW5kZWZpbmVkJyAmJiBkaXNwbGF5ICE9PSAnJykge1xyXG5cdFx0XHR0aGlzLnN0eWxlLmRpc3BsYXkgPSBkaXNwbGF5O1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdC8qKlxyXG5cdCAqIEhpZGUgdGhlIGVsZW1lbnQuXHJcblx0ICovXHJcblx0aGlkZSgpIHtcclxuXHRcdHRoaXMuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHR9LFxyXG5cclxuXHQvKipcclxuXHQgKiBBZGQgYSBDU1MgY2xhc3MgdG8gYW4gZWxlbWVudC5cclxuXHQgKiBAcGFyYW0gIHtTdHJpbmd9IGNsYXNzTmFtZSAtIFRoZSBDU1MgY2xhc3MgbmFtZS5cclxuXHQgKi9cclxuXHRhZGRfY2xhc3MoY2xhc3NOYW1lKSB7XHJcblx0XHRpZiAoIXRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcclxuXHRcdFx0dGhpcy5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlIGEgQ1NTIGNsYXNzIGZyb20gYW4gZWxlbWVudC5cclxuXHQgKiBAcGFyYW0gIHtTdHJpbmd9IGNsYXNzTmFtZSAtIFRoZSBDU1MgY2xhc3MgbmFtZS5cclxuXHQgKi9cclxuXHRyZW1vdmVfY2xhc3MoY2xhc3NOYW1lKSB7XHJcblx0XHRpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xyXG5cdFx0XHR0aGlzLmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKTtcclxuXHRcdH1cclxuXHRcdC8vIHdlaXJkIGhhY2sgcnVsZSAtIGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vcmVzdGFydC1jc3MtYW5pbWF0aW9uL1xyXG5cdFx0dm9pZCB0aGlzLm9mZnNldFdpZHRoO1x0XHRcclxuXHR9LFxyXG5cclxuXHQvKipcclxuXHQgKiBUb2dnbGUgd2hldGhlciB0byBhZGQgb3IgcmVtb3ZlIENTUyBjbGFzcy5cclxuXHQgKiBAcGFyYW0gIHtTdHJpbmd9IGNsYXNzTmFtZSAtIFRoZSBDU1MgY2xhc3MgbmFtZS5cclxuXHQgKi9cclxuXHR0b2dnbGVfY2xhc3MoY2xhc3NOYW1lKSB7XHJcblx0XHRpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xyXG5cdFx0XHQvLyBmaW5kIGFsdGVybmF0aXZlIHRvIHJlbW92ZSB0aGlzIEhlbHBlclxyXG5cdFx0XHRIZWxwZXIucmVtb3ZlX2NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRIZWxwZXIuYWRkX2NsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHRcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHQvL0lNIFRJUkVELCBXSEFUUyBBIEdPT0QgTkFNRSBGT1IgVEhJU1xyXG5cdC8qKlxyXG5cdCAqIFRvZ2dsZSB3aGV0aGVyIHRvIGFkZCBvciByZW1vdmUgQ1NTIGNsYXNzLlxyXG5cdCAqIEBwYXJhbSAge1N0cmluZ30gY2xhc3NOYW1lIC0gVGhlIENTUyBjbGFzcyBuYW1lLlxyXG5cdCAqL1xyXG5cdHRvZ2dsZV9jbGFzc19mb3JfYW5pbWF0aW9uKGNsYXNzTmFtZSkge1xyXG5cdFx0aWYgKHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcclxuXHRcdFx0SGVscGVyLnJlbW92ZV9jbGFzcy5jYWxsKHRoaXMsIGNsYXNzTmFtZSk7XHJcblx0XHR9XHJcblx0XHRIZWxwZXIuYWRkX2NsYXNzLmNhbGwodGhpcywgY2xhc3NOYW1lKTtcclxuXHR9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9oZWxwZXIuanNcbiAqKi8iLCJpbXBvcnQgeyBCdXR0b24gfSBmcm9tICcuL2J1dHRvbic7XHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4uL2NvbmZpZyc7XHJcblxyXG5jb25zdCB7IHN1Ym1pdF90ZXh0ZmllbGQgfSA9IENvbmZpZy5lbGVtZW50cztcclxuXHJcbmV4cG9ydCBjb25zdCBUZXh0ZmllbGQgPSB7XHJcblx0Y3JlYXRlX3RleHRmaWVsZChjYWxsYmFjaykge1xyXG5cdFx0cmV0dXJuIE9iamVjdC5jcmVhdGUodGhpcy50ZXh0ZmllbGRbY2FsbGJhY2tdKTtcclxuXHR9LFxyXG5cclxuXHR0ZXh0ZmllbGQ6IHtcclxuXHRcdHN1Ym1pdF90ZXh0ZmllbGQ6IHtcclxuXHRcdFx0c3VibWl0KCkge1xyXG5cdFx0XHRcdGNvbnN0IHN1Ym1pdF9idXR0b24gPSBCdXR0b24uY3JlYXRlX2J1dHRvbignc3VibWl0X2J1dHRvbicpO1xyXG5cclxuXHRcdFx0XHRzdWJtaXRfdGV4dGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGV2ZW50KSA9PiB7XHJcblx0XHRcdFx0XHRpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcclxuXHRcdFx0XHRcdFx0c3VibWl0X2J1dHRvbi5zdWJtaXQoKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHR9KTtcdFx0XHRcdFxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2NvbXBvbmVudHMvdGV4dGZpZWxkLmpzXG4gKiovIiwiaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnJztcclxuaW1wb3J0IHsgSGVscGVyIH0gZnJvbSAnLi4vaGVscGVyJztcclxuXHJcbmNvbnN0IHsgaW1hZ2VzIH0gPSBDb25maWcuZWxlbWVudHM7XHJcbmNvbnN0IHsgaW1hZ2VzX2pzb25fdXJsIH0gPSBDb25maWcudGV4dDtcclxuXHJcbmV4cG9ydCBjb25zdCBJbWFnZXMgPSB7XHJcblx0Z2V0X3N0YXR1cyhyZXNwb25zZSkge1xyXG5cdFx0aWYgKHJlc3BvbnNlLnN0YXR1cyAhPT0gMjAwKSB7XHJcblx0XHRcdHJldHVybiBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IocmVzcG9uc2Uuc3RhdHVzVGV4dCkpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVzb2x2ZShyZXNwb25zZSk7XHJcblx0XHR9XHJcblx0fSxcclxuXHRnZXRfanNvbihyZXNwb25zZSkge1xyXG5cdFx0cmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuXHR9LFxyXG5cdGxvYWRfaW1hZ2VzKCkge1xyXG5cdFx0ZmV0Y2goaW1hZ2VzX2pzb25fdXJsKVxyXG5cdFx0LnRoZW4odGhpcy5nZXRfc3RhdHVzKVxyXG5cdFx0LnRoZW4odGhpcy5nZXRfanNvbilcclxuXHRcdC50aGVuKChyZXNwb25zZSkgPT4ge1xyXG5cdFx0XHRjb25zdCBoZXJvZXMgPSByZXNwb25zZS5yZXN1bHQuaGVyb2VzO1xyXG5cdFx0XHRjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHJcblx0XHRcdEFycmF5LmZyb20oaGVyb2VzKS5tYXAoKGhlcm8pID0+IHtcclxuXHRcdFx0XHRjb25zdCBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG5cdFx0XHRcdGltYWdlLmNsYXNzTmFtZSA9ICdpbWFnZSc7XHJcblx0XHRcdFx0aW1hZ2Uuc3JjID0gJ2h0dHA6Ly9jZG4uZG90YTIuY29tL2FwcHMvZG90YTIvaW1hZ2VzL2hlcm9lcy8nICsgaGVyby5uYW1lLnJlcGxhY2UoJ25wY19kb3RhX2hlcm9fJywgJycpICsgJ19sZy5wbmcnO1xyXG5cdFx0XHRcdC8vSXQgc2hvdWxkIGJlIFR1c2thciwgbm90IFR1c2shXHJcblx0XHRcdFx0aWYgKGhlcm8ubG9jYWxpemVkX25hbWUgPT09ICdUdXNrJykge1xyXG5cdFx0XHRcdFx0aGVyby5sb2NhbGl6ZWRfbmFtZSA9ICdUdXNrYXInO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpbWFnZS5uYW1lID0gaGVyby5sb2NhbGl6ZWRfbmFtZTtcclxuXHRcdFx0XHRPYmplY3QuYXNzaWduKGltYWdlLCBIZWxwZXIpO1xyXG5cdFx0XHRcdGZyYWdtZW50LmFwcGVuZENoaWxkKGltYWdlKTtcclxuXHRcdFx0fSk7XHJcblx0XHRcdFxyXG5cdFx0XHRpbWFnZXMuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG5cdFx0fSlcclxuXHR9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29tcG9uZW50cy9pbWFnZXMuanNcbiAqKi8iLCIvLyBzdHlsZS1sb2FkZXI6IEFkZHMgc29tZSBjc3MgdG8gdGhlIERPTSBieSBhZGRpbmcgYSA8c3R5bGU+IHRhZ1xuXG4vLyBsb2FkIHRoZSBzdHlsZXNcbnZhciBjb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEuL21haW4uc2Nzc1wiKTtcbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuLy8gYWRkIHRoZSBzdHlsZXMgdG8gdGhlIERPTVxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCB7fSk7XG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2Fscztcbi8vIEhvdCBNb2R1bGUgUmVwbGFjZW1lbnRcbmlmKG1vZHVsZS5ob3QpIHtcblx0Ly8gV2hlbiB0aGUgc3R5bGVzIGNoYW5nZSwgdXBkYXRlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0aWYoIWNvbnRlbnQubG9jYWxzKSB7XG5cdFx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhLi9tYWluLnNjc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi8uLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvaW5kZXguanMhLi9tYWluLnNjc3NcIik7XG5cdFx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblx0XHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0XHR9KTtcblx0fVxuXHQvLyBXaGVuIHRoZSBtb2R1bGUgaXMgZGlzcG9zZWQsIHJlbW92ZSB0aGUgPHN0eWxlPiB0YWdzXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zcmMvY3NzL21haW4uc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKSgpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLypAaW1wb3J0ICdyZXNldCc7Ki9cXG4uYnV0dG9uIHtcXG4gIGJhY2tncm91bmQ6IC13ZWJraXQtbGluZWFyLWdyYWRpZW50KCM5YjliOWIsIGJsYWNrKTtcXG4gIGJhY2tncm91bmQ6IC1vLWxpbmVhci1ncmFkaWVudCgjOWI5YjliLCBibGFjayk7XFxuICBiYWNrZ3JvdW5kOiAtbW96LWxpbmVhci1ncmFkaWVudCgjOWI5YjliLCBibGFjayk7XFxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoIzliOWI5YiwgYmxhY2spO1xcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgLW1vei1ib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgLW1zLWJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICBib3JkZXItcmFkaXVzOiAxMHB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgIzE5MTkxOTtcXG4gIG91dGxpbmU6IDA7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBjb2xvcjogd2hpdGU7XFxuICBwYWRkaW5nOiAyMHB4OyB9XFxuICAuYnV0dG9uOmhvdmVyIHtcXG4gICAgYmFja2dyb3VuZDogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoZGltZ3JheSwgYmxhY2spO1xcbiAgICBiYWNrZ3JvdW5kOiAtby1saW5lYXItZ3JhZGllbnQoZGltZ3JheSwgYmxhY2spO1xcbiAgICBiYWNrZ3JvdW5kOiAtbW96LWxpbmVhci1ncmFkaWVudChkaW1ncmF5LCBibGFjayk7XFxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudChkaW1ncmF5LCBibGFjayk7IH1cXG4gIC5idXR0b246YWN0aXZlIHtcXG4gICAgYmFja2dyb3VuZDogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoIzU1NTU1NSwgYmxhY2spO1xcbiAgICBiYWNrZ3JvdW5kOiAtby1saW5lYXItZ3JhZGllbnQoIzU1NTU1NSwgYmxhY2spO1xcbiAgICBiYWNrZ3JvdW5kOiAtbW96LWxpbmVhci1ncmFkaWVudCgjNTU1NTU1LCBibGFjayk7XFxuICAgIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgjNTU1NTU1LCBibGFjayk7IH1cXG5cXG4jY291bnRkb3duX3BhbmVsIHtcXG4gIG1pbi13aWR0aDogMTAwJTtcXG4gIG1pbi1oZWlnaHQ6IDEwMCU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgZm9udC1zaXplOiAxMmVtO1xcbiAgei1pbmRleDogMTsgfVxcblxcbi5ncmF5c2NhbGVfYmFja2dyb3VuZF9hbmltYXRpb24ge1xcbiAgYW5pbWF0aW9uOiBHUkFZU0NBTEVfQkFDS0dST1VORF9BTklNQVRJT04gNHM7IH1cXG5cXG5Aa2V5ZnJhbWVzIEdSQVlTQ0FMRV9CQUNLR1JPVU5EX0FOSU1BVElPTiB7XFxuICAyMCUsIDEwMCUge1xcbiAgICAtd2Via2l0LWZpbHRlcjogZ3JheXNjYWxlKDAuNykgYmx1cigzcHgpO1xcbiAgICAtbW96LWZpbHRlcjogZ3JheXNjYWxlKDAuNykgYmx1cigzcHgpO1xcbiAgICAtbXMtZmlsdGVyOiBncmF5c2NhbGUoMC43KSBibHVyKDNweCk7XFxuICAgIGZpbHRlcjogZ3JheXNjYWxlKDAuNykgYmx1cigzcHgpOyB9IH1cXG5cXG4uZmFpbF9iYWNrZ3JvdW5kIHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgbWluLXdpZHRoOiAxMDAlO1xcbiAgbWluLWhlaWdodDogMTAwJTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgYW5pbWF0aW9uOiBGQUlMX0JBQ0tHUk9VTkRfQU5JTUFUSU9OIDFzO1xcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XFxuICB6LWluZGV4OiAyOyB9XFxuXFxuLmZhaWxfcGFuZWwge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNGMEZGRkY7XFxuICBjb2xvcjogYmxhY2s7XFxuICBhbmltYXRpb246IEZBSUxfUEFORUxfQU5JTUFUSU9OIDFzO1xcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XFxuICBwYWRkaW5nOiAyMHB4IDAgMjBweCAwO1xcbiAgZm9udC1zaXplOiAwLjY3ZW07IH1cXG4gIC5mYWlsX3BhbmVsIGgxLCAuZmFpbF9wYW5lbCBoMyB7XFxuICAgIGFuaW1hdGlvbjogRkFJTF9URVhUX0FOSU1BVElPTiAxcztcXG4gICAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7IH1cXG4gIEBtZWRpYSAobWluLXdpZHRoOiAzNDBweCkge1xcbiAgICAuZmFpbF9wYW5lbCB7XFxuICAgICAgZm9udC1zaXplOiAxZW07IH0gfVxcbiAgQG1lZGlhIChtaW4td2lkdGg6IDUwMHB4KSB7XFxuICAgIC5mYWlsX3BhbmVsIHtcXG4gICAgICBmb250LXNpemU6IDEuMmVtOyB9IH1cXG4gIEBtZWRpYSAobWluLXdpZHRoOiA2NTBweCkge1xcbiAgICAuZmFpbF9wYW5lbCB7XFxuICAgICAgZm9udC1zaXplOiAxLjVlbTsgfSB9XFxuICBAbWVkaWEgKG1pbi13aWR0aDogODI1cHgpIHtcXG4gICAgLmZhaWxfcGFuZWwge1xcbiAgICAgIGZvbnQtc2l6ZTogMmVtOyB9IH1cXG4gIC5mYWlsX3BhbmVsIGJ1dHRvbiB7XFxuICAgIGFuaW1hdGlvbjogRkFJTF9CVVRUT05fQU5JTUFUSU9OIDFzO1xcbiAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkczsgfVxcblxcbkBrZXlmcmFtZXMgRkFJTF9CQUNLR1JPVU5EX0FOSU1BVElPTiB7XFxuICAwJSB7XFxuICAgIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50OyB9XFxuICAxMDAlIHtcXG4gICAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjgpO1xcbiAgICB0cmFuc2l0aW9uOiBiYWNrZ3JvdW5kIDAuNXMgZWFzZS1pbi1vdXQ7IH0gfVxcblxcbkBrZXlmcmFtZXMgRkFJTF9QQU5FTF9BTklNQVRJT04ge1xcbiAgMCUge1xcbiAgICBtYXgtaGVpZ2h0OiAwO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuICAxMDAlIHtcXG4gICAgbWF4LWhlaWdodDogNDAwcHg7XFxuICAgIHRyYW5zaXRpb246IDFzIGVhc2UtaW4tb3V0OyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIEZBSUxfVEVYVF9BTklNQVRJT04ge1xcbiAgMCUsIDMwJSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAxO1xcbiAgICB0cmFuc2l0aW9uOiAwLjVzIGVhc2UtaW4tb3V0OyB9IH1cXG5cXG5Aa2V5ZnJhbWVzIEZBSUxfQlVUVE9OX0FOSU1BVElPTiB7XFxuICAwJSwgODAlIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zaXRpb246IDAuNXMgZWFzZS1pbi1vdXQ7IH0gfVxcblxcbi5pbWFnZXNfcGFuZWwge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIHdpZHRoOiA5OSU7XFxuICBib3JkZXI6IDVweCBkb3VibGUgZ29sZDtcXG4gIC13ZWJraXQtYm9yZGVyLXJhZGl1czogM3B4O1xcbiAgLW1vei1ib3JkZXItcmFkaXVzOiAzcHg7XFxuICAtbXMtYm9yZGVyLXJhZGl1czogM3B4O1xcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbiAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7IH1cXG5cXG4uaW1hZ2VzIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xcbiAgbWFyZ2luLWxlZnQ6IDEwMCU7XFxuICBib3JkZXI6IDA7IH1cXG5cXG4uaW1hZ2Uge1xcbiAgd2lkdGg6IDQ4cHg7XFxuICBoZWlnaHQ6IDI3cHg7XFxuICBib3JkZXItbGVmdDogNHB4IGdyb292ZSBnb2xkOyB9XFxuICBAbWVkaWEgKG1pbi13aWR0aDogNDAwcHgpIHtcXG4gICAgLmltYWdlIHtcXG4gICAgICB3aWR0aDogNjRweDtcXG4gICAgICBoZWlnaHQ6IDM2cHg7IH0gfVxcbiAgQG1lZGlhIChtaW4td2lkdGg6IDUwMHB4KSB7XFxuICAgIC5pbWFnZSB7XFxuICAgICAgd2lkdGg6IDgwcHg7XFxuICAgICAgaGVpZ2h0OiA0NXB4OyB9IH1cXG4gIEBtZWRpYSAobWluLXdpZHRoOiA2MDBweCkge1xcbiAgICAuaW1hZ2Uge1xcbiAgICAgIHdpZHRoOiA5NnB4O1xcbiAgICAgIGhlaWdodDogNTRweDsgfSB9XFxuICBAbWVkaWEgKG1pbi13aWR0aDogNzUwcHgpIHtcXG4gICAgLmltYWdlIHtcXG4gICAgICB3aWR0aDogMTEycHg7XFxuICAgICAgaGVpZ2h0OiA2M3B4OyB9IH1cXG4gIEBtZWRpYSAobWluLXdpZHRoOiAxMDAwcHgpIHtcXG4gICAgLmltYWdlIHtcXG4gICAgICB3aWR0aDogMTI4cHg7XFxuICAgICAgaGVpZ2h0OiA3MnB4OyB9IH1cXG4gIEBtZWRpYSAobWluLXdpZHRoOiAxMzAwcHgpIHtcXG4gICAgLmltYWdlIHtcXG4gICAgICB3aWR0aDogMTYwcHg7XFxuICAgICAgaGVpZ2h0OiA5MHB4OyB9IH1cXG5cXG4ud2FybmluZ19hbmltYXRpb24ge1xcbiAgYW5pbWF0aW9uOiBXQVJOSU5HX0JPWF9TSEFET1dfQU5JTUFUSU9OIDNzO1xcbiAgYW5pbWF0aW9uLWl0ZXJhdGlvbi1jb3VudDogaW5maW5pdGU7XFxuICBib3JkZXI6IDVweCBzb2xpZCByZWQ7XFxuICB0cmFuc2l0aW9uOiBib3JkZXIgMC41cyBlYXNlLWluLW91dDsgfVxcblxcbkBrZXlmcmFtZXMgV0FSTklOR19CT1hfU0hBRE9XX0FOSU1BVElPTiB7XFxuICAwJSB7XFxuICAgIGJveC1zaGFkb3c6IDBweCAwcHggNTBweCAjNjQxRTE2OyB9XFxuICAyNSUge1xcbiAgICBib3gtc2hhZG93OiAwcHggMHB4IDUwcHggI0YxOTQ4QTsgfVxcbiAgNTAlIHtcXG4gICAgYm94LXNoYWRvdzogMHB4IDBweCA1MHB4ICM2NDFFMTY7IH1cXG4gIDc1JSB7XFxuICAgIGJveC1zaGFkb3c6IDBweCAwcHggNTBweCAjRjE5NDhBOyB9XFxuICAxMDAlIHtcXG4gICAgYm94LXNoYWRvdzogMHB4IDBweCA1MHB4ICM2NDFFMTY7IH0gfVxcblxcbi5pbnN0cnVjdGlvbl9wYW5lbCB7XFxuICBib3JkZXI6IDNweCByaWRnZSBnb2xkO1xcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1cHg7XFxuICAtbW96LWJvcmRlci1yYWRpdXM6IDVweDtcXG4gIC1tcy1ib3JkZXItcmFkaXVzOiA1cHg7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICBjb2xvcjogYmxhY2s7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIHBhZGRpbmc6IDAgMjBweCAyMHB4IDIwcHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBib3gtc2hhZG93OiAwcHggMHB4IDUwcHggZ29sZDtcXG4gIG1hcmdpbjogYXV0bztcXG4gIGZvbnQtc2l6ZTogMS4xZW07IH1cXG4gIEBtZWRpYSAobWluLXdpZHRoOiA3MjBweCkge1xcbiAgICAuaW5zdHJ1Y3Rpb25fcGFuZWwge1xcbiAgICAgIHBhZGRpbmc6IDAgMTAwcHggMjBweCAxMDBweDsgfSB9XFxuXFxuLnNsaWRlcl9wYW5lbCB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcblxcbi5wb2ludHMge1xcbiAgZm9udC1zaXplOiAzZW07XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7IH1cXG5cXG4uYWRkX3BvaW50cyB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiA1OCU7XFxuICBib3R0b206IDMwJTsgfVxcblxcbi5zdWJtaXRfcGFuZWwge1xcbiAgbWFyZ2luLXRvcDogM2VtOyB9XFxuXFxuLmFkZF9wb2ludHNfYW5pbWF0aW9uIHtcXG4gIGFuaW1hdGlvbjogQUREX1BPSU5UU19BTklNQVRJT04gMXM7XFxuICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkczsgfVxcblxcbkBrZXlmcmFtZXMgQUREX1BPSU5UU19BTklNQVRJT04ge1xcbiAgMCUge1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICA1MCUge1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMDtcXG4gICAgYm90dG9tOiA3MCU7IH0gfVxcblxcbi5zdWJtaXRfcGFuZWwge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgcGFkZGluZzogMCAxZW0gMCAxZW07IH1cXG4gIC5zdWJtaXRfcGFuZWwgYnV0dG9uIHtcXG4gICAgd2lkdGg6IDkwJTtcXG4gICAgbWFyZ2luOiAyZW0gNSUgMCA1JTsgfVxcbiAgQG1lZGlhIChtaW4td2lkdGg6IDYzMHB4KSB7XFxuICAgIC5zdWJtaXRfcGFuZWwge1xcbiAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICAgICAgd2lkdGg6IGluaXRpYWw7IH1cXG4gICAgICAuc3VibWl0X3BhbmVsIGJ1dHRvbiB7XFxuICAgICAgICBtYXJnaW46IDAgMCAwIDJlbTsgfSB9XFxuXFxuI3N1Ym1pdF90ZXh0ZmllbGQge1xcbiAgYm9yZGVyOiA0cHggc29saWQgIzNGMzgzNTtcXG4gIC13ZWJraXQtYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgLW1vei1ib3JkZXItcmFkaXVzOiA1cHg7XFxuICAtbXMtYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcXG4gIC1tb3otdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1pbi1vdXQ7XFxuICAtbXMtdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1pbi1vdXQ7XFxuICAtby10cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcXG4gIGZvbnQtc2l6ZTogMjAwJTtcXG4gIG1hcmdpbjogMCA1JSAwIDUlO1xcbiAgb3V0bGluZTogMDtcXG4gIHBhZGRpbmctbGVmdDogMjBweDsgfVxcbiAgI3N1Ym1pdF90ZXh0ZmllbGQ6Zm9jdXMge1xcbiAgICBib3JkZXI6IDRweCBzb2xpZCBibGFjaztcXG4gICAgYm94LXNoYWRvdzogaW5zZXQgMHB4IDBweCAyMHB4IGJsYWNrOyB9XFxuXFxuLnNoYWtlX3RleHRmaWVsZF9hbmltYXRpb24ge1xcbiAgYm9yZGVyOiA0cHggc29saWQgcmVkICFpbXBvcnRhbnQ7XFxuICBhbmltYXRpb246IFNIQUtFX1RFWFRGSUVMRF9BTklNQVRJT04gMC41czsgfVxcblxcbkBrZXlmcmFtZXMgU0hBS0VfVEVYVEZJRUxEX0FOSU1BVElPTiB7XFxuICAxMCUsIDkwJSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoLTFweCwgMCwgMCk7IH1cXG4gIDIwJSwgODAlIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgycHgsIDAsIDApOyB9XFxuICAzMCUsIDUwJSwgNzAlIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgtNHB4LCAwLCAwKTsgfVxcbiAgNDAlLCA2MCUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDRweCwgMCwgMCk7IH1cXG4gIDEwMCUge1xcbiAgICBkaXNwbGF5OiBub25lOyB9IH1cXG5cXG5oZWFkZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBkaXNwbGF5OiBmbGV4OyB9XFxuXFxuI2xvZ28ge1xcbiAgb3BhY2l0eTogMC42O1xcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcXG4gIC1tb3otdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1pbi1vdXQ7XFxuICAtbXMtdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1pbi1vdXQ7XFxuICAtby10cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcXG4gIG1heC13aWR0aDogMTAwJTsgfVxcbiAgI2xvZ286aG92ZXIge1xcbiAgICBvcGFjaXR5OiAxOyB9XFxuXFxuI25hdmlnYXRpb25fYmFyIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgcGFkZGluZy1yaWdodDogMjBweDsgfVxcblxcbi5uYXZpZ2F0aW9uX2xpbmsge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHBhZGRpbmc6IDEwcHggMjBweCAxMHB4IDIwcHg7XFxuICBib3JkZXI6IDJweCBzb2xpZCB3aGl0ZTtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB6LWluZGV4OiAxO1xcbiAgcmlnaHQ6IDM5cHg7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTsgfVxcbiAgLm5hdmlnYXRpb25fbGluayBhIHtcXG4gICAgY29sb3I6IGJsYWNrO1xcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcXG4gICAgLW1vei10cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcXG4gICAgLW1zLXRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UtaW4tb3V0O1xcbiAgICAtby10cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcXG4gICAgcGFkZGluZzogMCAyMHB4IDAgMjBweDsgfVxcbiAgICAubmF2aWdhdGlvbl9saW5rIGE6aG92ZXIge1xcbiAgICAgIHRleHQtc2hhZG93OiA0cHggNHB4IGdyYXk7IH1cXG4gICAgLm5hdmlnYXRpb25fbGluayBhOmZpcnN0LWNoaWxkIHtcXG4gICAgICBib3JkZXI6IDA7IH1cXG4gIEBtZWRpYSAobWluLXdpZHRoOiA0NzBweCkge1xcbiAgICAubmF2aWdhdGlvbl9saW5rIHtcXG4gICAgICBkaXNwbGF5OiBmbGV4ICFpbXBvcnRhbnQ7XFxuICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgICBwYWRkaW5nOiAwICFpbXBvcnRhbnQ7XFxuICAgICAgYm9yZGVyOiAwICFpbXBvcnRhbnQ7XFxuICAgICAgYmFja2dyb3VuZDogbm9uZTsgfVxcbiAgICAgIC5uYXZpZ2F0aW9uX2xpbmsgYSB7XFxuICAgICAgICBjb2xvcjogZ3JheTtcXG4gICAgICAgIGJvcmRlci1sZWZ0OiAzcHggc29saWQgd2hpdGU7XFxuICAgICAgICBwYWRkaW5nOiAyMHB4OyB9XFxuICAgICAgICAubmF2aWdhdGlvbl9saW5rIGE6aG92ZXIge1xcbiAgICAgICAgICBjb2xvcjogd2hpdGU7IH0gfVxcblxcbiNuYXZpZ2F0aW9uX2ljb24ge1xcbiAgZGlzcGxheTogbm9uZTsgfVxcbiAgI25hdmlnYXRpb25faWNvbjpub3QoOmNoZWNrZWQpIH4gLm5hdmlnYXRpb25fbGluayB7XFxuICAgIGRpc3BsYXk6IG5vbmU7IH1cXG4gICNuYXZpZ2F0aW9uX2ljb246Y2hlY2tlZCB+IC5uYXZpZ2F0aW9uX2xpbmsge1xcbiAgICBkaXNwbGF5OiBmbGV4OyB9XFxuXFxuI25hdmlnYXRpb25faWNvbl9sYWJlbCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgb3JkZXI6IDE7XFxuICBjdXJzb3I6IHBvaW50ZXI7IH1cXG4gIEBtZWRpYSAobWluLXdpZHRoOiA0NzBweCkge1xcbiAgICAjbmF2aWdhdGlvbl9pY29uX2xhYmVsIHtcXG4gICAgICBkaXNwbGF5OiBub25lOyB9IH1cXG5cXG5mb290ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7IH1cXG5cXG4uaGVyb19saXN0X3BhbmVsIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB3aWR0aDogMTAwJTtcXG4gIGZvbnQtc2l6ZTogM2VtO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7IH1cXG5cXG4uY29udGFjdF9wYW5lbCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcXG4gIGNvbG9yOiBibGFjaztcXG4gIHBhZGRpbmc6IDNlbSA0ZW0gM2VtIDRlbTtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgbWFyZ2luOiAwIGF1dG87XFxuICBvdmVyZmxvdy15OiBhdXRvOyB9XFxuICBAbWVkaWEgKG1pbi13aWR0aDogOTAwcHgpIHtcXG4gICAgLmNvbnRhY3RfcGFuZWwge1xcbiAgICAgIHdpZHRoOiA4MCU7IH0gfVxcblxcbi5jb250YWN0X3BpY3R1cmVzX3BhbmVsIHtcXG4gIHBhZGRpbmc6IDFlbSAwIDFlbSAwO1xcbiAgZmxleC1mbG93OiByb3cgd3JhcDtcXG4gIGRpc3BsYXk6IGZsZXg7IH1cXG4gIC5jb250YWN0X3BpY3R1cmVzX3BhbmVsIGltZyB7XFxuICAgIGZsZXg6IGF1dG87XFxuICAgIG1hcmdpbjogMWVtIDAgMWVtIDA7XFxuICAgIG1heC13aWR0aDogMjUwcHg7XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7IH1cXG4gICAgQG1lZGlhIChtaW4td2lkdGg6IDQyMHB4KSB7XFxuICAgICAgLmNvbnRhY3RfcGljdHVyZXNfcGFuZWwgaW1nIHtcXG4gICAgICAgIG1hcmdpbjogMWVtOyB9IH1cXG5cXG4ud3JhcHBlciwgYm9keSwgaHRtbCB7XFxuICBoZWlnaHQ6IDEwMHZoO1xcbiAgbWFyZ2luOiAwO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBmb250LWZhbWlseTogXFxcIlNlZ29lIFVJXFxcIiwgc2Fucy1zZXJpZjtcXG4gIGNvbG9yOiB3aGl0ZTsgfVxcblxcbnEge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICBtYXJnaW46IDFlbSAwIDFlbSAwOyB9XFxuXFxuLndyYXBwZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoXCIgKyByZXF1aXJlKFwiLi4vaW1nL2JhY2tncm91bmRfaW1hZ2UuanBnXCIpICsgXCIpO1xcbiAgYmFja2dyb3VuZC1zaXplOiBjb3ZlcjsgfVxcblxcbi5tYWluX3BhbmVsIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4OiAxO1xcbiAgb3ZlcmZsb3cteTogYXV0bzsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Nzcy1sb2FkZXIhLi9+L3Nhc3MtbG9hZGVyIS4vc3JjL2Nzcy9tYWluLnNjc3NcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG5cdHZhciBsaXN0ID0gW107XHJcblxyXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcclxuXHRsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XHJcblx0XHR2YXIgcmVzdWx0ID0gW107XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHRoaXNbaV07XHJcblx0XHRcdGlmKGl0ZW1bMl0pIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGl0ZW1bMV0gKyBcIn1cIik7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0cmVzdWx0LnB1c2goaXRlbVsxXSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHRcdHJldHVybiByZXN1bHQuam9pbihcIlwiKTtcclxuXHR9O1xyXG5cclxuXHQvLyBpbXBvcnQgYSBsaXN0IG9mIG1vZHVsZXMgaW50byB0aGUgbGlzdFxyXG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcclxuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxyXG5cdFx0XHRtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCBcIlwiXV07XHJcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGlkID0gdGhpc1tpXVswXTtcclxuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxyXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xyXG5cdFx0XHQvLyBza2lwIGFscmVhZHkgaW1wb3J0ZWQgbW9kdWxlXHJcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXHJcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXHJcblx0XHRcdC8vICBJIGhvcGUgdGhpcyB3aWxsIG5ldmVyIG9jY3VyIChIZXkgdGhpcyB3YXkgd2UgaGF2ZSBzbWFsbGVyIGJ1bmRsZXMpXHJcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XHJcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IG1lZGlhUXVlcnk7XHJcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcclxuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxuXHRyZXR1cm4gbGlzdDtcclxufTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyArIFwiMzE2OGMyMTc1NmQ2NDUzZjFmNmIyY2IwYjYzYzNiODkuanBnXCI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9pbWcvYmFja2dyb3VuZF9pbWFnZS5qcGdcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLypcclxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxyXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcclxuKi9cclxudmFyIHN0eWxlc0luRG9tID0ge30sXHJcblx0bWVtb2l6ZSA9IGZ1bmN0aW9uKGZuKSB7XHJcblx0XHR2YXIgbWVtbztcclxuXHRcdHJldHVybiBmdW5jdGlvbiAoKSB7XHJcblx0XHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcblx0XHRcdHJldHVybiBtZW1vO1xyXG5cdFx0fTtcclxuXHR9LFxyXG5cdGlzT2xkSUUgPSBtZW1vaXplKGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIC9tc2llIFs2LTldXFxiLy50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkpO1xyXG5cdH0pLFxyXG5cdGdldEhlYWRFbGVtZW50ID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XHJcblx0XHRyZXR1cm4gZG9jdW1lbnQuaGVhZCB8fCBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImhlYWRcIilbMF07XHJcblx0fSksXHJcblx0c2luZ2xldG9uRWxlbWVudCA9IG51bGwsXHJcblx0c2luZ2xldG9uQ291bnRlciA9IDAsXHJcblx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AgPSBbXTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xyXG5cdGlmKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xyXG5cdFx0aWYodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XHJcblx0fVxyXG5cclxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcclxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cclxuXHQvLyB0YWdzIGl0IHdpbGwgYWxsb3cgb24gYSBwYWdlXHJcblx0aWYgKHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiA9PT0gXCJ1bmRlZmluZWRcIikgb3B0aW9ucy5zaW5nbGV0b24gPSBpc09sZElFKCk7XHJcblxyXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIGJvdHRvbSBvZiA8aGVhZD4uXHJcblx0aWYgKHR5cGVvZiBvcHRpb25zLmluc2VydEF0ID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcclxuXHJcblx0dmFyIHN0eWxlcyA9IGxpc3RUb1N0eWxlcyhsaXN0KTtcclxuXHRhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcclxuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XHJcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcclxuXHRcdH1cclxuXHRcdGlmKG5ld0xpc3QpIHtcclxuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0KTtcclxuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcclxuXHRcdH1cclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xyXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XHJcblx0XHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKVxyXG5cdFx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oKTtcclxuXHRcdFx0XHRkZWxldGUgc3R5bGVzSW5Eb21bZG9tU3R5bGUuaWRdO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKSB7XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XHJcblx0XHR2YXIgZG9tU3R5bGUgPSBzdHlsZXNJbkRvbVtpdGVtLmlkXTtcclxuXHRcdGlmKGRvbVN0eWxlKSB7XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XHJcblx0XHRcdH1cclxuXHRcdFx0Zm9yKDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dmFyIHBhcnRzID0gW107XHJcblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XHJcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XHJcblx0XHRcdH1cclxuXHRcdFx0c3R5bGVzSW5Eb21baXRlbS5pZF0gPSB7aWQ6IGl0ZW0uaWQsIHJlZnM6IDEsIHBhcnRzOiBwYXJ0c307XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMobGlzdCkge1xyXG5cdHZhciBzdHlsZXMgPSBbXTtcclxuXHR2YXIgbmV3U3R5bGVzID0ge307XHJcblx0Zm9yKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcclxuXHRcdHZhciBpZCA9IGl0ZW1bMF07XHJcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcclxuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XHJcblx0XHR2YXIgc291cmNlTWFwID0gaXRlbVszXTtcclxuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcclxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKVxyXG5cdFx0XHRzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xyXG5cdFx0ZWxzZVxyXG5cdFx0XHRuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XHJcblx0fVxyXG5cdHJldHVybiBzdHlsZXM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZUVsZW1lbnQpIHtcclxuXHR2YXIgaGVhZCA9IGdldEhlYWRFbGVtZW50KCk7XHJcblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Bbc3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3AubGVuZ3RoIC0gMV07XHJcblx0aWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidG9wXCIpIHtcclxuXHRcdGlmKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xyXG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGhlYWQuZmlyc3RDaGlsZCk7XHJcblx0XHR9IGVsc2UgaWYobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcclxuXHRcdFx0aGVhZC5pbnNlcnRCZWZvcmUoc3R5bGVFbGVtZW50LCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlRWxlbWVudCk7XHJcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XHJcblx0XHRoZWFkLmFwcGVuZENoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnLiBNdXN0IGJlICd0b3AnIG9yICdib3R0b20nLlwiKTtcclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcclxuXHRzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xyXG5cdHZhciBpZHggPSBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5pbmRleE9mKHN0eWxlRWxlbWVudCk7XHJcblx0aWYoaWR4ID49IDApIHtcclxuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnNwbGljZShpZHgsIDEpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xyXG5cdHN0eWxlRWxlbWVudC50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xyXG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZUVsZW1lbnQpO1xyXG5cdHJldHVybiBzdHlsZUVsZW1lbnQ7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpIHtcclxuXHR2YXIgbGlua0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcclxuXHRsaW5rRWxlbWVudC5yZWwgPSBcInN0eWxlc2hlZXRcIjtcclxuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGlua0VsZW1lbnQpO1xyXG5cdHJldHVybiBsaW5rRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gYWRkU3R5bGUob2JqLCBvcHRpb25zKSB7XHJcblx0dmFyIHN0eWxlRWxlbWVudCwgdXBkYXRlLCByZW1vdmU7XHJcblxyXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xyXG5cdFx0dmFyIHN0eWxlSW5kZXggPSBzaW5nbGV0b25Db3VudGVyKys7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBzaW5nbGV0b25FbGVtZW50IHx8IChzaW5nbGV0b25FbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpKTtcclxuXHRcdHVwZGF0ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIGZhbHNlKTtcclxuXHRcdHJlbW92ZSA9IGFwcGx5VG9TaW5nbGV0b25UYWcuYmluZChudWxsLCBzdHlsZUVsZW1lbnQsIHN0eWxlSW5kZXgsIHRydWUpO1xyXG5cdH0gZWxzZSBpZihvYmouc291cmNlTWFwICYmXHJcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBVUkwucmV2b2tlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcclxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcclxuXHRcdHN0eWxlRWxlbWVudCA9IGNyZWF0ZUxpbmtFbGVtZW50KG9wdGlvbnMpO1xyXG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XHJcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XHJcblx0XHRcdGlmKHN0eWxlRWxlbWVudC5ocmVmKVxyXG5cdFx0XHRcdFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGVFbGVtZW50LmhyZWYpO1xyXG5cdFx0fTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlU3R5bGVFbGVtZW50KG9wdGlvbnMpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCk7XHJcblx0XHRyZW1vdmUgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0cmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0dXBkYXRlKG9iaik7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZShuZXdPYmopIHtcclxuXHRcdGlmKG5ld09iaikge1xyXG5cdFx0XHRpZihuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXApXHJcblx0XHRcdFx0cmV0dXJuO1xyXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdHJlbW92ZSgpO1xyXG5cdFx0fVxyXG5cdH07XHJcbn1cclxuXHJcbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XHJcblx0dmFyIHRleHRTdG9yZSA9IFtdO1xyXG5cclxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xyXG5cdFx0dGV4dFN0b3JlW2luZGV4XSA9IHJlcGxhY2VtZW50O1xyXG5cdFx0cmV0dXJuIHRleHRTdG9yZS5maWx0ZXIoQm9vbGVhbikuam9pbignXFxuJyk7XHJcblx0fTtcclxufSkoKTtcclxuXHJcbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcoc3R5bGVFbGVtZW50LCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcclxuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XHJcblxyXG5cdGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IHJlcGxhY2VUZXh0KGluZGV4LCBjc3MpO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XHJcblx0XHR2YXIgY2hpbGROb2RlcyA9IHN0eWxlRWxlbWVudC5jaGlsZE5vZGVzO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGNzc05vZGUpO1xyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1RhZyhzdHlsZUVsZW1lbnQsIG9iaikge1xyXG5cdHZhciBjc3MgPSBvYmouY3NzO1xyXG5cdHZhciBtZWRpYSA9IG9iai5tZWRpYTtcclxuXHJcblx0aWYobWVkaWEpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcclxuXHR9XHJcblxyXG5cdGlmKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xyXG5cdH0gZWxzZSB7XHJcblx0XHR3aGlsZShzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xyXG5cdFx0fVxyXG5cdFx0c3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gdXBkYXRlTGluayhsaW5rRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XHJcblxyXG5cdGlmKHNvdXJjZU1hcCkge1xyXG5cdFx0Ly8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjY2MDM4NzVcclxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcclxuXHR9XHJcblxyXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xyXG5cclxuXHR2YXIgb2xkU3JjID0gbGlua0VsZW1lbnQuaHJlZjtcclxuXHJcblx0bGlua0VsZW1lbnQuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XHJcblxyXG5cdGlmKG9sZFNyYylcclxuXHRcdFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcclxufVxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=