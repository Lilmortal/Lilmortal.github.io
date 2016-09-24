// is it really the best way??? look up CommonJS/AMD/ES6 import/export (<-- I guess this is OK so far)
// What about instead of Helper.method(), use Object.create? Does this help?
// http://requirejs.org/docs/node.html#1
// By using RequireJS on the server, you can use one format for all your modules, whether they are running server side or in the browser. (hmm...)
module.exports = (function() {
	"use strict";
	
	const ILLEGAL_CHARACTERS = new RegExp(/[\-\s]+/);

  	/**
  	 * Convert string to lower case and remove illegal characters.
  	 */
  	String.prototype.toLowerCaseAndRemoveIllegalCharacters = function() {
  		let lowerCaseValue = this.toLowerCase();
  		return lowerCaseValue.replace(ILLEGAL_CHARACTERS, '');
  	}
  	
	/**
	 * Find which CSS transition events end.
	 * https://jonsuh.com/blog/detect-the-end-of-css-animations-and-transitions-with-javascript/
	 */
	function which_transition_event(){
	  var t,
	      el = document.createElement("fakeelement");

	  var transitions = {
	    "transition"      : "transitionend",
	    "OTransition"     : "oTransitionEnd",
	    "MozTransition"   : "transitionend",
	    "WebkitTransition": "webkitTransitionEnd"
	  }

	  for (t in transitions){
	    if (el.style[t] !== undefined){
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

				xPos += (el.offsetLeft - xScroll + el.clientLeft);
				yPos += (el.offsetTop - yScroll + el.clientTop);
			} else {
				// for all other non-BODY elements
				xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
				yPos += (el.offsetTop - el.scrollTop + el.clientTop);
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
	    const transition_event = which_transition_event();
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
		for (let i = 0; i < arguments.length; i++) {
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
  		transition_end,
  		get_position,
  		show_element,
  		hide_element,
  		add_class,
  		remove_class,
  		toggle_class,
  		toggle_class_for_animation,
  		validate_if_input_is_dota_hero_name
  	}
})();