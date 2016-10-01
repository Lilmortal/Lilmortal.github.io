// OKAY THIS HELPER THING SUCKS! FIND ALTERNATIVE (AND UPPER CASE ALL THIS FUNCTIONS)
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

export const Helper = {
	/**
	 * Bind the focused element; it will call the callback when transition ends.
	 * @param  {Object} element - the object which will be binded by a transition end listener.
	 * @param  {Function} callback - the callback that will be called when transition end.
	 */
	transition_end(element, callback) {
		const transition_event = which_transition_event();
		element.addEventListener(transition_event, callback);
	},

	/**
	 * @param {Object} el - The element that we want to find the current position is relative to the window.
	 * https://www.kirupa.com/html5/get_element_position_using_javascript.htm
	 */
	get_position(el) {
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
	},
	/**
	 * Display the element.
	 * @param  {Object} element - The element that will be displayed.
	 * @param  {String} display - The display type.
	 */
	show_element(element, display) {
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
	hide_element(element) {
		for (let i = 0; i < arguments.length; i++) {
			arguments[i].style.display = 'none';
		}
	},

	/**
	 * Add a CSS class to an element.
	 * @param  {Object} element - The element that will have the added CSS class.
	 * @param  {String} className - The CSS class name.
	 */
	add_class(element, className) {
		if (!element.classList.contains(className)) {
			element.classList.add(className);
		}
	},

	/**
	 * Remove a CSS class from an element.
	 * @param  {Object} element - The element that will have the specified CSS class removed.
	 * @param  {String} className - The CSS class name.
	 */
	remove_class(element, className) {
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
	toggle_class(element, className) {
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
	toggle_class_for_animation(element, className) {
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
	validate_if_input_is_hero_name(image, textfield) {
		if (image.name.toLowerCaseAndRemoveIllegalCharacters() === textfield.value.toLowerCaseAndRemoveIllegalCharacters()) {
			return true;
		}
		return false;
	}
}