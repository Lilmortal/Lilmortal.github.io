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
				if (Helper.validateIfInputIsDotaHeroName(image[imageIteration], submitTextfield)) {
					Helper.hideElement(image[imageIteration]);
					imageIteration++;
					addPoints.innerHTML = "+100";
					for (var i = 0; i < highScore.length; i++) {
						highScore[i].innerHTML = parseInt(highScore[i].innerHTML) + 100;
					}
					Helper.toggleClassForAnimation(addPoints, 'addPointsAnimation');
					Helper.removeClass(submitTextfield, 'shakeTextfieldAnimation');
				} else {
					Helper.toggleClassForAnimation(submitTextfield, 'shakeTextfieldAnimation');
				}
				submitTextfield.value = '';
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
				submitTextfield.value = '';
				Helper.removeClass(submitTextfield, 'shakeTextfieldAnimation');
				Helper.removeClass(addPoints, 'addPointsAnimation');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgOGU5NWNiMWZlZjNlYTk3M2NhYjQiLCJ3ZWJwYWNrOi8vLy4vanMvaW5pdC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2J1dHRvbi5qcyIsIndlYnBhY2s6Ly8vLi9qcy9jb21wb25lbnRzL2NvdW50ZG93bl9wYW5lbC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9oZWxwZXIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy9zbGlkZXIuanMiLCJ3ZWJwYWNrOi8vLy4vanMvY29tcG9uZW50cy90ZXh0ZmllbGQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Q0EsRUFBQyxZQUFXO0FBQ1g7O0FBRUEsTUFBTSxTQUFTLG9CQUFRLENBQVIsQ0FBZjtBQUNBLE1BQU0sWUFBWSxvQkFBUSxDQUFSLENBQWxCOztBQUVBO0FBQ0E7QUFDQSxNQUFNLGNBQWMsSUFBSSxNQUFKLENBQVcsYUFBWCxDQUFwQjtBQUNBLGNBQVksU0FBWjs7QUFFQSxNQUFNLGFBQWEsSUFBSSxNQUFKLENBQVcsWUFBWCxDQUFuQjtBQUNBLGFBQVcsUUFBWDs7QUFFQSxNQUFNLGVBQWUsSUFBSSxNQUFKLENBQVcsY0FBWCxDQUFyQjtBQUNBLGVBQWEsTUFBYjs7QUFFQSxNQUFNLGtCQUFrQixJQUFJLFNBQUosQ0FBYyxpQkFBZCxFQUFpQyxZQUFqQyxDQUF4QjtBQUNBLGtCQUFnQixNQUFoQjtBQUNBLEVBbkJELEk7Ozs7Ozs7O0FDQUE7Ozs7QUFJQSxRQUFPLE9BQVAsR0FBa0IsWUFBVztBQUM1Qjs7QUFF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QUFjLE1BQWQ7QUFDQTs7QUFFRDs7O0FBR0EsWUFBVSxTQUFWLENBQW9CLE1BQXBCLEdBQTZCLFlBQVc7QUFDdkMsT0FBSSxPQUFPLElBQVg7QUFDQSxRQUFLLFNBQUwsQ0FBZSxnQkFBZixDQUFnQyxPQUFoQyxFQUF5QyxVQUFTLEtBQVQsRUFBZ0I7QUFDeEQsUUFBSSxNQUFNLE9BQU4sS0FBa0IsRUFBdEIsRUFBMEI7QUFDekI7QUFDQSxVQUFLLE1BQUwsQ0FBWSxNQUFaLENBQW1CLEtBQW5CO0FBQ0E7QUFDRCxJQUxEO0FBTUEsR0FSRDs7QUFVQSxTQUFPLFNBQVA7QUFDQSxFQXRCZ0IsRUFBakIsQyIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDhlOTVjYjFmZWYzZWE5NzNjYWI0XG4gKiovIiwiKGZ1bmN0aW9uKCkge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRjb25zdCBCdXR0b24gPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvYnV0dG9uLmpzJyk7XHJcblx0Y29uc3QgVGV4dGZpZWxkID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL3RleHRmaWVsZC5qcycpO1xyXG5cclxuXHQvL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCkuaW5pdFN0YXJ0IGJldHRlcj8gdXNlIFwidGhpc1wiP1xyXG5cdC8vIE9SIFRSWSBVU0UgRkFDVE9SWSBQQVRURVJOIE9OIFRISVM/IFxyXG5cdGNvbnN0IHN0YXJ0QnV0dG9uID0gbmV3IEJ1dHRvbignc3RhcnRCdXR0b24nKTtcclxuXHRzdGFydEJ1dHRvbi5pbml0U3RhcnQoKTtcclxuXHJcblx0Y29uc3QgZmFpbEJ1dHRvbiA9IG5ldyBCdXR0b24oJ2ZhaWxCdXR0b24nKTtcclxuXHRmYWlsQnV0dG9uLmluaXRGYWlsKCk7XHJcblxyXG5cdGNvbnN0IHN1Ym1pdEJ1dHRvbiA9IG5ldyBCdXR0b24oJ3N1Ym1pdEJ1dHRvbicpO1xyXG5cdHN1Ym1pdEJ1dHRvbi5zdWJtaXQoKTtcclxuXHJcblx0Y29uc3Qgc3VibWl0VGV4dGZpZWxkID0gbmV3IFRleHRmaWVsZCgnc3VibWl0VGV4dGZpZWxkJywgc3VibWl0QnV0dG9uKTtcclxuXHRzdWJtaXRUZXh0ZmllbGQuc3VibWl0KCk7XHJcbn0pKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9pbml0LmpzXG4gKiovIiwiLyoqXHJcbiAqIFRoaXMgaXMgYSBnZW5lcmljIGJ1dHRvbiwgd2hpY2ggaGFzIGEgbXVsdGl0dWRlIG9mIGdlbmVyaWMgdG8gc3BlY2lmaWMgZnVuY3Rpb25zIGZvciBhbGwgcG9zc2libGUgc2NlbmFyaW9zLlxyXG4gKiBAcGFyYW0ge09iamVjdH0gQnV0dG9uXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHJcblx0Y29uc3QgQ09VTlRET1dOX05VTUJFUiA9IDM7XHJcblx0Y29uc3QgQ291bnRkb3duUGFuZWwgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2NvdW50ZG93bl9wYW5lbC5qcycpO1xyXG5cdGNvbnN0IFNsaWRlciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvc2xpZGVyLmpzJyk7XHJcblx0Y29uc3QgSGVscGVyID0gcmVxdWlyZSgnLi4vaGVscGVyLmpzJyk7XHJcblx0Ly9UT0RPIC0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciBpcyBiZXR0ZXIgb3IgbmFoPyBIZWFyZCBwZXJmb3JtYW5jZSBpcyB3b3JzZSBidXQgaG93IGJhZCBpcyBpdD8gd2h5IHF1ZXJ5c2VsZWN0b3Igb3ZlciBnZXRlbGVtZW50P1xyXG5cdC8vIFRISVMgSVMgVE9PIFNISVQsIElUUyBUT08gREVQRU5ERU5UIE9OIEhBUkQgQ09ERUQgVkFSSUFCTEVTOyBDQU4gQU5HVUxBUiAyIERFUEVOREVOQ1kgSU5KRUNUSU9OIEhFTFA/IEkgS05PV1xyXG5cdC8vIFJFQUNUIENBTiBXSVRIIElUUyBDT01QT05FTlQgQkFTRUQgTElCUkFSWTsgV0hBVCBBQk9VVCBFTUJFUj8gV0hZIEFSRSBQRU9QTEUgRElUQ0hJTkcgRU1CRVI/IFRPTyBPTEQ/IEtOT0NLT1VUIE1WVk0gSEVMUFM/PyBFUVVJVkFMRU5UIEZPUiBWQU5JTExBIEpTP1xyXG5cdGNvbnN0IHN1Ym1pdFRleHRmaWVsZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdWJtaXRUZXh0ZmllbGQnKTtcclxuXHRjb25zdCBmYWlsQmFja2dyb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ZhaWxCYWNrZ3JvdW5kJylbMF07XHJcblx0Y29uc3QgaW1hZ2VzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VzJylbMF07XHJcblx0Y29uc3QgaW1hZ2UgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbWFnZScpO1xyXG5cdGNvbnN0IGluc3RydWN0aW9uUGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdpbnN0cnVjdGlvblBhbmVsJylbMF07XHJcblx0Y29uc3QgYWRkUG9pbnRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnYWRkUG9pbnRzJylbMF07XHJcblx0Y29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3dyYXBwZXInKVswXTtcclxuXHRjb25zdCBzbGlkZXJQYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3NsaWRlclBhbmVsJylbMF07XHJcblx0Y29uc3QgaGlnaFNjb3JlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaGlnaFNjb3JlJyk7XHJcblx0bGV0IGltYWdlSXRlcmF0aW9uID0gMDtcclxuXHJcblx0ZnVuY3Rpb24gQnV0dG9uKGlkKSB7XHJcblx0XHR0aGlzLmJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuXHRcdHRoaXMuY291bnRkb3duUGFuZWwgPSBuZXcgQ291bnRkb3duUGFuZWwoJ2NvdW50ZG93blBhbmVsJyk7XHJcblx0XHR0aGlzLnNsaWRlciA9IG5ldyBTbGlkZXIoJ3NsaWRlclBhbmVsJyk7XHJcblx0fTtcclxuXHJcblx0LyoqXHJcblx0ICogV2hlbiBjbGlja2VkLCBzdGFydCB0aGUgY291bnRkb3duIHBhbmVsLlxyXG5cdCAqIEBwYXJhbSAge0ludGVnZXJ9IENvdW50ZG93biBudW1iZXJcclxuXHQgKiBAcGFyYW0gIHtGdW5jdGlvbn0gVGhlIGZ1bmN0aW9uIHRoYXQgd2lsbCBiZSBjYWxsZWQgd2hlbiB0aGUgY291bnRkb3duIG51bWJlciByZWFjaGVzIDAuXHJcblx0ICogQHJldHVybiB7W3R5cGVdfVxyXG5cdCAqL1xyXG5cdC8vIFRISVMgUFJPVE9UWVBFIE9SIE1PRFVMRSBQQVRURVJOIElTIEJFVFRFUj8/PyBXSEFUIEFCT1VUIFBVQi9TVUIgSU1QTEVNRU5UQVRJT04/XHJcblx0Ly8gSUYgSEFWRSBUSU1FLCBTRUUgSUYgRVM2IEFSUk9XIEZVTkNUSU9OIElTIE1PUkUgUkVBREFCTEUgT1IgTk9UXHJcblx0Ly8gQU5EIEFMTCBUSElTIEZVTkNUSU9OUy4uLk1BWUJFIFNFUEVSQVRFIElUIElOVE8gRElGRkVSRU5UIENPTVBPTkVOVFM/XHJcblx0QnV0dG9uLnByb3RvdHlwZS5zdGFydENvdW50ZG93bkZvclNsaWRlciA9IGZ1bmN0aW9uKGNvdW50ZG93bk51bWJlciwgY2FsbGJhY2spIHtcclxuXHRcdC8vIElzIHVzaW5nIHNlbGYgb2theT8gQ2F1c2UgdGhlcmVzIHdpbmRvdy5zZWxmLi4uYnV0IHdpbGwgSSBldmVyIHVzZSB0aGF0Pz8/XHJcblx0XHRjb25zdCBzZWxmID0gdGhpcztcclxuXHRcdHRoaXMuYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKSB7XHJcblx0XHRcdGNhbGxiYWNrKCk7XHJcblx0XHRcdEhlbHBlci50b2dnbGVDbGFzc0ZvckFuaW1hdGlvbih3cmFwcGVyLCAnZ3JheXNjYWxlQmFja2dyb3VuZEFuaW1hdGlvbicpO1xyXG5cdFx0XHRzZWxmLmNvdW50ZG93blBhbmVsLnN0YXJ0Q291bnRkb3duVGltZXIoY291bnRkb3duTnVtYmVyLCBzZWxmLnNsaWRlci5zdGFydFNsaWRlci5iaW5kKHNlbGYuc2xpZGVyKSk7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFdoZW4gY2xpY2tlZCwgY2hlY2sgaWYgdGhlIHVzZXIgaW5wdXQgaXMgdmFsaWQ7IGlmIGl0IGlzIHZhbGlkLCBpdCB3aWxsIHJlbW92ZSBhbiBpbWFnZSBhbmQgYWRkIHNvbWUgcG9pbnRzLCBlbHNlIGRpc3BsYXkgYSBmYWlsIGFuaW1hdGlvbi5cclxuXHQgKi9cclxuXHRCdXR0b24ucHJvdG90eXBlLnN1Ym1pdCA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0dGhpcy5idXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcclxuXHQgIFx0XHRpZiAoSGVscGVyLnZhbGlkYXRlSWZJbnB1dElzRG90YUhlcm9OYW1lKGltYWdlW2ltYWdlSXRlcmF0aW9uXSwgc3VibWl0VGV4dGZpZWxkKSkge1xyXG5cdCAgXHRcdFx0SGVscGVyLmhpZGVFbGVtZW50KGltYWdlW2ltYWdlSXRlcmF0aW9uXSk7XHJcblx0ICBcdFx0XHRpbWFnZUl0ZXJhdGlvbisrO1xyXG5cdCAgXHRcdFx0YWRkUG9pbnRzLmlubmVySFRNTCA9IFwiKzEwMFwiO1xyXG5cdCAgXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBoaWdoU2NvcmUubGVuZ3RoOyBpKyspIHtcclxuXHQgIFx0XHRcdFx0aGlnaFNjb3JlW2ldLmlubmVySFRNTCA9IHBhcnNlSW50KGhpZ2hTY29yZVtpXS5pbm5lckhUTUwpICsgMTAwO1xyXG5cdCAgXHRcdFx0fVxyXG5cdCAgXHRcdFx0SGVscGVyLnRvZ2dsZUNsYXNzRm9yQW5pbWF0aW9uKGFkZFBvaW50cywgJ2FkZFBvaW50c0FuaW1hdGlvbicpO1xyXG5cdCAgXHRcdFx0SGVscGVyLnJlbW92ZUNsYXNzKHN1Ym1pdFRleHRmaWVsZCwgJ3NoYWtlVGV4dGZpZWxkQW5pbWF0aW9uJyk7XHJcblx0ICBcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRIZWxwZXIudG9nZ2xlQ2xhc3NGb3JBbmltYXRpb24oc3VibWl0VGV4dGZpZWxkLCAnc2hha2VUZXh0ZmllbGRBbmltYXRpb24nKTtcclxuXHQgIFx0XHR9XHJcblx0ICBcdFx0c3VibWl0VGV4dGZpZWxkLnZhbHVlID0gJyc7XHJcblx0ICBcdFx0aWYgKHR5cGVvZiBpbWFnZVtpbWFnZUl0ZXJhdGlvbl0gPT09ICd1bmRlZmluZWQnKSB7XHJcblx0ICBcdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdyZXN1bHRUZXh0JylbMF0uaW5uZXJIVE1MID0gJ0V6IFdpbiEnO1xyXG5cdCAgXHRcdFx0SGVscGVyLnNob3dFbGVtZW50KGZhaWxCYWNrZ3JvdW5kKTtcclxuXHQgIFx0XHR9XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdG9yIGZvciB3aGVuIHRoZSBzdGFydCBidXR0b24gaXMgY2xpY2tlZC5cclxuXHQgKiBAcGFyYW0gIHtJbnRlZ2VyfSBjb3VudGRvd24gbnVtYmVyLlxyXG5cdCAqL1xyXG5cdEJ1dHRvbi5wcm90b3R5cGUuaW5pdFN0YXJ0ID0gZnVuY3Rpb24oY291bnRkb3duTnVtYmVyKSB7XHJcblx0XHRjb25zdCBjYWxsYmFjayA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRIZWxwZXIuaGlkZUVsZW1lbnQoaW5zdHJ1Y3Rpb25QYW5lbCk7XHJcblx0XHR9XHJcblx0XHR0aGlzLnN0YXJ0Q291bnRkb3duRm9yU2xpZGVyKENPVU5URE9XTl9OVU1CRVIsIGNhbGxiYWNrKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIENvbnN0cnVjdG9yIGZvciB3aGVuIHRoZSBmYWlsIGJ1dHRvbiBpcyBjbGlja2VkLlxyXG5cdCAqIEBwYXJhbSAge0ludGVnZXJ9IGNvdW50ZG93biBudW1iZXIuXHJcblx0ICovXHJcblx0QnV0dG9uLnByb3RvdHlwZS5pbml0RmFpbCA9IGZ1bmN0aW9uKGNvdW50ZG93bk51bWJlcikge1xyXG5cdFx0Y29uc3QgY2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcclxuXHRcdFx0SGVscGVyLmhpZGVFbGVtZW50KGZhaWxCYWNrZ3JvdW5kLCBzbGlkZXJQYW5lbCk7XHJcblx0XHRcdC8vIHJlc2V0IHRoZSBpbWFnZXNcclxuXHRcdFx0aW1hZ2VzLnN0eWxlLm1hcmdpbkxlZnQgPSAnMTAwJSc7XHJcbiAgXHRcdFx0aW1hZ2VzLnN0eWxlLnRyYW5zaXRpb24gPSAnMHMnO1xyXG4gIFx0XHQgIFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZS5sZW5ndGg7IGkrKykge1xyXG4gIFx0XHRcdFx0aW1hZ2VbaV0uc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgXHRcdFx0fVxyXG4gIFx0XHRcdGltYWdlSXRlcmF0aW9uID0gMDtcclxuXHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBoaWdoU2NvcmUubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0XHRoaWdoU2NvcmVbaV0uaW5uZXJIVE1MID0gMDtcclxuXHRcdFx0fVxyXG5cdFx0XHRzdWJtaXRUZXh0ZmllbGQudmFsdWUgPSAnJztcclxuXHRcdFx0SGVscGVyLnJlbW92ZUNsYXNzKHN1Ym1pdFRleHRmaWVsZCwgJ3NoYWtlVGV4dGZpZWxkQW5pbWF0aW9uJyk7XHJcblx0XHRcdEhlbHBlci5yZW1vdmVDbGFzcyhhZGRQb2ludHMsICdhZGRQb2ludHNBbmltYXRpb24nKTtcclxuXHRcdFx0YWRkUG9pbnRzLnN0eWxlLm9wYWNpdHkgPSAwO1xyXG5cdFx0fVxyXG5cdFx0dGhpcy5zdGFydENvdW50ZG93bkZvclNsaWRlcihDT1VOVERPV05fTlVNQkVSLCBjYWxsYmFjayk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gQnV0dG9uO1xyXG59KSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvY29tcG9uZW50cy9idXR0b24uanNcbiAqKi8iLCIvKipcclxuICogVGhpcyBpcyB0aGUgY291bnRkb3duIHBhbmVsOyBpdCB3aWxsIGNvdW50ZG93biB1bnRpbCBpdCByZWFjaGVzIDAgYmVmb3JlIGl0IGRpc3BsYXlzIHRoZSBzbGlkZXIgcGFuZWwuXHJcbiAqL1xyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHRcclxuXHRjb25zdCBIZWxwZXIgPSByZXF1aXJlKCcuLi9oZWxwZXIuanMnKTtcclxuXHRcclxuXHRmdW5jdGlvbiBjb3VudGRvd25QYW5lbChpZCkge1xyXG5cdFx0dGhpcy5jb3VudGRvd25QYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKTtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN0YXJ0IHRoZSBjb3VudGRvd247IGl0IHdpbGwgY291bnRkb3duIHRoZSBudW1iZXIgZGlzcGxheWVkIG9uIHRoZSBzY3JlZW4gdW50aWwgaXQgcmVhY2hlcyAwLCB3aGljaCBieSB0aGVuIGl0IHdpbGwgZGlzcGxheSB0aGUgc2xpZGVyIHBhbmVsLlxyXG5cdCAqIEBwYXJhbSAge0ludGVnZXJ9IHRoZSBjb3VudGRvd24gbnVtYmVyLCBlLmcuIGlmIDMsIGl0IHdpbGwgc3RhcnQgdGhlIGNvdW50ZG93biBmcm9tIDMuXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IFRoZSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgY2FsbGVkIG9uY2UgdGhlIGNvdW50ZG93biByZWFjaGVzIDAuXHJcblx0ICovXHJcblx0Y291bnRkb3duUGFuZWwucHJvdG90eXBlLnN0YXJ0Q291bnRkb3duVGltZXIgPSBmdW5jdGlvbihjb3VudGRvd25OdW1iZXIsIGNhbGxiYWNrKSB7XHJcblx0XHRjb25zdCBzZWxmID0gdGhpcztcclxuXHRcdEhlbHBlci5zaG93RWxlbWVudCh0aGlzLmNvdW50ZG93blBhbmVsKTtcclxuXHRcdHRoaXMuY291bnRkb3duUGFuZWwuaW5uZXJIVE1MID0gXCJcIjtcclxuXHRcdGNvbnN0IGNvdW50RG93blRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcbiAgICAgIFx0XHRpZiAoY291bnRkb3duTnVtYmVyID09PSAwKSB7XHJcbiAgICAgICAgXHRcdGNsZWFySW50ZXJ2YWwoY291bnREb3duVGltZXIpO1xyXG4gICAgICAgIFx0XHRIZWxwZXIuaGlkZUVsZW1lbnQoc2VsZi5jb3VudGRvd25QYW5lbCk7XHJcbiAgICAgICAgXHRcdGNhbGxiYWNrKCk7XHJcbiAgICAgICAgXHR9XHJcbiAgICAgICAgXHRzZWxmLmNvdW50ZG93blBhbmVsLmlubmVySFRNTCA9IGNvdW50ZG93bk51bWJlci0tO1xyXG4gICAgXHR9LCAxMDAwKTtcclxuXHR9XHJcblxyXG5cdHJldHVybiBjb3VudGRvd25QYW5lbDtcclxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2NvbXBvbmVudHMvY291bnRkb3duX3BhbmVsLmpzXG4gKiovIiwiLy8gaXMgaXQgcmVhbGx5IHRoZSBiZXN0IHdheT8/PyBsb29rIHVwIENvbW1vbkpTL0FNRC9FUzYgaW1wb3J0L2V4cG9ydCAoPC0tIEkgZ3Vlc3MgdGhpcyBpcyBPSyBzbyBmYXIpXHJcbi8vIFdoYXQgYWJvdXQgaW5zdGVhZCBvZiBIZWxwZXIubWV0aG9kKCksIHVzZSBPYmplY3QuY3JlYXRlPyBEb2VzIHRoaXMgaGVscD9cclxuLy8gaHR0cDovL3JlcXVpcmVqcy5vcmcvZG9jcy9ub2RlLmh0bWwjMVxyXG4vLyBCeSB1c2luZyBSZXF1aXJlSlMgb24gdGhlIHNlcnZlciwgeW91IGNhbiB1c2Ugb25lIGZvcm1hdCBmb3IgYWxsIHlvdXIgbW9kdWxlcywgd2hldGhlciB0aGV5IGFyZSBydW5uaW5nIHNlcnZlciBzaWRlIG9yIGluIHRoZSBicm93c2VyLiAoaG1tLi4uKVxyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuXHRcInVzZSBzdHJpY3RcIjtcclxuXHRcclxuXHRjb25zdCBJTExFR0FMX0NIQVJBQ1RFUlMgPSBuZXcgUmVnRXhwKC9bXFwtXFxzXSsvKTtcclxuXHJcbiAgXHQvKipcclxuICBcdCAqIENvbnZlcnQgc3RyaW5nIHRvIGxvd2VyIGNhc2UgYW5kIHJlbW92ZSBpbGxlZ2FsIGNoYXJhY3RlcnMuXHJcbiAgXHQgKi9cclxuICBcdFN0cmluZy5wcm90b3R5cGUudG9Mb3dlckNhc2VBbmRSZW1vdmVJbGxlZ2FsQ2hhcmFjdGVycyA9IGZ1bmN0aW9uKCkge1xyXG4gIFx0XHRsZXQgbG93ZXJDYXNlVmFsdWUgPSB0aGlzLnRvTG93ZXJDYXNlKCk7XHJcbiAgXHRcdHJldHVybiBsb3dlckNhc2VWYWx1ZS5yZXBsYWNlKElMTEVHQUxfQ0hBUkFDVEVSUywgJycpO1xyXG4gIFx0fVxyXG4gIFx0XHJcblx0LyoqXHJcblx0ICogRmluZCB3aGljaCBDU1MgdHJhbnNpdGlvbiBldmVudHMgZW5kLlxyXG5cdCAqIGh0dHBzOi8vam9uc3VoLmNvbS9ibG9nL2RldGVjdC10aGUtZW5kLW9mLWNzcy1hbmltYXRpb25zLWFuZC10cmFuc2l0aW9ucy13aXRoLWphdmFzY3JpcHQvXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gd2hpY2hUcmFuc2l0aW9uRXZlbnQoKXtcclxuXHQgIHZhciB0LFxyXG5cdCAgICAgIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImZha2VlbGVtZW50XCIpO1xyXG5cclxuXHQgIHZhciB0cmFuc2l0aW9ucyA9IHtcclxuXHQgICAgXCJ0cmFuc2l0aW9uXCIgICAgICA6IFwidHJhbnNpdGlvbmVuZFwiLFxyXG5cdCAgICBcIk9UcmFuc2l0aW9uXCIgICAgIDogXCJvVHJhbnNpdGlvbkVuZFwiLFxyXG5cdCAgICBcIk1velRyYW5zaXRpb25cIiAgIDogXCJ0cmFuc2l0aW9uZW5kXCIsXHJcblx0ICAgIFwiV2Via2l0VHJhbnNpdGlvblwiOiBcIndlYmtpdFRyYW5zaXRpb25FbmRcIlxyXG5cdCAgfVxyXG5cclxuXHQgIGZvciAodCBpbiB0cmFuc2l0aW9ucyl7XHJcblx0ICAgIGlmIChlbC5zdHlsZVt0XSAhPT0gdW5kZWZpbmVkKXtcclxuXHQgICAgICByZXR1cm4gdHJhbnNpdGlvbnNbdF07XHJcblx0ICAgIH1cclxuXHQgIH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEBwYXJhbSB7T2JqZWN0fSBlbCAtIFRoZSBlbGVtZW50IHRoYXQgd2Ugd2FudCB0byBmaW5kIHRoZSBjdXJyZW50IHBvc2l0aW9uIGlzIHJlbGF0aXZlIHRvIHRoZSB3aW5kb3cuXHJcblx0ICogaHR0cHM6Ly93d3cua2lydXBhLmNvbS9odG1sNS9nZXRfZWxlbWVudF9wb3NpdGlvbl91c2luZ19qYXZhc2NyaXB0Lmh0bVxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIGdldFBvc2l0aW9uKGVsKSB7XHJcblx0XHR2YXIgeFBvcyA9IDA7XHJcblx0XHR2YXIgeVBvcyA9IDA7XHJcblxyXG5cdFx0d2hpbGUgKGVsKSB7XHJcblx0XHRcdGlmIChlbC50YWdOYW1lID09IFwiQk9EWVwiKSB7XHJcblx0XHRcdFx0Ly8gZGVhbCB3aXRoIGJyb3dzZXIgcXVpcmtzIHdpdGggYm9keS93aW5kb3cvZG9jdW1lbnQgYW5kIHBhZ2Ugc2Nyb2xsXHJcblx0XHRcdFx0dmFyIHhTY3JvbGwgPSBlbC5zY3JvbGxMZWZ0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0O1xyXG5cdFx0XHRcdHZhciB5U2Nyb2xsID0gZWwuc2Nyb2xsVG9wIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3A7XHJcblxyXG5cdFx0XHRcdHhQb3MgKz0gKGVsLm9mZnNldExlZnQgLSB4U2Nyb2xsICsgZWwuY2xpZW50TGVmdCk7XHJcblx0XHRcdFx0eVBvcyArPSAoZWwub2Zmc2V0VG9wIC0geVNjcm9sbCArIGVsLmNsaWVudFRvcCk7XHJcblx0XHRcdH0gZWxzZSB7XHJcblx0XHRcdFx0Ly8gZm9yIGFsbCBvdGhlciBub24tQk9EWSBlbGVtZW50c1xyXG5cdFx0XHRcdHhQb3MgKz0gKGVsLm9mZnNldExlZnQgLSBlbC5zY3JvbGxMZWZ0ICsgZWwuY2xpZW50TGVmdCk7XHJcblx0XHRcdFx0eVBvcyArPSAoZWwub2Zmc2V0VG9wIC0gZWwuc2Nyb2xsVG9wICsgZWwuY2xpZW50VG9wKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbCA9IGVsLm9mZnNldFBhcmVudDtcclxuXHRcdH1cclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR4OiB4UG9zLFxyXG5cdFx0XHR5OiB5UG9zXHJcblx0XHR9O1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogQmluZCB0aGUgZm9jdXNlZCBlbGVtZW50OyBpdCB3aWxsIGNhbGwgdGhlIGNhbGxiYWNrIHdoZW4gdHJhbnNpdGlvbiBlbmRzLlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gdGhlIG9iamVjdCB3aGljaCB3aWxsIGJlIGJpbmRlZCBieSBhIHRyYW5zaXRpb24gZW5kIGxpc3RlbmVyXHJcblx0ICogQHBhcmFtICB7RnVuY3Rpb259IHRoZSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgY2FsbGVkIHdoZW4gdHJhbnNpdGlvbiBlbmRcclxuXHQgKi9cclxuICBcdGZ1bmN0aW9uIHRyYW5zaXRpb25FbmQoZWxlbWVudCwgY2FsbGJhY2spIHtcclxuXHQgICAgY29uc3QgdHJhbnNpdGlvbkV2ZW50ID0gd2hpY2hUcmFuc2l0aW9uRXZlbnQoKTtcclxuXHQgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKHRyYW5zaXRpb25FdmVudCwgY2FsbGJhY2spO1xyXG4gIFx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBEaXNwbGF5IHRoZSBlbGVtZW50LlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIGRpc3BsYXllZC5cclxuXHQgKi9cclxuXHRmdW5jdGlvbiBzaG93RWxlbWVudChlbGVtZW50LCBkaXNwbGF5KSB7XHJcblx0XHRpZiAodHlwZW9mIGRpc3BsYXkgIT09ICd1bmRlZmluZWQnICYmIGRpc3BsYXkgIT09ICcnKSB7XHJcblx0XHRcdGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XHJcblx0XHR9IGVsc2Uge1xyXG5cdFx0XHRlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBIaWRlIHRoZSBlbGVtZW50LlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGJlIGhpZGRlbi5cclxuXHQgKi9cclxuXHRmdW5jdGlvbiBoaWRlRWxlbWVudChlbGVtZW50KSB7XHJcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xyXG5cdFx0XHRhcmd1bWVudHNbaV0uc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIEFkZCBhIENTUyBjbGFzcyB0byBhbiBlbGVtZW50LlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGhhdmUgdGhlIGFkZGVkIENTUyBjbGFzcy5cclxuXHQgKiBAcGFyYW0gIHtTdHJpbmd9IGNsYXNzTmFtZSAtIFRoZSBDU1MgY2xhc3MgbmFtZVxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xyXG5cdFx0aWYgKCFlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogUmVtb3ZlIGEgQ1NTIGNsYXNzIGZyb20gYW4gZWxlbWVudC5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSBlbGVtZW50IHRoYXQgd2lsbCBoYXZlIHRoZSBzcGVjaWZpZWQgQ1NTIGNsYXNzIHJlbW92ZWQuXHJcblx0ICogQHBhcmFtICB7U3RyaW5nfSBjbGFzc05hbWUgLSBUaGUgQ1NTIGNsYXNzIG5hbWVcclxuXHQgKi9cclxuXHRmdW5jdGlvbiByZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpIHtcclxuXHRcdGlmIChlbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpKSB7XHJcblx0XHRcdGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpO1xyXG5cdFx0fVxyXG5cdFx0Ly8gd2VpcmQgaGFjayBydWxlIC0gaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9yZXN0YXJ0LWNzcy1hbmltYXRpb24vXHJcblx0XHR2b2lkIGVsZW1lbnQub2Zmc2V0V2lkdGg7XHRcdFxyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVG9nZ2xlIHdoZXRoZXIgdG8gYWRkIG9yIHJlbW92ZSBDU1MgY2xhc3MuXHJcblx0ICogQHBhcmFtICB7T2JqZWN0fSBUaGUgZWxlbWVudCB0aGF0IHdpbGwgYWRkIG9yIHJlbW92ZSB0aGUgQ1NTIGNsYXNzLlxyXG5cdCAqIEBwYXJhbSAge1N0cmluZ30gY2xhc3NOYW1lIC0gVGhlIENTUyBjbGFzcyBuYW1lXHJcblx0ICovXHJcblx0ZnVuY3Rpb24gdG9nZ2xlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKSB7XHJcblx0XHRpZiAoZWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKSkge1xyXG5cdFx0XHRyZW1vdmVDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpO1xyXG4gIFx0XHR9IGVsc2Uge1xyXG4gIFx0XHRcdGFkZENsYXNzKGVsZW1lbnQsIGNsYXNzTmFtZSk7XHRcdFx0XHJcbiAgXHRcdH1cclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFRvZ2dsZSB3aGV0aGVyIHRvIGFkZCBvciByZW1vdmUgQ1NTIGNsYXNzLlxyXG5cdCAqIEBwYXJhbSAge09iamVjdH0gVGhlIGVsZW1lbnQgdGhhdCB3aWxsIGFkZCBvciByZW1vdmUgdGhlIENTUyBjbGFzcy5cclxuXHQgKiBAcGFyYW0gIHtTdHJpbmd9IGNsYXNzTmFtZSAtIFRoZSBDU1MgY2xhc3MgbmFtZVxyXG5cdCAqL1xyXG5cdGZ1bmN0aW9uIHRvZ2dsZUNsYXNzRm9yQW5pbWF0aW9uKGVsZW1lbnQsIGNsYXNzTmFtZSkge1xyXG5cdFx0aWYgKGVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSkpIHtcclxuXHRcdFx0cmVtb3ZlQ2xhc3MoZWxlbWVudCwgY2xhc3NOYW1lKTtcclxuICBcdFx0fVxyXG4gIFx0XHRhZGRDbGFzcyhlbGVtZW50LCBjbGFzc05hbWUpO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogVmFsaWRhdGUgaWYgdXNlciBpbnB1dCBpcyBhIHN0cmluZy5cclxuXHQgKiBAcGFyYW0gIHtPYmplY3R9IFRoZSB0ZXh0ZmllbGQgdGhhdCB3aWxsIGJlIHZhbGlkYXRlZC5cclxuXHQgKi9cclxuICBcdGZ1bmN0aW9uIHZhbGlkYXRlSWZJbnB1dElzRG90YUhlcm9OYW1lKGltYWdlLCB0ZXh0ZmllbGQpIHtcclxuXHRcdGlmIChpbWFnZS5uYW1lLnRvTG93ZXJDYXNlQW5kUmVtb3ZlSWxsZWdhbENoYXJhY3RlcnMoKSA9PT0gdGV4dGZpZWxkLnZhbHVlLnRvTG93ZXJDYXNlQW5kUmVtb3ZlSWxsZWdhbENoYXJhY3RlcnMoKSkge1xyXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZTtcclxuICBcdH1cclxuXHJcbiAgXHRyZXR1cm4ge1xyXG4gIFx0XHR0cmFuc2l0aW9uRW5kLFxyXG4gIFx0XHRnZXRQb3NpdGlvbixcclxuICBcdFx0c2hvd0VsZW1lbnQsXHJcbiAgXHRcdGhpZGVFbGVtZW50LFxyXG4gIFx0XHRhZGRDbGFzcyxcclxuICBcdFx0cmVtb3ZlQ2xhc3MsXHJcbiAgXHRcdHRvZ2dsZUNsYXNzLFxyXG4gIFx0XHR0b2dnbGVDbGFzc0ZvckFuaW1hdGlvbixcclxuICBcdFx0dmFsaWRhdGVJZklucHV0SXNEb3RhSGVyb05hbWVcclxuICBcdH1cclxufSkoKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2pzL2hlbHBlci5qc1xuICoqLyIsIi8qKlxyXG4gKiBUaGlzIGlzIHRoZSBzbGlkZXIgdGhhdCB3aWxsIGJlIGRpc3BsYXllZCBhZnRlciB0aGUgY291bnRkb3duLiBJdCB3aWxsIGRpc3BsYXkgYW4gZW5kbGVzcyBzdHJlYW0gb2YgZG90YSBpbWFnZXMgdGhhdCBhcmUgcmV0cmlldmVkIHZpYSBEb3RhIEFQSS5cclxuICogSXQgd2lsbCBjb25zdGFudGx5IHRyYW5zaXRpb24gdG8gdGhlIGxlZnQgdW50aWwgaXQgcmVhY2hlcyB0byB0aGUgc3RhcnRpbmcgcG9zaXRpb24gb2YgdGhlIHBhbmVsIHRoYXQgaG9sZHMgdGhlIGltYWdlcywgd2hpY2ggaW4gdGhhdCBjYXNlIHRoZSBnYW1lXHJcbiAqIGxvc2UuIFxyXG4gKi9cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XHJcblx0XCJ1c2Ugc3RyaWN0XCI7XHJcblx0XHJcblx0Y29uc3QgSGVscGVyID0gcmVxdWlyZSgnLi4vaGVscGVyLmpzJyk7XHJcblx0Y29uc3QgU0xJREVfRFVSQVRJT04gPSAxMDtcclxuXHRjb25zdCBXQVJOSU5HX1RIUkVTSE9MRCA9IDMwO1xyXG5cdGNvbnN0IGltYWdlcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ltYWdlcycpWzBdO1xyXG5cdGNvbnN0IGltYWdlc1BhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnaW1hZ2VzUGFuZWwnKVswXTtcclxuXHRjb25zdCBmYWlsQmFja2dyb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2ZhaWxCYWNrZ3JvdW5kJylbMF07XHJcblxyXG5cdGZ1bmN0aW9uIHNsaWRlcihzbGlkZXIpIHtcclxuXHRcdHRoaXMuc2xpZGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShzbGlkZXIpWzBdO1xyXG5cdH1cclxuXHJcblx0LyoqXHJcblx0ICogR2V0IGltYWdlcyBmcm9tIGRvdGEgQVBJLCBhcHBlbmRpbmcgaXQgdG8gYSBsaXN0IG9mIGdlbmVyYXRlZCBpbWFnZSBET00gZWxlbWVudC5cclxuXHQgKi9cclxuXHRzbGlkZXIucHJvdG90eXBlLmdldEltYWdlcyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0Ly8gVE9ETyAtIEdldCBsaXN0IG9mIGRvdGEgaW1hZ2VzIHVzaW5nIEFKQVgsIGxvb2sgdXAgUHJvbWlzZXMgYW5kIEdlbmVyYXRvcnNcclxuXHRcdC8vIFByb21pc2VzIC0gYXN5Y2hyb25vdXMgY2FsbHMsIGRvIHRoaXMsIHRoZW4gZG8gdGhpc1xyXG5cdFx0Ly8gR2VuZXJhdG9ycyAtIHNvbWV0aGluZyBhYm91dCB3YWl0aW5nIGluZGVmaW5pdGVseSB1bnRpbCBpdCBnZXRzIGl0ICh1c2VzIHRoZSBrZXl3b3JkICd5aWVsZCcpXHJcblx0XHQvLyBBUFBBUkVOVExZIEdFTkVSQVRPUlMgSVMgQSBIQUNLLCBFUzcgJ0FTWU5DJyBLRVlXT1JEIElTIFRIRSBMRUdJVCBXQVkgT1IgU09NRSBTSElUOyBJIFRISU5LPyBcclxuXHRcdC8vIFVzaW5nIFhNTEh0dHBSZXF1ZXN0IG9uIGEgcmVtb3RlIHNlcnZlciBnaXZlcyB5b3UgJ0FjY2Vzcy1jb250cm9sLWFsbG93LW9yaWdpbicgbWlzc2luZyBlcnJvcjsgbG9vayB1cCBDT1JTOyBtYXliZSBjcmVhdGUgYSBQeXRob24gc2NyaXB0IGluc3RlYWRcclxuXHRcdC8qdmFyIG9SZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuXHRcdG9SZXEub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcclxuXHRcdCAgICBjb25zb2xlLmxvZyhlLnRhcmdldC5yZXNwb25zZS5tZXNzYWdlKTtcclxuXHRcdH07XHJcblx0XHRvUmVxLm9wZW4oJ0dFVCcsICdodHRwczovL2FwaS5zdGVhbXBvd2VyZWQuY29tL0lFY29uRE9UQTJfNTcwL0dldEhlcm9lcy92MDAwMS8/a2V5PTZDMUNGNzZDOTA3NjgzODg2MThGMzQ4QkI3M0VFMDE1Jmxhbmd1YWdlPWVuX3VzJmZvcm1hdD1KU09OJywgdHJ1ZSk7XHJcblx0XHRvUmVxLnJlc3BvbnNlVHlwZSA9ICdqc29uJztcclxuXHRcdG9SZXEuc2VuZCgpOyovXHJcblxyXG5cdFx0Ly8gVE9ETzogRml4IHRoaXMsIGl0J3MgYmVlbiBjYWxsZWQgZXZlcnl0aW1lIHlvdSBzdGFydCBhIG5ldyBnYW1lIHdoaWNoIGlzIHZlcnkgaW5lZmZpY2llbnRcclxuXHRcdGNvbnN0IGRvdGFIZXJvZXNKc29uID0gSlNPTi5wYXJzZSh0aGlzLnN0dWJEb3RhSGVyb2VzKCkpO1xyXG5cdFx0Y29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcblx0XHRjb25zdCBoZXJvZXMgPSBkb3RhSGVyb2VzSnNvbi5yZXN1bHQuaGVyb2VzO1xyXG5cdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBoZXJvZXMubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0Y29uc3QgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuXHRcdFx0aW1hZ2UuY2xhc3NOYW1lID0gJ2ltYWdlJztcclxuXHRcdFx0aW1hZ2Uuc3JjID0gJ2h0dHA6Ly9jZG4uZG90YTIuY29tL2FwcHMvZG90YTIvaW1hZ2VzL2hlcm9lcy8nICsgaGVyb2VzW2ldLm5hbWUucmVwbGFjZSgnbnBjX2RvdGFfaGVyb18nLCAnJykgKyAnX2xnLnBuZyc7XHJcblx0XHRcdC8vSXQgc2hvdWxkIGJlIFR1c2thciwgbm90IFR1c2shXHJcblx0XHRcdGlmIChoZXJvZXNbaV0ubG9jYWxpemVkX25hbWUgPT09ICdUdXNrJykge1xyXG5cdFx0XHRcdGhlcm9lc1tpXS5sb2NhbGl6ZWRfbmFtZSA9ICdUdXNrYXInO1xyXG5cdFx0XHR9XHJcblx0XHRcdGltYWdlLm5hbWUgPSBoZXJvZXNbaV0ubG9jYWxpemVkX25hbWU7XHJcblx0XHRcdGZyYWdtZW50LmFwcGVuZENoaWxkKGltYWdlKTtcclxuXHRcdH1cclxuXHRcdGltYWdlcy5hcHBlbmRDaGlsZChmcmFnbWVudCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBUcmFuc2l0aW9uIGVmZmVjdCBvbiB0aGUgaW1hZ2VzLlxyXG5cdCAqL1xyXG5cdHNsaWRlci5wcm90b3R5cGUuc2xpZGUgPSBmdW5jdGlvbigpIHtcclxuXHRcdGNvbnN0IHNjcmVlbldpZHRoID0gd2luZG93LmlubmVyV2lkdGggfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoIHx8IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGg7XHJcblx0ICAgIGNvbnN0IGRlZmF1bHRXaWR0aCA9IChzY3JlZW5XaWR0aCAtIGltYWdlc1BhbmVsLm9mZnNldFdpZHRoLyAyKSArIGltYWdlc1BhbmVsLm9mZnNldFdpZHRoO1xyXG5cdCAgICBjb25zdCB3YXJuaW5nV2lkdGggPSBkZWZhdWx0V2lkdGggKiBXQVJOSU5HX1RIUkVTSE9MRCAvIDEwMDtcclxuXHQgICAgbGV0IHRpbWVyO1xyXG5cclxuXHRcdGltYWdlcy5zdHlsZS5tYXJnaW5MZWZ0ID0gJzAnO1xyXG5cdCAgICBpbWFnZXMuc3R5bGUudHJhbnNpdGlvbiA9IFNMSURFX0RVUkFUSU9OICsgJ3MgbGluZWFyJztcclxuXHRcdEhlbHBlci5yZW1vdmVDbGFzcyhpbWFnZXNQYW5lbCwgJ3dhcm5pbmdBbmltYXRpb24nKTtcclxuXHJcblx0ICAgIHRpbWVyID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcblx0ICAgIFx0aWYgKEhlbHBlci5nZXRQb3NpdGlvbihpbWFnZXMpLnggPD0gd2FybmluZ1dpZHRoKSB7XHJcblx0XHRcdFx0SGVscGVyLmFkZENsYXNzKGltYWdlc1BhbmVsLCAnd2FybmluZ0FuaW1hdGlvbicpO1xyXG5cdFx0XHRcdGNsZWFySW50ZXJ2YWwodGltZXIpO1xyXG5cdCAgICBcdH1cclxuXHQgICAgfSwgMTAwMCk7XHJcblx0fVxyXG5cclxuXHQvKipcclxuXHQgKiBJbml0aWFsaXplIHRoZSBzbGlkZXIgdHJhbnNpdGlvbiwgZGlzcGxheSB0aGUgZmFpbCBwYW5lbCB3aGVuIHRoZSB0cmFuc2l0aW9uIGVuZHMuXHJcblx0ICovXHJcblx0c2xpZGVyLnByb3RvdHlwZS5zdGFydFNsaWRlciA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0aWYgKGltYWdlcy5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0dGhpcy5nZXRJbWFnZXMoKTtcclxuXHRcdH1cclxuXHRcdEhlbHBlci5zaG93RWxlbWVudCh0aGlzLnNsaWRlcik7XHJcblx0XHR0aGlzLnNsaWRlKCk7XHJcblx0XHRIZWxwZXIudHJhbnNpdGlvbkVuZChpbWFnZXMsIGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdyZXN1bHRUZXh0JylbMF0uaW5uZXJIVE1MID0gJ1lvdSBsb3NlLi4uJztcclxuXHRcdFx0SGVscGVyLnNob3dFbGVtZW50KGZhaWxCYWNrZ3JvdW5kKTtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0Ly8gVGVtcG9yYXJ5IHVudGlsIGFuIGFjdHVhbCBjYWxsIHRvIEFQSSBpcyBtYWRlXHJcblx0c2xpZGVyLnByb3RvdHlwZS5zdHViRG90YUhlcm9lcyA9IGZ1bmN0aW9uKCkge1xyXG5cdFx0cmV0dXJuIGB7XHJcblx0XHRcInJlc3VsdFwiOntcclxuXHRcdFwiaGVyb2VzXCI6W1xyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2FudGltYWdlXCIsXHJcblx0XHRcImlkXCI6MSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkFudGktTWFnZVwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2F4ZVwiLFxyXG5cdFx0XCJpZFwiOjIsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJBeGVcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19iYW5lXCIsXHJcblx0XHRcImlkXCI6MyxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkJhbmVcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19ibG9vZHNlZWtlclwiLFxyXG5cdFx0XCJpZFwiOjQsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJCbG9vZHNlZWtlclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2NyeXN0YWxfbWFpZGVuXCIsXHJcblx0XHRcImlkXCI6NSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkNyeXN0YWwgTWFpZGVuXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fZHJvd19yYW5nZXJcIixcclxuXHRcdFwiaWRcIjo2LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiRHJvdyBSYW5nZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19lYXJ0aHNoYWtlclwiLFxyXG5cdFx0XCJpZFwiOjcsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJFYXJ0aHNoYWtlclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2p1Z2dlcm5hdXRcIixcclxuXHRcdFwiaWRcIjo4LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiSnVnZ2VybmF1dFwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX21pcmFuYVwiLFxyXG5cdFx0XCJpZFwiOjksXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJNaXJhbmFcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19uZXZlcm1vcmVcIixcclxuXHRcdFwiaWRcIjoxMSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlNoYWRvdyBGaWVuZFwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX21vcnBobGluZ1wiLFxyXG5cdFx0XCJpZFwiOjEwLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiTW9ycGhsaW5nXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fcGhhbnRvbV9sYW5jZXJcIixcclxuXHRcdFwiaWRcIjoxMixcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlBoYW50b20gTGFuY2VyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fcHVja1wiLFxyXG5cdFx0XCJpZFwiOjEzLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiUHVja1wiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3B1ZGdlXCIsXHJcblx0XHRcImlkXCI6MTQsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJQdWRnZVwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3Jhem9yXCIsXHJcblx0XHRcImlkXCI6MTUsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJSYXpvclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3NhbmRfa2luZ1wiLFxyXG5cdFx0XCJpZFwiOjE2LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiU2FuZCBLaW5nXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fc3Rvcm1fc3Bpcml0XCIsXHJcblx0XHRcImlkXCI6MTcsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJTdG9ybSBTcGlyaXRcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19zdmVuXCIsXHJcblx0XHRcImlkXCI6MTgsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJTdmVuXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fdGlueVwiLFxyXG5cdFx0XCJpZFwiOjE5LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiVGlueVwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3ZlbmdlZnVsc3Bpcml0XCIsXHJcblx0XHRcImlkXCI6MjAsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJWZW5nZWZ1bCBTcGlyaXRcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb193aW5kcnVubmVyXCIsXHJcblx0XHRcImlkXCI6MjEsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJXaW5kcmFuZ2VyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fenV1c1wiLFxyXG5cdFx0XCJpZFwiOjIyLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiWmV1c1wiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2t1bmtrYVwiLFxyXG5cdFx0XCJpZFwiOjIzLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiS3Vua2thXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fbGluYVwiLFxyXG5cdFx0XCJpZFwiOjI1LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiTGluYVwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2xpY2hcIixcclxuXHRcdFwiaWRcIjozMSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkxpY2hcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19saW9uXCIsXHJcblx0XHRcImlkXCI6MjYsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJMaW9uXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fc2hhZG93X3NoYW1hblwiLFxyXG5cdFx0XCJpZFwiOjI3LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiU2hhZG93IFNoYW1hblwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3NsYXJkYXJcIixcclxuXHRcdFwiaWRcIjoyOCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlNsYXJkYXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb190aWRlaHVudGVyXCIsXHJcblx0XHRcImlkXCI6MjksXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJUaWRlaHVudGVyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fd2l0Y2hfZG9jdG9yXCIsXHJcblx0XHRcImlkXCI6MzAsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJXaXRjaCBEb2N0b3JcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19yaWtpXCIsXHJcblx0XHRcImlkXCI6MzIsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJSaWtpXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fZW5pZ21hXCIsXHJcblx0XHRcImlkXCI6MzMsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJFbmlnbWFcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb190aW5rZXJcIixcclxuXHRcdFwiaWRcIjozNCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlRpbmtlclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3NuaXBlclwiLFxyXG5cdFx0XCJpZFwiOjM1LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiU25pcGVyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fbmVjcm9seXRlXCIsXHJcblx0XHRcImlkXCI6MzYsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJOZWNyb3Bob3NcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb193YXJsb2NrXCIsXHJcblx0XHRcImlkXCI6MzcsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJXYXJsb2NrXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fYmVhc3RtYXN0ZXJcIixcclxuXHRcdFwiaWRcIjozOCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkJlYXN0bWFzdGVyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fcXVlZW5vZnBhaW5cIixcclxuXHRcdFwiaWRcIjozOSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlF1ZWVuIG9mIFBhaW5cIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb192ZW5vbWFuY2VyXCIsXHJcblx0XHRcImlkXCI6NDAsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJWZW5vbWFuY2VyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fZmFjZWxlc3Nfdm9pZFwiLFxyXG5cdFx0XCJpZFwiOjQxLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiRmFjZWxlc3MgVm9pZFwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3NrZWxldG9uX2tpbmdcIixcclxuXHRcdFwiaWRcIjo0MixcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIldyYWl0aCBLaW5nXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fZGVhdGhfcHJvcGhldFwiLFxyXG5cdFx0XCJpZFwiOjQzLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiRGVhdGggUHJvcGhldFwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3BoYW50b21fYXNzYXNzaW5cIixcclxuXHRcdFwiaWRcIjo0NCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlBoYW50b20gQXNzYXNzaW5cIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19wdWduYVwiLFxyXG5cdFx0XCJpZFwiOjQ1LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiUHVnbmFcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb190ZW1wbGFyX2Fzc2Fzc2luXCIsXHJcblx0XHRcImlkXCI6NDYsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJUZW1wbGFyIEFzc2Fzc2luXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fdmlwZXJcIixcclxuXHRcdFwiaWRcIjo0NyxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlZpcGVyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fbHVuYVwiLFxyXG5cdFx0XCJpZFwiOjQ4LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiTHVuYVwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2RyYWdvbl9rbmlnaHRcIixcclxuXHRcdFwiaWRcIjo0OSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkRyYWdvbiBLbmlnaHRcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19kYXp6bGVcIixcclxuXHRcdFwiaWRcIjo1MCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkRhenpsZVwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3JhdHRsZXRyYXBcIixcclxuXHRcdFwiaWRcIjo1MSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkNsb2Nrd2Vya1wiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2xlc2hyYWNcIixcclxuXHRcdFwiaWRcIjo1MixcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkxlc2hyYWNcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19mdXJpb25cIixcclxuXHRcdFwiaWRcIjo1MyxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIk5hdHVyZSdzIFByb3BoZXRcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19saWZlX3N0ZWFsZXJcIixcclxuXHRcdFwiaWRcIjo1NCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkxpZmVzdGVhbGVyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fZGFya19zZWVyXCIsXHJcblx0XHRcImlkXCI6NTUsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJEYXJrIFNlZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19jbGlua3pcIixcclxuXHRcdFwiaWRcIjo1NixcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkNsaW5relwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX29tbmlrbmlnaHRcIixcclxuXHRcdFwiaWRcIjo1NyxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIk9tbmlrbmlnaHRcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19lbmNoYW50cmVzc1wiLFxyXG5cdFx0XCJpZFwiOjU4LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiRW5jaGFudHJlc3NcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19odXNrYXJcIixcclxuXHRcdFwiaWRcIjo1OSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkh1c2thclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX25pZ2h0X3N0YWxrZXJcIixcclxuXHRcdFwiaWRcIjo2MCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIk5pZ2h0IFN0YWxrZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19icm9vZG1vdGhlclwiLFxyXG5cdFx0XCJpZFwiOjYxLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiQnJvb2Rtb3RoZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19ib3VudHlfaHVudGVyXCIsXHJcblx0XHRcImlkXCI6NjIsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJCb3VudHkgSHVudGVyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fd2VhdmVyXCIsXHJcblx0XHRcImlkXCI6NjMsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJXZWF2ZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19qYWtpcm9cIixcclxuXHRcdFwiaWRcIjo2NCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkpha2lyb1wiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2JhdHJpZGVyXCIsXHJcblx0XHRcImlkXCI6NjUsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJCYXRyaWRlclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2NoZW5cIixcclxuXHRcdFwiaWRcIjo2NixcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkNoZW5cIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19zcGVjdHJlXCIsXHJcblx0XHRcImlkXCI6NjcsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJTcGVjdHJlXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fZG9vbV9icmluZ2VyXCIsXHJcblx0XHRcImlkXCI6NjksXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJEb29tXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fYW5jaWVudF9hcHBhcml0aW9uXCIsXHJcblx0XHRcImlkXCI6NjgsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJBbmNpZW50IEFwcGFyaXRpb25cIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb191cnNhXCIsXHJcblx0XHRcImlkXCI6NzAsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJVcnNhXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fc3Bpcml0X2JyZWFrZXJcIixcclxuXHRcdFwiaWRcIjo3MSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlNwaXJpdCBCcmVha2VyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fZ3lyb2NvcHRlclwiLFxyXG5cdFx0XCJpZFwiOjcyLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiR3lyb2NvcHRlclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2FsY2hlbWlzdFwiLFxyXG5cdFx0XCJpZFwiOjczLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiQWxjaGVtaXN0XCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9faW52b2tlclwiLFxyXG5cdFx0XCJpZFwiOjc0LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiSW52b2tlclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3NpbGVuY2VyXCIsXHJcblx0XHRcImlkXCI6NzUsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJTaWxlbmNlclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX29ic2lkaWFuX2Rlc3Ryb3llclwiLFxyXG5cdFx0XCJpZFwiOjc2LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiT3V0d29ybGQgRGV2b3VyZXJcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19seWNhblwiLFxyXG5cdFx0XCJpZFwiOjc3LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiTHljYW5cIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19icmV3bWFzdGVyXCIsXHJcblx0XHRcImlkXCI6NzgsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJCcmV3bWFzdGVyXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fc2hhZG93X2RlbW9uXCIsXHJcblx0XHRcImlkXCI6NzksXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJTaGFkb3cgRGVtb25cIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19sb25lX2RydWlkXCIsXHJcblx0XHRcImlkXCI6ODAsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJMb25lIERydWlkXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fY2hhb3Nfa25pZ2h0XCIsXHJcblx0XHRcImlkXCI6ODEsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJDaGFvcyBLbmlnaHRcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19tZWVwb1wiLFxyXG5cdFx0XCJpZFwiOjgyLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiTWVlcG9cIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb190cmVhbnRcIixcclxuXHRcdFwiaWRcIjo4MyxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlRyZWFudCBQcm90ZWN0b3JcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19vZ3JlX21hZ2lcIixcclxuXHRcdFwiaWRcIjo4NCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIk9ncmUgTWFnaVwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3VuZHlpbmdcIixcclxuXHRcdFwiaWRcIjo4NSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlVuZHlpbmdcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19ydWJpY2tcIixcclxuXHRcdFwiaWRcIjo4NixcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlJ1Ymlja1wiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2Rpc3J1cHRvclwiLFxyXG5cdFx0XCJpZFwiOjg3LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiRGlzcnVwdG9yXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fbnl4X2Fzc2Fzc2luXCIsXHJcblx0XHRcImlkXCI6ODgsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJOeXggQXNzYXNzaW5cIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19uYWdhX3NpcmVuXCIsXHJcblx0XHRcImlkXCI6ODksXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJOYWdhIFNpcmVuXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fa2VlcGVyX29mX3RoZV9saWdodFwiLFxyXG5cdFx0XCJpZFwiOjkwLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiS2VlcGVyIG9mIHRoZSBMaWdodFwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3dpc3BcIixcclxuXHRcdFwiaWRcIjo5MSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIklvXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fdmlzYWdlXCIsXHJcblx0XHRcImlkXCI6OTIsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJWaXNhZ2VcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19zbGFya1wiLFxyXG5cdFx0XCJpZFwiOjkzLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiU2xhcmtcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19tZWR1c2FcIixcclxuXHRcdFwiaWRcIjo5NCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIk1lZHVzYVwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3Ryb2xsX3dhcmxvcmRcIixcclxuXHRcdFwiaWRcIjo5NSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlRyb2xsIFdhcmxvcmRcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19jZW50YXVyXCIsXHJcblx0XHRcImlkXCI6OTYsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJDZW50YXVyIFdhcnJ1bm5lclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX21hZ25hdGF1clwiLFxyXG5cdFx0XCJpZFwiOjk3LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiTWFnbnVzXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fc2hyZWRkZXJcIixcclxuXHRcdFwiaWRcIjo5OCxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlRpbWJlcnNhd1wiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2JyaXN0bGViYWNrXCIsXHJcblx0XHRcImlkXCI6OTksXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJCcmlzdGxlYmFja1wiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3R1c2tcIixcclxuXHRcdFwiaWRcIjoxMDAsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJUdXNrXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fc2t5d3JhdGhfbWFnZVwiLFxyXG5cdFx0XCJpZFwiOjEwMSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIlNreXdyYXRoIE1hZ2VcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19hYmFkZG9uXCIsXHJcblx0XHRcImlkXCI6MTAyLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiQWJhZGRvblwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2VsZGVyX3RpdGFuXCIsXHJcblx0XHRcImlkXCI6MTAzLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiRWxkZXIgVGl0YW5cIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19sZWdpb25fY29tbWFuZGVyXCIsXHJcblx0XHRcImlkXCI6MTA0LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiTGVnaW9uIENvbW1hbmRlclwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2VtYmVyX3NwaXJpdFwiLFxyXG5cdFx0XCJpZFwiOjEwNixcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkVtYmVyIFNwaXJpdFwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2VhcnRoX3NwaXJpdFwiLFxyXG5cdFx0XCJpZFwiOjEwNyxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIkVhcnRoIFNwaXJpdFwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3RlcnJvcmJsYWRlXCIsXHJcblx0XHRcImlkXCI6MTA5LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiVGVycm9yYmxhZGVcIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19waG9lbml4XCIsXHJcblx0XHRcImlkXCI6MTEwLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiUGhvZW5peFwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX29yYWNsZVwiLFxyXG5cdFx0XCJpZFwiOjExMSxcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIk9yYWNsZVwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX3RlY2hpZXNcIixcclxuXHRcdFwiaWRcIjoxMDUsXHJcblx0XHRcImxvY2FsaXplZF9uYW1lXCI6XCJUZWNoaWVzXCJcclxuXHRcdH0sXHJcblx0XHR7XHJcblx0XHRcIm5hbWVcIjpcIm5wY19kb3RhX2hlcm9fd2ludGVyX3d5dmVyblwiLFxyXG5cdFx0XCJpZFwiOjExMixcclxuXHRcdFwibG9jYWxpemVkX25hbWVcIjpcIldpbnRlciBXeXZlcm5cIlxyXG5cdFx0fSxcclxuXHRcdHtcclxuXHRcdFwibmFtZVwiOlwibnBjX2RvdGFfaGVyb19hcmNfd2FyZGVuXCIsXHJcblx0XHRcImlkXCI6MTEzLFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiQXJjIFdhcmRlblwiXHJcblx0XHR9LFxyXG5cdFx0e1xyXG5cdFx0XCJuYW1lXCI6XCJucGNfZG90YV9oZXJvX2FieXNzYWxfdW5kZXJsb3JkXCIsXHJcblx0XHRcImlkXCI6MTA4LFxyXG5cdFx0XCJsb2NhbGl6ZWRfbmFtZVwiOlwiVW5kZXJsb3JkXCJcclxuXHRcdH1cclxuXHRcdF1cclxuXHRcdCxcclxuXHRcdFwic3RhdHVzXCI6MjAwLFxyXG5cdFx0XCJjb3VudFwiOjExMlxyXG5cdFx0fVxyXG5cdFx0fWBcclxuXHR9XHJcblxyXG5cdHJldHVybiBzbGlkZXI7XHJcbn0pKCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9qcy9jb21wb25lbnRzL3NsaWRlci5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xyXG5cdFwidXNlIHN0cmljdFwiO1xyXG5cclxuXHRmdW5jdGlvbiBUZXh0ZmllbGQoaWQsIGJ1dHRvbikge1xyXG5cdFx0dGhpcy50ZXh0ZmllbGQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XHJcblx0XHR0aGlzLmJ1dHRvbiA9IGJ1dHRvbjtcclxuXHR9XHJcblxyXG5cdC8qKlxyXG5cdCAqIFN1Ym1pdCBpZiB1c2VyIHByZXNzICdlbnRlcicuXHJcblx0ICovXHJcblx0VGV4dGZpZWxkLnByb3RvdHlwZS5zdWJtaXQgPSBmdW5jdGlvbigpIHtcclxuXHRcdHZhciBzZWxmID0gdGhpcztcclxuXHRcdHRoaXMudGV4dGZpZWxkLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24oZXZlbnQpIHtcclxuXHRcdFx0aWYgKGV2ZW50LmtleUNvZGUgPT09IDEzKSB7XHJcblx0XHRcdFx0Ly8gTE9MIFNFTEYuQlVUVE9OLkJVVFRPTj8/PyBGSVhcclxuXHRcdFx0XHRzZWxmLmJ1dHRvbi5idXR0b24uY2xpY2soKTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0fVxyXG5cclxuXHRyZXR1cm4gVGV4dGZpZWxkO1xyXG59KSgpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vanMvY29tcG9uZW50cy90ZXh0ZmllbGQuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9