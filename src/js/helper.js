"use strict";

window.Helper = (function() {
	var IS_NUMERIC = new RegExp(/^\d+$/);

	/**
	 * Find which CSS transition events end.
	 * https://jonsuh.com/blog/detect-the-end-of-css-animations-and-transitions-with-javascript/
	 */
	function whichTransitionEvent(){
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
	function getPosition(el) {
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
		element.style.display = 'none';
	}

	/**
	 * Add a CSS class to an element.
	 * @param  {Object} The element that will have the added CSS class.
	 * @param  {String} className - The CSS class name
	 */
	function addClass(element, className) {
		element.classList.add(className);
	}

	/**
	 * Remove a CSS class from an element.
	 * @param  {Object} The element that will have the specified CSS class removed.
	 * @param  {String} className - The CSS class name
	 */
	function removeClass(element, className) {
		element.classList.remove(className);
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
  		}
  		addClass(element, className);
	}

	/**
	 * Validate if user input is an integer only.
	 * @param  {Object} The textfield that will be validated.
	 */
  	function validateIfUserInputIsValid(textfield) {
		if (IS_NUMERIC.test(textfield.value)) {
			return true;
		} else {
			toggleClass(textfield, 'shakeTextfieldAnimation');
			return false;
  		}
  	}

  	return {
  		transitionEnd: transitionEnd,
  		getPosition: getPosition,
  		showElement: showElement,
  		hideElement: hideElement,
  		addClass: addClass,
  		removeClass: removeClass,
  		toggleClass: toggleClass,
  		validateIfUserInputIsValid: validateIfUserInputIsValid
  	}
})();