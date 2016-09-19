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
		var startButton = new Button('startButton');
		startButton.initStart();
	
		var failButton = new Button('failButton');
		failButton.initFail();
	
		var submitButton = new Button('submitButton');
		submitButton.submit();
	
		var submitTextfield = new Textfield('submitTextfield', submitButton);
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
		var submitTextfield = document.getElementById('submitTextfield');
		var failBackground = document.getElementsByClassName('failBackground')[0];
		var images = document.getElementsByClassName('images')[0];
		var image = document.getElementsByClassName('image');
		var instructionPanel = document.getElementsByClassName('instructionPanel')[0];
		var addPoints = document.getElementsByClassName('addPoints')[0];
		var wrapper = document.getElementsByClassName('wrapper')[0];
		var sliderPanel = document.getElementsByClassName('sliderPanel')[0];
		var highScore = document.getElementsByClassName('highScore');
		var textfield = document.getElementById('submitTextfield');
		var imageIteration = 0;
	
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
		// AND ALL THIS FUNCTIONS...MAYBE SEPERATE IT INTO DIFFERENT COMPONENTS?
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
				textfield.value = '';
				if (typeof image[imageIteration] === 'undefined') {
					document.getElementsByClassName('resultText')[0].innerHTML = 'Ez Win!';
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
				textfield.value = '';
				Helper.removeClass(addPoints, 'addPointsAnimation');
				Helper.removeClass(submitTextfield, 'shakeTextfieldAnimation');
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
		var imagesPanel = document.getElementsByClassName('imagesPanel')[0];
		var failBackground = document.getElementsByClassName('failBackground')[0];
	
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
			/*var oReq = new XMLHttpRequest();
	  oReq.onload = function (e) {
	      console.log(e.target.response.message);
	  };
	  oReq.open('GET', 'https://api.steampowered.com/IEconDOTA2_570/GetHeroes/v0001/?key=6C1CF76C90768388618F348BB73EE015&language=en_us&format=JSON', true);
	  oReq.responseType = 'json';
	  oReq.send();*/
	
			// TODO: Fix this, it's been called everytime you start a new game which is very inefficient
			var dotaHeroesJson = JSON.parse(this.stubDotaHeroes());
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
			if (images.children.length === 0) {
				this.getImages();
			}
			Helper.showElement(this.slider);
			this.slide();
			Helper.transitionEnd(images, function () {
				document.getElementsByClassName('resultText')[0].innerHTML = 'You lose...';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNTFhMmZiYTZhZjU3MDkyMzY2MDgiLCJ3ZWJwYWNrOi8vLy4vanMvaW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2J1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2NvdW50ZG93bl9wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9zbGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy90ZXh0ZmllbGQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Q0EsRUFBQyxZQUFXO0FBQ1g7O0FBRUEsTUFBTSxTQUFTLG9CQUFRLENBQVIsQ0FBZjtBQUNBLE1BQU0sWUFBWSxvQkFBUSxDQUFSLENBQWxCOztBQUVBO0FBQ0E7QUFDQSxNQUFNLGNBQWMsSUFBSSxNQUFKLENBQVcsYUFBWCxDQUFwQjtBQUNBLGNBQVksU0FBWjs7QUFFQSxNQUFNLGFBQWEsSUFBSSxNQUFKLENBQVcsWUFBWCxDQUFuQjtBQUNBLGFBQVcsUUFBWDs7QUFFQSxNQUFNLGVBQWUsSUFBSSxNQUFKLENBQVcsY0FBWCxDQUFyQjtBQUNBLGVBQWEsTUFBYjs7QUFFQSxNQUFNLGtCQUFrQixJQUFJLFNBQUosQ0FBYyxpQkFBZCxFQUFpQyxZQUFqQyxDQUF4QjtBQUNBLGtCQUFnQixNQUFoQjtBQUNBLEVBbkJELEk7Ozs7Ozs7O0FDQUE7Ozs7QUFJQSxRQUFPLE9BQVAsR0FBa0IsWUFBVztBQUM1Qjs7QUFF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LFFBQUssTUFBTCxHQUFjLE1BQWQ7QUFDQTs7QUFFRDs7O0FBR0EsWUFBVSxTQUFWLENBQW9CLE1BQXBCLEdBQTZCLFlBQVc7QUFDdkMsT0FBSSxPQUFPLElBQVg7QUFDQSxRQUFLLFNBQUwsQ0FBZSxnQkFBZixDQUFnQyxPQUFoQyxFQUF5QyxVQUFTLEtBQVQsRUFBZ0I7QUFDeEQsUUFBSSxNQUFNLE9BQU4sS0FBa0IsRUFBdEIsRUFBMEI7QUFDekI7QUFDQSxVQUFLLE1BQUwsQ0FBWSxNQUFaLENBQW1CLEtBQW5CO0FBQ0E7QUFDRCxJQUxEO0FBTUEsR0FSRDs7QUFVQSxTQUFPLFNBQVA7QUFDQSxFQXRCZ0IsRUFBakIsQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDUxYTJmYmE2YWY1NzA5MjM2NjA4XG4gKiovIiwiKGZ1bmN0aW9uKCkge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRjb25zdCBCdXR0b24gPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvYnV0dG9uLmpzJyk7XHJcblx0Y29uc3QgVGV4dGZpZWxkID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3RleHRmaWVsZC5qcycpO1xyXG5cclxuXHQvL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCkuaW5pdFN0YXJ0IGJldHRlcj8gdXNlIFwidGhpc1wiP1xyXG5cdC8vIE9SIFRSWSBVU0UgRkFDVE9SWSBQQVRURVJOIE9OIFRISVM/IFxyXG5cdGNvbnN0IHN0YXJ0QnV0dG9uID0gbmV3IEJ1dHRvbignc3RhcnRCdXR0b24nKTtcclxuXHRzdGFydEJ1dHRvbi5pbml0U3RhcnQoKTtcclxuXHJcblx0Y29uc3QgZmFpbEJ1dHRvbiA9IG5ldyBCdXR0b24oJ2ZhaWxCdXR0b24nKTtcclxuXHRmYWlsQnV0dG9uLmluaXRGYWlsKCk7XHJcblxyXG5cdGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IG5ldyBCdXR0b24oJ3N1Ym1pdEJ1dHRvbicpO1xyXG5cdHN1Ym1pdEJ1dHRvbi5zdWJtaXQoKTtcclxuXHJcblx0Y29uc3Qgc3VibWl0VGV4dGZpZWxkID0gbmV3IFRleHRmaWVsZCgnc3VibWl0VGV4dGZpZWxkJywgc3VibWl0QnV0dG9uKTtcclxuXHRzdWJtaXRUZXh0ZmllbGQuc3VibWl0KCk7XHJcbn0pKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9pbml0LmpzXG4gKiovIiwiLyoqXHJcbiAqIFRoaXMgaXMgYSBnZW5lcmljIGJ1dHRvbiwgd2hpY2ggaGFzIGEgbXVsdGl0dWRlIG9mIGdlbmVyaWMgdG8gc3BlY2lmaWMgZnVuY3Rpb25zIGZvciBhbGwgcG9zc2libGUgc2NlbmFyaW9zLlxyXG4gKiBAcGFyYW0ge09iamVjdH0gQnV0dG9uXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0Y29uc3QgQ09VTlRET1dOX05VTUJFUiA9IDM7XHJcblx0Y29uc3QgQ291bnRkb3duUGFuZWwgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2NvdW50ZG93bl9wYW5lbC5qcycpO1xyXG5cdGNvbnN0IFNsaWRlciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvc2xpZGVyLmpzJyk7XHJcblx0Y29uc3QgSGVscGVyID0gcmVxdWlyZSgnLi4vaGVscGVyLmpzJyk7XHJcblx0Ly9UT0RPIC0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciBpcyBiZXR0ZXIgb3IgbmFoPyBIZWFyZCBwZXJmb3JtYW5jZSBpcyB3b3JzZSBidXQgaG93IGJhZCBpcyBpdD8gd2h5IHF1ZXJ5c2VsZWN0b3Igb3ZlciBnZXRlbGVtZW50P1xyXG5cdC8vIFRISVMgSVMgVE9PIFNISVQsIElUUyBUT08gREVQRU5ERU5UIE9OIEhBUkQgQ09ERUQgVkFSSUFCTEVTOyBDQU4gQU5HVUxBUiAyIERFUEVOREVOQ1kgSU5KRUNUSU9OIEhFTFA/IEkgS05PV1xyXG5cdC8vIFJFQUNUIENBTiBXSVRIIElUUyBDT01QT05FTlQgQkFTRUQgTElCUkFSWTsgV0hBVCBBQk9VVCBFTUJFUj8gV0hZIEFSRSBQRU9QTEUgRElUQ0hJTkcgRU1CRVI/IFRPTyBPTEQ/IEtOT0NLT1VUIE1WVk0gSEVMUFM/PyBFUVVJVkFMRU5UIEZPUiBWQU5JTExBIEpTP1xyXG5cdGNvbnN0IHN1Ym1pdFRleHRmaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXRUZXh0ZmllbGQnKTtcclxuXHRjb25zdCBmYWlsQmFja2dyb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ZhaWxCYWNrZ3JvdW5kJylbMF07XHJcblx0Y29uc3QgaW1hZ2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VzJylbMF07XHJcblx0Y29uc3QgaW1hZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZScpO1xyXG5cdGNvbnN0IGluc3RydWN0aW9uUGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbnN0cnVjdGlvblBhbmVsJylbMF07XHJcblx0Y29uc3QgYWRkUG9pbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWRkUG9pbnRzJylbMF07XHJcblx0Y29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3dyYXBwZXInKVswXTtcclxuXHRjb25zdCBzbGlkZXJQYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NsaWRlclBhbmVsJylbMF07XHJcblx0Y29uc3QgaGlnaFNjb3JlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaGlnaFNjb3JlJyk7XHJcblx0Y29uc3QgdGV4dGZpZWxkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N1Ym1pdFRleHRmaWVsZCcpO1xyXG5cdGxldCBpbWFnZUl0ZXJhdGlvbiA9IDA7XHJcblxyXG5cdGZ1bmN0aW9uIEJ1dHRvbihpZCkge1xyXG5cdFx0dGhpcy5idXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcblx0XHR0aGlzLmNvdW50ZG93blBhbmVsID0gbmV3IENvdW50ZG93blBhbmVsKCdjb3VudGRvd25QYW5lbCcpO1xyXG5cdFx0dGhpcy5zbGlkZXIgPSBuZXcgU2xpZGVyKCdzbGlkZXJQYW5lbCcpO1xyXG5cdH07XHJcblxyXG5cdC8qKlxyXG5cdCAqIFdoZW4gY2xpY2tlZCwgc3RhcnQgdGhlIGNvdW50ZG93biBwYW5lbC5cclxuXHQgKiBAcGFyYW0gIHtJbnRlZ2VyfSBDb3VudGRvd24gbnVtYmVyXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IFRoZSBmdW5jdGlvbiB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW4gdGhlIGNvdW50ZG93biBudW1iZXIgcmVhY2hlcyAwLlxyXG5cdCAqIEByZXR1cm4ge1t0eXBlXX1cclxuXHQgKi9cclxuXHQvLyBUSElTIFBST1RPVFlQRSBPUiBNT0RVTEUgUEFUVEVSTiBJUyBCRVRURVI/Pz8gV0hBVCBBQk9VVCBQVUIvU1VCIElNUExFTUVOVEFUSU9OP1xyXG5cdC8vIElGIEhBVkUgVElNRSwgU0VFIElGIEVTNiBBUlJPVyBGVU5DVElPTiBJUyBNT1JFIFJFQURBQkxFIE9SIE5PVFxyXG5cdC8vIEFORCBBTEwgVEhJUyBGVU5DVElPTlMuLi5NQVlCRSBTRVBFUkFURSBJVCBJTlRPIERJRkZFUkVOVCBDT01QT05FTlRTP1xyXG5cdEJ1dHRvbi5wcm90b3R5cGUuc3RhcnRDb3VudGRvd25Gb3JTbGlkZXIgPSBmdW5jdGlvbihjb3VudGRvd25OdW1iZXIsIGNhbGxiYWNrKSB7XHJcblx0XHQvLyBJcyB1c2luZyBzZWxmIG9rYXk/IENhdXNlIHRoZXJlcyB3aW5kb3cuc2VsZi4uLmJ1dCB3aWxsIEkgZXZlciB1c2UgdGhhdD8/P1xyXG5cdFx0Y29uc3Qgc2VsZiA9IHRoaXM7XHJcblx0XHR0aGlzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRjYWxsYmFjaygpO1xyXG5cdFx0XHRIZWxwZXIudG9nZ2xlQ2xhc3NGb3JBbmltYXRpb24od3JhcHBlciwgJ2dyYXlzY2FsZUJhY2tncm91bmRBbmltYXRpb24nKTtcclxuXHRcdFx0c2VsZi5jb3VudGRvd25QYW5lbC5zdGFydENvdW50ZG93blRpbWVyKGNvdW50ZG93bk51bWJlciwgc2VsZi5zbGlkZXIuc3RhcnRTbGlkZXIuYmluZChzZWxmLnNsaWRlcikpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBXaGVuIGNsaWNrZWQsIGNoZWNrIGlmIHRoZSB1c2VyIGlucHV0IGlzIHZhbGlkOyBpZiBpdCBpcyB2YWxpZCwgaXQgd2lsbCByZW1vdmUgYW4gaW1hZ2UgYW5kIGFkZCBzb21lIHBvaW50cywgZWxzZSBkaXNwbGF5IGEgZmFpbCBhbmltYXRpb24uXHJcblx0ICovXHJcblx0QnV0dG9uLnByb3RvdHlwZS5zdWJtaXQgPSBmdW5jdGlvbigpIHtcclxuXHRcdHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0ICBcdFx0aWYgKEhlbHBlci52YWxpZGF0ZUlmSW5wdXRJc0RvdGFIZXJvTmFtZShpbWFnZVtpbWFnZUl0ZXJhdGlvbl0sIHNlbGYuc3VibWl0VGV4dGZpZWxkKSkge1xyXG5cdCAgXHRcdFx0SGVscGVyLmhpZGVFbGVtZW50KGltYWdlW2ltYWdlSXRlcmF0aW9uXSk7XHJcblx0ICBcdFx0XHRpbWFnZUl0ZXJhdGlvbisrO1xyXG5cdCAgXHRcdFx0YWRkUG9pbnRzLmlubmVySFRNTCA9IFwiKzEwMFwiO1xyXG5cdCAgXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBoaWdoU2NvcmUubGVuZ3RoOyBpKyspIHtcclxuXHQgIFx0XHRcdFx0aGlnaFNjb3JlW2ldLmlubmVySFRNTCA9IHBhcnNlSW50KGhpZ2hTY29yZVtpXS5pbm5lckhUTUwpICsgMTAwO1xyXG5cdCAgXHRcdFx0fVxyXG5cdCAgXHRcdFx0SGVscGVyLnRvZ2dsZUNsYXNzRm9yQW5pbWF0aW9uKGFkZFBvaW50cywgJ2FkZFBvaW50c0FuaW1hdGlvbicpO1xyXG5cdCAgXHRcdFx0SGVscGVyLnJlbW92ZUNsYXNzKHNlbGYuc3VibWl0VGV4dGZpZWxkLCAnc2hha2VUZXh0ZmllbGRBbmltYXRpb24nKTtcclxuXHQgIFx0XHR9IGVsc2Uge1xyXG5cdFx0XHRcdEhlbHBlci5hZGRDbGFzcyhzZWxmLnN1Ym1pdFRleHRmaWVsZCwgJ3NoYWtlVGV4dGZpZWxkQW5pbWF0aW9uJyk7XHJcblx0ICBcdFx0fVxyXG5cdCAgXHRcdHRleHRmaWVsZC52YWx1ZSA9ICcnO1xyXG5cdCAgXHRcdGlmICh0eXBlb2YgaW1hZ2VbaW1hZ2VJdGVyYXRpb25dID09PSAndW5kZWZpbmVkJykge1xyXG5cdCAgXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgncmVzdWx0VGV4dCcpWzBdLmlubmVySFRNTCA9ICdFeiBXaW4hJztcclxuXHQgIFx0XHRcdEhlbHBlci5zaG93RWxlbWVudChmYWlsQmFja2dyb3VuZCk7XHJcblx0ICBcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RvciBmb3Igd2hlbiB0aGUgc3RhcnQgYnV0dG9uIGlzIGNsaWNrZWQuXHJcblx0ICogQHBhcmFtICB7SW50ZWdlcn0gY291bnRkb3duIG51bWJlci5cclxuXHQgKi9cclxuXHRCdXR0b24ucHJvdG90eXBlLmluaXRTdGFydCA9IGZ1bmN0aW9uKGNvdW50ZG93bk51bWJlcikge1xyXG5cdFx0Y29uc3QgY2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0SGVscGVyLmhpZGVFbGVtZW50KGluc3RydWN0aW9uUGFuZWwpO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5zdGFydENvdW50ZG93bkZvclNsaWRlcihDT1VOVERPV05fTlVNQkVSLCBjYWxsYmFjayk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBDb25zdHJ1Y3RvciBmb3Igd2hlbiB0aGUgZmFpbCBidXR0b24gaXMgY2xpY2tlZC5cclxuXHQgKiBAcGFyYW0gIHtJbnRlZ2VyfSBjb3VudGRvd24gbnVtYmVyLlxyXG5cdCAqL1xyXG5cdEJ1dHRvbi5wcm90b3R5cGUuaW5pdEZhaWwgPSBmdW5jdGlvbihjb3VudGRvd25OdW1iZXIpIHtcclxuXHRcdGNvbnN0IGNhbGxiYWNrID0gZnVuY3Rpb24oKSB7XHJcblx0XHRcdEhlbHBlci5oaWRlRWxlbWVudChmYWlsQmFja2dyb3VuZCwgc2xpZGVyUGFuZWwpO1xyXG5cdFx0XHQvLyByZXNldCB0aGUgaW1hZ2VzXHJcblx0XHRcdGltYWdlcy5zdHlsZS5tYXJnaW5MZWZ0ID0gJzEwMCUnO1xyXG4gIFx0XHRcdGltYWdlcy5zdHlsZS50cmFuc2l0aW9uID0gJzBzJztcclxuICBcdFx0ICBcdGZvciAobGV0IGkgPSAwOyBpIDwgaW1hZ2UubGVuZ3RoOyBpKyspIHtcclxuICBcdFx0XHRcdGltYWdlW2ldLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gIFx0XHRcdH1cclxuICBcdFx0XHRpbWFnZUl0ZXJhdGlvbiA9IDA7XHJcblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgaGlnaFNjb3JlLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdFx0aGlnaFNjb3JlW2ldLmlubmVySFRNTCA9IDA7XHJcblx0XHRcdH1cclxuXHRcdFx0dGV4dGZpZWxkLnZhbHVlID0gJyc7XHJcblx0XHRcdEhlbHBlci5yZW1vdmVDbGFzcyhhZGRQb2ludHMsICdhZGRQb2ludHNBbmltYXRpb24nKTtcclxuXHRcdFx0SGVscGVyLnJlbW92ZUNsYXNzKHN1Ym1pdFRleHRmaWVsZCwgJ3NoYWtlVGV4dGZpZWxkQW5pbWF0aW9uJyk7XHJcblx0XHR9XHJcblx0XHR0aGlzLnN0YXJ0Q291bnRkb3duRm9yU2xpZGVyKENPVU5URE9XTl9OVU1CRVIsIGNhbGxiYWNrKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBCdXR0b247XHJcbn0pKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9jb21wb25lbnRzL2J1dHRvbi5qc1xuICoqLyIsIi8qKlxyXG4gKiBUaGlzIGlzIHRoZSBjb3VudGRvd24gcGFuZWw7IGl0IHdpbGwgY291bnRkb3duIHVudGlsIGl0IHJlYWNoZXMgMCBiZWZvcmUgaXQgZGlzcGxheXMgdGhlIHNsaWRlciBwYW5lbC5cclxuICovXHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cdFxyXG5cdGNvbnN0IEhlbHBlciA9IHJlcXVpcmUoJy4uL2hlbHBlci5qcycpO1xyXG5cdFxyXG5cdGZ1bmN0aW9uIGNvdW50ZG93blBhbmVsKGlkKSB7XHJcblx0XHR0aGlzLmNvdW50ZG93blBhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3RhcnQgdGhlIGNvdW50ZG93bjsgaXQgd2lsbCBjb3VudGRvd24gdGhlIG51bWJlciBkaXNwbGF5ZWQgb24gdGhlIHNjcmVlbiB1bnRpbCBpdCByZWFjaGVzIDAsIHdoaWNoIGJ5IHRoZW4gaXQgd2lsbCBkaXNwbGF5IHRoZSBzbGlkZXIgcGFuZWwuXHJcblx0ICogQHBhcmFtICB7SW50ZWdlcn0gdGhlIGNvdW50ZG93biBudW1iZXIsIGUuZy4gaWYgMywgaXQgd2lsbCBzdGFydCB0aGUgY291bnRkb3duIGZyb20gMy5cclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gVGhlIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBjYWxsZWQgb25jZSB0aGUgY291bnRkb3duIHJlYWNoZXMgMC5cclxuXHQgKi9cclxuXHRjb3VudGRvd25QYW5lbC5wcm90b3R5cGUuc3RhcnRDb3VudGRvd25UaW1lciA9IGZ1bmN0aW9uKGNvdW50ZG93bk51bWJlciwgY2FsbGJhY2spIHtcclxuXHRcdGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cdFx0SGVscGVyLnNob3dFbGVtZW50KHRoaXMuY291bnRkb3duUGFuZWwpO1xyXG5cdFx0dGhpcy5jb3VudGRvd25QYW5lbC5pbm5lckhUTUwgPSBcIlwiO1xyXG5cdFx0Y29uc3QgY291bnREb3duVGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuICAgICAgXHRcdGlmIChjb3VudGRvd25OdW1iZXIgPT09IDApIHtcclxuICAgICAgICBcdFx0Y2xlYXJJbnRlcnZhbChjb3VudERvd25UaW1lcik7XHJcbiAgICAgICAgXHRcdEhlbHBlci5oaWRlRWxlbWVudChzZWxmLmNvdW50ZG93blBhbmVsKTtcclxuICAgICAgICBcdFx0Y2FsbGJhY2soKTtcclxuICAgICAgICBcdH1cclxuICAgICAgICBcdHNlbGYuY291bnRkb3duUGFuZWwuaW5uZXJIVE1MID0gY291bnRkb3duTnVtYmVyLS07XHJcbiAgICBcdH0sIDEwMDApO1xyXG5cdH1cclxuXHJcblx0cmV0dXJuIGNvdW50ZG93blBhbmVsO1xyXG59KSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvY29tcG9uZW50cy9jb3VudGRvd25fcGFuZWwuanNcbiAqKi8iLCIvLyBpcyBpdCByZWFsbHkgdGhlIGJlc3Qgd2F5Pz8/IGxvb2sgdXAgQ29tbW9uSlMvQU1EL0VTNiBpbXBvcnQvZXhwb3J0ICg8LS0gSSBndWVzcyB0aGlzIGlzIE9LIHNvIGZhcilcclxuLy8gV2hhdCBhYm91dCBpbnN0ZWFkIG9mIEhlbHBlci5tZXRob2QoKSwgdXNlIE9iamVjdC5jcmVhdGU/IERvZXMgdGhpcyBoZWxwP1xyXG4vLyBodHRwOi8vcmVxdWlyZWpzLm9yZy9kb2NzL25vZGUuaHRtbCMxXHJcbi8vIEJ5IHVzaW5nIFJlcXVpcmVKUyBvbiB0aGUgc2VydmVyLCB5b3UgY2FuIHVzZSBvbmUgZm9ybWF0IGZvciBhbGwgeW91ciBtb2R1bGVzLCB3aGV0aGVyIHRoZXkgYXJlIHJ1bm5pbmcgc2VydmVyIHNpZGUgb3IgaW4gdGhlIGJyb3dzZXIuIChobW0uLi4pXHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cdFxyXG5cdGNvbnN0IElMTEVHQUxfQ0hBUkFDVEVSUyA9IG5ldyBSZWdFeHAoL1tcXC1cXHNdKy8pO1xyXG5cclxuICBcdC8qKlxyXG4gIFx0ICogQ29udmVydCBzdHJpbmcgdG8gbG93ZXIgY2FzZSBhbmQgcmVtb3ZlIGlsbGVnYWwgY2hhcmFjdGVycy5cclxuICBcdCAqL1xyXG4gIFx0U3RyaW5nLnByb3RvdHlwZS50b0xvd2VyQ2FzZUFuZFJlbW92ZUlsbGVnYWxDaGFyYWN0ZXJzID0gZnVuY3Rpb24oKSB7XHJcbiAgXHRcdGxldCBsb3dlckNhc2VWYWx1ZSA9IHRoaXMudG9Mb3dlckNhc2UoKTtcclxuICBcdFx0cmV0dXJuIGxvd2VyQ2FzZVZhbHVlLnJlcGxhY2UoSUxMRUdBTF9DSEFSQUNURVJTLCAnJyk7XHJcbiAgXHR9XHJcbiAgXHRcclxuXHQvKipcclxuXHQgKiBGaW5kIHdoaWNoIENTUyB0cmFuc2l0aW9uIGV2ZW50cyBlbmQuXHJcblx0ICogaHR0cHM6Ly9qb25zdWguY29tL2Jsb2cvZGV0ZWN0LXRoZS1lbmQtb2YtY3NzLWFuaW1hdGlvbnMtYW5kLXRyYW5zaXRpb25zLXdpdGgtamF2YXNjcmlwdC9cclxuXHQgKi9cclxuXHRmdW5jdGlvbiB3aGljaFRyYW5zaXRpb25FdmVudCgpe1xyXG5cdCAgdmFyIHQsXHJcblx0ICAgICAgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZmFrZWVsZW1lbnRcIik7XHJcblxyXG5cdCAgdmFyIHRyYW5zaXRpb25zID0ge1xyXG5cdCAgICBcInRyYW5zaXRpb25cIiAgICAgIDogXCJ0cmFuc2l0aW9uZW5kXCIsXHJcblx0ICAgIFwiT1RyYW5zaXRpb25cIiAgICAgOiBcIm9UcmFuc2l0aW9uRW5kXCIsXHJcblx0ICAgIFwiTW96VHJhbnNpdGlvblwiICAgOiBcInRyYW5zaXRpb25lbmRcIixcclxuXHQgICAgXCJXZWJraXRUcmFuc2l0aW9uXCI6IFwid2Via2l0VHJhbnNpdGlvbkVuZFwiXHJcblx0ICB9XHJcblxyXG5cdCAgZm9yICh0IGluIHRyYW5zaXRpb25zKXtcclxuXHQgICAgaWYgKGVsLnN0eWxlW3RdICE9PSB1bmRlZmluZWQpe1xyXG5cdCAgICAgIHJldHVybiB0cmFuc2l0aW9uc1t0XTtcclxuXHQgICAgfVxyXG5cdCAgfVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQHBhcmFtIHtPYmplY3R9IGVsIC0gVGhlIGVsZW1lbnQgdGhhdCB3ZSB3YW50IHRvIGZpbmQgdGhlIGN1cnJlbnQgcG9zaXRpb24gaXMgcmVsYXRpdmUgdG8gdGhlIHdpbmRvdy5cclxuXHQgKiBodHRwczovL3d3dy5raXJ1cGEuY29tL2h0bWw1L2dldF9lbGVtZW50X3Bvc2l0aW9uX3VzaW5nX2phdmFzY3JpcHQuaHRtXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gZ2V0UG9zaXRpb24oZWwpIHtcclxuXHRcdHZhciB4UG9zID0gMDtcclxuXHRcdHZhciB5UG9zID0gMDtcclxuXHJcblx0XHR3aGlsZSAoZWwpIHtcclxuXHRcdFx0aWYgKGVsLnRhZ05hbWUgPT0gXCJCT0RZXCIpIHtcclxuXHRcdFx0XHQvLyBkZWFsIHdpdGggYnJvd3NlciBxdWlya3Mgd2l0aCBib2R5L3dpbmRvdy9kb2N1bWVudCBhbmQgcGFnZSBzY3JvbGxcclxuXHRcdFx0XHR2YXIgeFNjcm9sbCA9IGVsLnNjcm9sbExlZnQgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQ7XHJcblx0XHRcdFx0dmFyIHlTY3JvbGwgPSBlbC5zY3JvbGxUb3AgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcDtcclxuXHJcblx0XHRcdFx0eFBvcyArPSAoZWwub2Zmc2V0TGVmdCAtIHhTY3JvbGwgKyBlbC5jbGllbnRMZWZ0KTtcclxuXHRcdFx0XHR5UG9zICs9IChlbC5vZmZzZXRUb3AgLSB5U2Nyb2xsICsgZWwuY2xpZW50VG9wKTtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHQvLyBmb3IgYWxsIG90aGVyIG5vbi1CT0RZIGVsZW1lbnRzXHJcblx0XHRcdFx0eFBvcyArPSAoZWwub2Zmc2V0TGVmdCAtIGVsLnNjcm9sbExlZnQgKyBlbC5jbGllbnRMZWZ0KTtcclxuXHRcdFx0XHR5UG9zICs9IChlbC5vZmZzZXRUb3AgLSBlbC5zY3JvbGxUb3AgKyBlbC5jbGllbnRUb3ApO1xyXG5cdFx0XHR9XHJcblx0XHRcdGVsID0gZWwub2Zmc2V0UGFyZW50O1xyXG5cdFx0fVxyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHg6IHhQb3MsXHJcblx0XHRcdHk6IHlQb3NcclxuXHRcdH07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBCaW5kIHRoZSBmb2N1c2VkIGVsZW1lbnQ7IGl0IHdpbGwgY2FsbCB0aGUgY2FsbGJhY2sgd2hlbiB0cmFuc2l0aW9uIGVuZHMuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSB0aGUgb2JqZWN0IHdoaWNoIHdpbGwgYmUgYmluZGVkIGJ5IGEgdHJhbnNpdGlvbiBlbmQgbGlzdGVuZXJcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gdGhlIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2hlbiB0cmFuc2l0aW9uIGVuZFxyXG5cdCAqL1xyXG4gIFx0ZnVuY3Rpb24gdHJhbnNpdGlvbkVuZChlbGVtZW50LCBjYWxsYmFjaykge1xyXG5cdCAgICBjb25zdCB0cmFuc2l0aW9uRXZlbnQgPSB3aGljaFRyYW5zaXRpb25FdmVudCgpO1xyXG5cdCAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIodHJhbnNpdGlvbkV2ZW50LCBjYWxsYmFjayk7XHJcbiAgXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIERpc3BsYXkgdGhlIGVsZW1lbnQuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgZGlzcGxheWVkLlxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHNob3dFbGVtZW50KGVsZW1lbnQsIGRpc3BsYXkpIHtcclxuXHRcdGlmICh0eXBlb2YgZGlzcGxheSAhPT0gJ3VuZGVmaW5lZCcgJiYgZGlzcGxheSAhPT0gJycpIHtcclxuXHRcdFx0ZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gZGlzcGxheTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEhpZGUgdGhlIGVsZW1lbnQuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYmUgaGlkZGVuLlxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIGhpZGVFbGVtZW50KGVsZW1lbnQpIHtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XHJcblx0XHRcdGFyZ3VtZW50c1tpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQWRkIGEgQ1NTIGNsYXNzIHRvIGFuIGVsZW1lbnQuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSBUaGUgZWxlbWVudCB0aGF0IHdpbGwgaGF2ZSB0aGUgYWRkZWQgQ1NTIGNsYXNzLlxyXG5cdCAqIEBwYXJhbSAge1N0cmluZ30gY2xhc3NOYW1lIC0gVGhlIENTUyBjbGFzcyBuYW1lXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gYWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XHJcblx0XHRpZiAoIWVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBSZW1vdmUgYSBDU1MgY2xhc3MgZnJvbSBhbiBlbGVtZW50LlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGhhdmUgdGhlIHNwZWNpZmllZCBDU1MgY2xhc3MgcmVtb3ZlZC5cclxuXHQgKiBAcGFyYW0gIHtTdHJpbmd9IGNsYXNzTmFtZSAtIFRoZSBDU1MgY2xhc3MgbmFtZVxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xyXG5cdFx0aWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcclxuXHRcdFx0ZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSk7XHJcblx0XHR9XHJcblx0XHQvLyB3ZWlyZCBoYWNrIHJ1bGUgLSBodHRwczovL2Nzcy10cmlja3MuY29tL3Jlc3RhcnQtY3NzLWFuaW1hdGlvbi9cclxuXHRcdHZvaWQgZWxlbWVudC5vZmZzZXRXaWR0aDtcdFx0XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUb2dnbGUgd2hldGhlciB0byBhZGQgb3IgcmVtb3ZlIENTUyBjbGFzcy5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBhZGQgb3IgcmVtb3ZlIHRoZSBDU1MgY2xhc3MuXHJcblx0ICogQHBhcmFtICB7U3RyaW5nfSBjbGFzc05hbWUgLSBUaGUgQ1NTIGNsYXNzIG5hbWVcclxuXHQgKi9cclxuXHRmdW5jdGlvbiB0b2dnbGVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIHtcclxuXHRcdGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XHJcblx0XHRcdHJlbW92ZUNsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcbiAgXHRcdH0gZWxzZSB7XHJcbiAgXHRcdFx0YWRkQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKTtcdFx0XHRcclxuICBcdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVG9nZ2xlIHdoZXRoZXIgdG8gYWRkIG9yIHJlbW92ZSBDU1MgY2xhc3MuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYWRkIG9yIHJlbW92ZSB0aGUgQ1NTIGNsYXNzLlxyXG5cdCAqIEBwYXJhbSAge1N0cmluZ30gY2xhc3NOYW1lIC0gVGhlIENTUyBjbGFzcyBuYW1lXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gdG9nZ2xlQ2xhc3NGb3JBbmltYXRpb24oZWxlbWVudCwgY2xhc3NOYW1lKSB7XHJcblx0XHRpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xyXG5cdFx0XHRyZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpO1xyXG4gIFx0XHR9XHJcbiAgXHRcdGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBWYWxpZGF0ZSBpZiB1c2VyIGlucHV0IGlzIGEgc3RyaW5nLlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIHRleHRmaWVsZCB0aGF0IHdpbGwgYmUgdmFsaWRhdGVkLlxyXG5cdCAqL1xyXG4gIFx0ZnVuY3Rpb24gdmFsaWRhdGVJZklucHV0SXNEb3RhSGVyb05hbWUoaW1hZ2UsIHRleHRmaWVsZCkge1xyXG5cdFx0aWYgKGltYWdlLm5hbWUudG9Mb3dlckNhc2VBbmRSZW1vdmVJbGxlZ2FsQ2hhcmFjdGVycygpID09PSB0ZXh0ZmllbGQudmFsdWUudG9Mb3dlckNhc2VBbmRSZW1vdmVJbGxlZ2FsQ2hhcmFjdGVycygpKSB7XHJcblx0XHRcdHJldHVybiB0cnVlO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG4gIFx0fVxyXG5cclxuICBcdHJldHVybiB7XHJcbiAgXHRcdHRyYW5zaXRpb25FbmQsXHJcbiAgXHRcdGdldFBvc2l0aW9uLFxyXG4gIFx0XHRzaG93RWxlbWVudCxcclxuICBcdFx0aGlkZUVsZW1lbnQsXHJcbiAgXHRcdGFkZENsYXNzLFxyXG4gIFx0XHRyZW1vdmVDbGFzcyxcclxuICBcdFx0dG9nZ2xlQ2xhc3MsXHJcbiAgXHRcdHRvZ2dsZUNsYXNzRm9yQW5pbWF0aW9uLFxyXG4gIFx0XHR2YWxpZGF0ZUlmSW5wdXRJc0RvdGFIZXJvTmFtZVxyXG4gIFx0fVxyXG59KSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvaGVscGVyLmpzXG4gKiovIiwiLyoqXHJcbiAqIFRoaXMgaXMgdGhlIHNsaWRlciB0aGF0IHdpbGwgYmUgZGlzcGxheWVkIGFmdGVyIHRoZSBjb3VudGRvd24uIEl0IHdpbGwgZGlzcGxheSBhbiBlbmRsZXNzIHN0cmVhbSBvZiBkb3RhIGltYWdlcyB0aGF0IGFyZSByZXRyaWV2ZWQgdmlhIERvdGEgQVBJLlxyXG4gKiBJdCB3aWxsIGNvbnN0YW50bHkgdHJhbnNpdGlvbiB0byB0aGUgbGVmdCB1bnRpbCBpdCByZWFjaGVzIHRvIHRoZSBzdGFydGluZyBwb3NpdGlvbiBvZiB0aGUgcGFuZWwgdGhhdCBob2xkcyB0aGUgaW1hZ2VzLCB3aGljaCBpbiB0aGF0IGNhc2UgdGhlIGdhbWVcclxuICogbG9zZS4gXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHRcclxuXHRjb25zdCBIZWxwZXIgPSByZXF1aXJlKCcuLi9oZWxwZXIuanMnKTtcclxuXHRjb25zdCBTTElERV9EVVJBVElPTiA9IDEwO1xyXG5cdGNvbnN0IFdBUk5JTkdfVEhSRVNIT0xEID0gMzA7XHJcblx0Y29uc3QgaW1hZ2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VzJylbMF07XHJcblx0Y29uc3QgaW1hZ2VzUGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZXNQYW5lbCcpWzBdO1xyXG5cdGNvbnN0IGZhaWxCYWNrZ3JvdW5kID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnZmFpbEJhY2tncm91bmQnKVswXTtcclxuXHJcblx0ZnVuY3Rpb24gc2xpZGVyKHNsaWRlcikge1xyXG5cdFx0dGhpcy5zbGlkZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHNsaWRlcilbMF07XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBHZXQgaW1hZ2VzIGZyb20gZG90YSBBUEksIGFwcGVuZGluZyBpdCB0byBhIGxpc3Qgb2YgZ2VuZXJhdGVkIGltYWdlIERPTSBlbGVtZW50LlxyXG5cdCAqL1xyXG5cdHNsaWRlci5wcm90b3R5cGUuZ2V0SW1hZ2VzID0gZnVuY3Rpb24oKSB7XHJcblx0XHQvLyBUT0RPIC0gR2V0IGxpc3Qgb2YgZG90YSBpbWFnZXMgdXNpbmcgQUpBWCwgbG9vayB1cCBQcm9taXNlcyBhbmQgR2VuZXJhdG9yc1xyXG5cdFx0Ly8gUHJvbWlzZXMgLSBhc3ljaHJvbm91cyBjYWxscywgZG8gdGhpcywgdGhlbiBkbyB0aGlzXHJcblx0XHQvLyBHZW5lcmF0b3JzIC0gc29tZXRoaW5nIGFib3V0IHdhaXRpbmcgaW5kZWZpbml0ZWx5IHVudGlsIGl0IGdldHMgaXQgKHVzZXMgdGhlIGtleXdvcmQgJ3lpZWxkJylcclxuXHRcdC8vIEFQUEFSRU5UTFkgR0VORVJBVE9SUyBJUyBBIEhBQ0ssIEVTNyAnQVNZTkMnIEtFWVdPUkQgSVMgVEhFIExFR0lUIFdBWSBPUiBTT01FIFNISVQ7IEkgVEhJTks/IFxyXG5cdFx0Ly8gVXNpbmcgWE1MSHR0cFJlcXVlc3Qgb24gYSByZW1vdGUgc2VydmVyIGdpdmVzIHlvdSAnQWNjZXNzLWNvbnRyb2wtYWxsb3ctb3JpZ2luJyBtaXNzaW5nIGVycm9yOyBsb29rIHVwIENPUlM7IG1heWJlIGNyZWF0ZSBhIFB5dGhvbiBzY3JpcHQgaW5zdGVhZFxyXG5cdFx0Lyp2YXIgb1JlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG5cdFx0b1JlcS5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xyXG5cdFx0ICAgIGNvbnNvbGUubG9nKGUudGFyZ2V0LnJlc3BvbnNlLm1lc3NhZ2UpO1xyXG5cdFx0fTtcclxuXHRcdG9SZXEub3BlbignR0VUJywgJ2h0dHBzOi8vYXBpLnN0ZWFtcG93ZXJlZC5jb20vSUVjb25ET1RBMl81NzAvR2V0SGVyb2VzL3YwMDAxLz9rZXk9NkMxQ0Y3NkM5MDc2ODM4ODYxOEYzNDhCQjczRUUwMTUmbGFuZ3VhZ2U9ZW5fdXMmZm9ybWF0PUpTT04nLCB0cnVlKTtcclxuXHRcdG9SZXEucmVzcG9uc2VUeXBlID0gJ2pzb24nO1xyXG5cdFx0b1JlcS5zZW5kKCk7Ki9cclxuXHJcblx0XHQvLyBUT0RPOiBGaXggdGhpcywgaXQncyBiZWVuIGNhbGxlZCBldmVyeXRpbWUgeW91IHN0YXJ0IGEgbmV3IGdhbWUgd2hpY2ggaXMgdmVyeSBpbmVmZmljaWVudFxyXG5cdFx0Y29uc3QgZG90YUhlcm9lc0pzb24gPSBKU09OLnBhcnNlKHRoaXMuc3R1YkRvdGFIZXJvZXMoKSk7XHJcblx0XHRjb25zdCBmcmFnbWVudCA9IGRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtcclxuXHRcdGNvbnN0IGhlcm9lcyA9IGRvdGFIZXJvZXNKc29uLnJlc3VsdC5oZXJvZXM7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGhlcm9lcy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRjb25zdCBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG5cdFx0XHRpbWFnZS5jbGFzc05hbWUgPSAnaW1hZ2UnO1xyXG5cdFx0XHRpbWFnZS5zcmMgPSAnaHR0cDovL2Nkbi5kb3RhMi5jb20vYXBwcy9kb3RhMi9pbWFnZXMvaGVyb2VzLycgKyBoZXJvZXNbaV0ubmFtZS5yZXBsYWNlKCducGNfZG90YV9oZXJvXycsICcnKSArICdfbGcucG5nJztcclxuXHRcdFx0Ly9JdCBzaG91bGQgYmUgVHVza2FyLCBub3QgVHVzayFcclxuXHRcdFx0aWYgKGhlcm9lc1tpXS5sb2NhbGl6ZWRfbmFtZSA9PT0gJ1R1c2snKSB7XHJcblx0XHRcdFx0aGVyb2VzW2ldLmxvY2FsaXplZF9uYW1lID0gJ1R1c2thcic7XHJcblx0XHRcdH1cclxuXHRcdFx0aW1hZ2UubmFtZSA9IGhlcm9lc1tpXS5sb2NhbGl6ZWRfbmFtZTtcclxuXHRcdFx0ZnJhZ21lbnQuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xyXG5cdFx0fVxyXG5cdFx0aW1hZ2VzLmFwcGVuZENoaWxkKGZyYWdtZW50KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRyYW5zaXRpb24gZWZmZWN0IG9uIHRoZSBpbWFnZXMuXHJcblx0ICovXHJcblx0c2xpZGVyLnByb3RvdHlwZS5zbGlkZSA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0Y29uc3Qgc2NyZWVuV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGggfHwgZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aDtcclxuXHQgICAgY29uc3QgZGVmYXVsdFdpZHRoID0gKHNjcmVlbldpZHRoIC0gaW1hZ2VzUGFuZWwub2Zmc2V0V2lkdGgvIDIpICsgaW1hZ2VzUGFuZWwub2Zmc2V0V2lkdGg7XHJcblx0ICAgIGNvbnN0IHdhcm5pbmdXaWR0aCA9IGRlZmF1bHRXaWR0aCAqIFdBUk5JTkdfVEhSRVNIT0xEIC8gMTAwO1xyXG5cdCAgICBsZXQgdGltZXI7XHJcblxyXG5cdFx0aW1hZ2VzLnN0eWxlLm1hcmdpbkxlZnQgPSAnMCc7XHJcblx0ICAgIGltYWdlcy5zdHlsZS50cmFuc2l0aW9uID0gU0xJREVfRFVSQVRJT04gKyAncyBsaW5lYXInO1xyXG5cdFx0SGVscGVyLnJlbW92ZUNsYXNzKGltYWdlc1BhbmVsLCAnd2FybmluZ0FuaW1hdGlvbicpO1xyXG5cclxuXHQgICAgdGltZXIgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuXHQgICAgXHRpZiAoSGVscGVyLmdldFBvc2l0aW9uKGltYWdlcykueCA8PSB3YXJuaW5nV2lkdGgpIHtcclxuXHRcdFx0XHRIZWxwZXIuYWRkQ2xhc3MoaW1hZ2VzUGFuZWwsICd3YXJuaW5nQW5pbWF0aW9uJyk7XHJcblx0XHRcdFx0Y2xlYXJJbnRlcnZhbCh0aW1lcik7XHJcblx0ICAgIFx0fVxyXG5cdCAgICB9LCAxMDAwKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEluaXRpYWxpemUgdGhlIHNsaWRlciB0cmFuc2l0aW9uLCBkaXNwbGF5IHRoZSBmYWlsIHBhbmVsIHdoZW4gdGhlIHRyYW5zaXRpb24gZW5kcy5cclxuXHQgKi9cclxuXHRzbGlkZXIucHJvdG90eXBlLnN0YXJ0U2xpZGVyID0gZnVuY3Rpb24oKSB7XHJcblx0XHRpZiAoaW1hZ2VzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xyXG5cdFx0XHR0aGlzLmdldEltYWdlcygpO1xyXG5cdFx0fVxyXG5cdFx0SGVscGVyLnNob3dFbGVtZW50KHRoaXMuc2xpZGVyKTtcclxuXHRcdHRoaXMuc2xpZGUoKTtcclxuXHRcdEhlbHBlci50cmFuc2l0aW9uRW5kKGltYWdlcywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Jlc3VsdFRleHQnKVswXS5pbm5lckhUTUwgPSAnWW91IGxvc2UuLi4nO1xyXG5cdFx0XHRIZWxwZXIuc2hvd0VsZW1lbnQoZmFpbEJhY2tncm91bmQpO1xyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHQvLyBUZW1wb3JhcnkgdW50aWwgYW4gYWN0dWFsIGNhbGwgdG8gQVBJIGlzIG1hZGVcclxuXHRzbGlkZXIucHJvdG90eXBlLnN0dWJEb3RhSGVyb2VzID0gZnVuY3Rpb24oKSB7XHJcblx0XHRyZXR1cm4gYHtcclxuXHRcdFwicmVzdWx0XCI6e1xyXG5cdFx0XCJoZXJvZXNcIjpbXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fYW50aW1hZ2VcIixcclxuXHRcdFwiaWRcIjoxLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiQW50aS1NYWdlXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fYXhlXCIsXHJcblx0XHRcImlkXCI6MixcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkF4ZVwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2JhbmVcIixcclxuXHRcdFwiaWRcIjozLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiQmFuZVwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2Jsb29kc2Vla2VyXCIsXHJcblx0XHRcImlkXCI6NCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkJsb29kc2Vla2VyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fY3J5c3RhbF9tYWlkZW5cIixcclxuXHRcdFwiaWRcIjo1LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiQ3J5c3RhbCBNYWlkZW5cIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19kcm93X3JhbmdlclwiLFxyXG5cdFx0XCJpZFwiOjYsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJEcm93IFJhbmdlclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2VhcnRoc2hha2VyXCIsXHJcblx0XHRcImlkXCI6NyxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkVhcnRoc2hha2VyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fanVnZ2VybmF1dFwiLFxyXG5cdFx0XCJpZFwiOjgsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJKdWdnZXJuYXV0XCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fbWlyYW5hXCIsXHJcblx0XHRcImlkXCI6OSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIk1pcmFuYVwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX25ldmVybW9yZVwiLFxyXG5cdFx0XCJpZFwiOjExLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiU2hhZG93IEZpZW5kXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fbW9ycGhsaW5nXCIsXHJcblx0XHRcImlkXCI6MTAsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJNb3JwaGxpbmdcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19waGFudG9tX2xhbmNlclwiLFxyXG5cdFx0XCJpZFwiOjEyLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiUGhhbnRvbSBMYW5jZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19wdWNrXCIsXHJcblx0XHRcImlkXCI6MTMsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJQdWNrXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fcHVkZ2VcIixcclxuXHRcdFwiaWRcIjoxNCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlB1ZGdlXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fcmF6b3JcIixcclxuXHRcdFwiaWRcIjoxNSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlJhem9yXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fc2FuZF9raW5nXCIsXHJcblx0XHRcImlkXCI6MTYsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJTYW5kIEtpbmdcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19zdG9ybV9zcGlyaXRcIixcclxuXHRcdFwiaWRcIjoxNyxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlN0b3JtIFNwaXJpdFwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3N2ZW5cIixcclxuXHRcdFwiaWRcIjoxOCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlN2ZW5cIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb190aW55XCIsXHJcblx0XHRcImlkXCI6MTksXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJUaW55XCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fdmVuZ2VmdWxzcGlyaXRcIixcclxuXHRcdFwiaWRcIjoyMCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlZlbmdlZnVsIFNwaXJpdFwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3dpbmRydW5uZXJcIixcclxuXHRcdFwiaWRcIjoyMSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIldpbmRyYW5nZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb196dXVzXCIsXHJcblx0XHRcImlkXCI6MjIsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJaZXVzXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fa3Vua2thXCIsXHJcblx0XHRcImlkXCI6MjMsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJLdW5ra2FcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19saW5hXCIsXHJcblx0XHRcImlkXCI6MjUsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJMaW5hXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fbGljaFwiLFxyXG5cdFx0XCJpZFwiOjMxLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiTGljaFwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2xpb25cIixcclxuXHRcdFwiaWRcIjoyNixcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkxpb25cIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19zaGFkb3dfc2hhbWFuXCIsXHJcblx0XHRcImlkXCI6MjcsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJTaGFkb3cgU2hhbWFuXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fc2xhcmRhclwiLFxyXG5cdFx0XCJpZFwiOjI4LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiU2xhcmRhclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3RpZGVodW50ZXJcIixcclxuXHRcdFwiaWRcIjoyOSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlRpZGVodW50ZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb193aXRjaF9kb2N0b3JcIixcclxuXHRcdFwiaWRcIjozMCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIldpdGNoIERvY3RvclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3Jpa2lcIixcclxuXHRcdFwiaWRcIjozMixcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlJpa2lcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19lbmlnbWFcIixcclxuXHRcdFwiaWRcIjozMyxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkVuaWdtYVwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3RpbmtlclwiLFxyXG5cdFx0XCJpZFwiOjM0LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiVGlua2VyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fc25pcGVyXCIsXHJcblx0XHRcImlkXCI6MzUsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJTbmlwZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19uZWNyb2x5dGVcIixcclxuXHRcdFwiaWRcIjozNixcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIk5lY3JvcGhvc1wiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3dhcmxvY2tcIixcclxuXHRcdFwiaWRcIjozNyxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIldhcmxvY2tcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19iZWFzdG1hc3RlclwiLFxyXG5cdFx0XCJpZFwiOjM4LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiQmVhc3RtYXN0ZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19xdWVlbm9mcGFpblwiLFxyXG5cdFx0XCJpZFwiOjM5LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiUXVlZW4gb2YgUGFpblwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3Zlbm9tYW5jZXJcIixcclxuXHRcdFwiaWRcIjo0MCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlZlbm9tYW5jZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19mYWNlbGVzc192b2lkXCIsXHJcblx0XHRcImlkXCI6NDEsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJGYWNlbGVzcyBWb2lkXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fc2tlbGV0b25fa2luZ1wiLFxyXG5cdFx0XCJpZFwiOjQyLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiV3JhaXRoIEtpbmdcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19kZWF0aF9wcm9waGV0XCIsXHJcblx0XHRcImlkXCI6NDMsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJEZWF0aCBQcm9waGV0XCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fcGhhbnRvbV9hc3Nhc3NpblwiLFxyXG5cdFx0XCJpZFwiOjQ0LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiUGhhbnRvbSBBc3Nhc3NpblwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3B1Z25hXCIsXHJcblx0XHRcImlkXCI6NDUsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJQdWduYVwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3RlbXBsYXJfYXNzYXNzaW5cIixcclxuXHRcdFwiaWRcIjo0NixcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlRlbXBsYXIgQXNzYXNzaW5cIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb192aXBlclwiLFxyXG5cdFx0XCJpZFwiOjQ3LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiVmlwZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19sdW5hXCIsXHJcblx0XHRcImlkXCI6NDgsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJMdW5hXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fZHJhZ29uX2tuaWdodFwiLFxyXG5cdFx0XCJpZFwiOjQ5LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiRHJhZ29uIEtuaWdodFwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2RhenpsZVwiLFxyXG5cdFx0XCJpZFwiOjUwLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiRGF6emxlXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fcmF0dGxldHJhcFwiLFxyXG5cdFx0XCJpZFwiOjUxLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiQ2xvY2t3ZXJrXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fbGVzaHJhY1wiLFxyXG5cdFx0XCJpZFwiOjUyLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiTGVzaHJhY1wiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2Z1cmlvblwiLFxyXG5cdFx0XCJpZFwiOjUzLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiTmF0dXJlJ3MgUHJvcGhldFwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2xpZmVfc3RlYWxlclwiLFxyXG5cdFx0XCJpZFwiOjU0LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiTGlmZXN0ZWFsZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19kYXJrX3NlZXJcIixcclxuXHRcdFwiaWRcIjo1NSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkRhcmsgU2VlclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2NsaW5relwiLFxyXG5cdFx0XCJpZFwiOjU2LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiQ2xpbmt6XCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fb21uaWtuaWdodFwiLFxyXG5cdFx0XCJpZFwiOjU3LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiT21uaWtuaWdodFwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2VuY2hhbnRyZXNzXCIsXHJcblx0XHRcImlkXCI6NTgsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJFbmNoYW50cmVzc1wiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2h1c2thclwiLFxyXG5cdFx0XCJpZFwiOjU5LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiSHVza2FyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fbmlnaHRfc3RhbGtlclwiLFxyXG5cdFx0XCJpZFwiOjYwLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiTmlnaHQgU3RhbGtlclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2Jyb29kbW90aGVyXCIsXHJcblx0XHRcImlkXCI6NjEsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJCcm9vZG1vdGhlclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2JvdW50eV9odW50ZXJcIixcclxuXHRcdFwiaWRcIjo2MixcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkJvdW50eSBIdW50ZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb193ZWF2ZXJcIixcclxuXHRcdFwiaWRcIjo2MyxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIldlYXZlclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2pha2lyb1wiLFxyXG5cdFx0XCJpZFwiOjY0LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiSmFraXJvXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fYmF0cmlkZXJcIixcclxuXHRcdFwiaWRcIjo2NSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkJhdHJpZGVyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fY2hlblwiLFxyXG5cdFx0XCJpZFwiOjY2LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiQ2hlblwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3NwZWN0cmVcIixcclxuXHRcdFwiaWRcIjo2NyxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlNwZWN0cmVcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19kb29tX2JyaW5nZXJcIixcclxuXHRcdFwiaWRcIjo2OSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkRvb21cIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19hbmNpZW50X2FwcGFyaXRpb25cIixcclxuXHRcdFwiaWRcIjo2OCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkFuY2llbnQgQXBwYXJpdGlvblwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3Vyc2FcIixcclxuXHRcdFwiaWRcIjo3MCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlVyc2FcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19zcGlyaXRfYnJlYWtlclwiLFxyXG5cdFx0XCJpZFwiOjcxLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiU3Bpcml0IEJyZWFrZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19neXJvY29wdGVyXCIsXHJcblx0XHRcImlkXCI6NzIsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJHeXJvY29wdGVyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fYWxjaGVtaXN0XCIsXHJcblx0XHRcImlkXCI6NzMsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJBbGNoZW1pc3RcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19pbnZva2VyXCIsXHJcblx0XHRcImlkXCI6NzQsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJJbnZva2VyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fc2lsZW5jZXJcIixcclxuXHRcdFwiaWRcIjo3NSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlNpbGVuY2VyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fb2JzaWRpYW5fZGVzdHJveWVyXCIsXHJcblx0XHRcImlkXCI6NzYsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJPdXR3b3JsZCBEZXZvdXJlclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2x5Y2FuXCIsXHJcblx0XHRcImlkXCI6NzcsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJMeWNhblwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2JyZXdtYXN0ZXJcIixcclxuXHRcdFwiaWRcIjo3OCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkJyZXdtYXN0ZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19zaGFkb3dfZGVtb25cIixcclxuXHRcdFwiaWRcIjo3OSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlNoYWRvdyBEZW1vblwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2xvbmVfZHJ1aWRcIixcclxuXHRcdFwiaWRcIjo4MCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkxvbmUgRHJ1aWRcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19jaGFvc19rbmlnaHRcIixcclxuXHRcdFwiaWRcIjo4MSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkNoYW9zIEtuaWdodFwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX21lZXBvXCIsXHJcblx0XHRcImlkXCI6ODIsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJNZWVwb1wiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3RyZWFudFwiLFxyXG5cdFx0XCJpZFwiOjgzLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiVHJlYW50IFByb3RlY3RvclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX29ncmVfbWFnaVwiLFxyXG5cdFx0XCJpZFwiOjg0LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiT2dyZSBNYWdpXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fdW5keWluZ1wiLFxyXG5cdFx0XCJpZFwiOjg1LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiVW5keWluZ1wiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3J1Ymlja1wiLFxyXG5cdFx0XCJpZFwiOjg2LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiUnViaWNrXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fZGlzcnVwdG9yXCIsXHJcblx0XHRcImlkXCI6ODcsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJEaXNydXB0b3JcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19ueXhfYXNzYXNzaW5cIixcclxuXHRcdFwiaWRcIjo4OCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIk55eCBBc3Nhc3NpblwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX25hZ2Ffc2lyZW5cIixcclxuXHRcdFwiaWRcIjo4OSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIk5hZ2EgU2lyZW5cIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19rZWVwZXJfb2ZfdGhlX2xpZ2h0XCIsXHJcblx0XHRcImlkXCI6OTAsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJLZWVwZXIgb2YgdGhlIExpZ2h0XCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fd2lzcFwiLFxyXG5cdFx0XCJpZFwiOjkxLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiSW9cIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb192aXNhZ2VcIixcclxuXHRcdFwiaWRcIjo5MixcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlZpc2FnZVwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3NsYXJrXCIsXHJcblx0XHRcImlkXCI6OTMsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJTbGFya1wiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX21lZHVzYVwiLFxyXG5cdFx0XCJpZFwiOjk0LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiTWVkdXNhXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fdHJvbGxfd2FybG9yZFwiLFxyXG5cdFx0XCJpZFwiOjk1LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiVHJvbGwgV2FybG9yZFwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2NlbnRhdXJcIixcclxuXHRcdFwiaWRcIjo5NixcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkNlbnRhdXIgV2FycnVubmVyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fbWFnbmF0YXVyXCIsXHJcblx0XHRcImlkXCI6OTcsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJNYWdudXNcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19zaHJlZGRlclwiLFxyXG5cdFx0XCJpZFwiOjk4LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiVGltYmVyc2F3XCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fYnJpc3RsZWJhY2tcIixcclxuXHRcdFwiaWRcIjo5OSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkJyaXN0bGViYWNrXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fdHVza1wiLFxyXG5cdFx0XCJpZFwiOjEwMCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlR1c2tcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19za3l3cmF0aF9tYWdlXCIsXHJcblx0XHRcImlkXCI6MTAxLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiU2t5d3JhdGggTWFnZVwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2FiYWRkb25cIixcclxuXHRcdFwiaWRcIjoxMDIsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJBYmFkZG9uXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fZWxkZXJfdGl0YW5cIixcclxuXHRcdFwiaWRcIjoxMDMsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJFbGRlciBUaXRhblwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2xlZ2lvbl9jb21tYW5kZXJcIixcclxuXHRcdFwiaWRcIjoxMDQsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJMZWdpb24gQ29tbWFuZGVyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fZW1iZXJfc3Bpcml0XCIsXHJcblx0XHRcImlkXCI6MTA2LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiRW1iZXIgU3Bpcml0XCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fZWFydGhfc3Bpcml0XCIsXHJcblx0XHRcImlkXCI6MTA3LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiRWFydGggU3Bpcml0XCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fdGVycm9yYmxhZGVcIixcclxuXHRcdFwiaWRcIjoxMDksXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJUZXJyb3JibGFkZVwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3Bob2VuaXhcIixcclxuXHRcdFwiaWRcIjoxMTAsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJQaG9lbml4XCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fb3JhY2xlXCIsXHJcblx0XHRcImlkXCI6MTExLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiT3JhY2xlXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fdGVjaGllc1wiLFxyXG5cdFx0XCJpZFwiOjEwNSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlRlY2hpZXNcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb193aW50ZXJfd3l2ZXJuXCIsXHJcblx0XHRcImlkXCI6MTEyLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiV2ludGVyIFd5dmVyblwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2FyY193YXJkZW5cIixcclxuXHRcdFwiaWRcIjoxMTMsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJBcmMgV2FyZGVuXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fYWJ5c3NhbF91bmRlcmxvcmRcIixcclxuXHRcdFwiaWRcIjoxMDgsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJVbmRlcmxvcmRcIlxyXG5cdFx0fVxyXG5cdFx0XVxyXG5cdFx0LFxyXG5cdFx0XCJzdGF0dXNcIjoyMDAsXHJcblx0XHRcImNvdW50XCI6MTEyXHJcblx0XHR9XHJcblx0XHR9YFxyXG5cdH1cclxuXHJcblx0cmV0dXJuIHNsaWRlcjtcclxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2NvbXBvbmVudHMvc2xpZGVyLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5cdGZ1bmN0aW9uIFRleHRmaWVsZChpZCwgYnV0dG9uKSB7XHJcblx0XHR0aGlzLnRleHRmaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuXHRcdHRoaXMuYnV0dG9uID0gYnV0dG9uO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogU3VibWl0IGlmIHVzZXIgcHJlc3MgJ2VudGVyJy5cclxuXHQgKi9cclxuXHRUZXh0ZmllbGQucHJvdG90eXBlLnN1Ym1pdCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dmFyIHNlbGYgPSB0aGlzO1xyXG5cdFx0dGhpcy50ZXh0ZmllbGQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbihldmVudCkge1xyXG5cdFx0XHRpZiAoZXZlbnQua2V5Q29kZSA9PT0gMTMpIHtcclxuXHRcdFx0XHQvLyBMT0wgU0VMRi5CVVRUT04uQlVUVE9OPz8/IEZJWFxyXG5cdFx0XHRcdHNlbGYuYnV0dG9uLmJ1dHRvbi5jbGljaygpO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBUZXh0ZmllbGQ7XHJcbn0pKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9jb21wb25lbnRzL3RleHRmaWVsZC5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=