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
	var elements = _config.Config.elements;
	for (var element in elements) {
		if (elements[element] instanceof HTMLCollection) {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;
	
			try {
				for (var _iterator = elements[element][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var htmlCollectionElement = _step.value;
	
					Object.assign(htmlCollectionElement, _helper.Helper);
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
		} else {
			Object.assign(elements[element], _helper.Helper);
		}
	}

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
		for (var i = 0; i < image.length; i++) {
			image[i].style.display = 'block';
		}
		image_iteration = 0;
		for (var _i = 0; _i < high_score.length; _i++) {
			high_score[_i].innerHTML = 0;
		}
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
	
				for (var i = 0; i < heroes.length; i++) {
					var image = document.createElement('img');
					image.className = 'image';
					image.src = 'http://cdn.dota2.com/apps/dota2/images/heroes/' + heroes[i].name.replace('npc_dota_hero_', '') + '_lg.png';
					//It should be Tuskar, not Tusk!
					if (heroes[i].localized_name === 'Tusk') {
						heroes[i].localized_name = 'Tuskar';
					}
					image.name = heroes[i].localized_name;
					Object.assign(image, _helper.Helper);
					fragment.appendChild(image);
				}
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMjU5OTgxZDE4NWI5MDk0ZGRhOGMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2luaXQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2NvbXBvbmVudHMvYnV0dG9uLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL2NvdW50ZG93bl9wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29uZmlnLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL3NsaWRlci5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvaGVscGVyLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9jb21wb25lbnRzL3RleHRmaWVsZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tcG9uZW50cy9pbWFnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Nzcy9tYWluLnNjc3M/NTY4NyIsIndlYnBhY2s6Ly8vLi9zcmMvY3NzL21haW4uc2NzcyIsIndlYnBhY2s6Ly8vLi9+L2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzIiwid2VicGFjazovLy8uL3NyYy9pbWcvYmFja2dyb3VuZF9pbWFnZS5qcGciLCJ3ZWJwYWNrOi8vLy4vfi9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzIl0sIm5hbWVzIjpbInJlcXVpcmUiLCJsb2FkX2ltYWdlcyIsInN0YXJ0X2J1dHRvbiIsImNyZWF0ZV9idXR0b24iLCJjbGljayIsImZhaWxfYnV0dG9uIiwic3VibWl0X2J1dHRvbiIsInN1Ym1pdF90ZXh0ZmllbGQiLCJjcmVhdGVfdGV4dGZpZWxkIiwic3VibWl0IiwiZWxlbWVudHMiLCJlbGVtZW50IiwiSFRNTENvbGxlY3Rpb24iLCJodG1sQ29sbGVjdGlvbkVsZW1lbnQiLCJPYmplY3QiLCJhc3NpZ24iLCJ3cmFwcGVyIiwiaW5zdHJ1Y3Rpb25fcGFuZWwiLCJmYWlsX2JhY2tncm91bmQiLCJzbGlkZXJfcGFuZWwiLCJpbWFnZSIsImFkZF9wb2ludHMiLCJoaWdoX3Njb3JlIiwicmVzdWx0X3RleHQiLCJpbWFnZXMiLCJQT0lOVFNfQURERUQiLCJjb25zdGFudHMiLCJ0ZXh0Iiwic3VjY2Vzc19tZXNzYWdlIiwiZmFpbF9tZXNzYWdlIiwidHJhbnNpdGlvbl9lbmQiLCJpbWFnZV9pdGVyYXRpb24iLCJCdXR0b24iLCJ0eXBlIiwiY3JlYXRlIiwiYnV0dG9uIiwiY2FsbGJhY2siLCJhZGRFdmVudExpc3RlbmVyIiwic3RhcnRfZ2FtZSIsInRvZ2dsZV9jbGFzc19mb3JfYW5pbWF0aW9uIiwiaGlkZSIsIlN0YXJ0X3NsaWRlcl9jb3VudGRvd24iLCJ0aGVuIiwicmVzcG9uc2UiLCJTdGFydF9zbGlkZXIiLCJEaXNwbGF5X2ZhaWxfcGFuZWwiLCJyZXN0YXJ0X2dhbWUiLCJzaG93IiwiUmVzZXRfaW1hZ2VzIiwiVmFsaWRhdGVfaWZfaW5wdXRfaXNfaGVyb19uYW1lIiwiaW5uZXJIVE1MIiwic2NvcmUiLCJwYXJzZUludCIsInJlbW92ZV9jbGFzcyIsInZhbHVlIiwiY291bnRkb3duX3BhbmVsIiwiY3JlYXRlX2NvdW50ZG93bl9wYW5lbCIsInN0YXJ0X2NvdW50ZG93bl90aW1lciIsInNsaWRlciIsImNyZWF0ZV9zbGlkZXIiLCJzdGFydF9zbGlkZXIiLCJzdHlsZSIsIm1hcmdpbkxlZnQiLCJ0cmFuc2l0aW9uIiwiaSIsImxlbmd0aCIsImRpc3BsYXkiLCJvcGFjaXR5IiwiaGVyb19pbWFnZSIsInRleHRmaWVsZCIsIm5hbWUiLCJ0b0xvd2VyQ2FzZUFuZFJlbW92ZUlsbGVnYWxDaGFyYWN0ZXJzIiwiQ09VTlRET1dOX0RVUkFUSU9OIiwiQ291bnRkb3duX3BhbmVsIiwiY291bnRkb3duX2R1cmF0aW9uIiwiY291bnRkb3duX3Byb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsImNvdW50ZG93bl90aW1lciIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsIkNvbmZpZyIsImRvY3VtZW50IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImltYWdlc19wYW5lbCIsImdldEVsZW1lbnRCeUlkIiwiU0xJREVfRFVSQVRJT04iLCJXQVJOSU5HX1RIUkVTSE9MRCIsImltYWdlc19qc29uX3VybCIsImltYWdlX3VybCIsImltYWdlX3NpemUiLCJTbGlkZXIiLCJzbGlkZSIsInNjcmVlbl93aWR0aCIsIndpbmRvdyIsImlubmVyV2lkdGgiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRXaWR0aCIsImJvZHkiLCJpbWFnZXNfcGFuZWxfd2lkdGgiLCJvZmZzZXRXaWR0aCIsIndhcm5pbmdfd2lkdGhfdGhyZXNob2xkIiwidGltZXIiLCJnZXRfcG9zaXRpb24iLCJ4IiwiYWRkX2NsYXNzIiwic2xpZGVyX3Byb21pc2UiLCJjYXRjaCIsImUiLCJjb25zb2xlIiwibG9nIiwiSUxMRUdBTF9DSEFSQUNURVJTIiwiUmVnRXhwIiwiU3RyaW5nIiwicHJvdG90eXBlIiwibG93ZXJDYXNlVmFsdWUiLCJ0b0xvd2VyQ2FzZSIsInJlcGxhY2UiLCJ3aGljaF90cmFuc2l0aW9uX2V2ZW50IiwidCIsImVsIiwiY3JlYXRlRWxlbWVudCIsInRyYW5zaXRpb25zIiwidW5kZWZpbmVkIiwiSGVscGVyIiwidHJhbnNpdGlvbl9ldmVudCIsInhQb3MiLCJ5UG9zIiwidGFnTmFtZSIsInhTY3JvbGwiLCJzY3JvbGxMZWZ0IiwieVNjcm9sbCIsInNjcm9sbFRvcCIsIm9mZnNldExlZnQiLCJjbGllbnRMZWZ0Iiwib2Zmc2V0VG9wIiwiY2xpZW50VG9wIiwib2Zmc2V0UGFyZW50IiwieSIsImNsYXNzTmFtZSIsImNsYXNzTGlzdCIsImNvbnRhaW5zIiwiYWRkIiwicmVtb3ZlIiwidG9nZ2xlX2NsYXNzIiwiY2FsbCIsIlRleHRmaWVsZCIsImV2ZW50Iiwia2V5Q29kZSIsIkltYWdlcyIsImdldF9zdGF0dXMiLCJzdGF0dXMiLCJFcnJvciIsInN0YXR1c1RleHQiLCJnZXRfanNvbiIsImpzb24iLCJmZXRjaCIsImhlcm9lcyIsInJlc3VsdCIsImZyYWdtZW50IiwiY3JlYXRlRG9jdW1lbnRGcmFnbWVudCIsInNyYyIsImxvY2FsaXplZF9uYW1lIiwiYXBwZW5kQ2hpbGQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7QUNuQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBUEEsb0JBQUFBLENBQVEsQ0FBUjtBQUNBLG9CQUFBQSxDQUFRLEVBQVI7O0FBUUEsZ0JBQU9DLFdBQVA7O0FBRUEsS0FBTUMsZUFBZSxlQUFPQyxhQUFQLENBQXFCLGNBQXJCLEVBQXFDQyxLQUFyQyxDQUEyQyxZQUEzQyxDQUFyQjs7QUFFQSxLQUFNQyxjQUFjLGVBQU9GLGFBQVAsQ0FBcUIsYUFBckIsRUFBb0NDLEtBQXBDLENBQTBDLGNBQTFDLENBQXBCOztBQUVBLEtBQU1FLGdCQUFnQixlQUFPSCxhQUFQLENBQXFCLGVBQXJCLEVBQXNDQyxLQUF0QyxDQUE0QyxRQUE1QyxDQUF0Qjs7QUFFQSxLQUFNRyxtQkFBbUIscUJBQVVDLGdCQUFWLENBQTJCLGtCQUEzQixFQUErQ0MsTUFBL0MsRUFBekI7O0FBRUE7QUFDQSxLQUFNQyxXQUFXLGVBQU9BLFFBQXhCO0FBQ0EsTUFBSyxJQUFJQyxPQUFULElBQW9CRCxRQUFwQixFQUE4QjtBQUM3QixNQUFJQSxTQUFTQyxPQUFULGFBQTZCQyxjQUFqQyxFQUFpRDtBQUFBO0FBQUE7QUFBQTs7QUFBQTtBQUNoRCx5QkFBa0NGLFNBQVNDLE9BQVQsQ0FBbEMsOEhBQXFEO0FBQUEsU0FBNUNFLHFCQUE0Qzs7QUFDcERDLFlBQU9DLE1BQVAsQ0FBY0YscUJBQWQ7QUFDQTtBQUgrQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFB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Q0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0RBQXVEO0FBQ3ZEOztBQUVBLDhCQUE2QixtQkFBbUI7O0FBRWhEOztBQUVBOztBQUVBO0FBQ0E7QUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIuL2Jpbi9cIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDI1OTk4MWQxODViOTA5NGRkYThjXG4gKiovIiwicmVxdWlyZSgnLi4vY3NzL21haW4uc2NzcycpO1xyXG5yZXF1aXJlKCcuLi9pbWcvYmFja2dyb3VuZF9pbWFnZS5qcGcnKTtcclxuXHJcbmltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4vY29tcG9uZW50cy9idXR0b24nO1xyXG5pbXBvcnQgeyBUZXh0ZmllbGQgfSBmcm9tICcuL2NvbXBvbmVudHMvdGV4dGZpZWxkJztcclxuaW1wb3J0IHsgSW1hZ2VzIH0gZnJvbSAnLi9jb21wb25lbnRzL2ltYWdlcyc7XHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJy4vY29uZmlnJztcclxuaW1wb3J0IHsgSGVscGVyIH0gZnJvbSAnLi9oZWxwZXInO1xyXG5cclxuSW1hZ2VzLmxvYWRfaW1hZ2VzKCk7XHJcblxyXG5jb25zdCBzdGFydF9idXR0b24gPSBCdXR0b24uY3JlYXRlX2J1dHRvbignc3RhcnRfYnV0dG9uJykuY2xpY2soJ3N0YXJ0X2dhbWUnKTtcclxuXHJcbmNvbnN0IGZhaWxfYnV0dG9uID0gQnV0dG9uLmNyZWF0ZV9idXR0b24oJ2ZhaWxfYnV0dG9uJykuY2xpY2soJ3Jlc3RhcnRfZ2FtZScpO1xyXG5cclxuY29uc3Qgc3VibWl0X2J1dHRvbiA9IEJ1dHRvbi5jcmVhdGVfYnV0dG9uKCdzdWJtaXRfYnV0dG9uJykuY2xpY2soJ3N1Ym1pdCcpO1xyXG5cclxuY29uc3Qgc3VibWl0X3RleHRmaWVsZCA9IFRleHRmaWVsZC5jcmVhdGVfdGV4dGZpZWxkKCdzdWJtaXRfdGV4dGZpZWxkJykuc3VibWl0KCk7XHJcblxyXG4vLyBBZGQgaGVscGVyIGZ1bmN0aW9ucyB0byBlYWNoIGVsZW1lbnRzIChlLmcuIHNvIGVhY2ggZWxlbWVudCBoYXZlIG1ldGhvZHMgbGlrZSBzaG93KCksIGhpZGUoKSBldGMpXHJcbmNvbnN0IGVsZW1lbnRzID0gQ29uZmlnLmVsZW1lbnRzO1xyXG5mb3IgKGxldCBlbGVtZW50IGluIGVsZW1lbnRzKSB7XHJcblx0aWYgKGVsZW1lbnRzW2VsZW1lbnRdIGluc3RhbmNlb2YgSFRNTENvbGxlY3Rpb24pIHtcclxuXHRcdGZvciAobGV0IGh0bWxDb2xsZWN0aW9uRWxlbWVudCBvZiBlbGVtZW50c1tlbGVtZW50XSkge1xyXG5cdFx0XHRPYmplY3QuYXNzaWduKGh0bWxDb2xsZWN0aW9uRWxlbWVudCwgSGVscGVyKTtcclxuXHRcdH1cclxuXHR9IGVsc2Uge1xyXG5cdFx0T2JqZWN0LmFzc2lnbihlbGVtZW50c1tlbGVtZW50XSwgSGVscGVyKTtcdFxyXG5cdH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2luaXQuanNcbiAqKi8iLCIvKipcclxuICogVGhpcyBpcyBhIGdlbmVyaWMgYnV0dG9uLCB3aGljaCBoYXMgYSBtdWx0aXR1ZGUgb2YgZ2VuZXJpYyB0byBzcGVjaWZpYyBmdW5jdGlvbnMgZm9yIGFsbCBwb3NzaWJsZSBzY2VuYXJpb3MuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBCdXR0b25cclxuICovXHJcbmltcG9ydCB7IENvdW50ZG93bl9wYW5lbCB9IGZyb20gJy4vY291bnRkb3duX3BhbmVsJztcclxuaW1wb3J0IHsgU2xpZGVyIH0gZnJvbSAnLi9zbGlkZXInO1xyXG5pbXBvcnQgeyBIZWxwZXIgfSBmcm9tICcuLi9oZWxwZXInO1xyXG5pbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi9jb25maWcnO1xyXG5cclxuY29uc3QgeyBzdGFydF9idXR0b24sIHdyYXBwZXIsIGluc3RydWN0aW9uX3BhbmVsLCBmYWlsX2J1dHRvbiwgZmFpbF9iYWNrZ3JvdW5kLCBzbGlkZXJfcGFuZWwsIHN1Ym1pdF9idXR0b24sIGltYWdlLCBzdWJtaXRfdGV4dGZpZWxkLFxyXG5cdFx0YWRkX3BvaW50cywgaGlnaF9zY29yZSwgcmVzdWx0X3RleHQsIGltYWdlcyB9ID0gQ29uZmlnLmVsZW1lbnRzO1xyXG5jb25zdCB7IFBPSU5UU19BRERFRCB9ID0gQ29uZmlnLmNvbnN0YW50cztcclxuY29uc3QgeyBzdWNjZXNzX21lc3NhZ2UsIGZhaWxfbWVzc2FnZSB9ID0gQ29uZmlnLnRleHQ7XHJcbmNvbnN0IHsgdHJhbnNpdGlvbl9lbmQgfSA9IEhlbHBlcjtcclxuXHJcbmxldCBpbWFnZV9pdGVyYXRpb24gPSAwO1xyXG5cclxuZXhwb3J0IGNvbnN0IEJ1dHRvbiA9IHtcclxuXHRjcmVhdGVfYnV0dG9uKHR5cGUpIHtcclxuXHRcdHJldHVybiBPYmplY3QuY3JlYXRlKHRoaXMuYnV0dG9uW3R5cGVdKTtcclxuXHR9LFxyXG5cclxuXHRidXR0b246IHtcclxuXHRcdHN0YXJ0X2J1dHRvbjoge1x0XHJcblx0XHRcdGNsaWNrKGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0c3RhcnRfYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpc1tjYWxsYmFja10oKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSxcclxuXHRcdFx0c3RhcnRfZ2FtZSgpIHtcclxuXHRcdFx0XHR3cmFwcGVyLnRvZ2dsZV9jbGFzc19mb3JfYW5pbWF0aW9uKCdncmF5c2NhbGVfYmFja2dyb3VuZF9hbmltYXRpb24nKTtcclxuXHRcdFx0XHRpbnN0cnVjdGlvbl9wYW5lbC5oaWRlKCk7XHJcblx0XHRcdFx0U3RhcnRfc2xpZGVyX2NvdW50ZG93bigpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcblx0XHRcdFx0XHRTdGFydF9zbGlkZXIoKS50aGVuKChyZXNwb25zZSkgPT4ge1xyXG5cdFx0XHRcdFx0XHREaXNwbGF5X2ZhaWxfcGFuZWwocmVzcG9uc2UpO1xyXG5cdFx0XHRcdFx0fSlcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdGZhaWxfYnV0dG9uOiB7XHJcblx0XHRcdGNsaWNrKGNhbGxiYWNrKSB7XHJcblx0XHRcdFx0ZmFpbF9idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcblx0XHRcdFx0XHR0aGlzW2NhbGxiYWNrXSgpO1xyXG5cdFx0XHRcdH0pO1xyXG5cdFx0XHR9LFxyXG5cdFx0XHRyZXN0YXJ0X2dhbWUoKSB7XHJcblx0XHRcdFx0ZmFpbF9iYWNrZ3JvdW5kLmhpZGUoKTtcclxuXHRcdFx0XHRzbGlkZXJfcGFuZWwuaGlkZSgpO1xyXG5cdFx0XHRcdGluc3RydWN0aW9uX3BhbmVsLnNob3coKTtcclxuXHRcdFx0XHRSZXNldF9pbWFnZXMoKTtcclxuXHRcdFx0fVxyXG5cdFx0fSxcclxuXHRcdHN1Ym1pdF9idXR0b246IHtcclxuXHRcdFx0Y2xpY2soY2FsbGJhY2spIHtcclxuXHRcdFx0XHRzdWJtaXRfYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG5cdFx0XHRcdFx0dGhpc1tjYWxsYmFja10oKTtcclxuXHRcdFx0XHR9KTtcclxuXHRcdFx0fSxcclxuXHRcdFx0c3VibWl0KCkge1xyXG5cdFx0XHRcdGlmIChWYWxpZGF0ZV9pZl9pbnB1dF9pc19oZXJvX25hbWUoaW1hZ2VbaW1hZ2VfaXRlcmF0aW9uXSwgc3VibWl0X3RleHRmaWVsZCkpIHtcclxuXHRcdFx0XHRcdGltYWdlW2ltYWdlX2l0ZXJhdGlvbl0uaGlkZSgpO1xyXG5cdFx0XHRcdFx0aW1hZ2VfaXRlcmF0aW9uKys7XHJcblx0XHRcdFx0XHRhZGRfcG9pbnRzLmlubmVySFRNTCA9ICcrJyArIFBPSU5UU19BRERFRDtcclxuXHRcdFx0XHRcdGZvciAobGV0IHNjb3JlIG9mIGhpZ2hfc2NvcmUpIHtcclxuXHRcdFx0XHRcdFx0c2NvcmUuaW5uZXJIVE1MID0gcGFyc2VJbnQoc2NvcmUuaW5uZXJIVE1MKSArIHBhcnNlSW50KFBPSU5UU19BRERFRCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRhZGRfcG9pbnRzLnRvZ2dsZV9jbGFzc19mb3JfYW5pbWF0aW9uKCdhZGRfcG9pbnRzX2FuaW1hdGlvbicpO1xyXG5cdFx0XHRcdFx0c3VibWl0X3RleHRmaWVsZC5yZW1vdmVfY2xhc3MoJ3NoYWtlX3RleHRmaWVsZF9hbmltYXRpb24nKTtcclxuXHRcdFx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0XHRcdHN1Ym1pdF90ZXh0ZmllbGQudG9nZ2xlX2NsYXNzX2Zvcl9hbmltYXRpb24oJ3NoYWtlX3RleHRmaWVsZF9hbmltYXRpb24nKTtcclxuXHRcdFx0XHRcdH1cclxuXHRcdFx0XHRcdHN1Ym1pdF90ZXh0ZmllbGQudmFsdWUgPSAnJztcclxuXHRcdFx0XHRcdGlmICh0eXBlb2YgaW1hZ2VbaW1hZ2VfaXRlcmF0aW9uXSA9PSAndW5kZWZpbmVkJykge1xyXG5cdFx0XHRcdFx0XHRyZXN1bHRfdGV4dC5pbm5lckhUTUwgPSBzdWNjZXNzX21lc3NhZ2U7XHJcblx0XHRcdFx0XHRcdGZhaWxfYmFja2dyb3VuZC5zaG93KCk7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBTdGFydF9zbGlkZXJfY291bnRkb3duKCkge1xyXG5cdGNvbnN0IGNvdW50ZG93bl9wYW5lbCA9IENvdW50ZG93bl9wYW5lbC5jcmVhdGVfY291bnRkb3duX3BhbmVsKCk7XHJcblx0cmV0dXJuIGNvdW50ZG93bl9wYW5lbC5zdGFydF9jb3VudGRvd25fdGltZXIoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gU3RhcnRfc2xpZGVyKCkge1xyXG5cdGNvbnN0IHNsaWRlciA9IFNsaWRlci5jcmVhdGVfc2xpZGVyKCk7XHJcblx0cmV0dXJuIHNsaWRlci5zdGFydF9zbGlkZXIoKTtcclxufVxyXG5cclxuZnVuY3Rpb24gRGlzcGxheV9mYWlsX3BhbmVsKCkge1xyXG5cdGltYWdlcy50cmFuc2l0aW9uX2VuZCgoKSA9PiB7XHJcblx0XHRyZXN1bHRfdGV4dC5pbm5lckhUTUwgPSBmYWlsX21lc3NhZ2U7XHJcblx0XHRmYWlsX2JhY2tncm91bmQuc2hvdygpO1xyXG5cdH0pO1x0XHRcdFx0XHRcclxufVxyXG5cclxuZnVuY3Rpb24gUmVzZXRfaW1hZ2VzKCkge1xyXG5cdGltYWdlcy5zdHlsZS5tYXJnaW5MZWZ0ID0gJzEwMCUnO1xyXG5cdGltYWdlcy5zdHlsZS50cmFuc2l0aW9uID0gJzBzJztcclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRpbWFnZVtpXS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuXHR9XHJcblx0aW1hZ2VfaXRlcmF0aW9uID0gMDtcclxuXHRmb3IgKGxldCBpID0gMDsgaSA8IGhpZ2hfc2NvcmUubGVuZ3RoOyBpKyspIHtcclxuXHRcdGhpZ2hfc2NvcmVbaV0uaW5uZXJIVE1MID0gMDtcclxuXHR9XHJcblx0c3VibWl0X3RleHRmaWVsZC52YWx1ZSA9ICcnO1xyXG5cdHN1Ym1pdF90ZXh0ZmllbGQucmVtb3ZlX2NsYXNzKCdzaGFrZV90ZXh0ZmllbGRfYW5pbWF0aW9uJyk7XHJcblx0YWRkX3BvaW50cy5yZW1vdmVfY2xhc3MoJ2FkZF9wb2ludHNfYW5pbWF0aW9uJyk7XHJcblx0YWRkX3BvaW50cy5zdHlsZS5vcGFjaXR5ID0gMDtcclxufVxyXG5cclxuLyoqXHJcbiAqIFZhbGlkYXRlIGlmIHVzZXIgaW5wdXQgaXMgYSBzdHJpbmcuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBpbWFnZSAtIFRoZSBpbWFnZSB0aGF0IGlzIGJlaW5nIHZhbGlkYXRlZC5cclxuICogQHBhcmFtICB7T2JqZWN0fSB0ZXh0ZmllbGQgLSBUaGUgdGV4dGZpZWxkIHRoYXQgaGFzIHRoZSB1c2VyIGlucHV0LlxyXG4gKi9cclxuZnVuY3Rpb24gVmFsaWRhdGVfaWZfaW5wdXRfaXNfaGVyb19uYW1lKGhlcm9faW1hZ2UsIHRleHRmaWVsZCkge1xyXG5cdGlmIChoZXJvX2ltYWdlLm5hbWUudG9Mb3dlckNhc2VBbmRSZW1vdmVJbGxlZ2FsQ2hhcmFjdGVycygpID09PSB0ZXh0ZmllbGQudmFsdWUudG9Mb3dlckNhc2VBbmRSZW1vdmVJbGxlZ2FsQ2hhcmFjdGVycygpKSB7XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblx0cmV0dXJuIGZhbHNlO1xyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29tcG9uZW50cy9idXR0b24uanNcbiAqKi8iLCIvKipcclxuICogVGhpcyBpcyB0aGUgY291bnRkb3duIHBhbmVsOyBpdCB3aWxsIGNvdW50ZG93biB1bnRpbCBpdCByZWFjaGVzIDAgYmVmb3JlIGl0IGRpc3BsYXlzIHRoZSBzbGlkZXIgcGFuZWwuXHJcbiAqL1xyXG5cclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnJztcclxuXHJcbmNvbnN0IHsgY291bnRkb3duX3BhbmVsIH0gPSBDb25maWcuZWxlbWVudHM7XHJcbmNvbnN0IHsgQ09VTlRET1dOX0RVUkFUSU9OIH0gPSBDb25maWcuY29uc3RhbnRzO1xyXG5cclxuZXhwb3J0IGNvbnN0IENvdW50ZG93bl9wYW5lbCA9IHtcclxuXHRjcmVhdGVfY291bnRkb3duX3BhbmVsKCkge1xyXG5cdFx0cmV0dXJuIE9iamVjdC5jcmVhdGUodGhpcy5jb3VudGRvd25fcGFuZWwpO1xyXG5cdH0sXHJcblx0Y291bnRkb3duX3BhbmVsOiB7XHJcblx0XHRzdGFydF9jb3VudGRvd25fdGltZXIoKSB7XHJcblx0XHRcdGxldCBjb3VudGRvd25fZHVyYXRpb24gPSBDT1VOVERPV05fRFVSQVRJT047XHJcblx0XHRcdGNvbnN0IGNvdW50ZG93bl9wcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRcdGNvdW50ZG93bl9wYW5lbC5zaG93KCk7XHJcblx0XHRcdFx0Y291bnRkb3duX3BhbmVsLmlubmVySFRNTCA9IFwiXCI7XHJcblx0XHRcdFx0Y29uc3QgY291bnRkb3duX3RpbWVyID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG5cdFx0XHRcdFx0aWYgKGNvdW50ZG93bl9kdXJhdGlvbiA9PT0gMCkge1xyXG5cdFx0XHRcdFx0XHRjbGVhckludGVydmFsKGNvdW50ZG93bl90aW1lcik7XHJcblx0XHRcdFx0XHRcdGNvdW50ZG93bl9wYW5lbC5oaWRlKCk7XHJcblx0XHRcdFx0XHRcdHJlc29sdmUoKTsgXHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRjb3VudGRvd25fcGFuZWwuaW5uZXJIVE1MID0gY291bnRkb3duX2R1cmF0aW9uLS07XHJcblx0XHRcdFx0fSwgMTAwMCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRyZXR1cm4gY291bnRkb3duX3Byb21pc2U7XHJcblx0XHR9XHJcblx0fVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29tcG9uZW50cy9jb3VudGRvd25fcGFuZWwuanNcbiAqKi8iLCJleHBvcnQgY29uc3QgQ29uZmlnID0ge1xyXG5cdC8vIEhNTU1NIFNIT1VMRCBBTEwgVEhFIFZBUklBQkxFUyBIRVJFIEhBVkUgVVBQRVIgQ0FTRSBDSEFSQUNURVJTP1xyXG5cdGVsZW1lbnRzOiB7XHJcblx0XHQvLyBpbWFnZXNcclxuXHRcdGltYWdlczogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VzJylbMF0sXHJcblx0XHRpbWFnZXNfcGFuZWw6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlc19wYW5lbCcpWzBdLFxyXG5cdFx0aW1hZ2U6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlJyksXHJcblx0XHQvL2ZhaWxcclxuXHRcdGZhaWxfYmFja2dyb3VuZDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZmFpbF9iYWNrZ3JvdW5kJylbMF0sXHJcblx0XHRmYWlsX2J1dHRvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZhaWxfYnV0dG9uJyksXHJcblx0XHQvL3N1Ym1pdFxyXG5cdFx0c3VibWl0X3RleHRmaWVsZDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdF90ZXh0ZmllbGQnKSxcclxuXHRcdHN1Ym1pdF9idXR0b246IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXRfYnV0dG9uJyksXHJcblx0XHQvL2luc3RydWN0aW9uXHJcblx0XHRpbnN0cnVjdGlvbl9wYW5lbDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW5zdHJ1Y3Rpb25fcGFuZWwnKVswXSxcclxuXHRcdHN0YXJ0X2J1dHRvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0X2J1dHRvbicpLFxyXG5cdFx0Ly9jb3VudGRvd25cclxuXHRcdGNvdW50ZG93bl9wYW5lbDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvdW50ZG93bl9wYW5lbCcpLFxyXG5cdFx0Ly9zbGlkZXJcclxuXHRcdGFkZF9wb2ludHM6IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2FkZF9wb2ludHMnKVswXSxcclxuXHRcdHNsaWRlcl9wYW5lbDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGVyX3BhbmVsJylbMF0sXHJcblx0XHRoaWdoX3Njb3JlOiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdoaWdoX3Njb3JlJyksXHJcblx0XHRyZXN1bHRfdGV4dDogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncmVzdWx0X3RleHQnKVswXSxcclxuXHRcdC8vYm9keVxyXG5cdFx0d3JhcHBlcjogZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnd3JhcHBlcicpWzBdXHJcblx0fSxcclxuXHJcblx0Y29uc3RhbnRzOiB7XHJcblx0XHRDT1VOVERPV05fRFVSQVRJT046IDMsXHJcblx0XHRTTElERV9EVVJBVElPTjogMTAsXHJcblx0XHRXQVJOSU5HX1RIUkVTSE9MRDogMzAsXHJcblx0XHRQT0lOVFNfQURERUQ6IDEwMFxyXG5cdH0sXHJcblxyXG5cdHRleHQ6IHtcclxuXHRcdC8vZmFpbFxyXG5cdFx0ZmFpbF9tZXNzYWdlOiAnWW91IGxvc2UuLi4nLFxyXG5cclxuXHRcdC8vd2luXHJcblx0XHRzdWNjZXNzX21lc3NhZ2U6ICdFeiBXaW4hJyxcclxuXHJcblx0XHRpbWFnZXNfanNvbl91cmw6ICdodHRwczovL2xpbG1vcnRhbC10ZXN0LmFwaWdlZS5uZXQvZ2V0ZG90YWhlcm9lcz9rZXk9NkMxQ0Y3NkM5MDc2ODM4ODYxOEYzNDhCQjczRUUwMTUmbGFuZ3VhZ2U9ZW5fdXMmZm9ybWF0PUpTT04nLFxyXG5cdFx0aW1hZ2VfdXJsOiAnaHR0cDovL2Nkbi5kb3RhMi5jb20vYXBwcy9kb3RhMi9pbWFnZXMvaGVyb2VzLycsXHJcblx0XHRpbWFnZV9zaXplOiAnX2xnLnBuZydcclxuXHR9XHJcbn1cclxuXHJcblxyXG5cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29uZmlnLmpzXG4gKiovIiwiLyoqXHJcbiAqIFRoaXMgaXMgdGhlIHNsaWRlciB0aGF0IHdpbGwgYmUgZGlzcGxheWVkIGFmdGVyIHRoZSBjb3VudGRvd24uIEl0IHdpbGwgZGlzcGxheSBhbiBlbmRsZXNzIHN0cmVhbSBvZiBkb3RhIGltYWdlcyB0aGF0IGFyZSByZXRyaWV2ZWQgdmlhIERvdGEgQVBJLlxyXG4gKiBJdCB3aWxsIGNvbnN0YW50bHkgdHJhbnNpdGlvbiB0byB0aGUgbGVmdCB1bnRpbCBpdCByZWFjaGVzIHRvIHRoZSBzdGFydGluZyBwb3NpdGlvbiBvZiB0aGUgcGFuZWwgdGhhdCBob2xkcyB0aGUgaW1hZ2VzLCB3aGljaCBpbiB0aGF0IGNhc2UgdGhlIGdhbWVcclxuICogbG9zZS4gXHJcbiAqL1xyXG5pbXBvcnQgeyBIZWxwZXIgfSBmcm9tJy4uL2hlbHBlcic7XHJcbmltcG9ydCB7IENvbmZpZyB9IGZyb20nLi4vY29uZmlnJztcclxuXHJcbmNvbnN0IHsgaW1hZ2VzLCBpbWFnZXNfcGFuZWwsIHNsaWRlcl9wYW5lbCB9ID0gQ29uZmlnLmVsZW1lbnRzO1xyXG5jb25zdCB7IFdBUk5JTkdfVEhSRVNIT0xELCBTTElERV9EVVJBVElPTiB9ID0gQ29uZmlnLmNvbnN0YW50cztcclxuXHJcbmV4cG9ydCBjb25zdCBTbGlkZXIgPSB7XHRcclxuXHRjcmVhdGVfc2xpZGVyKCkge1xyXG5cdFx0cmV0dXJuIE9iamVjdC5jcmVhdGUodGhpcy5zbGlkZXJfcGFuZWwpO1xyXG5cdH0sXHJcblxyXG5cdHNsaWRlcl9wYW5lbDoge1xyXG5cdFx0Ly8gVVNFIFJFUVVFU1RBTklNQVRJT05GUkFNRSwgTkVFRCBUTyBGSU5EIE9VVCBIT1cgVE8gQ0hFQ0sgV0hFTiBBTklNQVRJT04gRlJBTUUgRU5EU1xyXG5cdFx0c2xpZGUoKSB7XHJcblx0XHRcdGNvbnN0IHNjcmVlbl93aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xyXG5cdFx0XHRjb25zdCBpbWFnZXNfcGFuZWxfd2lkdGggPSAoc2NyZWVuX3dpZHRoIC0gaW1hZ2VzX3BhbmVsLm9mZnNldFdpZHRoIC8gMikgKyBpbWFnZXNfcGFuZWwub2Zmc2V0V2lkdGg7XHJcblx0XHRcdGNvbnN0IHdhcm5pbmdfd2lkdGhfdGhyZXNob2xkID0gaW1hZ2VzX3BhbmVsX3dpZHRoICogV0FSTklOR19USFJFU0hPTEQgLyAxMDA7XHJcblx0XHRcdGxldCB0aW1lcjtcclxuXHRcdFx0aW1hZ2VzLnN0eWxlLm1hcmdpbkxlZnQgPSAnMCc7XHJcblx0XHRcdGltYWdlcy5zdHlsZS50cmFuc2l0aW9uID0gU0xJREVfRFVSQVRJT04gKyAncyBsaW5lYXInO1xyXG5cdFx0XHRpbWFnZXNfcGFuZWwucmVtb3ZlX2NsYXNzKCd3YXJuaW5nX2FuaW1hdGlvbicpO1xyXG5cclxuXHRcdFx0dGltZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcblx0XHRcdFx0aWYgKGltYWdlcy5nZXRfcG9zaXRpb24oKS54IDw9IHdhcm5pbmdfd2lkdGhfdGhyZXNob2xkKSB7XHJcblx0XHRcdFx0XHRpbWFnZXNfcGFuZWwuYWRkX2NsYXNzKCd3YXJuaW5nX2FuaW1hdGlvbicpO1xyXG5cdFx0XHRcdFx0Y2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LCAxMDAwKTtcclxuXHRcdH0sXHJcblx0XHRzdGFydF9zbGlkZXIoKSB7XHJcblx0XHRcdGNvbnN0IHNsaWRlcl9wcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cdFx0XHRcdHNsaWRlcl9wYW5lbC5zaG93KCk7XHJcblx0XHRcdFx0dGhpcy5zbGlkZSgpO1xyXG5cdFx0XHRcdHJlc29sdmUoKTtcclxuXHRcdFx0fSlcclxuXHRcdFx0LmNhdGNoKChlKSA9PiB7XHJcblx0XHRcdFx0Y29uc29sZS5sb2coZSk7XHJcblx0XHRcdH0pO1xyXG5cdFx0XHRyZXR1cm4gc2xpZGVyX3Byb21pc2U7XHJcblx0XHR9XHJcblx0fVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29tcG9uZW50cy9zbGlkZXIuanNcbiAqKi8iLCIvLyBPS0FZIFRISVMgSEVMUEVSIFRISU5HIFNVQ0tTISBGSU5EIEFMVEVSTkFUSVZFIChBTkQgVVBQRVIgQ0FTRSBBTEwgVEhJUyBGVU5DVElPTlMpXHJcbmNvbnN0IElMTEVHQUxfQ0hBUkFDVEVSUyA9IG5ldyBSZWdFeHAoL1tcXC1cXHNdKy8pO1xyXG5cclxuLyoqXHJcbiogQ29udmVydCBzdHJpbmcgdG8gbG93ZXIgY2FzZSBhbmQgcmVtb3ZlIGlsbGVnYWwgY2hhcmFjdGVycy5cclxuKi9cclxuU3RyaW5nLnByb3RvdHlwZS50b0xvd2VyQ2FzZUFuZFJlbW92ZUlsbGVnYWxDaGFyYWN0ZXJzID0gZnVuY3Rpb24oKSB7XHJcblx0bGV0IGxvd2VyQ2FzZVZhbHVlID0gdGhpcy50b0xvd2VyQ2FzZSgpO1xyXG5cdHJldHVybiBsb3dlckNhc2VWYWx1ZS5yZXBsYWNlKElMTEVHQUxfQ0hBUkFDVEVSUywgJycpO1xyXG59XHJcblxyXG4vKipcclxuKiBGaW5kIHdoaWNoIENTUyB0cmFuc2l0aW9uIGV2ZW50cyBlbmQuXHJcbiogaHR0cHM6Ly9qb25zdWguY29tL2Jsb2cvZGV0ZWN0LXRoZS1lbmQtb2YtY3NzLWFuaW1hdGlvbnMtYW5kLXRyYW5zaXRpb25zLXdpdGgtamF2YXNjcmlwdC9cclxuKi9cclxuZnVuY3Rpb24gd2hpY2hfdHJhbnNpdGlvbl9ldmVudCgpe1xyXG5cdHZhciB0LFxyXG5cdGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZha2VlbGVtZW50XCIpO1xyXG5cclxuXHR2YXIgdHJhbnNpdGlvbnMgPSB7XHJcblx0XHRcInRyYW5zaXRpb25cIiAgICAgIDogXCJ0cmFuc2l0aW9uZW5kXCIsXHJcblx0XHRcIk9UcmFuc2l0aW9uXCIgICAgIDogXCJvVHJhbnNpdGlvbkVuZFwiLFxyXG5cdFx0XCJNb3pUcmFuc2l0aW9uXCIgICA6IFwidHJhbnNpdGlvbmVuZFwiLFxyXG5cdFx0XCJXZWJraXRUcmFuc2l0aW9uXCI6IFwid2Via2l0VHJhbnNpdGlvbkVuZFwiXHJcblx0fVxyXG5cclxuXHRmb3IgKHQgaW4gdHJhbnNpdGlvbnMpe1xyXG5cdFx0aWYgKGVsLnN0eWxlW3RdICE9PSB1bmRlZmluZWQpe1xyXG5cdFx0XHRyZXR1cm4gdHJhbnNpdGlvbnNbdF07XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgSGVscGVyID0ge1xyXG5cdC8qKlxyXG5cdCAqIEJpbmQgdGhlIGZvY3VzZWQgZWxlbWVudDsgaXQgd2lsbCBjYWxsIHRoZSBjYWxsYmFjayB3aGVuIHRyYW5zaXRpb24gZW5kcy5cclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gY2FsbGJhY2sgLSB0aGUgY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGNhbGxlZCB3aGVuIHRyYW5zaXRpb24gZW5kLlxyXG5cdCAqL1xyXG5cdHRyYW5zaXRpb25fZW5kKGNhbGxiYWNrKSB7XHJcblx0XHRjb25zdCB0cmFuc2l0aW9uX2V2ZW50ID0gd2hpY2hfdHJhbnNpdGlvbl9ldmVudCgpO1xyXG5cdFx0dGhpcy5hZGRFdmVudExpc3RlbmVyKHRyYW5zaXRpb25fZXZlbnQsIGNhbGxiYWNrKTtcclxuXHR9LFxyXG5cclxuXHQvKipcclxuXHQgKiBAcGFyYW0ge09iamVjdH0gZWwgLSBUaGUgZWxlbWVudCB0aGF0IHdlIHdhbnQgdG8gZmluZCB0aGUgY3VycmVudCBwb3NpdGlvbiBpcyByZWxhdGl2ZSB0byB0aGUgd2luZG93LlxyXG5cdCAqIGh0dHBzOi8vd3d3LmtpcnVwYS5jb20vaHRtbDUvZ2V0X2VsZW1lbnRfcG9zaXRpb25fdXNpbmdfamF2YXNjcmlwdC5odG1cclxuXHQgKi9cclxuXHRnZXRfcG9zaXRpb24oKSB7XHJcblx0XHRsZXQgeFBvcyA9IDA7XHJcblx0XHRsZXQgeVBvcyA9IDA7XHJcblxyXG5cdFx0bGV0IGVsZW1lbnQgPSB0aGlzO1xyXG5cdFx0d2hpbGUgKGVsZW1lbnQpIHtcclxuXHRcdFx0aWYgKGVsZW1lbnQudGFnTmFtZSA9PSBcIkJPRFlcIikge1xyXG5cdFx0XHRcdC8vIGRlYWwgd2l0aCBicm93c2VyIHF1aXJrcyB3aXRoIGJvZHkvd2luZG93L2RvY3VtZW50IGFuZCBwYWdlIHNjcm9sbFxyXG5cdFx0XHRcdHZhciB4U2Nyb2xsID0gZWxlbWVudC5zY3JvbGxMZWZ0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0O1xyXG5cdFx0XHRcdHZhciB5U2Nyb2xsID0gZWxlbWVudC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuXHJcblx0XHRcdFx0eFBvcyArPSAoZWxlbWVudC5vZmZzZXRMZWZ0IC0geFNjcm9sbCArIGVsZW1lbnQuY2xpZW50TGVmdCk7XHJcblx0XHRcdFx0eVBvcyArPSAoZWxlbWVudC5vZmZzZXRUb3AgLSB5U2Nyb2xsICsgZWxlbWVudC5jbGllbnRUb3ApO1xyXG5cdFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdC8vIGZvciBhbGwgb3RoZXIgbm9uLUJPRFkgZWxlbWVudHNcclxuXHRcdFx0XHR4UG9zICs9IChlbGVtZW50Lm9mZnNldExlZnQgLSBlbGVtZW50LnNjcm9sbExlZnQgKyBlbGVtZW50LmNsaWVudExlZnQpO1xyXG5cdFx0XHRcdHlQb3MgKz0gKGVsZW1lbnQub2Zmc2V0VG9wIC0gZWxlbWVudC5zY3JvbGxUb3AgKyBlbGVtZW50LmNsaWVudFRvcCk7XHJcblx0XHRcdH1cclxuXHRcdFx0ZWxlbWVudCA9IGVsZW1lbnQub2Zmc2V0UGFyZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHg6IHhQb3MsXHJcblx0XHRcdHk6IHlQb3NcclxuXHRcdH07XHJcblx0fSxcclxuXHQvKipcclxuXHQgKiBEaXNwbGF5IHRoZSBlbGVtZW50LlxyXG5cdCAqIEBwYXJhbSAge1N0cmluZ30gZGlzcGxheSAtIFRoZSBkaXNwbGF5IHR5cGUuXHJcblx0ICovXHJcblx0c2hvdyhkaXNwbGF5KSB7XHJcblx0XHRpZiAodHlwZW9mIGRpc3BsYXkgIT09ICd1bmRlZmluZWQnICYmIGRpc3BsYXkgIT09ICcnKSB7XHJcblx0XHRcdHRoaXMuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR0aGlzLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcblx0XHR9XHJcblx0fSxcclxuXHJcblx0LyoqXHJcblx0ICogSGlkZSB0aGUgZWxlbWVudC5cclxuXHQgKi9cclxuXHRoaWRlKCkge1xyXG5cdFx0dGhpcy5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdH0sXHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCBhIENTUyBjbGFzcyB0byBhbiBlbGVtZW50LlxyXG5cdCAqIEBwYXJhbSAge1N0cmluZ30gY2xhc3NOYW1lIC0gVGhlIENTUyBjbGFzcyBuYW1lLlxyXG5cdCAqL1xyXG5cdGFkZF9jbGFzcyhjbGFzc05hbWUpIHtcclxuXHRcdGlmICghdGhpcy5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xyXG5cdFx0XHR0aGlzLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmUgYSBDU1MgY2xhc3MgZnJvbSBhbiBlbGVtZW50LlxyXG5cdCAqIEBwYXJhbSAge1N0cmluZ30gY2xhc3NOYW1lIC0gVGhlIENTUyBjbGFzcyBuYW1lLlxyXG5cdCAqL1xyXG5cdHJlbW92ZV9jbGFzcyhjbGFzc05hbWUpIHtcclxuXHRcdGlmICh0aGlzLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XHJcblx0XHRcdHRoaXMuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xyXG5cdFx0fVxyXG5cdFx0Ly8gd2VpcmQgaGFjayBydWxlIC0gaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9yZXN0YXJ0LWNzcy1hbmltYXRpb24vXHJcblx0XHR2b2lkIHRoaXMub2Zmc2V0V2lkdGg7XHRcdFxyXG5cdH0sXHJcblxyXG5cdC8qKlxyXG5cdCAqIFRvZ2dsZSB3aGV0aGVyIHRvIGFkZCBvciByZW1vdmUgQ1NTIGNsYXNzLlxyXG5cdCAqIEBwYXJhbSAge1N0cmluZ30gY2xhc3NOYW1lIC0gVGhlIENTUyBjbGFzcyBuYW1lLlxyXG5cdCAqL1xyXG5cdHRvZ2dsZV9jbGFzcyhjbGFzc05hbWUpIHtcclxuXHRcdGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XHJcblx0XHRcdC8vIGZpbmQgYWx0ZXJuYXRpdmUgdG8gcmVtb3ZlIHRoaXMgSGVscGVyXHJcblx0XHRcdEhlbHBlci5yZW1vdmVfY2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdEhlbHBlci5hZGRfY2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKTtcdFxyXG5cdFx0fVxyXG5cdH0sXHJcblxyXG5cdC8vSU0gVElSRUQsIFdIQVRTIEEgR09PRCBOQU1FIEZPUiBUSElTXHJcblx0LyoqXHJcblx0ICogVG9nZ2xlIHdoZXRoZXIgdG8gYWRkIG9yIHJlbW92ZSBDU1MgY2xhc3MuXHJcblx0ICogQHBhcmFtICB7U3RyaW5nfSBjbGFzc05hbWUgLSBUaGUgQ1NTIGNsYXNzIG5hbWUuXHJcblx0ICovXHJcblx0dG9nZ2xlX2NsYXNzX2Zvcl9hbmltYXRpb24oY2xhc3NOYW1lKSB7XHJcblx0XHRpZiAodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xyXG5cdFx0XHRIZWxwZXIucmVtb3ZlX2NsYXNzLmNhbGwodGhpcywgY2xhc3NOYW1lKTtcclxuXHRcdH1cclxuXHRcdEhlbHBlci5hZGRfY2xhc3MuY2FsbCh0aGlzLCBjbGFzc05hbWUpO1xyXG5cdH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2pzL2hlbHBlci5qc1xuICoqLyIsImltcG9ydCB7IEJ1dHRvbiB9IGZyb20gJy4vYnV0dG9uJztcclxuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnLi4vY29uZmlnJztcclxuXHJcbmNvbnN0IHsgc3VibWl0X3RleHRmaWVsZCB9ID0gQ29uZmlnLmVsZW1lbnRzO1xyXG5cclxuZXhwb3J0IGNvbnN0IFRleHRmaWVsZCA9IHtcclxuXHRjcmVhdGVfdGV4dGZpZWxkKGNhbGxiYWNrKSB7XHJcblx0XHRyZXR1cm4gT2JqZWN0LmNyZWF0ZSh0aGlzLnRleHRmaWVsZFtjYWxsYmFja10pO1xyXG5cdH0sXHJcblxyXG5cdHRleHRmaWVsZDoge1xyXG5cdFx0c3VibWl0X3RleHRmaWVsZDoge1xyXG5cdFx0XHRzdWJtaXQoKSB7XHJcblx0XHRcdFx0Y29uc3Qgc3VibWl0X2J1dHRvbiA9IEJ1dHRvbi5jcmVhdGVfYnV0dG9uKCdzdWJtaXRfYnV0dG9uJyk7XHJcblxyXG5cdFx0XHRcdHN1Ym1pdF90ZXh0ZmllbGQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZXZlbnQpID0+IHtcclxuXHRcdFx0XHRcdGlmIChldmVudC5rZXlDb2RlID09PSAxMykge1xyXG5cdFx0XHRcdFx0XHRzdWJtaXRfYnV0dG9uLnN1Ym1pdCgpO1xyXG5cdFx0XHRcdFx0fVxyXG5cdFx0XHRcdH0pO1x0XHRcdFx0XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanMvY29tcG9uZW50cy90ZXh0ZmllbGQuanNcbiAqKi8iLCJpbXBvcnQgeyBDb25maWcgfSBmcm9tICcuLi9jb25maWcnO1xyXG5pbXBvcnQgeyBIZWxwZXIgfSBmcm9tICcuLi9oZWxwZXInO1xyXG5cclxuY29uc3QgeyBpbWFnZXMgfSA9IENvbmZpZy5lbGVtZW50cztcclxuY29uc3QgeyBpbWFnZXNfanNvbl91cmwgfSA9IENvbmZpZy50ZXh0O1xyXG5cclxuZXhwb3J0IGNvbnN0IEltYWdlcyA9IHtcclxuXHRnZXRfc3RhdHVzKHJlc3BvbnNlKSB7XHJcblx0XHRpZiAocmVzcG9uc2Uuc3RhdHVzICE9PSAyMDApIHtcclxuXHRcdFx0cmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcihyZXNwb25zZS5zdGF0dXNUZXh0KSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlc3BvbnNlKTtcclxuXHRcdH1cclxuXHR9LFxyXG5cdGdldF9qc29uKHJlc3BvbnNlKSB7XHJcblx0XHRyZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG5cdH0sXHJcblx0bG9hZF9pbWFnZXMoKSB7XHJcblx0XHRmZXRjaChpbWFnZXNfanNvbl91cmwpXHJcblx0XHQudGhlbih0aGlzLmdldF9zdGF0dXMpXHJcblx0XHQudGhlbih0aGlzLmdldF9qc29uKVxyXG5cdFx0LnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcblx0XHRcdGNvbnN0IGhlcm9lcyA9IHJlc3BvbnNlLnJlc3VsdC5oZXJvZXM7XHJcblx0XHRcdGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cclxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBoZXJvZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRjb25zdCBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG5cdFx0XHRcdGltYWdlLmNsYXNzTmFtZSA9ICdpbWFnZSc7XHJcblx0XHRcdFx0aW1hZ2Uuc3JjID0gJ2h0dHA6Ly9jZG4uZG90YTIuY29tL2FwcHMvZG90YTIvaW1hZ2VzL2hlcm9lcy8nICsgaGVyb2VzW2ldLm5hbWUucmVwbGFjZSgnbnBjX2RvdGFfaGVyb18nLCAnJykgKyAnX2xnLnBuZyc7XHJcblx0XHRcdFx0Ly9JdCBzaG91bGQgYmUgVHVza2FyLCBub3QgVHVzayFcclxuXHRcdFx0XHRpZiAoaGVyb2VzW2ldLmxvY2FsaXplZF9uYW1lID09PSAnVHVzaycpIHtcclxuXHRcdFx0XHRcdGhlcm9lc1tpXS5sb2NhbGl6ZWRfbmFtZSA9ICdUdXNrYXInO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpbWFnZS5uYW1lID0gaGVyb2VzW2ldLmxvY2FsaXplZF9uYW1lO1xyXG5cdFx0XHRcdE9iamVjdC5hc3NpZ24oaW1hZ2UsIEhlbHBlcik7XHJcblx0XHRcdFx0ZnJhZ21lbnQuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG5cdFx0XHR9XHJcblx0XHRcdGltYWdlcy5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcblx0XHR9KVxyXG5cdH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9qcy9jb21wb25lbnRzL2ltYWdlcy5qc1xuICoqLyIsIi8vIHN0eWxlLWxvYWRlcjogQWRkcyBzb21lIGNzcyB0byB0aGUgRE9NIGJ5IGFkZGluZyBhIDxzdHlsZT4gdGFnXG5cbi8vIGxvYWQgdGhlIHN0eWxlc1xudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2luZGV4LmpzIS4vbWFpbi5zY3NzXCIpO1xuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4vLyBhZGQgdGhlIHN0eWxlcyB0byB0aGUgRE9NXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIHt9KTtcbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuaWYobW9kdWxlLmhvdCkge1xuXHQvLyBXaGVuIHRoZSBzdHlsZXMgY2hhbmdlLCB1cGRhdGUgdGhlIDxzdHlsZT4gdGFnc1xuXHRpZighY29udGVudC5sb2NhbHMpIHtcblx0XHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEuL21haW4uc2Nzc1wiLCBmdW5jdGlvbigpIHtcblx0XHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuLy4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9pbmRleC5qcyEuL21haW4uc2Nzc1wiKTtcblx0XHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXHRcdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHRcdH0pO1xuXHR9XG5cdC8vIFdoZW4gdGhlIG1vZHVsZSBpcyBkaXNwb3NlZCwgcmVtb3ZlIHRoZSA8c3R5bGU+IHRhZ3Ncblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NyYy9jc3MvbWFpbi5zY3NzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKCk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKkBpbXBvcnQgJ3Jlc2V0JzsqL1xcbi5idXR0b24ge1xcbiAgYmFja2dyb3VuZDogLXdlYmtpdC1saW5lYXItZ3JhZGllbnQoIzliOWI5YiwgYmxhY2spO1xcbiAgYmFja2dyb3VuZDogLW8tbGluZWFyLWdyYWRpZW50KCM5YjliOWIsIGJsYWNrKTtcXG4gIGJhY2tncm91bmQ6IC1tb3otbGluZWFyLWdyYWRpZW50KCM5YjliOWIsIGJsYWNrKTtcXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgjOWI5YjliLCBibGFjayk7XFxuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICAtbW96LWJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICAtbXMtYm9yZGVyLXJhZGl1czogMTBweDtcXG4gIGJvcmRlci1yYWRpdXM6IDEwcHg7XFxuICBib3JkZXI6IDFweCBzb2xpZCAjMTkxOTE5O1xcbiAgb3V0bGluZTogMDtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGNvbG9yOiB3aGl0ZTtcXG4gIHBhZGRpbmc6IDIwcHg7IH1cXG4gIC5idXR0b246aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudChkaW1ncmF5LCBibGFjayk7XFxuICAgIGJhY2tncm91bmQ6IC1vLWxpbmVhci1ncmFkaWVudChkaW1ncmF5LCBibGFjayk7XFxuICAgIGJhY2tncm91bmQ6IC1tb3otbGluZWFyLWdyYWRpZW50KGRpbWdyYXksIGJsYWNrKTtcXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KGRpbWdyYXksIGJsYWNrKTsgfVxcbiAgLmJ1dHRvbjphY3RpdmUge1xcbiAgICBiYWNrZ3JvdW5kOiAtd2Via2l0LWxpbmVhci1ncmFkaWVudCgjNTU1NTU1LCBibGFjayk7XFxuICAgIGJhY2tncm91bmQ6IC1vLWxpbmVhci1ncmFkaWVudCgjNTU1NTU1LCBibGFjayk7XFxuICAgIGJhY2tncm91bmQ6IC1tb3otbGluZWFyLWdyYWRpZW50KCM1NTU1NTUsIGJsYWNrKTtcXG4gICAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KCM1NTU1NTUsIGJsYWNrKTsgfVxcblxcbiNjb3VudGRvd25fcGFuZWwge1xcbiAgbWluLXdpZHRoOiAxMDAlO1xcbiAgbWluLWhlaWdodDogMTAwJTtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGRpc3BsYXk6IG5vbmU7XFxuICBmb250LXNpemU6IDEyZW07XFxuICB6LWluZGV4OiAxOyB9XFxuXFxuLmdyYXlzY2FsZV9iYWNrZ3JvdW5kX2FuaW1hdGlvbiB7XFxuICBhbmltYXRpb246IEdSQVlTQ0FMRV9CQUNLR1JPVU5EX0FOSU1BVElPTiA0czsgfVxcblxcbkBrZXlmcmFtZXMgR1JBWVNDQUxFX0JBQ0tHUk9VTkRfQU5JTUFUSU9OIHtcXG4gIDIwJSwgMTAwJSB7XFxuICAgIC13ZWJraXQtZmlsdGVyOiBncmF5c2NhbGUoMC43KSBibHVyKDNweCk7XFxuICAgIC1tb3otZmlsdGVyOiBncmF5c2NhbGUoMC43KSBibHVyKDNweCk7XFxuICAgIC1tcy1maWx0ZXI6IGdyYXlzY2FsZSgwLjcpIGJsdXIoM3B4KTtcXG4gICAgZmlsdGVyOiBncmF5c2NhbGUoMC43KSBibHVyKDNweCk7IH0gfVxcblxcbi5mYWlsX2JhY2tncm91bmQge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBtaW4td2lkdGg6IDEwMCU7XFxuICBtaW4taGVpZ2h0OiAxMDAlO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBhbmltYXRpb246IEZBSUxfQkFDS0dST1VORF9BTklNQVRJT04gMXM7XFxuICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcXG4gIHotaW5kZXg6IDI7IH1cXG5cXG4uZmFpbF9wYW5lbCB7XFxuICB3aWR0aDogMTAwJTtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI0YwRkZGRjtcXG4gIGNvbG9yOiBibGFjaztcXG4gIGFuaW1hdGlvbjogRkFJTF9QQU5FTF9BTklNQVRJT04gMXM7XFxuICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcXG4gIHBhZGRpbmc6IDIwcHggMCAyMHB4IDA7XFxuICBmb250LXNpemU6IDAuNjdlbTsgfVxcbiAgLmZhaWxfcGFuZWwgaDEsIC5mYWlsX3BhbmVsIGgzIHtcXG4gICAgYW5pbWF0aW9uOiBGQUlMX1RFWFRfQU5JTUFUSU9OIDFzO1xcbiAgICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkczsgfVxcbiAgQG1lZGlhIChtaW4td2lkdGg6IDM0MHB4KSB7XFxuICAgIC5mYWlsX3BhbmVsIHtcXG4gICAgICBmb250LXNpemU6IDFlbTsgfSB9XFxuICBAbWVkaWEgKG1pbi13aWR0aDogNTAwcHgpIHtcXG4gICAgLmZhaWxfcGFuZWwge1xcbiAgICAgIGZvbnQtc2l6ZTogMS4yZW07IH0gfVxcbiAgQG1lZGlhIChtaW4td2lkdGg6IDY1MHB4KSB7XFxuICAgIC5mYWlsX3BhbmVsIHtcXG4gICAgICBmb250LXNpemU6IDEuNWVtOyB9IH1cXG4gIEBtZWRpYSAobWluLXdpZHRoOiA4MjVweCkge1xcbiAgICAuZmFpbF9wYW5lbCB7XFxuICAgICAgZm9udC1zaXplOiAyZW07IH0gfVxcbiAgLmZhaWxfcGFuZWwgYnV0dG9uIHtcXG4gICAgYW5pbWF0aW9uOiBGQUlMX0JVVFRPTl9BTklNQVRJT04gMXM7XFxuICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzOyB9XFxuXFxuQGtleWZyYW1lcyBGQUlMX0JBQ0tHUk9VTkRfQU5JTUFUSU9OIHtcXG4gIDAlIHtcXG4gICAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7IH1cXG4gIDEwMCUge1xcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuOCk7XFxuICAgIHRyYW5zaXRpb246IGJhY2tncm91bmQgMC41cyBlYXNlLWluLW91dDsgfSB9XFxuXFxuQGtleWZyYW1lcyBGQUlMX1BBTkVMX0FOSU1BVElPTiB7XFxuICAwJSB7XFxuICAgIG1heC1oZWlnaHQ6IDA7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47IH1cXG4gIDEwMCUge1xcbiAgICBtYXgtaGVpZ2h0OiA0MDBweDtcXG4gICAgdHJhbnNpdGlvbjogMXMgZWFzZS1pbi1vdXQ7IH0gfVxcblxcbkBrZXlmcmFtZXMgRkFJTF9URVhUX0FOSU1BVElPTiB7XFxuICAwJSwgMzAlIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgMTAwJSB7XFxuICAgIG9wYWNpdHk6IDE7XFxuICAgIHRyYW5zaXRpb246IDAuNXMgZWFzZS1pbi1vdXQ7IH0gfVxcblxcbkBrZXlmcmFtZXMgRkFJTF9CVVRUT05fQU5JTUFUSU9OIHtcXG4gIDAlLCA4MCUge1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICAxMDAlIHtcXG4gICAgb3BhY2l0eTogMTtcXG4gICAgdHJhbnNpdGlvbjogMC41cyBlYXNlLWluLW91dDsgfSB9XFxuXFxuLmltYWdlc19wYW5lbCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgd2lkdGg6IDk5JTtcXG4gIGJvcmRlcjogNXB4IGRvdWJsZSBnb2xkO1xcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiAzcHg7XFxuICAtbW96LWJvcmRlci1yYWRpdXM6IDNweDtcXG4gIC1tcy1ib3JkZXItcmFkaXVzOiAzcHg7XFxuICBib3JkZXItcmFkaXVzOiAzcHg7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxuICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTsgfVxcblxcbi5pbWFnZXMge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XFxuICBtYXJnaW4tbGVmdDogMTAwJTtcXG4gIGJvcmRlcjogMDsgfVxcblxcbi5pbWFnZSB7XFxuICB3aWR0aDogNDhweDtcXG4gIGhlaWdodDogMjdweDtcXG4gIGJvcmRlci1sZWZ0OiA0cHggZ3Jvb3ZlIGdvbGQ7IH1cXG4gIEBtZWRpYSAobWluLXdpZHRoOiA0MDBweCkge1xcbiAgICAuaW1hZ2Uge1xcbiAgICAgIHdpZHRoOiA2NHB4O1xcbiAgICAgIGhlaWdodDogMzZweDsgfSB9XFxuICBAbWVkaWEgKG1pbi13aWR0aDogNTAwcHgpIHtcXG4gICAgLmltYWdlIHtcXG4gICAgICB3aWR0aDogODBweDtcXG4gICAgICBoZWlnaHQ6IDQ1cHg7IH0gfVxcbiAgQG1lZGlhIChtaW4td2lkdGg6IDYwMHB4KSB7XFxuICAgIC5pbWFnZSB7XFxuICAgICAgd2lkdGg6IDk2cHg7XFxuICAgICAgaGVpZ2h0OiA1NHB4OyB9IH1cXG4gIEBtZWRpYSAobWluLXdpZHRoOiA3NTBweCkge1xcbiAgICAuaW1hZ2Uge1xcbiAgICAgIHdpZHRoOiAxMTJweDtcXG4gICAgICBoZWlnaHQ6IDYzcHg7IH0gfVxcbiAgQG1lZGlhIChtaW4td2lkdGg6IDEwMDBweCkge1xcbiAgICAuaW1hZ2Uge1xcbiAgICAgIHdpZHRoOiAxMjhweDtcXG4gICAgICBoZWlnaHQ6IDcycHg7IH0gfVxcbiAgQG1lZGlhIChtaW4td2lkdGg6IDEzMDBweCkge1xcbiAgICAuaW1hZ2Uge1xcbiAgICAgIHdpZHRoOiAxNjBweDtcXG4gICAgICBoZWlnaHQ6IDkwcHg7IH0gfVxcblxcbi53YXJuaW5nX2FuaW1hdGlvbiB7XFxuICBhbmltYXRpb246IFdBUk5JTkdfQk9YX1NIQURPV19BTklNQVRJT04gM3M7XFxuICBhbmltYXRpb24taXRlcmF0aW9uLWNvdW50OiBpbmZpbml0ZTtcXG4gIGJvcmRlcjogNXB4IHNvbGlkIHJlZDtcXG4gIHRyYW5zaXRpb246IGJvcmRlciAwLjVzIGVhc2UtaW4tb3V0OyB9XFxuXFxuQGtleWZyYW1lcyBXQVJOSU5HX0JPWF9TSEFET1dfQU5JTUFUSU9OIHtcXG4gIDAlIHtcXG4gICAgYm94LXNoYWRvdzogMHB4IDBweCA1MHB4ICM2NDFFMTY7IH1cXG4gIDI1JSB7XFxuICAgIGJveC1zaGFkb3c6IDBweCAwcHggNTBweCAjRjE5NDhBOyB9XFxuICA1MCUge1xcbiAgICBib3gtc2hhZG93OiAwcHggMHB4IDUwcHggIzY0MUUxNjsgfVxcbiAgNzUlIHtcXG4gICAgYm94LXNoYWRvdzogMHB4IDBweCA1MHB4ICNGMTk0OEE7IH1cXG4gIDEwMCUge1xcbiAgICBib3gtc2hhZG93OiAwcHggMHB4IDUwcHggIzY0MUUxNjsgfSB9XFxuXFxuLmluc3RydWN0aW9uX3BhbmVsIHtcXG4gIGJvcmRlcjogM3B4IHJpZGdlIGdvbGQ7XFxuICAtd2Via2l0LWJvcmRlci1yYWRpdXM6IDVweDtcXG4gIC1tb3otYm9yZGVyLXJhZGl1czogNXB4O1xcbiAgLW1zLWJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGJvcmRlci1yYWRpdXM6IDVweDtcXG4gIGNvbG9yOiBibGFjaztcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgcGFkZGluZzogMCAyMHB4IDIwcHggMjBweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGJveC1zaGFkb3c6IDBweCAwcHggNTBweCBnb2xkO1xcbiAgbWFyZ2luOiBhdXRvO1xcbiAgZm9udC1zaXplOiAxLjFlbTsgfVxcbiAgQG1lZGlhIChtaW4td2lkdGg6IDcyMHB4KSB7XFxuICAgIC5pbnN0cnVjdGlvbl9wYW5lbCB7XFxuICAgICAgcGFkZGluZzogMCAxMDBweCAyMHB4IDEwMHB4OyB9IH1cXG5cXG4uc2xpZGVyX3BhbmVsIHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuXFxuLnBvaW50cyB7XFxuICBmb250LXNpemU6IDNlbTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxcblxcbi5hZGRfcG9pbnRzIHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGxlZnQ6IDU4JTtcXG4gIGJvdHRvbTogMzAlOyB9XFxuXFxuLnN1Ym1pdF9wYW5lbCB7XFxuICBtYXJnaW4tdG9wOiAzZW07IH1cXG5cXG4uYWRkX3BvaW50c19hbmltYXRpb24ge1xcbiAgYW5pbWF0aW9uOiBBRERfUE9JTlRTX0FOSU1BVElPTiAxcztcXG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzOyB9XFxuXFxuQGtleWZyYW1lcyBBRERfUE9JTlRTX0FOSU1BVElPTiB7XFxuICAwJSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIDUwJSB7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIDEwMCUge1xcbiAgICBvcGFjaXR5OiAwO1xcbiAgICBib3R0b206IDcwJTsgfSB9XFxuXFxuLnN1Ym1pdF9wYW5lbCB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBwYWRkaW5nOiAwIDFlbSAwIDFlbTsgfVxcbiAgLnN1Ym1pdF9wYW5lbCBidXR0b24ge1xcbiAgICB3aWR0aDogOTAlO1xcbiAgICBtYXJnaW46IDJlbSA1JSAwIDUlOyB9XFxuICBAbWVkaWEgKG1pbi13aWR0aDogNjMwcHgpIHtcXG4gICAgLnN1Ym1pdF9wYW5lbCB7XFxuICAgICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAgICB3aWR0aDogaW5pdGlhbDsgfVxcbiAgICAgIC5zdWJtaXRfcGFuZWwgYnV0dG9uIHtcXG4gICAgICAgIG1hcmdpbjogMCAwIDAgMmVtOyB9IH1cXG5cXG4jc3VibWl0X3RleHRmaWVsZCB7XFxuICBib3JkZXI6IDRweCBzb2xpZCAjM0YzODM1O1xcbiAgLXdlYmtpdC1ib3JkZXItcmFkaXVzOiA1cHg7XFxuICAtbW96LWJvcmRlci1yYWRpdXM6IDVweDtcXG4gIC1tcy1ib3JkZXItcmFkaXVzOiA1cHg7XFxuICBib3JkZXItcmFkaXVzOiA1cHg7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UtaW4tb3V0O1xcbiAgLW1vei10cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcXG4gIC1tcy10cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcXG4gIC1vLXRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UtaW4tb3V0O1xcbiAgZm9udC1zaXplOiAyMDAlO1xcbiAgbWFyZ2luOiAwIDUlIDAgNSU7XFxuICBvdXRsaW5lOiAwO1xcbiAgcGFkZGluZy1sZWZ0OiAyMHB4OyB9XFxuICAjc3VibWl0X3RleHRmaWVsZDpmb2N1cyB7XFxuICAgIGJvcmRlcjogNHB4IHNvbGlkIGJsYWNrO1xcbiAgICBib3gtc2hhZG93OiBpbnNldCAwcHggMHB4IDIwcHggYmxhY2s7IH1cXG5cXG4uc2hha2VfdGV4dGZpZWxkX2FuaW1hdGlvbiB7XFxuICBib3JkZXI6IDRweCBzb2xpZCByZWQgIWltcG9ydGFudDtcXG4gIGFuaW1hdGlvbjogU0hBS0VfVEVYVEZJRUxEX0FOSU1BVElPTiAwLjVzOyB9XFxuXFxuQGtleWZyYW1lcyBTSEFLRV9URVhURklFTERfQU5JTUFUSU9OIHtcXG4gIDEwJSwgOTAlIHtcXG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUzZCgtMXB4LCAwLCAwKTsgfVxcbiAgMjAlLCA4MCUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKDJweCwgMCwgMCk7IH1cXG4gIDMwJSwgNTAlLCA3MCUge1xcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZTNkKC00cHgsIDAsIDApOyB9XFxuICA0MCUsIDYwJSB7XFxuICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlM2QoNHB4LCAwLCAwKTsgfVxcbiAgMTAwJSB7XFxuICAgIGRpc3BsYXk6IG5vbmU7IH0gfVxcblxcbmhlYWRlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGRpc3BsYXk6IGZsZXg7IH1cXG5cXG4jbG9nbyB7XFxuICBvcGFjaXR5OiAwLjY7XFxuICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UtaW4tb3V0O1xcbiAgLW1vei10cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcXG4gIC1tcy10cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcXG4gIC1vLXRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UtaW4tb3V0O1xcbiAgbWF4LXdpZHRoOiAxMDAlOyB9XFxuICAjbG9nbzpob3ZlciB7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG5cXG4jbmF2aWdhdGlvbl9iYXIge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBwYWRkaW5nLXJpZ2h0OiAyMHB4OyB9XFxuXFxuLm5hdmlnYXRpb25fbGluayB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgcGFkZGluZzogMTBweCAyMHB4IDEwcHggMjBweDtcXG4gIGJvcmRlcjogMnB4IHNvbGlkIHdoaXRlO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHotaW5kZXg6IDE7XFxuICByaWdodDogMzlweDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlOyB9XFxuICAubmF2aWdhdGlvbl9saW5rIGEge1xcbiAgICBjb2xvcjogYmxhY2s7XFxuICAgIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICAtd2Via2l0LXRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UtaW4tb3V0O1xcbiAgICAtbW96LXRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UtaW4tb3V0O1xcbiAgICAtbXMtdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1pbi1vdXQ7XFxuICAgIC1vLXRyYW5zaXRpb246IGFsbCAwLjNzIGVhc2UtaW4tb3V0O1xcbiAgICBwYWRkaW5nOiAwIDIwcHggMCAyMHB4OyB9XFxuICAgIC5uYXZpZ2F0aW9uX2xpbmsgYTpob3ZlciB7XFxuICAgICAgdGV4dC1zaGFkb3c6IDRweCA0cHggZ3JheTsgfVxcbiAgICAubmF2aWdhdGlvbl9saW5rIGE6Zmlyc3QtY2hpbGQge1xcbiAgICAgIGJvcmRlcjogMDsgfVxcbiAgQG1lZGlhIChtaW4td2lkdGg6IDQ3MHB4KSB7XFxuICAgIC5uYXZpZ2F0aW9uX2xpbmsge1xcbiAgICAgIGRpc3BsYXk6IGZsZXggIWltcG9ydGFudDtcXG4gICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICAgIHBhZGRpbmc6IDAgIWltcG9ydGFudDtcXG4gICAgICBib3JkZXI6IDAgIWltcG9ydGFudDtcXG4gICAgICBiYWNrZ3JvdW5kOiBub25lOyB9XFxuICAgICAgLm5hdmlnYXRpb25fbGluayBhIHtcXG4gICAgICAgIGNvbG9yOiBncmF5O1xcbiAgICAgICAgYm9yZGVyLWxlZnQ6IDNweCBzb2xpZCB3aGl0ZTtcXG4gICAgICAgIHBhZGRpbmc6IDIwcHg7IH1cXG4gICAgICAgIC5uYXZpZ2F0aW9uX2xpbmsgYTpob3ZlciB7XFxuICAgICAgICAgIGNvbG9yOiB3aGl0ZTsgfSB9XFxuXFxuI25hdmlnYXRpb25faWNvbiB7XFxuICBkaXNwbGF5OiBub25lOyB9XFxuICAjbmF2aWdhdGlvbl9pY29uOm5vdCg6Y2hlY2tlZCkgfiAubmF2aWdhdGlvbl9saW5rIHtcXG4gICAgZGlzcGxheTogbm9uZTsgfVxcbiAgI25hdmlnYXRpb25faWNvbjpjaGVja2VkIH4gLm5hdmlnYXRpb25fbGluayB7XFxuICAgIGRpc3BsYXk6IGZsZXg7IH1cXG5cXG4jbmF2aWdhdGlvbl9pY29uX2xhYmVsIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBvcmRlcjogMTtcXG4gIGN1cnNvcjogcG9pbnRlcjsgfVxcbiAgQG1lZGlhIChtaW4td2lkdGg6IDQ3MHB4KSB7XFxuICAgICNuYXZpZ2F0aW9uX2ljb25fbGFiZWwge1xcbiAgICAgIGRpc3BsYXk6IG5vbmU7IH0gfVxcblxcbmZvb3RlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjsgfVxcblxcbi5oZXJvX2xpc3RfcGFuZWwge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgZm9udC1zaXplOiAzZW07XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjazsgfVxcblxcbi5jb250YWN0X3BhbmVsIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgY29sb3I6IGJsYWNrO1xcbiAgcGFkZGluZzogM2VtIDRlbSAzZW0gNGVtO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIG92ZXJmbG93LXk6IGF1dG87IH1cXG4gIEBtZWRpYSAobWluLXdpZHRoOiA5MDBweCkge1xcbiAgICAuY29udGFjdF9wYW5lbCB7XFxuICAgICAgd2lkdGg6IDgwJTsgfSB9XFxuXFxuLmNvbnRhY3RfcGljdHVyZXNfcGFuZWwge1xcbiAgcGFkZGluZzogMWVtIDAgMWVtIDA7XFxuICBmbGV4LWZsb3c6IHJvdyB3cmFwO1xcbiAgZGlzcGxheTogZmxleDsgfVxcbiAgLmNvbnRhY3RfcGljdHVyZXNfcGFuZWwgaW1nIHtcXG4gICAgZmxleDogYXV0bztcXG4gICAgbWFyZ2luOiAxZW0gMCAxZW0gMDtcXG4gICAgbWF4LXdpZHRoOiAyNTBweDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTsgfVxcbiAgICBAbWVkaWEgKG1pbi13aWR0aDogNDIwcHgpIHtcXG4gICAgICAuY29udGFjdF9waWN0dXJlc19wYW5lbCBpbWcge1xcbiAgICAgICAgbWFyZ2luOiAxZW07IH0gfVxcblxcbi53cmFwcGVyLCBib2R5LCBodG1sIHtcXG4gIGhlaWdodDogMTAwdmg7XFxuICBtYXJnaW46IDA7XFxuICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGZvbnQtZmFtaWx5OiBcXFwiU2Vnb2UgVUlcXFwiLCBzYW5zLXNlcmlmO1xcbiAgY29sb3I6IHdoaXRlOyB9XFxuXFxucSB7XFxuICBkaXNwbGF5OiBibG9jaztcXG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gIG1hcmdpbjogMWVtIDAgMWVtIDA7IH1cXG5cXG4ud3JhcHBlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IHVybChcIiArIHJlcXVpcmUoXCIuLi9pbWcvYmFja2dyb3VuZF9pbWFnZS5qcGdcIikgKyBcIik7XFxuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyOyB9XFxuXFxuLm1haW5fcGFuZWwge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXg6IDE7XFxuICBvdmVyZmxvdy15OiBhdXRvOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vY3NzLWxvYWRlciEuL34vc2Fzcy1sb2FkZXIhLi9zcmMvY3NzL21haW4uc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIi8qXHJcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcclxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXHJcbiovXHJcbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcblx0dmFyIGxpc3QgPSBbXTtcclxuXHJcblx0Ly8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xyXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcclxuXHRcdHZhciByZXN1bHQgPSBbXTtcclxuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdHZhciBpdGVtID0gdGhpc1tpXTtcclxuXHRcdFx0aWYoaXRlbVsyXSkge1xyXG5cdFx0XHRcdHJlc3VsdC5wdXNoKFwiQG1lZGlhIFwiICsgaXRlbVsyXSArIFwie1wiICsgaXRlbVsxXSArIFwifVwiKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRyZXN1bHQucHVzaChpdGVtWzFdKTtcclxuXHRcdFx0fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIHJlc3VsdC5qb2luKFwiXCIpO1xyXG5cdH07XHJcblxyXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XHJcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xyXG5cdFx0aWYodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpXHJcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcclxuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XHJcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xyXG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXHJcblx0XHRcdFx0YWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IG1vZHVsZXNbaV07XHJcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcclxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcclxuXHRcdFx0Ly8gIHdoZW4gYSBtb2R1bGUgaXMgaW1wb3J0ZWQgbXVsdGlwbGUgdGltZXMgd2l0aCBkaWZmZXJlbnQgbWVkaWEgcXVlcmllcy5cclxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcclxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcclxuXHRcdFx0XHRpZihtZWRpYVF1ZXJ5ICYmICFpdGVtWzJdKSB7XHJcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcclxuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xyXG5cdFx0XHRcdFx0aXRlbVsyXSA9IFwiKFwiICsgaXRlbVsyXSArIFwiKSBhbmQgKFwiICsgbWVkaWFRdWVyeSArIFwiKVwiO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG5cdHJldHVybiBsaXN0O1xyXG59O1xyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fd2VicGFja19wdWJsaWNfcGF0aF9fICsgXCIzMTY4YzIxNzU2ZDY0NTNmMWY2YjJjYjBiNjNjM2I4OS5qcGdcIjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc3JjL2ltZy9iYWNrZ3JvdW5kX2ltYWdlLmpwZ1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvKlxyXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXHJcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxyXG4qL1xyXG52YXIgc3R5bGVzSW5Eb20gPSB7fSxcclxuXHRtZW1vaXplID0gZnVuY3Rpb24oZm4pIHtcclxuXHRcdHZhciBtZW1vO1xyXG5cdFx0cmV0dXJuIGZ1bmN0aW9uICgpIHtcclxuXHRcdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuXHRcdFx0cmV0dXJuIG1lbW87XHJcblx0XHR9O1xyXG5cdH0sXHJcblx0aXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gL21zaWUgWzYtOV1cXGIvLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSk7XHJcblx0fSksXHJcblx0Z2V0SGVhZEVsZW1lbnQgPSBtZW1vaXplKGZ1bmN0aW9uICgpIHtcclxuXHRcdHJldHVybiBkb2N1bWVudC5oZWFkIHx8IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXTtcclxuXHR9KSxcclxuXHRzaW5nbGV0b25FbGVtZW50ID0gbnVsbCxcclxuXHRzaW5nbGV0b25Db3VudGVyID0gMCxcclxuXHRzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XHJcblx0aWYodHlwZW9mIERFQlVHICE9PSBcInVuZGVmaW5lZFwiICYmIERFQlVHKSB7XHJcblx0XHRpZih0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcclxuXHR9XHJcblxyXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xyXG5cdC8vIEZvcmNlIHNpbmdsZS10YWcgc29sdXRpb24gb24gSUU2LTksIHdoaWNoIGhhcyBhIGhhcmQgbGltaXQgb24gdGhlICMgb2YgPHN0eWxlPlxyXG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2VcclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuc2luZ2xldG9uID09PSBcInVuZGVmaW5lZFwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcclxuXHJcblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIDxoZWFkPi5cclxuXHRpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwidW5kZWZpbmVkXCIpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xyXG5cclxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QpO1xyXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xyXG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XHJcblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcclxuXHRcdFx0bWF5UmVtb3ZlLnB1c2goZG9tU3R5bGUpO1xyXG5cdFx0fVxyXG5cdFx0aWYobmV3TGlzdCkge1xyXG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QpO1xyXG5cdFx0XHRhZGRTdHlsZXNUb0RvbShuZXdTdHlsZXMsIG9wdGlvbnMpO1xyXG5cdFx0fVxyXG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHR2YXIgZG9tU3R5bGUgPSBtYXlSZW1vdmVbaV07XHJcblx0XHRcdGlmKGRvbVN0eWxlLnJlZnMgPT09IDApIHtcclxuXHRcdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspXHJcblx0XHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXSgpO1xyXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbShzdHlsZXMsIG9wdGlvbnMpIHtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcclxuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xyXG5cdFx0aWYoZG9tU3R5bGUpIHtcclxuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xyXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRkb21TdHlsZS5wYXJ0c1tqXShpdGVtLnBhcnRzW2pdKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xyXG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xyXG5cdFx0XHR9XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcclxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcclxuXHRcdFx0XHRwYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGxpc3RUb1N0eWxlcyhsaXN0KSB7XHJcblx0dmFyIHN0eWxlcyA9IFtdO1xyXG5cdHZhciBuZXdTdHlsZXMgPSB7fTtcclxuXHRmb3IodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xyXG5cdFx0dmFyIGlkID0gaXRlbVswXTtcclxuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xyXG5cdFx0dmFyIG1lZGlhID0gaXRlbVsyXTtcclxuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xyXG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xyXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pXHJcblx0XHRcdHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XHJcblx0XHRlbHNlXHJcblx0XHRcdG5ld1N0eWxlc1tpZF0ucGFydHMucHVzaChwYXJ0KTtcclxuXHR9XHJcblx0cmV0dXJuIHN0eWxlcztcclxufVxyXG5cclxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCkge1xyXG5cdHZhciBoZWFkID0gZ2V0SGVhZEVsZW1lbnQoKTtcclxuXHR2YXIgbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AgPSBzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcFtzdHlsZUVsZW1lbnRzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcclxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xyXG5cdFx0aWYoIWxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wKSB7XHJcblx0XHRcdGhlYWQuaW5zZXJ0QmVmb3JlKHN0eWxlRWxlbWVudCwgaGVhZC5maXJzdENoaWxkKTtcclxuXHRcdH0gZWxzZSBpZihsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZykge1xyXG5cdFx0XHRoZWFkLmluc2VydEJlZm9yZShzdHlsZUVsZW1lbnQsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH1cclxuXHRcdHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLnB1c2goc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2UgaWYgKG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwiYm90dG9tXCIpIHtcclxuXHRcdGhlYWQuYXBwZW5kQ2hpbGQoc3R5bGVFbGVtZW50KTtcclxuXHR9IGVsc2Uge1xyXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCB2YWx1ZSBmb3IgcGFyYW1ldGVyICdpbnNlcnRBdCcuIE11c3QgYmUgJ3RvcCcgb3IgJ2JvdHRvbScuXCIpO1xyXG5cdH1cclxufVxyXG5cclxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xyXG5cdHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XHJcblx0dmFyIGlkeCA9IHN0eWxlRWxlbWVudHNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGVFbGVtZW50KTtcclxuXHRpZihpZHggPj0gMCkge1xyXG5cdFx0c3R5bGVFbGVtZW50c0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBzdHlsZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XHJcblx0c3R5bGVFbGVtZW50LnR5cGUgPSBcInRleHQvY3NzXCI7XHJcblx0aW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMsIHN0eWxlRWxlbWVudCk7XHJcblx0cmV0dXJuIHN0eWxlRWxlbWVudDtcclxufVxyXG5cclxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucykge1xyXG5cdHZhciBsaW5rRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xyXG5cdGxpbmtFbGVtZW50LnJlbCA9IFwic3R5bGVzaGVldFwiO1xyXG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rRWxlbWVudCk7XHJcblx0cmV0dXJuIGxpbmtFbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRTdHlsZShvYmosIG9wdGlvbnMpIHtcclxuXHR2YXIgc3R5bGVFbGVtZW50LCB1cGRhdGUsIHJlbW92ZTtcclxuXHJcblx0aWYgKG9wdGlvbnMuc2luZ2xldG9uKSB7XHJcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcclxuXHRcdHN0eWxlRWxlbWVudCA9IHNpbmdsZXRvbkVsZW1lbnQgfHwgKHNpbmdsZXRvbkVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xyXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgZmFsc2UpO1xyXG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlRWxlbWVudCwgc3R5bGVJbmRleCwgdHJ1ZSk7XHJcblx0fSBlbHNlIGlmKG9iai5zb3VyY2VNYXAgJiZcclxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5jcmVhdGVPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxyXG5cdFx0dHlwZW9mIGJ0b2EgPT09IFwiZnVuY3Rpb25cIikge1xyXG5cdFx0c3R5bGVFbGVtZW50ID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdFx0aWYoc3R5bGVFbGVtZW50LmhyZWYpXHJcblx0XHRcdFx0VVJMLnJldm9rZU9iamVjdFVSTChzdHlsZUVsZW1lbnQuaHJlZik7XHJcblx0XHR9O1xyXG5cdH0gZWxzZSB7XHJcblx0XHRzdHlsZUVsZW1lbnQgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XHJcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGVFbGVtZW50KTtcclxuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHR1cGRhdGUob2JqKTtcclxuXHJcblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVN0eWxlKG5ld09iaikge1xyXG5cdFx0aWYobmV3T2JqKSB7XHJcblx0XHRcdGlmKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcClcclxuXHRcdFx0XHRyZXR1cm47XHJcblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cmVtb3ZlKCk7XHJcblx0XHR9XHJcblx0fTtcclxufVxyXG5cclxudmFyIHJlcGxhY2VUZXh0ID0gKGZ1bmN0aW9uICgpIHtcclxuXHR2YXIgdGV4dFN0b3JlID0gW107XHJcblxyXG5cdHJldHVybiBmdW5jdGlvbiAoaW5kZXgsIHJlcGxhY2VtZW50KSB7XHJcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XHJcblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcclxuXHR9O1xyXG59KSgpO1xyXG5cclxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyhzdHlsZUVsZW1lbnQsIGluZGV4LCByZW1vdmUsIG9iaikge1xyXG5cdHZhciBjc3MgPSByZW1vdmUgPyBcIlwiIDogb2JqLmNzcztcclxuXHJcblx0aWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XHJcblx0XHRzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdHZhciBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKTtcclxuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGVFbGVtZW50LmNoaWxkTm9kZXM7XHJcblx0XHRpZiAoY2hpbGROb2Rlc1tpbmRleF0pIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcclxuXHRcdFx0c3R5bGVFbGVtZW50Lmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoY3NzTm9kZSk7XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiBhcHBseVRvVGFnKHN0eWxlRWxlbWVudCwgb2JqKSB7XHJcblx0dmFyIGNzcyA9IG9iai5jc3M7XHJcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xyXG5cclxuXHRpZihtZWRpYSkge1xyXG5cdFx0c3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm1lZGlhXCIsIG1lZGlhKVxyXG5cdH1cclxuXHJcblx0aWYoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcclxuXHRcdHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XHJcblx0fSBlbHNlIHtcclxuXHRcdHdoaWxlKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XHJcblx0XHRcdHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XHJcblx0XHR9XHJcblx0XHRzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XHJcblx0fVxyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVMaW5rKGxpbmtFbGVtZW50LCBvYmopIHtcclxuXHR2YXIgY3NzID0gb2JqLmNzcztcclxuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcclxuXHJcblx0aWYoc291cmNlTWFwKSB7XHJcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxyXG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xyXG5cdH1cclxuXHJcblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XHJcblxyXG5cdHZhciBvbGRTcmMgPSBsaW5rRWxlbWVudC5ocmVmO1xyXG5cclxuXHRsaW5rRWxlbWVudC5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcclxuXHJcblx0aWYob2xkU3JjKVxyXG5cdFx0VVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xyXG59XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3N0eWxlLWxvYWRlci9hZGRTdHlsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==