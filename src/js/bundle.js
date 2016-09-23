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
		var Textfield = __webpack_require__(6);
	
		//document.getElementById().initStart better? use "this"?
		// OR TRY USE FACTORY PATTERN ON THIS? 
		var startButton = new Button('start_button');
		startButton.initStart();
	
		var failButton = new Button('fail_button');
		failButton.initFail();
	
		var submitButton = new Button('submit_button');
		submitButton.submit();
	
		var submitTextfield = new Textfield('submit_textfield', submitButton);
		submitTextfield.submit();
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
		var CountdownPanel = __webpack_require__(3);
		var Slider = __webpack_require__(5);
		var Helper = __webpack_require__(4);
		//TODO - document.querySelector is better or nah? Heard performance is worse but how bad is it? why queryselector over getelement?
		// THIS IS TOO SHIT, ITS TOO DEPENDENT ON HARD CODED VARIABLES; CAN ANGULAR 2 DEPENDENCY INJECTION HELP? I KNOW
		// REACT CAN WITH ITS COMPONENT BASED LIBRARY; WHAT ABOUT EMBER? WHY ARE PEOPLE DITCHING EMBER? TOO OLD? KNOCKOUT MVVM HELPS?? EQUIVALENT FOR VANILLA JS?
		var submitTextfield = document.getElementById('submit_textfield');
		var failBackground = document.getElementsByClassName('fail_background')[0];
		var images = document.getElementsByClassName('images')[0];
		var image = document.getElementsByClassName('image');
		var instructionPanel = document.getElementsByClassName('instruction_panel')[0];
		var addPoints = document.getElementsByClassName('add_points')[0];
		var wrapper = document.getElementsByClassName('wrapper')[0];
		var sliderPanel = document.getElementsByClassName('slider_panel')[0];
		var highScore = document.getElementsByClassName('high_score');
		var imageIteration = 0;
	
		function Button(id) {
			this.button = document.getElementById(id);
			this.countdownPanel = new CountdownPanel('countdown_panel');
			this.slider = new Slider('slider_panel');
		};
	
		/**
	  * When clicked, start the countdown panel.
	  * @param  {Integer} Countdown number
	  * @param  {Function} The function that will be called when the countdown number reaches 0.
	  * @return {[type]}
	  */
		// THIS PROTOTYPE OR MODULE PATTERN IS BETTER??? WHAT ABOUT PUB/SUB IMPLEMENTATION?
		// IF HAVE TIME, SEE IF ES6 ARROW FUNCTION IS MORE READABLE OR NOT
		// AND ALL THIS FUNCTIONS...MAYBE SEPERATE IT INTO DIFFERENT COMPONENTS?
		Button.prototype.startCountdownForSlider = function (countdownNumber, callback) {
			// Is using self okay? Cause theres window.self...but will I ever use that???
			var self = this;
			this.button.addEventListener('click', function () {
				callback();
				Helper.toggleClassForAnimation(wrapper, 'grayscale_background_animation');
				self.countdownPanel.startCountdownTimer(countdownNumber, self.slider.startSlider.bind(self.slider));
			});
		};
	
		/**
	  * When clicked, check if the user input is valid; if it is valid, it will remove an image and add some points, else display a fail animation.
	  */
		Button.prototype.submit = function () {
			this.button.addEventListener('click', function () {
				if (Helper.validateIfInputIsDotaHeroName(image[imageIteration], submitTextfield)) {
					Helper.hideElement(image[imageIteration]);
					imageIteration++;
					addPoints.innerHTML = "+100";
					for (var i = 0; i < highScore.length; i++) {
						highScore[i].innerHTML = parseInt(highScore[i].innerHTML) + 100;
					}
					Helper.toggleClassForAnimation(addPoints, 'add_points_animation');
					Helper.removeClass(submitTextfield, 'shake_textfield_animation');
				} else {
					Helper.toggleClassForAnimation(submitTextfield, 'shake_textfield_animation');
				}
				submitTextfield.value = '';
				if (typeof image[imageIteration] === 'undefined') {
					document.getElementsByClassName('result_text')[0].innerHTML = 'Ez Win!';
					Helper.showElement(failBackground);
				}
			});
		};
	
		/**
	  * Constructor for when the start button is clicked.
	  * @param  {Integer} countdown number.
	  */
		Button.prototype.initStart = function (countdownNumber) {
			var callback = function callback() {
				Helper.hideElement(instructionPanel);
			};
			this.startCountdownForSlider(COUNTDOWN_NUMBER, callback);
		};
	
		/**
	  * Constructor for when the fail button is clicked.
	  * @param  {Integer} countdown number.
	  */
		Button.prototype.initFail = function (countdownNumber) {
			var callback = function callback() {
				Helper.hideElement(failBackground, sliderPanel);
				// reset the images
				images.style.marginLeft = '100%';
				images.style.transition = '0s';
				for (var i = 0; i < image.length; i++) {
					image[i].style.display = 'block';
				}
				imageIteration = 0;
				for (var _i = 0; _i < highScore.length; _i++) {
					highScore[_i].innerHTML = 0;
				}
				submitTextfield.value = '';
				Helper.removeClass(submitTextfield, 'shake_textfield_animation');
				Helper.removeClass(addPoints, 'add_points_animation');
				addPoints.style.opacity = 0;
			};
			this.startCountdownForSlider(COUNTDOWN_NUMBER, callback);
		};
	
		return Button;
	}();

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	/**
	 * This is the countdown panel; it will countdown until it reaches 0 before it displays the slider panel.
	 */
	module.exports = function () {
		"use strict";
	
		var Helper = __webpack_require__(4);
	
		function countdownPanel(id) {
			this.countdownPanel = document.getElementById(id);
		}
	
		/**
	  * Start the countdown; it will countdown the number displayed on the screen until it reaches 0, which by then it will display the slider panel.
	  * @param  {Integer} the countdown number, e.g. if 3, it will start the countdown from 3.
	  * @param  {Function} The callback that will be called once the countdown reaches 0.
	  */
		countdownPanel.prototype.startCountdownTimer = function (countdownNumber, callback) {
			var self = this;
			Helper.showElement(this.countdownPanel);
			this.countdownPanel.innerHTML = "";
			var countDownTimer = setInterval(function () {
				if (countdownNumber === 0) {
					clearInterval(countDownTimer);
					Helper.hideElement(self.countdownPanel);
					callback();
				}
				self.countdownPanel.innerHTML = countdownNumber--;
			}, 1000);
		};
	
		return countdownPanel;
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
		function whichTransitionEvent() {
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
		function getPosition(el) {
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
		function transitionEnd(element, callback) {
			var transitionEvent = whichTransitionEvent();
			element.addEventListener(transitionEvent, callback);
		}
	
		/**
	  * Display the element.
	  * @param  {Object} The element that will be displayed.
	  */
		function showElement(element, display) {
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
		function hideElement(element) {
			for (var i = 0; i < arguments.length; i++) {
				arguments[i].style.display = 'none';
			}
		}
	
		/**
	  * Add a CSS class to an element.
	  * @param  {Object} The element that will have the added CSS class.
	  * @param  {String} className - The CSS class name
	  */
		function addClass(element, className) {
			if (!element.classList.contains(className)) {
				element.classList.add(className);
			}
		}
	
		/**
	  * Remove a CSS class from an element.
	  * @param  {Object} The element that will have the specified CSS class removed.
	  * @param  {String} className - The CSS class name
	  */
		function removeClass(element, className) {
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
		function toggleClass(element, className) {
			if (element.classList.contains(className)) {
				removeClass(element, className);
			} else {
				addClass(element, className);
			}
		}
	
		/**
	  * Toggle whether to add or remove CSS class.
	  * @param  {Object} The element that will add or remove the CSS class.
	  * @param  {String} className - The CSS class name
	  */
		function toggleClassForAnimation(element, className) {
			if (element.classList.contains(className)) {
				removeClass(element, className);
			}
			addClass(element, className);
		}
	
		/**
	  * Validate if user input is a string.
	  * @param  {Object} The textfield that will be validated.
	  */
		function validateIfInputIsDotaHeroName(image, textfield) {
			if (image.name.toLowerCaseAndRemoveIllegalCharacters() === textfield.value.toLowerCaseAndRemoveIllegalCharacters()) {
				return true;
			}
			return false;
		}
	
		return {
			transitionEnd: transitionEnd,
			getPosition: getPosition,
			showElement: showElement,
			hideElement: hideElement,
			addClass: addClass,
			removeClass: removeClass,
			toggleClass: toggleClass,
			toggleClassForAnimation: toggleClassForAnimation,
			validateIfInputIsDotaHeroName: validateIfInputIsDotaHeroName
		};
	}();

/***/ },
/* 5 */
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
		var SLIDE_DURATION = 10;
		var WARNING_THRESHOLD = 30;
		var images = document.getElementsByClassName('images')[0];
		var imagesPanel = document.getElementsByClassName('images_panel')[0];
		var failBackground = document.getElementsByClassName('fail_background')[0];
	
		function slider(slider) {
			this.slider = document.getElementsByClassName(slider)[0];
		}
	
		/**
	  * Get images from dota API, appending it to a list of generated image DOM element.
	  */
		slider.prototype.getImages = function () {
			// TODO - Get list of dota images using AJAX, look up Promises and Generators
			// Promises - asychronous calls, do this, then do this
			// Generators - something about waiting indefinitely until it gets it (uses the keyword 'yield')
			// APPARENTLY GENERATORS IS A HACK, ES7 'ASYNC' KEYWORD IS THE LEGIT WAY OR SOME SHIT; I THINK? 
			// Using XMLHttpRequest on a remote server gives you 'Access-control-allow-origin' missing error; look up CORS; maybe create a Python script instead
			var dotaHeroesJson = void 0;
			var oReq = new XMLHttpRequest();
			oReq.onreadystatechange = function () {
				if (oReq.readyState === XMLHttpRequest.DONE) {
					dotaHeroesJson = JSON.parse(oReq.responseText);
					console.log(dotaHeroesJson);
					var fragment = document.createDocumentFragment();
					var heroes = dotaHeroesJson.result.heroes;
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
					images.appendChild(fragment);
				}
			};
			//oReq.open('GET', 'https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v0001/?key=6C1CF76C90768388618F348BB73EE015&language=en_us&format=JSON', true);
			oReq.open('GET', 'http://lilmortal-test.apigee.net/getdotaheroes?key=6C1CF76C90768388618F348BB73EE015&language=en_us&format=JSON');
			//oReq.responseType = 'json';
			oReq.send();
			//console.log(oReq.responseText);
			// TODO: Fix this, it's been called everytime you start a new game which is very inefficient
			//const dotaHeroesJson = oReq.response;//JSON.parse(this.stubDotaHeroes());
			//console.log(dotaHeroesJson);
		};
	
		/**
	  * Transition effect on the images.
	  */
		slider.prototype.slide = function () {
			var screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
			var defaultWidth = screenWidth - imagesPanel.offsetWidth / 2 + imagesPanel.offsetWidth;
			var warningWidth = defaultWidth * WARNING_THRESHOLD / 100;
			var timer = void 0;
	
			images.style.marginLeft = '0';
			images.style.transition = SLIDE_DURATION + 's linear';
			Helper.removeClass(imagesPanel, 'warning_animation');
	
			timer = setInterval(function () {
				if (Helper.getPosition(images).x <= warningWidth) {
					Helper.addClass(imagesPanel, 'warning_animation');
					clearInterval(timer);
				}
			}, 1000);
		};
	
		/**
	  * Initialize the slider transition, display the fail panel when the transition ends.
	  */
		slider.prototype.startSlider = function () {
			if (images.children.length === 0) {
				this.getImages();
			}
			Helper.showElement(this.slider);
			this.slide();
			Helper.transitionEnd(images, function () {
				document.getElementsByClassName('result_text')[0].innerHTML = 'You lose...';
				Helper.showElement(failBackground);
			});
		};
	
		// Temporary until an actual call to API is made
		slider.prototype.stubDotaHeroes = function () {
			return '{\n\t\t"result":{\n\t\t"heroes":[\n\t\t{\n\t\t"name":"npc_dota_hero_antimage",\n\t\t"id":1,\n\t\t"localized_name":"Anti-Mage"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_axe",\n\t\t"id":2,\n\t\t"localized_name":"Axe"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_bane",\n\t\t"id":3,\n\t\t"localized_name":"Bane"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_bloodseeker",\n\t\t"id":4,\n\t\t"localized_name":"Bloodseeker"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_crystal_maiden",\n\t\t"id":5,\n\t\t"localized_name":"Crystal Maiden"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_drow_ranger",\n\t\t"id":6,\n\t\t"localized_name":"Drow Ranger"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_earthshaker",\n\t\t"id":7,\n\t\t"localized_name":"Earthshaker"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_juggernaut",\n\t\t"id":8,\n\t\t"localized_name":"Juggernaut"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_mirana",\n\t\t"id":9,\n\t\t"localized_name":"Mirana"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_nevermore",\n\t\t"id":11,\n\t\t"localized_name":"Shadow Fiend"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_morphling",\n\t\t"id":10,\n\t\t"localized_name":"Morphling"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_phantom_lancer",\n\t\t"id":12,\n\t\t"localized_name":"Phantom Lancer"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_puck",\n\t\t"id":13,\n\t\t"localized_name":"Puck"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_pudge",\n\t\t"id":14,\n\t\t"localized_name":"Pudge"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_razor",\n\t\t"id":15,\n\t\t"localized_name":"Razor"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_sand_king",\n\t\t"id":16,\n\t\t"localized_name":"Sand King"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_storm_spirit",\n\t\t"id":17,\n\t\t"localized_name":"Storm Spirit"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_sven",\n\t\t"id":18,\n\t\t"localized_name":"Sven"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_tiny",\n\t\t"id":19,\n\t\t"localized_name":"Tiny"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_vengefulspirit",\n\t\t"id":20,\n\t\t"localized_name":"Vengeful Spirit"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_windrunner",\n\t\t"id":21,\n\t\t"localized_name":"Windranger"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_zuus",\n\t\t"id":22,\n\t\t"localized_name":"Zeus"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_kunkka",\n\t\t"id":23,\n\t\t"localized_name":"Kunkka"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_lina",\n\t\t"id":25,\n\t\t"localized_name":"Lina"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_lich",\n\t\t"id":31,\n\t\t"localized_name":"Lich"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_lion",\n\t\t"id":26,\n\t\t"localized_name":"Lion"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_shadow_shaman",\n\t\t"id":27,\n\t\t"localized_name":"Shadow Shaman"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_slardar",\n\t\t"id":28,\n\t\t"localized_name":"Slardar"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_tidehunter",\n\t\t"id":29,\n\t\t"localized_name":"Tidehunter"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_witch_doctor",\n\t\t"id":30,\n\t\t"localized_name":"Witch Doctor"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_riki",\n\t\t"id":32,\n\t\t"localized_name":"Riki"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_enigma",\n\t\t"id":33,\n\t\t"localized_name":"Enigma"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_tinker",\n\t\t"id":34,\n\t\t"localized_name":"Tinker"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_sniper",\n\t\t"id":35,\n\t\t"localized_name":"Sniper"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_necrolyte",\n\t\t"id":36,\n\t\t"localized_name":"Necrophos"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_warlock",\n\t\t"id":37,\n\t\t"localized_name":"Warlock"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_beastmaster",\n\t\t"id":38,\n\t\t"localized_name":"Beastmaster"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_queenofpain",\n\t\t"id":39,\n\t\t"localized_name":"Queen of Pain"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_venomancer",\n\t\t"id":40,\n\t\t"localized_name":"Venomancer"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_faceless_void",\n\t\t"id":41,\n\t\t"localized_name":"Faceless Void"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_skeleton_king",\n\t\t"id":42,\n\t\t"localized_name":"Wraith King"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_death_prophet",\n\t\t"id":43,\n\t\t"localized_name":"Death Prophet"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_phantom_assassin",\n\t\t"id":44,\n\t\t"localized_name":"Phantom Assassin"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_pugna",\n\t\t"id":45,\n\t\t"localized_name":"Pugna"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_templar_assassin",\n\t\t"id":46,\n\t\t"localized_name":"Templar Assassin"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_viper",\n\t\t"id":47,\n\t\t"localized_name":"Viper"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_luna",\n\t\t"id":48,\n\t\t"localized_name":"Luna"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_dragon_knight",\n\t\t"id":49,\n\t\t"localized_name":"Dragon Knight"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_dazzle",\n\t\t"id":50,\n\t\t"localized_name":"Dazzle"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_rattletrap",\n\t\t"id":51,\n\t\t"localized_name":"Clockwerk"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_leshrac",\n\t\t"id":52,\n\t\t"localized_name":"Leshrac"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_furion",\n\t\t"id":53,\n\t\t"localized_name":"Nature\'s Prophet"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_life_stealer",\n\t\t"id":54,\n\t\t"localized_name":"Lifestealer"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_dark_seer",\n\t\t"id":55,\n\t\t"localized_name":"Dark Seer"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_clinkz",\n\t\t"id":56,\n\t\t"localized_name":"Clinkz"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_omniknight",\n\t\t"id":57,\n\t\t"localized_name":"Omniknight"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_enchantress",\n\t\t"id":58,\n\t\t"localized_name":"Enchantress"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_huskar",\n\t\t"id":59,\n\t\t"localized_name":"Huskar"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_night_stalker",\n\t\t"id":60,\n\t\t"localized_name":"Night Stalker"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_broodmother",\n\t\t"id":61,\n\t\t"localized_name":"Broodmother"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_bounty_hunter",\n\t\t"id":62,\n\t\t"localized_name":"Bounty Hunter"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_weaver",\n\t\t"id":63,\n\t\t"localized_name":"Weaver"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_jakiro",\n\t\t"id":64,\n\t\t"localized_name":"Jakiro"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_batrider",\n\t\t"id":65,\n\t\t"localized_name":"Batrider"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_chen",\n\t\t"id":66,\n\t\t"localized_name":"Chen"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_spectre",\n\t\t"id":67,\n\t\t"localized_name":"Spectre"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_doom_bringer",\n\t\t"id":69,\n\t\t"localized_name":"Doom"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_ancient_apparition",\n\t\t"id":68,\n\t\t"localized_name":"Ancient Apparition"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_ursa",\n\t\t"id":70,\n\t\t"localized_name":"Ursa"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_spirit_breaker",\n\t\t"id":71,\n\t\t"localized_name":"Spirit Breaker"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_gyrocopter",\n\t\t"id":72,\n\t\t"localized_name":"Gyrocopter"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_alchemist",\n\t\t"id":73,\n\t\t"localized_name":"Alchemist"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_invoker",\n\t\t"id":74,\n\t\t"localized_name":"Invoker"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_silencer",\n\t\t"id":75,\n\t\t"localized_name":"Silencer"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_obsidian_destroyer",\n\t\t"id":76,\n\t\t"localized_name":"Outworld Devourer"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_lycan",\n\t\t"id":77,\n\t\t"localized_name":"Lycan"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_brewmaster",\n\t\t"id":78,\n\t\t"localized_name":"Brewmaster"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_shadow_demon",\n\t\t"id":79,\n\t\t"localized_name":"Shadow Demon"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_lone_druid",\n\t\t"id":80,\n\t\t"localized_name":"Lone Druid"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_chaos_knight",\n\t\t"id":81,\n\t\t"localized_name":"Chaos Knight"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_meepo",\n\t\t"id":82,\n\t\t"localized_name":"Meepo"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_treant",\n\t\t"id":83,\n\t\t"localized_name":"Treant Protector"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_ogre_magi",\n\t\t"id":84,\n\t\t"localized_name":"Ogre Magi"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_undying",\n\t\t"id":85,\n\t\t"localized_name":"Undying"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_rubick",\n\t\t"id":86,\n\t\t"localized_name":"Rubick"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_disruptor",\n\t\t"id":87,\n\t\t"localized_name":"Disruptor"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_nyx_assassin",\n\t\t"id":88,\n\t\t"localized_name":"Nyx Assassin"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_naga_siren",\n\t\t"id":89,\n\t\t"localized_name":"Naga Siren"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_keeper_of_the_light",\n\t\t"id":90,\n\t\t"localized_name":"Keeper of the Light"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_wisp",\n\t\t"id":91,\n\t\t"localized_name":"Io"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_visage",\n\t\t"id":92,\n\t\t"localized_name":"Visage"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_slark",\n\t\t"id":93,\n\t\t"localized_name":"Slark"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_medusa",\n\t\t"id":94,\n\t\t"localized_name":"Medusa"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_troll_warlord",\n\t\t"id":95,\n\t\t"localized_name":"Troll Warlord"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_centaur",\n\t\t"id":96,\n\t\t"localized_name":"Centaur Warrunner"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_magnataur",\n\t\t"id":97,\n\t\t"localized_name":"Magnus"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_shredder",\n\t\t"id":98,\n\t\t"localized_name":"Timbersaw"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_bristleback",\n\t\t"id":99,\n\t\t"localized_name":"Bristleback"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_tusk",\n\t\t"id":100,\n\t\t"localized_name":"Tusk"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_skywrath_mage",\n\t\t"id":101,\n\t\t"localized_name":"Skywrath Mage"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_abaddon",\n\t\t"id":102,\n\t\t"localized_name":"Abaddon"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_elder_titan",\n\t\t"id":103,\n\t\t"localized_name":"Elder Titan"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_legion_commander",\n\t\t"id":104,\n\t\t"localized_name":"Legion Commander"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_ember_spirit",\n\t\t"id":106,\n\t\t"localized_name":"Ember Spirit"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_earth_spirit",\n\t\t"id":107,\n\t\t"localized_name":"Earth Spirit"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_terrorblade",\n\t\t"id":109,\n\t\t"localized_name":"Terrorblade"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_phoenix",\n\t\t"id":110,\n\t\t"localized_name":"Phoenix"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_oracle",\n\t\t"id":111,\n\t\t"localized_name":"Oracle"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_techies",\n\t\t"id":105,\n\t\t"localized_name":"Techies"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_winter_wyvern",\n\t\t"id":112,\n\t\t"localized_name":"Winter Wyvern"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_arc_warden",\n\t\t"id":113,\n\t\t"localized_name":"Arc Warden"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_abyssal_underlord",\n\t\t"id":108,\n\t\t"localized_name":"Underlord"\n\t\t}\n\t\t]\n\t\t,\n\t\t"status":200,\n\t\t"count":112\n\t\t}\n\t\t}';
		};
	
		return slider;
	}();

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function () {
		"use strict";
	
		function Textfield(id, button) {
			this.textfield = document.getElementById(id);
			this.button = button;
		}
	
		/**
	  * Submit if user press 'enter'.
	  */
		Textfield.prototype.submit = function () {
			var self = this;
			this.textfield.addEventListener('keyup', function (event) {
				if (event.keyCode === 13) {
					// LOL SELF.BUTTON.BUTTON??? FIX
					self.button.button.click();
				}
			});
		};
	
		return Textfield;
	}();

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDExOTExYWUxMzU3MGYwOTUyZDUiLCJ3ZWJwYWNrOi8vLy4vanMvaW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2J1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2NvdW50ZG93bl9wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9zbGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy90ZXh0ZmllbGQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Q0EsRUFBQyxZQUFXO0FBQ1g7O0FBRUEsTUFBTSxTQUFTLG9CQUFRLENBQVIsQ0FBZjtBQUNBLE1BQU0sWUFBWSxvQkFBUSxDQUFSLENBQWxCOztBQUVBO0FBQ0E7QUFDQSxNQUFNLGNBQWMsSUFBSSxNQUFKLENBQVcsY0FBWCxDQUFwQjtBQUNBLGNBQVksU0FBWjs7QUFFQSxNQUFNLGFBQWEsSUFBSSxNQUFKLENBQVcsYUFBWCxDQUFuQjtBQUNBLGFBQVcsUUFBWDs7QUFFQSxNQUFNLGVBQWUsSUFBSSxNQUFKLENBQVcsZUFBWCxDQUFyQjtBQUNBLGVBQWEsTUFBYjs7QUFFQSxNQUFNLGtCQUFrQixJQUFJLFNBQUosQ0FBYyxrQkFBZCxFQUFrQyxZQUFsQyxDQUF4QjtBQUNBLGtCQUFnQixNQUFoQjtBQUNBLEVBbkJELEk7Ozs7Ozs7O0FDQUE7Ozs7QUFJQSxRQUFPLE9BQVAsR0FBa0IsWUFBVztBQUM1Qjs7QUFF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QyxZQUFXO0FBQzVDO0FBeWpCQSxHQTFqQkQ7O0FBNGpCQSxTQUFPLE1BQVA7QUFDQSxFQTFwQmdCLEVBQWpCLEM7Ozs7Ozs7O0FDTEEsUUFBTyxPQUFQLEdBQWtCLFlBQVc7QUFDNUI7O0FBRUEsV0FBUyxTQUFULENBQW1CLEVBQW5CLEVBQXVCLE1BQXZCLEVBQStCO0FBQzlCLFFBQUssU0FBTCxHQUFpQixTQUFTLGNBQVQsQ0FBd0IsRUFBeEIsQ0FBakI7QUFDQSxRQUFLLE1BQUwsR0FBYyxNQUFkO0FBQ0E7O0FBRUQ7OztBQUdBLFlBQVUsU0FBVixDQUFvQixNQUFwQixHQUE2QixZQUFXO0FBQ3ZDLE9BQUksT0FBTyxJQUFYO0FBQ0EsUUFBSyxTQUFMLENBQWUsZ0JBQWYsQ0FBZ0MsT0FBaEMsRUFBeUMsVUFBUyxLQUFULEVBQWdCO0FBQ3hELFFBQUksTUFBTSxPQUFOLEtBQWtCLEVBQXRCLEVBQTBCO0FBQ3pCO0FBQ0EsVUFBSyxNQUFMLENBQVksTUFBWixDQUFtQixLQUFuQjtBQUNBO0FBQ0QsSUFMRDtBQU1BLEdBUkQ7O0FBVUEsU0FBTyxTQUFQO0FBQ0EsRUF0QmdCLEVBQWpCLEMiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAwMTE5MTFhZTEzNTcwZjA5NTJkNVxuICoqLyIsIihmdW5jdGlvbigpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0Y29uc3QgQnV0dG9uID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL2J1dHRvbi5qcycpO1xyXG5cdGNvbnN0IFRleHRmaWVsZCA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy90ZXh0ZmllbGQuanMnKTtcclxuXHJcblx0Ly9kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgpLmluaXRTdGFydCBiZXR0ZXI/IHVzZSBcInRoaXNcIj9cclxuXHQvLyBPUiBUUlkgVVNFIEZBQ1RPUlkgUEFUVEVSTiBPTiBUSElTPyBcclxuXHRjb25zdCBzdGFydEJ1dHRvbiA9IG5ldyBCdXR0b24oJ3N0YXJ0X2J1dHRvbicpO1xyXG5cdHN0YXJ0QnV0dG9uLmluaXRTdGFydCgpO1xyXG5cclxuXHRjb25zdCBmYWlsQnV0dG9uID0gbmV3IEJ1dHRvbignZmFpbF9idXR0b24nKTtcclxuXHRmYWlsQnV0dG9uLmluaXRGYWlsKCk7XHJcblxyXG5cdGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IG5ldyBCdXR0b24oJ3N1Ym1pdF9idXR0b24nKTtcclxuXHRzdWJtaXRCdXR0b24uc3VibWl0KCk7XHJcblxyXG5cdGNvbnN0IHN1Ym1pdFRleHRmaWVsZCA9IG5ldyBUZXh0ZmllbGQoJ3N1Ym1pdF90ZXh0ZmllbGQnLCBzdWJtaXRCdXR0b24pO1xyXG5cdHN1Ym1pdFRleHRmaWVsZC5zdWJtaXQoKTtcclxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2luaXQuanNcbiAqKi8iLCIvKipcclxuICogVGhpcyBpcyBhIGdlbmVyaWMgYnV0dG9uLCB3aGljaCBoYXMgYSBtdWx0aXR1ZGUgb2YgZ2VuZXJpYyB0byBzcGVjaWZpYyBmdW5jdGlvbnMgZm9yIGFsbCBwb3NzaWJsZSBzY2VuYXJpb3MuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBCdXR0b25cclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRjb25zdCBDT1VOVERPV05fTlVNQkVSID0gMztcclxuXHRjb25zdCBDb3VudGRvd25QYW5lbCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvY291bnRkb3duX3BhbmVsLmpzJyk7XHJcblx0Y29uc3QgU2xpZGVyID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9zbGlkZXIuanMnKTtcclxuXHRjb25zdCBIZWxwZXIgPSByZXF1aXJlKCcuLi9oZWxwZXIuanMnKTtcclxuXHQvL1RPRE8gLSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yIGlzIGJldHRlciBvciBuYWg/IEhlYXJkIHBlcmZvcm1hbmNlIGlzIHdvcnNlIGJ1dCBob3cgYmFkIGlzIGl0PyB3aHkgcXVlcnlzZWxlY3RvciBvdmVyIGdldGVsZW1lbnQ/XHJcblx0Ly8gVEhJUyBJUyBUT08gU0hJVCwgSVRTIFRPTyBERVBFTkRFTlQgT04gSEFSRCBDT0RFRCBWQVJJQUJMRVM7IENBTiBBTkdVTEFSIDIgREVQRU5ERU5DWSBJTkpFQ1RJT04gSEVMUD8gSSBLTk9XXHJcblx0Ly8gUkVBQ1QgQ0FOIFdJVEggSVRTIENPTVBPTkVOVCBCQVNFRCBMSUJSQVJZOyBXSEFUIEFCT1VUIEVNQkVSPyBXSFkgQVJFIFBFT1BMRSBESVRDSElORyBFTUJFUj8gVE9PIE9MRD8gS05PQ0tPVVQgTVZWTSBIRUxQUz8/IEVRVUlWQUxFTlQgRk9SIFZBTklMTEEgSlM/XHJcblx0Y29uc3Qgc3VibWl0VGV4dGZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdF90ZXh0ZmllbGQnKTtcclxuXHRjb25zdCBmYWlsQmFja2dyb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ZhaWxfYmFja2dyb3VuZCcpWzBdO1xyXG5cdGNvbnN0IGltYWdlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlcycpWzBdO1xyXG5cdGNvbnN0IGltYWdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2UnKTtcclxuXHRjb25zdCBpbnN0cnVjdGlvblBhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW5zdHJ1Y3Rpb25fcGFuZWwnKVswXTtcclxuXHRjb25zdCBhZGRQb2ludHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhZGRfcG9pbnRzJylbMF07XHJcblx0Y29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3dyYXBwZXInKVswXTtcclxuXHRjb25zdCBzbGlkZXJQYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NsaWRlcl9wYW5lbCcpWzBdO1xyXG5cdGNvbnN0IGhpZ2hTY29yZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2hpZ2hfc2NvcmUnKTtcclxuXHRsZXQgaW1hZ2VJdGVyYXRpb24gPSAwO1xyXG5cclxuXHRmdW5jdGlvbiBCdXR0b24oaWQpIHtcclxuXHRcdHRoaXMuYnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG5cdFx0dGhpcy5jb3VudGRvd25QYW5lbCA9IG5ldyBDb3VudGRvd25QYW5lbCgnY291bnRkb3duX3BhbmVsJyk7XHJcblx0XHR0aGlzLnNsaWRlciA9IG5ldyBTbGlkZXIoJ3NsaWRlcl9wYW5lbCcpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFdoZW4gY2xpY2tlZCwgc3RhcnQgdGhlIGNvdW50ZG93biBwYW5lbC5cclxuXHQgKiBAcGFyYW0gIHtJbnRlZ2VyfSBDb3VudGRvd24gbnVtYmVyXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IFRoZSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIGNvdW50ZG93biBudW1iZXIgcmVhY2hlcyAwLlxyXG5cdCAqIEByZXR1cm4ge1t0eXBlXX1cclxuXHQgKi9cclxuXHQvLyBUSElTIFBST1RPVFlQRSBPUiBNT0RVTEUgUEFUVEVSTiBJUyBCRVRURVI/Pz8gV0hBVCBBQk9VVCBQVUIvU1VCIElNUExFTUVOVEFUSU9OP1xyXG5cdC8vIElGIEhBVkUgVElNRSwgU0VFIElGIEVTNiBBUlJPVyBGVU5DVElPTiBJUyBNT1JFIFJFQURBQkxFIE9SIE5PVFxyXG5cdC8vIEFORCBBTEwgVEhJUyBGVU5DVElPTlMuLi5NQVlCRSBTRVBFUkFURSBJVCBJTlRPIERJRkZFUkVOVCBDT01QT05FTlRTP1xyXG5cdEJ1dHRvbi5wcm90b3R5cGUuc3RhcnRDb3VudGRvd25Gb3JTbGlkZXIgPSBmdW5jdGlvbihjb3VudGRvd25OdW1iZXIsIGNhbGxiYWNrKSB7XHJcblx0XHQvLyBJcyB1c2luZyBzZWxmIG9rYXk/IENhdXNlIHRoZXJlcyB3aW5kb3cuc2VsZi4uLmJ1dCB3aWxsIEkgZXZlciB1c2UgdGhhdD8/P1xyXG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XHJcblx0XHR0aGlzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRjYWxsYmFjaygpO1xyXG5cdFx0XHRIZWxwZXIudG9nZ2xlQ2xhc3NGb3JBbmltYXRpb24od3JhcHBlciwgJ2dyYXlzY2FsZV9iYWNrZ3JvdW5kX2FuaW1hdGlvbicpO1xyXG5cdFx0XHRzZWxmLmNvdW50ZG93blBhbmVsLnN0YXJ0Q291bnRkb3duVGltZXIoY291bnRkb3duTnVtYmVyLCBzZWxmLnNsaWRlci5zdGFydFNsaWRlci5iaW5kKHNlbGYuc2xpZGVyKSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFdoZW4gY2xpY2tlZCwgY2hlY2sgaWYgdGhlIHVzZXIgaW5wdXQgaXMgdmFsaWQ7IGlmIGl0IGlzIHZhbGlkLCBpdCB3aWxsIHJlbW92ZSBhbiBpbWFnZSBhbmQgYWRkIHNvbWUgcG9pbnRzLCBlbHNlIGRpc3BsYXkgYSBmYWlsIGFuaW1hdGlvbi5cclxuXHQgKi9cclxuXHRCdXR0b24ucHJvdG90eXBlLnN1Ym1pdCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHQgIFx0XHRpZiAoSGVscGVyLnZhbGlkYXRlSWZJbnB1dElzRG90YUhlcm9OYW1lKGltYWdlW2ltYWdlSXRlcmF0aW9uXSwgc3VibWl0VGV4dGZpZWxkKSkge1xyXG5cdCAgXHRcdFx0SGVscGVyLmhpZGVFbGVtZW50KGltYWdlW2ltYWdlSXRlcmF0aW9uXSk7XHJcblx0ICBcdFx0XHRpbWFnZUl0ZXJhdGlvbisrO1xyXG5cdCAgXHRcdFx0YWRkUG9pbnRzLmlubmVySFRNTCA9IFwiKzEwMFwiO1xyXG5cdCAgXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBoaWdoU2NvcmUubGVuZ3RoOyBpKyspIHtcclxuXHQgIFx0XHRcdFx0aGlnaFNjb3JlW2ldLmlubmVySFRNTCA9IHBhcnNlSW50KGhpZ2hTY29yZVtpXS5pbm5lckhUTUwpICsgMTAwO1xyXG5cdCAgXHRcdFx0fVxyXG5cdCAgXHRcdFx0SGVscGVyLnRvZ2dsZUNsYXNzRm9yQW5pbWF0aW9uKGFkZFBvaW50cywgJ2FkZF9wb2ludHNfYW5pbWF0aW9uJyk7XHJcblx0ICBcdFx0XHRIZWxwZXIucmVtb3ZlQ2xhc3Moc3VibWl0VGV4dGZpZWxkLCAnc2hha2VfdGV4dGZpZWxkX2FuaW1hdGlvbicpO1xyXG5cdCAgXHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0SGVscGVyLnRvZ2dsZUNsYXNzRm9yQW5pbWF0aW9uKHN1Ym1pdFRleHRmaWVsZCwgJ3NoYWtlX3RleHRmaWVsZF9hbmltYXRpb24nKTtcclxuXHQgIFx0XHR9XHJcblx0ICBcdFx0c3VibWl0VGV4dGZpZWxkLnZhbHVlID0gJyc7XHJcblx0ICBcdFx0aWYgKHR5cGVvZiBpbWFnZVtpbWFnZUl0ZXJhdGlvbl0gPT09ICd1bmRlZmluZWQnKSB7XHJcblx0ICBcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdyZXN1bHRfdGV4dCcpWzBdLmlubmVySFRNTCA9ICdFeiBXaW4hJztcclxuXHQgIFx0XHRcdEhlbHBlci5zaG93RWxlbWVudChmYWlsQmFja2dyb3VuZCk7XHJcblx0ICBcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RvciBmb3Igd2hlbiB0aGUgc3RhcnQgYnV0dG9uIGlzIGNsaWNrZWQuXHJcblx0ICogQHBhcmFtICB7SW50ZWdlcn0gY291bnRkb3duIG51bWJlci5cclxuXHQgKi9cclxuXHRCdXR0b24ucHJvdG90eXBlLmluaXRTdGFydCA9IGZ1bmN0aW9uKGNvdW50ZG93bk51bWJlcikge1xyXG5cdFx0Y29uc3QgY2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0SGVscGVyLmhpZGVFbGVtZW50KGluc3RydWN0aW9uUGFuZWwpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5zdGFydENvdW50ZG93bkZvclNsaWRlcihDT1VOVERPV05fTlVNQkVSLCBjYWxsYmFjayk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RvciBmb3Igd2hlbiB0aGUgZmFpbCBidXR0b24gaXMgY2xpY2tlZC5cclxuXHQgKiBAcGFyYW0gIHtJbnRlZ2VyfSBjb3VudGRvd24gbnVtYmVyLlxyXG5cdCAqL1xyXG5cdEJ1dHRvbi5wcm90b3R5cGUuaW5pdEZhaWwgPSBmdW5jdGlvbihjb3VudGRvd25OdW1iZXIpIHtcclxuXHRcdGNvbnN0IGNhbGxiYWNrID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdEhlbHBlci5oaWRlRWxlbWVudChmYWlsQmFja2dyb3VuZCwgc2xpZGVyUGFuZWwpO1xyXG5cdFx0XHQvLyByZXNldCB0aGUgaW1hZ2VzXHJcblx0XHRcdGltYWdlcy5zdHlsZS5tYXJnaW5MZWZ0ID0gJzEwMCUnO1xyXG4gIFx0XHRcdGltYWdlcy5zdHlsZS50cmFuc2l0aW9uID0gJzBzJztcclxuICBcdFx0ICBcdGZvciAobGV0IGkgPSAwOyBpIDwgaW1hZ2UubGVuZ3RoOyBpKyspIHtcclxuICBcdFx0XHRcdGltYWdlW2ldLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gIFx0XHRcdH1cclxuICBcdFx0XHRpbWFnZUl0ZXJhdGlvbiA9IDA7XHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgaGlnaFNjb3JlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0aGlnaFNjb3JlW2ldLmlubmVySFRNTCA9IDA7XHJcblx0XHRcdH1cclxuXHRcdFx0c3VibWl0VGV4dGZpZWxkLnZhbHVlID0gJyc7XHJcblx0XHRcdEhlbHBlci5yZW1vdmVDbGFzcyhzdWJtaXRUZXh0ZmllbGQsICdzaGFrZV90ZXh0ZmllbGRfYW5pbWF0aW9uJyk7XHJcblx0XHRcdEhlbHBlci5yZW1vdmVDbGFzcyhhZGRQb2ludHMsICdhZGRfcG9pbnRzX2FuaW1hdGlvbicpO1xyXG5cdFx0XHRhZGRQb2ludHMuc3R5bGUub3BhY2l0eSA9IDA7XHJcblx0XHR9XHJcblx0XHR0aGlzLnN0YXJ0Q291bnRkb3duRm9yU2xpZGVyKENPVU5URE9XTl9OVU1CRVIsIGNhbGxiYWNrKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBCdXR0b247XHJcbn0pKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9jb21wb25lbnRzL2J1dHRvbi5qc1xuICoqLyIsIi8qKlxyXG4gKiBUaGlzIGlzIHRoZSBjb3VudGRvd24gcGFuZWw7IGl0IHdpbGwgY291bnRkb3duIHVudGlsIGl0IHJlYWNoZXMgMCBiZWZvcmUgaXQgZGlzcGxheXMgdGhlIHNsaWRlciBwYW5lbC5cclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cdFxyXG5cdGNvbnN0IEhlbHBlciA9IHJlcXVpcmUoJy4uL2hlbHBlci5qcycpO1xyXG5cdFxyXG5cdGZ1bmN0aW9uIGNvdW50ZG93blBhbmVsKGlkKSB7XHJcblx0XHR0aGlzLmNvdW50ZG93blBhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3RhcnQgdGhlIGNvdW50ZG93bjsgaXQgd2lsbCBjb3VudGRvd24gdGhlIG51bWJlciBkaXNwbGF5ZWQgb24gdGhlIHNjcmVlbiB1bnRpbCBpdCByZWFjaGVzIDAsIHdoaWNoIGJ5IHRoZW4gaXQgd2lsbCBkaXNwbGF5IHRoZSBzbGlkZXIgcGFuZWwuXHJcblx0ICogQHBhcmFtICB7SW50ZWdlcn0gdGhlIGNvdW50ZG93biBudW1iZXIsIGUuZy4gaWYgMywgaXQgd2lsbCBzdGFydCB0aGUgY291bnRkb3duIGZyb20gMy5cclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gVGhlIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBjYWxsZWQgb25jZSB0aGUgY291bnRkb3duIHJlYWNoZXMgMC5cclxuXHQgKi9cclxuXHRjb3VudGRvd25QYW5lbC5wcm90b3R5cGUuc3RhcnRDb3VudGRvd25UaW1lciA9IGZ1bmN0aW9uKGNvdW50ZG93bk51bWJlciwgY2FsbGJhY2spIHtcclxuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cdFx0SGVscGVyLnNob3dFbGVtZW50KHRoaXMuY291bnRkb3duUGFuZWwpO1xyXG5cdFx0dGhpcy5jb3VudGRvd25QYW5lbC5pbm5lckhUTUwgPSBcIlwiO1xyXG5cdFx0Y29uc3QgY291bnREb3duVGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuICAgICAgXHRcdGlmIChjb3VudGRvd25OdW1iZXIgPT09IDApIHtcclxuICAgICAgICBcdFx0Y2xlYXJJbnRlcnZhbChjb3VudERvd25UaW1lcik7XHJcbiAgICAgICAgXHRcdEhlbHBlci5oaWRlRWxlbWVudChzZWxmLmNvdW50ZG93blBhbmVsKTtcclxuICAgICAgICBcdFx0Y2FsbGJhY2soKTtcclxuICAgICAgICBcdH1cclxuICAgICAgICBcdHNlbGYuY291bnRkb3duUGFuZWwuaW5uZXJIVE1MID0gY291bnRkb3duTnVtYmVyLS07XHJcbiAgICBcdH0sIDEwMDApO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGNvdW50ZG93blBhbmVsO1xyXG59KSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvY29tcG9uZW50cy9jb3VudGRvd25fcGFuZWwuanNcbiAqKi8iLCIvLyBpcyBpdCByZWFsbHkgdGhlIGJlc3Qgd2F5Pz8/IGxvb2sgdXAgQ29tbW9uSlMvQU1EL0VTNiBpbXBvcnQvZXhwb3J0ICg8LS0gSSBndWVzcyB0aGlzIGlzIE9LIHNvIGZhcilcclxuLy8gV2hhdCBhYm91dCBpbnN0ZWFkIG9mIEhlbHBlci5tZXRob2QoKSwgdXNlIE9iamVjdC5jcmVhdGU/IERvZXMgdGhpcyBoZWxwP1xyXG4vLyBodHRwOi8vcmVxdWlyZWpzLm9yZy9kb2NzL25vZGUuaHRtbCMxXHJcbi8vIEJ5IHVzaW5nIFJlcXVpcmVKUyBvbiB0aGUgc2VydmVyLCB5b3UgY2FuIHVzZSBvbmUgZm9ybWF0IGZvciBhbGwgeW91ciBtb2R1bGVzLCB3aGV0aGVyIHRoZXkgYXJlIHJ1bm5pbmcgc2VydmVyIHNpZGUgb3IgaW4gdGhlIGJyb3dzZXIuIChobW0uLi4pXHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cdFxyXG5cdGNvbnN0IElMTEVHQUxfQ0hBUkFDVEVSUyA9IG5ldyBSZWdFeHAoL1tcXC1cXHNdKy8pO1xyXG5cclxuICBcdC8qKlxyXG4gIFx0ICogQ29udmVydCBzdHJpbmcgdG8gbG93ZXIgY2FzZSBhbmQgcmVtb3ZlIGlsbGVnYWwgY2hhcmFjdGVycy5cclxuICBcdCAqL1xyXG4gIFx0U3RyaW5nLnByb3RvdHlwZS50b0xvd2VyQ2FzZUFuZFJlbW92ZUlsbGVnYWxDaGFyYWN0ZXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgXHRcdGxldCBsb3dlckNhc2VWYWx1ZSA9IHRoaXMudG9Mb3dlckNhc2UoKTtcclxuICBcdFx0cmV0dXJuIGxvd2VyQ2FzZVZhbHVlLnJlcGxhY2UoSUxMRUdBTF9DSEFSQUNURVJTLCAnJyk7XHJcbiAgXHR9XHJcbiAgXHRcclxuXHQvKipcclxuXHQgKiBGaW5kIHdoaWNoIENTUyB0cmFuc2l0aW9uIGV2ZW50cyBlbmQuXHJcblx0ICogaHR0cHM6Ly9qb25zdWguY29tL2Jsb2cvZGV0ZWN0LXRoZS1lbmQtb2YtY3NzLWFuaW1hdGlvbnMtYW5kLXRyYW5zaXRpb25zLXdpdGgtamF2YXNjcmlwdC9cclxuXHQgKi9cclxuXHRmdW5jdGlvbiB3aGljaFRyYW5zaXRpb25FdmVudCgpe1xyXG5cdCAgdmFyIHQsXHJcblx0ICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmFrZWVsZW1lbnRcIik7XHJcblxyXG5cdCAgdmFyIHRyYW5zaXRpb25zID0ge1xyXG5cdCAgICBcInRyYW5zaXRpb25cIiAgICAgIDogXCJ0cmFuc2l0aW9uZW5kXCIsXHJcblx0ICAgIFwiT1RyYW5zaXRpb25cIiAgICAgOiBcIm9UcmFuc2l0aW9uRW5kXCIsXHJcblx0ICAgIFwiTW96VHJhbnNpdGlvblwiICAgOiBcInRyYW5zaXRpb25lbmRcIixcclxuXHQgICAgXCJXZWJraXRUcmFuc2l0aW9uXCI6IFwid2Via2l0VHJhbnNpdGlvbkVuZFwiXHJcblx0ICB9XHJcblxyXG5cdCAgZm9yICh0IGluIHRyYW5zaXRpb25zKXtcclxuXHQgICAgaWYgKGVsLnN0eWxlW3RdICE9PSB1bmRlZmluZWQpe1xyXG5cdCAgICAgIHJldHVybiB0cmFuc2l0aW9uc1t0XTtcclxuXHQgICAgfVxyXG5cdCAgfVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IGVsIC0gVGhlIGVsZW1lbnQgdGhhdCB3ZSB3YW50IHRvIGZpbmQgdGhlIGN1cnJlbnQgcG9zaXRpb24gaXMgcmVsYXRpdmUgdG8gdGhlIHdpbmRvdy5cclxuXHQgKiBodHRwczovL3d3dy5raXJ1cGEuY29tL2h0bWw1L2dldF9lbGVtZW50X3Bvc2l0aW9uX3VzaW5nX2phdmFzY3JpcHQuaHRtXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gZ2V0UG9zaXRpb24oZWwpIHtcclxuXHRcdHZhciB4UG9zID0gMDtcclxuXHRcdHZhciB5UG9zID0gMDtcclxuXHJcblx0XHR3aGlsZSAoZWwpIHtcclxuXHRcdFx0aWYgKGVsLnRhZ05hbWUgPT0gXCJCT0RZXCIpIHtcclxuXHRcdFx0XHQvLyBkZWFsIHdpdGggYnJvd3NlciBxdWlya3Mgd2l0aCBib2R5L3dpbmRvdy9kb2N1bWVudCBhbmQgcGFnZSBzY3JvbGxcclxuXHRcdFx0XHR2YXIgeFNjcm9sbCA9IGVsLnNjcm9sbExlZnQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQ7XHJcblx0XHRcdFx0dmFyIHlTY3JvbGwgPSBlbC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuXHJcblx0XHRcdFx0eFBvcyArPSAoZWwub2Zmc2V0TGVmdCAtIHhTY3JvbGwgKyBlbC5jbGllbnRMZWZ0KTtcclxuXHRcdFx0XHR5UG9zICs9IChlbC5vZmZzZXRUb3AgLSB5U2Nyb2xsICsgZWwuY2xpZW50VG9wKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBmb3IgYWxsIG90aGVyIG5vbi1CT0RZIGVsZW1lbnRzXHJcblx0XHRcdFx0eFBvcyArPSAoZWwub2Zmc2V0TGVmdCAtIGVsLnNjcm9sbExlZnQgKyBlbC5jbGllbnRMZWZ0KTtcclxuXHRcdFx0XHR5UG9zICs9IChlbC5vZmZzZXRUb3AgLSBlbC5zY3JvbGxUb3AgKyBlbC5jbGllbnRUb3ApO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsID0gZWwub2Zmc2V0UGFyZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHg6IHhQb3MsXHJcblx0XHRcdHk6IHlQb3NcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kIHRoZSBmb2N1c2VkIGVsZW1lbnQ7IGl0IHdpbGwgY2FsbCB0aGUgY2FsbGJhY2sgd2hlbiB0cmFuc2l0aW9uIGVuZHMuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSB0aGUgb2JqZWN0IHdoaWNoIHdpbGwgYmUgYmluZGVkIGJ5IGEgdHJhbnNpdGlvbiBlbmQgbGlzdGVuZXJcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gdGhlIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2hlbiB0cmFuc2l0aW9uIGVuZFxyXG5cdCAqL1xyXG4gIFx0ZnVuY3Rpb24gdHJhbnNpdGlvbkVuZChlbGVtZW50LCBjYWxsYmFjaykge1xyXG5cdCAgICBjb25zdCB0cmFuc2l0aW9uRXZlbnQgPSB3aGljaFRyYW5zaXRpb25FdmVudCgpO1xyXG5cdCAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHJhbnNpdGlvbkV2ZW50LCBjYWxsYmFjayk7XHJcbiAgXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERpc3BsYXkgdGhlIGVsZW1lbnQuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgZGlzcGxheWVkLlxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHNob3dFbGVtZW50KGVsZW1lbnQsIGRpc3BsYXkpIHtcclxuXHRcdGlmICh0eXBlb2YgZGlzcGxheSAhPT0gJ3VuZGVmaW5lZCcgJiYgZGlzcGxheSAhPT0gJycpIHtcclxuXHRcdFx0ZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhpZGUgdGhlIGVsZW1lbnQuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgaGlkZGVuLlxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIGhpZGVFbGVtZW50KGVsZW1lbnQpIHtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGFyZ3VtZW50c1tpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIGEgQ1NTIGNsYXNzIHRvIGFuIGVsZW1lbnQuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSBUaGUgZWxlbWVudCB0aGF0IHdpbGwgaGF2ZSB0aGUgYWRkZWQgQ1NTIGNsYXNzLlxyXG5cdCAqIEBwYXJhbSAge1N0cmluZ30gY2xhc3NOYW1lIC0gVGhlIENTUyBjbGFzcyBuYW1lXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XHJcblx0XHRpZiAoIWVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmUgYSBDU1MgY2xhc3MgZnJvbSBhbiBlbGVtZW50LlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGhhdmUgdGhlIHNwZWNpZmllZCBDU1MgY2xhc3MgcmVtb3ZlZC5cclxuXHQgKiBAcGFyYW0gIHtTdHJpbmd9IGNsYXNzTmFtZSAtIFRoZSBDU1MgY2xhc3MgbmFtZVxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xyXG5cdFx0aWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XHJcblx0XHR9XHJcblx0XHQvLyB3ZWlyZCBoYWNrIHJ1bGUgLSBodHRwczovL2Nzcy10cmlja3MuY29tL3Jlc3RhcnQtY3NzLWFuaW1hdGlvbi9cclxuXHRcdHZvaWQgZWxlbWVudC5vZmZzZXRXaWR0aDtcdFx0XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUb2dnbGUgd2hldGhlciB0byBhZGQgb3IgcmVtb3ZlIENTUyBjbGFzcy5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBhZGQgb3IgcmVtb3ZlIHRoZSBDU1MgY2xhc3MuXHJcblx0ICogQHBhcmFtICB7U3RyaW5nfSBjbGFzc05hbWUgLSBUaGUgQ1NTIGNsYXNzIG5hbWVcclxuXHQgKi9cclxuXHRmdW5jdGlvbiB0b2dnbGVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIHtcclxuXHRcdGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XHJcblx0XHRcdHJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcbiAgXHRcdH0gZWxzZSB7XHJcbiAgXHRcdFx0YWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKTtcdFx0XHRcclxuICBcdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVG9nZ2xlIHdoZXRoZXIgdG8gYWRkIG9yIHJlbW92ZSBDU1MgY2xhc3MuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYWRkIG9yIHJlbW92ZSB0aGUgQ1NTIGNsYXNzLlxyXG5cdCAqIEBwYXJhbSAge1N0cmluZ30gY2xhc3NOYW1lIC0gVGhlIENTUyBjbGFzcyBuYW1lXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gdG9nZ2xlQ2xhc3NGb3JBbmltYXRpb24oZWxlbWVudCwgY2xhc3NOYW1lKSB7XHJcblx0XHRpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xyXG5cdFx0XHRyZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpO1xyXG4gIFx0XHR9XHJcbiAgXHRcdGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBWYWxpZGF0ZSBpZiB1c2VyIGlucHV0IGlzIGEgc3RyaW5nLlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIHRleHRmaWVsZCB0aGF0IHdpbGwgYmUgdmFsaWRhdGVkLlxyXG5cdCAqL1xyXG4gIFx0ZnVuY3Rpb24gdmFsaWRhdGVJZklucHV0SXNEb3RhSGVyb05hbWUoaW1hZ2UsIHRleHRmaWVsZCkge1xyXG5cdFx0aWYgKGltYWdlLm5hbWUudG9Mb3dlckNhc2VBbmRSZW1vdmVJbGxlZ2FsQ2hhcmFjdGVycygpID09PSB0ZXh0ZmllbGQudmFsdWUudG9Mb3dlckNhc2VBbmRSZW1vdmVJbGxlZ2FsQ2hhcmFjdGVycygpKSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG4gIFx0fVxyXG5cclxuICBcdHJldHVybiB7XHJcbiAgXHRcdHRyYW5zaXRpb25FbmQsXHJcbiAgXHRcdGdldFBvc2l0aW9uLFxyXG4gIFx0XHRzaG93RWxlbWVudCxcclxuICBcdFx0aGlkZUVsZW1lbnQsXHJcbiAgXHRcdGFkZENsYXNzLFxyXG4gIFx0XHRyZW1vdmVDbGFzcyxcclxuICBcdFx0dG9nZ2xlQ2xhc3MsXHJcbiAgXHRcdHRvZ2dsZUNsYXNzRm9yQW5pbWF0aW9uLFxyXG4gIFx0XHR2YWxpZGF0ZUlmSW5wdXRJc0RvdGFIZXJvTmFtZVxyXG4gIFx0fVxyXG59KSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvaGVscGVyLmpzXG4gKiovIiwiLyoqXHJcbiAqIFRoaXMgaXMgdGhlIHNsaWRlciB0aGF0IHdpbGwgYmUgZGlzcGxheWVkIGFmdGVyIHRoZSBjb3VudGRvd24uIEl0IHdpbGwgZGlzcGxheSBhbiBlbmRsZXNzIHN0cmVhbSBvZiBkb3RhIGltYWdlcyB0aGF0IGFyZSByZXRyaWV2ZWQgdmlhIERvdGEgQVBJLlxyXG4gKiBJdCB3aWxsIGNvbnN0YW50bHkgdHJhbnNpdGlvbiB0byB0aGUgbGVmdCB1bnRpbCBpdCByZWFjaGVzIHRvIHRoZSBzdGFydGluZyBwb3NpdGlvbiBvZiB0aGUgcGFuZWwgdGhhdCBob2xkcyB0aGUgaW1hZ2VzLCB3aGljaCBpbiB0aGF0IGNhc2UgdGhlIGdhbWVcclxuICogbG9zZS4gXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHRcclxuXHRjb25zdCBIZWxwZXIgPSByZXF1aXJlKCcuLi9oZWxwZXIuanMnKTtcclxuXHRjb25zdCBTTElERV9EVVJBVElPTiA9IDEwO1xyXG5cdGNvbnN0IFdBUk5JTkdfVEhSRVNIT0xEID0gMzA7XHJcblx0Y29uc3QgaW1hZ2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VzJylbMF07XHJcblx0Y29uc3QgaW1hZ2VzUGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZXNfcGFuZWwnKVswXTtcclxuXHRjb25zdCBmYWlsQmFja2dyb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ZhaWxfYmFja2dyb3VuZCcpWzBdO1xyXG5cclxuXHRmdW5jdGlvbiBzbGlkZXIoc2xpZGVyKSB7XHJcblx0XHR0aGlzLnNsaWRlciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoc2xpZGVyKVswXTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEdldCBpbWFnZXMgZnJvbSBkb3RhIEFQSSwgYXBwZW5kaW5nIGl0IHRvIGEgbGlzdCBvZiBnZW5lcmF0ZWQgaW1hZ2UgRE9NIGVsZW1lbnQuXHJcblx0ICovXHJcblx0c2xpZGVyLnByb3RvdHlwZS5nZXRJbWFnZXMgPSBmdW5jdGlvbigpIHtcclxuXHRcdC8vIFRPRE8gLSBHZXQgbGlzdCBvZiBkb3RhIGltYWdlcyB1c2luZyBBSkFYLCBsb29rIHVwIFByb21pc2VzIGFuZCBHZW5lcmF0b3JzXHJcblx0XHQvLyBQcm9taXNlcyAtIGFzeWNocm9ub3VzIGNhbGxzLCBkbyB0aGlzLCB0aGVuIGRvIHRoaXNcclxuXHRcdC8vIEdlbmVyYXRvcnMgLSBzb21ldGhpbmcgYWJvdXQgd2FpdGluZyBpbmRlZmluaXRlbHkgdW50aWwgaXQgZ2V0cyBpdCAodXNlcyB0aGUga2V5d29yZCAneWllbGQnKVxyXG5cdFx0Ly8gQVBQQVJFTlRMWSBHRU5FUkFUT1JTIElTIEEgSEFDSywgRVM3ICdBU1lOQycgS0VZV09SRCBJUyBUSEUgTEVHSVQgV0FZIE9SIFNPTUUgU0hJVDsgSSBUSElOSz8gXHJcblx0XHQvLyBVc2luZyBYTUxIdHRwUmVxdWVzdCBvbiBhIHJlbW90ZSBzZXJ2ZXIgZ2l2ZXMgeW91ICdBY2Nlc3MtY29udHJvbC1hbGxvdy1vcmlnaW4nIG1pc3NpbmcgZXJyb3I7IGxvb2sgdXAgQ09SUzsgbWF5YmUgY3JlYXRlIGEgUHl0aG9uIHNjcmlwdCBpbnN0ZWFkXHJcblx0XHRsZXQgZG90YUhlcm9lc0pzb247XHJcblx0XHR2YXIgb1JlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cdFx0b1JlcS5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpIHtcclxuXHRcdCAgICBpZiAob1JlcS5yZWFkeVN0YXRlID09PSBYTUxIdHRwUmVxdWVzdC5ET05FKSB7XHJcblx0XHQgICAgICAgIGRvdGFIZXJvZXNKc29uID0gSlNPTi5wYXJzZShvUmVxLnJlc3BvbnNlVGV4dCk7XHJcblx0XHQgICAgICAgIGNvbnNvbGUubG9nKGRvdGFIZXJvZXNKc29uKTtcclxuXHRcdCAgICAgICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblx0XHRcdFx0Y29uc3QgaGVyb2VzID0gZG90YUhlcm9lc0pzb24ucmVzdWx0Lmhlcm9lcztcclxuXHRcdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGhlcm9lcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRcdFx0Y29uc3QgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuXHRcdFx0XHRcdGltYWdlLmNsYXNzTmFtZSA9ICdpbWFnZSc7XHJcblx0XHRcdFx0XHRpbWFnZS5zcmMgPSAnaHR0cDovL2Nkbi5kb3RhMi5jb20vYXBwcy9kb3RhMi9pbWFnZXMvaGVyb2VzLycgKyBoZXJvZXNbaV0ubmFtZS5yZXBsYWNlKCducGNfZG90YV9oZXJvXycsICcnKSArICdfbGcucG5nJztcclxuXHRcdFx0XHRcdC8vSXQgc2hvdWxkIGJlIFR1c2thciwgbm90IFR1c2shXHJcblx0XHRcdFx0XHRpZiAoaGVyb2VzW2ldLmxvY2FsaXplZF9uYW1lID09PSAnVHVzaycpIHtcclxuXHRcdFx0XHRcdFx0aGVyb2VzW2ldLmxvY2FsaXplZF9uYW1lID0gJ1R1c2thcic7XHJcblx0XHRcdFx0XHR9XHJcblx0XHRcdFx0XHRpbWFnZS5uYW1lID0gaGVyb2VzW2ldLmxvY2FsaXplZF9uYW1lO1xyXG5cdFx0XHRcdFx0ZnJhZ21lbnQuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRpbWFnZXMuYXBwZW5kQ2hpbGQoZnJhZ21lbnQpO1xyXG5cdFx0ICAgIH1cclxuXHRcdH1cclxuXHRcdC8vb1JlcS5vcGVuKCdHRVQnLCAnaHR0cHM6Ly9hcGkuc3RlYW1wb3dlcmVkLmNvbS9JRWNvbkRPVEEyXzU3MC9HZXRIZXJvZXMvdjAwMDEvP2tleT02QzFDRjc2QzkwNzY4Mzg4NjE4RjM0OEJCNzNFRTAxNSZsYW5ndWFnZT1lbl91cyZmb3JtYXQ9SlNPTicsIHRydWUpO1xyXG5cdFx0b1JlcS5vcGVuKCdHRVQnLCAnaHR0cDovL2xpbG1vcnRhbC10ZXN0LmFwaWdlZS5uZXQvZ2V0ZG90YWhlcm9lcz9rZXk9NkMxQ0Y3NkM5MDc2ODM4ODYxOEYzNDhCQjczRUUwMTUmbGFuZ3VhZ2U9ZW5fdXMmZm9ybWF0PUpTT04nKTtcclxuXHRcdC8vb1JlcS5yZXNwb25zZVR5cGUgPSAnanNvbic7XHJcblx0XHRvUmVxLnNlbmQoKTtcclxuXHRcdC8vY29uc29sZS5sb2cob1JlcS5yZXNwb25zZVRleHQpO1xyXG5cdFx0Ly8gVE9ETzogRml4IHRoaXMsIGl0J3MgYmVlbiBjYWxsZWQgZXZlcnl0aW1lIHlvdSBzdGFydCBhIG5ldyBnYW1lIHdoaWNoIGlzIHZlcnkgaW5lZmZpY2llbnRcclxuXHRcdC8vY29uc3QgZG90YUhlcm9lc0pzb24gPSBvUmVxLnJlc3BvbnNlOy8vSlNPTi5wYXJzZSh0aGlzLnN0dWJEb3RhSGVyb2VzKCkpO1xyXG5cdFx0Ly9jb25zb2xlLmxvZyhkb3RhSGVyb2VzSnNvbik7XHJcblxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVHJhbnNpdGlvbiBlZmZlY3Qgb24gdGhlIGltYWdlcy5cclxuXHQgKi9cclxuXHRzbGlkZXIucHJvdG90eXBlLnNsaWRlID0gZnVuY3Rpb24oKSB7XHJcblx0XHRjb25zdCBzY3JlZW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCB8fCBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoO1xyXG5cdCAgICBjb25zdCBkZWZhdWx0V2lkdGggPSAoc2NyZWVuV2lkdGggLSBpbWFnZXNQYW5lbC5vZmZzZXRXaWR0aC8gMikgKyBpbWFnZXNQYW5lbC5vZmZzZXRXaWR0aDtcclxuXHQgICAgY29uc3Qgd2FybmluZ1dpZHRoID0gZGVmYXVsdFdpZHRoICogV0FSTklOR19USFJFU0hPTEQgLyAxMDA7XHJcblx0ICAgIGxldCB0aW1lcjtcclxuXHJcblx0XHRpbWFnZXMuc3R5bGUubWFyZ2luTGVmdCA9ICcwJztcclxuXHQgICAgaW1hZ2VzLnN0eWxlLnRyYW5zaXRpb24gPSBTTElERV9EVVJBVElPTiArICdzIGxpbmVhcic7XHJcblx0XHRIZWxwZXIucmVtb3ZlQ2xhc3MoaW1hZ2VzUGFuZWwsICd3YXJuaW5nX2FuaW1hdGlvbicpO1xyXG5cclxuXHQgICAgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuXHQgICAgXHRpZiAoSGVscGVyLmdldFBvc2l0aW9uKGltYWdlcykueCA8PSB3YXJuaW5nV2lkdGgpIHtcclxuXHRcdFx0XHRIZWxwZXIuYWRkQ2xhc3MoaW1hZ2VzUGFuZWwsICd3YXJuaW5nX2FuaW1hdGlvbicpO1xyXG5cdFx0XHRcdGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG5cdCAgICBcdH1cclxuXHQgICAgfSwgMTAwMCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbml0aWFsaXplIHRoZSBzbGlkZXIgdHJhbnNpdGlvbiwgZGlzcGxheSB0aGUgZmFpbCBwYW5lbCB3aGVuIHRoZSB0cmFuc2l0aW9uIGVuZHMuXHJcblx0ICovXHJcblx0c2xpZGVyLnByb3RvdHlwZS5zdGFydFNsaWRlciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYgKGltYWdlcy5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0dGhpcy5nZXRJbWFnZXMoKTtcclxuXHRcdH1cclxuXHRcdEhlbHBlci5zaG93RWxlbWVudCh0aGlzLnNsaWRlcik7XHJcblx0XHR0aGlzLnNsaWRlKCk7XHJcblx0XHRIZWxwZXIudHJhbnNpdGlvbkVuZChpbWFnZXMsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdyZXN1bHRfdGV4dCcpWzBdLmlubmVySFRNTCA9ICdZb3UgbG9zZS4uLic7XHJcblx0XHRcdEhlbHBlci5zaG93RWxlbWVudChmYWlsQmFja2dyb3VuZCk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8vIFRlbXBvcmFyeSB1bnRpbCBhbiBhY3R1YWwgY2FsbCB0byBBUEkgaXMgbWFkZVxyXG5cdHNsaWRlci5wcm90b3R5cGUuc3R1YkRvdGFIZXJvZXMgPSBmdW5jdGlvbigpIHtcclxuXHRcdHJldHVybiBge1xyXG5cdFx0XCJyZXN1bHRcIjp7XHJcblx0XHRcImhlcm9lc1wiOltcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19hbnRpbWFnZVwiLFxyXG5cdFx0XCJpZFwiOjEsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJBbnRpLU1hZ2VcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19heGVcIixcclxuXHRcdFwiaWRcIjoyLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiQXhlXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fYmFuZVwiLFxyXG5cdFx0XCJpZFwiOjMsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJCYW5lXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fYmxvb2RzZWVrZXJcIixcclxuXHRcdFwiaWRcIjo0LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiQmxvb2RzZWVrZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19jcnlzdGFsX21haWRlblwiLFxyXG5cdFx0XCJpZFwiOjUsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJDcnlzdGFsIE1haWRlblwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2Ryb3dfcmFuZ2VyXCIsXHJcblx0XHRcImlkXCI6NixcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkRyb3cgUmFuZ2VyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fZWFydGhzaGFrZXJcIixcclxuXHRcdFwiaWRcIjo3LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiRWFydGhzaGFrZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19qdWdnZXJuYXV0XCIsXHJcblx0XHRcImlkXCI6OCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkp1Z2dlcm5hdXRcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19taXJhbmFcIixcclxuXHRcdFwiaWRcIjo5LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiTWlyYW5hXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fbmV2ZXJtb3JlXCIsXHJcblx0XHRcImlkXCI6MTEsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJTaGFkb3cgRmllbmRcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19tb3JwaGxpbmdcIixcclxuXHRcdFwiaWRcIjoxMCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIk1vcnBobGluZ1wiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3BoYW50b21fbGFuY2VyXCIsXHJcblx0XHRcImlkXCI6MTIsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJQaGFudG9tIExhbmNlclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3B1Y2tcIixcclxuXHRcdFwiaWRcIjoxMyxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlB1Y2tcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19wdWRnZVwiLFxyXG5cdFx0XCJpZFwiOjE0LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiUHVkZ2VcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19yYXpvclwiLFxyXG5cdFx0XCJpZFwiOjE1LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiUmF6b3JcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19zYW5kX2tpbmdcIixcclxuXHRcdFwiaWRcIjoxNixcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlNhbmQgS2luZ1wiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3N0b3JtX3NwaXJpdFwiLFxyXG5cdFx0XCJpZFwiOjE3LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiU3Rvcm0gU3Bpcml0XCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fc3ZlblwiLFxyXG5cdFx0XCJpZFwiOjE4LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiU3ZlblwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3RpbnlcIixcclxuXHRcdFwiaWRcIjoxOSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlRpbnlcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb192ZW5nZWZ1bHNwaXJpdFwiLFxyXG5cdFx0XCJpZFwiOjIwLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiVmVuZ2VmdWwgU3Bpcml0XCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fd2luZHJ1bm5lclwiLFxyXG5cdFx0XCJpZFwiOjIxLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiV2luZHJhbmdlclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3p1dXNcIixcclxuXHRcdFwiaWRcIjoyMixcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlpldXNcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19rdW5ra2FcIixcclxuXHRcdFwiaWRcIjoyMyxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkt1bmtrYVwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2xpbmFcIixcclxuXHRcdFwiaWRcIjoyNSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkxpbmFcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19saWNoXCIsXHJcblx0XHRcImlkXCI6MzEsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJMaWNoXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fbGlvblwiLFxyXG5cdFx0XCJpZFwiOjI2LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiTGlvblwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3NoYWRvd19zaGFtYW5cIixcclxuXHRcdFwiaWRcIjoyNyxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlNoYWRvdyBTaGFtYW5cIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19zbGFyZGFyXCIsXHJcblx0XHRcImlkXCI6MjgsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJTbGFyZGFyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fdGlkZWh1bnRlclwiLFxyXG5cdFx0XCJpZFwiOjI5LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiVGlkZWh1bnRlclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3dpdGNoX2RvY3RvclwiLFxyXG5cdFx0XCJpZFwiOjMwLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiV2l0Y2ggRG9jdG9yXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fcmlraVwiLFxyXG5cdFx0XCJpZFwiOjMyLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiUmlraVwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2VuaWdtYVwiLFxyXG5cdFx0XCJpZFwiOjMzLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiRW5pZ21hXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fdGlua2VyXCIsXHJcblx0XHRcImlkXCI6MzQsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJUaW5rZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19zbmlwZXJcIixcclxuXHRcdFwiaWRcIjozNSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlNuaXBlclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX25lY3JvbHl0ZVwiLFxyXG5cdFx0XCJpZFwiOjM2LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiTmVjcm9waG9zXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fd2FybG9ja1wiLFxyXG5cdFx0XCJpZFwiOjM3LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiV2FybG9ja1wiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2JlYXN0bWFzdGVyXCIsXHJcblx0XHRcImlkXCI6MzgsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJCZWFzdG1hc3RlclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3F1ZWVub2ZwYWluXCIsXHJcblx0XHRcImlkXCI6MzksXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJRdWVlbiBvZiBQYWluXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fdmVub21hbmNlclwiLFxyXG5cdFx0XCJpZFwiOjQwLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiVmVub21hbmNlclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2ZhY2VsZXNzX3ZvaWRcIixcclxuXHRcdFwiaWRcIjo0MSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkZhY2VsZXNzIFZvaWRcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19za2VsZXRvbl9raW5nXCIsXHJcblx0XHRcImlkXCI6NDIsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJXcmFpdGggS2luZ1wiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2RlYXRoX3Byb3BoZXRcIixcclxuXHRcdFwiaWRcIjo0MyxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkRlYXRoIFByb3BoZXRcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19waGFudG9tX2Fzc2Fzc2luXCIsXHJcblx0XHRcImlkXCI6NDQsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJQaGFudG9tIEFzc2Fzc2luXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fcHVnbmFcIixcclxuXHRcdFwiaWRcIjo0NSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlB1Z25hXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fdGVtcGxhcl9hc3Nhc3NpblwiLFxyXG5cdFx0XCJpZFwiOjQ2LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiVGVtcGxhciBBc3Nhc3NpblwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3ZpcGVyXCIsXHJcblx0XHRcImlkXCI6NDcsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJWaXBlclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2x1bmFcIixcclxuXHRcdFwiaWRcIjo0OCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkx1bmFcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19kcmFnb25fa25pZ2h0XCIsXHJcblx0XHRcImlkXCI6NDksXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJEcmFnb24gS25pZ2h0XCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fZGF6emxlXCIsXHJcblx0XHRcImlkXCI6NTAsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJEYXp6bGVcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19yYXR0bGV0cmFwXCIsXHJcblx0XHRcImlkXCI6NTEsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJDbG9ja3dlcmtcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19sZXNocmFjXCIsXHJcblx0XHRcImlkXCI6NTIsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJMZXNocmFjXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fZnVyaW9uXCIsXHJcblx0XHRcImlkXCI6NTMsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJOYXR1cmUncyBQcm9waGV0XCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fbGlmZV9zdGVhbGVyXCIsXHJcblx0XHRcImlkXCI6NTQsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJMaWZlc3RlYWxlclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2Rhcmtfc2VlclwiLFxyXG5cdFx0XCJpZFwiOjU1LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiRGFyayBTZWVyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fY2xpbmt6XCIsXHJcblx0XHRcImlkXCI6NTYsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJDbGlua3pcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19vbW5pa25pZ2h0XCIsXHJcblx0XHRcImlkXCI6NTcsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJPbW5pa25pZ2h0XCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fZW5jaGFudHJlc3NcIixcclxuXHRcdFwiaWRcIjo1OCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkVuY2hhbnRyZXNzXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9faHVza2FyXCIsXHJcblx0XHRcImlkXCI6NTksXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJIdXNrYXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19uaWdodF9zdGFsa2VyXCIsXHJcblx0XHRcImlkXCI6NjAsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJOaWdodCBTdGFsa2VyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fYnJvb2Rtb3RoZXJcIixcclxuXHRcdFwiaWRcIjo2MSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkJyb29kbW90aGVyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fYm91bnR5X2h1bnRlclwiLFxyXG5cdFx0XCJpZFwiOjYyLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiQm91bnR5IEh1bnRlclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3dlYXZlclwiLFxyXG5cdFx0XCJpZFwiOjYzLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiV2VhdmVyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9famFraXJvXCIsXHJcblx0XHRcImlkXCI6NjQsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJKYWtpcm9cIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19iYXRyaWRlclwiLFxyXG5cdFx0XCJpZFwiOjY1LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiQmF0cmlkZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19jaGVuXCIsXHJcblx0XHRcImlkXCI6NjYsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJDaGVuXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fc3BlY3RyZVwiLFxyXG5cdFx0XCJpZFwiOjY3LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiU3BlY3RyZVwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2Rvb21fYnJpbmdlclwiLFxyXG5cdFx0XCJpZFwiOjY5LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiRG9vbVwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2FuY2llbnRfYXBwYXJpdGlvblwiLFxyXG5cdFx0XCJpZFwiOjY4LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiQW5jaWVudCBBcHBhcml0aW9uXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fdXJzYVwiLFxyXG5cdFx0XCJpZFwiOjcwLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiVXJzYVwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3NwaXJpdF9icmVha2VyXCIsXHJcblx0XHRcImlkXCI6NzEsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJTcGlyaXQgQnJlYWtlclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2d5cm9jb3B0ZXJcIixcclxuXHRcdFwiaWRcIjo3MixcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkd5cm9jb3B0ZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19hbGNoZW1pc3RcIixcclxuXHRcdFwiaWRcIjo3MyxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkFsY2hlbWlzdFwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2ludm9rZXJcIixcclxuXHRcdFwiaWRcIjo3NCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkludm9rZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19zaWxlbmNlclwiLFxyXG5cdFx0XCJpZFwiOjc1LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiU2lsZW5jZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19vYnNpZGlhbl9kZXN0cm95ZXJcIixcclxuXHRcdFwiaWRcIjo3NixcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIk91dHdvcmxkIERldm91cmVyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fbHljYW5cIixcclxuXHRcdFwiaWRcIjo3NyxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkx5Y2FuXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fYnJld21hc3RlclwiLFxyXG5cdFx0XCJpZFwiOjc4LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiQnJld21hc3RlclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3NoYWRvd19kZW1vblwiLFxyXG5cdFx0XCJpZFwiOjc5LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiU2hhZG93IERlbW9uXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fbG9uZV9kcnVpZFwiLFxyXG5cdFx0XCJpZFwiOjgwLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiTG9uZSBEcnVpZFwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2NoYW9zX2tuaWdodFwiLFxyXG5cdFx0XCJpZFwiOjgxLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiQ2hhb3MgS25pZ2h0XCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fbWVlcG9cIixcclxuXHRcdFwiaWRcIjo4MixcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIk1lZXBvXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fdHJlYW50XCIsXHJcblx0XHRcImlkXCI6ODMsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJUcmVhbnQgUHJvdGVjdG9yXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fb2dyZV9tYWdpXCIsXHJcblx0XHRcImlkXCI6ODQsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJPZ3JlIE1hZ2lcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb191bmR5aW5nXCIsXHJcblx0XHRcImlkXCI6ODUsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJVbmR5aW5nXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fcnViaWNrXCIsXHJcblx0XHRcImlkXCI6ODYsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJSdWJpY2tcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19kaXNydXB0b3JcIixcclxuXHRcdFwiaWRcIjo4NyxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkRpc3J1cHRvclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX255eF9hc3Nhc3NpblwiLFxyXG5cdFx0XCJpZFwiOjg4LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiTnl4IEFzc2Fzc2luXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fbmFnYV9zaXJlblwiLFxyXG5cdFx0XCJpZFwiOjg5LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiTmFnYSBTaXJlblwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2tlZXBlcl9vZl90aGVfbGlnaHRcIixcclxuXHRcdFwiaWRcIjo5MCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIktlZXBlciBvZiB0aGUgTGlnaHRcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb193aXNwXCIsXHJcblx0XHRcImlkXCI6OTEsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJJb1wiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3Zpc2FnZVwiLFxyXG5cdFx0XCJpZFwiOjkyLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiVmlzYWdlXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fc2xhcmtcIixcclxuXHRcdFwiaWRcIjo5MyxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlNsYXJrXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fbWVkdXNhXCIsXHJcblx0XHRcImlkXCI6OTQsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJNZWR1c2FcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb190cm9sbF93YXJsb3JkXCIsXHJcblx0XHRcImlkXCI6OTUsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJUcm9sbCBXYXJsb3JkXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fY2VudGF1clwiLFxyXG5cdFx0XCJpZFwiOjk2LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiQ2VudGF1ciBXYXJydW5uZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19tYWduYXRhdXJcIixcclxuXHRcdFwiaWRcIjo5NyxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIk1hZ251c1wiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3NocmVkZGVyXCIsXHJcblx0XHRcImlkXCI6OTgsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJUaW1iZXJzYXdcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19icmlzdGxlYmFja1wiLFxyXG5cdFx0XCJpZFwiOjk5LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiQnJpc3RsZWJhY2tcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb190dXNrXCIsXHJcblx0XHRcImlkXCI6MTAwLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiVHVza1wiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3NreXdyYXRoX21hZ2VcIixcclxuXHRcdFwiaWRcIjoxMDEsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJTa3l3cmF0aCBNYWdlXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fYWJhZGRvblwiLFxyXG5cdFx0XCJpZFwiOjEwMixcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkFiYWRkb25cIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19lbGRlcl90aXRhblwiLFxyXG5cdFx0XCJpZFwiOjEwMyxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkVsZGVyIFRpdGFuXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fbGVnaW9uX2NvbW1hbmRlclwiLFxyXG5cdFx0XCJpZFwiOjEwNCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkxlZ2lvbiBDb21tYW5kZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19lbWJlcl9zcGlyaXRcIixcclxuXHRcdFwiaWRcIjoxMDYsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJFbWJlciBTcGlyaXRcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19lYXJ0aF9zcGlyaXRcIixcclxuXHRcdFwiaWRcIjoxMDcsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJFYXJ0aCBTcGlyaXRcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb190ZXJyb3JibGFkZVwiLFxyXG5cdFx0XCJpZFwiOjEwOSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlRlcnJvcmJsYWRlXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fcGhvZW5peFwiLFxyXG5cdFx0XCJpZFwiOjExMCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlBob2VuaXhcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19vcmFjbGVcIixcclxuXHRcdFwiaWRcIjoxMTEsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJPcmFjbGVcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb190ZWNoaWVzXCIsXHJcblx0XHRcImlkXCI6MTA1LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiVGVjaGllc1wiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3dpbnRlcl93eXZlcm5cIixcclxuXHRcdFwiaWRcIjoxMTIsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJXaW50ZXIgV3l2ZXJuXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fYXJjX3dhcmRlblwiLFxyXG5cdFx0XCJpZFwiOjExMyxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkFyYyBXYXJkZW5cIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19hYnlzc2FsX3VuZGVybG9yZFwiLFxyXG5cdFx0XCJpZFwiOjEwOCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlVuZGVybG9yZFwiXHJcblx0XHR9XHJcblx0XHRdXHJcblx0XHQsXHJcblx0XHRcInN0YXR1c1wiOjIwMCxcclxuXHRcdFwiY291bnRcIjoxMTJcclxuXHRcdH1cclxuXHRcdH1gXHJcblx0fVxyXG5cclxuXHRyZXR1cm4gc2xpZGVyO1xyXG59KSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvY29tcG9uZW50cy9zbGlkZXIuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0ZnVuY3Rpb24gVGV4dGZpZWxkKGlkLCBidXR0b24pIHtcclxuXHRcdHRoaXMudGV4dGZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG5cdFx0dGhpcy5idXR0b24gPSBidXR0b247XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBTdWJtaXQgaWYgdXNlciBwcmVzcyAnZW50ZXInLlxyXG5cdCAqL1xyXG5cdFRleHRmaWVsZC5wcm90b3R5cGUuc3VibWl0ID0gZnVuY3Rpb24oKSB7XHJcblx0XHR2YXIgc2VsZiA9IHRoaXM7XHJcblx0XHR0aGlzLnRleHRmaWVsZC5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGZ1bmN0aW9uKGV2ZW50KSB7XHJcblx0XHRcdGlmIChldmVudC5rZXlDb2RlID09PSAxMykge1xyXG5cdFx0XHRcdC8vIExPTCBTRUxGLkJVVFRPTi5CVVRUT04/Pz8gRklYXHJcblx0XHRcdFx0c2VsZi5idXR0b24uYnV0dG9uLmNsaWNrKCk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIFRleHRmaWVsZDtcclxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2NvbXBvbmVudHMvdGV4dGZpZWxkLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==