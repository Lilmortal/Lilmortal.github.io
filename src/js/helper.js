// OKAY THIS HELPER THING SUCKS! FIND ALTERNATIVE (AND UPPER CASE ALL THIS FUNCTIONS)
const ILLEGAL_CHARACTERS = new RegExp(/[\-\s]+/);

/**
* Convert string to lower case and remove illegal characters.
*/
if (!String.prototype.toLowerCaseAndRemoveIllegalCharacters) {
	String.prototype.toLowerCaseAndRemoveIllegalCharacters = function() {
		let lowerCaseValue = this.toLowerCase();
		return lowerCaseValue.replace(ILLEGAL_CHARACTERS, '');
	}
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
	 * @param  {Function} callback - the callback that will be called when transition end.
	 */
	transition_end(callback) {
		const transition_event = which_transition_event();
		this.addEventListener(transition_event, callback);
	},

	/**
	 * @param {Object} el - The element that we want to find the current position is relative to the window.
	 * https://www.kirupa.com/html5/get_element_position_using_javascript.htm
	 */
	get_position() {
		let xPos = 0;
		let yPos = 0;

		let element = this;
		while (element) {
			if (element.tagName == "BODY") {
				// deal with browser quirks with body/window/document and page scroll
				var xScroll = element.scrollLeft || document.documentElement.scrollLeft;
				var yScroll = element.scrollTop || document.documentElement.scrollTop;

				xPos += (element.offsetLeft - xScroll + element.clientLeft);
				yPos += (element.offsetTop - yScroll + element.clientTop);
			} else {
				// for all other non-BODY elements
				xPos += (element.offsetLeft - element.scrollLeft + element.clientLeft);
				yPos += (element.offsetTop - element.scrollTop + element.clientTop);
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
	show(display) {
		if (typeof display !== 'undefined' && display !== '') {
			this.style.display = display;
		} else {
			this.style.display = 'flex';
		}
	},

	/**
	 * Hide the element.
	 */
	hide() {
		this.style.display = 'none';
	},

	/**
	 * Add a CSS class to an element.
	 * @param  {String} className - The CSS class name.
	 */
	add_class(className) {
		if (!this.classList.contains(className)) {
			this.classList.add(className);
		}
	},

	/**
	 * Remove a CSS class from an element.
	 * @param  {String} className - The CSS class name.
	 */
	remove_class(className) {
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
	toggle_class(className) {
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
	toggle_class_for_animation(className) {
		if (this.classList.contains(className)) {
			Helper.remove_class.call(this, className);
		}
		Helper.add_class.call(this, className);
	}
}