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
	
		var startButton = new Button('startButton');
		startButton.initStart();
	
		var failButton = new Button('failButton');
		failButton.initFail();
	
		var submitButton = new Button('submitButton');
		submitButton.submit();
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
		// THIS IS TOO SHIT, ITS TOO DEPENDENT ON HARD CODED VARIABLES; CAN ANGULAR 2 DEPENDENCY INJECTION HELP OR OTHER WAY VANILLA JS CAN HELP? I KNOW
		// REACT CAN WITH ITS COMPONENT BASED LIBRARY; WHAT ABOUT EMBER? WHY ARE PEOPLE DITCHING EMBER? TOO OLD? KNOCKOUT MVVM HELPS??
		var submitTextfield = document.getElementById('submitTextfield');
		var failBackground = document.getElementsByClassName('failBackground')[0];
		var images = document.getElementsByClassName('images')[0];
		var image = document.getElementsByClassName('image');
		var instructionPanel = document.getElementsByClassName('instructionPanel')[0];
		var addPoints = document.getElementsByClassName('addPoints')[0];
		var wrapper = document.getElementsByClassName('wrapper')[0];
		var sliderPanel = document.getElementsByClassName('sliderPanel')[0];
		var highScore = document.getElementsByClassName('highScore');
	
		function Button(id) {
			this.button = document.getElementById(id);
			this.countdownPanel = new CountdownPanel('countdownPanel');
			this.slider = new Slider('sliderPanel');
		};
	
		/**
	  * When clicked, start the countdown panel.
	  * @param  {Integer} Countdown number
	  * @param  {Function} The function that will be called when the countdown number reaches 0.
	  * @return {[type]}
	  */
		// THIS PROTOTYPE OR MODULE PATTERN IS BETTER??? WHAT ABOUT PUB/SUB IMPLEMENTATION?
		// IF HAVE TIME, SEE IF ES6 ARROW FUNCTION IS MORE READABLE OR NOT
		// AND ALL THIS METHODS...MAYBE SEPERATE IT INTO DIFFERENT COMPONENTS?
		Button.prototype.startCountdownForSlider = function (countdownNumber, callback) {
			// Is using self okay? Cause theres window.self...but will I ever use that???
			var self = this;
			this.button.addEventListener('click', function () {
				callback();
				Helper.toggleClassForAnimation(wrapper, 'grayscaleBackgroundAnimation');
				self.countdownPanel.startCountdownTimer(countdownNumber, self.slider.startSlider.bind(self.slider));
			});
		};
	
		/**
	  * When clicked, check if the user input is valid; if it is valid, it will remove an image and add some points, else display a fail animation.
	  */
		Button.prototype.submit = function () {
			var imageIteration = 0;
			this.button.addEventListener('click', function () {
				if (Helper.validateIfInputIsDotaHeroName(image[imageIteration], self.submitTextfield)) {
					Helper.hideElement(image[imageIteration]);
					imageIteration++;
					addPoints.innerHTML = "+100";
					for (var i = 0; i < highScore.length; i++) {
						highScore[i].innerHTML = parseInt(highScore[i].innerHTML) + 100;
					}
					Helper.toggleClassForAnimation(addPoints, 'addPointsAnimation');
					Helper.removeClass(self.submitTextfield, 'shakeTextfieldAnimation');
				} else {
					Helper.addClass(self.submitTextfield, 'shakeTextfieldAnimation');
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
			console.log(image.name.toLowerCaseAndRemoveIllegalCharacters());
			console.log(textfield.value.toLowerCaseAndRemoveIllegalCharacters());
			if (image.name.toLowerCaseAndRemoveIllegalCharacters() === textfield.value.toLowerCaseAndRemoveIllegalCharacters()) {
				return true;
			}
			return false;
		}
	
		String.prototype.toLowerCaseAndRemoveIllegalCharacters = function () {
			var lowerCaseValue = this.toLowerCase();
			return lowerCaseValue.replace(ILLEGAL_CHARACTERS, '');
		};
	
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
		var imagesPanel = document.getElementsByClassName('imagesPanel')[0];
		var failBackground = document.getElementsByClassName('failBackground')[0];
	
		function slider(slider) {
			this.slider = document.getElementsByClassName(slider)[0];
		}
	
		/**
	  * Get images from dota API; as well as appending it to a list of image DOM.
	  */
		slider.prototype.getImages = function () {
			// TODO - Get list of dota images using AJAX, look up Promises and Generators
			// Promises - asychronous calls, do this, then do this
			// Generators - something about waiting indefinitely until it gets it (uses the keyword 'yield')
			// APPARENTLY GENERATORS IS A HACK, ES7 'ASYNC' KEYWORD IS THE LEGIT WAY OR SOME SHIT; I THINK? 
	
			/*var oReq = new XMLHttpRequest();
	  oReq.onload = function (e) {
	      console.log(e.target.response.message);
	  };
	  oReq.open('GET', 'https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v0001/?key=6C1CF76C90768388618F348BB73EE015&language=en_us&format=JSON', true);
	  oReq.responseType = 'json';
	  oReq.send();*/
	
			var dotaHeroesJson = JSON.parse(this.stubDotaHeroes());
			var fragment = document.createDocumentFragment();
			var heroes = dotaHeroesJson.result.heroes;
			for (var i = 0; i < heroes.length; i++) {
				var image = document.createElement('img');
				image.className = 'image';
				image.src = '../img/divine_rapier_icon.png';
				image.name = heroes[i].localized_name;
				fragment.appendChild(image);
			}
			images.appendChild(fragment);
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
			Helper.removeClass(imagesPanel, 'warningAnimation');
	
			timer = setInterval(function () {
				if (Helper.getPosition(images).x <= warningWidth) {
					Helper.addClass(imagesPanel, 'warningAnimation');
					clearInterval(timer);
				}
			}, 1000);
		};
	
		/**
	  * Initialize the slider transition, display the fail panel when the transition ends.
	  */
		slider.prototype.startSlider = function () {
			this.getImages();
			Helper.showElement(this.slider);
			this.slide();
			Helper.transitionEnd(images, function () {
				Helper.showElement(failBackground);
			});
		};
	
		slider.prototype.stubDotaHeroes = function () {
			return '{\n\t\t"result":{\n\t\t"heroes":[\n\t\t{\n\t\t"name":"npc_dota_hero_antimage",\n\t\t"id":1,\n\t\t"localized_name":"Anti-Mage"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_axe",\n\t\t"id":2,\n\t\t"localized_name":"Axe"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_bane",\n\t\t"id":3,\n\t\t"localized_name":"Bane"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_bloodseeker",\n\t\t"id":4,\n\t\t"localized_name":"Bloodseeker"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_crystal_maiden",\n\t\t"id":5,\n\t\t"localized_name":"Crystal Maiden"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_drow_ranger",\n\t\t"id":6,\n\t\t"localized_name":"Drow Ranger"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_earthshaker",\n\t\t"id":7,\n\t\t"localized_name":"Earthshaker"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_juggernaut",\n\t\t"id":8,\n\t\t"localized_name":"Juggernaut"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_mirana",\n\t\t"id":9,\n\t\t"localized_name":"Mirana"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_nevermore",\n\t\t"id":11,\n\t\t"localized_name":"Shadow Fiend"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_morphling",\n\t\t"id":10,\n\t\t"localized_name":"Morphling"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_phantom_lancer",\n\t\t"id":12,\n\t\t"localized_name":"Phantom Lancer"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_puck",\n\t\t"id":13,\n\t\t"localized_name":"Puck"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_pudge",\n\t\t"id":14,\n\t\t"localized_name":"Pudge"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_razor",\n\t\t"id":15,\n\t\t"localized_name":"Razor"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_sand_king",\n\t\t"id":16,\n\t\t"localized_name":"Sand King"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_storm_spirit",\n\t\t"id":17,\n\t\t"localized_name":"Storm Spirit"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_sven",\n\t\t"id":18,\n\t\t"localized_name":"Sven"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_tiny",\n\t\t"id":19,\n\t\t"localized_name":"Tiny"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_vengefulspirit",\n\t\t"id":20,\n\t\t"localized_name":"Vengeful Spirit"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_windrunner",\n\t\t"id":21,\n\t\t"localized_name":"Windranger"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_zuus",\n\t\t"id":22,\n\t\t"localized_name":"Zeus"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_kunkka",\n\t\t"id":23,\n\t\t"localized_name":"Kunkka"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_lina",\n\t\t"id":25,\n\t\t"localized_name":"Lina"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_lich",\n\t\t"id":31,\n\t\t"localized_name":"Lich"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_lion",\n\t\t"id":26,\n\t\t"localized_name":"Lion"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_shadow_shaman",\n\t\t"id":27,\n\t\t"localized_name":"Shadow Shaman"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_slardar",\n\t\t"id":28,\n\t\t"localized_name":"Slardar"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_tidehunter",\n\t\t"id":29,\n\t\t"localized_name":"Tidehunter"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_witch_doctor",\n\t\t"id":30,\n\t\t"localized_name":"Witch Doctor"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_riki",\n\t\t"id":32,\n\t\t"localized_name":"Riki"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_enigma",\n\t\t"id":33,\n\t\t"localized_name":"Enigma"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_tinker",\n\t\t"id":34,\n\t\t"localized_name":"Tinker"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_sniper",\n\t\t"id":35,\n\t\t"localized_name":"Sniper"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_necrolyte",\n\t\t"id":36,\n\t\t"localized_name":"Necrophos"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_warlock",\n\t\t"id":37,\n\t\t"localized_name":"Warlock"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_beastmaster",\n\t\t"id":38,\n\t\t"localized_name":"Beastmaster"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_queenofpain",\n\t\t"id":39,\n\t\t"localized_name":"Queen of Pain"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_venomancer",\n\t\t"id":40,\n\t\t"localized_name":"Venomancer"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_faceless_void",\n\t\t"id":41,\n\t\t"localized_name":"Faceless Void"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_skeleton_king",\n\t\t"id":42,\n\t\t"localized_name":"Wraith King"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_death_prophet",\n\t\t"id":43,\n\t\t"localized_name":"Death Prophet"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_phantom_assassin",\n\t\t"id":44,\n\t\t"localized_name":"Phantom Assassin"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_pugna",\n\t\t"id":45,\n\t\t"localized_name":"Pugna"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_templar_assassin",\n\t\t"id":46,\n\t\t"localized_name":"Templar Assassin"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_viper",\n\t\t"id":47,\n\t\t"localized_name":"Viper"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_luna",\n\t\t"id":48,\n\t\t"localized_name":"Luna"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_dragon_knight",\n\t\t"id":49,\n\t\t"localized_name":"Dragon Knight"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_dazzle",\n\t\t"id":50,\n\t\t"localized_name":"Dazzle"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_rattletrap",\n\t\t"id":51,\n\t\t"localized_name":"Clockwerk"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_leshrac",\n\t\t"id":52,\n\t\t"localized_name":"Leshrac"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_furion",\n\t\t"id":53,\n\t\t"localized_name":"Nature\'s Prophet"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_life_stealer",\n\t\t"id":54,\n\t\t"localized_name":"Lifestealer"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_dark_seer",\n\t\t"id":55,\n\t\t"localized_name":"Dark Seer"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_clinkz",\n\t\t"id":56,\n\t\t"localized_name":"Clinkz"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_omniknight",\n\t\t"id":57,\n\t\t"localized_name":"Omniknight"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_enchantress",\n\t\t"id":58,\n\t\t"localized_name":"Enchantress"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_huskar",\n\t\t"id":59,\n\t\t"localized_name":"Huskar"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_night_stalker",\n\t\t"id":60,\n\t\t"localized_name":"Night Stalker"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_broodmother",\n\t\t"id":61,\n\t\t"localized_name":"Broodmother"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_bounty_hunter",\n\t\t"id":62,\n\t\t"localized_name":"Bounty Hunter"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_weaver",\n\t\t"id":63,\n\t\t"localized_name":"Weaver"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_jakiro",\n\t\t"id":64,\n\t\t"localized_name":"Jakiro"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_batrider",\n\t\t"id":65,\n\t\t"localized_name":"Batrider"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_chen",\n\t\t"id":66,\n\t\t"localized_name":"Chen"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_spectre",\n\t\t"id":67,\n\t\t"localized_name":"Spectre"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_doom_bringer",\n\t\t"id":69,\n\t\t"localized_name":"Doom"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_ancient_apparition",\n\t\t"id":68,\n\t\t"localized_name":"Ancient Apparition"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_ursa",\n\t\t"id":70,\n\t\t"localized_name":"Ursa"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_spirit_breaker",\n\t\t"id":71,\n\t\t"localized_name":"Spirit Breaker"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_gyrocopter",\n\t\t"id":72,\n\t\t"localized_name":"Gyrocopter"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_alchemist",\n\t\t"id":73,\n\t\t"localized_name":"Alchemist"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_invoker",\n\t\t"id":74,\n\t\t"localized_name":"Invoker"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_silencer",\n\t\t"id":75,\n\t\t"localized_name":"Silencer"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_obsidian_destroyer",\n\t\t"id":76,\n\t\t"localized_name":"Outworld Devourer"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_lycan",\n\t\t"id":77,\n\t\t"localized_name":"Lycan"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_brewmaster",\n\t\t"id":78,\n\t\t"localized_name":"Brewmaster"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_shadow_demon",\n\t\t"id":79,\n\t\t"localized_name":"Shadow Demon"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_lone_druid",\n\t\t"id":80,\n\t\t"localized_name":"Lone Druid"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_chaos_knight",\n\t\t"id":81,\n\t\t"localized_name":"Chaos Knight"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_meepo",\n\t\t"id":82,\n\t\t"localized_name":"Meepo"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_treant",\n\t\t"id":83,\n\t\t"localized_name":"Treant Protector"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_ogre_magi",\n\t\t"id":84,\n\t\t"localized_name":"Ogre Magi"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_undying",\n\t\t"id":85,\n\t\t"localized_name":"Undying"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_rubick",\n\t\t"id":86,\n\t\t"localized_name":"Rubick"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_disruptor",\n\t\t"id":87,\n\t\t"localized_name":"Disruptor"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_nyx_assassin",\n\t\t"id":88,\n\t\t"localized_name":"Nyx Assassin"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_naga_siren",\n\t\t"id":89,\n\t\t"localized_name":"Naga Siren"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_keeper_of_the_light",\n\t\t"id":90,\n\t\t"localized_name":"Keeper of the Light"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_wisp",\n\t\t"id":91,\n\t\t"localized_name":"Io"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_visage",\n\t\t"id":92,\n\t\t"localized_name":"Visage"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_slark",\n\t\t"id":93,\n\t\t"localized_name":"Slark"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_medusa",\n\t\t"id":94,\n\t\t"localized_name":"Medusa"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_troll_warlord",\n\t\t"id":95,\n\t\t"localized_name":"Troll Warlord"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_centaur",\n\t\t"id":96,\n\t\t"localized_name":"Centaur Warrunner"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_magnataur",\n\t\t"id":97,\n\t\t"localized_name":"Magnus"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_shredder",\n\t\t"id":98,\n\t\t"localized_name":"Timbersaw"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_bristleback",\n\t\t"id":99,\n\t\t"localized_name":"Bristleback"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_tusk",\n\t\t"id":100,\n\t\t"localized_name":"Tusk"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_skywrath_mage",\n\t\t"id":101,\n\t\t"localized_name":"Skywrath Mage"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_abaddon",\n\t\t"id":102,\n\t\t"localized_name":"Abaddon"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_elder_titan",\n\t\t"id":103,\n\t\t"localized_name":"Elder Titan"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_legion_commander",\n\t\t"id":104,\n\t\t"localized_name":"Legion Commander"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_ember_spirit",\n\t\t"id":106,\n\t\t"localized_name":"Ember Spirit"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_earth_spirit",\n\t\t"id":107,\n\t\t"localized_name":"Earth Spirit"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_terrorblade",\n\t\t"id":109,\n\t\t"localized_name":"Terrorblade"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_phoenix",\n\t\t"id":110,\n\t\t"localized_name":"Phoenix"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_oracle",\n\t\t"id":111,\n\t\t"localized_name":"Oracle"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_techies",\n\t\t"id":105,\n\t\t"localized_name":"Techies"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_winter_wyvern",\n\t\t"id":112,\n\t\t"localized_name":"Winter Wyvern"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_arc_warden",\n\t\t"id":113,\n\t\t"localized_name":"Arc Warden"\n\t\t},\n\t\t{\n\t\t"name":"npc_dota_hero_abyssal_underlord",\n\t\t"id":108,\n\t\t"localized_name":"Underlord"\n\t\t}\n\t\t]\n\t\t,\n\t\t"status":200,\n\t\t"count":112\n\t\t}\n\t\t}';
		};
	
		return slider;
	}();

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMDQyODQ0MzJhMWI5ZmZiYTIxNTMiLCJ3ZWJwYWNrOi8vLy4vanMvaW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2J1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2NvdW50ZG93bl9wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9zbGlkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Q0EsRUFBQyxZQUFXO0FBQ1g7O0FBRUEsTUFBTSxTQUFTLG9CQUFRLENBQVIsQ0FBZjs7QUFFQSxNQUFNLGNBQWMsSUFBSSxNQUFKLENBQVcsYUFBWCxDQUFwQjtBQUNBLGNBQVksU0FBWjs7QUFFQSxNQUFNLGFBQWEsSUFBSSxNQUFKLENBQVcsWUFBWCxDQUFuQjtBQUNBLGFBQVcsUUFBWDs7QUFFQSxNQUFNLGVBQWUsSUFBSSxNQUFKLENBQVcsY0FBWCxDQUFyQjtBQUNBLGVBQWEsTUFBYjtBQUNBLEVBYkQsSTs7Ozs7Ozs7QUNBQTs7OztBQUlBLFFBQU8sT0FBUCxHQUFrQixZQUFXO0FBQzVCOztBQUVBLE1BQU0sbUJBQW1CLENBQXpCO0FBQ0EsTUFBTSxpQkFBaUIsb0JBQVEsQ0FBUixDQUF2QjtBQUNBLE1BQU0sU0FBUyxvQkFBUSxDQUFSLENBQWY7QUFDQSxNQUFNLFNBQVMsb0JBQVEsQ0FBUixDQUFmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxrQkFBa0IsU0FBUyxjQUFULENB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aW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDA0Mjg0NDMyYTFiOWZmYmEyMTUzXG4gKiovIiwiKGZ1bmN0aW9uKCkge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRjb25zdCBCdXR0b24gPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvYnV0dG9uLmpzJyk7XHJcblxyXG5cdGNvbnN0IHN0YXJ0QnV0dG9uID0gbmV3IEJ1dHRvbignc3RhcnRCdXR0b24nKTtcclxuXHRzdGFydEJ1dHRvbi5pbml0U3RhcnQoKTtcclxuXHJcblx0Y29uc3QgZmFpbEJ1dHRvbiA9IG5ldyBCdXR0b24oJ2ZhaWxCdXR0b24nKTtcclxuXHRmYWlsQnV0dG9uLmluaXRGYWlsKCk7XHJcblxyXG5cdGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IG5ldyBCdXR0b24oJ3N1Ym1pdEJ1dHRvbicpO1xyXG5cdHN1Ym1pdEJ1dHRvbi5zdWJtaXQoKTtcclxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2luaXQuanNcbiAqKi8iLCIvKipcclxuICogVGhpcyBpcyBhIGdlbmVyaWMgYnV0dG9uLCB3aGljaCBoYXMgYSBtdWx0aXR1ZGUgb2YgZ2VuZXJpYyB0byBzcGVjaWZpYyBmdW5jdGlvbnMgZm9yIGFsbCBwb3NzaWJsZSBzY2VuYXJpb3MuXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBCdXR0b25cclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRjb25zdCBDT1VOVERPV05fTlVNQkVSID0gMztcclxuXHRjb25zdCBDb3VudGRvd25QYW5lbCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvY291bnRkb3duX3BhbmVsLmpzJyk7XHJcblx0Y29uc3QgU2xpZGVyID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9zbGlkZXIuanMnKTtcclxuXHRjb25zdCBIZWxwZXIgPSByZXF1aXJlKCcuLi9oZWxwZXIuanMnKTtcclxuXHQvL1RPRE8gLSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yIGlzIGJldHRlciBvciBuYWg/IEhlYXJkIHBlcmZvcm1hbmNlIGlzIHdvcnNlIGJ1dCBob3cgYmFkIGlzIGl0PyB3aHkgcXVlcnlzZWxlY3RvciBvdmVyIGdldGVsZW1lbnQ/XHJcblx0Ly8gVEhJUyBJUyBUT08gU0hJVCwgSVRTIFRPTyBERVBFTkRFTlQgT04gSEFSRCBDT0RFRCBWQVJJQUJMRVM7IENBTiBBTkdVTEFSIDIgREVQRU5ERU5DWSBJTkpFQ1RJT04gSEVMUCBPUiBPVEhFUiBXQVkgVkFOSUxMQSBKUyBDQU4gSEVMUD8gSSBLTk9XXHJcblx0Ly8gUkVBQ1QgQ0FOIFdJVEggSVRTIENPTVBPTkVOVCBCQVNFRCBMSUJSQVJZOyBXSEFUIEFCT1VUIEVNQkVSPyBXSFkgQVJFIFBFT1BMRSBESVRDSElORyBFTUJFUj8gVE9PIE9MRD8gS05PQ0tPVVQgTVZWTSBIRUxQUz8/XHJcblx0Y29uc3Qgc3VibWl0VGV4dGZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdFRleHRmaWVsZCcpO1xyXG5cdGNvbnN0IGZhaWxCYWNrZ3JvdW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZmFpbEJhY2tncm91bmQnKVswXTtcclxuXHRjb25zdCBpbWFnZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZXMnKVswXTtcclxuXHRjb25zdCBpbWFnZSA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlJyk7XHJcblx0Y29uc3QgaW5zdHJ1Y3Rpb25QYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2luc3RydWN0aW9uUGFuZWwnKVswXTtcclxuXHRjb25zdCBhZGRQb2ludHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdhZGRQb2ludHMnKVswXTtcclxuXHRjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnd3JhcHBlcicpWzBdO1xyXG5cdGNvbnN0IHNsaWRlclBhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnc2xpZGVyUGFuZWwnKVswXTtcclxuXHRjb25zdCBoaWdoU2NvcmUgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdoaWdoU2NvcmUnKTtcclxuXHJcblx0ZnVuY3Rpb24gQnV0dG9uKGlkKSB7XHJcblx0XHR0aGlzLmJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuXHRcdHRoaXMuY291bnRkb3duUGFuZWwgPSBuZXcgQ291bnRkb3duUGFuZWwoJ2NvdW50ZG93blBhbmVsJyk7XHJcblx0XHR0aGlzLnNsaWRlciA9IG5ldyBTbGlkZXIoJ3NsaWRlclBhbmVsJyk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogV2hlbiBjbGlja2VkLCBzdGFydCB0aGUgY291bnRkb3duIHBhbmVsLlxyXG5cdCAqIEBwYXJhbSAge0ludGVnZXJ9IENvdW50ZG93biBudW1iZXJcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gVGhlIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2hlbiB0aGUgY291bnRkb3duIG51bWJlciByZWFjaGVzIDAuXHJcblx0ICogQHJldHVybiB7W3R5cGVdfVxyXG5cdCAqL1xyXG5cdC8vIFRISVMgUFJPVE9UWVBFIE9SIE1PRFVMRSBQQVRURVJOIElTIEJFVFRFUj8/PyBXSEFUIEFCT1VUIFBVQi9TVUIgSU1QTEVNRU5UQVRJT04/XHJcblx0Ly8gSUYgSEFWRSBUSU1FLCBTRUUgSUYgRVM2IEFSUk9XIEZVTkNUSU9OIElTIE1PUkUgUkVBREFCTEUgT1IgTk9UXHJcblx0Ly8gQU5EIEFMTCBUSElTIE1FVEhPRFMuLi5NQVlCRSBTRVBFUkFURSBJVCBJTlRPIERJRkZFUkVOVCBDT01QT05FTlRTP1xyXG5cdEJ1dHRvbi5wcm90b3R5cGUuc3RhcnRDb3VudGRvd25Gb3JTbGlkZXIgPSBmdW5jdGlvbihjb3VudGRvd25OdW1iZXIsIGNhbGxiYWNrKSB7XHJcblx0XHQvLyBJcyB1c2luZyBzZWxmIG9rYXk/IENhdXNlIHRoZXJlcyB3aW5kb3cuc2VsZi4uLmJ1dCB3aWxsIEkgZXZlciB1c2UgdGhhdD8/P1xyXG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XHJcblx0XHR0aGlzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRjYWxsYmFjaygpO1xyXG5cdFx0XHRIZWxwZXIudG9nZ2xlQ2xhc3NGb3JBbmltYXRpb24od3JhcHBlciwgJ2dyYXlzY2FsZUJhY2tncm91bmRBbmltYXRpb24nKTtcclxuXHRcdFx0c2VsZi5jb3VudGRvd25QYW5lbC5zdGFydENvdW50ZG93blRpbWVyKGNvdW50ZG93bk51bWJlciwgc2VsZi5zbGlkZXIuc3RhcnRTbGlkZXIuYmluZChzZWxmLnNsaWRlcikpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBXaGVuIGNsaWNrZWQsIGNoZWNrIGlmIHRoZSB1c2VyIGlucHV0IGlzIHZhbGlkOyBpZiBpdCBpcyB2YWxpZCwgaXQgd2lsbCByZW1vdmUgYW4gaW1hZ2UgYW5kIGFkZCBzb21lIHBvaW50cywgZWxzZSBkaXNwbGF5IGEgZmFpbCBhbmltYXRpb24uXHJcblx0ICovXHJcblx0QnV0dG9uLnByb3RvdHlwZS5zdWJtaXQgPSBmdW5jdGlvbigpIHtcclxuXHRcdGxldCBpbWFnZUl0ZXJhdGlvbiA9IDA7XHJcblx0XHR0aGlzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdCAgXHRcdGlmIChIZWxwZXIudmFsaWRhdGVJZklucHV0SXNEb3RhSGVyb05hbWUoaW1hZ2VbaW1hZ2VJdGVyYXRpb25dLCBzZWxmLnN1Ym1pdFRleHRmaWVsZCkpIHtcclxuXHQgIFx0XHRcdEhlbHBlci5oaWRlRWxlbWVudChpbWFnZVtpbWFnZUl0ZXJhdGlvbl0pO1xyXG5cdCAgXHRcdFx0aW1hZ2VJdGVyYXRpb24rKztcclxuXHQgIFx0XHRcdGFkZFBvaW50cy5pbm5lckhUTUwgPSBcIisxMDBcIjtcclxuXHQgIFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgaGlnaFNjb3JlLmxlbmd0aDsgaSsrKSB7XHJcblx0ICBcdFx0XHRcdGhpZ2hTY29yZVtpXS5pbm5lckhUTUwgPSBwYXJzZUludChoaWdoU2NvcmVbaV0uaW5uZXJIVE1MKSArIDEwMDtcclxuXHQgIFx0XHRcdH1cclxuXHQgIFx0XHRcdEhlbHBlci50b2dnbGVDbGFzc0ZvckFuaW1hdGlvbihhZGRQb2ludHMsICdhZGRQb2ludHNBbmltYXRpb24nKTtcclxuXHQgIFx0XHRcdEhlbHBlci5yZW1vdmVDbGFzcyhzZWxmLnN1Ym1pdFRleHRmaWVsZCwgJ3NoYWtlVGV4dGZpZWxkQW5pbWF0aW9uJyk7XHJcblx0ICBcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRIZWxwZXIuYWRkQ2xhc3Moc2VsZi5zdWJtaXRUZXh0ZmllbGQsICdzaGFrZVRleHRmaWVsZEFuaW1hdGlvbicpO1xyXG5cdCAgXHRcdH1cclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0b3IgZm9yIHdoZW4gdGhlIHN0YXJ0IGJ1dHRvbiBpcyBjbGlja2VkLlxyXG5cdCAqIEBwYXJhbSAge0ludGVnZXJ9IGNvdW50ZG93biBudW1iZXIuXHJcblx0ICovXHJcblx0QnV0dG9uLnByb3RvdHlwZS5pbml0U3RhcnQgPSBmdW5jdGlvbihjb3VudGRvd25OdW1iZXIpIHtcclxuXHRcdGNvbnN0IGNhbGxiYWNrID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdEhlbHBlci5oaWRlRWxlbWVudChpbnN0cnVjdGlvblBhbmVsKTtcclxuXHRcdH1cclxuXHRcdHRoaXMuc3RhcnRDb3VudGRvd25Gb3JTbGlkZXIoQ09VTlRET1dOX05VTUJFUiwgY2FsbGJhY2spO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQ29uc3RydWN0b3IgZm9yIHdoZW4gdGhlIGZhaWwgYnV0dG9uIGlzIGNsaWNrZWQuXHJcblx0ICogQHBhcmFtICB7SW50ZWdlcn0gY291bnRkb3duIG51bWJlci5cclxuXHQgKi9cclxuXHRCdXR0b24ucHJvdG90eXBlLmluaXRGYWlsID0gZnVuY3Rpb24oY291bnRkb3duTnVtYmVyKSB7XHJcblx0XHRjb25zdCBjYWxsYmFjayA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRIZWxwZXIuaGlkZUVsZW1lbnQoZmFpbEJhY2tncm91bmQsIHNsaWRlclBhbmVsKTtcclxuXHRcdFx0Ly8gcmVzZXQgdGhlIGltYWdlc1xyXG5cdFx0XHRpbWFnZXMuc3R5bGUubWFyZ2luTGVmdCA9ICcxMDAlJztcclxuICBcdFx0XHRpbWFnZXMuc3R5bGUudHJhbnNpdGlvbiA9ICcwcyc7XHJcbiAgXHRcdCAgXHRmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlLmxlbmd0aDsgaSsrKSB7XHJcbiAgXHRcdFx0XHRpbWFnZVtpXS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICBcdFx0XHR9XHJcblx0XHR9XHJcblx0XHR0aGlzLnN0YXJ0Q291bnRkb3duRm9yU2xpZGVyKENPVU5URE9XTl9OVU1CRVIsIGNhbGxiYWNrKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBCdXR0b247XHJcbn0pKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9jb21wb25lbnRzL2J1dHRvbi5qc1xuICoqLyIsIi8qKlxyXG4gKiBUaGlzIGlzIHRoZSBjb3VudGRvd24gcGFuZWw7IGl0IHdpbGwgY291bnRkb3duIHVudGlsIGl0IHJlYWNoZXMgMCBiZWZvcmUgaXQgZGlzcGxheXMgdGhlIHNsaWRlciBwYW5lbC5cclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cdFxyXG5cdGNvbnN0IEhlbHBlciA9IHJlcXVpcmUoJy4uL2hlbHBlci5qcycpO1xyXG5cdFxyXG5cdGZ1bmN0aW9uIGNvdW50ZG93blBhbmVsKGlkKSB7XHJcblx0XHR0aGlzLmNvdW50ZG93blBhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3RhcnQgdGhlIGNvdW50ZG93bjsgaXQgd2lsbCBjb3VudGRvd24gdGhlIG51bWJlciBkaXNwbGF5ZWQgb24gdGhlIHNjcmVlbiB1bnRpbCBpdCByZWFjaGVzIDAsIHdoaWNoIGJ5IHRoZW4gaXQgd2lsbCBkaXNwbGF5IHRoZSBzbGlkZXIgcGFuZWwuXHJcblx0ICogQHBhcmFtICB7SW50ZWdlcn0gdGhlIGNvdW50ZG93biBudW1iZXIsIGUuZy4gaWYgMywgaXQgd2lsbCBzdGFydCB0aGUgY291bnRkb3duIGZyb20gMy5cclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gVGhlIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBjYWxsZWQgb25jZSB0aGUgY291bnRkb3duIHJlYWNoZXMgMC5cclxuXHQgKi9cclxuXHRjb3VudGRvd25QYW5lbC5wcm90b3R5cGUuc3RhcnRDb3VudGRvd25UaW1lciA9IGZ1bmN0aW9uKGNvdW50ZG93bk51bWJlciwgY2FsbGJhY2spIHtcclxuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cdFx0SGVscGVyLnNob3dFbGVtZW50KHRoaXMuY291bnRkb3duUGFuZWwpO1xyXG5cdFx0dGhpcy5jb3VudGRvd25QYW5lbC5pbm5lckhUTUwgPSBcIlwiO1xyXG5cdFx0Y29uc3QgY291bnREb3duVGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuICAgICAgXHRcdGlmIChjb3VudGRvd25OdW1iZXIgPT09IDApIHtcclxuICAgICAgICBcdFx0Y2xlYXJJbnRlcnZhbChjb3VudERvd25UaW1lcik7XHJcbiAgICAgICAgXHRcdEhlbHBlci5oaWRlRWxlbWVudChzZWxmLmNvdW50ZG93blBhbmVsKTtcclxuICAgICAgICBcdFx0Y2FsbGJhY2soKTtcclxuICAgICAgICBcdH1cclxuICAgICAgICBcdHNlbGYuY291bnRkb3duUGFuZWwuaW5uZXJIVE1MID0gY291bnRkb3duTnVtYmVyLS07XHJcbiAgICBcdH0sIDEwMDApO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGNvdW50ZG93blBhbmVsO1xyXG59KSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvY29tcG9uZW50cy9jb3VudGRvd25fcGFuZWwuanNcbiAqKi8iLCIvLyBpcyBpdCByZWFsbHkgdGhlIGJlc3Qgd2F5Pz8/IGxvb2sgdXAgQ29tbW9uSlMvQU1EL0VTNiBpbXBvcnQvZXhwb3J0ICg8LS0gSSBndWVzcyB0aGlzIGlzIE9LIHNvIGZhcilcclxuLy8gV2hhdCBhYm91dCBpbnN0ZWFkIG9mIEhlbHBlci5tZXRob2QoKSwgdXNlIE9iamVjdC5jcmVhdGU/IERvZXMgdGhpcyBoZWxwP1xyXG4vLyBodHRwOi8vcmVxdWlyZWpzLm9yZy9kb2NzL25vZGUuaHRtbCMxXHJcbi8vIEJ5IHVzaW5nIFJlcXVpcmVKUyBvbiB0aGUgc2VydmVyLCB5b3UgY2FuIHVzZSBvbmUgZm9ybWF0IGZvciBhbGwgeW91ciBtb2R1bGVzLCB3aGV0aGVyIHRoZXkgYXJlIHJ1bm5pbmcgc2VydmVyIHNpZGUgb3IgaW4gdGhlIGJyb3dzZXIuIChobW0uLi4pXHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cdFxyXG5cdGNvbnN0IElMTEVHQUxfQ0hBUkFDVEVSUyA9IG5ldyBSZWdFeHAoL1tcXC1cXHNdKy8pO1xyXG5cclxuXHQvKipcclxuXHQgKiBGaW5kIHdoaWNoIENTUyB0cmFuc2l0aW9uIGV2ZW50cyBlbmQuXHJcblx0ICogaHR0cHM6Ly9qb25zdWguY29tL2Jsb2cvZGV0ZWN0LXRoZS1lbmQtb2YtY3NzLWFuaW1hdGlvbnMtYW5kLXRyYW5zaXRpb25zLXdpdGgtamF2YXNjcmlwdC9cclxuXHQgKi9cclxuXHRmdW5jdGlvbiB3aGljaFRyYW5zaXRpb25FdmVudCgpe1xyXG5cdCAgdmFyIHQsXHJcblx0ICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmFrZWVsZW1lbnRcIik7XHJcblxyXG5cdCAgdmFyIHRyYW5zaXRpb25zID0ge1xyXG5cdCAgICBcInRyYW5zaXRpb25cIiAgICAgIDogXCJ0cmFuc2l0aW9uZW5kXCIsXHJcblx0ICAgIFwiT1RyYW5zaXRpb25cIiAgICAgOiBcIm9UcmFuc2l0aW9uRW5kXCIsXHJcblx0ICAgIFwiTW96VHJhbnNpdGlvblwiICAgOiBcInRyYW5zaXRpb25lbmRcIixcclxuXHQgICAgXCJXZWJraXRUcmFuc2l0aW9uXCI6IFwid2Via2l0VHJhbnNpdGlvbkVuZFwiXHJcblx0ICB9XHJcblxyXG5cdCAgZm9yICh0IGluIHRyYW5zaXRpb25zKXtcclxuXHQgICAgaWYgKGVsLnN0eWxlW3RdICE9PSB1bmRlZmluZWQpe1xyXG5cdCAgICAgIHJldHVybiB0cmFuc2l0aW9uc1t0XTtcclxuXHQgICAgfVxyXG5cdCAgfVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IGVsIC0gVGhlIGVsZW1lbnQgdGhhdCB3ZSB3YW50IHRvIGZpbmQgdGhlIGN1cnJlbnQgcG9zaXRpb24gaXMgcmVsYXRpdmUgdG8gdGhlIHdpbmRvdy5cclxuXHQgKiBodHRwczovL3d3dy5raXJ1cGEuY29tL2h0bWw1L2dldF9lbGVtZW50X3Bvc2l0aW9uX3VzaW5nX2phdmFzY3JpcHQuaHRtXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gZ2V0UG9zaXRpb24oZWwpIHtcclxuXHRcdHZhciB4UG9zID0gMDtcclxuXHRcdHZhciB5UG9zID0gMDtcclxuXHJcblx0XHR3aGlsZSAoZWwpIHtcclxuXHRcdFx0aWYgKGVsLnRhZ05hbWUgPT0gXCJCT0RZXCIpIHtcclxuXHRcdFx0XHQvLyBkZWFsIHdpdGggYnJvd3NlciBxdWlya3Mgd2l0aCBib2R5L3dpbmRvdy9kb2N1bWVudCBhbmQgcGFnZSBzY3JvbGxcclxuXHRcdFx0XHR2YXIgeFNjcm9sbCA9IGVsLnNjcm9sbExlZnQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQ7XHJcblx0XHRcdFx0dmFyIHlTY3JvbGwgPSBlbC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuXHJcblx0XHRcdFx0eFBvcyArPSAoZWwub2Zmc2V0TGVmdCAtIHhTY3JvbGwgKyBlbC5jbGllbnRMZWZ0KTtcclxuXHRcdFx0XHR5UG9zICs9IChlbC5vZmZzZXRUb3AgLSB5U2Nyb2xsICsgZWwuY2xpZW50VG9wKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBmb3IgYWxsIG90aGVyIG5vbi1CT0RZIGVsZW1lbnRzXHJcblx0XHRcdFx0eFBvcyArPSAoZWwub2Zmc2V0TGVmdCAtIGVsLnNjcm9sbExlZnQgKyBlbC5jbGllbnRMZWZ0KTtcclxuXHRcdFx0XHR5UG9zICs9IChlbC5vZmZzZXRUb3AgLSBlbC5zY3JvbGxUb3AgKyBlbC5jbGllbnRUb3ApO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsID0gZWwub2Zmc2V0UGFyZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHg6IHhQb3MsXHJcblx0XHRcdHk6IHlQb3NcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kIHRoZSBmb2N1c2VkIGVsZW1lbnQ7IGl0IHdpbGwgY2FsbCB0aGUgY2FsbGJhY2sgd2hlbiB0cmFuc2l0aW9uIGVuZHMuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSB0aGUgb2JqZWN0IHdoaWNoIHdpbGwgYmUgYmluZGVkIGJ5IGEgdHJhbnNpdGlvbiBlbmQgbGlzdGVuZXJcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gdGhlIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2hlbiB0cmFuc2l0aW9uIGVuZFxyXG5cdCAqL1xyXG4gIFx0ZnVuY3Rpb24gdHJhbnNpdGlvbkVuZChlbGVtZW50LCBjYWxsYmFjaykge1xyXG5cdCAgICBjb25zdCB0cmFuc2l0aW9uRXZlbnQgPSB3aGljaFRyYW5zaXRpb25FdmVudCgpO1xyXG5cdCAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHJhbnNpdGlvbkV2ZW50LCBjYWxsYmFjayk7XHJcbiAgXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERpc3BsYXkgdGhlIGVsZW1lbnQuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgZGlzcGxheWVkLlxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHNob3dFbGVtZW50KGVsZW1lbnQsIGRpc3BsYXkpIHtcclxuXHRcdGlmICh0eXBlb2YgZGlzcGxheSAhPT0gJ3VuZGVmaW5lZCcgJiYgZGlzcGxheSAhPT0gJycpIHtcclxuXHRcdFx0ZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhpZGUgdGhlIGVsZW1lbnQuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgaGlkZGVuLlxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIGhpZGVFbGVtZW50KGVsZW1lbnQpIHtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGFyZ3VtZW50c1tpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIGEgQ1NTIGNsYXNzIHRvIGFuIGVsZW1lbnQuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSBUaGUgZWxlbWVudCB0aGF0IHdpbGwgaGF2ZSB0aGUgYWRkZWQgQ1NTIGNsYXNzLlxyXG5cdCAqIEBwYXJhbSAge1N0cmluZ30gY2xhc3NOYW1lIC0gVGhlIENTUyBjbGFzcyBuYW1lXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XHJcblx0XHRpZiAoIWVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmUgYSBDU1MgY2xhc3MgZnJvbSBhbiBlbGVtZW50LlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGhhdmUgdGhlIHNwZWNpZmllZCBDU1MgY2xhc3MgcmVtb3ZlZC5cclxuXHQgKiBAcGFyYW0gIHtTdHJpbmd9IGNsYXNzTmFtZSAtIFRoZSBDU1MgY2xhc3MgbmFtZVxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xyXG5cdFx0aWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XHJcblx0XHR9XHJcblx0XHQvLyB3ZWlyZCBoYWNrIHJ1bGUgLSBodHRwczovL2Nzcy10cmlja3MuY29tL3Jlc3RhcnQtY3NzLWFuaW1hdGlvbi9cclxuXHRcdHZvaWQgZWxlbWVudC5vZmZzZXRXaWR0aDtcdFx0XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUb2dnbGUgd2hldGhlciB0byBhZGQgb3IgcmVtb3ZlIENTUyBjbGFzcy5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBhZGQgb3IgcmVtb3ZlIHRoZSBDU1MgY2xhc3MuXHJcblx0ICogQHBhcmFtICB7U3RyaW5nfSBjbGFzc05hbWUgLSBUaGUgQ1NTIGNsYXNzIG5hbWVcclxuXHQgKi9cclxuXHRmdW5jdGlvbiB0b2dnbGVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIHtcclxuXHRcdGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XHJcblx0XHRcdHJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcbiAgXHRcdH0gZWxzZSB7XHJcbiAgXHRcdFx0YWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKTtcdFx0XHRcclxuICBcdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVG9nZ2xlIHdoZXRoZXIgdG8gYWRkIG9yIHJlbW92ZSBDU1MgY2xhc3MuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYWRkIG9yIHJlbW92ZSB0aGUgQ1NTIGNsYXNzLlxyXG5cdCAqIEBwYXJhbSAge1N0cmluZ30gY2xhc3NOYW1lIC0gVGhlIENTUyBjbGFzcyBuYW1lXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gdG9nZ2xlQ2xhc3NGb3JBbmltYXRpb24oZWxlbWVudCwgY2xhc3NOYW1lKSB7XHJcblx0XHRpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xyXG5cdFx0XHRyZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpO1xyXG4gIFx0XHR9XHJcbiAgXHRcdGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBWYWxpZGF0ZSBpZiB1c2VyIGlucHV0IGlzIGEgc3RyaW5nLlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIHRleHRmaWVsZCB0aGF0IHdpbGwgYmUgdmFsaWRhdGVkLlxyXG5cdCAqL1xyXG4gIFx0ZnVuY3Rpb24gdmFsaWRhdGVJZklucHV0SXNEb3RhSGVyb05hbWUoaW1hZ2UsIHRleHRmaWVsZCkge1xyXG4gIFx0XHRjb25zb2xlLmxvZyhpbWFnZS5uYW1lLnRvTG93ZXJDYXNlQW5kUmVtb3ZlSWxsZWdhbENoYXJhY3RlcnMoKSk7XHJcbiAgXHRcdGNvbnNvbGUubG9nKHRleHRmaWVsZC52YWx1ZS50b0xvd2VyQ2FzZUFuZFJlbW92ZUlsbGVnYWxDaGFyYWN0ZXJzKCkpO1xyXG5cdFx0aWYgKGltYWdlLm5hbWUudG9Mb3dlckNhc2VBbmRSZW1vdmVJbGxlZ2FsQ2hhcmFjdGVycygpID09PSB0ZXh0ZmllbGQudmFsdWUudG9Mb3dlckNhc2VBbmRSZW1vdmVJbGxlZ2FsQ2hhcmFjdGVycygpKSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG4gIFx0fVxyXG5cclxuICBcdFN0cmluZy5wcm90b3R5cGUudG9Mb3dlckNhc2VBbmRSZW1vdmVJbGxlZ2FsQ2hhcmFjdGVycyA9IGZ1bmN0aW9uKCkge1xyXG4gIFx0XHRsZXQgbG93ZXJDYXNlVmFsdWUgPSB0aGlzLnRvTG93ZXJDYXNlKCk7XHJcbiAgXHRcdHJldHVybiBsb3dlckNhc2VWYWx1ZS5yZXBsYWNlKElMTEVHQUxfQ0hBUkFDVEVSUywgJycpO1xyXG4gIFx0fVxyXG5cclxuICBcdHJldHVybiB7XHJcbiAgXHRcdHRyYW5zaXRpb25FbmQsXHJcbiAgXHRcdGdldFBvc2l0aW9uLFxyXG4gIFx0XHRzaG93RWxlbWVudCxcclxuICBcdFx0aGlkZUVsZW1lbnQsXHJcbiAgXHRcdGFkZENsYXNzLFxyXG4gIFx0XHRyZW1vdmVDbGFzcyxcclxuICBcdFx0dG9nZ2xlQ2xhc3MsXHJcbiAgXHRcdHRvZ2dsZUNsYXNzRm9yQW5pbWF0aW9uLFxyXG4gIFx0XHR2YWxpZGF0ZUlmSW5wdXRJc0RvdGFIZXJvTmFtZVxyXG4gIFx0fVxyXG59KSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvaGVscGVyLmpzXG4gKiovIiwiLyoqXHJcbiAqIFRoaXMgaXMgdGhlIHNsaWRlciB0aGF0IHdpbGwgYmUgZGlzcGxheWVkIGFmdGVyIHRoZSBjb3VudGRvd24uIEl0IHdpbGwgZGlzcGxheSBhbiBlbmRsZXNzIHN0cmVhbSBvZiBkb3RhIGltYWdlcyB0aGF0IGFyZSByZXRyaWV2ZWQgdmlhIERvdGEgQVBJLlxyXG4gKiBJdCB3aWxsIGNvbnN0YW50bHkgdHJhbnNpdGlvbiB0byB0aGUgbGVmdCB1bnRpbCBpdCByZWFjaGVzIHRvIHRoZSBzdGFydGluZyBwb3NpdGlvbiBvZiB0aGUgcGFuZWwgdGhhdCBob2xkcyB0aGUgaW1hZ2VzLCB3aGljaCBpbiB0aGF0IGNhc2UgdGhlIGdhbWVcclxuICogbG9zZS4gXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHRcclxuXHRjb25zdCBIZWxwZXIgPSByZXF1aXJlKCcuLi9oZWxwZXIuanMnKTtcclxuXHRjb25zdCBTTElERV9EVVJBVElPTiA9IDEwO1xyXG5cdGNvbnN0IFdBUk5JTkdfVEhSRVNIT0xEID0gMzA7XHJcblx0Y29uc3QgaW1hZ2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VzJylbMF07XHJcblx0Y29uc3QgaW1hZ2VzUGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZXNQYW5lbCcpWzBdO1xyXG5cdGNvbnN0IGZhaWxCYWNrZ3JvdW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZmFpbEJhY2tncm91bmQnKVswXTtcclxuXHJcblx0ZnVuY3Rpb24gc2xpZGVyKHNsaWRlcikge1xyXG5cdFx0dGhpcy5zbGlkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHNsaWRlcilbMF07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXQgaW1hZ2VzIGZyb20gZG90YSBBUEk7IGFzIHdlbGwgYXMgYXBwZW5kaW5nIGl0IHRvIGEgbGlzdCBvZiBpbWFnZSBET00uXHJcblx0ICovXHJcblx0c2xpZGVyLnByb3RvdHlwZS5nZXRJbWFnZXMgPSBmdW5jdGlvbigpIHtcclxuXHRcdC8vIFRPRE8gLSBHZXQgbGlzdCBvZiBkb3RhIGltYWdlcyB1c2luZyBBSkFYLCBsb29rIHVwIFByb21pc2VzIGFuZCBHZW5lcmF0b3JzXHJcblx0XHQvLyBQcm9taXNlcyAtIGFzeWNocm9ub3VzIGNhbGxzLCBkbyB0aGlzLCB0aGVuIGRvIHRoaXNcclxuXHRcdC8vIEdlbmVyYXRvcnMgLSBzb21ldGhpbmcgYWJvdXQgd2FpdGluZyBpbmRlZmluaXRlbHkgdW50aWwgaXQgZ2V0cyBpdCAodXNlcyB0aGUga2V5d29yZCAneWllbGQnKVxyXG5cdFx0Ly8gQVBQQVJFTlRMWSBHRU5FUkFUT1JTIElTIEEgSEFDSywgRVM3ICdBU1lOQycgS0VZV09SRCBJUyBUSEUgTEVHSVQgV0FZIE9SIFNPTUUgU0hJVDsgSSBUSElOSz8gXHJcblxyXG5cdFx0Lyp2YXIgb1JlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cdFx0b1JlcS5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xyXG5cdFx0ICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LnJlc3BvbnNlLm1lc3NhZ2UpO1xyXG5cdFx0fTtcclxuXHRcdG9SZXEub3BlbignR0VUJywgJ2h0dHBzOi8vYXBpLnN0ZWFtcG93ZXJlZC5jb20vSUVjb25ET1RBMl81NzAvR2V0SGVyb2VzL3YwMDAxLz9rZXk9NkMxQ0Y3NkM5MDc2ODM4ODYxOEYzNDhCQjczRUUwMTUmbGFuZ3VhZ2U9ZW5fdXMmZm9ybWF0PUpTT04nLCB0cnVlKTtcclxuXHRcdG9SZXEucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xyXG5cdFx0b1JlcS5zZW5kKCk7Ki9cclxuXHJcblx0XHRjb25zdCBkb3RhSGVyb2VzSnNvbiA9IEpTT04ucGFyc2UodGhpcy5zdHViRG90YUhlcm9lcygpKTtcclxuXHRcdGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO1xyXG5cdFx0Y29uc3QgaGVyb2VzID0gZG90YUhlcm9lc0pzb24ucmVzdWx0Lmhlcm9lcztcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgaGVyb2VzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGNvbnN0IGltYWdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcblx0XHRcdGltYWdlLmNsYXNzTmFtZSA9ICdpbWFnZSc7XHJcblx0XHRcdGltYWdlLnNyYyA9ICcuLi9pbWcvZGl2aW5lX3JhcGllcl9pY29uLnBuZyc7XHJcblx0XHRcdGltYWdlLm5hbWUgPSBoZXJvZXNbaV0ubG9jYWxpemVkX25hbWU7XHJcblx0XHRcdGZyYWdtZW50LmFwcGVuZENoaWxkKGltYWdlKTtcclxuXHRcdH1cclxuXHRcdGltYWdlcy5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUcmFuc2l0aW9uIGVmZmVjdCBvbiB0aGUgaW1hZ2VzLlxyXG5cdCAqL1xyXG5cdHNsaWRlci5wcm90b3R5cGUuc2xpZGUgPSBmdW5jdGlvbigpIHtcclxuXHRcdGNvbnN0IHNjcmVlbldpZHRoID0gd2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIHx8IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGg7XHJcblx0ICAgIGNvbnN0IGRlZmF1bHRXaWR0aCA9IChzY3JlZW5XaWR0aCAtIGltYWdlc1BhbmVsLm9mZnNldFdpZHRoLyAyKSArIGltYWdlc1BhbmVsLm9mZnNldFdpZHRoO1xyXG5cdCAgICBjb25zdCB3YXJuaW5nV2lkdGggPSBkZWZhdWx0V2lkdGggKiBXQVJOSU5HX1RIUkVTSE9MRCAvIDEwMDtcclxuXHQgICAgbGV0IHRpbWVyO1xyXG5cclxuXHRcdGltYWdlcy5zdHlsZS5tYXJnaW5MZWZ0ID0gJzAnO1xyXG5cdCAgICBpbWFnZXMuc3R5bGUudHJhbnNpdGlvbiA9IFNMSURFX0RVUkFUSU9OICsgJ3MgbGluZWFyJztcclxuXHRcdEhlbHBlci5yZW1vdmVDbGFzcyhpbWFnZXNQYW5lbCwgJ3dhcm5pbmdBbmltYXRpb24nKTtcclxuXHJcblx0ICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcblx0ICAgIFx0aWYgKEhlbHBlci5nZXRQb3NpdGlvbihpbWFnZXMpLnggPD0gd2FybmluZ1dpZHRoKSB7XHJcblx0XHRcdFx0SGVscGVyLmFkZENsYXNzKGltYWdlc1BhbmVsLCAnd2FybmluZ0FuaW1hdGlvbicpO1xyXG5cdFx0XHRcdGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG5cdCAgICBcdH1cclxuXHQgICAgfSwgMTAwMCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbml0aWFsaXplIHRoZSBzbGlkZXIgdHJhbnNpdGlvbiwgZGlzcGxheSB0aGUgZmFpbCBwYW5lbCB3aGVuIHRoZSB0cmFuc2l0aW9uIGVuZHMuXHJcblx0ICovXHJcblx0c2xpZGVyLnByb3RvdHlwZS5zdGFydFNsaWRlciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dGhpcy5nZXRJbWFnZXMoKTtcclxuXHRcdEhlbHBlci5zaG93RWxlbWVudCh0aGlzLnNsaWRlcik7XHJcblx0XHR0aGlzLnNsaWRlKCk7XHJcblx0XHRIZWxwZXIudHJhbnNpdGlvbkVuZChpbWFnZXMsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRIZWxwZXIuc2hvd0VsZW1lbnQoZmFpbEJhY2tncm91bmQpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRzbGlkZXIucHJvdG90eXBlLnN0dWJEb3RhSGVyb2VzID0gZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gYHtcclxuXHRcdFwicmVzdWx0XCI6e1xyXG5cdFx0XCJoZXJvZXNcIjpbXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fYW50aW1hZ2VcIixcclxuXHRcdFwiaWRcIjoxLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiQW50aS1NYWdlXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fYXhlXCIsXHJcblx0XHRcImlkXCI6MixcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkF4ZVwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2JhbmVcIixcclxuXHRcdFwiaWRcIjozLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiQmFuZVwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2Jsb29kc2Vla2VyXCIsXHJcblx0XHRcImlkXCI6NCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkJsb29kc2Vla2VyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fY3J5c3RhbF9tYWlkZW5cIixcclxuXHRcdFwiaWRcIjo1LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiQ3J5c3RhbCBNYWlkZW5cIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19kcm93X3JhbmdlclwiLFxyXG5cdFx0XCJpZFwiOjYsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJEcm93IFJhbmdlclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2VhcnRoc2hha2VyXCIsXHJcblx0XHRcImlkXCI6NyxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkVhcnRoc2hha2VyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fanVnZ2VybmF1dFwiLFxyXG5cdFx0XCJpZFwiOjgsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJKdWdnZXJuYXV0XCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fbWlyYW5hXCIsXHJcblx0XHRcImlkXCI6OSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIk1pcmFuYVwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX25ldmVybW9yZVwiLFxyXG5cdFx0XCJpZFwiOjExLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiU2hhZG93IEZpZW5kXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fbW9ycGhsaW5nXCIsXHJcblx0XHRcImlkXCI6MTAsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJNb3JwaGxpbmdcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19waGFudG9tX2xhbmNlclwiLFxyXG5cdFx0XCJpZFwiOjEyLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiUGhhbnRvbSBMYW5jZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19wdWNrXCIsXHJcblx0XHRcImlkXCI6MTMsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJQdWNrXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fcHVkZ2VcIixcclxuXHRcdFwiaWRcIjoxNCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlB1ZGdlXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fcmF6b3JcIixcclxuXHRcdFwiaWRcIjoxNSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlJhem9yXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fc2FuZF9raW5nXCIsXHJcblx0XHRcImlkXCI6MTYsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJTYW5kIEtpbmdcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19zdG9ybV9zcGlyaXRcIixcclxuXHRcdFwiaWRcIjoxNyxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlN0b3JtIFNwaXJpdFwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3N2ZW5cIixcclxuXHRcdFwiaWRcIjoxOCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlN2ZW5cIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb190aW55XCIsXHJcblx0XHRcImlkXCI6MTksXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJUaW55XCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fdmVuZ2VmdWxzcGlyaXRcIixcclxuXHRcdFwiaWRcIjoyMCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlZlbmdlZnVsIFNwaXJpdFwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3dpbmRydW5uZXJcIixcclxuXHRcdFwiaWRcIjoyMSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIldpbmRyYW5nZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb196dXVzXCIsXHJcblx0XHRcImlkXCI6MjIsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJaZXVzXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fa3Vua2thXCIsXHJcblx0XHRcImlkXCI6MjMsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJLdW5ra2FcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19saW5hXCIsXHJcblx0XHRcImlkXCI6MjUsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJMaW5hXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fbGljaFwiLFxyXG5cdFx0XCJpZFwiOjMxLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiTGljaFwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2xpb25cIixcclxuXHRcdFwiaWRcIjoyNixcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkxpb25cIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19zaGFkb3dfc2hhbWFuXCIsXHJcblx0XHRcImlkXCI6MjcsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJTaGFkb3cgU2hhbWFuXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fc2xhcmRhclwiLFxyXG5cdFx0XCJpZFwiOjI4LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiU2xhcmRhclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3RpZGVodW50ZXJcIixcclxuXHRcdFwiaWRcIjoyOSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlRpZGVodW50ZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb193aXRjaF9kb2N0b3JcIixcclxuXHRcdFwiaWRcIjozMCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIldpdGNoIERvY3RvclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3Jpa2lcIixcclxuXHRcdFwiaWRcIjozMixcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlJpa2lcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19lbmlnbWFcIixcclxuXHRcdFwiaWRcIjozMyxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkVuaWdtYVwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3RpbmtlclwiLFxyXG5cdFx0XCJpZFwiOjM0LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiVGlua2VyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fc25pcGVyXCIsXHJcblx0XHRcImlkXCI6MzUsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJTbmlwZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19uZWNyb2x5dGVcIixcclxuXHRcdFwiaWRcIjozNixcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIk5lY3JvcGhvc1wiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3dhcmxvY2tcIixcclxuXHRcdFwiaWRcIjozNyxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIldhcmxvY2tcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19iZWFzdG1hc3RlclwiLFxyXG5cdFx0XCJpZFwiOjM4LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiQmVhc3RtYXN0ZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19xdWVlbm9mcGFpblwiLFxyXG5cdFx0XCJpZFwiOjM5LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiUXVlZW4gb2YgUGFpblwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3Zlbm9tYW5jZXJcIixcclxuXHRcdFwiaWRcIjo0MCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlZlbm9tYW5jZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19mYWNlbGVzc192b2lkXCIsXHJcblx0XHRcImlkXCI6NDEsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJGYWNlbGVzcyBWb2lkXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fc2tlbGV0b25fa2luZ1wiLFxyXG5cdFx0XCJpZFwiOjQyLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiV3JhaXRoIEtpbmdcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19kZWF0aF9wcm9waGV0XCIsXHJcblx0XHRcImlkXCI6NDMsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJEZWF0aCBQcm9waGV0XCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fcGhhbnRvbV9hc3Nhc3NpblwiLFxyXG5cdFx0XCJpZFwiOjQ0LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiUGhhbnRvbSBBc3Nhc3NpblwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3B1Z25hXCIsXHJcblx0XHRcImlkXCI6NDUsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJQdWduYVwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3RlbXBsYXJfYXNzYXNzaW5cIixcclxuXHRcdFwiaWRcIjo0NixcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlRlbXBsYXIgQXNzYXNzaW5cIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb192aXBlclwiLFxyXG5cdFx0XCJpZFwiOjQ3LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiVmlwZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19sdW5hXCIsXHJcblx0XHRcImlkXCI6NDgsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJMdW5hXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fZHJhZ29uX2tuaWdodFwiLFxyXG5cdFx0XCJpZFwiOjQ5LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiRHJhZ29uIEtuaWdodFwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2RhenpsZVwiLFxyXG5cdFx0XCJpZFwiOjUwLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiRGF6emxlXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fcmF0dGxldHJhcFwiLFxyXG5cdFx0XCJpZFwiOjUxLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiQ2xvY2t3ZXJrXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fbGVzaHJhY1wiLFxyXG5cdFx0XCJpZFwiOjUyLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiTGVzaHJhY1wiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2Z1cmlvblwiLFxyXG5cdFx0XCJpZFwiOjUzLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiTmF0dXJlJ3MgUHJvcGhldFwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2xpZmVfc3RlYWxlclwiLFxyXG5cdFx0XCJpZFwiOjU0LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiTGlmZXN0ZWFsZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19kYXJrX3NlZXJcIixcclxuXHRcdFwiaWRcIjo1NSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkRhcmsgU2VlclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2NsaW5relwiLFxyXG5cdFx0XCJpZFwiOjU2LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiQ2xpbmt6XCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fb21uaWtuaWdodFwiLFxyXG5cdFx0XCJpZFwiOjU3LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiT21uaWtuaWdodFwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2VuY2hhbnRyZXNzXCIsXHJcblx0XHRcImlkXCI6NTgsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJFbmNoYW50cmVzc1wiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2h1c2thclwiLFxyXG5cdFx0XCJpZFwiOjU5LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiSHVza2FyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fbmlnaHRfc3RhbGtlclwiLFxyXG5cdFx0XCJpZFwiOjYwLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiTmlnaHQgU3RhbGtlclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2Jyb29kbW90aGVyXCIsXHJcblx0XHRcImlkXCI6NjEsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJCcm9vZG1vdGhlclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2JvdW50eV9odW50ZXJcIixcclxuXHRcdFwiaWRcIjo2MixcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkJvdW50eSBIdW50ZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb193ZWF2ZXJcIixcclxuXHRcdFwiaWRcIjo2MyxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIldlYXZlclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2pha2lyb1wiLFxyXG5cdFx0XCJpZFwiOjY0LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiSmFraXJvXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fYmF0cmlkZXJcIixcclxuXHRcdFwiaWRcIjo2NSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkJhdHJpZGVyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fY2hlblwiLFxyXG5cdFx0XCJpZFwiOjY2LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiQ2hlblwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3NwZWN0cmVcIixcclxuXHRcdFwiaWRcIjo2NyxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlNwZWN0cmVcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19kb29tX2JyaW5nZXJcIixcclxuXHRcdFwiaWRcIjo2OSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkRvb21cIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19hbmNpZW50X2FwcGFyaXRpb25cIixcclxuXHRcdFwiaWRcIjo2OCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkFuY2llbnQgQXBwYXJpdGlvblwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3Vyc2FcIixcclxuXHRcdFwiaWRcIjo3MCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlVyc2FcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19zcGlyaXRfYnJlYWtlclwiLFxyXG5cdFx0XCJpZFwiOjcxLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiU3Bpcml0IEJyZWFrZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19neXJvY29wdGVyXCIsXHJcblx0XHRcImlkXCI6NzIsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJHeXJvY29wdGVyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fYWxjaGVtaXN0XCIsXHJcblx0XHRcImlkXCI6NzMsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJBbGNoZW1pc3RcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19pbnZva2VyXCIsXHJcblx0XHRcImlkXCI6NzQsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJJbnZva2VyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fc2lsZW5jZXJcIixcclxuXHRcdFwiaWRcIjo3NSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlNpbGVuY2VyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fb2JzaWRpYW5fZGVzdHJveWVyXCIsXHJcblx0XHRcImlkXCI6NzYsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJPdXR3b3JsZCBEZXZvdXJlclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2x5Y2FuXCIsXHJcblx0XHRcImlkXCI6NzcsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJMeWNhblwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2JyZXdtYXN0ZXJcIixcclxuXHRcdFwiaWRcIjo3OCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkJyZXdtYXN0ZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19zaGFkb3dfZGVtb25cIixcclxuXHRcdFwiaWRcIjo3OSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlNoYWRvdyBEZW1vblwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2xvbmVfZHJ1aWRcIixcclxuXHRcdFwiaWRcIjo4MCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkxvbmUgRHJ1aWRcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19jaGFvc19rbmlnaHRcIixcclxuXHRcdFwiaWRcIjo4MSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkNoYW9zIEtuaWdodFwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX21lZXBvXCIsXHJcblx0XHRcImlkXCI6ODIsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJNZWVwb1wiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3RyZWFudFwiLFxyXG5cdFx0XCJpZFwiOjgzLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiVHJlYW50IFByb3RlY3RvclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX29ncmVfbWFnaVwiLFxyXG5cdFx0XCJpZFwiOjg0LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiT2dyZSBNYWdpXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fdW5keWluZ1wiLFxyXG5cdFx0XCJpZFwiOjg1LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiVW5keWluZ1wiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3J1Ymlja1wiLFxyXG5cdFx0XCJpZFwiOjg2LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiUnViaWNrXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fZGlzcnVwdG9yXCIsXHJcblx0XHRcImlkXCI6ODcsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJEaXNydXB0b3JcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19ueXhfYXNzYXNzaW5cIixcclxuXHRcdFwiaWRcIjo4OCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIk55eCBBc3Nhc3NpblwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX25hZ2Ffc2lyZW5cIixcclxuXHRcdFwiaWRcIjo4OSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIk5hZ2EgU2lyZW5cIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19rZWVwZXJfb2ZfdGhlX2xpZ2h0XCIsXHJcblx0XHRcImlkXCI6OTAsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJLZWVwZXIgb2YgdGhlIExpZ2h0XCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fd2lzcFwiLFxyXG5cdFx0XCJpZFwiOjkxLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiSW9cIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb192aXNhZ2VcIixcclxuXHRcdFwiaWRcIjo5MixcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlZpc2FnZVwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3NsYXJrXCIsXHJcblx0XHRcImlkXCI6OTMsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJTbGFya1wiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX21lZHVzYVwiLFxyXG5cdFx0XCJpZFwiOjk0LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiTWVkdXNhXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fdHJvbGxfd2FybG9yZFwiLFxyXG5cdFx0XCJpZFwiOjk1LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiVHJvbGwgV2FybG9yZFwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2NlbnRhdXJcIixcclxuXHRcdFwiaWRcIjo5NixcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkNlbnRhdXIgV2FycnVubmVyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fbWFnbmF0YXVyXCIsXHJcblx0XHRcImlkXCI6OTcsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJNYWdudXNcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19zaHJlZGRlclwiLFxyXG5cdFx0XCJpZFwiOjk4LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiVGltYmVyc2F3XCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fYnJpc3RsZWJhY2tcIixcclxuXHRcdFwiaWRcIjo5OSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkJyaXN0bGViYWNrXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fdHVza1wiLFxyXG5cdFx0XCJpZFwiOjEwMCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlR1c2tcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19za3l3cmF0aF9tYWdlXCIsXHJcblx0XHRcImlkXCI6MTAxLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiU2t5d3JhdGggTWFnZVwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2FiYWRkb25cIixcclxuXHRcdFwiaWRcIjoxMDIsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJBYmFkZG9uXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fZWxkZXJfdGl0YW5cIixcclxuXHRcdFwiaWRcIjoxMDMsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJFbGRlciBUaXRhblwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2xlZ2lvbl9jb21tYW5kZXJcIixcclxuXHRcdFwiaWRcIjoxMDQsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJMZWdpb24gQ29tbWFuZGVyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fZW1iZXJfc3Bpcml0XCIsXHJcblx0XHRcImlkXCI6MTA2LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiRW1iZXIgU3Bpcml0XCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fZWFydGhfc3Bpcml0XCIsXHJcblx0XHRcImlkXCI6MTA3LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiRWFydGggU3Bpcml0XCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fdGVycm9yYmxhZGVcIixcclxuXHRcdFwiaWRcIjoxMDksXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJUZXJyb3JibGFkZVwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3Bob2VuaXhcIixcclxuXHRcdFwiaWRcIjoxMTAsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJQaG9lbml4XCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fb3JhY2xlXCIsXHJcblx0XHRcImlkXCI6MTExLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiT3JhY2xlXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fdGVjaGllc1wiLFxyXG5cdFx0XCJpZFwiOjEwNSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlRlY2hpZXNcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb193aW50ZXJfd3l2ZXJuXCIsXHJcblx0XHRcImlkXCI6MTEyLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiV2ludGVyIFd5dmVyblwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2FyY193YXJkZW5cIixcclxuXHRcdFwiaWRcIjoxMTMsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJBcmMgV2FyZGVuXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fYWJ5c3NhbF91bmRlcmxvcmRcIixcclxuXHRcdFwiaWRcIjoxMDgsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJVbmRlcmxvcmRcIlxyXG5cdFx0fVxyXG5cdFx0XVxyXG5cdFx0LFxyXG5cdFx0XCJzdGF0dXNcIjoyMDAsXHJcblx0XHRcImNvdW50XCI6MTEyXHJcblx0XHR9XHJcblx0XHR9YFxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHNsaWRlcjtcclxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2NvbXBvbmVudHMvc2xpZGVyLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==